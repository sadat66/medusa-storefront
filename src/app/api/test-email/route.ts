import { testOrderConfirmationEmail } from '@lib/email/test-email'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await testOrderConfirmationEmail()
    
    if (result.success) {
      return NextResponse.json({ 
        message: 'Test email sent successfully!', 
        messageId: result.messageId 
      })
    } else {
      return NextResponse.json({ 
        error: 'Failed to send test email', 
        details: result.error 
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
