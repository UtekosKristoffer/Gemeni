'use client'

import { DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ShoppingBagIcon } from 'lucide-react'
import { useCartStoreSnapshot } from '@/useHooks/useCartStoreSnapshot'
import { cartStore } from '@/lib/state/cartStore'
export function CartTrigger() {
  const { optimisticLines } = useCartStoreSnapshot().context
  const itemCount = Object.keys(optimisticLines.lines).length

  return (
    <DrawerTrigger asChild>
      <Button variant='outline' size='default' aria-label={`Open cart, ${itemCount} items`} className='relative' onClick={() => cartStore.send({ type: 'OPEN' })}>
        <ShoppingBagIcon className='size-6' />
        {itemCount > 0 && <span className='absolute top-0 right-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground'>{itemCount}</span>}
      </Button>
    </DrawerTrigger>
  )
}
