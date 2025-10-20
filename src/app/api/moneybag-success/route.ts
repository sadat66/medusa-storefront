import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const origin = url.origin
  const tranId = url.searchParams.get('tran_id') || ''
  const status = url.searchParams.get('status') || ''

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
            <p>Transaction ID: ${tranId}</p>
            <p>Redirecting to order confirmation...</p>
        </div>
        <script>
            async function completeOrder() {
                try {
                    const urlParams = new URLSearchParams(window.location.search)
                    const tran_id = urlParams.get('tran_id')
                    const status = urlParams.get('status')

                    if (tran_id && status === 'VALID') {
                        const createOrderResponse = await fetch('${origin}/api/complete-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ cart_id: localStorage.getItem('cart_id') })
                        })

                        if (createOrderResponse.ok) {
                            const orderResult = await createOrderResponse.json()
                            if (orderResult.success && orderResult.order?.id) {
                                window.location.href = '/order/confirmation/' + orderResult.order.id
                                return
                            }
                        }
                    }
                    window.location.href = '/'
                } catch (e) {
                    window.location.href = '/'
                }
            }
            completeOrder()
        </script>
    </body>
    </html>
  `

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  })
}


