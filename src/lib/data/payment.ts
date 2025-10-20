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
      // Add Moneybag as a custom payment method
      const moneybagProvider = {
        id: "moneybag",
        is_enabled: true,
        is_installed: true,
        regions: [{ id: regionId }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        version: 1,
      }

      const allProviders = [...payment_providers, moneybagProvider]
      
      return allProviders.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
    })
    .catch(() => {
      // Even if Medusa providers fail, return Moneybag
      return [{
        id: "moneybag",
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
