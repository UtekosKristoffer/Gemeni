// Path: src/lib/actions/updateLineQuantityAction.ts

/**
 * @fileoverview Server action for updating the quantity of a line item in the cart.
 *
 *   This module exposes a single action that validates input, performs a
 *   quantity update mutation and translates any errors into a standard
 *   {@link CartActionsResult}.  By delegating validation and mutation logic
 *   to helpers, the action remains focused on coordinating the high‑level
 *   steps implied by its name.  This modular approach helps maintain
 *   clarity and facilitates testing and reuse.
 *
 * @module lib/actions/updateLineQuantityAction
 */
'use server'

import { createCartMutationOrchestrator } from '@/lib/actions/createCartMutationOrchestrator'
import { mapThrownErrorToActionResult } from '@/lib/errors'
import { performCartLinesUpdateMutation } from '@/lib/actions/perform'
import { validateUpdateLineInput } from '@/db/zod/validate'
import type { CartActionsResult } from '@/types'

/**
 * Internal orchestrated function for updating a cart line quantity.
 *
 * @private
 */
const updateCartLineQuantityOrThrow = createCartMutationOrchestrator(validateUpdateLineInput, performCartLinesUpdateMutation)

/**
 * Updates the quantity of an existing line in the cart.
 *
 *   Ensures that both the line identifier and the quantity are valid,
 *   performs the mutation via the Storefront API, and normalizes the response.
 *   Any thrown errors are mapped to a consistent action result.  Isolating
 *   this logic into its own function makes it easy to call from UI actions
 *   without duplicating logic.
 *
 * @param {{ lineId: string, quantity: number }} input - The line to update and the new quantity.
 * @returns {Promise<CartActionsResult>} Resolves with the updated cart on success; otherwise contains
 *   error details.
 */
export const updateLineQuantityAction = async (input: { lineId: string; quantity: number }): Promise<CartActionsResult> => {
  try {
    const cart = await updateCartLineQuantityOrThrow(input)
    return { success: true, message: 'Cart updated successfully.', cart }
  } catch (e: unknown) {
    console.error(`An error occurred in updateLineQuantityAction for input: ${JSON.stringify(input)}`, e)
    return mapThrownErrorToActionResult(e)
  }
}
