// Path: src/lib/helpers/getCartIdFromCookie.ts

import { cookies } from 'next/headers'
import { CART_COOKIE_NAME } from '@/lib/constants'

/**
 * Asynchronously retrieves the cart ID from the designated cart cookie.
 *
 * This function is designed for server-side use. It introduces an
 * intermediate variable to improve debuggability and code clarity.
 *
 * @returns {Promise<string | null>} A promise that resolves to the value of
 * the cart cookie if it exists, otherwise `null`.
 */
export async function getCartIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const cartIdCookie = cookieStore.get(CART_COOKIE_NAME)

  // Using an intermediate variable (`cartIdCookie`) makes it easier to debug
  // by allowing inspection of the entire cookie object before accessing its value.
  return cartIdCookie?.value ?? null
}
