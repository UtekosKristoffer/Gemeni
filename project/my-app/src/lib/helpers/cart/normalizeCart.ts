// Path: src/lib/helpers/normalizeCart.ts

/**
 * @fileoverview Provides a pure function for transforming raw Shopify cart data
 * into the application's clean `Cart` data structure.
 *
 * @module lib/helpers/normalizeCart
 */

import type { Cart, CartLine, CartResponse } from '@/types'

/**
 * The specific type for a single line item edge from the Shopify CartResponse.
 * This is a private implementation detail for this module.
 */
type ShopifyCartLineEdge = CartResponse['lines']['edges'][number]

/**
 * Transforms a single Shopify cart line edge into the application's CartLine structure.
 * This is a pure, private helper function for `normalizeCart`.
 * @param {ShopifyCartLineEdge} edge - The raw cart line edge from Shopify.
 * @returns {CartLine} The normalized application-specific cart line.
 */
const normalizeCartLine = ({ node }: ShopifyCartLineEdge): CartLine => ({
  id: node.id,
  quantity: node.quantity,
  merchandise: {
    id: node.merchandise.id,
    title: node.merchandise.title,
    image: node.merchandise.image,
    price: node.merchandise.price
  }
})

/**
 * A pure transformation function that maps the raw Shopify cart response
 * to our clean, application-specific `Cart` object. This function composes
 * the `normalizeCartLine` helper to handle line item transformation.
 *
 * @param {CartResponse} shopifyCart - The raw cart object from the Shopify API.
 * @returns {Cart} The normalized application-specific cart object.
 */
export const normalizeCart = (shopifyCart: CartResponse): Cart => {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    cost: {
      totalAmount: shopifyCart.cost.totalAmount,
      subtotalAmount: shopifyCart.cost.subtotalAmount
    },
    lines: shopifyCart.lines.edges.map(normalizeCartLine)
  }
}
