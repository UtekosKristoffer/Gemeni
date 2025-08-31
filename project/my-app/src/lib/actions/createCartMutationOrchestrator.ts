//Path src/lib/actions/createCartMutationOrchestrator.ts

/**
 * @fileoverview Higher‑order function factory for cart mutations.
 *
 *   Many cart operations share the same high‑level workflow: validate user input,
 *   retrieve or establish a cart session, perform the specific Storefront API
 *   mutation, revalidate any cached data and normalize the resulting cart shape.
 *   This factory encapsulates that workflow so that individual actions can
 *   focus on their unique responsibilities while delegating common steps to
 *   the orchestrator.  Encapsulation promotes code reuse and reduces the
 *   likelihood of inconsistent behavior across different cart actions.
 *
 *   The returned function will propagate errors from each stage; callers should
 *   handle them appropriately (e.g. via {@link module:lib/errors/mapThrownErrorToActionResult mapThrownErrorToActionResult}).
 *
 * @template TInput - The input type expected by the specific mutation.
 * @param {InputValidator<TInput>} validateInput - A synchronous validator that throws when input is invalid.
 * @param {PerformMutation<TInput>} performMutation - An async function that performs the Storefront API mutation.
 * @returns {(input: TInput) => Promise<Cart>} A new function that runs the full mutation workflow for the given input.
 * @throws {MissingCartIdError} If no cart session can be determined.
 * @throws {Error} If validation fails, if the mutation returns no data, or if the mutation itself throws.
 *
 * @module lib/actions/createCartMutationOrchestrator
 */
import { revalidateTag } from 'next/cache'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { normalizeCart } from '@/lib/helpers/cart/normalizeCart'
import { MissingCartIdError } from '@/lib/errors'
import type { Cart, InputValidator, PerformMutation, MutationInput } from '@/types'

export function createCartMutationOrchestrator<TInput extends MutationInput>(validateInput: InputValidator<TInput>, performMutation: PerformMutation<TInput>): (input: TInput) => Promise<Cart> {
  return async (input: TInput): Promise<Cart> => {
    // Validate the shape and semantics of the input before doing anything else.
    validateInput(input)

    // Acquire the current cart session.  If none exists, throw a domain-specific error.
    const cartId = await getCartIdFromCookie()
    if (!cartId) throw new MissingCartIdError()

    // Perform the actual mutation.  This call is expected to return raw cart data.
    const rawCart = await performMutation(cartId, input)
    if (!rawCart) throw new Error('API mutation returned no cart data.')

    // Invalidate any cached cart data so subsequent reads fetch fresh state.
    revalidateTag('cart')

    // Normalize the cart shape into the application’s canonical form.
    return normalizeCart(rawCart)
  }
}
