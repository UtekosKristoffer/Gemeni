// Path: src/lib/helpers/menu/fetchMenu.ts

/**
 * @fileoverview Provides the primary server-side function for fetching navigation
 * menu data from the Shopify Storefront API.
 * @todo Add caching mechanism to reduce redundant API calls.
 * @todo  Add similar approach to getMenu as getCart with error handling and type safety.
 * @module lib/helpers/getMenu
 */

import { storefrontClient } from '@/clients/storefrontApiClient'
import { menuQuery } from '@/lib/queries'
import type { MenuItem } from '@/types'
import { normalizeMenu, type ShopifyMenuItem } from './normalizeMenu'

/**
 * Represents the expected structure of the full menu API response.
 */
interface ShopifyMenuResponse {
  menu: {
    items: ShopifyMenuItem[]
  }
}

/**
 * Retrieves a specific navigation menu by its handle from the Shopify API.
 * This function handles the API request and delegates the response transformation
 * to the `normalizeMenu` function, adhering to the single responsibility principle.
 *
 * @async
 * @function fetchMenu
 * @param {string} handle - The handle of the menu to fetch (e.g., 'header-mega-menu').
 * @returns {Promise<MenuItem[]>} A promise that resolves with the normalized array of
 * `MenuItem` objects, or an empty array if the request fails or the menu is not found.
 * @example
 * const mainMenu = await getMenu('header-mega-menu');
 */
export const fetchMenu = async (handle: string): Promise<MenuItem[]> => {
  try {
    const { data, errors } = await storefrontClient.request<ShopifyMenuResponse>(menuQuery, {
      variables: { handle }
    })

    if (errors || !data?.menu) {
      console.error(`Error fetching menu with handle "${handle}":`, JSON.stringify(errors, null, 2))
      return []
    }

    return normalizeMenu(data.menu.items)
  } catch (error) {
    console.error(`An unexpected error occurred while fetching menu "${handle}":`, error)
    return []
  }
}

export default fetchMenu
