import z from 'zod'
import type { Money, Image, MetaobjectReference } from '@/types'
/**
 * @module types/products
 * @description This module contains TypeScript types related to products, including product details,
 * variants, and responses from product queries. These types help ensure type safety and consistency
 * when working with product data throughout the application.
 */

export type Product = {
  id: string
  title: string
  availableForSale: boolean
  handle: string
  descriptionHtml: string
  featuredImage: {
    altText: string | null
    url: string
    id: string
  }
  price: Money
  metafield?: MetaobjectReference
}

export type ProductsQueryResponse = {
  id: string
  title: string
  availableForSale: boolean
  handle: string
  descriptionHtml: string
  featuredImage: {
    url: string
    id: string
  }
  selectedOrFirstAvailableVariant: SelectedOrFirstAvailableVariant
}

export type ProductVariant = {
  id: string
  title: string
  image: Image | null
  price: Money
}

export type SelectedOrFirstAvailableVariant = {
  id: string
  title: string
  price: {
    amount: Money
    currencyCode: string
  }
  selectedOptions: {
    name: string
    value: string
  }
  compareAtPrice: {
    amount: Money
    currencyCode: string
  }
  metafield?: MetaobjectReference | null
}

export const ShopifyProductVariant = z.object({ id: z.number().min(5), quantity: z.number().min(1) }).brand<'ShopifyProductVariant'>()
type ShopifyProductVariant = z.infer<typeof ShopifyProductVariant>
// src/lib/types.ts eller src/lib/errors.ts
