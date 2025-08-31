/**
 * @fileoverview Maps thrown errors to a standardized cart action result.
 *
 *   When an action catches an unknown error, it delegates to this helper to
 *   translate the error into an object with `success`, `message` and `error`
 *   properties.  This function centralizes knowledge of different error
 *   types—such as ValidationError, MissingCartIdError and Shopify API
 *   errors—and ensures that the response format is consistent across all
 *   cart actions.  Centralizing the mapping logic makes it easier to add
 *   new error categories in one place without changing every action.
 *
 * @module lib/errors/mapThrownErrorToActionResult
 */
import { isValidationErrorLike } from 'zod-validation-error'
import { MissingCartIdError } from '@/lib/errors'
import { isShopifyErrorResponse, formatShopifyErrorResponse } from '@/lib/errors'
import { CartErrorCode } from '@/lib/constants/errorCodes'
import type { CartActionsResult } from '@/types'

/**
 * Translates any thrown value into a {@link CartActionsResult}.
 *
 *   Recognizes known error types (ValidationError and MissingCartIdError) and
 *   Shopify API error shapes, returning an appropriate message and error code.
 *   For all other errors, it returns a generic unexpected‑error result.  This
 *   function should be called from catch blocks to produce uniform error
 *   responses.
 *
 * @param {unknown} thrown - The value that was caught in a try/catch.
 * @returns {CartActionsResult} A standardized result describing the failure.
 */
export function mapThrownErrorToActionResult(thrown: unknown): CartActionsResult {
  if (isValidationErrorLike(thrown)) {
    return {
      success: false,
      message: thrown.toString(),
      error: CartErrorCode.VALIDATION
    }
  }
  if (thrown instanceof MissingCartIdError) {
    return {
      success: false,
      message: 'Your shopping cart could not be found.',
      error: CartErrorCode.MISSING_CART_ID
    }
  }
  if (isShopifyErrorResponse(thrown)) {
    return formatShopifyErrorResponse(thrown)
  }
  const message = thrown instanceof Error ? thrown.message : 'An unexpected server error occurred.'
  return {
    success: false,
    message,
    error: CartErrorCode.UNEXPECTED
  }
}
