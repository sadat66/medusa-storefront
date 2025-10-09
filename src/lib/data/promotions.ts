"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions, getCacheTag } from "./cookies"
import { revalidateTag } from "next/cache"

/**
 * Retrieves active promotions
 * @returns Array of active promotions
 */
export async function getActivePromotions() {
  const headers = {
    // Add any required headers here
  }

  const next = {
    ...(await getCacheOptions("promotions")),
  }

  try {
    const response = await sdk.client.fetch<{
      promotions: HttpTypes.StorePromotion[]
    }>("/store/promotions", {
      method: "GET",
      headers,
      next,
      cache: "force-cache",
    })

    return response.promotions || []
  } catch (error) {
    console.error("Failed to fetch promotions:", error)
    return []
  }
}

/**
 * Retrieves a specific promotion by code
 * @param code - The promotion code
 * @returns The promotion if found, null otherwise
 */
export async function getPromotionByCode(code: string) {
  const promotions = await getActivePromotions()
  return promotions.find(p => p.code === code) || null
}

/**
 * Determines if a promotion should be shown on a specific product
 * For now, we'll show promotions on products that meet certain criteria
 * @param product - The product to check
 * @param promotion - The promotion to check
 * @returns Whether the promotion should be displayed
 */
export async function shouldShowPromotionOnProduct(
  product: HttpTypes.StoreProduct, 
  promotion: HttpTypes.StorePromotion
): Promise<boolean> {
  // For demonstration, we'll show promotions on products with certain characteristics
  // You can customize this logic based on your business rules
  
  // Show on products with "laptop" in the title (case insensitive)
  if (product.title?.toLowerCase().includes('laptop')) {
    return true
  }
  
  // Show on products with specific tags
  if (product.tags?.some(tag => 
    tag.value?.toLowerCase().includes('sale') || 
    tag.value?.toLowerCase().includes('discount')
  )) {
    return true
  }
  
  // Show on products in specific categories
  if (product.categories?.some(category => 
    category.name?.toLowerCase().includes('electronics') ||
    category.name?.toLowerCase().includes('computers')
  )) {
    return true
  }
  
  // Default: show on all products for now
  return true
}
