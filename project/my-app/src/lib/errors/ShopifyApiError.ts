//Path src/lib/errors.ts

import type { ShopifyErrorDetail } from '@/types'

export class ShopifyApiError extends Error {
  constructor(
    message: string,
    // Gjør 'details' valgfri i tilfelle vi ikke har noen
    public readonly details?: ShopifyErrorDetail[],
    // Legg til statuskode for rikere feilinformasjon
    public readonly statusCode?: number
  ) {
    super(message)
    this.name = 'ShopifyApiError'
  }
}
