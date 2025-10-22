"use server"
import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"

export async function resetOnboardingState(orderId: string) {
  try {
    const cookies = await nextCookies()
    cookies.set("_medusa_onboarding", "false", { maxAge: -1 })
    
    // Use environment variable for admin URL with fallback
    const adminUrl = process.env.MEDUSA_ADMIN_URL || 'http://localhost:9000'
    const redirectUrl = `${adminUrl}/a/orders/${orderId}`
    
    // Validate the URL before redirecting
    new URL(redirectUrl)
    redirect(redirectUrl)
  } catch (error) {
    console.error('Error in resetOnboardingState:', error)
    // Fallback redirect to a safe URL
    redirect('/')
  }
}
