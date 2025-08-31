//Path: src/lib/actions/perform/performCartClearMutation.ts

/**
 * @fileoverview Performs the Storefront API mutation to clear all lines in a cart.
 *
 *   This helper encapsulates the low‑level details of sending a GraphQL mutation
 *   to Shopify.  It accepts a cart identifier, issues the mutation with an
 *   empty lines array and returns the raw cart data.  Errors from the API
 *   are thrown so that higher layers can handle them consistently.  This
 *   separation allows business logic to remain free of API plumbing.
 *
 * @module lib/actions/perform/performCartClearMutation
 */
'use server'

import { storefrontClient } from '@/clients/storefrontApiClient'
import { mutationCartLinesUpdate } from '@/lib/mutations'
import type { CartLinesUpdateResponse, CartResponse } from '@/types'

/**
 * Executes a clear‑cart mutation against the Storefront API.
 *
 * @param {string} cartId - The identifier of the cart whose contents should be deleted.
 * @returns {Promise<CartResponse | null>} The updated cart object on success, or null if the response is missing.
 * @throws {Error} Propagates any errors returned by the API.
 */
export const performCartClearMutation = async (cartId: string): Promise<CartResponse | null> => {
  const { data, errors } = await storefrontClient.request<CartLinesUpdateResponse>(mutationCartLinesUpdate, {
    variables: { cartId, lines: [] } // Sending an empty array clears the cart.
  })
  if (errors) throw errors
  return data?.cartLinesUpdate?.cart ?? null
}
