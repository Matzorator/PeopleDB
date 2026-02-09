# 📋 Aufgabenpaket 5: Lokale Datenspeicherung

## 🎯 Überblick

**Ziel:** Mitarbeiterdaten persistent im Browser speichern

### **3 Hauptaufgaben:**

1. ✅ **Local Storage Integration**
2. ✅ **JSON Export/Import**
3. ✅ **Daten zurücksetzen**

---

## 📝 Detaillierte Aufgaben

### **1. Local Storage Integration**

#### **Was zu tun ist:**

- Daten automatisch im Local Storage speichern
- Beim Laden der Seite: Daten aus Local Storage wiederherstellen
- Bei jeder Änderung: Local Storage aktualisieren

#### **Wann speichern:**

```javascript
// Nach jeder Änderung
- Mitarbeiter hinzufügen → speichern
- Mitarbeiter bearbeiten → speichern
- Mitarbeiter löschen → speichern
- JSON importieren → speichern
```

#### **Implementierung:**

```javascript
// Speichern
localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));

// Laden
const gespeichert = localStorage.getItem("mitarbeiterDaten");
if (gespeichert) {
  mitarbeiter = JSON.parse(gespeichert);
}
```

---

### **2. JSON Export/Import**

#### **Export-Funktion:**

```javascript
// Button: "📥 Daten exportieren"
- Mitarbeiter-Array als JSON-Datei herunterladen
- Dateiname: mitarbeiter_backup_YYYY-MM-DD.json
- Download über Blob + createElement('a')
```

#### **Import-Funktion:**

```javascript
// Button: "📤 Daten importieren"
- File-Input für JSON-Dateien
- JSON validieren vor dem Import
- Bei Erfolg: Daten ersetzen + Local Storage aktualisieren
- Fehlerbehandlung bei ungültigen Dateien
```

#### **Use Cases:**

- Backup vor großen Änderungen
- Datenübertragung zwischen Geräten/Browsern
- Wiederherstellung bei Datenverlust

---

### **3. Daten zurücksetzen**

#### **Reset-Funktion:**

```javascript
// Button: "🗑️ Alle Daten löschen"
- Sicherheitsabfrage (Confirm-Dialog oder Modal)
- Local Storage komplett leeren
- Optional: Demo-Daten aus JSON neu laden
- UI zurücksetzen (Welcome-State anzeigen)
```

#### **Erweitert:**

```javascript
// Optional: Partial Reset
- Nur Filter zurücksetzen
- Nur Suchbegriff löschen
- Nur aktuelle Seite, nicht alle Daten
```

---

## 🔧 Technische Umsetzung

### **A) Local Storage Manager (Utility-Objekt)**

```javascript
const LocalStorageManager = {
  KEY: "peopledb_mitarbeiter",

  // Speichern
  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Speichern fehlgeschlagen:", e);
      Toast.error("❌ Daten konnten nicht gespeichert werden");
      return false;
    }
  },

  // Laden
  load() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Laden fehlgeschlagen:", e);
      Toast.error("❌ Daten konnten nicht geladen werden");
      return null;
    }
  },

  // Löschen
  clear() {
    localStorage.removeItem(this.KEY);
  },

  // Existiert?
  exists() {
    return localStorage.getItem(this.KEY) !== null;
  },
};
```

---

### **B) Export-Funktion**

```javascript
function exportierenAlsJSON() {
  const dataStr = JSON.stringify(mitarbeiter, null, 2); // Pretty-print
  const blob = new Blob([dataStr], { type: 'application/json' });

  const datum = new Date().toISOString().split('T')[^0]; // YYYY-MM-DD
  const filename = `mitarbeiter_backup_${datum}.json`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href); // Cleanup
  Toast.success(`✅ ${mitarbeiter.length} Mitarbeiter exportiert`);
}
```

---

### **C) Import-Funktion**

```javascript
function importierenVonJSON(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const importiert = JSON.parse(e.target.result);

      // Validierung
      if (!Array.isArray(importiert)) {
        throw new Error("Keine gültige Mitarbeiter-Liste");
      }

      // Daten ersetzen
      mitarbeiter = importiert;
      LocalStorageManager.save(mitarbeiter);

      // UI aktualisieren
      ladeDaten();
      Toast.success(`✅ ${mitarbeiter.length} Mitarbeiter importiert`);
    } catch (err) {
      Toast.error("❌ Ungültige JSON-Datei: " + err.message);
    }
  };

  reader.readAsText(file);
}
```

---

### **D) Reset-Funktion**

```javascript
function allesDatenZuruecksetzen() {
  // Sicherheitsabfrage
  const bestaetigung = confirm(
    "⚠️ Wirklich alle Daten löschen?\n\n" +
      "Diese Aktion kann nicht rückgängig gemacht werden!",
  );

  if (!bestaetigung) {
    Toast.info("ℹ️ Aktion abgebrochen");
    return;
  }

  // Local Storage leeren
  LocalStorageManager.clear();

  // Array leeren
  mitarbeiter = [];

  // Optional: Demo-Daten neu laden
  // ladeDemoDaten();

  // UI zurücksetzen
  aktualisiereSuche();
  aktualisiereFilter();
  Toast.success("✅ Alle Daten wurden gelöscht");
}
```

---

## 🎨 UI-Integration

### **Neue Buttons in der Steuerungsleiste:**

```html
<div class="controls">
  <!-- Bestehende Buttons -->
  <input type="text" id="suche" ... />
  <select id="filterAbteilung">
    ...
  </select>
  <select id="filterPosition">
    ...
  </select>
  <button id="filterReset">🔄 Filter zurücksetzen</button>
  <button id="neuMitarbeiter">➕ Neuer Mitarbeiter</button>

  <!-- ✅ NEU: Datenverwaltung -->
  <button id="exportJSON" aria-label="Daten exportieren">📥 Export</button>

  <label for="importJSON" class="btn" style="cursor: pointer;">
    📤 Import
    <input type="file" id="importJSON" accept=".json" style="display: none;" />
  </label>

  <button id="resetDaten" class="btn-danger" aria-label="Alle Daten löschen">
    🗑️ Daten löschen
  </button>
</div>
```

---

## ✅ Checkliste für morgen

### **Phase 1: Local Storage (30 Min)**

- [ ] `LocalStorageManager` Objekt erstellen
- [ ] `save()` nach Hinzufügen/Bearbeiten/Löschen aufrufen
- [ ] `load()` beim Seitenstart aufrufen
- [ ] Testen: Seite neu laden → Daten bleiben

### **Phase 2: Export (20 Min)**

- [ ] Button "Export" hinzufügen
- [ ] `exportierenAlsJSON()` Funktion
- [ ] Download-Link mit Blob erzeugen
- [ ] Testen: JSON-Datei herunterladen

### **Phase 3: Import (30 Min)**

- [ ] File-Input hinzufügen (versteckt in Label)
- [ ] `importierenVonJSON()` Funktion
- [ ] JSON-Validierung implementieren
- [ ] Fehlerbehandlung bei ungültigen Dateien
- [ ] Testen: Export → Import → Daten wiederhergestellt

### **Phase 4: Reset (15 Min)**

- [ ] Button "Daten löschen" hinzufügen
- [ ] Confirm-Dialog zur Sicherheit
- [ ] Local Storage leeren
- [ ] UI zurücksetzen
- [ ] Testen: Reset → Welcome State

### **Phase 5: Polishing (25 Min)**

- [ ] CSS für neue Buttons
- [ ] Toast-Meldungen überall
- [ ] Error-Handling verfeinern
- [ ] Responsive Design prüfen
- [ ] Lighthouse-Test (sollte weiterhin 95%+ sein)

---

## 🚨 Wichtige Punkte

### **Local Storage Limits:**

- **Max. 5-10 MB** pro Domain (browserabhängig)
- Bei Überschreitung: `QuotaExceededError`
- Lösung: Try-Catch + Fehlermeldung

### **JSON-Validierung:**

```javascript
// Mindestens diese Felder prüfen
function validateMitarbeiter(data) {
  return data.every(
    (m) => m.vorname && m.name && m.email && m.abteilung && m.position,
  );
}
```

### **Sicherheit:**

- **Kein Passwort-Reset-Button** im Production-Modus!
- Evtl. nur im Debug-Modus sichtbar
- Oder: Doppelte Bestätigung erforderlich

---

## 📊 Erwartetes Ergebnis

Nach Aufgabenblock 5:

- ✅ Daten bleiben nach Reload erhalten
- ✅ Backup/Restore via JSON-Export/Import
- ✅ Reset-Funktion für Clean-Slate
- ✅ Alle Lighthouse-Scores weiterhin 95%+
- ✅ Professionelles Datenmanagement

---

**Zeitplan morgen:** ~2 Stunden Implementierung + Testing

**Viel Erfolg morgen!** 🚀💪

Brauchst du noch was für heute? 😊
<span style="display:none">[^1]</span>

<div align="center">⁂</div>

[^1]: mitarbeiter.json
