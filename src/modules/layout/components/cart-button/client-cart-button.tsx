"use client"

import { useCart } from "@lib/context/cart-context"
import CartDropdown from "../cart-dropdown"

export default function ClientCartButton() {
  const { cart, isLoading } = useCart()

  if (isLoading) {
    return (
      <div className="text-sm font-medium text-blue-700">
        Cart (0)
      </div>
    )
  }

  return <CartDropdown cart={cart} />
}
