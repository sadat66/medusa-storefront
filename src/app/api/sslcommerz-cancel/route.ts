import { NextRequest, NextResponse } from 'next/server';
import { getOrigin } from '@lib/util/get-origin';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  const tran_id = searchParams.get('tran_id');
  const status = searchParams.get('status');

  // Get the origin for proper URL construction
  const origin = getOrigin(request);

  // Create a simple HTML page for cancelled payment
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Payment Cancelled</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1 style="color: orange;">Payment Cancelled</h1>
            <p>Transaction ID: ${tran_id || 'N/A'}</p>
            <p>Status: ${status || 'N/A'}</p>
            <p>You cancelled the payment process.</p>
            <p>Redirecting to home page...</p>
        </div>
        <script>
            // Redirect to home page after a short delay
            setTimeout(function() {
                window.location.href = '${origin}/';
            }, 3000);
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

  // Get the origin for proper URL construction
  const origin = getOrigin(request);

  // Create a simple HTML page for cancelled payment
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Payment Cancelled</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1 style="color: orange;">Payment Cancelled</h1>
            <p>Transaction ID: ${tran_id || 'N/A'}</p>
            <p>Status: ${status || 'N/A'}</p>
            <p>You cancelled the payment process.</p>
            <p>Redirecting to home page...</p>
        </div>
        <script>
            // Redirect to home page after a short delay
            setTimeout(function() {
                window.location.href = '${origin}/';
            }, 3000);
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