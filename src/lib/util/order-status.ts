/**
 * Formats order status for display in the frontend
 * Shows "PENDING" instead of "NOT FULFILLED" for better UX
 */
export function formatOrderStatus(status: string | undefined | null): string {
  if (!status) return 'PENDING'
  
  const normalizedStatus = status.toLowerCase()
  
  // Map not_fulfilled and pending to PENDING for better UX
  if (normalizedStatus === 'not_fulfilled' || normalizedStatus === 'pending') {
    return 'PENDING'
  }
  
  // Format other statuses by replacing underscores and capitalizing
  return status.replace('_', ' ').toUpperCase()
}

/**
 * Formats order status for display in emails (title case)
 */
export function formatOrderStatusForEmail(status: string | undefined | null): string {
  if (!status) return 'Pending'
  
  const normalizedStatus = status.toLowerCase()
  
  // Map not_fulfilled and pending to Pending for better UX
  if (normalizedStatus === 'not_fulfilled' || normalizedStatus === 'pending') {
    return 'Pending'
  }
  
  // Format other statuses by replacing underscores and capitalizing first letter
  const formatted = status.split("_").join(" ")
  return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
}
