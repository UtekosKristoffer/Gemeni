import type { ResponseErrors } from '@shopify/graphql-client'
import type { CartActionsResult } from '@/types'
import { ERROR_CODES } from '@/lib/constants/error-codes'

export function formatShopifyErrorResponse(errors: ResponseErrors): CartActionsResult {
  const topLevelMessage = Array.isArray(errors.graphQLErrors) && errors.graphQLErrors[0]?.message ? errors.graphQLErrors[0].message : 'An error occurred while communicating with Shopify.'

  console.error('Shopify API Errors:', JSON.stringify(errors, null, 2))

  return {
    success: false,
    message: topLevelMessage,
    error: ERROR_CODES.API_ERROR
  }
}
