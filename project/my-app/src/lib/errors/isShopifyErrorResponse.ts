import type { ResponseErrors } from '@shopify/graphql-client'

export function isShopifyErrorResponse(error: unknown): error is ResponseErrors {
  // En robust sjekk for å verifisere at objektet har den forventede strukturen
  return typeof error === 'object' && error !== null && ('graphQLErrors' in error || 'networkStatusCode' in error)
}
