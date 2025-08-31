// Path: src/lib/hooks/useCartMutation.ts
'use client'

import { useMutation } from '@tanstack/react-query'
import type { CartActionsResult, CartMutationFn, CartMutationInput } from '@/types'

/**
 * A generic React Query hook for performing any cart mutation.
 * It abstracts the `useMutation` logic for handling success and error states
 * returned by our Server Actions.
 *
 * @template TInput - The specific input type for the mutation, inferred from the mutationFn.
 * @param mutationFn The specific Server Action to execute (e.g., addLineAction).
 * @returns The state and methods from React Query's `useMutation`.
 */
// CORRECTED: The hook is now generic, allowing it to infer the input type.
export const useCartMutation = <TInput extends CartMutationInput>(mutationFn: CartMutationFn<TInput>) => {
  const mutation = useMutation<CartActionsResult, Error, TInput>({
    mutationFn,
    onSuccess: data => {
      if (data.success) {
        console.log('Mutation successful:', data.message)
      } else {
        console.error('Mutation failed:', data.message, `(Code: ${data.error})`)
      }
    },
    onError: error => {
      console.error('An unexpected network or client error occurred:', error.message)
    }
  })

  return mutation
}
