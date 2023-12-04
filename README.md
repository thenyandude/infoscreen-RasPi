**Milepæl 1 - Prosjektplanlegging**

**Prosjektbeskrivelse**

**Teknologier**
- **Backend:** Node.js, MongoDB, VMWare
- **Frontend:** React, Express, RasberryPI3B+

**Overordnet Tilnærming**

Jeg vil helst prøve å holde meg til MVC modellen, og bruke low coupling high cohesion konseptet.

Jeg har lyst til å prøve å lage en grafisk versjon av admin panelet, hvor du kan legge inn filer, og velge rekkefølgen de vises i og hvor lenge.

**Utfordringer**

| **Oppgave**    | **Potensielle Utfordringer**                                            |
|------------------------|-----------------------------------------------------------------|
| Planlegging            | Velge riktige teknologier                                       |
| Backend-implementering | Database implementering, dytte og lese data, og sikre databasen |
| Frontend-utvikling     | Integrere React-komponenter uten problemer / bugs               |

**Tidsplan**

| **Fase**            | **Forventet Tidsbruk**|
|------------------------|--------------------|
| Prosjektplanlegging    | 4 timer            |
| Backend-implementering | 6 timer            |
| Frontend-utvikling     | 5 timer            |
| Testing og Debugging   | 8 timer            |
| Dokumentasjon          | 4 timer            |



**Milepæl 2 - Konsept**


Oversikt over tredjepartsprogramvare

Gi en liste og korte beskrivelser av eventuell tredjepartsprogramvare eller biblioteker som skal integreres i prosjektet. Dette kan inkludere verktøy for filbehandling, sikkerhet eller andre funksjoner som styrker kjerne-teknologiene.
Beskrivelse av prototypen

Prototypens Funksjonaliteter

Prototypen er designet for å inneholde kjernefunksjonaliteter som gir brukeren muligheten til å administrere og styre filvisning. Her er de sentrale funksjonene:

    Opplasting av Filer:
        Legg til en opplastingsfunksjon som tillater brukeren å laste opp filer til systemet.
        Implementer støtte for ulike filformater som skal vises.

    Tidsinnstilling for Filvisning:
        Lag et brukervennlig grensesnitt for å velge hvor lenge hver fil skal vises før det byttes til neste.
        Tillat brukeren å angi varighet i sekunder eller minutter, avhengig av preferanse.

    Databaseintegrasjon:
        Implementer funksjonalitet for å lagre filinformasjon i databasen (MongoDB).
        Lag en strukturert database for å holde styr på filer, deres varighet og andre relevante attributter.

Bruksscenarier

For å forstå hvordan brukerne vil samhandle med prototypen, vurder følgende bruksscenarier:

    Opplasting av en Fil:
        Brukeren går til opplastingsgrensesnittet, velger ønsket fil, og laster den opp i systemet.
        Systemet lagrer filen i databasen og tilknytter nødvendig metadata, inkludert visningsvarighet.

    Konfigurere Visningstid:
        Brukeren går til grensesnittet for tidsinnstilling, velger en fil og angir ønsket varighet.
        Systemet lagrer denne informasjonen i databasen og tar hensyn til den ved visning.

    Automatisk Filbytte:
        Systemet bytter automatisk til neste fil etter den angitte visningstiden.
        Hvis det ikke er flere filer, kan systemet enten stoppe visningen eller gå tilbake til den første filen, avhengig av konfigurasjonen.
