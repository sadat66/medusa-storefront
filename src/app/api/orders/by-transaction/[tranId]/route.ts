import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { tranId: string } }
) {
  try {
    const { tranId } = params;

    if (!tranId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Get the backend URL
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_14f1f0c0f7790afc27fe5a1ef5d5b4a81f9e056000f04543bc76db8bd8bc66a1';

    // Try to find order by transaction ID in metadata
    // First, let's check if we have the order in our global sessions
    if (typeof global !== 'undefined' && global.sslcommerz_sessions) {
      const sessionData = global.sslcommerz_sessions[`order_${tranId}`];
      if (sessionData && sessionData.order_id) {
        // Fetch the order details from Medusa
        const orderResponse = await fetch(`${backendUrl}/store/orders/${sessionData.order_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-publishable-api-key': publishableKey
          }
        });

        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          return NextResponse.json({
            success: true,
            order: orderData.order,
            transaction_id: tranId
          });
        }
      }
    }

    // If not found in sessions, try to search orders by metadata
    // This is a fallback approach - in a real implementation, you might want to
    // store transaction IDs in a more searchable way
    return NextResponse.json({
      success: false,
      error: 'Order not found for transaction ID',
      transaction_id: tranId
    });

  } catch (error) {
    console.error('Error fetching order by transaction ID:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}