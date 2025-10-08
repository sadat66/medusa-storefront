"use client"

import { retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface CartContextType {
  cart: HttpTypes.StoreCart | null
  isLoading: boolean
  refreshCart: () => Promise<void>
  setCart: (cart: HttpTypes.StoreCart | null) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children, initialCart }: { children: ReactNode; initialCart?: HttpTypes.StoreCart | null }) {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(initialCart || null)
  const [isLoading, setIsLoading] = useState(false)

  const refreshCart = async () => {
    setIsLoading(true)
    try {
      const cartData = await retrieveCart()
      setCart(cartData)
    } catch (error) {
      console.error("Failed to refresh cart:", error)
      setCart(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Update cart when initialCart changes (from server-side props)
  useEffect(() => {
    if (initialCart !== undefined) {
      setCart(initialCart)
    }
  }, [initialCart])

  return (
    <CartContext.Provider value={{ cart, isLoading, refreshCart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// Optional hook for components that might not always have cart context
export function useCartOptional() {
  const context = useContext(CartContext)
  return context || { cart: null, isLoading: false, refreshCart: async () => {}, setCart: () => {} }
}
