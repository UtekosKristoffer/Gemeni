// Path: src/lib/actions/perform/performCartLinesUpdateMutation.ts

/**
 * @fileoverview Performs the mutation to update the quantity of a line in the cart.
 *
 *   This helper accepts a cart identifier and an input containing the line ID
 *   and new quantity.  It sends the GraphQL mutation and returns the updated
 *   cart, throwing if the API reports errors.  Encapsulating this logic
 *   avoids repeating request structure throughout the codebase.
 *
 * @module lib/actions/perform/performCartLinesUpdateMutation
 */
'use server'

import { storefrontClient } from '@/clients/storefrontApiClient'
import { mutationCartLinesUpdate } from '@/lib/mutations'
import type { CartLinesUpdateResponse, CartResponse } from '@/types'

/**
 * Updates a cart line's quantity via the Storefront API.
 *
 * @param {string} cartId - The identifier of the cart whose line should be updated.
 * @param {{ lineId: string, quantity: number }} input - The line identifier and the desired quantity.
 * @returns {Promise<CartResponse | null>} The updated cart, or null if missing.
 * @throws {Error} Propagates any API errors.
 */
export const performCartLinesUpdateMutation = async (cartId: string, input: { lineId: string; quantity: number }): Promise<CartResponse | null> => {
  const { data, errors } = await storefrontClient.request<CartLinesUpdateResponse>(mutationCartLinesUpdate, {
    variables: { cartId, lines: [{ id: input.lineId, quantity: input.quantity }] }
  })
  if (errors) throw errors
  return data?.cartLinesUpdate?.cart ?? null
}
