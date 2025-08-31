// Path: src/lib/utils/normalizeShopifyUrl.ts

import type { Route } from 'next'

/**
 * @fileoverview Provides a utility function to safely extract the pathname from a full URL.
 * @module lib/utils/normalizeShopifyUrl
 */

/**
 * Safely parses a URL string and returns its pathname. If the URL is invalid,
 * it returns the original string as a fallback.
 * This is useful for cleaning up absolute URLs from Shopify to be used as relative paths.
 *
 * @param {string} url - The full URL string to parse.
 * @returns {string} The pathname part of the URL, or the original string on error.
 * @example
 * normalizeShopifyUrl('https://example.com/products/my-product') // returns '/products/my-product'
 * normalizeShopifyUrl('/some/relative/path') // returns '/some/relative/path'
 */
export function normalizeShopifyUrl(url: string): Route | string {
  try {
    // new URL() requires a base if the URL is relative, but it correctly
    // parses pathnames from absolute URLs.
    return new URL(url).pathname as Route
  } catch {
    // If new URL() fails (e.g., for an already relative path), return the original string.
    return url
  }
}

export default normalizeShopifyUrl
