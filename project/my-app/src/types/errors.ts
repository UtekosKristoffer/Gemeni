export type ShopifyErrorDetail = {
  message: string
  locations?: { line: number; column: number }[]
  path?: (string | number)[]
  extensions?: Record<string, unknown> // Bruker Record<string, unknown> for fleksibilitet
}
// export type ShopifyErrorResponse = {
// errors: ShopifyErrorDetail[]
// }
/**
 * Representerer strukturen til et enkelt feilobjekt
 * slik det er definert i GraphQL-spesifikasjonen.
 */
export type GraphQLErrorLocation = {
  line: number
  column: number
}

export type GraphQLError = {
  message: string
  locations?: GraphQLErrorLocation[]
  path?: (string | number)[]
  extensions?: Record<string, unknown> // Type-safe alternativ til 'any'
}

/**
 * Representerer en feilrespons fra en GraphQL-tjeneste.
 * Inneholder en liste over feilobjekter og eventuelle
 * tilleggsegenskaper som kan være tilstede.
 */
export type GraphQLErrorResponse = {
  errors: GraphQLError[]
  data?: Record<string, unknown> // Valgfri datafelt
  extensions?: Record<string, unknown> // Valgfri tilleggsegenskaper
}
