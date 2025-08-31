// Path: src/lib/actions/clearCartAction.ts

/**
 * @fileoverview Server action for clearing the entire cart.
 *
 *   The clear‑cart operation deletes all lines in the current cart.  It does
 *   not accept any arguments; passing arguments will cause validation to
 *   fail.  This module defines a single action that delegates validation
 *   and API mutation to helpers, focusing the action’s role on coordinating
 *   the high‑level steps.  Encapsulating this logic promotes reuse and
 *   ensures consistent behavior across the application.
 *
 * @module lib/actions/clearCartAction
 */
'use server'

import { createCartMutationOrchestrator } from '@/lib/actions/createCartMutationOrchestrator'
import { mapThrownErrorToActionResult } from '@/lib/errors'
import type { CartActionsResult } from '@/types'
import { performCartClearMutation } from '@/lib/actions/perform'
import { validateClearCartInput } from '@/db/zod/validate'

/**
 * Internal orchestrated function for clearing a cart.  It validates the input
 * (which should be empty), performs the mutation and returns normalized data.
 *
 * @private
 */
const clearCartOrThrow = createCartMutationOrchestrator(validateClearCartInput, performCartClearMutation)

/**
 * Clears the current cart of all items.
 *
 *   This action does not take any parameters; passing anything will result in
 *   a validation error.  It returns a success result with the emptied cart or
 *   a failure result detailing the validation or API error.  The separation
 *   allows callers to remain agnostic about the underlying process.
 *
 * @returns {Promise<CartActionsResult>} A promise that resolves to a normalized action result.
 */
export const clearCartAction = async (): Promise<CartActionsResult> => {
  try {
    // Pass an empty object to satisfy the orchestrator’s input type.
    const cart = await clearCartOrThrow({})
    return { success: true, message: 'Cart cleared successfully.', cart }
  } catch (e: unknown) {
    console.error(`An error occurred in clearCartAction:`, e)
    return mapThrownErrorToActionResult(e)
  }
}
