# Designsystem: Oppgradering fra Tailwind CSS v3 til v4 i Next.js

Oppgraderingen av Tailwind CSS fra versjon 3 til 4 innebærer en fundamental overgang fra en JavaScript-konfigurert løsning til et mer moderne, CSS-først-design. Denne guiden dekker hovedpunktene for å gjennomføre oppgraderingen i et Next.js-prosjekt. v4 har vært stable siden siden januar 2025 (8mnd siden i skrivende stund) og er det man får med i create-next-app installasjonen.

## 1. Fra `@tailwind` til `@import`

### Tailwind v3 (Den Gamle Måten)

I Tailwind v3 ble byggingen drevet gjennom en PostCSS-plugin installert via `tailwindcss`-pakken. I den globale CSS-filen (`globals.css`) brukte man tre separate direktiver:

```css
/* Gammel metode i globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Disse direktivene instruerte PostCSS-pluginen til å injisere de respektive stil-lagene under byggeprosessen.

### Tailwind v4 (Den Nye Måten)

V4 introduserer et CSS-først-API der Tailwind importeres som et vanlig CSS-bibliotek. De tre gamle direktivene erstattes med én enkelt, standard CSS-import:

```css
/* Ny, forenklet metode i globals.css */
@import 'tailwindcss';
```

Dette er mulig fordi Tailwind nå distribueres som et komplett CSS-bibliotek, mens PostCSS-funksjonaliteten er flyttet til en egen pakke: `@tailwindcss/postcss`. Denne nye pakken håndterer importering og autoprefixing automatisk, noe som gjør eksterne PostCSS-plugins som `postcss-import` og `autoprefixer` unødvendige.

**Hvorfor denne endringen?**

- **Intuitivt Oppsett:** En enkelt `@import` er mer i tråd med moderne CSS-standarder og gjør oppsettet enklere, spesielt i rammeverk som Next.js.
- **Moderne Nettlesere:** V4 fjerner støtte for utdaterte nettlesere (som IE11), noe som forenkler byggelogikken og gir raskere kompilering.

## 2. Endringer i Konfigurasjon

### JavaScript-konfigurasjon (`tailwind.config.ts`)

`tailwind.config.js`/`ts` er fortsatt støttet, men den oppdages **ikke lenger automatisk**. Hvis du har en slik fil og ønsker å bruke den, må den eksplisitt importeres i din `globals.css` med `@config`-direktivet:

```css
/* globals.css */
@config '../../tailwind.config.js'; /* Sti relativt til CSS-filen */
@import 'tailwindcss';
```

**Viktig:** Noen tidligere konfigurasjonsopsjoner som `corePlugins`, `safelist`, og `separator` er ikke lenger tilgjengelige via JS-konfigurasjonen.

### Nye CSS-direktiver

V4 introduserer nye, kraftige direktiver for å definere tilpassede stiler direkte i CSS:

- `@theme`: For å aksessere verdier fra `theme`-objektet ditt.
- `@layer`: For å legge til stiler i `base`, `components`, eller `utilities`-lagene.
- `@utility`: For å lage egne utility-klasser som automatisk støtter varianter (f.eks. `hover:`, `focus:`).
- `@variant`: For å definere egne, tilpassede varianter.

## 3. Oppdatert Next.js-integrasjon

1.  **Installer Pakker:**
    ```bash
    npm install tailwindcss@latest @tailwindcss/postcss@latest postcss@latest
    ```
2.  **Konfigurer PostCSS:** Opprett eller oppdater `postcss.config.js` i roten av prosjektet:
    ```javascript
    // postcss.config.js
    module.exports = {
      plugins: {
        '@tailwindcss/postcss': {}
      }
    }
    ```
3.  **Global CSS:** Importer Tailwind én gang i `src/app/globals.css`:

    ```css
    /* src/app/globals.css */
    @import 'tailwindcss';

    /* Her kan du legge til egendefinerte stiler */
    @layer base {
      h1 {
        @apply text-2xl;
      }
    }
    ```

4.  **Importer i Layout:** Sørg for at `globals.css` er importert i din rot-layout (`src/app/layout.tsx`).

## 4. Øvrige Konsekvenser

- **Fjerning av Gamle Klasser:** Flere utdaterte utility-klasser (f.eks. `bg-opacity-*`) er fjernet. Gå gjennom prosjektet og oppdater klassenavn i henhold til den offisielle oppgraderingsguiden.
- **Klassedeteksjon:** Tailwind v4 skanner kildefiler som ren tekst. Dynamisk genererte klassenavn (f.eks. `const color = 'blue'; const className = `bg-${color}-500`;`) vil ikke bli oppdaget. Skriv alltid komplette klassenavn i koden.
- **Egendefinerte Stiler:** Bruk `@layer base`, `@layer components`, og `@utility` for å legge til egendefinerte stiler på en ren og organisert måte.

## Oppsummering

Tailwind v4 forenkler integrasjonen i Next.js ved å erstatte de tre `@tailwind`-direktivene med et enkelt `@import "tailwindcss"`. Dette gir raskere kompilering og et mer moderne oppsett. For eksisterende prosjekter er den viktigste endringen at `tailwind.config.ts` ikke lenger hentes automatisk og må refereres med `@config` hvis den skal brukes. Den anbefalte praksisen er å flytte så mye som mulig av den tilpassede designlogikken inn i CSS-filene ved hjelp av de nye direktivene.
