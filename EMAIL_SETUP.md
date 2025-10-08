# Email Setup with Mailtrap

This guide will help you set up email notifications for order confirmations using Mailtrap.

## Prerequisites

1. A Mailtrap account (free tier available)
2. Your Medusa storefront running

## Setup Steps

### 1. Create a Mailtrap Account

1. Go to [mailtrap.io](https://mailtrap.io)
2. Sign up for a free account
3. Navigate to your inbox

### 2. Get Mailtrap Credentials

1. In your Mailtrap dashboard, go to "Email Testing" > "Inboxes"
2. Select your inbox or create a new one
3. Go to "SMTP Settings" tab
4. Copy the following credentials:
   - Host: `sandbox.smtp.mailtrap.io`
   - Port: `2525`
   - Username: (your username)
   - Password: (your password)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add the following variables:

```bash
# Mailtrap Configuration
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USERNAME=your_mailtrap_username
MAILTRAP_PASSWORD=your_mailtrap_password
FROM_EMAIL=noreply@yourstore.com

# Site Configuration (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:8000
```

Replace the placeholder values with your actual Mailtrap credentials.

### 4. Test the Setup

1. Start your development server:
   ```bash
   yarn dev
   ```

2. Place a test order through your storefront

3. Check your Mailtrap inbox to see the order confirmation email

## Email Features

The order confirmation email includes:

- Order details (number, date, status)
- List of ordered items with quantities and prices
- Order total
- Shipping address
- Link to view order details
- Professional HTML and plain text versions

## Customization

### Email Template

You can customize the email template by editing:
- `src/lib/email/templates/order-confirmation.tsx` - HTML template
- `src/lib/email/service.ts` - Email service logic

### Styling

The email template uses inline CSS for maximum compatibility. You can modify the styles in the `generateOrderConfirmationHTML` function.

### Content

Update the email content by modifying the template functions in `order-confirmation.tsx`.

## Production Setup

For production, you'll want to:

1. Use a production email service (SendGrid, AWS SES, etc.)
2. Update the SMTP configuration in `src/lib/email/config.ts`
3. Set up proper environment variables for your production environment
4. Test thoroughly before going live

## Troubleshooting

### Email Not Sending

1. Check your environment variables are set correctly
2. Verify Mailtrap credentials
3. Check the console for error messages
4. Ensure your Medusa backend is running

### Email Not Received

1. Check your Mailtrap inbox
2. Verify the customer email address is valid
3. Check spam/junk folders
4. Review email template for any issues

## Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all environment variables are set
3. Test with a simple email first
4. Check Mailtrap documentation for SMTP settings
