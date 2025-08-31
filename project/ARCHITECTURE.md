# ARCHITECTURE.md

## Utkast

## 1. Introduksjon og Filosofi

Dette dokumentet beskriver den overordnede arkitekturen for Utekos' Shopify Headless-plattform. Plattformen er bygget med Next.js 15 (App Router) og en nøye utvalgt, moderne verktøystabel.

Vår kjernefilosofi er å bygge en **"Next.js-sentrisk" applikasjon** som er:

- **Performant:** Ved å utnytte server-først datahenting og avanserte caching-strategier.
- **Robust:** Ved å bruke et sterkt, ende-til-ende typesystem og en formell state management-modell.
- **Vedlikeholdbar:** Ved å etablere en klar ansvarsfordeling mellom de ulike lagene i applikasjonen.
- - **Functional Programming:** Ved å utnytte server-først datahenting og avanserte caching-strategier.

Vi bruker en **"best-of-breed"**-tilnærming, der vi velger de beste spesialiserte verktøyene for hver jobb, fremfor å låse oss til én enkelt "alt-i-ett"-løsning.

## 2. Arkitektoniske Prinsipper

- **Rendering (ISR er Standard):** Vi bruker Incremental Static Regeneration som vår primære renderingstrategi. Sider er lynraske og serveres fra en statisk cache, men oppdateres automatisk i bakgrunnen for å sikre at dataen er fersk.
- **Dataflyt (Server-først):** Initiell data for en side hentes alltid på serveren. Vi bruker TanStack Querys hydreringsmønster for å sende denne dataen til klienten, noe som gir en øyeblikkelig sideinnlasting uten "loading spinners".
- **Mutasjoner (React 19 Native):** Alle skrive-operasjoner håndteres av React 19s innebygde verktøy. Server Actions er vår sikre transportmekanisme, og `useActionState`/`useOptimistic` håndterer UI-staten på klienten.
- **State Management (Dekoblet):** Vi har en klar separasjon mellom _server state_ (data fra Shopify) og _klient state_ (UI-tilstand).
- **Kompilator (Stol på React Compiler):** Vi unngår manuell memoization (`useMemo`, `useCallback`) og skriver enklere, mer lesbar kode, i tillit til at React Compiler håndterer optimaliseringene.

## 3. Teknologi-stack og Ansvarsfordeling

| Teknologi                            | Rolle i Prosjektet                                                                                                                                                   |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js 15 (App Router)**          | Rammeverket for hele applikasjonen. Håndterer routing, rendering, server-infrastruktur og caching.                                                                   |
| **React 19**                         | Biblioteket for å bygge brukergrensesnittet. Vi bruker de nyeste funksjonene som Server Components og Actions.                                                       |
| **TanStack Query v5**                | Håndterer all **klient-side server state** for **lese-operasjoner (queries)**. Ansvarlig for caching, refetching, og synkronisering av data.                         |
| XState v5 | Håndterer synkron, global UI-state. @xstate/store brukes for enkle verdier (f.eks. isCartOpen), mens createMachine er reservert for komplekse, flerstegs UI-prosesser. Asynkron server-state (loading, errors) håndteres av TanStack Query. |
                                                                     |
| **`@shopify/storefront-api-client`** | Vår lavnivå, offisielle nettverksklient for å kommunisere med Shopify Storefront API-et.                                                                             |
| **React Hook Form & Zod**            | Håndterer **klient-side validering og form-state**. Gir en overlegen brukeropplevelse med umiddelbar feedback.  Benytter utdivdelsen @zod-validation-error  |
| **Shadcn UI / Radix / Tailwind**     | Vårt designsystem og verktøykasse for å bygge UI-komponenter.                                                                                                        |


## 4. Nåværende Mappestruktur (Høynivå)

```
tree src/components/cart
src/components/cart
├── AddToCart.tsx
├── CartBody.tsx
├── CartDrawer.tsx
├── CartFooter.tsx
├── CartHeader.tsx
├── CartLineItem.tsx
├── CartTrigger.tsx
└── index.ts

1 directory, 8 files
bash-3.2$ tree src
src
├── app
│   ├── (products)
│   │   ├── (handle)
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── products
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── clients
│   ├── CartMutationClient.tsx
│   ├── getQueryClient.ts
│   ├── makeQueryClient.ts
│   └── storefrontApiClient.ts
├── components
│   ├── ColorSelector.tsx
│   ├── DesktopNavigation.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeaderLogo.tsx
│   ├── MobilMenuPanel.tsx
│   ├── MobileMenuItem.tsx
│   ├── ProductCard.tsx
│   ├── ProductClientView.tsx
│   ├── ProductPageAccordion.tsx
│   ├── ProductPageView.tsx
│   ├── RichTextRenderer.tsx
│   ├── cart
│   │   ├── AddToCart.tsx
│   │   ├── CartBody.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── CartFooter.tsx
│   │   ├── CartHeader.tsx
│   │   ├── CartLineItem.tsx
│   │   ├── CartTrigger.tsx
│   │   ├── index.ts
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
│       ├── Toast.tsx
│       ├── accordion.tsx
│       ├── aspect-ratio.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── command.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       └── tooltip.tsx
├── db
│   ├── data
│   │   └── products.json
│   └── zod
│       ├── cartRegistry.ts
│       ├── cartSchemas.ts
│       ├── env.ts
│       ├── validate.ts
│       └── zodConfig.ts
├── lib
│   ├── AddToBag.tsx
│   ├── actions
│   │   ├── addLineAction.ts
│   │   ├── clearCartAction.ts
│   │   ├── createCartMutationOrchestrator.ts
│   │   ├── perform
│   │   │   ├── index.ts
│   │   │   ├── performCartClearMutation.ts
│   │   │   ├── performCartLinesAddMutation.ts
│   │   │   ├── performCartLinesRemoveMutation.ts
│   │   │   └── performCartLinesUpdateMutation.ts
│   │   ├── removeCartLineAction.ts
│   │   └── updateLineQuantityAction.ts
│   ├── actors
│   │   └── CartMutationContext.ts
│   ├── cn.ts
│   ├── constants
│   │   ├── cookies.ts
│   │   ├── error-codes.ts
│   │   ├── errorCodes.ts
│   │   ├── header-mega-menu-handle.ts
│   │   ├── index.ts
│   │   ├── next-public-server-url.ts
│   │   ├── next-public-shopify-store-domain.ts
│   │   ├── shopify-api-version.ts
│   │   ├── shopify-public-token.ts
│   │   ├── shopify-store-domain.ts
│   │   └── store-name.ts
│   ├── errors
│   │   ├── CartNotFoundError.ts
│   │   ├── MissingCartIdError.ts
│   │   ├── ShopifyApiError.ts
│   │   ├── formatShopifyErrorResponse.ts
│   │   ├── handleShopifyErrors.ts
│   │   ├── index.ts
│   │   ├── isShopifyErrorResponse.ts
│   │   └── mapThrownErrorToActionResult.ts
│   ├── helpers
│   │   ├── cart
│   │   │   ├── cartForm.ts
│   │   │   ├── fetchCart.ts
│   │   │   ├── getCachedCart.ts
│   │   │   ├── getCartIdClient.ts
│   │   │   ├── getCartIdFromCookie.ts
│   │   │   ├── index.ts
│   │   │   └── normalizeCart.ts
│   │   ├── index.ts
│   │   ├── menu
│   │   │   ├── getMenu.ts
│   │   │   ├── index.ts
│   │   │   └── normalizeMenu.ts
│   │   ├── products
│   │   │   └── getProducts.ts
│   │   └── suspense.ts
│   ├── mutations
│   │   ├── cartLinesAdd.ts
│   │   ├── cartLinesRemove.ts
│   │   ├── cartLinesUpdate.ts
│   │   └── index.ts
│   ├── queries
│   │   ├── cartQuery.ts
│   │   ├── index.ts
│   │   ├── menuQuery.ts
│   │   ├── productByHandleQuery.ts
│   │   └── productsQuery.ts
│   ├── state
│   │   ├── cartStore.ts
│   │   └── createCartMutationMachine.ts
│   └── utils
│       ├── className.ts
│       ├── formatPrice.ts
│       ├── index.ts
│       ├── menuReducer.ts
│       ├── normalizeShopifyUrl.ts
│       └── safeJsonParse.ts
├── types
│   ├── cart.ts
│   ├── errors.ts
│   ├── image.ts
│   ├── index.ts
│   ├── interface
│   │   ├── index.ts
│   │   └── nodes.ts
│   ├── menu.ts
│   ├── metaobject.ts
│   ├── money.ts
│   ├── nodes.ts
│   └── products.ts
└── useHooks
    ├── index.ts
    ├── use-mobile.ts
    ├── useAddToCart.ts
    ├── useCartMutation.ts
    ├── useCartOpen.ts
    ├── useCartOptimistic.ts
    ├── useCartPending.ts
    ├── useCartQuery.tsx
    ├── useCartStoreSnapshot.ts
    ├── usePrevious.ts
    └── useSet.ts


## Særlige usikkerhetsmomenter og generelle påpekelser

- shopifyRequestClient uklar
- Mye er enda ikke implementert
- Ment som oversiktsbilde
- Rutene i ifm pages er feil i tree-view

```


