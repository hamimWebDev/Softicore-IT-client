# EmailJS Setup Guide

This guide will help you set up EmailJS to send contact form data via email.

## Step 1: Create EmailJS Account

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: New Contact Form Submission from {{from_name}}

Hello {{to_name}},

You have received a new message from your website contact form:

**Name:** {{from_name}}
**Email:** {{from_email}}
**Subject:** {{subject}}

**Message:**
{{message}}

---
This message was sent from your website contact form.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your dashboard
2. Copy your **Public Key**

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

Replace the placeholder values with your actual EmailJS credentials.

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Go to your contact page
3. Fill out and submit the contact form
4. Check your email to confirm the message was received

## Troubleshooting

- **"Failed to send message" error**: Check that all environment variables are correctly set
- **Template variables not working**: Ensure your template uses the exact variable names: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`, `{{to_name}}`
- **Service not found**: Verify your Service ID is correct and the service is active

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore` to prevent accidental commits
- EmailJS public keys are safe to expose in client-side code

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic email templates
- Standard support

For higher limits, consider upgrading to a paid plan. 