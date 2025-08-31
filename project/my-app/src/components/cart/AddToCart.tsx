// Path: src/components/forms/AddToCart.tsx
'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CartMutationContext } from '@/lib/actors/CartMutationContext'
import { createAddToCartFormConfig, createAddToCartSubmitHandler, withSuccessToast } from '@/lib/helpers/cart/cartForm'
import type { ProductVariant, AddToCartFormValues } from '@/types'
import { toast } from 'sonner'
type AddToCartFormFieldsProps = {
  isPending: boolean
  isDisabled: boolean
}
/**
 * Renders the presentational fields for the AddToCart form.
 *
 * This component exists to separate the form's UI (the "what") from its
 * parent's logic and state management (the "how"), adhering to the
 * Separation of Concerns (SoC) principle. It is a "dumb" component that
 * receives its state as props and contains no hooks or business logic.
 *
 * @param {object} props - The component's props.
 * @param {boolean} props.isPending - True if the form submission is in progress, used to show a loading state.
 * @param {boolean} props.isDisabled - True if the form should be disabled (e.g., no product variant is selected).
 * @returns {JSX.Element} The rendered form fields and submit button.
 */
function AddToCartFormFields({ isPending, isDisabled }: AddToCartFormFieldsProps) {
  return (
    <>
      <FormField name='variantId' render={({ field }) => <input type='hidden' {...field} />} />
      <FormField
        name='quantity'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Antall</FormLabel>
            <div className='flex items-center gap-2'>
              <FormControl>
                <Input type='number' inputMode='numeric' min={1} className='w-24' {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 1)} disabled={isDisabled} />
              </FormControl>
              <Button type='submit' disabled={isPending || isDisabled} className='flex-1'>
                {isPending ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

/**
 * The primary "smart" component for the Add to Cart form.
 *
 * This component acts as the orchestrator for the "add to cart" feature. Its
 * main responsibility is to wire together the global state machine (via XState
 * context), the form state (via `react-hook-form`), and the reusable form
 * logic from our helper files. It handles side-effects and delegates the
 * actual field rendering to the `AddToCartFormFields` presentational component.
 *
 * @param {object} props - The component's props.
 * @param {ProductVariant | null} props.selectedVariant - The currently selected product variant, which is necessary to populate the hidden variantId field.
 * @returns {JSX.Element} The complete, interactive Add to Cart form.
 */
export function AddToCartForm({ selectedVariant }: { selectedVariant: ProductVariant | null }) {
  // Get the XState actor and its state from our global context
  const cartActor = CartMutationContext.useActorRef()
  const isPending = CartMutationContext.useSelector(state => state.matches('mutating'))
  const lastError = CartMutationContext.useSelector(state => state.context.error)

  // Configure the form using our pure helper function
  const form = useForm<AddToCartFormValues>(createAddToCartFormConfig(selectedVariant))

  // Compose the submission handler using our HOFs
  const baseSubmitHandler = createAddToCartSubmitHandler(cartActor)
  const onSubmit = withSuccessToast(baseSubmitHandler, selectedVariant)

  // Effect to sync the selected variant prop with the form's hidden input
  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '', { shouldValidate: true })
  }, [selectedVariant, form.setValue])

  // Effect to display server errors from the XState machine context
  useEffect(() => {
    if (lastError) {
      toast.error(lastError)
    }
  }, [lastError])

  return (
    <Form {...form}>
      {/* The form now calls the composed onSubmit handler via RHF's handleSubmit */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <AddToCartFormFields isPending={isPending} isDisabled={!selectedVariant} />
      </form>
    </Form>
  )
}
