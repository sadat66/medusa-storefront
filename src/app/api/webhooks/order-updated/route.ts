import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getCacheTag } from '@lib/data/cookies'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature if needed (recommended for production)
    const body = await request.json()
    
    // Extract order ID from the webhook payload
    const orderId = body.data?.id || body.id
    
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID not found' }, { status: 400 })
    }

    // Invalidate the orders cache
    const orderCacheTag = await getCacheTag("orders")
    if (orderCacheTag) {
      revalidateTag(orderCacheTag)
    }

    console.log(`Order cache invalidated for order: ${orderId}`)
    
    return NextResponse.json({ 
      success: true, 
      message: `Cache invalidated for order ${orderId}` 
    })
    
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
