import { NextRequest, NextResponse } from 'next/server';
import { getOrigin } from '@lib/util/get-origin';

export async function POST(request: NextRequest) {
  try {
    console.log('Order confirmation POST - request.url:', request.url);
    
    // Extract country code from the request URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    
    // For API routes, use default country code since there's no country code in the URL
    let countryCode = 'us'; // Default country code for API routes
    
    // Only try to extract country code if this is not an API route
    if (!pathSegments.includes('api')) {
      countryCode = pathSegments[1] || 'us';
    }
    
    console.log('Order confirmation POST - countryCode:', countryCode);
    
    // Simple and safe URL parameter extraction
    let searchParams;
    try {
      searchParams = url.searchParams;
    } catch (urlError) {
      console.error('URL parsing error in order confirmation POST:', urlError);
      const urlParts = request.url.split('?');
      searchParams = new URLSearchParams(urlParts[1] || '');
    }
    
    const tran_id = searchParams.get('tran_id');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status');
    
    // Also check for form data
    let formData = null;
    try {
      formData = await request.formData();
    } catch (e) {
      // Ignore form data parsing errors
    }
    
    // Extract parameters from both sources
    const finalTranId = tran_id || formData?.get('tran_id')?.toString() || 'unknown';
    const finalAmount = amount || formData?.get('amount')?.toString() || '100';
    const finalStatus = status || formData?.get('status')?.toString() || 'VALID';
    
    console.log('Order Confirmation POST:', {
      tran_id: finalTranId,
      amount: finalAmount,
      status: finalStatus,
      timestamp: new Date().toISOString()
    });
    
    // Redirect to the page with GET method (including country code)
    const orderId = finalTranId !== 'unknown' ? finalTranId : `order_${Date.now()}`;
    
    // Construct the redirect URL using the request origin with better fallback handling
    const origin = getOrigin(request);
    
    const redirectUrl = `${origin}/${countryCode}/order/confirmation/${orderId}?tran_id=${encodeURIComponent(finalTranId)}&amount=${encodeURIComponent(finalAmount)}&status=${encodeURIComponent(finalStatus)}`;
    
    console.log('Redirecting to:', redirectUrl);
    console.log('Origin:', origin, 'CountryCode:', countryCode);
    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Order confirmation POST error:', error);
    const origin = getOrigin(request);
    const errorUrl = `${origin}/us/order/failed?error=` + encodeURIComponent('Order confirmation error');
    return NextResponse.redirect(errorUrl);
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Order confirmation GET - request.url:', request.url);
    
    // Extract country code from the request URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    
    // For API routes, use default country code since there's no country code in the URL
    let countryCode = 'us'; // Default country code for API routes
    
    // Only try to extract country code if this is not an API route
    if (!pathSegments.includes('api')) {
      countryCode = pathSegments[1] || 'us';
    }
    
    console.log('Order confirmation GET - countryCode:', countryCode);
    
    // Handle GET requests by redirecting to the page with safe URL parsing
    let searchParams;
    try {
      searchParams = url.searchParams;
    } catch (urlError) {
      console.error('URL parsing error in order confirmation GET:', urlError);
      const urlParts = request.url.split('?');
      searchParams = new URLSearchParams(urlParts[1] || '');
    }
    
    const tran_id = searchParams.get('tran_id') || 'unknown';
    const amount = searchParams.get('amount') || '100';
    const status = searchParams.get('status') || 'VALID';
    
    const orderId = tran_id !== 'unknown' ? tran_id : `order_${Date.now()}`;
    
    // Construct the redirect URL using the request origin with better fallback handling
    const origin = getOrigin(request);
    
    const redirectUrl = `${origin}/${countryCode}/order/confirmation/${orderId}?tran_id=${encodeURIComponent(tran_id)}&amount=${encodeURIComponent(amount)}&status=${encodeURIComponent(status)}`;
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Order confirmation GET error:', error);
    const origin = getOrigin(request);
    const errorUrl = `${origin}/us/order/failed?error=` + encodeURIComponent('Order confirmation error');
    return NextResponse.redirect(errorUrl);
  }
}
