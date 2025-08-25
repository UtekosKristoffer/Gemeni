# ARCHITECTURE.md

## Utkast

## 1. Introduksjon og Filosofi

Dette dokumentet beskriver den overordnede arkitekturen for Utekos' "Bring Your Own Stack" Shopify Headless-plattform. Plattformen er bygget med Next.js 15 (App Router) og en nøye utvalgt, moderne verktøystabel.

Vår kjernefilosofi er å bygge en **"Next.js-sentrisk" applikasjon** som er:

- **Performant:** Ved å utnytte server-først datahenting og avanserte caching-strategier.
- **Robust:** Ved å bruke et sterkt, ende-til-ende typesystem og en formell state management-modell.
- **Vedlikeholdbar:** Ved å etablere en klar ansvarsfordeling mellom de ulike lagene i applikasjonen.

Vi bruker en **"best-of-breed"**-tilnærming, der vi velger de beste spesialiserte verktøyene for hver jobb, fremfor å låse oss til én enkelt "alt-i-ett"-løsning.

## 2. Arkitektoniske Prinsipper

- **Rendering (ISR er Standard):** Vi bruker Incremental Static Regeneration som vår primære renderingstrategi. Sider er lynraske og serveres fra en statisk cache, men oppdateres automatisk i bakgrunnen for å sikre at dataen er fersk.
- **Dataflyt (Server-først):** Initiell data for en side hentes alltid på serveren. Vi bruker TanStack Querys hydreringsmønster for å sende denne dataen til klienten, noe som gir en øyeblikkelig sideinnlasting uten "loading spinners".
- **Mutasjoner (React 19 Native):** Alle skrive-operasjoner håndteres av React 19s innebygde verktøy. Server Actions er vår sikre transportmekanisme, og `useActionState`/`useOptimistic` håndterer UI-staten på klienten.
- **Typesikkerhet (Ende-til-ende):** Vi bruker TypeScript i "strict mode" og GraphQL Code Generator for å skape et fullstendig typesikkert system, fra GraphQL-schemaet helt ut til våre React-komponenter.
- **State Management (Dekoblet):** Vi har en klar separasjon mellom _server state_ (data fra Shopify) og _klient state_ (UI-tilstand).
- **Kompilator (Stol på React Compiler):** Vi unngår manuell memoization (`useMemo`, `useCallback`) og skriver enklere, mer lesbar kode, i tillit til at React Compiler håndterer optimaliseringene.

## 3. Teknologi-stack og Ansvarsfordeling

| Teknologi                            | Rolle i Prosjektet                                                                                                                                                   |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js 15 (App Router)**          | Rammeverket for hele applikasjonen. Håndterer routing, rendering, server-infrastruktur og caching.                                                                   |
| **React 19**                         | Biblioteket for å bygge brukergrensesnittet. Vi bruker de nyeste funksjonene som Server Components og Actions.                                                       |
| **TanStack Query v5**                | Håndterer all **klient-side server state** for **lese-operasjoner (queries)**. Ansvarlig for caching, refetching, og synkronisering av data.                         |
| **XState v5**                        | Håndterer all **klient-side UI state**. Vi bruker `@xstate/store` for enkel state (f.eks. `isCartOpen`) og `xstate` (`createMachine`) for komplekse brukerprosesser. |
| **GraphQL Code Generator**           | Automatiserer typesikkerhet. Genererer typesikre TanStack Query hooks fra våre `.graphql`-filer.                                                                     |
| **`@shopify/storefront-api-client`** | Vår lavnivå, offisielle nettverksklient for å kommunisere med Shopify Storefront API-et.                                                                             |
| **React Hook Form & Zod**            | Håndterer **klient-side validering og form-state**. Gir en overlegen brukeropplevelse med umiddelbar feedback.                                                       |
| **Shadcn UI / Radix / Tailwind**     | Vårt designsystem og verktøykasse for å bygge UI-komponenter.                                                                                                        |

## 4. Sentrale Dataflyter

### A. Dataflyt for Lese-operasjoner (f.eks. Laste en Produktside)

1.  **Request:** En bruker navigerer til `/products/[handle]`.
2.  **Server-rendering:** Next.js kjører `page.tsx` på serveren.
3.  **Server-side Fetch:** `queryClient.prefetchQuery` kalles. Denne bruker vår `Fetcher.ts`, som igjen bruker `shopifyRequest` til å hente produktdata fra Shopify.
4.  **Server-side Caching:** Next.js' utvidede `fetch` cacher automatisk Shopify-responsen i sin Data Cache.
5.  **Dehydrering:** `dehydrate(queryClient)` serialiserer den fylte TanStack Query-cachen.
6.  **Respons:** Serveren sender ferdig-rendret HTML og den dehydrerte cachen til klienten.
7.  **Hydrering:** På klienten tar `<HydrationBoundary>` imot den dehydrerte staten og fyller klientens `QueryClient`.
8.  **Klient-rendering:** `ProductPageClient.tsx` kaller `useGetProductQuery`. Dataen er **øyeblikkelig tilgjengelig** fra den hydrerte cachen, og ingen `pending`-tilstand vises.

### B. Dataflyt for Skrive-operasjoner (f.eks. Legge en Vare i Kurven)

1.  **Interaksjon:** Brukeren fyller ut et skjema i `<AddToCart>` og klikker "Legg i kurv".
2.  **Klient-validering:** React Hook Form og Zod validerer inputen umiddelbart.
3.  **Action Call:** Ved `onSubmit` kaller komponenten en **Server Action** (`addItemAction`) via React 19s `useActionState`-hook.
4.  **Optimistic UI (Valgfritt):** `useOptimistic`-hooket oppdaterer UI-et _umiddelbart_ for å vise varen i kurven.
5.  **Server-prosessering:** `addItemAction` kjører på serveren. Den validerer inputen på nytt, kaller `shopifyRequest` for å utføre mutasjonen, og håndterer cookies.
6.  **Server-cache Invalidering:** Etter en vellykket mutasjon, kaller Server Action-en **`revalidateTag('cart')`**. Dette markerer all server-cachet data relatert til handlekurven som utdatert.
7.  **Respons:** Server Action-en returnerer et suksess/feil-objekt til klienten.
8.  **Klient-state Håndtering:** `useActionState` mottar responsen.
9.  **Klient-cache Invalidering:** ikke bestemt, men vi tilstreber å også benytte oss av Tanstack Query for å unngå manuelle hooks som useEffects. Forslaget er å fetche data på server og hydrere data på klientsiden via preFetchQuery `queryClient.prefetchQuery({` eller benytte `@tanstack/react-query-next-experimental`, da det virker som en spennende løsning. Denne pakken lar deg hente data på serveren (i en klientkomponent) bare ved å kalle useSuspenseQuery i komponenten din. Resultatene vil deretter bli strømmet fra serveren til klienten etter hvert som SuspenseBoundaries løses.
10. **Sømløs UI-oppdatering:** TanStack Query henter fersk data i bakgrunnen, og alle komponenter som bruker `useGetCartQuery` (som `CartDrawer`) oppdaterer seg automatisk og sømløst.

## 5. Utdrag av nåværende Mappestruktur (Høynivå)

```
src
├── app
│   ├── (products)
│   │   ├── (handle)
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── products
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── clients
│   ├── CartProcessClient.tsx
│   ├── getQueryClient.ts
│   ├── makeQueryClient.ts
│   └── storefrontApiClient.ts
├── components
│   ├── AddToCart.tsx
│   ├── CartDrawer.tsx
│   ├── ColorSelector.tsx
│   ├── DesktopNavigation.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeaderLogo.tsx
│   ├── MobilMenuPanel.tsx
│   ├── MobileMenuItem.tsx
│   ├── ProductCard.tsx
│   ├── ProductPageAccordion.tsx
│   ├── ProductPageView.tsx
│   ├── RichTextRenderer.tsx
│   ├── providers
│   │   └── Providers.tsx
│   ├── renderNode.tsx
│   └── ui
│       ├── CardGrid.tsx
│       ├── GalleryColumn.tsx
│       ├── OptionButton.tsx
│       ├── OptionsColumn.tsx
│       ├── Price.tsx
│       ├── ProductGallery.tsx
│       ├── ProductGrid.tsx
│       ├── QuantitySelector.tsx
│       ├── SizeSelector.tsx
│       ├── accordion.tsx
│       ├── aspect-ratio.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── command.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── input.tsx
│       ├── navigation-menu.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       └── tooltip.tsx
├── hooks
│   ├── index.ts
│   ├── use-mobile.ts
│   ├── useCartOpen.ts
│   ├── useCartOptimistic.ts
│   ├── useCartPending.ts
│   └── useCartQuery.tsx
├── lib
│   ├── actors
│   │   └── CartProcessContext.ts
│   ├── cn.ts
│   ├── constants
│   │   ├── header-mega-menu-handle.ts
│   │   ├── index.ts
│   │   ├── next-public-server-url.ts
│   │   ├── next-public-shopify-store-domain.ts
│   │   ├── shopify-api-version.ts
│   │   ├── shopify-public-token.ts
│   │   ├── shopify-store-domain.ts
│   │   └── store-name.ts
│   ├── helpers
│   │   ├── getCachedCart.ts
│   │   ├── getCart.ts
│   │   ├── getCartIdClient.ts
│   │   ├── getCartIdFromCookie.ts
│   │   ├── getMenu.ts
│   │   ├── getProductByHandle.ts
│   │   ├── getProducts.ts
│   │   ├── index.ts
│   │   └── normalizeCart.ts
│   ├── queries
│   │   ├── cartQuery.ts
│   │   ├── index.ts
│   │   ├── menuQuery.ts
│   │   ├── productByHandleQuery.ts
│   │   └── productsQuery.ts
│   ├── state
│   │   ├── cartStore.ts
│   │   └── createCartProcess.ts
│   └── utils
│       ├── className.ts
│       ├── formatPrice.ts
│       ├── index.ts
│       ├── menuReducer.ts
│       ├── normalizeShopifyUrl.ts
│       └── safeJsonParse.ts
└── types
    ├── home.tsx
    ├── index.ts
    └── interface
        ├── index.ts
        └── interface.ts

## Særlige usikkerhetsmomenter og generelle påpekelser

- shopifyRequestClient uklar
- Mye er enda ikke implementert
- Ment som oversiktsbilde
- Rutene i ifm pages er feil i tree-view

```


