"use client"

import { useState } from "react"
import { Button, Text, clx } from "@medusajs/ui"
import { RadioGroupOption, Radio } from "@headlessui/react"
import { CreditCard } from "@medusajs/icons"

type SSLCommerzPaymentProps = {
  cart: any
  customer: any
  onPaymentInitiated?: (gatewayUrl: string) => void
  onError?: (error: string) => void
  disabled?: boolean
  selectedPaymentOptionId?: string
  paymentProviderId?: string
}

const MoneybagPayment: React.FC<SSLCommerzPaymentProps> = ({
  cart,
  customer,
  onPaymentInitiated,
  onError,
  disabled = false,
  selectedPaymentOptionId,
  paymentProviderId = "moneybag"
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleMoneybagPayment = async () => {
    if (!cart || !cart.shipping_address || !cart.billing_address) {
      onError?.("Please complete shipping and billing information first")
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/moneybag-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        },
        body: JSON.stringify({
          cart_id: cart.id,
          customer_id: customer?.id || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed')
      }

      if (data.success && data.gateway_url) {
        // Redirect to Moneybag gateway
        window.location.href = data.gateway_url
        onPaymentInitiated?.(data.gateway_url)
      } else {
        throw new Error('Invalid response from payment gateway')
      }

    } catch (error) {
      console.error('Moneybag payment error:', error)
      onError?.(error instanceof Error ? error.message : 'Payment initialization failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RadioGroupOption
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "flex flex-col gap-y-2 text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
        {
          "border-ui-border-interactive": selectedPaymentOptionId === paymentProviderId,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Radio checked={selectedPaymentOptionId === paymentProviderId} />
          <Text className="text-base-regular">Moneybag</Text>
        </div>
        <span className="justify-self-end text-ui-fg-base">
          <CreditCard className="h-6 w-6" />
        </span>
      </div>
      
      {selectedPaymentOptionId === paymentProviderId && (
        <div className="mt-4">
          <Text className="text-small-regular text-ui-fg-subtle mb-4">Pay securely with Moneybag. You will be redirected to their secure payment gateway.</Text>
          
          <Button
            onClick={handleMoneybagPayment}
            disabled={isLoading || disabled}
            size="large"
            className="w-full"
          >
            {isLoading ? "Processing..." : "Pay with Moneybag"}
          </Button>
        </div>
      )}
    </RadioGroupOption>
  )
}

export default MoneybagPayment
