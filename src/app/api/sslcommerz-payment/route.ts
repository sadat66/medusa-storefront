import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get backend URL from environment
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    // Get the publishable API key from the request headers
    const publishableKey = request.headers.get('x-publishable-api-key');
    
    // Forward request to backend
    const response = await fetch(`${backendUrl}/store/custom/sslcommerz-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Payment initialization failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('SSLCommerz payment proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
