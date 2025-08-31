/**
 * @fileoverview Defines reusable Zod schemas for cart operations.  Each schema
 *   describes the shape of input data required by a specific cart mutation and
 *   associates user‑friendly error messages with the validation rules.  The
 *   motivation is to ensure that all input data is validated consistently and
 *   clearly before any business logic executes.  This also allows AI
 *   assistants to understand the intended data contract for each operation.
 *
 *   In Zod v4 the `message` parameter for validation rules has been
 *   deprecated in favor of the `error` parameter
 * @see https://zod.dev/v4/changelog#:~:text=deprecates%20message.
 * The `error` parameter accepts either a string or a function and is used here
 *   to provide declarative, end‑user–facing messages when validation fails
 * @see https://zod.dev/error-customization#:~:text=The%20error%20param.
 *
 * @module db/zod/cartSchemas
 */

import z from 'zod'

/**
 * Schema defining a valid payload for adding an item to the cart.  It requires
 * a `variantId` and a positive `quantity`.  Custom error messages are
 * supplied to make validation failures clear to the end user.
 *
 * @constant
 * @type {z.ZodObject}
 */
export const AddToCartSchema = z.object({
  /**
   * The unique identifier for the product variant.  Must be a non‑empty
   * string.  The `error` message conveys to the user that a variant must be
   * selected.
   */
  variantId: z.string().min(1, { error: 'Please select a product variant.' }),
  /**
   * The quantity of items to add.  Must be at least 1.  A positive quantity
   * indicates how many of the specified variant should be added to the cart.
   */
  quantity: z.number().min(1, { error: 'Quantity must be at least 1.' })
})

/**
 * Schema defining a valid payload for updating an existing cart line.  It
 * requires a `lineId` and a new non‑negative quantity.  This schema
 * enforces that quantities cannot be negative and that a valid line
 * identifier is provided.
 *
 * @constant
 * @type {z.ZodObject}
 */
export const UpdateCartSchema = z.object({
  /**
   * Identifier of the line in the cart to update.  Must be a non‑empty
   * string.  Provides a clear error message when omitted.
   */
  lineId: z.string().min(1, { error: 'lineId is required' }),
  /**
   * The new quantity for the specified line.  Must be an integer that is
   * zero or greater.  A zero quantity effectively removes the line.
   */
  quantity: z.number().int().nonnegative({ error: 'Quantity must be 0 or greater' })
})

/**
 * Schema defining a valid payload for removing a single line from the cart.
 * It ensures that a `lineId` is provided and is not an empty string.  The
 * associated error message informs the caller that the identifier is
 * mandatory for this operation.
 *
 * @constant
 * @type {z.ZodObject}
 */
export const RemoveCartLineSchema = z.object({
  /**
   * Identifier of the cart line to remove.  A non‑empty string is required.
   */
  lineId: z.string().min(1, { error: 'A non-empty lineId was expected.' })
})

/**
 * Schema defining a valid payload for clearing the entire cart.  This
 * operation should not receive any meaningful data, so the schema accepts
 * either `undefined` or an empty object only.  Any other value or an object
 * with keys will cause validation to fail with a descriptive error.  This
 * prevents callers from accidentally passing unintended data into the clear
 * operation.
 *
 * @constant
 * @type {z.ZodType<unknown>}
 */
export const ClearCartLineSchema = z.unknown().refine(val => val === undefined || (typeof val === 'object' && val !== null && Object.keys(val).length === 0), { error: 'clearCartAction expects no arguments.' })

/**
 * Demonstrates conversion of a Zod schema to a JSON Schema using
 * `zod-to-json-schema`.  This conversion is useful when integrating with
 * tools or services that expect JSON Schema.  Only the AddToCart schema is
 * converted here for illustration; other schemas can be converted in the
 * same way if needed.
 *
 * @constant
 * @type {object}
 */
const jsonSchema = z.toJSONSchema(AddToCartSchema)

// Log the resulting JSON Schema to aid developers and tools in exploring
// the schema structure at build time.  This side effect can be removed in
// production.
console.log('JSON Schema:', JSON.stringify(jsonSchema, null, 2))

/**
 * JSON Schema representation of the AddToCartSchema.  Exported so other
 * modules can reuse or expose this schema for API documentation or schema
 * validation libraries.
 */
export const AddToCartJSONSchema = jsonSchema
