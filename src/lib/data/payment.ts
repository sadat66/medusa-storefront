"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("payment_providers")),
  }

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: "GET",
        query: { region_id: regionId },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ payment_providers }) => {
      // Add SSLCommerz as a custom payment method
      const sslcommerzProvider = {
        id: "sslcommerz",
        is_enabled: true,
        is_installed: true,
        regions: [{ id: regionId }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        version: 1,
      }

      const allProviders = [...payment_providers, sslcommerzProvider]
      
      return allProviders.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
    })
    .catch(() => {
      // Even if Medusa providers fail, return SSLCommerz
      return [{
        id: "sslcommerz",
        is_enabled: true,
        is_installed: true,
        regions: [{ id: regionId }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        version: 1,
      }]
    })
}
