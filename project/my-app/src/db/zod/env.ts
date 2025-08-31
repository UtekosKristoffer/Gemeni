import { z } from 'zod'

const envSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.url({ message: 'Invalid Shopify store domain URL' }),
  SHOPIFY_STOREFRONT_API_VERSION: z.string().min(1),
  SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN: z.string().min(1)
})

const parsedEnv = envSchema.safeParse({
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION ?? '2025-07',
  SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN
})

if (!parsedEnv.success) {
  const flattenedErrors = z.flattenError(parsedEnv.error)
  console.error('❌ Invalid environment variables:', flattenedErrors.fieldErrors)
  throw new Error('Invalid environment variables. Check the console for details.')
}

export const env = parsedEnv.data
