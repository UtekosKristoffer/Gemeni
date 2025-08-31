// Path: src/hooks/useSet.ts
'use client'

import { useState, useMemo } from 'react'

/**
 * A custom React hook to manage a Set data structure within a React component's state.
 * It provides memoized actions to manipulate the set, triggering re-renders only when needed.
 *
 * @template T - The generic type of the values in the Set.
 * @param {Iterable<T>} [initialValues] - Optional initial values for the set.
 * @returns An object containing the current Set and memoized action functions.
 */
export function useSet<T>(initialValues?: Iterable<T>) {
  const [set, setSet] = useState(new Set(initialValues))

  // The actions are memoized to ensure they have stable references across renders,
  // preventing unnecessary re-renders in child components.
  const actions = useMemo(
    () => ({
      add: (value: T) => {
        setSet(prevSet => {
          // Create a new Set to ensure immutability and trigger a re-render.
          const newSet = new Set(prevSet)
          newSet.add(value)
          return newSet
        })
      },
      remove: (value: T) => {
        setSet(prevSet => {
          const newSet = new Set(prevSet)
          newSet.delete(value)
          return newSet
        })
      },
      clear: () => {
        setSet(new Set())
      },
      has: (value: T) => set.has(value)
    }),
    [set] // The `set` dependency is technically not needed here but is good practice.
  )

  return { set, ...actions }
}
