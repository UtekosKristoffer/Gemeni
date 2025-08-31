//Path: src/lib/constants/shopify-store-domain.ts
export const SHOPIFY_STORE_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ??
  (() => {
    throw new Error('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN missing')
  })()
