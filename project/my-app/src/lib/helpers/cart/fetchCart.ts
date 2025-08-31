import { storefrontClient } from '@/clients/storefrontApiClient'
import { cartQuery } from '@/lib/queries'
import { normalizeCart } from '@/lib/helpers/cart/normalizeCart'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import { CartNotFoundError } from '@/lib/errors'
import { CART_COOKIE_NAME } from '@/lib/constants'
import type { Cart, CartQueryResult } from '@/types'
/**
 * Fetches cart data from the Shopify Storefront API. This is an impure function
 * that performs a network request.
 *
 * @param {string} cartId - The Shopify cart ID (e.g., 'gid://shopify/Cart/123...').
 * @returns {Promise<Cart>} A promise that resolves to the normalized cart data.
 * @throws {ShopifyApiError} If the Shopify API returns errors.
 * @throws {CartNotFoundError} If no cart is found for the given ID.
 */
export const fetchCart = async (cartId: string): Promise<Cart> => {
  const { data, errors } = await storefrontClient.request<CartQueryResult>(cartQuery, {
    variables: { cartId: CART_COOKIE_NAME }
  })

  if (errors) {
    handleShopifyErrors(errors)
  }

  // KORREKT BRUK: data er nå av typen `CartQueryResult | undefined | null`
  // og `data.cart` er typesikkert.
  if (!data || !data.cart) {
    throw new CartNotFoundError(`Cart with ID ${CART_COOKIE_NAME} was not found.`)
  }

  return normalizeCart(data.cart)
}
