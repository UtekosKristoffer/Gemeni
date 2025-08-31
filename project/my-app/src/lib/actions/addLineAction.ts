// Path: src/lib/actions/addLineAction.ts

/**
 * @fileoverview Server action for adding a line item to the shopping cart.
 *
 *   This module defines an asynchronous action that orchestrates the “add line”
 *   mutation by delegating validation, mutation execution and error handling
 *   to specialized helpers.  Keeping the action focused on a single
 *   responsibility helps maintain clear boundaries between validation,
 *   business logic and error formatting, and makes the code easier for AI
 *   assistants and other tooling to reason about.
 *
 * @module lib/actions/addLineAction
 */
'use server'

import { mapThrownErrorToActionResult } from '@/lib/errors'
import { createCartMutationOrchestrator } from '@/lib/actions/createCartMutationOrchestrator'
import { validateAddLineInput } from '@/db/zod/validate'
import { performCartLinesAddMutation } from '@/lib/actions/perform'
import type { AddToCartFormValues, CartActionsResult } from '@/types'

/**
 * Orchestrated function that validates input and performs the add-lines mutation.
 * This value is not exported; it is used internally by {@link addLineAction}.
 *
 * @private
 * @type {function(AddToCartFormValues): Promise<Cart>}
 */
const addCartLinesOrThrow = createCartMutationOrchestrator(validateAddLineInput, performCartLinesAddMutation)

/**
 * Adds a new line item to the user's cart.
 *
 *   The responsibility of this action is to accept form input, delegate
 *   validation and the underlying API call to helpers, and translate any
 *   thrown errors into a normalized action result using
 *   {@link mapThrownErrorToActionResult}.  By delegating these concerns,
 *   the function remains focused on coordinating a single business
 *   operation: “add this line to the cart.”
 *
 * @param {AddToCartFormValues} input - The values supplied by the client to
 *   add a product variant and quantity.
 * @returns {Promise<CartActionsResult>} A promise resolving to a success result with the updated cart on success,
 *   or a failure result describing why the operation could not be completed.
 */
export const addLineAction = async (input: AddToCartFormValues): Promise<CartActionsResult> => {
  try {
    const cart = await addCartLinesOrThrow(input)
    return { success: true, message: 'Item added to cart.', cart }
  } catch (thrown: unknown) {
    console.error('An error occurred in addLineAction:', thrown)
    return mapThrownErrorToActionResult(thrown)
  }
}
