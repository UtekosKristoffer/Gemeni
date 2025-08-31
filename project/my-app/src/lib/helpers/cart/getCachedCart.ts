// Path: src/lib/helpers/getCachedCart.ts
import { unstable_cache as cache } from 'next/cache'
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import { CartNotFoundError } from '@/lib/errors' // Import the custom error class
import type { Cart } from '@/types'

/**
 * Retrieves a cart using Next.js's dedicated `cache` function.
 *
 * This function wraps `fetchCart` to ensure the underlying API call is only
 * executed once per request, even if the function is called multiple times.
 * The result is stored in the Next.js Data Cache.
 *
 * @remarks
 * The use of `{ tags: ['cart'] }` is critical. It associates the cached data
 * with a specific tag, allowing us to invalidate this cache on-demand
 * from a Server Action by calling `revalidateTag('cart')`.
 *
 * @param cartId - The unique identifier for the cart.
 * @returns A promise that resolves to the normalized cart object if found, otherwise `null`.
 * @see https://nextjs.org/docs/app/building-your-application/caching#cache
 */
export const getCachedCart = cache(
  async (cartId: string | null): Promise<Cart | null> => {
    if (!cartId) {
      return null
    }

    try {
      const cart = await fetchCart(cartId)
      return cart
    } catch (error) {
      // Gracefully handle the expected "not found" state.
      if (error instanceof CartNotFoundError) {
        return null // This is an expected outcome, not an error to be logged.
      }
      // Re-throw any other unexpected errors.
      throw error

      throw error
    }
  },
  ['get-cart-by-id'], // A more specific key prefix for the cache entry.
  {
    tags: ['cart'] // The tag remains the same for invalidation purposes.
  }
)
