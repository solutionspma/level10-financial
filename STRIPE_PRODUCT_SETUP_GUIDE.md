# Stripe Product Setup Guide

Complete guide for creating the required Stripe products and configuring the payment system.

## Prerequisites

- Stripe account with live mode enabled
- Access to Stripe Dashboard: https://dashboard.stripe.com

## Step 1: Create Products in Stripe Dashboard

### Product 1: Level10 Core

1. Go to **Products** in Stripe Dashboard
2. Click **+ Add product**
3. Fill in details:
   - **Name**: `Level10 Core`
   - **Description**: `Monthly credit monitoring and readiness insights for business funding`
   - **Pricing model**: Standard pricing
   - **Price**: `10.00` USD
   - **Billing period**: `Recurring` → `Monthly`
   - **Payment behavior**: `Charge automatically`
4. Click **Add product**
5. **COPY THE PRICE ID** (starts with `price_`) - you'll need this for `STRIPE_PRICE_CORE`

### Product 2: Level10 Pro

1. Click **+ Add product**
2. Fill in details:
   - **Name**: `Level10 Pro`
   - **Description**: `Full credit analysis with unlimited refreshes, lender matching, and priority support`
   - **Pricing model**: Standard pricing
   - **Price**: `29.00` USD
   - **Billing period**: `Recurring` → `Monthly`
   - **Payment behavior**: `Charge automatically`
3. Click **Add product**
4. **COPY THE PRICE ID** (starts with `price_`) - you'll need this for `STRIPE_PRICE_PRO`

### Product 3: Level10 Pro Setup Fee

1. Click **+ Add product**
2. Fill in details:
   - **Name**: `Level10 Pro Setup Fee`
   - **Description**: `One-time identity verification and credit analysis setup (charged only once)`
   - **Pricing model**: Standard pricing
   - **Price**: `25.00` USD
   - **Billing period**: `One time`
3. Click **Add product**
4. **COPY THE PRICE ID** (starts with `price_`) - you'll need this for `STRIPE_PRICE_PRO_SETUP`

## Step 2: Configure Environment Variables

### Local Development (.env.local)

Create or update `.env.local` in project root:

```bash
# Existing Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx

# NEW: Add these price IDs from Step 1
STRIPE_PRICE_CORE=price_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_PRO=price_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_PRO_SETUP=price_xxxxxxxxxxxxxxxxxxxxx
```

### Production (Netlify)

1. Go to Netlify Dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add three new variables:

```
Variable: STRIPE_PRICE_CORE
Value: price_xxxxxxxxxxxxxxxxxxxxx

Variable: STRIPE_PRICE_PRO
Value: price_xxxxxxxxxxxxxxxxxxxxx

Variable: STRIPE_PRICE_PRO_SETUP
Value: price_xxxxxxxxxxxxxxxxxxxxx
```

5. Click **Save**
6. **Trigger a new deploy** to apply the environment variables

## Step 3: Verify Webhook Configuration (if applicable)

If you have webhook handlers configured:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Verify your endpoint is configured (e.g., `https://yourdomain.com/api/webhooks/stripe`)
3. Ensure these events are selected:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## Step 4: Test in Stripe Test Mode

Before going live, test with Stripe test mode:

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

### Test Scenarios

**Test Core Plan:**
```
1. Use test publishable key (pk_test_...)
2. Go to /pricing
3. Click "Get Started" on Core
4. Complete signup with test card 4242 4242 4242 4242
5. Verify charge: $10.00
6. Check Stripe Dashboard → Payments for successful charge
```

**Test Pro Plan:**
```
1. Go to /pricing
2. Click "Get Started" on Pro
3. Complete signup with test card 4242 4242 4242 4242
4. Verify charge: $54.00 ($29 + $25 setup fee)
5. Check Stripe Dashboard → Payments for successful charge
6. Verify subscription created for $29/month
```

**Test Upgrade (no setup fee):**
```
1. Login as existing user who previously paid setup fee
2. Manually set setup_fee_paid = true in database
3. Go to /dashboard
4. Click "Upgrade to Pro"
5. Complete payment
6. Verify charge: $29.00 only (no setup fee)
```

## Step 5: Apply Database Migration

Run the migration to add new columns:

### Option A: Use Script
```bash
./apply-migration.sh
```

### Option B: Manual SQL (Supabase Dashboard)

1. Go to **SQL Editor** in Supabase Dashboard
2. Paste the contents of `supabase/migrations/20260112000000_add_subscription_plan_fields.sql`
3. Click **Run**
4. Verify columns added:
   ```sql
   SELECT column_name, data_type, column_default 
   FROM information_schema.columns 
   WHERE table_name = 'users' 
   AND column_name IN ('subscription_plan', 'setup_fee_paid');
   ```

## Step 6: Switch to Live Mode

Once testing is complete:

1. Update `.env.local` with live keys:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx
   ```

2. Use the live price IDs from Step 1 (not test price IDs)

3. Redeploy to production

## Step 7: Monitor First Transactions

After going live:

1. **Stripe Dashboard** → **Payments**: Watch for successful charges
2. **Database**: Verify `subscription_plan` and `setup_fee_paid` populated correctly
3. **Logs**: Check Netlify function logs for any payment errors
4. **User Flow**: Test with real (small) payment to verify end-to-end

## Troubleshooting

### Error: "Payment configuration incomplete"
- Verify all three `STRIPE_PRICE_*` environment variables are set
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables

### Error: "No such price"
- Verify you're using the correct mode (test vs live)
- Test mode price IDs start with `price_test_`
- Live mode price IDs start with `price_live_` or just `price_`

### Setup fee charged multiple times
- Check `setup_fee_paid` column in database
- Verify logic in `/api/create-payment` checks this flag
- If needed, manually set `setup_fee_paid = true` for affected users

### Subscription not created
- Check Stripe Dashboard → **Logs** for API errors
- Verify payment method attached to customer
- Check webhook delivery if using webhooks

## Success Checklist

- ✅ Three products created in Stripe
- ✅ Price IDs copied and saved
- ✅ Environment variables configured locally and on Netlify
- ✅ Database migration applied
- ✅ Core plan signup tested ($10)
- ✅ Pro plan signup tested ($54 first time, $29 after)
- ✅ Upgrade flow tested
- ✅ Live mode configured
- ✅ First real transaction successful
- ✅ Monitoring in place

## Support Resources

- **Stripe Documentation**: https://stripe.com/docs/billing/subscriptions/overview
- **Stripe Support**: https://support.stripe.com
- **Level10 Backend Checklist**: See `BACKEND_IMPLEMENTATION_CHECKLIST.md`

## Quick Reference

```bash
# Environment variables needed
STRIPE_PRICE_CORE=price_xxxxxxxxxxxxxxxxxxxxx          # $10/month
STRIPE_PRICE_PRO=price_xxxxxxxxxxxxxxxxxxxxx           # $29/month  
STRIPE_PRICE_PRO_SETUP=price_xxxxxxxxxxxxxxxxxxxxx     # $25 one-time

# Database columns added
users.subscription_plan VARCHAR(10)    # 'none', 'core', 'pro'
users.setup_fee_paid BOOLEAN           # true/false

# Price structure
Core: $10/month (no setup fee)
Pro: $29/month + $25 setup fee (first time only)
```
