// Path: src/components/cart/CartDrawer.tsx

/**
 * @fileoverview Provides the primary user interface for viewing and managing the shopping cart.
 */
'use client' // CORRECTED: Directive must have a space.

import React from 'react'
import { CartBody, CartFooter, CartHeader, CartTrigger } from '@/components/cart'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useCartOpen, useCartQuery } from '@/useHooks' // Assuming hooks are in '@/hooks'
import { cartStore } from '@/lib/state/cartStore'
import type { Cart } from '@/types'

/** A pure selector function to derive the item count from the cart data. */
const selectItemCount = (cart: Cart | null | undefined): number => cart?.totalQuantity ?? 0

/**
 * The main orchestrator for the Cart Drawer.
 * This component controls the drawer's state (open/closed) and is responsible for
 * fetching the cart data and rendering its constituent parts.
 */
export function CartDrawer() {
  const open = useCartOpen()
  // This hook will be implemented next.
  const { data: cart } = useCartQuery()
  const itemCount = selectItemCount(cart)

  return (
    <Drawer open={open} onOpenChange={isOpen => cartStore.send({ type: isOpen ? 'OPEN' : 'CLOSE' })} direction='right'>
      <CartTrigger />
      <DrawerContent className='flex h-full w-full max-w-md flex-col'>
        <CartHeader itemCount={itemCount} />
        <CartBody cart={cart} />
        <CartFooter cart={cart} />
      </DrawerContent>
    </Drawer>
  )
}
