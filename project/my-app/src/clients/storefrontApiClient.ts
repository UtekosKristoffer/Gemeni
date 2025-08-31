//Path: src/clients/storefrontApiClient.ts

import { createStorefrontApiClient, type StorefrontApiClient } from '@shopify/storefront-api-client'
import { SHOPIFY_API_VERSION, SHOPIFY_PUBLIC_TOKEN, SHOPIFY_STORE_DOMAIN } from '@/lib/constants'

export const storefrontClient: StorefrontApiClient = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_API_VERSION,
  publicAccessToken: SHOPIFY_PUBLIC_TOKEN
})
export default storefrontClient
