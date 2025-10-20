"use client"

import { useEffect, useState } from "react"
import { Container, Heading, Text, Button } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"
import { useRouter, useSearchParams } from "next/navigation"

type OrderConfirmationProps = {
  orderId: string
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  // Safely get URL parameters
  let searchParams;
  try {
    searchParams = useSearchParams()
  } catch (error) {
    console.error('Error getting search params:', error)
    searchParams = null
  }
  
  // Get URL parameters safely
  const tranId = searchParams?.get('tran_id') || null
  const amount = searchParams?.get('amount') || null
  const status = searchParams?.get('status') || null
  const debug = searchParams?.get('debug') || null

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // First try to fetch by order ID
        let response = await fetch(`/api/orders/${orderId}`)
        
        // If that fails and orderId looks like a transaction ID, try by transaction ID
        if (!response.ok && orderId.startsWith('SSL_')) {
          console.log('Order ID looks like transaction ID, trying by transaction...')
          response = await fetch(`/api/orders/by-transaction/${orderId}`)
        }
        
        if (response.ok) {
          const orderData = await response.json()
          setOrder(orderData)
        } else {
          console.error('Failed to fetch order:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  // Add a small delay to ensure URL parameters are available
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <Text>Loading order details...</Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <CheckCircleSolid className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <Heading level="h1" className="text-2xl font-bold text-green-600 mb-2">
            Payment Successful!
          </Heading>
          <Text className="text-ui-fg-subtle">
            Thank you for your order. Your payment has been processed successfully.
          </Text>
        </div>

        <div className="bg-ui-bg-subtle rounded-lg p-6 mb-6 text-left">
          <Heading level="h2" className="text-lg font-semibold mb-4">
            Payment Details
          </Heading>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Text className="font-medium">Order ID:</Text>
              <Text>{orderId}</Text>
            </div>
            {tranId && tranId !== 'null' && tranId !== 'unknown' && (
              <div className="flex justify-between">
                <Text className="font-medium">Transaction ID:</Text>
                <Text className="font-mono text-sm">{tranId}</Text>
              </div>
            )}
            <div className="flex justify-between">
              <Text className="font-medium">Total Amount:</Text>
              <Text className="text-lg font-bold text-green-600">
                {amount && amount !== 'null' && amount !== 'unknown' 
                  ? `৳${amount}` 
                  : order 
                    ? `৳${order.total / 100}` 
                    : '৳100'
                }
              </Text>
            </div>
            <div className="flex justify-between">
              <Text className="font-medium">Status:</Text>
              <Text className="text-green-600 font-medium">
                {status && status !== 'null' && status !== 'unknown' ? status : 'Completed'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text className="font-medium">Payment Method:</Text>
              <Text>SSLCommerz</Text>
            </div>
            <div className="flex justify-between">
              <Text className="font-medium">Currency:</Text>
              <Text>BDT (Bangladeshi Taka)</Text>
            </div>
            {debug && (
              <div className="mt-4 p-3 bg-yellow-100 rounded text-sm">
                <Text className="font-medium text-yellow-800">Debug Info:</Text>
                <Text className="text-yellow-700">Method: {searchParams.get('method')}</Text>
                <Text className="text-yellow-700">URL: {searchParams.get('url')}</Text>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => {
              try {
                router.push('/')
              } catch (error) {
                console.error('Router push error:', error)
                window.location.href = '/'
              }
            }}
            variant="secondary"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => {
              try {
                router.push('/account')
              } catch (error) {
                console.error('Router push error:', error)
                window.location.href = '/account'
              }
            }}
          >
            View Orders
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default OrderConfirmation
