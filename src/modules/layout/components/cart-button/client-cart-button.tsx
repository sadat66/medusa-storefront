"use client"

import { useState, useEffect } from "react"
import { retrieveCart } from "@lib/data/cart"
import CartDropdown from "../cart-dropdown"
import { HttpTypes } from "@medusajs/types"

export default function ClientCartButton() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await retrieveCart()
        setCart(cartData)
      } catch (error) {
        console.error("Failed to fetch cart:", error)
        setCart(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [])

  if (isLoading) {
    return (
      <div className="text-sm font-medium text-blue-700">
        Cart (0)
      </div>
    )
  }

  return <CartDropdown cart={cart} />
}
