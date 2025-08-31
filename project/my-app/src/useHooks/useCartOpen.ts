// Path: src/hooks/useCartOpen.ts
'use client'

import { cartStore } from '@/lib/state/cartStore'
import { useSelector } from '@xstate/store/react'
import type { StoreSnapshot } from '@xstate/store'
import type { CartUserInterfaceContext } from '@/types'

/**
 * A selector function to extract the `open` state from the cart store snapshot.
 * It correctly accesses the `context` property of the snapshot.
 * @param snapshot - The current snapshot of the cart store, provided by useSelector.
 * @returns The `open` state.
 */
export const selectIsOpen = (snapshot: StoreSnapshot<CartUserInterfaceContext>): boolean => snapshot.context.open

/**
 * A selector-based hook that subscribes only to the `open` state of the cart drawer.
 */
export const useCartOpen = () => useSelector(cartStore, selectIsOpen)
