import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type { GraphQLError } from '@/types'
import type { ResponseErrors } from '@shopify/graphql-client'

/**
 * Parses a Shopify client error object and throws a formatted ShopifyApiError.
 *
 * @param {ResponseErrors} errors - The error object from storefrontClient.request.
 * @throws {ShopifyApiError} Always throws a formatted error for upstream handling.
 */
export function handleShopifyErrors(errors: ResponseErrors): never {
  const topLevelMessage = errors.message || 'Failed to fetch data from Shopify.'
  let formattedGqlErrors: GraphQLError[] = []

  if (Array.isArray(errors.graphQLErrors)) {
    formattedGqlErrors = errors.graphQLErrors.map(
      (error: any): GraphQLError => ({
        message: String(error?.message ?? 'Unknown GraphQL error'),
        ...(error.locations && { locations: error.locations }),
        ...(error.path && { path: error.path }),
        ...(error.extensions && { extensions: error.extensions })
      })
    )
  }

  throw new ShopifyApiError(topLevelMessage, formattedGqlErrors, errors.networkStatusCode)
}
