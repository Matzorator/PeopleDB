# 👤 PeopleDB - Mitarbeiterverwaltung

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> **Eine moderne, vollständig clientseitige Mitarbeiterverwaltung mit LocalStorage-Persistenz, Bild-Upload und responsivem Design. Gebaut mit Vanilla JavaScript - keine Frameworks, keine Dependencies.**

[![🚀 Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=for-the-badge)](https://IHR-USERNAME.github.io/peopledb/)
[![📥 Download](https://img.shields.io/badge/Download-ZIP-blue?style=for-the-badge)](https://github.com/IHR-USERNAME/peopledb/archive/refs/heads/main.zip)

---

## 🎬 Demo

### Desktop-Ansicht
![Desktop Tabellenansicht](screenshots/desktop_table.png)
*Vollständige Tabellenansicht mit Live-Suche, Filtern und Sortierung*

### Mobile-Ansicht
![Mobile Card-Ansicht](screenshots/mobile_cards.png)
*Responsive Card-Layout für Touch-Bedienung*

### Formular & Validierung
![Formular mit Validierung](screenshots/form_validation.png)
*Inline-Validierung und Fehlerbehandlung*

---

## ⚡ Quick Start

```bash
# 1. Repository klonen
git clone https://github.com/Matzorator/PeopleDB/peopledb.git
cd peopledb

# 2. Python Webserver starten
python -m http.server 8000

# 3. Browser öffnen
# → http://localhost:8000
```

**Das war's!** Die App lädt automatisch 60 Beispiel-Mitarbeiter. 🎉

**Oder direkt ausprobieren:** [Live Demo auf GitHub Pages](https://IHR-USERNAME.github.io/peopledb/)

---

## ✨ Highlights

- 🗄️ **Persistente Datenhaltung** - LocalStorage mit Import/Export-Funktion
- 🎨 **Responsive Design** - Automatische Anpassung: Cards (Mobile) ↔ Tabelle (Desktop)
- 🔍 **Smart Filtering** - Live-Suche + dynamische Abteilungs-/Positions-Filter
- 🖼️ **Bild-Upload & Komprimierung** - Automatisch auf 400x400px @ 80% Qualität
- 📄 **Paginierung** - 10 Einträge pro Seite mit Navigation
- ⚡ **Vanilla JavaScript** - Keine Dependencies, pure ES6+ (2800+ Zeilen Code)

<details>
<summary>📋 Alle Features anzeigen (35+)</summary>

### 🗄️ Datenverwaltung
- ✅ LocalStorage Persistenz - Daten bleiben nach Browser-Reload erhalten
- ✅ CRUD-Operationen - Erstellen, Lesen, Aktualisieren, Löschen
- ✅ Export zu JSON - Backup aller Daten als Download
- ✅ Import von JSON - Daten aus Datei wiederherstellen
- ✅ Reset-Funktion - Zurück zu Originaldaten

### 🎨 Benutzeroberfläche
- ✅ Responsive Design - Mobile, Tablet und Desktop
- ✅ Hybrid Layout - Card-Ansicht (< 5 Einträge), Tabelle (≥ 5 Einträge)
- ✅ Toast Notifications - Visuelles Feedback für alle Aktionen
- ✅ Modal Dialog - Detailansicht für Mitarbeiter
- ✅ Smooth Animations - CSS Transitions

### 🔍 Such- & Filterfunktionen
- ✅ Live-Suche - Echtzeit nach Name, Abteilung oder Position
- ✅ Abteilungs-Filter - Dynamisches Dropdown
- ✅ Positions-Filter - Abhängig von gewählter Abteilung
- ✅ Sortierung - Klick auf Spaltenüberschriften
- ✅ Filter Reset - Alle Filter mit einem Klick zurücksetzen

### 📝 Formular & Validierung
- ✅ Inline-Validierung - Echtzeit-Feedback
- ✅ HTML5 Validierung - Required, Pattern, Email, Tel
- ✅ Custom Error Messages - Deutsche Fehlermeldungen
- ✅ Edit-Modus - Bearbeitung bestehender Mitarbeiter

### 🖼️ Bild-Handling
- ✅ Bild-Upload - File-Input für Profilbilder
- ✅ Automatische Komprimierung - 400x400px @ 80% Qualität
- ✅ Größen-Validierung - Max 5 MB Original
- ✅ Base64-Speicherung - Keine externen Dependencies

</details>

---

## 📦 Installation

### ⚠️ WICHTIG: Lokaler Webserver erforderlich!

Die Anwendung **muss** über einen lokalen Webserver ausgeführt werden (CORS-Policy).

### Voraussetzungen

- Python **ODER** Node.js (für lokalen Server)
- Moderner Browser (Chrome, Firefox, Safari, Edge)

### Option 1: Python Webserver (EMPFOHLEN) ⭐

```bash
# Im Projektordner
python -m http.server 8000

# Dann Browser öffnen:
# http://localhost:8000
```

### Option 2: VS Code Live Server

1. Extension installieren: **"Live Server"** von Ritwick Dey
2. Rechtsklick auf `index.html`
3. **"Open with Live Server"** wählen

### Option 3: Node.js http-server

```bash
npm install -g http-server
http-server -p 8000
```

---

## 🎯 Verwendung

### Mitarbeiter hinzufügen

1. Klicke **"➕ Neuer Mitarbeiter"**
2. Fülle alle Pflichtfelder aus
3. Optional: Profilbild hochladen
4. Klicke **"💾 Speichern"**

### Mitarbeiter bearbeiten

1. Klicke **"Edit"** beim gewünschten Mitarbeiter
2. Ändere die Daten
3. Klicke **"Aktualisieren"**

### Suchen & Filtern

- **Suche:** Tippe in das Suchfeld → Live-Filter
- **Abteilungs-Filter:** Wähle Abteilung → Positionen werden aktualisiert
- **Reset:** Klicke "🔄 Filter zurücksetzen"

### Sortieren

Klicke auf Spaltenüberschrift:

- **1. Klick:** Aufsteigend ▲
- **2. Klick:** Absteigend ▼

### Daten sichern

- **Export:** Klicke "📤 Export" → JSON-Download
- **Import:** Klicke "📥 Import" → Wähle JSON-Datei
- **Reset:** Klicke "🔄 Reset" → Originaldaten wiederherstellen

---

## 🛠️ Technologien

### Frontend

- **HTML5** - Semantisches Markup
- **CSS3** - Variables, Grid, Flexbox, Animations
- **JavaScript ES6+** - Vanilla JS, keine Frameworks

### APIs

- **LocalStorage API** - Persistente Datenhaltung
- **FileReader API** - Datei-Upload
- **Canvas API** - Bild-Komprimierung
- **Blob API** - Datei-Download

### Design

- **Mobile-First Approach**
- **Responsive Design** - CSS Media Queries
- **CSS Custom Properties**

---

## 🌐 Browser-Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 76+ | ✅ Vollständig |
| Firefox | 75+ | ✅ Vollständig |
| Safari | 15.4+ | ✅ Vollständig |
| Edge | 79+ | ✅ Vollständig |
| IE | - | ❌ Nicht unterstützt |

---

## 📁 Dateistruktur

```
peopledb/
│
├── index.html              # Haupt-HTML-Datei
├── style.css               # Alle Styles (~1400 Zeilen)
├── script_local.js         # JavaScript Logic (~1200 Zeilen)
├── mitarbeiter.json        # Beispieldaten (60 Mitarbeiter)
├── README.md               # Diese Dokumentation
│
├── screenshots/            # Demo-Screenshots
│   ├── desktop_table.png
│   ├── mobile_cards.png
│   └── form_validation.png
│
└── images/                 # Profilbilder
    └── [verschiedene .webp Dateien]
```

---

## 🗺️ Roadmap

### 🎯 Version 1.0 (Aktuell)

- ✅ Vollständige CRUD-Funktionalität
- ✅ LocalStorage-Persistenz
- ✅ Responsive Design
- ✅ Bild-Upload & Komprimierung

### 🔄 Version 2.0 (Geplant - Python Backend)

- 🔨 **Flask REST API** - Backend-Integration
- 🔨 **SQLite/PostgreSQL** - Datenbank statt LocalStorage
- 🔨 **User Authentication** - Login/Register System
- 🔨 **Multi-User Support** - Daten-Synchronisierung

### 🚀 Version 3.0 (Zukunft)

- 📊 **Dashboard & Analytics** - Statistiken mit Chart.js
- 📧 **Email-Benachrichtigungen** - Python SMTP
- 📄 **PDF Export** - Mitarbeiter-Reports
- 🔍 **Erweiterte Suche** - Fuzzy-Search

---

## ⚠️ Bekannte Einschränkungen

### LocalStorage Limits

- **Max. Größe:** ~5-10 MB (browserabhängig)
- **Empfehlung:** Max. 200 Mitarbeiter mit Bildern
- **Lösung:** Export → Reset bei Bedarf

### Datensicherheit

- ⚠️ Nur lokaler Browser-Speicher
- ⚠️ Keine Server-Synchronisierung
- ⚠️ Browser-Daten löschen = Datenverlust
- ⚠️ Keine Verschlüsselung

---

## 🐛 Troubleshooting

### Weißer Bildschirm

```javascript
// Browser-Konsole öffnen (F12)
localStorage.clear();
location.reload();
```

### CORS-Fehler

**Problem:** `Failed to fetch mitarbeiter.json`  
**Lösung:** Nutze einen lokalen Webserver (siehe Installation)

### Daten werden nicht gespeichert

1. Prüfe Browser-Einstellungen (LocalStorage erlaubt?)
2. Prüfe Speicherplatz (localStorage voll?)
3. Console-Fehler prüfen (F12)

---

## 🤝 Contributing

Beiträge sind willkommen!

1. Fork das Repository
2. Branch erstellen (`git checkout -b feature/NeuesFeature`)
3. Commit (`git commit -m 'Add: Neues Feature'`)
4. Push (`git push origin feature/NeuesFeature`)
5. Pull Request öffnen

---

## 📄 License

MIT License - siehe [LICENSE](LICENSE) Datei

---

## 📬 Kontakt

**Matthias Osypka**

[![Email](https://img.shields.io/badge/Email-Matthias.Osypka%40icloud.com-blue?style=flat-square&logo=mail.ru)](mailto:Matthias.Osypka@icloud.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/Matzorator)

💡 **Suche nach:** Junior Entwickler Position im Bereich Fullstack Web Entwicklung

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

<div align="center">

**Entwickelt mit ❤️ und ☕**

[⬆ Nach oben](#-peopledb---mitarbeiterverwaltung)

</div>
