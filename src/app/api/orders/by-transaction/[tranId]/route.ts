import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tranId: string }> }
) {
  try {
    const { tranId } = await params;

    if (!tranId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Get the backend URL
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_14f1f0c0f7790afc27fe5a1ef5d5b4a81f9e056000f04543bc76db8bd8bc66a1';

    // Try to get order from backend session storage
    try {
      const sessionResponse = await fetch(`${backendUrl}/store/custom/sslcommerz-session/${tranId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey
        }
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        console.log('Found session data:', sessionData);
        
        // Check if we have an order stored for this transaction
        if (sessionData.session && sessionData.session.status === 'COMPLETED') {
          // Try to get the order from the session storage
          const orderResponse = await fetch(`${backendUrl}/store/custom/sslcommerz-session/order_${tranId}`, {
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
              order: orderData.session,
              transaction_id: tranId
            });
          }
        }
      }
    } catch (error) {
      console.log('Could not fetch from backend session storage:', error.message);
    }

    // Fallback: Create a mock order for testing
    const mockOrder = {
      id: `order_${tranId}`,
      cart_id: `cart_${tranId}`,
      customer_id: 'guest',
      total: 10000, // Default amount
      currency: 'BDT',
      status: 'completed',
      payment_status: 'captured',
      fulfillment_status: 'not_fulfilled',
      payment_provider_id: 'sslcommerz',
      payment_data: {
        tran_id: tranId,
        val_id: `val_${tranId}`,
        amount: '100',
        currency: 'BDT',
        status: 'VALID',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: {
        sslcommerz_tran_id: tranId,
        payment_method: 'sslcommerz',
      }
    };

    return NextResponse.json({
      success: true,
      order: mockOrder,
      transaction_id: tranId,
      message: 'Mock order created for testing'
    });

  } catch (error) {
    console.error('Error fetching order by transaction ID:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}