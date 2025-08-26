# Gemeni
Documents, guidelines and code
## Overordnet mål

- Det overordnede målet relatert til kodestruktur er å gjøre det mulig for utviklere å skrive kode som er:
  - Lett å resonnere rundt: Tydelig og logisk organisering gjør koden enklere å forstå og feilsøke.
  - Lett å legge til ny funksjonalitet: Modulær design muliggjør sømløs integrering av nye funksjoner.
  - Effektiv: Godt strukturert kode kan ofte føre til bedre ytelse.

## Absolutte krav

### Modularitet

- Del opp kode i små funksjoner, metoder og klasser som hver utfører én eller et begrenset antall spesifikke oppgaver. Dette fremmer modularitet og gjør det enklere å forstå, teste og modifisere individuelle deler uten å påvirke hele systemet.

### Single source of truth (UI)

- Enkel sannhetskilde (for brukergrensesnitt): I utviklingen skal vi sørge for enveis databinding, der de underliggende dataene er den eneste sannhetskilden, og brukergrensesnittet er en refleksjon av disse dataene. Endringer i brukergrensesnittet initieres ved å oppdatere dataene, som deretter flyter gjennom et forutsigbart system for å oppdatere de synlige elementene.

## Drømmemål

- Kunne strukturere koden vår i individuelle deler der nesten hver eneste linje er selvstendig.
  - Det eneste en gitt linje er avhengig av er input (eksplisitte angitt i akkurat den linjen)
  - De eneste konsekvensene av linjen ville være dens utdata (eksplisitt angitt i akkurat den linjen)
  - Og hver linje kan få en fin, lesbar etikett for når vi bruker den!

- Dette kan forandre hvordan vi skriver kode, feilsøker den og leser om andres kode.

## Hvordan oppnå dette?

### Functional programming

- **"Små funksjoner:"** Lagre hver eneste linje (eller noen få linjer) som sin egen funksjon
- "**Ingen konsekvenser bortsett fra på den linjen."** Hver funksjons eneste «konsekvens» er at resultatet skal gis spesifikt til den neste kodelinjen («funksjonskall») og ikke til noen andre linjer
- **"Rekombiner/komponer:"** Bygg opp applikasjonen vår ved å bruke disse små blokkene med selvstendig kode, og kombiner dem linje for linje ved å referere til deres menneskelig lesbare navn.

### Funksjonelle programmeringsteknikker – Hvordan rekombinerer vi?

#### Å kombinere funksjonene våre vil kreve en rekke interessante teknikker for å:

- koble sammen disse «kodelinjene» (små funksjoner) til oppgaver i full størrelse:
- gjør det enkelt å gjenbruke disse funksjonene overalt
- sørge for at de små funksjonene virkelig er selvstendige

## (1) Higher order functions, (2) Function composition

### Mange av disse kodeatomene (små funksjoner) vil være gjenbrukbare

- De er små nok til at de er oppgaver som å øke et tall, å gå gjennom en matrise i løkker
- Vi ønsker å skrive én gang, bruke igjen og igjen - selv for oppgaver som ikke er helt identiske - og holde
  koden vår DRY

## (3) Pure functions, Immutability of state (uforanderlig tilstand)

- Vi kan ikke la kodelinjene våre være avhengige av eksterne
  data bortsett fra deres eksplisitt angitte inndata.
- Det er spesielt viktig når du gjenbruker/rekombinerer mange av disse små ett-trinnsfunksjonene i
  mange helt forskjellige scenarier – de bør være selvstendige!

## (4) Closure, (5) Function Decoration (6) Partial application & Currying

- Vi trenger metoder til å:
  - Justere funksjonene dersom de ikke passer helt sammen slik de opprinnelig ble lagret
  - Gi funksjonene våre ekstra funksjoner uten å måtte skrive en ny funksjon fra bunnen av

## Hvis vi kan oppå nå dette, vil koden vår bli:

- Mer lesbar
  - hver kodelinje har et navn som angir målet, kjent som «deklarativ» programmering
- Enklere å feilsøke
  - Hver kodelinje er en individuell enhet med tydelig input og output – ingen uventede konsekvenser av å bruke den linjen («funksjonen»)
- Enklere å legge til funksjoner
  - de fleste nye tingene vi vil gjøre er kombinasjoner av noe vi har gjort andre steder i appen vår

## Vår slutt og begynnelse

Funksjoner blir gjenbrukbare, allsidige og fleksible kodestykker – en serie uavhengige, selvstendige, lesbare og forutsigbare trinn som overfører data fra ett til det neste.

### Men alt starter med at vi er trygge på kjerneprinsippene i JavaScript/TypeScript.

## Higher Order Functions

- La oss si at vi har function copyArrayAndMultiplyBy2:

```javascript
const copyArrayAndMultiplyBy2 = array => {
  const output = []
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] * 2)
  }
  return output
}
const myArray = [1, 2, 3]
const result = copyArrayAndMultiplyBy2(myArray)
```

- Hva hvis vi vil kopiere array og dele på 2?

```javascript
const copyArrayAndDivideBy2 = array => {
  const output = []
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] / 2)
  }
  return output
}
const myArray = [1, 2, 3]
const result = copyArrayAndDivideBy2(myArray)
```

- Eller legge til 3?

```javascript
const copyArrayAndAdd3 = array => {
  const output = []
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] + 3)
  }
  return output
}
const myArray = [1, 2, 3]
const result = copyArrayAndAdd3(myArray)
```

## Hvilket prinsipp bryter vi?

## We're breaking DRY - What could we do?

### Vi kunne generalisere funksjonen vår slik at vi bare sender inn den spesifikke instruksjonen vår når vi kjører copyArrayAndManipulate-funksjonen!

```javascript
const copyArrayAndManipulate = (array, instructions) => {
  const output = []
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]))
  }
  return output
}
const multiplyBy2 = input => {
  return input * 2
}
const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2)
```

## Bruk arrow-functions

- Hvorfor?

### Pilfunksjoner passer til våre funksjonelle programmeringsmål

- Hver linje er et uavhengig, merket stykke kode der vi vet nøyaktig hvilke data den bruker og påvirker
- Derfor vil mange av funksjonene våre bare være:
  1. Ta input
  2. Bruke input på en eller annen måte
  3. Returner det som output på samme linje. Pilfunksjoner lar oss kondensere funksjonene våre for å vise dette

## Reduce som den mest allsidige funksjonen i programmering

```javascript
const multiplyBy2 = x => x * 2
const add3 = x => x + 3
const divideBy5 = x => x / 5
const reduce = (array, howToCombine, buildingUp) => {
  for (let i = 0; i < array.length; i++) {
    buildingUp = howToCombine(buildingUp, array[i])
  }
  return buildingUp
}
const runFunctionOnInput = (input, fn) => {
  return fn(input)
}
const output = reduce([multiplyBy2, add3, divideBy5], runFunctionOnInput, 11)
```

## Listing out our ‘lines of code’ (functions) by name with each one’s consequence limited to only affect the next ‘line’ (function call/invocation)

```javascript
const multiplyBy2 = x => x * 2
const add3 = x => x + 3
const divideBy5 = x => x / 5
const subtract4 = x => x - 4
const reduce = (array, howToCombine, buildingUp) => {
  for (let i = 0; i < array.length; i++) {
    buildingUp = howToCombine(buildingUp, array[i])
  }
  return buildingUp
}
const runFunctionOnInput = (input, fn) => {
  return fn(input)
}
const output = reduce([multiplyBy2, add3, divideBy5, subtract4], runFunctionOnInput, 11)
```

## Function composition

"**Enklere å legge til funksjoner**" - Dette er det essensielle aspektet ved
funksjonell programmering – å kunne liste opp kodeenhetene våre
med navn og få dem til å kjøre én etter én som
uavhengige, selvstendige deler

"**Mer lesbare**" - reducer her er ofte pakket inn i
compose for å si «combine up» funksjonene for å kjøre
dataene våre gjennom dem én etter én. Stilen er «punktfri»

"**Enklere å feilsøke**" – jeg vet nøyaktig hvilken kodelinje feilen min er i – den har en etikett!

## Pure functions

- Funksjoner som små enheter som skal kombineres og kjøres automatisk "**må**" være svært forutsigbare
- Vi er avhengige av å bruke deres evaluerte resultat til å sende inputen til neste kodeenhet (automatisk). Eventuelle «side effects» ville ødelegge dette.

## Pure functions & immutability

"**Enklere å legge til "features**" – Hver lagrede funksjon kan trygt brukes i nye kombinasjoner, med trygghet om at den ikke ødelegger andre deler av appen

"**Mer lesbar**" – Hver linje er «fullstendig» – den er fullstendig beskrivende – dens navn kan oppdages og er begrenset til input/output

"**Enklere å feilsøke**" – Ingen tusenvis av linjer med gjensidig avhengighet

## Closure

— Det mest esoteriske konseptet i JavaScript
— Funksjoner er enhetene vi bygger med, men de er begrensede - de glemmer alt hver gang de er ferdige
å kjøre - uten global tilstand
— Tenk deg om vi kunne gi funksjonene våre minner

## Functional Decoration

- Nå kan vi enklere konvertere funksjoner slik at de passer til oppgaven vår
- Uten å skrive en ny funksjon fra bunnen av
- Vi kan kjøre kode på andre kodebiter for å se ut som om vi endrer dem

## Example

- To add a permanent memory to an existing function we have to create a new
  function that will run the existing function inside of itself

```javascript
const oncify = convertMe => {
  let counter = 0
  const inner = input => {
    if (counter === 0) {
      const output = convertMe(input)
      counter++
      return output
    }
    return 'Sorry'
  }
  return inner
}
const multiplyBy2 = num => num * 2
const oncifiedMultiplyBy2 = oncify(multiplyBy2)
oncifiedMultiplyBy2(10) // 20
oncifiedMultiplyBy2(7) // Sorry
```

- Vi kan «pseudo»-redigere funksjonene vi allerede har laget – til funksjoner som oppfører seg likt, men med ""bonus features"!

## Funksjonskomposisjon er kraftig, men alle funksjoner må oppføre seg på samme måte

Tar inn én input og returnerer én output
— Hva om jeg har en funksjon jeg vil bruke som forventer to innganger
— Dette er «aritetsmismatch»
— Vi må «dekorere» funksjonen vår for å forhåndsfylle en av inngangene
Dette betyr å opprette en ny funksjon som kaller flerargumentfunksjonen vår - med argumentet og flerargumentfunksjonen lagret praktisk i "ryggsekken" vår.

## Det kalles ‘Partial application’

```javascript
const multiply = (a, b) => a * b
function prefillFunction(fn, prefilledValue) {
  const inner = liveInput => {
    const output = fn(liveInput, prefilledValue)
    return output
  }
  return inner
}
const multiplyBy2 = prefillFunction(multiply, 2)
const result = multiplyBy2(5)
```

## Partial application & currying

I praksis må vi kanskje forhåndsutfylle ett, to ... flere argumenter til forskjellige tider
— Vi kan konvertere («dekorere») enhver funksjon til en funksjon som vil godta argumenter én etter én og
bare kjøre funksjonen i sin helhet når den har alle argumentene
— Dette er en mer generell versjon av delvis applikasjon

## Jeg gjentar

- "**Enklere å legge til "features" "**" - Uoverensstemmende antall - ikke noe
  problem! Vi skriver en funksjon som multipliseres én gang og
  bruker den deretter på nytt i forskjellige situasjoner ved å «redigere» argumentene.
- "**Mer lesbar**" - Vi kan bruke vår komposisjon/reduksjon til å liste opp funksjoner som skal kjøres én etter én på dataene våre, selv om funksjonene krever mer enn 1 input!
- "**Enklere å feilsøke**" - Individuelle funksjonsenheter er mulige selv med 1+ forventet input.

## ...Functional programming

- Hver kodelinje har et navn (eller hvis ikke, er den så kort at vi kan se nøyaktig hva den gjør), er en uavhengig enhet som har alle sine konsekvenser i den ene linjen.

- Vi kan koble sammen (komponere) disse enkeltstående enhetene med kode/instruksjoner (funksjoner) til komplekse oppgaver

- Men med hver komponent av oppgaven uavhengig, gjenkjennelig, gjenbrukbar, allsidig og lett feilsøkbar!

## Vi må gjøre noen bragder for å bekjempe de små kodeenhetene våre (funksjoner)

- Kombinere funksjoner med flere inndata fra biblioteker
- Vi har sett mange av dem (Higher Order Functoins, We’ve seen many of them (higher order functions,
  reduction/composition, closure, function decoration,
  partial application og currying). Og det finnes enda flere - monader, applikatorer osv.!

Lesbar, feilsøkbar og lett å "add featues"

```javascript
pipe(getPlayerName, getFirstName, properCase, addUserLabel, createUserTemplate)([{ name: 'Ola Nordmann', score: 3 }])
```

## Men koden vår er nå et sett med uavhengige, selvstendige trinn vi kan bruke for å løse ethvert problem og bli ekte komponister av koden vår.


