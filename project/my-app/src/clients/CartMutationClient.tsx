// Path: src/clients/CartMutationClient.tsx

'use client'

import React from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import { CartMutationContext } from '@/lib/actors/CartMutationContext'

import type { CartActions } from '@/types'

/**
 * @description A client component that initializes and provides the cart mutation machine to its children via React Context.
 * This component acts as the integration point or "Composition Root" for the cart's state logic. Its primary purpose is to
 * connect the abstract state machine with the application's specific implementation details (server actions and data caching).
 * By centralizing this setup, we ensure that any child component can access a single, consistent instance of the cart
 * machine without needing to know how it was created, promoting a clean separation of concerns.
 * @param {object} props - The component props.
 * @param {CartActions} props.actions - The concrete implementation of server actions for cart mutations. This dependency injection allows for easy testing and swapping of implementations.
 * @param {React.ReactNode} props.children - The child components that will consume the provided machine actor.
 * @returns {JSX.Element} The context provider that makes the cart machine actor available to the component tree.
 */
export function CartMutationClient({ actions, children }: { actions: CartActions; children: React.ReactNode }) {
  const queryClient = useQueryClient()

  // The revalidation function is defined here to close over the queryClient.
  // It will be passed to the state machine to be called upon successful mutations.
  const revalidateCart = () => queryClient.invalidateQueries({ queryKey: ['cart'] })

  // The state machine is created here, injecting the server actions and revalidation logic.
  // We assume the React Compiler will memoize this instance, preventing re-creation on re-renders.
  const cartMutationMachine = createCartMutationMachine(actions, revalidateCart)

  return <CartMutationContext.Provider logic={cartMutationMachine}>{children}</CartMutationContext.Provider>
}
