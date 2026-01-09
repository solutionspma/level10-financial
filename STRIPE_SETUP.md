# Setting Up Real Payment Processing

## Current Status
⚠️ **Payment processing is currently in TEST MODE**. To accept real payments, you need to:

1. Install Stripe SDK
2. Add Stripe API keys
3. Switch to production mode

---

## Setup Instructions

### 1. Install Stripe Package
```bash
npm install stripe
```

### 2. Get Stripe API Keys

1. Sign up at https://stripe.com (or log in)
2. Go to **Developers** → **API Keys**
3. Copy your **Secret key** (starts with `sk_test_` for test mode)
4. Copy your **Publishable key** (starts with `pk_test_` for test mode)

### 3. Add Environment Variables

Create a `.env.local` file in the root directory:

```bash
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
```

**Important**: Never commit `.env.local` to git! It's already in `.gitignore`.

### 4. Test Cards

Stripe provides test card numbers for development:

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0025 0000 3155 | Requires authentication |

- Use any future expiry date (e.g., 12/28)
- Use any 3-digit CVC (e.g., 123)
- Use any valid ZIP code (e.g., 12345)

### 5. Verify Payment Processing

After adding your Stripe keys:

1. Register a new account
2. Complete KYC verification
3. Enter test card: **4242 4242 4242 4242**
4. Check your Stripe Dashboard → Payments to see the $10 charge

---

## Production Deployment

### Switch to Live Mode

1. In Stripe Dashboard, toggle from **Test Mode** to **Live Mode**
2. Get your **Live API keys** (start with `sk_live_` and `pk_live_`)
3. Update Netlify environment variables:
   - Go to Site Settings → Environment Variables
   - Add `STRIPE_SECRET_KEY` with your **live secret key**
   - Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` with your **live publishable key**
4. Redeploy the site

### Netlify Environment Variables

```bash
# In Netlify dashboard:
STRIPE_SECRET_KEY=sk_live_your_production_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_production_key
```

---

## What Happens Now

### Without Stripe Keys (Current State)
- Payment form appears
- User enters card details
- API returns error: "Payment processing not configured"
- User **cannot proceed** to dashboard

### With Stripe Keys (After Setup)
- Payment form appears
- User enters real card details
- Stripe processes the $10 charge
- Customer is created in Stripe
- Recurring subscription is set up
- User proceeds to dashboard
- **Real money is charged!**

---

## Webhook Setup (Optional but Recommended)

To handle subscription renewals and failures:

1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Add endpoint: `https://level10-financial.netlify.app/api/stripe-webhook`
3. Select events: 
   - `payment_intent.succeeded`
   - `payment_intent.failed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
4. Copy the **Signing secret** (starts with `whsec_`)
5. Add to environment variables:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

---

## Testing

### Test Mode (Safe)
- Uses `sk_test_` keys
- No real money charged
- Test cards only
- Visible in Stripe Test Mode dashboard

### Live Mode (Real Charges)
- Uses `sk_live_` keys  
- **REAL MONEY CHARGED**
- Real credit cards only
- Visible in Stripe Live Mode dashboard

---

## Support

If you encounter issues:
1. Check Stripe Dashboard → Logs for detailed errors
2. Check browser console for API errors
3. Verify API keys are correct and not mixed (test vs live)
4. Ensure `.env.local` is in the root directory

**Need help?** Contact support@level10.financial
