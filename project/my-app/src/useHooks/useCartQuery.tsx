//Path: src/hooks/useCartQuery.tsx

import { useQuery } from '@tanstack/react-query'
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import { getCartIdClient } from '@/lib/helpers/cart/getCartIdClient'

import type { Cart } from '@/types'

/**
 * @module hooks/useCartQuery
 * @function useCartQuery
 * @description
 * @param useCartQuery
 * @exports useCartQuery
 */

export const useCartQuery = () => {
  const cartId = getCartIdClient()

  return useQuery<Cart | null>({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null
      return fetchCart(cartId)
    },
    enabled: !!cartId
  })
}

export default useCartQuery
