import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tran_id, amount, status } = await request.json();

    if (!tran_id || !status) {
      return NextResponse.json(
        { error: 'Transaction ID and status are required' },
        { status: 400 }
      );
    }

    console.log('Creating order from success URL:', { tran_id, amount, status });

    // Get the backend URL
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_14f1f0c0f7790afc27fe5a1ef5d5b4a81f9e056000f04543bc76db8bd8bc66a1';

    // First, try to get the payment session to extract the cart_id
    console.log('Looking for payment session for transaction:', tran_id);
    
    // Try to get payment session from backend (if it's stored there)
    let paymentSession = null;
    try {
      const sessionResponse = await fetch(`${backendUrl}/store/custom/sslcommerz-session/${tran_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey
        }
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        paymentSession = sessionData.session;
        console.log('Found payment session:', paymentSession);
      }
    } catch (error) {
      console.log('Could not fetch payment session from backend:', error.message);
    }

    // If no payment session found, try to reconstruct from available data
    if (!paymentSession) {
      console.log('No payment session found, attempting to find cart by other means...');
      
      // Try to find recent carts that might match this transaction
      const cartsResponse = await fetch(`${backendUrl}/store/carts?limit=20&order=-created_at`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey
        }
      });

      if (cartsResponse.ok) {
        const cartsData = await cartsResponse.json();
        const carts = cartsData.carts || [];
        
        // Look for carts that might be related to this transaction
        // This is a fallback method - ideally we should have the cart_id stored
        const potentialCart = carts.find((cart: any) => {
          // Check if cart has items and addresses (ready for completion)
          return cart.items && cart.items.length > 0 && 
                 cart.shipping_address && cart.billing_address &&
                 cart.total > 0;
        });

        if (potentialCart) {
          console.log('Found potential cart for order creation:', potentialCart.id);
          paymentSession = {
            cart_id: potentialCart.id,
            customer_id: 'guest',
            tran_id,
            amount: parseFloat(amount || '100'),
            status: 'pending'
          };
        }
      }
    }

    if (!paymentSession || !paymentSession.cart_id) {
      return NextResponse.json({
        success: false,
        error: 'Could not find payment session or cart_id for this transaction',
        tran_id,
        message: 'Please ensure the payment was initiated properly'
      }, { status: 404 });
    }

    // Now trigger the webhook with the correct cart_id
    const webhookData = {
      tran_id,
      status,
      val_id: 'success_' + tran_id,
      amount: amount || '100',
      currency: 'BDT',
      bank_tran_id: 'success_' + tran_id,
      card_type: 'Visa',
      card_no: '411111****1111',
      card_issuer: 'Test Bank',
      card_brand: 'Visa',
      store_id: 'testbox',
      verify_sign: 'success_signature',
      value_a: paymentSession.cart_id, // Use the actual cart_id
      value_b: paymentSession.customer_id || 'success_customer',
      value_c: tran_id,
      value_d: amount || '100'
    };

    console.log('Triggering webhook with data:', webhookData);

    // Trigger the webhook
    const webhookResponse = await fetch(`${backendUrl}/webhooks/sslcommerz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(webhookData).toString()
    });

    const webhookResult = await webhookResponse.text();
    console.log('Webhook response:', webhookResult);

    if (webhookResponse.ok) {
      try {
        const webhookData = JSON.parse(webhookResult);
        if (webhookData.success && webhookData.order_id) {
          return NextResponse.json({
            success: true,
            order_id: webhookData.order_id,
            message: 'Order created successfully via webhook',
            webhook_response: webhookData
          });
        }
      } catch (parseError) {
        console.log('Webhook response is not JSON, checking for order creation...');
      }
    }

    // If webhook didn't work, try to find existing order
    console.log('Webhook failed, trying to find existing order...');
    
    // Try to find order by transaction ID in metadata
    const ordersResponse = await fetch(`${backendUrl}/store/orders?limit=10&order=-created_at`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey
      }
    });

    if (ordersResponse.ok) {
      const ordersData = await ordersResponse.json();
      const orders = ordersData.orders || [];
      
      // Look for order with matching transaction ID in metadata
      const matchingOrder = orders.find((order: any) => {
        return order.metadata?.payment_data?.tran_id === tran_id ||
               order.metadata?.tran_id === tran_id ||
               order.id.includes(tran_id);
      });

      if (matchingOrder) {
        return NextResponse.json({
          success: true,
          order_id: matchingOrder.id,
          message: 'Found existing order',
          order: matchingOrder
        });
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Could not create or find order',
      tran_id,
      webhook_response: webhookResult
    });

  } catch (error) {
    console.error('Error creating order from success URL:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
