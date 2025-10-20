/**
 * Utility functions for safe URL construction and validation
 */

/**
 * Safely constructs a URL from a base URL and path
 * @param baseUrl - The base URL (e.g., 'http://localhost:8000')
 * @param path - The path to append (e.g., '/api/order-confirmation')
 * @returns A valid URL string or fallback URL
 */
export function constructUrl(baseUrl: string, path: string): string {
  try {
    // Ensure baseUrl is valid
    const validBaseUrl = validateUrl(baseUrl);
    
    // Construct the full URL
    const fullUrl = `${validBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    
    // Validate the constructed URL
    new URL(fullUrl);
    return fullUrl;
  } catch (error) {
    console.error('Error constructing URL:', error);
    // Return a safe fallback
    return `http://localhost:8000${path.startsWith('/') ? path : `/${path}`}`;
  }
}

/**
 * Validates a URL string and returns a valid URL or fallback
 * @param url - The URL to validate
 * @param fallback - Optional fallback URL (defaults to 'http://localhost:8000')
 * @returns A valid URL string
 */
export function validateUrl(url: string, fallback: string = 'http://localhost:8000'): string {
  try {
    new URL(url);
    return url;
  } catch (error) {
    console.error('Invalid URL provided, using fallback:', url, error);
    return fallback;
  }
}

/**
 * Safely parses URL search parameters from a request URL
 * @param requestUrl - The request URL string
 * @param baseUrl - Optional base URL for relative URLs
 * @returns URLSearchParams object
 */
export function parseSearchParams(requestUrl: string, baseUrl?: string): URLSearchParams {
  try {
    // Check if it's already a full URL
    if (requestUrl.startsWith('http://') || requestUrl.startsWith('https://')) {
      const url = new URL(requestUrl);
      return url.searchParams;
    }
    
    // If it's a relative URL, construct a full URL
    const fullUrl = baseUrl ? new URL(requestUrl, baseUrl).toString() : requestUrl;
    const url = new URL(fullUrl);
    return url.searchParams;
  } catch (error) {
    console.error('Error parsing URL search params:', error);
    // Fallback to basic parameter extraction
    const urlParts = requestUrl.split('?');
    return new URLSearchParams(urlParts[1] || '');
  }
}

/**
 * Gets the base URL from environment variables with validation
 * @returns A valid base URL string
 */
export function getBaseUrl(): string {
  const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
  return validateUrl(envBaseUrl);
}

/**
 * Safely constructs a redirect URL with validation
 * @param path - The path to redirect to
 * @param searchParams - Optional search parameters
 * @returns A valid redirect URL
 */
export function constructRedirectUrl(path: string, searchParams?: Record<string, string>): string {
  const baseUrl = getBaseUrl();
  let fullPath = path.startsWith('/') ? path : `/${path}`;
  
  if (searchParams) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    if (queryString) {
      fullPath += `?${queryString}`;
    }
  }
  
  return constructUrl(baseUrl, fullPath);
}
