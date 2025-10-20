import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as any
    const cart_id = body.cart_id
    const customer_id = body.customer_id

    // Get the backend URL
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_14f1f0c0f7790afc27fe5a1ef5d5b4a81f9e056000f04543bc76db8bd8bc66a1';

    // If no cart_id provided, try to read it from the cart cookie via our server utilities
    let finalCartId = cart_id
    if (!finalCartId) {
      try {
        const { getCartId } = await import("@lib/data/cookies")
        finalCartId = await (getCartId as any)()
      } catch (e) {
        // fallback: none
      }
    }

    if (!finalCartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Complete the order using Medusa's order completion workflow
    const response = await fetch(`${backendUrl}/store/carts/${finalCartId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey,
        ...(customer_id && { 'x-customer-id': customer_id })
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Order completion failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to complete order', details: errorData },
        { status: response.status }
      );
    }

    const orderData = await response.json();
    
    return NextResponse.json({
      success: true,
      order: orderData.order,
      message: 'Order completed successfully'
    });

  } catch (error) {
    console.error('Order completion error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
