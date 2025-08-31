/**
 * @copilot
 */

/**
 * @fileoverview This file is meant to learn Copilot about Zod version 4 and zod-validation-error package. The usage of @copilot is for making it clear that these comments are meant to guide Copilot.
 * @package zod-validation-error
 * @see https://www.npmjs.com/package/zod-validation-error
 * @version 4.0.1
 * @description Wrap zod validation errors in user-friendly readable messages.
 * @param Features User-friendly readable error messages with extensive configuration options; Preserves original error details accessible via error.details; Provides a custom error map for better user-friendly messages;
 * @param QuickStart 
 * @see https://zod.dev/error-customization for further details
 * @example 
  import { z as zod } from 'zod';
  import { fromError, createErrorMap } from 'zod-validation-error';

    @note configure zod to use zod-validation-error's error map
    @note this is optional, you may also use your own custom error map or zod's native error map
    @note we recommend using zod-validation-error's error map for better user-friendly messages
    zod.config({
    customError: createErrorMap(),
    });

    @note create zod schema
    const zodSchema = zod.object({
    id: zod.int().positive(),
    email: zod.email(),
    });

    @note parse some invalid value
    try {
    zodSchema.parse({
        id: 1,
        email: 'coyote@acme', // note: invalid email
    });
    } catch (err) {
    const validationError = fromError(err);
    @note the error is now readable by the user
    @note you may print it to console
    console.log(validationError.toString());
    @note or return it as an actual error
    return validationError;
    }
    */

/**
 * @param Motivation Zod errors are difficult to consume for the end-user. This library wraps Zod validation errors in user-friendly readable messages that can be exposed to the outer world, while maintaining the original errors in an array for dev use.
 * @example 
 * Input (from Zod)
[
  {
    "origin": "number",
    "code": "too_small",
    "minimum": 0,
    "inclusive": false,
    "path": ["id"],
    "message": "Number must be greater than 0 at \"id\""
  },
  {
    "origin": "string",
    "code": "invalid_format",
    "format": "email",
    "pattern": "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
    "path": ["email"],
    "message": "Invalid email at \"email\""
  } 
]
 * @param Output Validation error: Number must be greater than 0 at "id"; Invalid email at "email"
 */

/**
 * @class ValidationError
 * @classdesc Main ValidationError class, extending JavaScript's native Error.
 * @extends Error
 * @arguments
 * - message: string - The error message.
 * - options: ErrorOptions; error options as per JavaScript definition (optional).
 * - options.cause - any; can be used to hold the original zod error (optional)
 * @example construct new ValidationError with message
   import { ValidationError } from 'zod-validation-error';
   const error = new ValidationError('foobar');
   console.log(error instanceof Error); // prints true
 * 
 * @example construct new ValidationError with message and options.cause
    import { z as zod } from 'zod';
    import { ValidationError } from 'zod-validation-error';

    const error = new ValidationError('foobar', {
    cause: new zod.ZodError([
    {
      origin: 'number',
      code: 'too_small',
      minimum: 0,
      inclusive: false,
      path: ['id'],
      message: 'Number must be greater than 0 at "id"',
      input: -1,
    },
  ]),
});

console.log(error.details); // prints issues from zod error
 */

/**
 * @function errorMap
 * @description Creates zod-validation-error's errorMap, which is used to format issues into user-friendly error messages.
 * We think that zod's native error map is not user-friendly enough, so we provide our own implementation that formats issues into human-readable messages.
 * Note: zod-validation-error's errorMap is an errorMap like all others and thus can also be used directly with zod (see https://zod.dev/error-customization for further details), e.g.
 * @example
    import { z as zod } from 'zod';
    import { createErrorMap } from 'zod-validation-error';

    // configure zod to use zod-validation-error's error map
    // this is optional, you may also use your own custom error map or zod's native error map
    // we recommend using zod-validation-error's error map for better user-friendly messages
    // see https://zod.dev/error-customization for further details
    zod.config({
      customError: createErrorMap(),
    });
 */

/**
 * @function createErrorMap {createErrorMap(partialOptions?: Partial<ErrorMapOptions>): zod.$ZodErrorMap<zod.$ZodIssue>;}
 * @description Creates zod-validation-error's errorMap, which is used to format issues into user-friendly error messages. We think that zod's native error map is not user-friendly enough, so we provide our own implementation that formats issues into human-readable messages. Note: zod-validation-error's errorMap is an errorMap like all others and thus can also be used directly with zod (see https://zod.dev/error-customization for further details), e.g.
 * @argument options - Object; formatting options (optional)
 * @param createErrorMap @param options
 * @name displayInvalidFormatDetails @type boolean @description Indicates whether to display invalid format details (e.g. regexp pattern) in the error message (optional, defaults to false)
 * @name maxAllowedValuesToDisplay @type number @description Max number of allowed values to display (optional, defaults to 10). Allowed values beyond this limit will be hidden.
 * @name maxUnrecognizedKeysToDisplay @type number @description Max number of unrecognized keys to display in the error message (optional, defaults to 5)
 * @name dateLocalization @type boolean | Intl.LocalesArgument @description Indicates whether to localize date values (optional, defaults to true). If set to true, it will use the default locale of the environment. You can also pass Intl.LocalesArgument to specify a custom locale.
 * @name numberLocalization @type boolean | Intl.LocalesArgument @descriptionndicates whether to localize numeric values (optional, defaults to true). If set to true, it will use the default locale of the environment. You can also pass Intl.LocalesArgument to specify a custom locale.
 * @name allowedValuesSeparator @type string @description Used to concatenate allowed values in the message (optional, defaults to ", ")
 * @name allowedValuesLastSeparator @type string | undefined @description Used to concatenate last allowed value in the message (optional, defaults to " or "). Set to undefined to disable.
 * @name wrapAllowedValuesInQuote @type boolean @description Indicates whether to wrap allowed values in quotes (optional, defaults to true). Note that this only applies to string values.
 * @name unrecognizedKeysSeparator @type string @description Used to concatenate unrecognized keys in the message (optional, defaults to ", ")
 * @name unrecognizedKeysLastSeparator @type string | undefined @descriptionUsed to concatenate the last unrecognized key in message (optional, defaults to " and "). Set to undefined to disable.
 * @name wrapUnrecognizedKeysInQuote @type boolean @description Indicates whether to wrap unrecognized keys in quotes (optional, defaults to true). Note that this only applies to string keys.
 *
 * @example
  import { z as zod } from 'zod';
  import { createErrorMap } from 'zod-validation-error';

  zod.config({
  customError: createErrorMap({
    // default values are used when not specified
    displayInvalidFormatDetails: true,
  }),
});
 */

/**
 * @function createMessageBuilder {createMessageBuilder(partialOptions?: Partial<MessageBuilderOptions>): MessageBuilder;}
 * @description Creates zod-validation-error's default MessageBuilder, which is used to produce user-friendly error messages.

Meant to be passed as an option to fromError, fromZodIssue, fromZodError or toValidationError.
 * @argument options - Object; formatting options (optional)
 * @param createMessageBuilder @param options Object; formatting options (optional)
 * @name prefix @type string | null | undefined @description Prefix to use in user-friendly message (optional, defaults to "Validation error"). Pass undefined to disable prefix completely.
 * @name prefixSeparator @type string @description Used to concatenate prefix with rest of the user-friendly message (optional, defaults to ": "). Not used when prefix is undefined.
 * @name maxIssuesInMessage @type number @description Max issues to include in user-friendly message (optional, defaults to 99)
 * @name issueSeparator @type string @description Used to concatenate issues in user-friendly message (optional, defaults to ";")
 * @name unionSeparator @type string @description Used to concatenate union-issues in user-friendly message (optional, defaults to " or ")
 * @name includePath @type boolean @description Indicates whether to include the erroneous property key in the error message (optional, defaults to true)
 * @name forceTitleCase @type boolean @description Indicates whether to convert individual issue messages to title case (optional, defaults to true).
 *
 *@example
    import { createMessageBuilder } from 'zod-validation-error';

    const messageBuilder = createMessageBuilder({
    maxIssuesInMessage: 3,
    includePath: false,
    });
 */

/**
 * @function fromZodIssue {fromZodIssue(issue: ZodIssue, options?: FromZodIssueOptions): ValidationError;}
 * @description Converts a single ZodIssue into a ValidationError with user-friendly messages.
 * This function takes a single ZodIssue and transforms it into a ValidationError that contains human-readable error messages.
 * It preserves the original issue from the ZodIssue in the details property of the ValidationError.
 *
 * This is useful when you want to expose validation errors to end-users in a more understandable format
 */

/**
 * @function fromZodError @param {fromZodIssue(issue: ZodIssue, options?: FromZodIssueOptions): ValidationError;}
 * @description Converts zod error to ValidationError.
 * Why is the difference between ZodError and ZodIssue? A ZodError is a collection of 1 or more ZodIssue instances. It's what you get when you call zodSchema.parse().
 *
 *
 * @argument zodError - zod.ZodError; a ZodError instance (required)
 * @argument options - Object; formatting options (optional)
 * @param messageBuilder - MessageBuilder; a function that accepts an array of zod.ZodIssue objects and returns a user-friendly error message in the form of a string (optional).
 * @abstract Alternatively, you may pass @param createMessageBuilder options directly as options. These will be used as arguments to create the @param MessageBuilder instance internally.
 */

/**
 * @function fromZodError
 * @description Converts a `ZodError` (a collection of one or more issues) into a `ValidationError`.
 * A `ZodError` is what you receive from `zodSchema.parse()`. This function constructs a ValidationError
 * aggregating all issues into a single user‑friendly message, while preserving the original issues in
 * `error.details`.
 * @argument zodError - zod.ZodError; a ZodError instance (required).
 * @argument options - Object; formatting options (optional). You may supply a custom `messageBuilder` or
 * options for creating one.
 * @note You may pass createMessageBuilder options directly; they will be forwarded internally.
 */

/**
 * @function toValidationError
 * @description A curried version of `fromZodError` designed for functional programming patterns. It first
 * takes an optional options object and returns a function that converts a `ZodError` into a `ValidationError`.
 * @example
 * import * as Either from 'fp-ts/Either';
 * import { z as zod } from 'zod';
 * import { toValidationError, ValidationError } from 'zod-validation-error';
 *
 * @note create zod schema
 * const zodSchema = zod
 *   .object({
 *     id: zod.int().positive(),
 *     email: zod.email(),
 *   })
 *   .brand<'User'>();
 *
 * export type User = zod.infer<typeof zodSchema>;
 *
 * export function parse(value: zod.input<typeof zodSchema>): Either.Either<ValidationError, User> {
 *   return Either.tryCatch(() => zodSchema.parse(value), toValidationError());
 * }
 */

/**
 * @function isValidationError
 * @description A type guard utility that returns true if the given object is an instance of `ValidationError`.
 * Useful for distinguishing between ValidationError and generic Error instances.
 * @argument error - any; the error instance to test.
 * @example
 * import { z as zod } from 'zod';
 * import { ValidationError, isValidationError } from 'zod-validation-error';
 *
 * const err = new ValidationError('foobar');
 * isValidationError(err); // returns true
 *
 * const invalidErr = new Error('foobar');
 * isValidationError(invalidErr); // returns false
 */

/**
 * @function isValidationErrorLike
 * @description A heuristic type guard that detects objects that behave like a ValidationError. This is
 * necessary when multiple versions of zod-validation-error exist in the dependency tree, making a simple
 * `instanceof` check unreliable.
 * @argument error - error instance (required)
 * @example
 * import { ValidationError, isValidationErrorLike } from 'zod-validation-error';
 *
 * const err = new ValidationError('foobar');
 * isValidationErrorLike(err); // returns true
 *
 * const invalidErr = new Error('foobar');
 * isValidationErrorLike(err); // returns false
 */

/**
 * @function isZodErrorLike
 * @description A heuristic type guard that returns true if the given object appears to be a ZodError. Use
 * this when your code may receive errors originating from different versions of zod.
 * @argument error - any; the error instance to test.
 * @example
 * import { z as zod } from 'zod';
 * import { ValidationError, isZodErrorLike } from 'zod-validation-error';
 *
 * const zodValidationErr = new ValidationError('foobar');
 * isZodErrorLike(zodValidationErr); // returns false
 *
 * const genericErr = new Error('foobar');
 * isZodErrorLike(genericErr); // returns false
 *
 * const zodErr = new zod.ZodError([
 *   {
 *     origin: 'number',
 *     code: 'too_small',
 *     minimum: 0,
 *     inclusive: false,
 *     path: ['id'],
 *     message: 'Number must be greater than 0 at "id"',
 *     input: -1,
 *   },
 * ]);
 * isZodErrorLike(zodErr); // returns true
 */

/**
 * @title @param {The error param}
 * @param error 
 * @description Virtually every Zod API accepts an optional error message. z.string("Not a string!"); | This custom error will show up as the message property of any validation issues that originate from this schema.
 * @example z.string("Not a string!").parse(12);
// ❌ throws ZodError {
//   issues: [
//     {
//       expected: 'string',
//       code: 'invalid_type',
//       path: [],
//       message: 'Not a string!'   <-- 👀 custom error message
//     }
//   ]
// }

@copilot All z functions and schema methods accept custom errors.
@example @colilot
z.string("Bad!");
z.string().min(5, "Too short!");
z.uuid("Bad UUID!");
z.iso.date("Bad date!");
z.array(z.string(), "Not an array!");
z.array(z.string()).min(5, "Too few items!");
z.set(z.string(), "Bad set!");


If you prefer, you can pass a params object with an error parameter instead.
z.string({ error: "Bad!" });
z.string().min(5, { error: "Too short!" });
z.uuid({ error: "Bad UUID!" });
z.iso.date({ error: "Bad date!" });
z.array(z.string(), { error: "Bad array!" });
z.array(z.string()).min(5, { error: "Too few items!" });
z.set(z.string(), { error: "Bad set!" });

@copilot The error param optionally accepts a function. An error customization function is known as an error map in Zod terminology. The error map will run at parse time if a validation error occurs.
z.string({ error: ()=>`[${Date.now()}]: Validation failure.` });

@abstract Note — In Zod v3, there were separate params for message (a string) and errorMap (a function). These have been unified in Zod 4 as error.

 @ @copilot error map receives a context object you can use to customize the error message based on the validation issue.
 * @copilot Zod and zod-validation-error integration
 * @copilot Installed zod-validation-error
 * @copilot Generic type '$ZodFlattenedError' requires between 1 and 2 type arguments.'
 * @copilot ZodFlattenedError is depricated. Use z.core.$ZodFlattenedError
 * @copilot The .flatten() method on ZodError has also been deprecated. Instead use the top-level z.treeifyError() function
 */
