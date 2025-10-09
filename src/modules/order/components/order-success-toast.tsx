"use client"

import { useEffect } from "react"
import toast from "react-hot-toast"

type OrderSuccessToastProps = {
  orderId: string
}

export default function OrderSuccessToast({ orderId }: OrderSuccessToastProps) {
  useEffect(() => {
    // Show success toast when component mounts (order completion page loads)
    toast.success(
      `🎉 Order #${orderId} placed successfully! Thank you for your purchase.`,
      {
        duration: 5000,
        icon: '✅',
        style: {
          background: '#10b981',
          color: '#fff',
        },
      }
    )
  }, [orderId])

  return null // This component doesn't render anything
}


