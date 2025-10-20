"use client"

import { Container, Heading, Text, Button } from "@medusajs/ui"
import { XCircleSolid } from "@medusajs/icons"
import { useRouter, useSearchParams } from "next/navigation"

const OrderFailed: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const error = searchParams.get('error')
  const tranId = searchParams.get('tran_id')
  const status = searchParams.get('status')

  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <XCircleSolid className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <Heading level="h1" className="text-2xl font-bold text-red-600 mb-2">
            Payment Failed
          </Heading>
          <Text className="text-ui-fg-subtle">
            Unfortunately, your payment could not be processed. Please try again.
          </Text>
        </div>

        {(error || tranId || status) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 text-left">
            <Heading level="h2" className="text-lg font-semibold mb-4 text-red-800">
              Error Details
            </Heading>
            <div className="space-y-2 text-sm">
              {error && (
                <div>
                  <Text className="font-medium text-red-700">Error:</Text>
                  <Text className="text-red-600">{error}</Text>
                </div>
              )}
              {tranId && (
                <div>
                  <Text className="font-medium text-red-700">Transaction ID:</Text>
                  <Text className="text-red-600">{tranId}</Text>
                </div>
              )}
              {status && (
                <div>
                  <Text className="font-medium text-red-700">Status:</Text>
                  <Text className="text-red-600">{status}</Text>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => router.push('/checkout')}
            variant="secondary"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.push('/')}
          >
            Continue Shopping
          </Button>
        </div>

        <div className="mt-8 text-sm text-ui-fg-subtle">
          <Text>
            If you continue to experience issues, please contact our support team.
          </Text>
        </div>
      </div>
    </Container>
  )
}

export default OrderFailed
