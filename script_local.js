// ==========================================
// LOCAL STORAGE MANAGER KLASSE
// ==========================================
class LocalStorageManager {
  constructor(storageKey = "peopledb_mitarbeiter") {
    this.storageKey = storageKey;
    this.storageVersion = "1.0";
  }

  /**
   * Speichert Mitarbeiter-Array in localStorage
   * @param {Array} data - Array mit Mitarbeiter-Objekten
   * @returns {boolean} - Erfolg true/false
   */
  save(data) {
    try {
      const payload = {
        version: this.storageVersion,
        timestamp: new Date().toISOString(),
        count: data.length,
        data: data,
      };
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
      console.log(`✅ ${data.length} Mitarbeiter in localStorage gespeichert`);
      return true;
    } catch (error) {
      console.error("❌ Fehler beim Speichern in localStorage:", error);
      if (error.name === "QuotaExceededError") {
        Toast.error(
          "Speicherplatz voll! Daten konnten nicht gespeichert werden.",
        );
      } else {
        Toast.error("Fehler beim Speichern der Daten!");
      }
      return false;
    }
  }

  /**
   * Lädt Mitarbeiter aus localStorage
   * @returns {Array|null} - Mitarbeiter-Array oder null
   */
  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        console.log("ℹ️ Keine Daten in localStorage gefunden");
        return null;
      }

      const payload = JSON.parse(stored);

      if (!payload.data || !Array.isArray(payload.data)) {
        console.warn("⚠️ Ungültige Datenstruktur in localStorage");
        return null;
      }

      console.log(
        `✅ ${payload.count} Mitarbeiter aus localStorage geladen (${payload.timestamp})`,
      );
      return payload.data;
    } catch (error) {
      console.error("❌ Fehler beim Laden aus localStorage:", error);
      Toast.error("Fehler beim Laden der gespeicherten Daten!");
      return null;
    }
  }

  /**
   * Prüft ob localStorage-Daten vorhanden sind
   * @returns {boolean}
   */
  hasData() {
    return localStorage.getItem(this.storageKey) !== null;
  }

  /**
   * Löscht alle gespeicherten Daten
   * @returns {boolean}
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log("✅ localStorage geleert");
      return true;
    } catch (error) {
      console.error("❌ Fehler beim Löschen:", error);
      return false;
    }
  }

  /**
   * Exportiert Daten als JSON-Download
   * @param {Array} data - Mitarbeiter-Array
   */
  exportToJSON(data) {
    try {
      const exportData = {
        exported: new Date().toISOString(),
        version: this.storageVersion,
        count: data.length,
        employees: data,
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `peopledb_export_${new Date().toISOString().slice(0, 10)}.json`;
      link.click();

      URL.revokeObjectURL(url);
      Toast.success("Daten erfolgreich exportiert!");
      console.log("✅ Export erfolgreich");
    } catch (error) {
      console.error("❌ Export-Fehler:", error);
      Toast.error("Fehler beim Exportieren der Daten!");
    }
  }

  /**
   * Importiert Daten aus JSON-Datei
   * @param {File} file - JSON-Datei vom Input
   * @returns {Promise<Array>} - Promise mit Mitarbeiter-Array
   */
  importFromJSON(file) {
    return new Promise((resolve, reject) => {
      if (!file || file.type !== "application/json") {
        Toast.error("Bitte eine gültige JSON-Datei auswählen!");
        reject(new Error("Ungültiger Dateityp"));
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);

          // Unterstütze beide Formate
          const data = imported.employees || imported;

          if (!Array.isArray(data)) {
            throw new Error("Keine gültige Mitarbeiter-Liste gefunden");
          }

          const validData = data.filter(
            (emp) => emp.id && emp.vorname && emp.name && emp.email,
          );

          if (validData.length === 0) {
            throw new Error("Keine gültigen Mitarbeiter-Datensätze gefunden");
          }

          console.log(`✅ ${validData.length} Mitarbeiter importiert`);
          Toast.success(
            `${validData.length} Mitarbeiter erfolgreich importiert!`,
          );
          resolve(validData);
        } catch (error) {
          console.error("❌ Import-Fehler:", error);
          Toast.error("Fehler beim Importieren: Ungültige Daten!");
          reject(error);
        }
      };

      reader.onerror = () => {
        Toast.error("Fehler beim Lesen der Datei!");
        reject(new Error("FileReader Error"));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Gibt Statistiken über gespeicherte Daten zurück
   * @returns {Object|null}
   */
  getStats() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return null;

      const payload = JSON.parse(stored);
      const sizeKB = (new Blob([stored]).size / 1024).toFixed(2);

      return {
        count: payload.count,
        timestamp: payload.timestamp,
        sizeKB: sizeKB,
        version: payload.version,
      };
    } catch (error) {
      return null;
    }
  }
}

// Globale Instanz erstellen
const storageManager = new LocalStorageManager();

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    }
  },

  show(message, type = "info", duration = 4000) {
    this.init();

    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-content">${message}</div>
      <button class="toast-close" aria-label="Schließen">×</button>
      <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
    `;

    this.container.appendChild(toast);

    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => this.remove(toast));

    setTimeout(() => this.remove(toast), duration);

    return toast;
  },

  remove(toast) {
    toast.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  },

  success(message, duration) {
    return this.show(message, "success", duration);
  },

  error(message, duration) {
    return this.show(message, "error", duration);
  },

  warning(message, duration) {
    return this.show(message, "warning", duration);
  },

  info(message, duration) {
    return this.show(message, "info", duration);
  },
};

// ==========================================
// FORMULAR-VALIDIERUNG
// ==========================================
const FormValidator = {
  validateField(field) {
    const validity = field.validity;

    if (field.tagName === "SELECT" && field.value === "") {
      this.showFieldError(
        field,
        field.dataset.errorRequired || "Bitte eine Option wählen",
      );
      return false;
    }

    if (!validity.valid) {
      let errorMessage = "";

      if (validity.valueMissing) {
        errorMessage =
          field.dataset.errorRequired || "Dieses Feld ist erforderlich";
      } else if (validity.typeMismatch) {
        errorMessage = field.dataset.errorTypemismatch || "Ungültiges Format";
      } else if (validity.patternMismatch) {
        errorMessage = field.dataset.errorPattern || "Ungültiges Format";
      } else if (validity.tooShort) {
        errorMessage =
          field.dataset.errorMinlength ||
          `Mindestens ${field.minLength} Zeichen`;
      }

      this.showFieldError(field, errorMessage);
      return false;
    } else {
      this.clearFieldError(field);
      return true;
    }
  },

  showFieldError(field, message) {
    const errorSpan = document.getElementById(`${field.id}-error`);
    if (errorSpan) {
      errorSpan.textContent = message;
    }
    field.setAttribute("aria-invalid", "true");
    field.style.borderColor = "#ef4444";
  },

  clearFieldError(field) {
    const errorSpan = document.getElementById(`${field.id}-error`);
    if (errorSpan) {
      errorSpan.textContent = "";
    }
    field.setAttribute("aria-invalid", "false");
    field.style.borderColor = "";
  },

  validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    if (!isValid && firstInvalidField) {
      firstInvalidField.focus();
      firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
      Toast.error("Bitte alle Pflichtfelder korrekt ausfüllen");
    }

    return isValid;
  },
};

// ==========================================
// EMPTY STATE MANAGEMENT
// ==========================================
const EmptyStateManager = {
  states: {
    empty: "emptyState",
    welcome: "welcomeState",
    noResults: "noSearchResults",
  },

  show(stateType, data = {}) {
    const table = document.querySelector(".mitarbeiter-table");
    if (table) table.style.display = "none";

    Object.values(this.states).forEach((stateId) => {
      const state = document.getElementById(stateId);
      if (state) state.style.display = "none";
    });

    const currentState = document.getElementById(this.states[stateType]);
    if (currentState) {
      currentState.style.display = "block";

      if (stateType === "noResults" && data.searchTerm) {
        const termSpan = currentState.querySelector("#searchTerm");
        if (termSpan) termSpan.textContent = data.searchTerm;
      }
    }
  },

  hide() {
    Object.values(this.states).forEach((stateId) => {
      const state = document.getElementById(stateId);
      if (state) state.style.display = "none";
    });

    const table = document.querySelector(".mitarbeiter-table");
    if (table) table.style.display = "table";
  },
};

// ==========================================
// HAUPTINITIALISIERUNG
// ==========================================
document.addEventListener("DOMContentLoaded", async function () {
  // ==========================================
  // GLOBALE VARIABLEN
  // ==========================================
  let mitarbeiter = [];
  let aktuelleDaten = [];
  let aktuelleSeite = 1;
  const eintraegeProSeite = 10;
  let editModus = false;
  let editId = null;
  let aktuellerSort = null;
  let sortRichtung = "asc";

  // ==========================================
  // DOM-ELEMENTE REFERENZIEREN
  // ==========================================
  const tabelleBody = document.getElementById("tabelleBody");
  const sucheInput = document.getElementById("suche");
  const modal = document.getElementById("detailModal");
  const detailContent = document.getElementById("detailContent");
  const closeModal = document.querySelector(".close");
  const neuBtn = document.getElementById("neuMitarbeiter");
  const form = document.getElementById("mitarbeiterForm");
  const abbrechenBtn = document.getElementById("abbrechen");
  const bildInput = document.getElementById("bild");
  const abteilungSelect = document.getElementById("abteilung");
  const positionSelect = document.getElementById("position");
  const filterAbteilung = document.getElementById("filterAbteilung");
  const filterPosition = document.getElementById("filterPosition");
  const filterResetBtn = document.getElementById("filterReset");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  // Data Management Elemente
  const exportBtn = document.getElementById("exportBtn");
  const importBtn = document.getElementById("importBtn");
  const resetBtn = document.getElementById("resetBtn");
  const importFileInput = document.getElementById("importFileInput");

  // ==========================================
  // MITARBEITERDATEN LADEN
  // ==========================================
  async function loadMitarbeiterData() {
    // 1. Versuche zuerst aus localStorage zu laden
    const localData = storageManager.load();

    if (localData && localData.length > 0) {
      mitarbeiter = localData;
      console.log(`${mitarbeiter.length} Mitarbeiter aus localStorage geladen`);
      Toast.info(
        `${mitarbeiter.length} Mitarbeiter aus Speicher geladen`,
        2000,
      );
      return mitarbeiter;
    }

    // 2. Fallback: Lade aus JSON-Datei
    try {
      const response = await fetch("mitarbeiter.json");
      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }
      mitarbeiter = await response.json();
      console.log(`${mitarbeiter.length} Mitarbeiter aus JSON geladen`);

      // 3. Speichere initial in localStorage
      storageManager.save(mitarbeiter);
      Toast.success(`${mitarbeiter.length} Mitarbeiter erfolgreich geladen`);

      return mitarbeiter;
    } catch (error) {
      console.error("Fehler beim Laden der JSON:", error);
      Toast.error("Fehler beim Laden der Mitarbeiterdaten!");
      mitarbeiter = [];
      return mitarbeiter;
    }
  }

  await loadMitarbeiterData();

  // ==========================================
  // HILFSFUNKTIONEN
  // ==========================================
  function dateiZuBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  /**
   * Komprimiert und validiert Bilder
   * @param {File} file - Bild-Datei
   * @param {number} maxWidth - Maximale Breite (Standard: 400px)
   * @param {number} maxHeight - Maximale Höhe (Standard: 400px)
   * @param {number} quality - Komprimierungs-Qualität 0-1 (Standard: 0.8)
   * @returns {Promise<string>} - Base64-String des komprimierten Bildes
   */
  function komprimiereBild(
    file,
    maxWidth = 400,
    maxHeight = 400,
    quality = 0.8,
  ) {
    return new Promise((resolve, reject) => {
      // 1. Validierung: Dateityp
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        Toast.error("Ungültiger Dateityp! Nur JPG, PNG oder WebP erlaubt.");
        reject(new Error("Ungültiger Dateityp"));
        return;
      }

      // 2. Validierung: Maximale Dateigröße (5 MB)
      const maxFileSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxFileSize) {
        Toast.warning(
          `Datei zu groß (${(file.size / 1024 / 1024).toFixed(1)} MB). Wird komprimiert...`,
        );
      }

      // 3. Bild laden
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          // 4. Berechne neue Dimensionen (Seitenverhältnis beibehalten)
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);

            console.log(
              `📐 Bild wird skaliert: ${img.width}x${img.height} → ${width}x${height}`,
            );
          }

          // 5. Canvas erstellen und Bild zeichnen
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // 6. Zu Base64 konvertieren mit Komprimierung
          const compressedBase64 = canvas.toDataURL("image/jpeg", quality);

          // 7. Größenvergleich
          const originalSize = (file.size / 1024).toFixed(1);
          const compressedSize = (
            (compressedBase64.length * 0.75) /
            1024
          ).toFixed(1);

          console.log(
            `🗜️ Komprimierung: ${originalSize} KB → ${compressedSize} KB (${((compressedSize / originalSize) * 100).toFixed(0)}%)`,
          );

          // 8. Validierung: Komprimiertes Bild zu groß?
          const maxBase64Size = 500 * 1024; // 500 KB als Base64
          if (compressedBase64.length > maxBase64Size) {
            Toast.error(
              "Bild ist selbst nach Komprimierung zu groß! Bitte kleineres Bild wählen.",
            );
            reject(new Error("Bild zu groß"));
            return;
          }

          Toast.success("Bild erfolgreich komprimiert!");
          resolve(compressedBase64);
        };

        img.onerror = () => {
          Toast.error("Fehler beim Laden des Bildes!");
          reject(new Error("Bild konnte nicht geladen werden"));
        };

        img.src = e.target.result;
      };

      reader.onerror = () => {
        Toast.error("Fehler beim Lesen der Datei!");
        reject(new Error("FileReader Error"));
      };

      reader.readAsDataURL(file);
    });
  }

  function checkActiveFilters() {
    return (
      sucheInput.value !== "" ||
      filterAbteilung.value !== "" ||
      filterPosition.value !== ""
    );
  }

  function checkActiveFilters() {
    return (
      sucheInput.value !== "" ||
      filterAbteilung.value !== "" ||
      filterPosition.value !== ""
    );
  }

  // ==========================================
  // RENDER-FUNKTIONEN
  // ==========================================
  function renderTabelle(daten) {
    if (!daten || daten.length === 0) {
      const hasActiveFilters = checkActiveFilters();
      if (hasActiveFilters) {
        EmptyStateManager.show("empty");
      } else {
        EmptyStateManager.show("welcome");
      }
      return;
    }

    EmptyStateManager.hide();

    // Entscheide: Card-Layout oder Tabellen-Layout
    const useCardLayout = daten.length < 5;

    if (useCardLayout) {
      renderCards(daten);
    } else {
      renderTabelleClassic(daten);
    }
  }

  /**
   * Rendert Mitarbeiter als Cards (für wenige Einträge)
   */
  function renderCards(daten) {
    // Tabelle verstecken
    const table = document.querySelector(".mitarbeiter-table");
    if (table) table.style.display = "none";

    // Card-Container erstellen oder finden
    let cardContainer = document.querySelector(".mitarbeiter-cards");

    if (!cardContainer) {
      cardContainer = document.createElement("div");
      cardContainer.className = "mitarbeiter-cards";
      table.parentNode.insertBefore(cardContainer, table);
    }

    cardContainer.style.display = "grid";
    cardContainer.innerHTML = "";

    // Cards erstellen
    daten.forEach((mitarbeiter, index) => {
      const card = document.createElement("div");
      card.className = "mitarbeiter-card";
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <div class="card-header">
          <img src="${mitarbeiter.bild}" alt="${mitarbeiter.vorname} ${mitarbeiter.name}" loading="lazy">
          <div class="card-name">
            <h3>${mitarbeiter.vorname} ${mitarbeiter.name}</h3>
            <div class="card-position">${mitarbeiter.position}</div>
          </div>
        </div>
        
        <div class="card-body">
          <div class="card-detail">
            <span class="card-detail-icon">📧</span>
            <span class="card-detail-label">E-Mail:</span>
            <span class="card-detail-value">${mitarbeiter.email}</span>
          </div>
          
          <div class="card-detail">
            <span class="card-detail-icon">📞</span>
            <span class="card-detail-label">Telefon:</span>
            <span class="card-detail-value">${mitarbeiter.phone}</span>
          </div>
          
          <div class="card-detail">
            <span class="card-detail-icon">🏢</span>
            <span class="card-detail-label">Abteilung:</span>
            <span class="card-detail-value">${mitarbeiter.abteilung}</span>
          </div>
          
          <div class="card-detail">
            <span class="card-detail-icon">💰</span>
            <span class="card-detail-label">Gehalt:</span>
            <span class="card-detail-value">${mitarbeiter.gehalt}</span>
          </div>
        </div>
        
        <div class="card-actions">
          <button class="detailBtn" data-id="${mitarbeiter.id}">📋 Detail</button>
          <button class="editBtn" data-id="${mitarbeiter.id}">✏️ Edit</button>
          <button class="deleteBtn" data-id="${mitarbeiter.id}">🗑️ Delete</button>
        </div>
      `;

      cardContainer.appendChild(card);
    });

    console.log(`🃏 ${daten.length} Mitarbeiter als Cards gerendert`);
  }

  /**
   * Rendert Mitarbeiter als klassische Tabelle (für viele Einträge)
   */
  function renderTabelleClassic(daten) {
    // Card-Container verstecken
    const cardContainer = document.querySelector(".mitarbeiter-cards");
    if (cardContainer) cardContainer.style.display = "none";

    // Tabelle anzeigen
    const table = document.querySelector(".mitarbeiter-table");
    if (table) table.style.display = "table";

    tabelleBody.innerHTML = "";
    daten.forEach((mitarbeiter) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-label="Bild"><img src="${mitarbeiter.bild}" alt="${mitarbeiter.vorname} ${mitarbeiter.name}" loading="lazy"></td>
        <td data-label="Vorname">${mitarbeiter.vorname}</td>
        <td data-label="Name">${mitarbeiter.name}</td>
        <td data-label="E-Mail">${mitarbeiter.email}</td>
        <td data-label="Telefon">${mitarbeiter.phone}</td>
        <td data-label="Abteilung">${mitarbeiter.abteilung}</td>
        <td data-label="Position">${mitarbeiter.position}</td>
        <td data-label="Aktionen" class="action-buttons">
          <button class="detailBtn" data-id="${mitarbeiter.id}">Detail</button>
          <button class="editBtn" data-id="${mitarbeiter.id}">Edit</button>
          <button class="deleteBtn" data-id="${mitarbeiter.id}">Delete</button>
        </td>
      `;
      tabelleBody.appendChild(row);
    });

    console.log(`📊 ${daten.length} Mitarbeiter als Tabelle gerendert`);
  }

  function renderPaginierung(gesamtSeiten, gesamtEintraege) {
    pageInfo.textContent = `Seite ${aktuelleSeite} von ${gesamtSeiten} (${gesamtEintraege} Einträge)`;
    prevPageBtn.disabled = aktuelleSeite === 1;
    nextPageBtn.disabled = aktuelleSeite >= gesamtSeiten;
  }

  // ==========================================
  // DETAIL-MODAL
  // ==========================================
  function zeigeDetails(mitarbeiter) {
    detailContent.innerHTML = `
      <img src="${mitarbeiter.bild}" alt="${mitarbeiter.vorname} ${mitarbeiter.name}" width="100">
      <p><strong>Vorname:</strong> ${mitarbeiter.vorname}</p>
      <p><strong>Name:</strong> ${mitarbeiter.name}</p>
      <p><strong>E-Mail:</strong> ${mitarbeiter.email}</p>
      <p><strong>Telefon:</strong> ${mitarbeiter.phone}</p>
      <p><strong>Abteilung:</strong> ${mitarbeiter.abteilung}</p>
      <p><strong>Position:</strong> ${mitarbeiter.position}</p>
      <p><strong>Bemerkung:</strong> ${mitarbeiter.bemerkung}</p>
      <p><strong>Gehalt:</strong> ${mitarbeiter.gehalt}</p>
    `;
    modal.classList.remove("hidden");
  }

  // ==========================================
  // CRUD-OPERATIONEN (FINAL)
  // ==========================================

  /**
   * Erstellt einen neuen Mitarbeiter
   */
  function erstelleMitarbeiter(neuerMitarbeiter) {
    mitarbeiter.push(neuerMitarbeiter);
    const gespeichert = storageManager.save(mitarbeiter);

    if (gespeichert) {
      aktualisiereListe();
      Toast.success(
        `${neuerMitarbeiter.vorname} ${neuerMitarbeiter.name} wurde hinzugefügt`,
      );
      console.log("Neuer Mitarbeiter erstellt:", neuerMitarbeiter);
    } else {
      mitarbeiter.pop();
      Toast.error(
        "Fehler beim Speichern! Mitarbeiter wurde nicht hinzugefügt.",
      );
      console.error(
        "❌ Mitarbeiter konnte nicht gespeichert werden - Rollback durchgeführt",
      );
    }
  }

  /**
   * Aktualisiert einen bestehenden Mitarbeiter
   */
  function aktualisiereMitarbeiter(id, updateData) {
    const index = mitarbeiter.findIndex((m) => m.id === id);

    if (index === -1) {
      Toast.error("Mitarbeiter nicht gefunden!");
      console.error("Mitarbeiter mit ID", id, "nicht gefunden");
      return;
    }

    const backup = { ...mitarbeiter[index] };
    mitarbeiter[index] = { ...mitarbeiter[index], ...updateData };
    const gespeichert = storageManager.save(mitarbeiter);

    if (gespeichert) {
      aktualisiereListe();
      Toast.success(
        `${mitarbeiter[index].vorname} ${mitarbeiter[index].name} wurde aktualisiert`,
      );
      console.log("Mitarbeiter aktualisiert:", mitarbeiter[index]);
    } else {
      mitarbeiter[index] = backup;
      Toast.error(
        "Fehler beim Speichern! Änderungen wurden rückgängig gemacht.",
      );
      console.error(
        "❌ Mitarbeiter konnte nicht aktualisiert werden - Rollback durchgeführt",
      );
    }
  }

  /**
   * Löscht einen Mitarbeiter (mit optionaler Sicherheitsabfrage)
   */
  function loescheMitarbeiter(id, mitBestaetigung = true) {
    const mitarbeiterZumLoeschen = mitarbeiter.find((m) => m.id === id);

    if (!mitarbeiterZumLoeschen) {
      Toast.error("Mitarbeiter nicht gefunden!");
      console.error("Mitarbeiter mit ID", id, "nicht gefunden");
      return;
    }

    if (mitBestaetigung) {
      const bestaetigung = confirm(
        `WIRKLICH LÖSCHEN?\n\n` +
          `Name: ${mitarbeiterZumLoeschen.vorname} ${mitarbeiterZumLoeschen.name}\n` +
          `Abteilung: ${mitarbeiterZumLoeschen.abteilung}\n` +
          `Position: ${mitarbeiterZumLoeschen.position}\n\n` +
          `Diese Aktion kann nicht rückgängig gemacht werden!`,
      );

      if (!bestaetigung) {
        Toast.info("Löschen abgebrochen");
        console.log("Löschvorgang abgebrochen");
        return;
      }
    }

    const index = mitarbeiter.findIndex((m) => m.id === id);
    const backup = mitarbeiter[index];
    mitarbeiter.splice(index, 1);
    const gespeichert = storageManager.save(mitarbeiter);

    if (gespeichert) {
      aktualisiereListe();
      Toast.success(
        `${mitarbeiterZumLoeschen.vorname} ${mitarbeiterZumLoeschen.name} wurde gelöscht`,
      );
      console.log("Mitarbeiter gelöscht! Verbleibend:", mitarbeiter.length);
    } else {
      mitarbeiter.splice(index, 0, backup);
      Toast.error("Fehler beim Speichern! Mitarbeiter wurde nicht gelöscht.");
      console.error(
        "❌ Mitarbeiter konnte nicht gelöscht werden - Rollback durchgeführt",
      );
    }
  }

  /**
   * Öffnet Formular zum Bearbeiten eines Mitarbeiters
   */
  function oeffneBearbeitungsFormular(id) {
    const mitarbeiterZumBearbeiten = mitarbeiter.find((m) => m.id === id);

    if (!mitarbeiterZumBearbeiten) {
      Toast.error("Mitarbeiter nicht gefunden!");
      console.error("Mitarbeiter mit ID", id, "nicht gefunden");
      return;
    }

    console.log("Bearbeite:", mitarbeiterZumBearbeiten);
    Toast.info("Bearbeitungsmodus aktiviert");

    editModus = true;
    editId = id;

    form.classList.remove("hidden");

    form.elements.vorname.value = mitarbeiterZumBearbeiten.vorname;
    form.elements.name.value = mitarbeiterZumBearbeiten.name;
    form.elements.email.value = mitarbeiterZumBearbeiten.email;
    form.elements.phone.value = mitarbeiterZumBearbeiten.phone;
    form.elements.abteilung.value = mitarbeiterZumBearbeiten.abteilung;

    abteilungSelect.dispatchEvent(new Event("change"));

    setTimeout(() => {
      form.elements.position.value = mitarbeiterZumBearbeiten.position;
    }, 10);

    form.elements.bemerkung.value = mitarbeiterZumBearbeiten.bemerkung || "";
    form.elements.gehalt.value = mitarbeiterZumBearbeiten.gehalt;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = "Aktualisieren";
    submitBtn.classList.add("update-mode");

    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ==========================================
  // EVENT-HANDLER: BUTTON-KLICKS
  // ==========================================
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("detailBtn")) {
      console.log("Detail-Button geklickt");
      const id = parseInt(event.target.dataset.id);
      const gefundeneMitarbeiter = mitarbeiter.find((m) => m.id === id);
      if (gefundeneMitarbeiter) {
        zeigeDetails(gefundeneMitarbeiter);
      }
      return;
    }

    if (event.target.classList.contains("editBtn")) {
      console.log("Bearbeiten-Button geklickt");
      const id = parseInt(event.target.dataset.id);
      oeffneBearbeitungsFormular(id);
      return;
    }

    if (event.target.classList.contains("deleteBtn")) {
      console.log("Löschen-Button geklickt");
      const id = parseInt(event.target.dataset.id);
      loescheMitarbeiter(id);
      return;
    }

    if (event.target.classList.contains("close") || event.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // ==========================================
  // EVENT-HANDLER: DATA MANAGEMENT
  // ==========================================

  /**
   * EXPORT: Daten als JSON-Datei downloaden
   */
  exportBtn.addEventListener("click", function () {
    if (mitarbeiter.length === 0) {
      Toast.warning("Keine Daten zum Exportieren vorhanden!");
      console.warn("Export abgebrochen: Keine Daten");
      return;
    }

    storageManager.exportToJSON(mitarbeiter);
    console.log(`📤 ${mitarbeiter.length} Mitarbeiter exportiert`);
  });

  /**
   * IMPORT: Öffnet Datei-Dialog
   */
  importBtn.addEventListener("click", function () {
    importFileInput.click();
    console.log("📥 Import-Dialog geöffnet");
  });

  /**
   * IMPORT: Verarbeitet ausgewählte Datei
   */
  importFileInput.addEventListener("change", async function (e) {
    const file = e.target.files[0];

    if (!file) {
      console.log("Import abgebrochen: Keine Datei ausgewählt");
      return;
    }

    try {
      console.log(`📂 Importiere Datei: ${file.name}`);

      const importedData = await storageManager.importFromJSON(file);
      mitarbeiter = importedData;
      const gespeichert = storageManager.save(mitarbeiter);

      if (gespeichert) {
        initialisiereFilterDropdowns();
        initialisiereFormularDropdowns();
        aktuelleSeite = 1;
        aktualisiereListe();
        console.log(`${mitarbeiter.length} Mitarbeiter erfolgreich importiert`);
      } else {
        Toast.error("Import erfolgreich, aber Speichern fehlgeschlagen!");
        console.error(
          "❌ Import-Daten konnten nicht in localStorage gespeichert werden",
        );
      }
    } catch (error) {
      console.error("❌ Import fehlgeschlagen:", error);
    }

    importFileInput.value = "";
  });

  /**
   * RESET: localStorage leeren & Originalzustand wiederherstellen
   */
  resetBtn.addEventListener("click", function () {
    const bestaetigung = confirm(
      "⚠️ ACHTUNG: DATENVERLUST!\n\n" +
        "Diese Aktion löscht ALLE gespeicherten Änderungen!\n\n" +
        "Die Originaldaten aus 'mitarbeiter.json' werden wiederhergestellt.\n\n" +
        "Möchten Sie fortfahren?",
    );

    if (!bestaetigung) {
      Toast.info("Reset abgebrochen");
      console.log("Reset abgebrochen durch Benutzer");
      return;
    }

    const geloescht = storageManager.clear();

    if (geloescht) {
      console.log("🗑️ localStorage geleert");
      Toast.success("Daten werden zurückgesetzt...", 1500);

      setTimeout(() => {
        location.reload();
      }, 1500);

      console.log("🔄 Seite wird neu geladen...");
    } else {
      Toast.error("Fehler beim Zurücksetzen!");
      console.error("❌ localStorage konnte nicht geleert werden");
    }
  });

  // ==========================================
  // DROPDOWN-INITIALISIERUNG
  // ==========================================
  function initialisiereFilterDropdowns() {
    const abteilungen = [
      ...new Set(mitarbeiter.map((m) => m.abteilung)),
    ].sort();

    filterAbteilung.innerHTML = '<option value="">📁 Alle Abteilungen</option>';
    abteilungen.forEach((abt) => {
      const option = document.createElement("option");
      option.value = abt;
      option.textContent = abt;
      filterAbteilung.appendChild(option);
    });

    const allePositionen = [
      ...new Set(mitarbeiter.map((m) => m.position)),
    ].sort();

    filterPosition.innerHTML = '<option value="">📋 Alle Positionen</option>';
    allePositionen.forEach((pos) => {
      const option = document.createElement("option");
      option.value = pos;
      option.textContent = pos;
      filterPosition.appendChild(option);
    });

    console.log(
      `Filter: ${abteilungen.length} Abteilungen, ${allePositionen.length} Positionen`,
    );
  }

  function initialisiereFormularDropdowns() {
    const abteilungen = [
      ...new Set(mitarbeiter.map((m) => m.abteilung)),
    ].sort();

    abteilungSelect.innerHTML =
      '<option value="">-- Abteilung wählen --</option>';
    abteilungen.forEach((abt) => {
      const option = document.createElement("option");
      option.value = abt;
      option.textContent = abt;
      abteilungSelect.appendChild(option);
    });

    console.log(`Formular: ${abteilungen.length} Abteilungen geladen`);
  }

  // ==========================================
  // EVENT-HANDLER: FORMULAR-DROPDOWN
  // ==========================================
  abteilungSelect.addEventListener("change", function () {
    const abteilung = this.value;

    positionSelect.innerHTML =
      '<option value="">-- Position wählen --</option>';

    if (abteilung) {
      const positionenDerAbteilung = [
        ...new Set(
          mitarbeiter
            .filter((m) => m.abteilung === abteilung)
            .map((m) => m.position),
        ),
      ].sort();

      if (positionenDerAbteilung.length > 0) {
        positionenDerAbteilung.forEach((pos) => {
          const option = document.createElement("option");
          option.value = pos;
          option.textContent = pos;
          positionSelect.appendChild(option);
        });
        positionSelect.disabled = false;
        console.log(
          `${positionenDerAbteilung.length} Positionen für ${abteilung} geladen`,
        );
      } else {
        positionSelect.disabled = true;
        console.log(`Keine Positionen für ${abteilung} gefunden`);
      }
    } else {
      positionSelect.disabled = true;
    }
  });

  // ==========================================
  // EVENT-HANDLER: ECHTZEIT-VALIDIERUNG
  // ==========================================
  form
    .querySelectorAll("input[required], select[required]")
    .forEach((field) => {
      field.addEventListener("blur", () => {
        FormValidator.validateField(field);
      });

      field.addEventListener("input", () => {
        if (field.value !== "") {
          FormValidator.clearFieldError(field);
        }
      });

      field.addEventListener("change", () => {
        if (field.value !== "") {
          FormValidator.clearFieldError(field);
        }
      });
    });

  // ==========================================
  // SORTIERUNG
  // ==========================================
  function sortiereTabelle(spalte) {
    console.log(`Sortiere nach: ${spalte}`);

    if (aktuellerSort === spalte) {
      sortRichtung = sortRichtung === "asc" ? "desc" : "asc";
    } else {
      aktuellerSort = spalte;
      sortRichtung = "asc";
    }

    aktuelleDaten.sort((a, b) => {
      let valA = a[spalte];
      let valB = b[spalte];

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (sortRichtung === "asc") {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    });

    aktualisiereListe();
    aktualisiereHeaderIcons(spalte);

    console.log(`Sortiert: ${spalte} (${sortRichtung})`);
  }

  function aktualisiereHeaderIcons(aktiveSpalte) {
    document.querySelectorAll("th.sortable").forEach((th) => {
      th.classList.remove("sort-asc", "sort-desc");
    });

    const aktiverHeader = document.querySelector(
      `th[data-sort="${aktiveSpalte}"]`,
    );
    if (aktiverHeader) {
      aktiverHeader.classList.add(
        sortRichtung === "asc" ? "sort-asc" : "sort-desc",
      );
    }
  }

  document.querySelectorAll("th.sortable").forEach((th) => {
    th.addEventListener("click", function () {
      const spalte = this.dataset.sort;
      sortiereTabelle(spalte);
    });
  });

  // ==========================================
  // FILTER & SUCHE
  // ==========================================
  function aktualisiereListe() {
    let gefiltert = [...mitarbeiter];

    const suchbegriff = sucheInput.value.toLowerCase();
    if (suchbegriff) {
      gefiltert = gefiltert.filter(
        (m) =>
          m.vorname.toLowerCase().includes(suchbegriff) ||
          m.name.toLowerCase().includes(suchbegriff) ||
          m.abteilung.toLowerCase().includes(suchbegriff) ||
          m.position.toLowerCase().includes(suchbegriff),
      );
    }

    const selectedAbteilung = filterAbteilung.value;
    if (selectedAbteilung) {
      gefiltert = gefiltert.filter((m) => m.abteilung === selectedAbteilung);
    }

    const selectedPosition = filterPosition.value;
    if (selectedPosition) {
      gefiltert = gefiltert.filter((m) => m.position === selectedPosition);
    }

    if (aktuellerSort) {
      gefiltert.sort((a, b) => {
        let valA = a[aktuellerSort];
        let valB = b[aktuellerSort];

        if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (sortRichtung === "asc") {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });
    }

    const gesamtEintraege = gefiltert.length;
    const gesamtSeiten = Math.ceil(gesamtEintraege / eintraegeProSeite) || 1;

    if (aktuelleSeite > gesamtSeiten) {
      aktuelleSeite = gesamtSeiten;
    }

    const start = (aktuelleSeite - 1) * eintraegeProSeite;
    const ende = start + eintraegeProSeite;
    const seiteDaten = gefiltert.slice(start, ende);

    aktuelleDaten = gefiltert;
    renderTabelle(seiteDaten);
    renderPaginierung(gesamtSeiten, gesamtEintraege);

    console.log(
      `Seite ${aktuelleSeite}/${gesamtSeiten} | Angezeigt: ${seiteDaten.length} von ${gesamtEintraege} (Gesamt: ${mitarbeiter.length})`,
    );
  }

  // ==========================================
  // EVENT-HANDLER: SUCHE
  // ==========================================
  sucheInput.addEventListener("input", function () {
    aktuelleSeite = 1;
    aktualisiereListe();
  });

  // ==========================================
  // EVENT-HANDLER: FILTER
  // ==========================================
  filterPosition.addEventListener("change", function () {
    aktuelleSeite = 1;
    aktualisiereListe();
  });

  filterAbteilung.addEventListener("change", function () {
    const abteilung = this.value;
    filterPosition.innerHTML = '<option value="">📋 Alle Positionen</option>';

    if (abteilung) {
      const positionenDerAbteilung = [
        ...new Set(
          mitarbeiter
            .filter((m) => m.abteilung === abteilung)
            .map((m) => m.position),
        ),
      ].sort();

      positionenDerAbteilung.forEach((pos) => {
        const option = document.createElement("option");
        option.value = pos;
        option.textContent = pos;
        filterPosition.appendChild(option);
      });
      filterPosition.disabled = positionenDerAbteilung.length === 0;
    } else {
      const allePositionen = [
        ...new Set(mitarbeiter.map((m) => m.position)),
      ].sort();
      allePositionen.forEach((pos) => {
        const option = document.createElement("option");
        option.value = pos;
        option.textContent = pos;
        filterPosition.appendChild(option);
      });
      filterPosition.disabled = false;
    }

    aktuelleSeite = 1;
    aktualisiereListe();
  });

  filterResetBtn.addEventListener("click", function () {
    sucheInput.value = "";
    filterAbteilung.value = "";
    filterPosition.value = "";

    aktuellerSort = null;
    sortRichtung = "asc";
    document.querySelectorAll("th.sortable").forEach((th) => {
      th.classList.remove("sort-asc", "sort-desc");
    });

    aktuelleSeite = 1;

    initialisiereFilterDropdowns();

    aktuelleDaten = [...mitarbeiter];
    aktualisiereListe();

    console.log("Filter + Sortierung + Paginierung zurückgesetzt");
    Toast.info("Alle Filter zurückgesetzt");
  });

  // ==========================================
  // EVENT-HANDLER: FORMULAR
  // ==========================================
  neuBtn.addEventListener("click", function () {
    if (editModus) {
      editModus = false;
      editId = null;
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = "Speichern";
      submitBtn.classList.remove("update-mode");
    }
    form.classList.remove("hidden");
  });

  abbrechenBtn.addEventListener("click", function () {
    form.classList.add("hidden");
    form.reset();

    if (editModus) {
      editModus = false;
      editId = null;
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = "Speichern";
      submitBtn.classList.remove("update-mode");
      Toast.info("Bearbeitung abgebrochen");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!FormValidator.validateForm(form)) {
      console.log("Formular-Validierung fehlgeschlagen");
      return;
    }

    let bildUrl = editModus
      ? mitarbeiter.find((m) => m.id === editId).bild
      : "https://via.placeholder.com/50?text=Neu";

    if (bildInput.files && bildInput.files[0]) {
      try {
        // Komprimiere Bild (max 400x400px, 80% Qualität)
        bildUrl = await komprimiereBild(bildInput.files[0], 400, 400, 0.8);
        console.log("✅ Bild komprimiert und konvertiert");
      } catch (error) {
        console.error("❌ Bild-Komprimierung fehlgeschlagen:", error);
        // Abbrechen wenn Bild-Upload fehlschlägt
        return;
      }
    }

    const mitarbeiterDaten = {
      vorname: form.elements.vorname.value,
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      abteilung: form.elements.abteilung.value,
      position: form.elements.position.value,
      bemerkung: form.elements.bemerkung.value,
      gehalt: form.elements.gehalt.value,
    };

    if (editModus) {
      mitarbeiterDaten.bild = bildUrl;
      aktualisiereMitarbeiter(editId, mitarbeiterDaten);

      editModus = false;
      editId = null;
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = "Speichern";
      submitBtn.classList.remove("update-mode");
    } else {
      const neuerMitarbeiter = {
        id: Date.now(),
        bild: bildUrl,
        ...mitarbeiterDaten,
      };
      erstelleMitarbeiter(neuerMitarbeiter);
    }

    form.reset();
    form.classList.add("hidden");
  });

  // ==========================================
  // EVENT-HANDLER: PAGINIERUNG
  // ==========================================
  prevPageBtn.addEventListener("click", function () {
    if (aktuelleSeite > 1) {
      aktuelleSeite--;
      aktualisiereListe();
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(`Vorherige Seite: ${aktuelleSeite}`);
    }
  });

  nextPageBtn.addEventListener("click", function () {
    const gesamtSeiten = Math.ceil(aktuelleDaten.length / eintraegeProSeite);
    if (aktuelleSeite < gesamtSeiten) {
      aktuelleSeite++;
      aktualisiereListe();
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(`Nächste Seite: ${aktuelleSeite}`);
    }
  });

  // ==========================================
  // INITIALISIERUNG
  // ==========================================
  initialisiereFilterDropdowns();
  initialisiereFormularDropdowns();
  positionSelect.disabled = true;
  aktualisiereListe();

  console.log("PeopleDB v0.5 - LocalStorage Edition vollständig initialisiert");
});
