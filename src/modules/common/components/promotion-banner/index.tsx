"use client"

import { Badge, Text } from "@medusajs/ui"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import React from "react"

type PromotionBannerProps = {
  promotion: HttpTypes.StorePromotion
  className?: string
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({ promotion, className }) => {
  if (!promotion || !promotion.code) {
    return null
  }

  const getDiscountText = () => {
    if (!promotion.application_method) {
      return promotion.code
    }

    const { type, value, currency_code } = promotion.application_method

    if (type === "percentage") {
      return `${value}% OFF`
    } else if (type === "fixed" && currency_code) {
      return `${convertToLocale({ amount: +value, currency_code })} OFF`
    }

    return promotion.code
  }

  return (
    <div className={`bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg shadow-lg ${className || ""}`}>
      <div className="flex items-center justify-center gap-4">
        <Badge
          color="white"
          size="large"
          className="bg-white text-red-500 font-bold text-lg px-4 py-2"
        >
          {getDiscountText()}
        </Badge>
        <div className="text-center">
          <Text className="text-white font-semibold text-lg">
            Special Offer!
          </Text>
          <Text className="text-white text-sm">
            Use code <span className="font-bold">{promotion.code}</span> at checkout
          </Text>
        </div>
      </div>
    </div>
  )
}

export default PromotionBanner
