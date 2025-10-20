import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const publishableKey = request.headers.get('x-publishable-api-key') || ''

    const resp = await fetch(`${backendUrl}/store/custom/moneybag-verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey,
      },
      body: JSON.stringify(body),
    })

    const data = await resp.json()
    return NextResponse.json(data, { status: resp.status })
  } catch (e: any) {
    return NextResponse.json({ error: 'internal_error', message: e?.message || '' }, { status: 500 })
  }
}



