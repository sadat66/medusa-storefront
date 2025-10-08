import { HttpTypes } from '@medusajs/types'

interface OrderConfirmationEmailProps {
  order: HttpTypes.StoreOrder
  customerName: string
  orderTotal: string
  orderItems: Array<{
    title: string
    quantity: number
    price: string
  }>
  shippingAddress: {
    first_name: string
    last_name: string
    address_1: string
    city: string
    postal_code: string
    country_code: string
  }
}

export const generateOrderConfirmationHTML = ({
  order,
  customerName,
  orderTotal,
  orderItems,
  shippingAddress,
}: OrderConfirmationEmailProps) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - ${order.display_id}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        .order-id {
            font-size: 18px;
            color: #6b7280;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
        }
        .order-details {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .order-items {
            margin: 20px 0;
        }
        .item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .item:last-child {
            border-bottom: none;
        }
        .item-name {
            font-weight: 500;
        }
        .item-quantity {
            color: #6b7280;
        }
        .total {
            font-size: 20px;
            font-weight: bold;
            text-align: right;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
        }
        .shipping-info {
            background-color: #f0f9ff;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .shipping-info h3 {
            margin-top: 0;
            color: #1e40af;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6b7280;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Your Store</div>
            <div class="order-id">Order #${order.display_id}</div>
        </div>
        
        <div class="greeting">
            Hi ${customerName},
        </div>
        
        <p>Thank you for your order! We're excited to let you know that we've received your order and are preparing it for shipment.</p>
        
        <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order.display_id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${order.status}</p>
        </div>
        
        <div class="order-items">
            <h3>Items Ordered</h3>
            ${orderItems.map(item => `
                <div class="item">
                    <div>
                        <div class="item-name">${item.title}</div>
                        <div class="item-quantity">Quantity: ${item.quantity}</div>
                    </div>
                    <div>${item.price}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="total">
            Total: ${orderTotal}
        </div>
        
        <div class="shipping-info">
            <h3>Shipping Address</h3>
            <p>
                ${shippingAddress.first_name} ${shippingAddress.last_name}<br>
                ${shippingAddress.address_1}<br>
                ${shippingAddress.city}, ${shippingAddress.postal_code}<br>
                ${shippingAddress.country_code.toUpperCase()}
            </p>
        </div>
        
        <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000'}/order/${order.id}/confirmed" class="cta-button">
                View Order Details
            </a>
        </div>
        
        <div class="footer">
            <p>If you have any questions about your order, please don't hesitate to contact us.</p>
            <p>Thank you for shopping with us!</p>
        </div>
    </div>
</body>
</html>
  `
}

export const generateOrderConfirmationText = ({
  order,
  customerName,
  orderTotal,
  orderItems,
  shippingAddress,
}: OrderConfirmationEmailProps) => {
  return `
Order Confirmation - ${order.display_id}

Hi ${customerName},

Thank you for your order! We're excited to let you know that we've received your order and are preparing it for shipment.

Order Details:
- Order Number: ${order.display_id}
- Order Date: ${new Date(order.created_at).toLocaleDateString()}
- Status: ${order.status}

Items Ordered:
${orderItems.map(item => `- ${item.title} (Qty: ${item.quantity}) - ${item.price}`).join('\n')}

Total: ${orderTotal}

Shipping Address:
${shippingAddress.first_name} ${shippingAddress.last_name}
${shippingAddress.address_1}
${shippingAddress.city}, ${shippingAddress.postal_code}
${shippingAddress.country_code.toUpperCase()}

View your order details: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000'}/order/${order.id}/confirmed

If you have any questions about your order, please don't hesitate to contact us.

Thank you for shopping with us!
  `
}
