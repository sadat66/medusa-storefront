import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    
    // Get backend URL from environment
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    // Forward webhook to backend
    const response = await fetch(`${backendUrl}/webhooks/sslcommerz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const data = await response.text();

    if (!response.ok) {
      console.error('SSLCommerz webhook proxy error:', data);
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: response.status }
      );
    }

    // Return the response from backend
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('SSLCommerz webhook proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
