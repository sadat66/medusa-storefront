"use client"

import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        {orders.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-6 bg-blue-50 rounded-lg p-8 text-center"
      data-testid="no-orders-container"
    >
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-2xl">📦</span>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-blue-900 mb-2">No orders yet</h2>
        <p className="text-gray-600">
          You don&apos;t have any orders yet, let us change that {":)"}
        </p>
      </div>
      <div>
        <LocalizedClientLink href="/" passHref>
          <Button 
            data-testid="continue-shopping-button"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
