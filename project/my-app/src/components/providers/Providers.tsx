// src/components/providers/Providers.tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CartMutationContext } from '@/lib/actors/CartMutationContext'
import getQueryClient from '@/clients/getQueryClient'
import type { Cart } from '@/types'
import type * as React from 'react'
export function Providers({ children, initialCart, cartId }: { children: React.ReactNode; initialCart: Cart | null; cartId: string | null }) {
  const queryClient = getQueryClient()
  queryClient.setQueryData(['cart', cartId], initialCart)
  return (
    <CartMutationContext.Provider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </CartMutationContext.Provider>
  )
}

export default Providers
