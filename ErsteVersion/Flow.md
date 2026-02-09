graph TD
Start([Start: Anwendung laden]) --> Init[System initialisieren]
Init --> LoadData{Daten vorhanden?}

    LoadData -->|Ja| DisplayList[Mitarbeiterliste anzeigen]
    LoadData -->|Nein| EmptyState[Leere Liste anzeigen]

    EmptyState --> MainMenu
    DisplayList --> MainMenu[Hauptmenü]

    MainMenu --> Action{Benutzeraktion}

    Action -->|Liste anzeigen| ShowList[Mitarbeiterliste darstellen]
    Action -->|Suchen/Filtern| SearchFilter[Such- und Filterfunktion]
    Action -->|Neuer Mitarbeiter| AddEmployee[Formular: Neuer Mitarbeiter]
    Action -->|Bearbeiten| EditEmployee[Mitarbeiter auswählen]
    Action -->|Löschen| DeleteEmployee[Mitarbeiter auswählen zum Löschen]

    %% Liste anzeigen
    ShowList --> SortOptions{Sortierung wählen?}
    SortOptions -->|Ja| ApplySort[Sortierung anwenden]
    SortOptions -->|Nein| DisplayTable[Tabelle/Cards anzeigen]
    ApplySort --> DisplayTable
    DisplayTable --> MainMenu

    %% Suchen und Filtern
    SearchFilter --> InputSearch[Suchbegriff eingeben]
    InputSearch --> FilterCriteria{Filterkriterien?}
    FilterCriteria -->|Abteilung| FilterDept[Nach Abteilung filtern]
    FilterCriteria -->|Position| FilterPos[Nach Position filtern]
    FilterCriteria -->|Name| FilterName[Nach Name suchen]
    FilterCriteria -->|Alle| FilterAll[Alle Kriterien]

    FilterDept --> ShowResults[Gefilterte Ergebnisse anzeigen]
    FilterPos --> ShowResults
    FilterName --> ShowResults
    FilterAll --> ShowResults
    ShowResults --> MainMenu

    %% Neuer Mitarbeiter
    AddEmployee --> FillForm[Formulardaten eingeben]
    FillForm --> ValidateAdd{Validierung OK?}
    ValidateAdd -->|Nein| ShowError1[Fehler anzeigen]
    ShowError1 --> FillForm
    ValidateAdd -->|Ja| SaveNew[Neuen Mitarbeiter speichern]
    SaveNew --> UpdateList1[Liste aktualisieren]
    UpdateList1 --> Success1[Erfolg: Bestätigung anzeigen]
    Success1 --> MainMenu

    %% Mitarbeiter bearbeiten
    EditEmployee --> SelectEdit[Mitarbeiter aus Liste wählen]
    SelectEdit --> LoadEdit[Daten in Formular laden]
    LoadEdit --> ModifyData[Daten bearbeiten]
    ModifyData --> ValidateEdit{Validierung OK?}
    ValidateEdit -->|Nein| ShowError2[Fehler anzeigen]
    ShowError2 --> ModifyData
    ValidateEdit -->|Ja| SaveChanges[Änderungen speichern]
    SaveChanges --> UpdateList2[Liste aktualisieren]
    UpdateList2 --> Success2[Erfolg: Bestätigung anzeigen]
    Success2 --> MainMenu

    %% Mitarbeiter löschen
    DeleteEmployee --> SelectDelete[Mitarbeiter aus Liste wählen]
    SelectDelete --> ConfirmDelete{Löschen bestätigen?}
    ConfirmDelete -->|Nein| MainMenu
    ConfirmDelete -->|Ja| DeleteRecord[Datensatz löschen]
    DeleteRecord --> UpdateList3[Liste aktualisieren]
    UpdateList3 --> Success3[Erfolg: Bestätigung anzeigen]
    Success3 --> MainMenu

    %% Styling
    classDef processClass fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
    classDef decisionClass fill:#F5A623,stroke:#D68910,stroke-width:2px,color:#fff
    classDef successClass fill:#7ED321,stroke:#5FA319,stroke-width:2px,color:#fff
    classDef errorClass fill:#D0021B,stroke:#A00116,stroke-width:2px,color:#fff
    classDef startClass fill:#9013FE,stroke:#6B0FC9,stroke-width:3px,color:#fff

    class Start,MainMenu startClass
    class LoadData,Action,SortOptions,FilterCriteria,ValidateAdd,ValidateEdit,ConfirmDelete decisionClass
    class DisplayList,ShowList,DisplayTable,ShowResults,SaveNew,SaveChanges,DeleteRecord processClass
    class Success1,Success2,Success3 successClass
    class ShowError1,ShowError2 errorClass

Hauptfunktionen:

System-Initialisierung - Lädt bestehende Daten oder zeigt eine leere Liste
Mitarbeiterliste anzeigen - Mit Sortieroptionen und verschiedenen Anzeigemöglichkeiten
Suchen & Filtern - Nach Name, Abteilung, Position oder kombinierten Kriterien
Neuer Mitarbeiter - Formular mit Validierung und Fehlerbehandlung
Bearbeiten - Mitarbeiter auswählen, Daten ändern, speichern
Löschen - Mit Sicherheitsabfrage vor dem Löschen

Farbcodierung:

Lila: Start/Hauptmenü
Blau: Verarbeitungsschritte
Orange: Entscheidungspunkte
Grün: Erfolgreiche Aktionen
Rot: Fehlermeldungen

Der Flow zeigt, dass alle Aktionen wieder zum Hauptmenü zurückführen, was eine kontinuierliche Nutzung der Anwendung ermöglicht. Jeder Prozess beinhaltet Validierung und Fehlerbehandlung für eine robuste Benutzererfahrung.
