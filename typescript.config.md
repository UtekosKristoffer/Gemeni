## //Path: .github/typescript/copilot-typescript-breaking-changes.md

## applyTo: '\*\*'

# Typescript New Features

## No Unchecked Indexed Access -

- TypeScript has a way to describe objects which have unknown keys but known values on an object, via index signatures.

```typescript
interface EnvironmentVars {
  NAME: string
  OS: string

  // Unknown properties are covered by this index signature.
  [propName: string]: string
}

declare const env: EnvironmentVars

// Declared as existing
const sysName = env.NAME
const os = env.OS

// when hovering: const os: string

// Not declared, but because of the index signature, then it is
// considered a string
const nodeEnv = env.NODE_ENV

// when hovering: const nodeEnv: string
```

## Will add undefined to any un-declared field in the type.

```typescript
declare const env: EnvironmentVars

// Declared as existing
const sysName = env.NAME
const os = env.OS

// when hovering: const os: string

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env.NODE_ENV

// when hovering: const nodeEnv: string | undefined
```

## Exact Optional Property Types - "exactOptionalPropertyTypes": true

- With exactOptionalPropertyTypes enabled, TypeScript applies stricter rules around how it handles properties on type or interfaces which have a ? prefix.

- For example, this interface declares that there is a property which can be one of two strings: ‘dark’ or ‘light’ or it should not be in the object.

  ```javascript
  interface UserDefaults {
  // The absence of a value represents 'system'
  colorThemeOverride?: "dark" | "light";
  }
  ```

- Without this flag enabled, there are three values which you can set colorThemeOverride to be: “dark”, “light” and undefined.

- Setting the value to undefined will allow most JavaScript runtime checks for the existence to fail, which is effectively falsy. However, this isn’t quite accurate; colorThemeOverride: undefined is not the same as colorThemeOverride not being defined. For example, "colorThemeOverride" in settings would have different behavior with undefined as the key compared to not being defined.

- exactOptionalPropertyTypes makes TypeScript truly enforce the definition provided as an optional property:

  ```javascript
  const settings = getUserSettings();
  settings.colorThemeOverride = "dark";
  settings.colorThemeOverride = "light";

  // But not:
  settings.colorThemeOverride = undefined;
  //Error-message:
  "Type 'undefined' is not assignable to type '"dark" | "light"' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target."
  ```

## noUncheckedSideEffectImports - "noUncheckedSideEffectImports": true

In JavaScript it’s possible to import a module without actually importing any values from it:

    ```javascript
    import 'some-module'
    ```

- These imports (like the example above) are often called side effect imports because the only useful behavior they can provide is by executing some side effect (like registering a global variable, or adding a polyfill to a prototype).

- By default, TypeScript will not check these imports for validity. If the import resolves to a valid source file, TypeScript will load and check the file. If no source file is found, TypeScript will silently ignore the import.

- This is surprising behavior, but it partially stems from modeling patterns in the JavaScript ecosystem. For example, this syntax has also been used with special loaders in bundlers to load CSS or other assets. Your bundler might be configured in such a way where you can include specific .css files by writing something like the following:

  ```javascript
  import './button-component.css'
  export function Button() {
    // ...
  }
  ```

- Still, this masks potential typos on side effect imports.

- When --noUncheckedSideEffectImports is enabled, TypeScript will error if it can’t find a source file for a side effect import.

  ```javascript
  import 'oops-this-module-does-not-exist'
  //     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // error: Cannot find module 'oops-this-module-does-not-exist' or its corresponding
  //        type declarations.
  ```

- When enabling "noUncheckedSideEffectImports": true, some working code may now receive an error, like in the CSS example above. To work around this, users who want to just write side effect imports for assets might be better served by writing what’s called an ambient module declaration with a wildcard specifier. It would go in a global file and look something like the following:

  ```typescript
  // ./src/globals.d.ts
  // Recognize all CSS files as module imports.
  declare module '*.css' {}
  ```

## Module Detection - "moduleDetection": "force"

"auto" (default) - TypeScript will not only look for import and export statements, but it will also check whether the "type" field in a package.json is set to "module" when running with module: nodenext or node16, and check whether the current file is a JSX file when running under jsx: react-jsx.

"legacy" - The same behavior as 4.6 and prior, usings import and export statements to determine whether a file is a module.

"force" - Ensures that every non-declaration file is treated as a module.

In this project, we operate with "force".

## Core Principle: All TypeScript module imports and exports must be explicit. The code must be 100% predictable and never rely on the compiler's "magic" import elision. The governing rule is "what you see is what you get."

### Import Guidelines

- For Types-Only:
  Always use the type modifier when importing an interface, type, or any other construct that only exists for type-checking.

  Example:

  ```typescript
  import type { User, UserProps } from './types'
  ```

- For Runtime Values:
  Never use the type modifier when importing values that must exist in the final JavaScript bundle (functions, classes, variables, etc.).

  Example:

  ```typescript
  import { createUser, defaultUser } from './user-api'
  ```

- For Both Types and Values (from the same file):
  Combine imports into a single statement.
  Use the inline type modifier only on the specific imports that are types.

### Correct Usage Pattern (Golden Path)

This is the only correct way to import a mix of types and values from a single module:

    ```typescript
    // CORRECT:
    import { formatData, type DataOptions, type ApiResponse } from './data-handler'
    ```

### Module Systems

Never assume the compiler will automatically translate between ES Modules (import/export) and CommonJS (require/module.exports).

The syntax used must be correct for the project's defined module system.
