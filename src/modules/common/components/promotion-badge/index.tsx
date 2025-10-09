"use client"

import { Badge } from "@medusajs/ui"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import React from "react"

type PromotionBadgeProps = {
  promotion: HttpTypes.StorePromotion
  className?: string
}

const PromotionBadge: React.FC<PromotionBadgeProps> = ({ promotion, className }) => {
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
    <div className={`absolute top-2 left-2 z-10 ${className || ""}`}>
      <Badge
        color="red"
        size="small"
        className="bg-red-500 text-white font-semibold shadow-lg"
      >
        {getDiscountText()}
      </Badge>
    </div>
  )
}

export default PromotionBadge
