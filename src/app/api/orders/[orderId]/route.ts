import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    
    // If orderId looks like a transaction ID, redirect to transaction-based lookup
    if (orderId.startsWith('SSL_')) {
      console.log('Order ID looks like transaction ID, redirecting to transaction lookup');
      return NextResponse.redirect(new URL(`/api/orders/by-transaction/${orderId}`, request.url));
    }
    
    // Get backend URL from environment
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    // Fetch order from backend
    const response = await fetch(`${backendUrl}/store/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = await response.json();
    return NextResponse.json(order);

  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
