// 'use server' directive tells Next.js that this module should be executed
// in the server environment.  All validation functions are synchronous and
// perform no side effects, making them safe to run on the server.
'use server'

/**
 * @fileoverview Contains synchronous input validation functions for cart‑related
 *   operations.  Each validator delegates to a Zod schema to verify that
 *   incoming data from the UI or API matches the expected shape and
 *   semantics.  When validation fails, a `ValidationError` from
 *   `zod-validation-error` is thrown so that higher layers can map the
 *   failure to an appropriate response.
 *
 *   Separating validation into its own module encourages a clear
 *   responsibility: these functions answer the question “is the input
 *   structurally correct?” and nothing more.  They allow action functions to
 *   remain focused on orchestrating business logic, while AI assistants can
 *   derive accurate type information and error semantics from the JSDoc
 *   annotations.  See the {@link https://jsdoc.app/tags-param @param} and
 *   {@link https://jsdoc.app/tags-returns @returns} documentation for
 *   guidelines on annotating function signatures
 *   @see https://jsdoc.app/tags-param#:~:text=The%20,description%20of%20a%20function%20parameter.
 *
 * @module db/zod/validations
 */

import { fromZodError } from 'zod-validation-error'
import { AddToCartSchema, UpdateCartSchema, RemoveCartLineSchema, ClearCartLineSchema } from '@/db/zod/cartSchemas'
import type { AddToCartFormValues, UpdateCartLineInput, RemoveCartLineInput, ClearCartLineInput } from '@/types/cart'

/**
 * Validate the payload for adding a new line item to the cart.
 *
 * This function checks that the provided values satisfy the rules defined
 * in the {@link module:db/zod/cartSchemas}.  It
 * ensures that a variant identifier is present and that the quantity is
 * at least one.  Centralizing this logic prevents downstream code from
 * being cluttered with defensive checks.
 *
 * @param {AddToCartFormValues} input - The raw input object collected from
 *   a form or API request.  Should contain a `variantId` string and a
 *   positive `quantity` number.
 * @throws {ValidationError} Thrown when the input fails schema validation.
 *   The error message is formatted for human consumption, and the details
 *   property retains the original Zod issues for debugginghttps://jsdoc.app/tags-throws#:~:text=The%20%40throws%20tag%20allows%20you,in%20a%20single%20JSDoc%20comment.
 * @returns {void} Does not return a value.  Successful execution implies
 *   that the input conforms to the schema.
 */
export const validateAddLineInput = (input: AddToCartFormValues): void => {
  const result = AddToCartSchema.safeParse(input)
  if (!result.success) {
    // Convert the ZodError into a human‑readable ValidationError and throw it.
    throw fromZodError(result.error)
  }
}

/**
 * Validate the payload for updating an existing cart line.
 *
 * This function enforces that the update request specifies a line
 * identifier and a non‑negative integer quantity.  By offloading
 * validation here, the update action can assume the request is valid and
 * focus on performing the mutation.
 *
 * @param {UpdateCartLineInput} input - The update request containing the
 *   `lineId` and the desired `quantity` for that line.
 * @throws {ValidationError} Thrown when the input does not meet the
 *   constraints defined in {@link module:db/cartSchemas.UpdateCartSchema UpdateCartSchema}.
 * @returns {void} No return value; an exception indicates invalid input.
 */
export const validateUpdateLineInput = (input: UpdateCartLineInput): void => {
  const result = UpdateCartSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}

/**
 * Validate the payload for removing a single line from the cart.
 *
 * The remove operation requires only a non‑empty `lineId`.  This validator
 * confirms that requirement by delegating to the
 * @see module:db/zod/cartSchemas.RemoveCartLineSchema RemoveCartLineSchema.
 *
 * @param {RemoveCartLineInput} input - The remove request object.  Must
 *   include a non‑empty `lineId` property.
 * @throws {ValidationError} Thrown when the `lineId` is missing or empty.
 * @returns {void} Does not return; throws to signal invalid input.
 */
export const validateRemoveCartLineInput = (input: RemoveCartLineInput): void => {
  const result = RemoveCartLineSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}

/**
 * Validate the payload for clearing the entire cart.
 *
 * Clearing the cart should not include any arguments.  This function accepts
 * either `undefined` or an empty object and rejects any other value,
 * preserving symmetry with the other validators.  See
 * {@see module:db/zod/cartSchemas.ClearCartLineSchema ClearCartLineSchema} for the
 * specific validation rules.
 *
 * @param {ClearCartLineInput} input - The clear‑cart request.  Should be
 *   `undefined` or an empty object; any other value is invalid.
 * @throws {ValidationError} Thrown when the input contains unexpected keys
 *   or values.
 * @returns {void} Returns nothing; an exception indicates improper usage.
 */
export const validateClearCartInput = (input: ClearCartLineInput): void => {
  const result = ClearCartLineSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
