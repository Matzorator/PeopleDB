================================================================================
                    PeopleDB v0.5 - LocalStorage Edition
================================================================================

Mitarbeiterverwaltung mit localStorage-Persistierung

Autor: Matthias Osypka
Email: Matthias.Osypka@icloud.com
Version: v0.5 - Januar 2026


================================================================================
WICHTIG: LOKALER WEBSERVER ERFORDERLICH!
================================================================================

Die Anwendung MUSS über einen lokalen Webserver gestartet werden!

GRUND:
Browser blockieren fetch()-Zugriffe auf lokale Dateien (CORS-Policy).
Direktes Öffnen der index.html per Doppelklick funktioniert NICHT!

FEHLER BEI DIREKTEM ÖFFNEN:
"Access to fetch at 'file:///.../mitarbeiter.json' from origin 'null' 
has been blocked by CORS policy: Cross origin requests are only supported 
for protocol schemes: http, https, chrome-extension, chrome-untrusted."


================================================================================
INSTALLATION & START
================================================================================

OPTION 1: Python Webserver (EMPFOHLEN) ⭐
---------------------------------------
1. Terminal/Kommandozeile öffnen
2. In den Projektordner navigieren:
   cd pfad/zu/peopledb

3. Webserver starten:
   # Python 3:
   python -m http.server 8000
   
   # Python 2:
   python -m SimpleHTTPServer 8000

4. Browser öffnen:
   http://localhost:8000


OPTION 2: Node.js http-server
------------------------------
1. http-server installieren (einmalig):
   npm install -g http-server

2. Im Projektordner starten:
   cd pfad/zu/peopledb
   http-server -p 8000

3. Browser öffnen:
   http://localhost:8000


OPTION 3: VS Code Live Server Extension
----------------------------------------
1. Extension installieren: "Live Server" (Ritwick Dey)
2. Rechtsklick auf index.html
3. "Open with Live Server" wählen
4. Browser öffnet automatisch


OPTION 4: PHP Webserver
------------------------
cd pfad/zu/peopledb
php -S localhost:8000

Browser öffnen: http://localhost:8000


================================================================================
VORAUSSETZUNGEN
================================================================================

✓ Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
✓ Python ODER Node.js ODER PHP (für lokalen Webserver)
✗ Internet Explorer wird NICHT unterstützt


================================================================================
FUNKTIONEN
================================================================================

DATENVERWALTUNG:
✓ LocalStorage Persistenz - Daten bleiben nach Browser-Reload erhalten
✓ CRUD-Operationen - Erstellen, Lesen, Aktualisieren, Löschen mit Rollback
✓ Export zu JSON - Backup aller Daten als Download
✓ Import von JSON - Daten aus Datei wiederherstellen
✓ Reset-Funktion - Zurück zu Originaldaten aus mitarbeiter.json

BENUTZEROBERFLÄCHE:
✓ Responsive Design - Optimiert für Mobile, Tablet und Desktop
✓ Hybrid Layout - Card-Ansicht (< 5 Einträge), Tabelle (≥ 5 Einträge)
✓ Toast Notifications - Visuelles Feedback für alle Aktionen
✓ Modal Dialog - Detailansicht für Mitarbeiter
✓ Empty States - Hilfreiche Hinweise bei leeren Ansichten
✓ Smooth Animations - CSS Transitions und Keyframes

SUCH- & FILTERFUNKTIONEN:
✓ Live-Suche - Echtzeit-Suche nach Name, Abteilung oder Position
✓ Abteilungs-Filter - Dynamisches Dropdown
✓ Positions-Filter - Abhängig von gewählter Abteilung
✓ Sortierung - Klick auf Spaltenüberschriften (aufsteigend/absteigend)
✓ Filter Reset - Alle Filter mit einem Klick zurücksetzen

PAGINIERUNG:
✓ 10 Einträge pro Seite - Übersichtliche Darstellung
✓ Navigation - Vor/Zurück-Buttons
✓ Seiten-Info - Aktuelle Seite und Gesamtanzahl

FORMULAR & VALIDIERUNG:
✓ Inline-Validierung - Echtzeit-Feedback während Eingabe
✓ HTML5 Validierung - Required, Pattern, Email, Tel
✓ Custom Error Messages - Deutsche Fehlermeldungen
✓ Tooltips - Hilfestellung bei Eingabefeldern
✓ Edit-Modus - Bearbeitung bestehender Mitarbeiter

BILD-HANDLING:
✓ Bild-Upload - File-Input für Profilbilder
✓ Automatische Komprimierung - 400x400px @ 80% Qualität
✓ Größen-Validierung - Max 5 MB Original, Max 500 KB komprimiert
✓ Lazy Loading - Bilder laden bei Bedarf
✓ Base64-Speicherung - Keine externen Dependencies


================================================================================
BEDIENUNG
================================================================================

ERSTES LADEN:
- 60 Beispiel-Mitarbeiter werden aus mitarbeiter.json geladen
- 8 Profilbilder im images/ Ordner
- Automatische Speicherung in localStorage


MITARBEITER HINZUFÜGEN:
1. Klicke "➕ Neuer Mitarbeiter"
2. Fülle alle Pflichtfelder aus:
   - Vorname
   - Nachname
   - E-Mail
   - Telefon
   - Abteilung
   - Position
   - Gehalt
3. Optional: Profilbild hochladen (wird automatisch komprimiert)
4. Klicke "💾 Speichern"


MITARBEITER BEARBEITEN:
1. Klicke "Edit" beim gewünschten Mitarbeiter
2. Ändere Daten im Formular
3. Klicke "Aktualisieren"


MITARBEITER LÖSCHEN:
1. Klicke "Delete" beim gewünschten Mitarbeiter
2. Bestätige Sicherheitsabfrage
3. Mitarbeiter wird gelöscht (mit Rollback bei Fehler)


SUCHEN & FILTERN:
- Suche: Tippe in Suchfeld → Ergebnisse live gefiltert
- Filter: Wähle Abteilung → Positions-Dropdown aktualisiert
         Wähle Position → Tabelle gefiltert
- Reset: Klicke "🔄 Filter zurücksetzen"


SORTIEREN:
- Klicke auf Spaltenüberschrift:
  • 1. Klick: Aufsteigend sortieren ▲
  • 2. Klick: Absteigend sortieren ▼


EXPORT/IMPORT:
- Export: Klicke "📤 Export"
         → JSON-Datei wird heruntergeladen (peopledb_export_YYYY-MM-DD.json)

- Import: Klicke "📥 Import"
         → Wähle JSON-Datei
         → Daten werden importiert und gespeichert


RESET:
- Klicke "🔄 Reset"
- Bestätige Sicherheitsabfrage
- Originaldaten aus mitarbeiter.json werden wiederhergestellt


================================================================================
PROJEKTSTRUKTUR
================================================================================

peopledb/
│
├── index.html              # Haupt-HTML-Datei
├── style.css               # Alle Styles (~1400 Zeilen)
├── script_local.js         # JavaScript Logic (~1200 Zeilen)
├── mitarbeiter.json        # Beispiel-/Fallback-Daten (60 Mitarbeiter)
├── README.md               # Markdown-Dokumentation
├── README.txt              # Diese Datei
│
└── images/                 # Profilbilder (WebP-Format)
    ├── maxmustermann.webp
    ├── janedoe.webp
    ├── jondoe.webp
    ├── sarahmueller.webp
    ├── thomasschmidt.webp
    ├── lauraweiss.webp
    ├── michaelbecker.webp
    └── annakoch.webp


HINWEIS: 
Die Profilbilder sind optional. Wenn keine Bilder vorhanden sind, 
werden Platzhalter angezeigt.


================================================================================
BILD-VERWALTUNG
================================================================================

VORHANDENE BILDER:
Der images/ Ordner enthält 8 Beispiel-Profilbilder im WebP-Format.
Diese werden in der mitarbeiter.json referenziert:

Beispiel:
{
  "id": 1,
  "bild": "images/maxmustermann.webp",
  "vorname": "Max",
  ...
}


EIGENE BILDER HINZUFÜGEN:

1. Per Datei-Upload:
   - Klicke "Neuer Mitarbeiter"
   - Wähle "Bild auswählen"
   - Bild wird automatisch komprimiert und als Base64 gespeichert

2. Per JSON-Import:
   - Bilder als Base64-String: "bild": "data:image/jpeg;base64,/9j/4AAQ..."
   - Bilder als Pfad: "bild": "images/meinbild.webp"

3. Externe URLs:
   - Platzhalter: "https://via.placeholder.com/100?text=AB"
   - Eigene URLs: "https://example.com/avatar.jpg"


UNTERSTÜTZTE FORMATE:
✓ JPG/JPEG
✓ PNG
✓ WebP
✓ GIF (nicht animiert)
✗ SVG (Sicherheitsgründe)


BILD-LIMITS:
- Original: Max. 5 MB
- Komprimiert: Max. 500 KB (400x400px @ 80% Qualität)


================================================================================
TECHNOLOGIEN
================================================================================

FRONTEND:
- HTML5 - Semantisches Markup
- CSS3 - Modern CSS mit Variables, Grid, Flexbox
- JavaScript (ES6+) - Vanilla JS, keine Frameworks

APIS:
- LocalStorage API - Persistente Datenhaltung
- FileReader API - Datei-Upload
- Canvas API - Bild-Komprimierung
- Blob API - Datei-Download

DESIGN:
- Mobile-First Approach
- CSS Custom Properties (Variables)
- CSS Grid & Flexbox
- CSS Animations & Transitions


================================================================================
BROWSER-SUPPORT
================================================================================

Browser         Version     Status
------------------------------------------------
Chrome          76+         ✓ Vollständig
Firefox         75+         ✓ Vollständig
Safari          15.4+       ✓ Vollständig
Edge            79+         ✓ Vollständig
Internet Explorer  -        ✗ Nicht unterstützt


================================================================================
TROUBLESHOOTING
================================================================================

PROBLEM: Weißer Bildschirm
--------------------------
LÖSUNG:
1. Browser-Konsole öffnen (F12)
2. Fehler anschauen
3. localStorage löschen:
   localStorage.clear();
4. Seite neu laden:
   location.reload();


PROBLEM: Daten werden nicht gespeichert
---------------------------------------
LÖSUNG:
1. Prüfe Browser-Einstellungen (Cookies/localStorage erlaubt?)
2. Prüfe Speicherplatz (localStorage voll?)
3. Console-Fehler prüfen (F12)


PROBLEM: Bilder zu groß
-----------------------
LÖSUNG:
- Upload-Limit: 5 MB
- Komprimiertes Limit: 500 KB
- Automatische Komprimierung auf 400x400px


PROBLEM: Import funktioniert nicht
----------------------------------
LÖSUNG:
- Nur JSON-Dateien erlaubt
- Datei muss Array oder {"employees": [...]} enthalten
- Validiere JSON-Format: https://jsonlint.com


PROBLEM: Keine Beispieldaten beim ersten Start
----------------------------------------------
LÖSUNG:
1. localStorage leeren:
   F12 → Console → localStorage.clear() → Enter
2. Seite neu laden (F5)
3. Falls weiterhin leer: Prüfe ob mitarbeiter.json im selben Ordner 
   wie index.html liegt


PROBLEM: CORS-Fehler "Failed to fetch mitarbeiter.json"
-------------------------------------------------------
URSACHE:
Du hast die index.html direkt per Doppelklick geöffnet (file:// Protocol)

LÖSUNG:
✓ Nutze einen lokalen Webserver (siehe "INSTALLATION & START")
✗ NICHT die HTML-Datei direkt öffnen

ALTERNATIVE (nur für Tests):
Chrome mit CORS deaktiviert starten:
chrome.exe --allow-file-access-from-files
⚠ Nur für Tests! Sicherheitsrisiko!


================================================================================
BEKANNTE EINSCHRÄNKUNGEN
================================================================================

LOCALSTORAGE LIMITS:
- Maximale Größe: ~5-10 MB (browserabhängig)
- Empfohlene Anzahl: Max. 200 Mitarbeiter mit Bildern
- Lösung: Alte Daten exportieren, dann Reset durchführen

DATENSICHERHEIT:
⚠ Keine Server-Synchronisierung - Nur lokaler Browser-Speicher
⚠ Keine Multi-User Unterstützung - Jeder Browser hat eigene Daten
⚠ Keine Versionierung - Nur aktueller Stand
⚠ Keine Verschlüsselung - Daten im Klartext gespeichert
⚠ Datenverlust möglich - Browser-Daten löschen = Datenverlust

FUNKTIONALITÄT:
✗ Kein Backend
✗ Keine Benutzer-Authentifizierung
✗ Keine Cloud-Synchronisierung
✗ Keine automatischen Backups


================================================================================
KONFIGURATION
================================================================================

PAGINIERUNG ANPASSEN:
In script_local.js ändern:
const eintraegeProSeite = 10; // Auf gewünschte Anzahl ändern


CARD/TABELLEN-SCHWELLENWERT:
In renderTabelle() Funktion:
const useCardLayout = daten.length < 5; // Grenzwert ändern


BILD-KOMPRIMIERUNG ANPASSEN:
In komprimiereBild() Aufruf:

// Kleinere Bilder (schneller, weniger Speicher)
komprimiereBild(file, 300, 300, 0.7); // ~25 KB

// Standard (empfohlen)
komprimiereBild(file, 400, 400, 0.8); // ~45 KB

// Höhere Qualität (größer, bessere Qualität)
komprimiereBild(file, 600, 600, 0.9); // ~120 KB


LOCALSTORAGE KEY ÄNDERN:
In script_local.js:
const storageManager = new LocalStorageManager("dein_custom_key");


FARBEN ANPASSEN:
In style.css (CSS Variables):
:root {
  --primary: #3b82f6; /* Blau */
  --secondary: #10b981; /* Grün */
  --danger: #ef4444; /* Rot */
  --warning: #f59e0b; /* Orange */
}


================================================================================
PROJEKT-STATISTIK
================================================================================

Zeilen Code:        ~2800
Funktionen:         35+
Features:           35
CSS Klassen:        80+
Event Listener:     20+
Browser-Support:    97%+
Dateien:            6 + 8 Bilder


================================================================================
ROADMAP
================================================================================

VERSION 1.0 (GEPLANT):
□ PDF-Export
□ Excel/CSV-Export
□ Bulk-Operationen (Mehrfach-Löschen)
□ Dark Mode
□ Erweiterte Statistiken
□ localStorage Quota Warning

VERSION 2.0 (ZUKUNFT):
□ Backend-Integration (REST API)
□ MySQL/PostgreSQL Datenbank
□ User-Login & Authentifizierung
□ Multi-User Synchronisierung
□ Cloud-Backup

VERSION 3.0 (VISION):
□ Role-Based Access Control (RBAC)
□ Audit Log
□ DSGVO-Compliance Tools
□ Mobile App (React Native)
□ Mehrsprachigkeit (i18n)


================================================================================
LICENSE
================================================================================

MIT License

Copyright (c) 2026 Matthias Osypka

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


================================================================================
AUTOR
================================================================================

Name: Matthias Osypka
Email: Matthias.Osypka@icloud.com


================================================================================
SUPPORT
================================================================================

Bei Fragen oder Problemen:
Email: Matthias.Osypka@icloud.com


================================================================================
DANKSAGUNGEN
================================================================================

- Icons: Unicode Emojis
- Font: Google Fonts - Inter
- Inspiration: Moderne Admin-Dashboards


================================================================================

Entwickelt mit ❤️ und ☕

Version: v0.5 - Januar 2026
PeopleDB - LocalStorage Edition

================================================================================
