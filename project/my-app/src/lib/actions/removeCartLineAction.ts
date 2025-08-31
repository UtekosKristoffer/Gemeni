//Path: src/lib/actions/removeCartLineAction.ts

'use server'

/**
 * @fileoverview Server action for removing a line item from the cart.
 *
 *   This module exposes a single function that orchestrates removal by
 *   validating the input, executing the API mutation and formatting any
 *   errors.  The action only performs the high‑level steps implied by its
 *   name and relies on helpers for the underlying details.  Isolating these
 *   concerns helps maintain clarity and ensures that AI assistants can
 *   understand the intent and expected outcomes of the code.
 *
 * @module lib/actions/removeCartLineAction
 */
'use server'

import { createCartMutationOrchestrator } from '@/lib/actions/createCartMutationOrchestrator'
import { mapThrownErrorToActionResult } from '@/lib/errors'
import { validateRemoveCartLineInput } from '@/db/zod/validate'
import { performCartLineRemoveMutation } from '@/lib/actions/perform'
import type { CartActionsResult } from '@/types'

/**
 * Internal orchestrated function for removing a cart line.  This constant
 * composes validation and mutation logic and is not exported.
 *
 * @private
 */
const removeCartLineOrThrow = createCartMutationOrchestrator(validateRemoveCartLineInput, performCartLineRemoveMutation)

/**
 * Removes a single line item from the cart.
 *
 *   This action ensures that the line identifier is valid, performs the
 *   underlying mutation and translates any thrown errors into a
 *   standardized {@link CartActionsResult}.  Having a dedicated action
 *   simplifies other parts of the application that call it by hiding the
 *   orchestration details.
 *
 * @param {{ lineId: string }} input - An object containing the identifier of the line to remove.
 * @returns {Promise<CartActionsResult>} Resolves with the updated cart on success; otherwise includes
 *   error details mapped by {@link mapThrownErrorToActionResult}.
 */
export const removeCartLineAction = async (input: { lineId: string }): Promise<CartActionsResult> => {
  try {
    const cart = await removeCartLineOrThrow(input)
    return { success: true, message: 'Line item removed.', cart }
  } catch (e: unknown) {
    console.error(`An error occurred in removeCartLineAction for input: ${JSON.stringify(input)}`, e)
    return mapThrownErrorToActionResult(e)
  }
}
