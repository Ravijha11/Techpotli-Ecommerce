# Newsletter Subscription Component

## Overview

The `NewsletterSubscription` component is a modern, responsive newsletter subscription form that allows users to subscribe to email updates. It's designed to be placed above the "Shop by Category" section as requested.

## Features

- ✅ **Email Validation**: Basic email format validation
- ✅ **Loading States**: Visual feedback during submission
- ✅ **Toast Notifications**: Success and error feedback
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Accessibility**: ARIA labels and proper form structure
- ✅ **Modern UI**: Purple gradient background with clean design

## Usage

```tsx
import NewsletterSubscription from "@/components/marketing/NewsletterSubscription"

// In your page component
<NewsletterSubscription />
```

## Backend Integration

Currently, the component simulates an API call. To integrate with your backend:

### 1. Replace the API call in `handleSubmit`:

```tsx
// Replace this section in NewsletterSubscription.tsx
try {
  // Replace with actual API call
  const response = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Subscription failed')
  }

  const data = await response.json()
  
  toast({
    title: "Successfully subscribed!",
    description: "You'll receive our latest updates, offers, and deals in your inbox.",
  })
  
  setEmail("")
} catch (error) {
  toast({
    title: "Subscription failed",
    description: "Please try again later.",
    variant: "destructive",
  })
}
```

### 2. Create API Route (Next.js)

Create `Frontend/app/api/newsletter/subscribe/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // TODO: Add your backend logic here
    // - Save to database
    // - Send confirmation email
    // - Add to email marketing service (Mailchimp, SendGrid, etc.)

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Customization

### Styling

The component uses Tailwind CSS classes. You can customize:

- Background gradient: `from-purple-50 to-indigo-50`
- Button color: `bg-purple-600 hover:bg-purple-700`
- Text colors: `text-gray-900`, `text-gray-600`

### Content

Update the text content in the component:

```tsx
<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
  Subscribe to our Newsletter
</h3>
<p className="text-gray-600 text-lg">
  Get our latest update in your email
</p>
```

## Email Marketing Services Integration

### Mailchimp
```tsx
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    email,
    listId: 'your-mailchimp-list-id'
  }),
})
```

### SendGrid
```tsx
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    email,
    listId: 'your-sendgrid-list-id'
  }),
})
```

## Testing

The component includes:
- Email format validation
- Empty field validation
- Loading state testing
- Toast notification testing

Test scenarios:
1. Submit empty form → Error toast
2. Submit invalid email → Error toast
3. Submit valid email → Success toast + form reset
4. Network error → Error toast

## Dependencies

- `lucide-react`: For the email icon
- `@/components/ui/button`: Button component
- `@/components/ui/input`: Input component
- `@/hooks/use-toast`: Toast notifications
- `@/components/ui/toaster`: Toast display

## Future Enhancements

- [ ] Double opt-in email confirmation
- [ ] GDPR compliance checkbox
- [ ] Custom email templates
- [ ] Analytics tracking
- [ ] A/B testing support
- [ ] Social media sharing
- [ ] Referral tracking 