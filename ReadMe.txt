================================================================================
PEOPLEDB - MITARBEITERVERWALTUNG
Version 0.5 Beta
LocalStorage Edition
================================================================================

## INHALTSVERZEICHNIS

1. Übersicht
2. Systemanforderungen
3. Installation
4. Erste Schritte
5. Funktionen im Detail
6. Tastenkombinationen
7. Datenexport/-import
8. Fehlerbehebung
9. Bekannte Einschränkungen
10. Tipps & Tricks
11. Support & Kontakt

================================================================================

1. # ÜBERSICHT

PeopleDB ist eine moderne, browserbasierte Mitarbeiterverwaltung ohne
Server-Abhängigkeit. Alle Daten werden lokal im Browser gespeichert
(localStorage) und bleiben nach dem Schließen erhalten.

HAUPTMERKMALE:

- Vollständige CRUD-Operationen (Create, Read, Update, Delete)
- Automatische Bild-Komprimierung
- Export/Import als JSON
- Responsive Design (Mobile, Tablet, Desktop)
- Live-Suche und Filter
- Sortierbare Tabellen
- Paginierung (10 Einträge pro Seite)
- Keine Installation erforderlich

# ================================================================================ 2. SYSTEMANFORDERUNGEN

BROWSER (einer der folgenden):
✓ Google Chrome 76+
✓ Mozilla Firefox 75+
✓ Safari 15.4+
✓ Microsoft Edge 79+
✗ Internet Explorer (nicht unterstützt)

SPEICHERPLATZ:

- Mindestens 5-10 MB freier Browser-Speicher (localStorage)
- Empfohlen: 20 MB für ~200 Mitarbeiter mit Bildern

BILDSCHIRMAUFLÖSUNG:

- Minimum: 320px Breite (Smartphones)
- Empfohlen: 1024px+ (Desktop)

JAVASCRIPT:

- Muss aktiviert sein

# ================================================================================ 3. INSTALLATION

## SCHNELLSTART (3 Schritte):

1. Entpacken Sie das ZIP-Archiv in einen Ordner Ihrer Wahl

2. Öffnen Sie die Datei "index.html" mit einem Browser
   - Windows: Rechtsklick → Öffnen mit → Chrome/Firefox
   - Mac: Rechtsklick → Öffnen mit → Safari/Chrome
   - Linux: Rechtsklick → Öffnen mit → Firefox/Chrome

3. Fertig! Die App startet sofort.

## DATEISTRUKTUR:

peopledb/
├── index.html Haupt-HTML-Datei (DIESE ÖFFNEN!)
├── style.css Alle Styles
├── script_local.js JavaScript Logic
├── mitarbeiter.json Beispieldaten (optional)
└── README.txt Diese Datei

## ALTERNATIVE: WEBSERVER

Falls gewünscht, kann die App auch über einen Webserver laufen:

Python (ab Version 3):
cd peopledb
python -m http.server 8000
Dann öffnen: http://localhost:8000

Node.js (mit npx):
cd peopledb
npx serve
Dann öffnen: http://localhost:3000

# ================================================================================ 4. ERSTE SCHRITTE

## ERSTEN MITARBEITER ANLEGEN:

1. Klicken Sie auf "➕ Neuer Mitarbeiter" (grüner Button oben)

2. Füllen Sie die Pflichtfelder aus:
   [*] Vorname z.B. "Max"
   [*] Nachname z.B. "Mustermann"
   [*] E-Mail z.B. "max.mustermann@firma.de"
   [*] Telefon z.B. "+49 123 456789"
   [*] Abteilung Dropdown-Auswahl
   [*] Position Dropdown-Auswahl (nach Abteilung)
   [*] Gehalt z.B. "5000€ pro Monat Brutto"
   [ ] Bemerkung Optional
   [ ] Profilbild Optional (max 5 MB)

3. Klicken Sie "💾 Speichern"

4. Der Mitarbeiter erscheint sofort in der Liste!

## SUCHEN & FILTERN:

→ Suchfeld oben: Tippen Sie Namen, Abteilung oder Position
→ Filter Abteilung: Wählen Sie eine Abteilung aus
→ Filter Position: Wählen Sie eine Position aus
→ Reset: Klicken Sie "🔄 Filter zurücksetzen"

## SORTIEREN:

→ Klicken Sie auf Spaltenüberschriften (Vorname, Name, etc.)
→ 1. Klick: Aufsteigend ▲
→ 2. Klick: Absteigend ▼

# ================================================================================ 5. FUNKTIONEN IM DETAIL

## MITARBEITER BEARBEITEN:

1. Klicken Sie "Edit" beim gewünschten Mitarbeiter
2. Formular wird mit aktuellen Daten gefüllt
3. Ändern Sie die Felder
4. Klicken Sie "Aktualisieren"
   → Änderungen werden sofort gespeichert

## MITARBEITER LÖSCHEN:

1. Klicken Sie "Delete" beim gewünschten Mitarbeiter
2. Bestätigen Sie die Sicherheitsabfrage
3. Mitarbeiter wird gelöscht
   → Bei Fehler automatischer Rollback

## MITARBEITER DETAILS ANSEHEN:

1. Klicken Sie "Detail" beim gewünschten Mitarbeiter
2. Modal-Fenster öffnet sich mit allen Informationen
3. Schließen mit [×] oder Klick außerhalb

## BILDER HOCHLADEN:

→ Unterstützte Formate: JPG, PNG, WebP
→ Maximale Größe: 5 MB (Original)
→ Automatische Komprimierung auf 400×400px @ 80% Qualität
→ Finale Größe: ~40-50 KB (spart Speicher!)

TIPP: Große Bilder (3+ MB) werden automatisch verkleinert.
Sie sehen eine Toast-Nachricht mit Größenvergleich.

## DATENEXPORT:

1. Klicken Sie "📤 Export" (lila Button oben rechts)
2. JSON-Datei wird heruntergeladen
3. Dateiname: peopledb_export_JJJJ-MM-TT.json
4. Enthält ALLE Mitarbeiter inkl. Bilder

WICHTIG: Exportieren Sie regelmäßig als Backup!

## DATENIMPORT:

1. Klicken Sie "📥 Import" (lila Button oben rechts)
2. Wählen Sie eine JSON-Datei aus
3. Daten werden importiert und validiert
4. ACHTUNG: Überschreibt aktuelle Daten!

TIPP: Exportieren Sie vorher, um Datenverlust zu vermeiden!

## RESET (ZURÜCKSETZEN):

1. Klicken Sie "🔄 Reset" (rosa Button oben rechts)
2. Bestätigen Sie die Sicherheitsabfrage
3. localStorage wird geleert
4. Seite lädt neu
5. Originaldaten aus mitarbeiter.json werden geladen

ACHTUNG: Alle Änderungen gehen verloren!
Vorher exportieren!

## PAGINIERUNG:

→ 10 Einträge pro Seite
→ Navigation mit "← Zurück" und "Weiter →"
→ Anzeige: "Seite X von Y (Z Einträge)"

## CARD vs. TABELLEN ANSICHT:

→ < 5 Einträge: Card-Layout (Kacheln)
→ ≥ 5 Einträge: Tabellen-Layout
→ Automatische Umschaltung

# ================================================================================ 6. TASTENKOMBINATIONEN

## WINDOWS/LINUX:

[Strg] + [F] Browser-Suche (funktioniert in Tabelle)
[F12] Developer Tools öffnen (für Debug)
[Strg] + [Shift] + [R] Hard-Reload (Cache löschen)
[ESC] Modal schließen (falls offen)

## MAC:

[Cmd] + [F] Browser-Suche
[Cmd] + [Alt] + [I] Developer Tools
[Cmd] + [Shift] + [R] Hard-Reload
[ESC] Modal schließen

# ================================================================================ 7. DATENEXPORT/-IMPORT

## JSON-FORMAT (Export):

{
"exported": "2026-01-30T12:00:00.000Z",
"version": "1.0",
"count": 15,
"employees": [
{
"id": 1738245600000,
"vorname": "Max",
"name": "Mustermann",
"email": "max@firma.de",
"phone": "+49 123 456789",
"abteilung": "IT",
"position": "Developer",
"bemerkung": "Senior Developer",
"gehalt": "5000€ pro Monat Brutto",
"bild": "data:image/jpeg;base64,..."
}
]
}

## KOMPATIBLE FORMATE:

✓ PeopleDB Export (mit "employees" Feld)
✓ Einfaches Array [ {...}, {...} ]
✗ CSV (nicht unterstützt)
✗ Excel (nicht unterstützt)

## BACKUP-STRATEGIE:

EMPFOHLEN:

1. Wöchentlicher Export als Backup
2. Bei größeren Änderungen sofort exportieren
3. Backups an sicheren Ort speichern (Cloud, USB)

WICHTIG:
→ localStorage kann vom Browser gelöscht werden!
→ "Browserdaten löschen" entfernt ALLE Mitarbeiter!
→ Regelmäßige Backups sind Pflicht!

# ================================================================================ 8. FEHLERBEHEBUNG

## PROBLEM: Weißer Bildschirm beim Öffnen

LÖSUNG:

1. Browser-Konsole öffnen (F12)
2. Fehlermeldungen prüfen
3. localStorage löschen:
   - Konsole öffnen (F12)
   - Eingeben: localStorage.clear()
   - Enter drücken
   - Seite neu laden (F5)

## PROBLEM: Daten werden nicht gespeichert

LÖSUNG:

1. Prüfen: Cookies/localStorage erlaubt?
   Chrome: Einstellungen → Datenschutz → Cookies
   Firefox: Einstellungen → Datenschutz → Verlauf
2. Prüfen: Speicherplatz voll?
   - Konsole (F12) öffnen
   - Nach "QuotaExceededError" suchen
   - Alte Daten exportieren & Reset

## PROBLEM: Import funktioniert nicht

LÖSUNG:

1. JSON-Datei validieren: https://jsonlint.com
2. Prüfen: Ist es eine .json Datei?
3. Prüfen: Enthält die Datei "employees" oder Array?
4. Bei Fehler: Konsole (F12) prüfen

## PROBLEM: Bilder werden nicht angezeigt

LÖSUNG:

1. Bild zu groß? (max 5 MB Original)
2. Format unterstützt? (JPG, PNG, WebP)
3. Browser-Konsole (F12) auf Fehler prüfen
4. Bild neu hochladen mit kleinerer Datei

## PROBLEM: Tabelle sieht komisch aus

LÖSUNG:

1. Browser-Cache leeren (Strg + Shift + R)
2. Zoom auf 100% setzen (Strg + 0)
3. Anderen Browser testen
4. DevTools ausschalten (F12)

## PROBLEM: Suche findet nichts

LÖSUNG:

1. Filter zurücksetzen (🔄 Button)
2. Groß-/Kleinschreibung egal (automatisch)
3. Nur Vorname, Name, Abteilung, Position werden durchsucht
4. E-Mail/Telefon NICHT durchsucht

# ================================================================================ 9. BEKANNTE EINSCHRÄNKUNGEN

## LOKALER SPEICHER:

✗ Keine Server-Synchronisierung
✗ Daten nur in DIESEM Browser gespeichert
✗ Andere Browser = Andere Datenbank
✗ Inkognito-Modus = Daten weg nach Schließen
✗ Browser-Daten löschen = Alle Mitarbeiter weg

LÖSUNG: Regelmäßig exportieren!

## SPEICHERGRÖSSE:

✗ Maximale Größe: ~5-10 MB (browserabhängig)
✗ Empfohlen: Max. 200 Mitarbeiter mit Bildern
✗ Bei Überschreitung: QuotaExceededError

LÖSUNG: Alte Daten exportieren & Reset

## MULTI-USER:

✗ Keine gleichzeitige Bearbeitung möglich
✗ Jeder Browser hat eigene Daten
✗ Keine Benutzer-Authentifizierung
✗ Keine Zugriffsrechte

LÖSUNG: Für echtes Multi-User Backend nötig!

## DATENSICHERHEIT:

⚠ Daten NICHT verschlüsselt
⚠ Jeder mit Zugriff auf PC kann Daten sehen
⚠ Keine Passwort-Sperre
⚠ localStorage = Klartext

LÖSUNG: Nur auf vertrauenswürdigen Geräten nutzen!

## BROWSER-KOMPATIBILITÄT:

✗ Internet Explorer: Nicht unterstützt
✗ Alte Browser (< 2020): Teilweise nicht unterstützt
✗ Lazy Loading: Nur moderne Browser

LÖSUNG: Aktuellen Browser verwenden!

# ================================================================================ 10. TIPPS & TRICKS

## PERFORMANCE:

→ Bei 100+ Mitarbeitern: Bilder klein halten (< 100 KB)
→ Bei 200+ Mitarbeitern: Erwägen Sie Backend-Lösung
→ Regelmäßig localStorage-Größe prüfen (DevTools → Application)

## WORKFLOW:

→ Tipp 1: Abteilungen zuerst alphabetisch anlegen
→ Tipp 2: Positionen konsistent benennen
→ Tipp 3: E-Mail-Format einheitlich (@firma.de)
→ Tipp 4: Gehalt-Format einheitlich ("XXXX€ pro Monat Brutto")

## BILDER:

→ Tipp 1: Quadratische Bilder sehen besser aus
→ Tipp 2: Vorher zuschneiden spart Speicher
→ Tipp 3: JPG statt PNG (kleinere Dateien)
→ Tipp 4: Profilfotos mit neutralem Hintergrund

## BACKUP:

→ Tipp 1: Export-Datei mit Datum benennen
→ Tipp 2: Cloud-Sync (Dropbox, Google Drive)
→ Tipp 3: Vor jedem Import vorher exportieren
→ Tipp 4: Mehrere Backup-Versionen aufheben

## SUCHE:

→ Tipp 1: Teilwort-Suche funktioniert ("Mus" findet "Mustermann")
→ Tipp 2: Groß-/Kleinschreibung egal
→ Tipp 3: Filter kombinierbar (Suche + Abteilung)
→ Tipp 4: Sortierung bleibt erhalten

# ================================================================================ 11. SUPPORT & KONTAKT

## BEI PROBLEMEN:

1. Diese README.txt komplett lesen
2. Browser-Konsole (F12) auf Fehler prüfen
3. Mit anderem Browser testen
4. localStorage löschen & neu starten

## HÄUFIGE FRAGEN:

F: Wo werden die Daten gespeichert?
A: Im Browser-localStorage (lokal auf Ihrem PC)

F: Kann ich von mehreren Geräten darauf zugreifen?
A: Nein, jeder Browser hat eigene Daten. Export/Import nutzen!

F: Sind die Daten nach Browser-Update weg?
A: Normalerweise nicht, aber zur Sicherheit exportieren!

F: Kann ich Excel/CSV importieren?
A: Nein, nur JSON-Format. Excel → JSON konvertieren online möglich.

F: Funktioniert es offline?
A: Ja! Keine Internetverbindung nötig nach erstem Laden.

F: Kann ich das Design anpassen?
A: Ja, style.css bearbeiten (CSS-Kenntnisse erforderlich)

F: Wie viele Mitarbeiter kann ich speichern?
A: Empfohlen max. 200 mit Bildern (ca. 10 MB)

F: Ist das DSGVO-konform?
A: Lokal ja (keine Server). Aber: Daten unverschlüsselt!

================================================================================
VERSIONSHISTORIE
================================================================================

Version 0.5 Beta (30.01.2026)

- Bild-Komprimierung hinzugefügt
- Export/Import/Reset Funktionen
- Card-Layout für wenige Einträge
- Lazy Loading für Bilder
- localStorage mit Rollback
- Optimiertes CSS (~150 Zeilen gespart)

Version 0.4 Beta (29.01.2026)

- LocalStorage Integration
- CRUD-Operationen
- Toast-Notifications
- Formular-Validierung

Version 0.3 Beta (28.01.2026)

- Responsive Design
- Paginierung
- Sortierung

Version 0.2 Beta (27.01.2026)

- Such- & Filterfunktionen
- Modal-Dialog

Version 0.1 Alpha (26.01.2026)

- Erste Version
- Basis-Tabelle

================================================================================
LIZENZ
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
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

================================================================================
DANKE FÜR DIE NUTZUNG VON PEOPLEDB!
================================================================================

Entwickelt mit ❤️ und ☕

Viel Erfolg mit Ihrer Mitarbeiterverwaltung!

================================================================================
