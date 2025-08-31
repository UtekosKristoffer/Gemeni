// Path: src/lib/state/createCartMutationMachine.ts
'use client'

import { assign, fromPromise, setup, type ErrorActorEvent } from 'xstate'
import type { CartMutationContext, CartActions, CartActionsResult, CartMutationEvent } from '@/types'

/**
 * @description A factory function that creates an XState state machine for handling asynchronous cart mutations.
 * Its purpose is to centralize and orchestrate the logic for adding, updating, and removing items.
 * Using a state machine ensures robust and predictable handling of states like 'idle', 'mutating',
 * and error scenarios. The function accepts server actions as dependencies,
 * making the machine testable and decoupled from the specific implementation of API calls.
 * @param {CartActions} serverActions An object containing the actual asynchronous functions to mutate the cart on the server.
 * @param {() => void} revalidateCart A callback function invoked after a successful mutation to invalidate the cache and fetch fresh data. In Next.js, this is typically `revalidatePath`.
 * @returns A fully configured XState state machine, ready for use.
 */
export const createCartMutationMachine = (serverActions: CartActions, revalidateCart: () => void) =>
  setup({
    types: {
      context: {} as CartMutationContext,
      events: {} as CartMutationEvent
    },
    actors: {
      /**
       * @description An XState "actor" that executes the actual server mutation.
       * It's defined as a promise (`fromPromise`) and receives the event that triggered it.
       * Based on the event type (`ADD_LINES`, `UPDATE_LINE`, etc.), it calls the corresponding `serverAction`.
       * This design keeps the machine definition itself clean of implementation details.
       */
      cartMutator: fromPromise<CartActionsResult, CartMutationEvent>(async ({ input: event }) => {
        switch (event.type) {
          case 'ADD_LINES':
            return serverActions.addLine(event.input)
          case 'UPDATE_LINE':
            return serverActions.updateLineQuantity(event.input)
          case 'REMOVE_LINE':
            return serverActions.removeLine(event.input)
          case 'CLEAR':
            return serverActions.clearCart()
          default: {
            // This ensures exhaustiveness. If a new event type is added to CartMutationEvent,
            // TypeScript will error here, preventing incomplete logic.
            const exhaustiveCheck: never = event
            throw new Error(`Unhandled event type: ${(exhaustiveCheck as any).type}`)
          }
        }
      })
    }
  }).createMachine({
    id: 'CartMutation',
    initial: 'idle',
    context: { error: null },
    states: {
      /**
       * @description The machine's resting state. It is waiting for a mutation event.
       * Each time it enters this state, any previous error messages are cleared.
       */
      idle: {
        entry: assign({ error: null }),
        on: {
          /** @description A wildcard transition. Any event received in the 'idle' state will transition to 'mutating'.
           * This significantly simplifies the definition, as we don't need to list every single mutation event.
           */
          '*': 'mutating'
        }
      },
      /**
       * @description The machine's active state. Here, the `cartMutator` actor is running to perform the server call.
       * The machine remains in this state until the promise from the actor is resolved (`onDone`) or rejected (`onError`).
       */
      mutating: {
        invoke: {
          src: 'cartMutator',
          input: ({ event }) => event, // Passes the triggering event as input to the actor.
          /**
           * @description Handles a successful result from the `cartMutator` actor.
           * It transitions back to 'idle' and executes the `revalidateCart` action to update the UI with fresh data.
           */
          onDone: {
            target: 'idle',
            actions: revalidateCart
          },
          /**
           * @description Handles an error from the `cartMutator` actor.
           * It transitions back to 'idle' and stores the error message in the machine's context,
           * allowing it to be displayed in the UI.
           */
          onError: {
            target: 'idle',
            actions: assign({
              error: ({ event }: { event: ErrorActorEvent }) => {
                const serverActionResult = event.error as CartActionsResult
                return serverActionResult?.message ?? 'An unknown error occurred.'
              }
            })
          }
        }
      }
    }
  })
