# Server og Client Components i Next.js

Som standard er layouter og sider serverkomponenter, som lar deg hente data og gjengi deler av brukergrensesnittet ditt på serveren, eventuelt mellomlagre resultatet og strømme det til klienten. Når du trenger interaktivitet eller nettleser-API-er, kan du bruke klientkomponenter for å legge til funksjonalitet i flere lag.

## På serveren

På serveren bruker Next.js Reacts API-er for å orkestrere rendering. Renderingsarbeidet er delt inn i deler, etter individuelle rutesegmenter (layouter og sider):

Serverkomponenter gjengis i et spesielt dataformat kalt React Server Component Payload (RSC Payload).
Klientkomponenter og RSC Payload brukes til å forhåndsrendere HTML.

## På klienten (første lasting)

Deretter, på klienten:

HTML brukes til å umiddelbart vise en rask, ikke-interaktiv forhåndsvisning av ruten til brukeren.
RSC Payload brukes til å avstemme klient- og serverkomponenttrærne.
JavaScript brukes til å hydrere klientkomponenter og gjøre applikasjonen interaktiv.

## Reduser bundle-størrelse

For å redusere størrelsen på klientens JavaScript/Typescript-pakker, legg til «bruk klient» i spesifikke interaktive komponenter i stedet for å merke store deler av brukergrensesnittet som klientkomponenter.

## Client Components

Det finnes to måter å hente data i klientkomponenter på, ved å bruke:

1. Reacts use hook

2. Et fellesskapsbibliotek som SWR eller React Query

## Strømming av data med use()

Du kan bruke Reacts use hook til å strømme data fra serveren til klienten. Start med å hente data i serverkomponenten din, og send promise til klientkomponenten din som prop:

Når du bruker async/await i Server Components, vil Next.js velge dynamisk gjengivelse. Dette betyr at dataene hentes og gjengis på serveren for hver brukerforespørsel. Hvis det er noen trege dataforespørsler, vil hele ruten bli blokkert fra gjengivelse.

For å forbedre den første lastetiden og brukeropplevelsen kan du bruke strømming til å dele opp sidens HTML i mindre biter og gradvis sende disse bitene fra serveren til klienten.

Det finnes to måter du kan implementere strømming i applikasjonen din på, men for oss er kun 1 aktuell: Pakking av en komponent med <Suspense>

### Med <Suspense>

Med <Suspense> kan du være mer detaljert om hvilke deler av siden som skal strømmes. Du kan for eksempel umiddelbart vise sideinnhold som faller utenfor <Suspense>-grensen, og strømme i listen over blogginnlegg innenfor grensen.

En umiddelbar lastetilstand er et reservegrensesnitt som vises umiddelbart til brukeren etter navigering. For best mulig brukeropplevelse anbefales  å designe lastetilstander som er meningsfulle og hjelper brukerne å forstå at appen reagerer. Vi benytter function Skepetion via import { Skeleton } from "@/components/ui/skeleton".



# "use server"

'use server' er til bruk med React Server-komponenter.

Direktivet use server angir en funksjon eller fil som skal kjøres på serversiden. Det kan brukes øverst i en fil for å indikere at alle funksjoner i filen er på serversiden, eller innebygd øverst i en funksjon for å markere funksjonen som en serverfunksjon. Dette er en React-funksjon.

For å bruke serverfunksjoner i klientkomponenter må du opprette serverfunksjonene dine i en eller flere dedikert filer ved å bruke use server-direktivet øverst i filen. Disse serverfunksjonene kan deretter importeres til klient- og serverkomponenter og kjøres.



## Server Functions

Serverfunksjoner lar klientkomponenter kalle asynkrone funksjoner som utføres på serveren.

Klientkomponenter kan importere serverfunksjoner fra filer som bruker direktivet "use server"

For å importere en serverfunksjon fra klientkode, må direktivet brukes på modulnivå.

Serverfunksjoner bør kalles i en overgang. Serverfunksjoner som sendes til <form action> eller formAction vil automatisk bli kalt i en overgang.

Serverfunksjoner er utformet for mutasjoner som oppdaterer serversidetilstanden; de anbefales ikke for datahenting. Følgelig behandler rammeverk som implementerer Serverfunksjoner vanligvis én handling om gangen og har ikke en måte å mellomlagre returverdien på.



## Kall på en serverfunksjon utenfor <form>

Serverfunksjoner er eksponerte serverendepunkter og kan kalles hvor som helst i klientkoden.

Når du bruker en serverfunksjon utenfor et skjema, kall serverfunksjonen i en overgang, som lar deg vise en lasteindikator, vise optimistiske tilstandsoppdateringer og håndtere uventede feil. Skjemaer vil automatisk pakke inn serverfunksjoner i overganger.

#### Serverfunksjoner med useActionState

Du kan kalle serverfunksjoner med useActionState i vanlige tilfeller der du bare trenger tilgang til handlingens ventende status og siste returnerte svar.

Serverfunksjoner støtter også progressiv forbedring med det tredje argumentet useActionState

# Nesting av klientkomponenter i serverkomponenter

Ved å kombinere server- og klientkomponenter skal vi bygge en nettside som er både effektive og interaktiv:

Serverkomponenter: Brukes for statisk innhold, datahenting og SEO-vennlige elementer.
Klientkomponenter: Brukes for interaktive elementer som krever tilstand, effekter eller nettleser-API-er.
Komponentsammensetning: Nesting av klientkomponenter i serverkomponenter etter behov for et klart skille mellom server- og klientlogikk.

## Dynamic Rendering

Med dynamisk gjengivelse genereres HTML på forespørselstidspunktet. Dette lar deg servere personlig tilpasset innhold basert på data på forespørselstidspunktet.

En komponent blir dynamisk hvis den bruker følgende API-er:

cookies
headers
connection
draftMode
searchParams prop
unstable_noStore
fetch with { cache: 'no-store' }
I delvis forhåndsgjengivelse kaster bruk av disse API-ene en spesiell React-feil som informerer Next.js om at komponenten ikke kan gjengis statisk, noe som forårsaker en byggefeil. Du kan bruke en Suspense-grense for å pakke inn komponenten din for å utsette gjengivelsen til kjøretid.

## Suspense

React Suspense brukes til å utsette gjengivelse av deler av applikasjonen din inntil en betingelse er oppfylt.

I delvis forhåndsgjengivelse brukes Suspense til å markere dynamiske grenser i komponenttreet ditt.

Ved byggetidspunktet forhåndsgjengir Next.js det statiske innholdet og reservegrensesnittet. Det dynamiske innholdet utsettes til brukeren ber om ruten.

Å pakke inn en komponent i Suspense gjør ikke selve komponenten dynamisk (API-bruken din gjør det), men snarere brukes Suspense som en grense som innkapsler dynamisk innhold og muliggjør strømming.