// Path: src/hooks/usePrevious.ts

'use client'

import { useEffect, useRef } from 'react'

/**
 * A custom React hook to track the previous value of a state or prop.
 * This is useful for comparing the current value with the previous one,
 * for example, to trigger actions or effects based on changes.
 *
 * @template T - The generic type of the value being tracked.
 * @param {T} value - The current value to track.
 * @returns {T | undefined} The value from the previous render. Returns `undefined` on the initial render.
 */
export function usePrevious<T>(value: T): T | undefined {
  // Use a ref to store the value between renders.
  const ref = useRef<T>()

  // The useEffect hook runs *after* the render is committed to the screen.
  // This ensures we are always storing the value from the *completed* render.
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if the value changes.

  // Return the value from the *previous* render (before the effect ran).
  return ref.current
}