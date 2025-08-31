import { z } from 'zod'
import type { EventPayloadMap } from '@xstate/store'
import type { ProductVariant, Money, Image } from '@/types'
import { AddToCartSchema, UpdateCartSchema, RemoveCartLineSchema, ClearCartLineSchema } from '@/db/zod/cartSchemas'
export type AddLineEvent = { type: 'ADD_LINES'; input: { merchandiseId: string; quantity: number } }
export type AddLineInput = {
  merchandiseId: string
  quantity: number
}
export type AddToBagResponse = { cartLinesAdd: { cart: CartResponse } }
export type AddToCartFormValues = z.infer<typeof AddToCartSchema>
export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
  lines: CartLine[]
}
export type CartActions = {
  addLine(input: { merchandiseId: string; quantity: number }): Promise<CartActionsResult>
  updateLineQuantity(input: { lineId: string; quantity: number }): Promise<CartActionsResult>
  removeLine(input: { lineId: string }): Promise<CartActionsResult>
  clearCart(): Promise<CartActionsResult>
}
export type CartActionsResult = {
  success: boolean
  message: string
  cart?: Cart | null
  error?: string | null
}
export type CartExtractor<TCart> = (response: CartResponse) => TCart | undefined
export type CartLine = {
  id: string // This is the ID of the line itself (lineId)
  quantity: number
  merchandise: ProductVariant
}
export type CartLinesRemoveResponse = { cartLinesRemove: { cart: CartResponse } }
export type CartLinesUpdateResponse = { cartLinesUpdate: { cart: CartResponse } }
export type CartMutationContext = {
  error?: string | null
}
export type CartMutationEvent = AddLineEvent | UpdateLineQuantityEvent | RemoveLineEvent | ClearCartMutationEvent
export type CartMutationFn<TInput extends CartMutationInput | void = void> = (input: TInput) => Promise<CartActionsResult>
export type CartMutationInput = AddLineInput | UpdateLineQuantityInput | RemoveLineInput
export type CartNormalizer<TResponseCart> = (rawCart: TResponseCart) => Cart
/**
 * Represents the direct data structure returned by the Shopify Storefront API
 * for the `cartQuery`.
 * @see cartQuery - The corresponding GraphQL query.
 */
export type CartQueryResult = {
  cart: CartResponse
}
export type CartResponse = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
  lines: {
    edges: {
      node: {
        id: string
        quantity: number
        merchandise: {
          id: string
          title: string
          image: Image | null
          price: Money
        }
      }
    }[]
  }
}
export type CartUserInterfaceContext = {
  open: boolean
  pending: number
  lastOp?: LastOperation
  optimisticLines: OptimisticLines
}

export type ClearCartLineInput = z.infer<typeof ClearCartLineSchema>
export type ClearCartMutationEvent = { type: 'CLEAR'; input?: never }
export type InputValidator<T extends MutationInput> = (input: T) => void
export type LastOperation = {
  type: 'add' | 'update' | 'remove' | 'clear'
  at: number
  payload?: unknown
}
export type MutationInput = { [key: string]: string | number | boolean | undefined | null }
export type OptimisticLines = { lines: Record<string, number> }
export type PerformMutation<T extends MutationInput> = (cartId: string, input: T) => Promise<CartResponse | null | undefined>
export type RemoveCartLineInput = z.infer<typeof RemoveCartLineSchema>
export type RemoveLineEvent = { type: 'REMOVE_LINE'; input: { lineId: string } }
export type RemoveLineInput = {
  lineId: string
}
export type ShopifyCartLineEdge = CartResponse['lines']['edges'][number]
export type UpdateCartLineInput = z.infer<typeof UpdateCartSchema>
export type UpdateLineQuantityEvent = { type: 'UPDATE_LINE'; input: { lineId: string; quantity: number } }
export type UpdateLineQuantityInput = {
  lineId: string
  quantity: number
}

export type UserInterfaceEventMap = {
  OPEN: EventPayloadMap
  CLOSE: EventPayloadMap
  TOGGLE: EventPayloadMap
  PENDING_INC: EventPayloadMap
  PENDING_DEC: EventPayloadMap
  SET_LAST_OPERATION: { value: LastOperation }
  OPTIMISTIC_LINES_UPDATE: { delta: Record<string, number> }
  OPTIMISTIC_CLEAR: EventPayloadMap
}
