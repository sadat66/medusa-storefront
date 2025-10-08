"use server"

import { sendOrderConfirmationEmail } from './service'
import { HttpTypes } from '@medusajs/types'

// Test function to send a sample order confirmation email
export async function testOrderConfirmationEmail() {
  // Mock order data for testing
  const mockOrder: HttpTypes.StoreOrder = {
    id: 'order_test_123',
    display_id: 1001,
    status: 'pending',
    email: 'test@example.com',
    currency_code: 'usd',
    total: 2999, // $29.99 in cents
    created_at: new Date().toISOString(),
    items: [
      {
        id: 'item_1',
        title: 'Test Product 1',
        quantity: 2,
        unit_price: 1499, // $14.99 in cents
        thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        variant: {
          product: {
            images: [
              { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' }
            ]
          }
        }
      },
      {
        id: 'item_2', 
        title: 'Test Product 2',
        quantity: 1,
        unit_price: 1999, // $19.99 in cents
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        variant: {
          product: {
            images: [
              { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' }
            ]
          }
        }
      },
    ],
    shipping_address: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '123 Main St',
      city: 'New York',
      postal_code: '10001',
      country_code: 'us',
    },
  } as HttpTypes.StoreOrder

  try {
    const result = await sendOrderConfirmationEmail({
      order: mockOrder,
      customerEmail: 'test@example.com',
      customerName: 'John Doe',
    })

    console.log('Test email result:', result)
    return result
  } catch (error) {
    console.error('Test email failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
