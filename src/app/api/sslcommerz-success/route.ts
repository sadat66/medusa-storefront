import { NextRequest, NextResponse } from 'next/server';
import { getOrigin } from '@lib/util/get-origin';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  const tran_id = searchParams.get('tran_id');
  const status = searchParams.get('status');
  const val_id = searchParams.get('val_id');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');

  // Get the origin for proper URL construction
  const origin = getOrigin(request);

  // Create a simple HTML page that SSLCommerz can process
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Payment Success</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>Payment Successful!</h1>
            <p>Transaction ID: ${tran_id || 'N/A'}</p>
            <p>Status: ${status || 'N/A'}</p>
            <p>Amount: ${amount || 'N/A'} ${currency || 'BDT'}</p>
            <p>Redirecting to order confirmation...</p>
        </div>
        <script>
            // Complete the order and redirect to confirmation page
            async function completeOrder() {
                try {
                    // Extract parameters from the URL
                    const urlParams = new URLSearchParams(window.location.search);
                    const tran_id = urlParams.get('tran_id');
                    const amount = urlParams.get('amount');
                    const status = urlParams.get('status');
                    
                    console.log('Processing successful payment:', { tran_id, amount, status });
                    
                    if (tran_id && status === 'VALID') {
                        // First, try to create the order if it doesn't exist
                        console.log('Attempting to create order from success URL...');
                        
                        const createOrderResponse = await fetch('${origin}/api/create-order-from-success', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                tran_id: tran_id,
                                amount: amount,
                                status: status
                            })
                        });
                        
                        if (createOrderResponse.ok) {
                            const orderResult = await createOrderResponse.json();
                            console.log('Order creation result:', orderResult);
                            
                            if (orderResult.success && orderResult.order_id) {
                                // Redirect to order confirmation with order ID
                                window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}&order_id=' + orderResult.order_id;
                                return;
                            }
                        } else {
                            console.error('Failed to create order:', await createOrderResponse.text());
                        }
                        
                        // Try to get existing order details
                        const response = await fetch('${origin}/api/orders/by-transaction/${tran_id}', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            const orderData = await response.json();
                            if (orderData.order) {
                                // Redirect to order confirmation page
                                window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}&order_id=' + orderData.order.id;
                                return;
                            }
                        }
                    }
                    
                    // Fallback: redirect to order confirmation page
                    window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}';
                } catch (error) {
                    console.error('Error completing order:', error);
                    // Fallback redirect
                    window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}';
                }
            }
            
            // Complete order after a short delay
            setTimeout(completeOrder, 2000);
        </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(request: NextRequest) {
  // Handle POST requests from SSLCommerz
  const formData = await request.formData();
  
  const tran_id = formData.get('tran_id');
  const status = formData.get('status');
  const val_id = formData.get('val_id');
  const amount = formData.get('amount');
  const currency = formData.get('currency');

  // Get the origin for proper URL construction
  const origin = getOrigin(request);

  // Create a simple HTML page that SSLCommerz can process
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Payment Success</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>Payment Successful!</h1>
            <p>Transaction ID: ${tran_id || 'N/A'}</p>
            <p>Status: ${status || 'N/A'}</p>
            <p>Amount: ${amount || 'N/A'} ${currency || 'BDT'}</p>
            <p>Redirecting to order confirmation...</p>
        </div>
        <script>
            // Complete the order and redirect to confirmation page
            async function completeOrder() {
                try {
                    // Extract parameters from the URL
                    const urlParams = new URLSearchParams(window.location.search);
                    const tran_id = urlParams.get('tran_id');
                    const amount = urlParams.get('amount');
                    const status = urlParams.get('status');
                    
                    console.log('Processing successful payment:', { tran_id, amount, status });
                    
                    if (tran_id && status === 'VALID') {
                        // First, try to create the order if it doesn't exist
                        console.log('Attempting to create order from success URL...');
                        
                        const createOrderResponse = await fetch('${origin}/api/create-order-from-success', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                tran_id: tran_id,
                                amount: amount,
                                status: status
                            })
                        });
                        
                        if (createOrderResponse.ok) {
                            const orderResult = await createOrderResponse.json();
                            console.log('Order creation result:', orderResult);
                            
                            if (orderResult.success && orderResult.order_id) {
                                // Redirect to order confirmation with order ID
                                window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}&order_id=' + orderResult.order_id;
                                return;
                            }
                        } else {
                            console.error('Failed to create order:', await createOrderResponse.text());
                        }
                        
                        // Try to get existing order details
                        const response = await fetch('${origin}/api/orders/by-transaction/${tran_id}', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            const orderData = await response.json();
                            if (orderData.order) {
                                // Redirect to order confirmation page
                                window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}&order_id=' + orderData.order.id;
                                return;
                            }
                        }
                    }
                    
                    // Fallback: redirect to order confirmation page
                    window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}';
                } catch (error) {
                    console.error('Error completing order:', error);
                    // Fallback redirect
                    window.location.href = '${origin}/api/order-confirmation?tran_id=${tran_id || ''}&amount=${amount || ''}&status=${status || 'VALID'}';
                }
            }
            
            // Complete order after a short delay
            setTimeout(completeOrder, 2000);
        </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
