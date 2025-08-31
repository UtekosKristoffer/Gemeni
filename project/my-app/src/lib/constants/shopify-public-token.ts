//Path: src/lib/constants/shopify-public-token.ts

export const SHOPIFY_PUBLIC_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  (() => {
    throw new Error('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN missing')
  })()
