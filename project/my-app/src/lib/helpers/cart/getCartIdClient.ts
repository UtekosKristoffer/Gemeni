//Path: src/lib/helpers/getCartIdClient.ts

/**
 * @module constants/getCartIdClient
 * @function getCartIdClient
 * @returns {string | null} The cart ID from localStorage or null if not found
 * @description Retrieves the cart ID from localStorage on the client side
 */
export const getCartIdClient = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('cartId')
}
