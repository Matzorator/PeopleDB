# PeopleDB - Beta 0.4

> **Projektarbeit**: Dynamische Mitarbeiterverwaltung mit Vanilla JavaScript  
> **Meilenstein 1**: Grundlegende Projektstruktur & DOM-Manipulation  
> **Stand**: 26. Januar 2026

---

## 📋 Inhaltsverzeichnis

- [Projektübersicht](#projektübersicht)
- [Features (Meilenstein 1)](#features-meilenstein-1)
- [Technologie-Stack](#technologie-stack)
- [Dateistruktur](#dateistruktur)
- [Installation & Start](#installation--start)
- [Code-Dokumentation](#code-dokumentation)
- [Responsive Design](#responsive-design)
- [Roadmap (Meilensteine 2-5)](#roadmap-meilensteine-2-5)
- [Bekannte Probleme & Lösungen](#bekannte-probleme--lösungen)

---

## 🎯 Projektübersicht

**Ausgangssituation**: Entwicklung einer neuen, modernen Mitarbeiterverwaltungssoftware für ein mittelständisches Unternehmen. Die alte Version ist veraltet und ineffizient.

**Ziel**: Webbasierte CRUD-Anwendung (Create, Read, Update, Delete) mit reinem JavaScript - ohne Frameworks oder Libraries.

**Benutzer**: Interne HR-Mitarbeiter und Teamleiter zur Verwaltung von Mitarbeiterdaten.

---

## ✅ Features (Meilenstein 1)

### Implementiert

- ✅ **Tabellenansicht**: Übersicht aller Mitarbeiter mit 8 Spalten
- ✅ **Hartcodierte Daten**: 8 Beispiel-Mitarbeiter mit realistischen Daten
- ✅ **Suchfunktion**: Echtzeit-Filter nach Vorname, Name, Abteilung, Position
- ✅ **Detailansicht**: Modal mit vollständigen Mitarbeiter-Informationen
- ✅ **Responsive Design**: Mobile-First-Ansatz (Kartenansicht auf Smartphones)
- ✅ **DOM-Manipulation**: Dynamisches Rendering ohne Page-Reload

### In Entwicklung (Meilenstein 2)

- ⏳ Formular: Neue Mitarbeiter hinzufügen
- ⏳ Bearbeiten-Funktion
- ⏳ Löschen-Funktion

---

## 🛠 Technologie-Stack

| Technologie            | Version | Zweck                              |
| ---------------------- | ------- | ---------------------------------- |
| **HTML5**              | -       | Struktur & Semantik                |
| **CSS3**               | -       | Responsive Design, Media Queries   |
| **Vanilla JavaScript** | ES6+    | DOM-Manipulation, Event-Handling   |
| **localStorage**       | -       | Datenpersistenz (ab Meilenstein 5) |

**Keine externen Dependencies** - 100% nativ!

---

## 📁 Dateistruktur

```
mitarbeiterverwaltung/
├── index.html              # Haupt-HTML-Struktur
├── style.css               # Responsive CSS (Mobile First)
├── script.js               # JavaScript-Logik
├── README.md               # Diese Datei
└── images/                 # Mitarbeiter-Profilbilder
    ├── maxmustermann.webp
    ├── janedoe.webp
    ├── jondoe.webp
    ├── sarahmueller.webp
    ├── thomasschmidt.webp
    ├── lauraweiss.webp
    ├── michaelbecker.webp
    └── annakoch.webp
```

---

## 🚀 Installation & Start

### Voraussetzungen

- Moderner Webbrowser (Chrome 90+, Firefox 88+, Safari 14+)
- Lokaler Webserver (empfohlen) oder direktes Öffnen der HTML-Datei

### Schnellstart

1. **Repository klonen/herunterladen**

   ```bash
   # Dateien in Projektordner entpacken

   ```

2. **Bilder hinzufügen**
   ```bash
   #Lege die 8 .webp-Dateien in den Ordner images/
   ```
3. **Öffnen**

   ```bash
   ## Option 1: Direktes Öffnen
   Doppelklick auf index.html

   # Option 2: Live Server (VSCode Extension)
   Rechtsklick → "Open with Live Server"

   # Option 3: Python HTTP Server
   python -m http.server 8000
   # Dann Browser: http://localhost:8000
   ```

4. **Testen**
   ```bash
   -Tabelle mit 8 Mitarbeitern sollte erscheinen
   -Suchfeld testen: "IT" eingeben
   -Details-Button klicken → Modal öffnet
   markdown# 📚 Mitarbeiterverwaltung - Code-Dokumentation
   ```

## Inhaltsverzeichnis

- [Kernkonzepte](#kernkonzepte)
- [Datenfluss](#datenfluss)
- [Responsive Design](#responsive-design)
- [Roadmap](#roadmap)
- [Bekannte Probleme & Lösungen](#bekannte-probleme--lösungen)
- [Datenstruktur](#datenstruktur)
- [Lernziele](#lernziele)
- [Browser-Kompatibilität](#browser-kompatibilität)
- [Changelog](#changelog)

---

## Kernkonzepte

### 1. DOMContentLoaded - Timing

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // Code läuft ERST wenn HTML komplett geladen
});
```

**Warum?** JavaScript würde sonst vor HTML-Elementen laden → Fehler.

---

### 2. Hartcodierte Daten (Array von Objekten)

```javascript
const mitarbeiter = [
  { id: 1, vorname: "Max", name: "Mustermann", ... },
  { id: 2, vorname: "Jane", name: "Doe", ... }
];
```

**Warum hartcodiert?**

- Meilenstein 1: Fokus auf DOM-Manipulation, nicht Datenbank
- Einfaches Testen ohne Backend
- Ab Meilenstein 5: Migration zu localStorage

---

### 3. Spread-Operator für Kopie

```javascript
let aktuelleDaten = [...mitarbeiter];
```

**Warum Kopie?**

- `aktuelleDaten` wird bei Suche gefiltert
- `mitarbeiter` bleibt Original (Reset möglich)
- Verhindert ungewollte Datenänderungen

---

### 4. Event Delegation (Schlüssel-Technik)

```javascript
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("detailBtn")) {
    // Button-Logik
  }
});
```

**Warum `document` statt Button?**

- Buttons werden dynamisch in `renderTabelle()` erstellt
- Existieren noch NICHT beim ersten Script-Load
- Event "bubblet" von Button → document → Check ob `.detailBtn`

**Häufiger Fehler (gelöst):**

```javascript
// ❌ FALSCH - Variable überschreibt sich selbst
const mitarbeiter = mitarbeiter.find(...);

// ✅ RICHTIG
const gefundeneMitarbeiter = mitarbeiter.find(...);
```

---

### 5. Array-Methoden

#### forEach() - Iteration

```javascript
daten.forEach((mitarbeiter) => {
  // Für JEDEN Mitarbeiter eine Zeile erstellen
});
```

#### filter() - Suche

```javascript
mitarbeiter.filter((m) => m.name.toLowerCase().includes(suchbegriff));
```

**Returns:** Neues Array nur mit Matches

#### find() - Einzelner Eintrag

```javascript
mitarbeiter.find((m) => m.id === 3);
```

**Returns:** ERSTES Match oder `undefined`

---

### 6. Template Literals (Dynamisches HTML)

```javascript
row.innerHTML = `
  ${mitarbeiter.vorname}
  ${mitarbeiter.email}
`;
```

**Vorteile:**

- Variablen direkt einfügen mit `${}`
- Mehrzeilige Strings
- Lesbarer als String-Verkettung

---

### 7. CSS-Klassen manipulieren

```javascript
modal.classList.remove("hidden"); // Modal zeigen
modal.classList.add("hidden"); // Modal verstecken
```

**Beste Praxis:** CSS steuert Aussehen, JS nur Klassen ändern

---

## Datenfluss (Ablauf)

```
1. Browser lädt HTML
   ↓
2. DOMContentLoaded Event feuert
   ↓
3. mitarbeiter-Array wird initialisiert
   ↓
4. aktuelleDaten = Kopie erstellt
   ↓
5. renderTabelle(aktuelleDaten) aufgerufen
   ↓
   → forEach über alle Mitarbeiter
   → Für jeden: createElement("tr")
   → innerHTML mit Template Literal füllen
   → appendChild an <tbody>
   ↓
6. Tabelle sichtbar
   ↓
7. USER: Tippt "IT" in Suchfeld
   ↓
8. "input" Event feuert
   ↓
9. filter() → aktuelleDaten = [Jane, John]
   ↓
10. renderTabelle(aktuelleDaten) erneut
   ↓
11. Tabelle zeigt nur gefilterte Zeilen
   ↓
12. USER: Klickt "Details"-Button
   ↓
13. Event bubblet zu document
   ↓
14. if-Check: classList.contains("detailBtn") → true
   ↓
15. dataset.id auslesen → "2"
   ↓
16. parseInt("2") → 2
   ↓
17. find(m => m.id === 2) → Mitarbeiter-Objekt
   ↓
18. zeigeDetails(mitarbeiter)
   ↓
   → innerHTML von detailContent setzen
   → modal.classList.remove("hidden")
   ↓
19. Modal mit Daten erscheint
```

---

## Responsive Design

### Mobile First Prinzip

1. **Basis-CSS:** Smartphone (< 768px)
2. **Media Query 1:** Tablet (768px - 1023px)
3. **Media Query 2:** Desktop (≥ 1024px)

---

### Layout-Transformation

#### Smartphone (Kartenansicht)

```
+-------------------------+
|   [Profilbild]          |
| Vorname: Max            |
| Name: Mustermann        |
| Email: max@firm.de      |
| Telefon: 123-456-789    |
| Abteilung: Vertrieb     |
| [Details anzeigen]      |
+-------------------------+
```

- `thead { display: none; }`
- `tr { display: block; }` → Karte
- Labels via `td::before { content: attr(data-label); }`

#### Tablet/Desktop (Tabellenansicht)

```
| Bild | Vorname | Name        | Email         | ... |
|------|---------|-------------|---------------|-----|
| Foto | Max     | Mustermann  | max@firm.de   | ... |
```

- Normale Tabelle mit Spalten
- Kleinere Bilder (50px statt 80px)
- Hover-Effekte

---

### Breakpoints

```css
/* Smartphone: Standard */
img {
  width: 80px;
  border-radius: 50%;
}

/* Tablet: ab 768px */
@media (min-width: 768px) {
  img {
    width: 50px;
    border-radius: 4px;
  }
  thead {
    display: table-header-group;
  }
}

/* Desktop: ab 1024px */
@media (min-width: 1024px) {
  .modal-content {
    max-width: 600px;
  }
}
```

---

## Roadmap (Meilensteine 2-5)

### Meilenstein 2: Dynamische Interaktion

- [ ] Form-Submit: Neuen Mitarbeiter hinzufügen
- [ ] Dynamische ID-Vergabe
- [ ] Form-Reset nach Speichern
- [ ] "Neuer Mitarbeiter"-Button funktional

### Meilenstein 3: Erweiterte Funktionen

- [ ] Bearbeiten-Button (Formular vorausfüllen)
- [ ] Löschen-Button mit Bestätigung
- [ ] Sortierung nach Spalten (Name, Abteilung...)
- [ ] Export als CSV

### Meilenstein 4: Validierung & Fehlerbehandlung

- [ ] Email-Format-Validierung
- [ ] Pflichtfelder prüfen
- [ ] Duplikate verhindern
- [ ] Benutzer-Feedback (Toast-Nachrichten)

### Meilenstein 5: Persistenz

- [ ] localStorage Integration
- [ ] Daten beim Laden wiederherstellen
- [ ] "Reset"-Button (zu Beispieldaten)
- [ ] JSON Import/Export

---

## Bekannte Probleme & Lösungen

### Problem 1: Modal öffnet nicht

**Symptom:** Klick auf "Details" → nichts passiert

**Ursachen & Fixes:**

```javascript
// ❌ FALSCH - Variable Shadowing
const mitarbeiter = mitarbeiter.find(...);

// ✅ RICHTIG
const gefundeneMitarbeiter = mitarbeiter.find(...);
```

**Debug:**

```javascript
console.log("Button geklickt:", event.target);
console.log("Gefunden:", gefundeneMitarbeiter);
```

---

### Problem 2: Buttons reagieren nicht

**Ursache:** Event-Listener vor DOM-Elementen geladen

**Fix:**

```javascript
// Alles in DOMContentLoaded wrappen
document.addEventListener("DOMContentLoaded", function () {
  // Hier kommt der Rest :)
});
```

---

### Problem 3: Suche löscht Tabelle

**Ursache:** `mitarbeiter`-Array überschrieben statt `aktuelleDaten`

**Fix:**

```javascript
// RICHTIG - Kopie filtern
aktuelleDaten = mitarbeiter.filter(...);
```

---

### Problem 4: Bilder laden nicht

**Ursache:** Dateipfade falsch oder Bilder fehlen

**Quick-Fix (Placeholder):**

```
<img src> fehlte in Dom Manipulation
```

## Datenstruktur

### Mitarbeiter-Objekt (Schema)

```javascript
{
  id: Number,              // Eindeutige ID (1, 2, 3...)
  bild: String,            // Pfad zu .webp-Datei
  vorname: String,         // Max
  name: String,            // Mustermann
  email: String,           // max@firm.de
  phone: String,           // 123-456-7890
  abteilung: String,       // Vertrieb, IT, HR...
  position: String,        // Verkaufsleiter, Developer...
  bemerkung: String        // Freitext (Aufgaben, Skills...)
  gehalt: String           // Angaben über Gehalt
}
```

### Aktuelle Beispieldaten

- **Anzahl:** 8 Mitarbeiter
- **Abteilungen:** Vertrieb, IT, HR, Marketing, Finanzen
- **Positionen:** Verkaufsleiter, Senior Developer, Frontend Developer, Personalleiterin, Marketing Manager, Buchhalterin, Account Manager, QA Testerin
- **Gehaltsspanne:** 3.800€ - 6.000€ Brutto/Monat

#### Mitarbeiterübersicht

| ID  | Name           | Abteilung | Position           | Gehalt |
| --- | -------------- | --------- | ------------------ | ------ |
| 1   | Max Mustermann | Vertrieb  | Verkaufsleiter     | 5.000€ |
| 2   | Jane Doe       | IT        | Senior Developer   | 6.000€ |
| 3   | John Doe       | IT        | Frontend Developer | 5.500€ |
| 4   | Sarah Müller   | HR        | Personalleiterin   | 4.800€ |
| 5   | Thomas Schmidt | Marketing | Marketing Manager  | 4.500€ |
| 6   | Laura Weiss    | Finanzen  | Buchhalterin       | 3.800€ |
| 7   | Michael Becker | Vertrieb  | Account Manager    | 4.200€ |
| 8   | Anna Koch      | IT        | QA Testerin        | 4.700€ |

#### Abteilungsverteilung

- **IT:** 3 Mitarbeiter (Jane, John, Anna)
- **Vertrieb:** 2 Mitarbeiter (Max, Michael)
- **HR:** 1 Mitarbeiter (Sarah)
- **Marketing:** 1 Mitarbeiter (Thomas)
- **Finanzen:** 1 Mitarbeiter (Laura)

## Browser-Kompatibilität

| Browser | Version | Status         |
| ------- | ------- | -------------- |
| Chrome  | 90+     | ✅ Vollständig |
| Firefox | 88+     | ✅ Vollständig |
| Safari  | 14+     | ✅ Vollständig |
| Edge    | 90+     | ✅ Vollständig |
| Opera   | 76+     | ✅ Vollständig |

**IE11:** ❌ Nicht unterstützt (ES6-Features)

---

## Changelog

### v0.1 - 26.01.2026 (Meilenstein 1)

- ✅ Initiale Projektstruktur
- ✅ Hartcodierte Daten (8 Mitarbeiter)
- ✅ Tabellenansicht mit dynamischem Rendering
- ✅ Suchfunktion (Echtzeit-Filter)
- ✅ Detail-Modal mit vollständigen Infos
- ✅ Responsive Design (Mobile First)
- ✅ Event Delegation für dynamische Buttons
- ✅ Gehaltsinformationen pro Mitarbeiter

## Projektinformationen

**Projekt:** Projektarbeit Javascript Matthias Osypka für Velptec

**Kontext:** Mittelständisches Unternehmen - Überarbeitung Mitarbeiterverwaltung  
**Technologie-Fokus:** Vanilla JavaScript (kein React/Vue/Angular)  
**Entwicklungsstand:** Meilenstein 1 von 5 abgeschlossen  
**Datum:** Januar 2026

---

**Letzte Aktualisierung:** 26. Januar 2026
