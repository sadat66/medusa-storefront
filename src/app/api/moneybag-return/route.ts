import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const origin = url.origin
  const transactionId = url.searchParams.get('transaction_id') || ''
  const status = url.searchParams.get('status') || ''

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Processing Payment</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>Processing your order...</h1>
            <p>Transaction ID: ${transactionId}</p>
            <p>Status: ${status}</p>
        </div>
        <script>
            async function completeOrder() {
                try {
                    const urlParams = new URLSearchParams(window.location.search)
                    const txId = urlParams.get('transaction_id')
                    const status = urlParams.get('status')

                    if (txId && (status === 'SUCCESS' || status === 'VALID')) {
                        // First verify with backend
                        const verifyResp = await fetch('${origin}/api/moneybag-verify', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-publishable-api-key': (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) || ''
                            },
                            body: JSON.stringify({ transaction_id: txId })
                        })
                        const verifyData = await verifyResp.json()
                        if (verifyResp.ok && verifyData.success) {
                            const resp = await fetch('${origin}/api/complete-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({})
                            })

                            if (resp.ok) {
                                const data = await resp.json()
                                if (data.success && data.order?.id) {
                                    window.location.href = '/order/confirmation/' + data.order.id
                                    return
                                }
                            }
                        }
                    }
                    window.location.href = '/cart'
                } catch (e) {
                    window.location.href = '/cart'
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


