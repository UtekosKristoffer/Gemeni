import { ERROR_CODES } from '@/lib/constants/error-codes'

/**
 * A custom domain error for when the cart ID cookie is missing.
 * Allows for type-safe error handling with `instanceof`.
 */
export class MissingCartIdError extends Error {
  public readonly code = ERROR_CODES.MISSING_CART_ID
  constructor() {
    super('Missing cart ID cookie.')
    this.name = 'MissingCartIdError'
  }
}
