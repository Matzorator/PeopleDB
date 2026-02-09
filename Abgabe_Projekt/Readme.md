````markdown
# 👤 PeopleDB - Mitarbeiterverwaltung

## 📋 Inhaltsverzeichnis

- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Verwendung](#-verwendung)
- [Technologien](#-technologien)
- [Browser-Support](#-browser-support)
- [Dateistruktur](#-dateistruktur)
- [Konfiguration](#-konfiguration)
- [Bekannte Einschränkungen](#-bekannte-einschränkungen)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🗄️ Datenverwaltung

- ✅ **LocalStorage Persistenz** - Daten bleiben nach Browser-Reload erhalten
- ✅ **CRUD-Operationen** - Erstellen, Lesen, Aktualisieren, Löschen mit Rollback
- ✅ **Export zu JSON** - Backup aller Daten als Download
- ✅ **Import von JSON** - Daten aus Datei wiederherstellen
- ✅ **Reset-Funktion** - Zurück zu Originaldaten aus `mitarbeiter.json`

### 🎨 Benutzeroberfläche

- ✅ **Responsive Design** - Optimiert für Mobile, Tablet und Desktop
- ✅ **Hybrid Layout** - Card-Ansicht (< 5 Einträge), Tabelle (≥ 5 Einträge)
- ✅ **Toast Notifications** - Visuelles Feedback für alle Aktionen
- ✅ **Modal Dialog** - Detailansicht für Mitarbeiter
- ✅ **Empty States** - Hilfreiche Hinweise bei leeren Ansichten
- ✅ **Smooth Animations** - CSS Transitions und Keyframes

### 🔍 Such- & Filterfunktionen

- ✅ **Live-Suche** - Echtzeit-Suche nach Name, Abteilung oder Position
- ✅ **Abteilungs-Filter** - Dynamisches Dropdown
- ✅ **Positions-Filter** - Abhängig von gewählter Abteilung
- ✅ **Sortierung** - Klick auf Spaltenüberschriften (aufsteigend/absteigend)
- ✅ **Filter Reset** - Alle Filter mit einem Klick zurücksetzen

### 📄 Paginierung

- ✅ **10 Einträge pro Seite** - Übersichtliche Darstellung
- ✅ **Navigation** - Vor/Zurück-Buttons
- ✅ **Seiten-Info** - Aktuelle Seite und Gesamtanzahl

### 📝 Formular & Validierung

- ✅ **Inline-Validierung** - Echtzeit-Feedback während Eingabe
- ✅ **HTML5 Validierung** - Required, Pattern, Email, Tel
- ✅ **Custom Error Messages** - Deutsche Fehlermeldungen
- ✅ **Tooltips** - Hilfestellung bei Eingabefeldern
- ✅ **Edit-Modus** - Bearbeitung bestehender Mitarbeiter

### 🖼️ Bild-Handling

- ✅ **Bild-Upload** - File-Input für Profilbilder
- ✅ **Automatische Komprimierung** - 400x400px @ 80% Qualität
- ✅ **Größen-Validierung** - Max 5 MB Original, Max 500 KB komprimiert
- ✅ **Lazy Loading** - Bilder laden bei Bedarf
- ✅ **Base64-Speicherung** - Keine externen Dependencies

### 🎯 Performance

- ✅ **Error Handling** - Try/Catch mit Rollback-System
- ✅ **Console Logging** - Debug-Informationen
- ✅ **Optimierte Animationen** - CSS Hardware-Beschleunigung

---

## 📦 Installation

### Voraussetzungen

- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Kein Server erforderlich (rein clientseitig)

### Schnellstart

1. **Dateien öffnen**

```bash
# Öffne index.html in deinem Browser
# Keine Build-Tools oder Dependencies erforderlich!
```
````

### Manuelle Installation

1. Lade alle Dateien herunter:
   - `index.html`
   - `style.css`
   - `script_local.js`
   - `mitarbeiter.json` (optionale Beispieldaten)
2. Öffne `index.html` im Browser

**Das war's! 🎉**

---

## 🎯 Verwendung

### Mitarbeiter hinzufügen

1. Klicke auf **"➕ Neuer Mitarbeiter"**
2. Fülle alle Pflichtfelder aus:
   - Vorname
   - Nachname
   - E-Mail
   - Telefon
   - Abteilung
   - Position
   - Gehalt
3. Optional: Profilbild hochladen (wird automatisch komprimiert)
4. Klicke **"💾 Speichern"**

### Mitarbeiter bearbeiten

1. Klicke auf **"Edit"** beim gewünschten Mitarbeiter
2. Ändere die Daten im Formular
3. Klicke **"Aktualisieren"**

### Mitarbeiter löschen

1. Klicke auf **"Delete"** beim gewünschten Mitarbeiter
2. Bestätige die Sicherheitsabfrage
3. Mitarbeiter wird gelöscht (mit Rollback bei Fehler)

### Suchen \& Filtern

**Suche:**

```
Tippe in das Suchfeld → Ergebnisse werden live gefiltert
```

**Filter:**

```
Wähle Abteilung → Positions-Dropdown wird aktualisiert
Wähle Position → Tabelle wird gefiltert
```

**Reset:**

```
Klicke "🔄 Filter zurücksetzen" → Alle Filter werden zurückgesetzt
```

### Sortieren

Klicke auf eine Spaltenüberschrift:

- **1. Klick:** Aufsteigend sortieren ▲
- **2. Klick:** Absteigend sortieren ▼

### Daten sichern

**Export:**

```bash
Klicke "📤 Export"
→ JSON-Datei wird heruntergeladen (peopledb_export_YYYY-MM-DD.json)
```

**Import:**

```bash
Klicke "📥 Import"
→ Wähle JSON-Datei
→ Daten werden importiert und gespeichert
```

**Reset:**

```bash
Klicke "🔄 Reset"
→ Bestätige Sicherheitsabfrage
→ Originaldaten aus mitarbeiter.json werden wiederhergestellt
```

---

## 🛠️ Technologien

### Frontend

- **HTML5** - Semantisches Markup
- **CSS3** - Modern CSS mit Variables, Grid, Flexbox
- **JavaScript (ES6+)** - Vanilla JS, keine Frameworks

### APIs

- **LocalStorage API** - Persistente Datenhaltung
- **FileReader API** - Datei-Upload
- **Canvas API** - Bild-Komprimierung
- **Blob API** - Datei-Download

### Design

- **Mobile-First Approach**
- **CSS Custom Properties (Variables)**
- **CSS Grid \& Flexbox**
- **CSS Animations \& Transitions**

---

## 🌐 Browser-Support

| Browser | Version | Status               |
| :------ | :------ | :------------------- |
| Chrome  | 76+     | ✅ Vollständig       |
| Firefox | 75+     | ✅ Vollständig       |
| Safari  | 15.4+   | ✅ Vollständig       |
| Edge    | 79+     | ✅ Vollständig       |
| IE      | -       | ❌ Nicht unterstützt |

**Hinweis:** Lazy Loading erfordert moderne Browser. Ältere Browser laden Bilder sofort.

---

## 📁 Dateistruktur

```
peopledb/
│
├── index.html              # Haupt-HTML-Datei
├── style.css               # Alle Styles (~1400 Zeilen)
├── script_local.js         # JavaScript Logic (~1200 Zeilen)
├── mitarbeiter.json        # Beispiel-/Fallback-Daten
├── README.md               # Diese Datei
│
└── screenshots/            # (Optional)
    └── screenshot.png
```

---

## ⚙️ Konfiguration

### Paginierung anpassen

**In `script_local.js` ändern:**

```javascript
const eintraegeProSeite = 10; // Ändere auf gewünschte Anzahl
```

### Card/Tabellen-Schwellenwert

**In `renderTabelle()` Funktion:**

```javascript
const useCardLayout = daten.length < 5; // Ändere Grenzwert
```

### Bild-Komprimierung anpassen

**In `komprimiereBild()` Aufruf:**

```javascript
// Kleinere Bilder (schneller, weniger Speicher)
komprimiereBild(file, 300, 300, 0.7); // ~25 KB

// Standard (empfohlen)
komprimiereBild(file, 400, 400, 0.8); // ~45 KB

// Höhere Qualität (größer, bessere Qualität)
komprimiereBild(file, 600, 600, 0.9); // ~120 KB
```

### localStorage Key ändern

**In `script_local.js`:**

```javascript
const storageManager = new LocalStorageManager("dein_custom_key");
```

### Farben anpassen

**In `style.css` (CSS Variables):**

```css
:root {
  --primary: #3b82f6; /* Blau */
  --secondary: #10b981; /* Grün */
  --danger: #ef4444; /* Rot */
  --warning: #f59e0b; /* Orange */
}
```

---

## ⚠️ Bekannte Einschränkungen

### localStorage Limits

- **Maximale Größe:** ~5-10 MB (browserabhängig)
- **Empfohlene Anzahl:** Max. 200 Mitarbeiter mit Bildern
- **Lösung:** Alte Daten exportieren, dann Reset durchführen

### Datensicherheit

- ⚠️ **Keine Server-Synchronisierung** - Nur lokaler Browser-Speicher
- ⚠️ **Keine Multi-User Unterstützung** - Jeder Browser hat eigene Daten
- ⚠️ **Keine Versionierung** - Nur aktueller Stand
- ⚠️ **Keine Verschlüsselung** - Daten im Klartext gespeichert
- ⚠️ **Datenverlust möglich** - Browser-Daten löschen = Datenverlust

### Funktionalität

- ❌ Kein Backend
- ❌ Keine Benutzer-Authentifizierung
- ❌ Keine Cloud-Synchronisierung
- ❌ Keine automatischen Backups

---

## 🗺️ Roadmap

### Version 1.0 (Geplant)

- [ ] PDF-Export
- [ ] Excel/CSV-Export
- [ ] Bulk-Operationen (Mehrfach-Löschen)
- [ ] Dark Mode
- [ ] Erweiterte Statistiken
- [ ] localStorage Quota Warning

### Version 2.0 (Zukunft)

- [ ] Backend-Integration (REST API)
- [ ] MySQL/PostgreSQL Datenbank
- [ ] User-Login \& Authentifizierung
- [ ] Multi-User Synchronisierung
- [ ] Cloud-Backup

### Version 3.0 (Vision)

- [ ] Role-Based Access Control (RBAC)
- [ ] Audit Log
- [ ] DSGVO-Compliance Tools
- [ ] Mobile App (React Native)
- [ ] Mehrsprachigkeit (i18n)

---

## 🐛 Troubleshooting

### Problem: Weißer Bildschirm

**Lösung:**

```javascript
// Browser-Konsole öffnen (F12)
// Fehler anschauen
// localStorage löschen:
localStorage.clear();
// Seite neu laden
```

### Problem: Daten werden nicht gespeichert

**Lösung:**

1. Prüfe Browser-Einstellungen (Cookies/localStorage erlaubt?)
2. Prüfe Speicherplatz (localStorage voll?)
3. Console-Fehler prüfen (F12)

### Problem: Bilder zu groß

**Lösung:**

- Upload-Limit: 5 MB
- Komprimiertes Limit: 500 KB
- Automatische Komprimierung auf 400x400px

### Problem: Import funktioniert nicht

**Lösung:**

- Nur JSON-Dateien erlaubt
- Datei muss Array oder `{employees: [...]}` enthalten
- Validiere JSON-Format online: [jsonlint.com](https://jsonlint.com)

---

## 🤝 Contributing

Beiträge sind willkommen!

### So kannst du beitragen:

1. **Fork** das Repository
2. **Branch** erstellen (`git checkout -b feature/AmazingFeature`)
3. **Commit** deine Änderungen (`git commit -m 'Add: Amazing Feature'`)
4. **Push** zum Branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** öffnen

### Code-Style

- ES6+ JavaScript
- Kommentare auf Deutsch
- Semantic HTML
- BEM-ähnliche CSS-Namenskonvention

---

## 📄 License

Dieses Projekt ist lizenziert unter der **MIT License**.

```
MIT License

Copyright (c) 2026 [Dein Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Autor

**Matthias Osypka**

- Email: Matthias.Osypka@icloud.com

---

## 🙏 Danksagungen

- Icons: Unicode Emojis
- Font: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- Inspiration: Moderne Admin-Dashboards

---

## 📊 Projekt-Statistik

```
Zeilen Code:        ~2800
Funktionen:         35+
Features:           35
CSS Klassen:        80+
Event Listener:     20+
Browser-Support:    97%+
```

---

## 📞 Support

Bei Fragen oder Problemen:

- Kommt noch :)

---

---

<div align="center">

**Entwickelt mit ❤️ und ☕**

[⬆ Nach oben](#-peopledb---mitarbeiterverwaltung)

</div>
```
