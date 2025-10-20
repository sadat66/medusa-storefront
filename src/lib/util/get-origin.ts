import { NextRequest } from 'next/server';

/**
 * Get the origin URL from a NextRequest with proper fallback handling
 * @param request - The NextRequest object
 * @returns The origin URL as a string
 */
export function getOrigin(request: NextRequest): string {
  try {
    // First try to get the origin from the request URL
    if (request.nextUrl?.origin) {
      return request.nextUrl.origin;
    }
    
    // If that fails, try to construct it from headers
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    
    if (host) {
      return `${protocol}://${host}`;
    }
    
    // Fallback to environment variable
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    
    // Final fallback
    return 'http://localhost:8000';
  } catch (error) {
    console.error('Error getting origin:', error);
    // Return a safe fallback
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
  }
}