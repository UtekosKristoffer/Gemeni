// Path: src/lib/helpers/cartForm.ts

/**
 * @fileoverview Provides core, composable functions for building cart-related forms.
 * This module contains the building blocks for form configurations and submission handlers.
 *
 * @module lib/helpers/cartForm
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type { ActorRefFrom } from 'xstate'

import { AddToCartSchema } from '@/db/zod/cartSchemas'
import type { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { ProductVariant, AddToCartFormValues } from '@/types'

/**
 * A pure function that creates the configuration object for the RHF `useForm` hook.
 * @param {ProductVariant | null} selectedVariant - The initially selected variant.
 * @returns The configuration object for `useForm`.
 */
export const createAddToCartFormConfig = (selectedVariant: ProductVariant | null) => ({
  resolver: zodResolver(AddToCartSchema),
  defaultValues: {
    variantId: selectedVariant?.id ?? '',
    quantity: 1
  },
  mode: 'onChange' as const
})

/**
 * A higher-order function that creates a form submission handler.
 * It takes the XState process actor as a dependency and returns a fully typed onSubmit function.
 *
 * @param {ActorRefFrom<ReturnType<typeof createCartMutation>>} processRef - A reference to the cart process actor.
 * @returns {function(values: AddToCartFormValues): void} The generated onSubmit event handler.
 */
export const createAddToCartSubmitHandler = (processRef: ActorRefFrom<ReturnType<typeof createCartMutationMachine>>) => (values: AddToCartFormValues) => {
  processRef.send({
    type: 'ADD_LINES',
    input: {
      merchandiseId: values.variantId,
      quantity: values.quantity
    }
  })
}

/**
 * A higher-order function (a "decorator") that takes a submission handler
 * and adds a success toast notification to it.
 *
 * @param {function(values: AddToCartFormValues): void} submitHandler - The core submission function.
 * @param {ProductVariant | null} selectedVariant - The variant needed for the toast message.
 * @returns {function(values: AddToCartFormValues): void} The enhanced onSubmit handler with toasting.
 */
export const withSuccessToast = (submitHandler: (values: AddToCartFormValues) => void, selectedVariant: ProductVariant | null) => (values: AddToCartFormValues) => {
  submitHandler(values)
  if (selectedVariant) {
    toast.success(`${values.quantity} x ${selectedVariant.title} lagt i handlekurv!`)
  }
}
// Note: The toast message is in Norwegian to match the locale of the sample store.
