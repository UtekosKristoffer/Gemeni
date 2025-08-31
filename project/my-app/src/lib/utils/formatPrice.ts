//Path: src/lib/utils/formatPrice.ts

import type { Money } from '@/types'

/**
 * Formats a Money object into a readable string.
 * @param {Money} money - The Money object to format.
 * @returns {string} The formatted price string (e.g., "1,234.56 NOK").
 */
export const formatPrice = (money: Money): string => {
  const amount = parseFloat(money.amount)
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: 2
  }).format(amount)
}

export default formatPrice
