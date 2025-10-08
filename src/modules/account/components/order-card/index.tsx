import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import OrderItemImage from "../order-item-image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { formatOrderStatus } from "@lib/util/order-status"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col gap-4" data-testid="order-card">
      {/* Order Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-blue-900">
            Order #{order.display_id}
          </h3>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {formatOrderStatus(order.fulfillment_status || order.status)}
          </span>
        </div>
        <div className="flex items-center divide-x divide-gray-200 text-sm text-gray-600">
          <span className="pr-3" data-testid="order-created-at">
            {new Date(order.created_at).toLocaleDateString()}
          </span>
          <span className="px-3 font-semibold text-gray-900" data-testid="order-amount">
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </span>
          <span className="pl-3">{`${numberOfLines} ${
            numberOfLines > 1 ? "items" : "item"
          }`}</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="grid grid-cols-2 small:grid-cols-4 gap-3">
        {order.items?.slice(0, 4).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <div className="relative w-full h-20 small:h-24">
                <OrderItemImage 
                  thumbnail={i.thumbnail} 
                  images={i.variant?.product?.images || []}
                  data-testid="order-item-image"
                />
              </div>
              <div className="text-xs small:text-sm">
                <span
                  className="text-gray-900 font-medium block truncate"
                  data-testid="item-title"
                  title={i.title}
                >
                  {i.title}
                </span>
                <span className="text-gray-600">
                  Qty: <span data-testid="item-quantity">{i.quantity}</span>
                </span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="relative w-full h-20 small:h-24 bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg flex flex-col items-center justify-center">
            <span className="text-sm small:text-lg font-semibold text-blue-600">
              +{numberOfProducts - 4}
            </span>
            <span className="text-xs small:text-sm text-blue-600">more</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-2">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button 
            data-testid="order-details-link" 
            variant="secondary"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
          >
            View Details
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
