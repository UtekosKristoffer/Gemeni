// Path: src/hooks/useCartOptimistic.ts
'use client'

import { cartStore } from '@/lib/state/cartStore'
import { useSelector } from '@xstate/store/react'
import type { StoreSnapshot } from '@xstate/store'
import type { CartUserInterfaceContext, OptimisticLines } from '@/types'

/**
 * A selector function to extract the `optimisticLines` state from the cart store snapshot.
 * @param snapshot - The current snapshot of the cart store.
 * @returns The optimistic lines state.
 */
export const selectOptimistic = (snapshot: StoreSnapshot<CartUserInterfaceContext>): OptimisticLines => snapshot.context.optimisticLines

/**
 * A selector-based hook that subscribes to the optimistic state of the cart.
 * This state can be used to render immediate UI feedback while a mutation is in progress.
 */
export const useCartOptimistic = () => useSelector(cartStore, selectOptimistic)
