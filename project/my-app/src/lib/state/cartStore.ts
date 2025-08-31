// Path: src/lib/state/cartStore.ts

'use client'

import { createStore } from '@xstate/store'
import type { CartUserInterfaceContext, UserInterfaceEventMap, OptimisticLines } from '@/types'
import type { EventPayloadMap } from '@xstate/store'


/**
 * @description Removes items with a quantity of 0 from a line object.
 * This is a utility function to clean up optimistic data, ensuring the cart UI
 * doesn't display items that have been removed (quantity set to 0).
 * @param {OptimisticLines['lines']} lines An object where keys are line IDs and values are quantities.
 * @returns {OptimisticLines['lines']} A new object containing only lines with a quantity greater than 0.
 */
const removeZeroQuantityLines = (lines: OptimisticLines['lines']): OptimisticLines['lines'] => {
  return Object.fromEntries(Object.entries(lines).filter(([_, quantity]) => quantity > 0))
}
 
/**
 * @description Creates a simple, global store to manage the state of the cart's user interface (UI).
 * This store is built with `@xstate/store` and is intended for synchronous and simple UI states that do not require
 * the full complexity of a state machine. It exists to separate UI logic (e.g., "is the cart panel open?")
 * from the asynchronous business logic handled by `createCartMutationMachine`.
 */
export const cartStore = createStore<CartUserInterfaceContext, UserInterfaceEventMap, EventPayloadMap>({
  /**
   * @description The initial context (state) for the UI store.
   */
  context: {
    /** @property {boolean} open Controls the visibility of the cart panel. `true` means visible. */
    open: false,
    /** @property {number} pending A counter for ongoing asynchronous operations. Used to display global loading states (e.g., a spinner). */
    pending: 0,
    /** @property {OptimisticLines} optimisticLines Contains an "optimistic" version of the cart's lines.
     * This allows the UI to update immediately after a user's action, before the server has confirmed the change,
     * providing a more responsive user experience. */
    optimisticLines: { lines: {} }
  },
  /**
   * @description Defines the transitions (state updates) based on events.
   * Each function here is a pure function that receives the current context and an event,
   * and returns the new context.
   */
  on: {
    /** @description Opens the cart panel. */
    OPEN: context => ({ ...context, open: true }),
    /** @description Closes the cart panel. */
    CLOSE: context => ({ ...context, open: false }),
    /** @description Toggles the visibility of the cart panel. */
    TOGGLE: context => ({ ...context, open: !context.open }),

    /** @description Increments the pending operations counter by 1. */
    PENDING_INC: context => ({ ...context, pending: context.pending + 1 }),
    /** @description Decrements the pending operations counter by 1, never going below 0. */
    PENDING_DEC: context => ({
      ...context,
      pending: Math.max(0, context.pending - 1)
    }),

    /** @description Stores information about the last performed mutation. */
    SET_LAST_OPERATION: (context, event) => ({
      ...context,
      lastOperation: event.value
    }),

    /**
     * @description Updates the optimistic lines.
     * This event receives a 'delta' (a change) and merges it with the existing lines.
     * It then removes any lines with a quantity of 0 to keep the state clean.
     */
    OPTIMISTIC_LINES_UPDATE: (context, event) => {
      const mergedLines = { ...context.optimisticLines.lines, ...event.delta }
      const nextLines = removeZeroQuantityLines(mergedLines)
      return { ...context, optimisticLines: { ...context.optimisticLines, lines: nextLines } }
    },

    /** @description Clears all optimistic lines. Typically used when the actual server state has been fetched. */
    OPTIMISTIC_CLEAR: context => ({
      ...context,
      optimisticLines: { lines: {} }
    })
  }
})
