/**
 * @file src/lib/utils/safeJsonParse.ts
 * @module utils/safeJsonParse
 * @function safeJsonParse
 * @description Safely parses a JSON string, returning a fallback value if parsing fails
 */

export function safeJsonParse<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString) return fallback
  try {
    return JSON.parse(jsonString) as T
  } catch {
    return fallback
  }
}

export default safeJsonParse
