"use server"

import { transporter } from './config'
import { generateOrderConfirmationHTML, generateOrderConfirmationText } from './templates/order-confirmation'
import { HttpTypes } from '@medusajs/types'

interface SendOrderConfirmationEmailProps {
  order: HttpTypes.StoreOrder
  customerEmail: string
  customerName: string
}

export async function sendOrderConfirmationEmail({
  order,
  customerEmail,
  customerName,
}: SendOrderConfirmationEmailProps) {
  try {
    // Format order items
    const orderItems = order.items?.map(item => ({
      title: item.title || 'Product',
      quantity: item.quantity,
      price: formatPrice(item.unit_price, order.currency_code),
      imageUrl: item.thumbnail || item.variant?.product?.images?.[0]?.url,
    })) || []

    // Format order total
    const orderTotal = formatPrice(order.total, order.currency_code)

    // Format shipping address
    const shippingAddress = {
      first_name: order.shipping_address?.first_name || '',
      last_name: order.shipping_address?.last_name || '',
      address_1: order.shipping_address?.address_1 || '',
      city: order.shipping_address?.city || '',
      postal_code: order.shipping_address?.postal_code || '',
      country_code: order.shipping_address?.country_code || '',
    }

    // Generate email content
    const htmlContent = generateOrderConfirmationHTML({
      order,
      customerName,
      orderTotal,
      orderItems,
      shippingAddress,
    })

    const textContent = generateOrderConfirmationText({
      order,
      customerName,
      orderTotal,
      orderItems,
      shippingAddress,
    })

    // Send email
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@yourstore.com',
      to: customerEmail,
      subject: `Order Confirmation - ${order.display_id}`,
      text: textContent,
      html: htmlContent,
    })

    console.log('Order confirmation email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Failed to send order confirmation email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Helper function to format prices
function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(amount) // Remove division by 100 since amounts are already in correct format
}
