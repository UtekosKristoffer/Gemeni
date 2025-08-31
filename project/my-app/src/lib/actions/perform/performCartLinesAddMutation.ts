// Path: src/lib/actions/perform/performCartLinesAddMutation.ts

/**
 * @fileoverview Performs the mutation to add one or more lines to the cart.
 *
 *   Given a cart identifier and a form input containing a product variant
 *   and quantity, this function sends the appropriate GraphQL mutation.
 *   It returns the raw cart on success and propagates API errors.  Having a
 *   dedicated helper for this mutation keeps action functions free of
 *   request formatting details.
 *
 * @module lib/actions/perform/performCartLinesAddMutation
 */
'use server'

import { storefrontClient } from '@/clients/storefrontApiClient'
import { mutationCartLinesAdd } from '@/lib/mutations'
import type { AddToCartFormValues, AddToBagResponse, CartResponse } from '@/types'

/**
 * Adds a line to the cart using the Storefront API.
 *
 * @param {string} cartId - The identifier of the cart to which the line should be added.
 * @param {AddToCartFormValues} input - The input containing the variant ID and quantity.
 * @returns {Promise<CartResponse | null>} The updated cart on success or null when missing.
 * @throws {Error} Propagates any API errors.
 */
export const performCartLinesAddMutation = async (cartId: string, input: AddToCartFormValues): Promise<CartResponse | null> => {
  const { data, errors } = await storefrontClient.request<AddToBagResponse>(mutationCartLinesAdd, {
    variables: { cartId, lines: [{ merchandiseId: input.variantId, quantity: input.quantity }] }
  })
  if (errors) throw errors
  return data?.cartLinesAdd?.cart ?? null
}
