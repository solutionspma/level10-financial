# Backend Implementation Checklist

This document tracks the remaining backend work to complete the two-tier pricing implementation.

## ✅ Completed

1. **UI Updates**
   - ✅ Updated User interface with `subscriptionPlan: 'none'|'core'|'pro'` and `setupFeePaid: boolean`
   - ✅ Rebuilt pricing page with Core ($10/mo) and Pro ($29/mo + $25 setup) tiers
   - ✅ Added plan badge and upgrade prompt to dashboard
   - ✅ Implemented credit refresh gating (30-day limit for Core users)
   - ✅ Updated payment page with plan selection and setup fee display
   - ✅ Modified register page to capture plan from URL params

2. **API Updates**
   - ✅ Updated `/api/create-payment` to handle plan parameter
   - ✅ Added setup fee logic for Pro plan first-time users
   - ✅ Updated payment logging with plan details

3. **Database**
   - ✅ Created migration file for `subscription_plan` and `setup_fee_paid` columns

## 🔄 In Progress

### 1. Run Database Migration

```bash
# Apply the migration to add new columns
cd supabase
supabase db push

# Or manually run the SQL in Supabase dashboard:
# Go to SQL Editor and paste contents of:
# supabase/migrations/20260112000000_add_subscription_plan_fields.sql
```

### 2. Create Stripe Products and Prices

**In Stripe Dashboard (https://dashboard.stripe.com):**

#### Product 1: Level10 Core
- Name: `Level10 Core`
- Description: `Monthly credit monitoring and readiness insights`
- Create recurring price:
  - Amount: `$10.00 USD`
  - Billing period: `Monthly`
  - Copy the Price ID (starts with `price_`)

#### Product 2: Level10 Pro
- Name: `Level10 Pro`
- Description: `Full credit analysis with unlimited refreshes and lender matching`
- Create recurring price:
  - Amount: `$29.00 USD`
  - Billing period: `Monthly`
  - Copy the Price ID (starts with `price_`)

#### Product 3: Level10 Pro Setup Fee
- Name: `Level10 Pro Setup Fee`
- Description: `One-time identity verification and credit analysis setup`
- Create one-time price:
  - Amount: `$25.00 USD`
  - Billing: `One time`
  - Copy the Price ID (starts with `price_`)

### 3. Update Environment Variables

Add to `.env.local` (local development):
```bash
STRIPE_PRICE_CORE=price_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_PRO=price_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_PRO_SETUP=price_xxxxxxxxxxxxxxxxxxxxx
```

Add to Netlify environment variables:
```bash
# Go to: Site settings > Environment variables
STRIPE_PRICE_CORE=price_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_PRO=price_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_PRO_SETUP=price_xxxxxxxxxxxxxxxxxxxxx
```

### 4. Update Webhook Handler (if exists)

If you have a webhook handler at `/api/webhooks/stripe`, update it to handle the new plan structure:

```typescript
// Handle subscription events
case 'customer.subscription.created':
case 'customer.subscription.updated':
  const subscription = event.data.object;
  const plan = subscription.metadata.plan; // 'core' or 'pro'
  
  // Update user record with new plan
  await supabase
    .from('users')
    .update({
      subscription_status: 'active',
      subscription_plan: plan,
      subscription_amount: plan === 'core' ? 10.00 : 29.00,
    })
    .eq('stripe_customer_id', subscription.customer);
  break;

case 'customer.subscription.deleted':
  // Downgrade to none when subscription ends
  await supabase
    .from('users')
    .update({
      subscription_status: 'cancelled',
      subscription_plan: 'none',
    })
    .eq('stripe_subscription_id', subscription.id);
  break;
```

## 📋 Testing Checklist

### Test Core Plan Signup
1. Go to `/pricing`
2. Click "Get Started" on Core plan
3. Complete registration form
4. Verify redirect to `/payment?plan=core`
5. See "Level10 Core (Monthly) $10.00" in order summary
6. Use test card: `4242 4242 4242 4242`
7. Verify successful payment and redirect to `/start-analysis`
8. Check dashboard shows "Level10 Core" badge
9. Pull credit report
10. Try to refresh within 30 days - should see upgrade prompt

### Test Pro Plan Signup
1. Go to `/pricing`
2. Click "Get Started" on Pro plan
3. Complete registration form
4. Verify redirect to `/payment?plan=pro`
5. See "Level10 Pro (Monthly) $29.00" + "Setup Fee (one-time) $25.00" = "Total $54.00"
6. Use test card: `4242 4242 4242 4242`
7. Verify successful payment
8. Check database: `setup_fee_paid = true`
9. Check dashboard shows "⭐ Level10 Pro" badge
10. Pull credit report
11. Refresh immediately - should work (unlimited)

### Test Core to Pro Upgrade
1. Login as Core user
2. Go to `/dashboard`
3. Click "Upgrade to Pro →"
4. Verify redirect to `/payment?upgrade=pro`
5. See "Level10 Pro (Monthly) $29.00" + "Setup Fee (one-time) $25.00" = "Total $54.00"
6. Complete payment
7. Verify redirect to `/dashboard`
8. Check dashboard now shows "⭐ Level10 Pro" badge
9. Check database: `subscription_plan = 'pro'` and `setup_fee_paid = true`

### Test Pro Upgrade Without Setup Fee (returning user)
1. Create user, complete Pro signup (pays setup fee)
2. Manually downgrade to Core in database
3. Login and click upgrade again
4. Verify payment page shows only $29.00 (no setup fee)
5. Complete payment
6. Check database: `setup_fee_paid` remains `true`

## 🔍 Verification

After deployment, verify in production:

1. **Stripe Dashboard**: Check successful subscriptions and one-time charges
2. **Database**: Verify `subscription_plan` and `setup_fee_paid` columns populated correctly
3. **User Flow**: Test complete signup for both plans
4. **Entitlements**: Verify Core users hit 30-day limit and Pro users don't
5. **Payments Table**: Verify all transactions logged with correct amounts

## 📊 Key Metrics to Track

- Core signups vs Pro signups
- Core to Pro upgrade rate
- Average revenue per user (ARPU)
- Credit bureau cost per user vs plan revenue
- Churn rate by plan
- Feature usage by plan tier

## 🚨 Rollback Plan

If issues arise:

1. Revert pricing page to single tier
2. Update payment page to remove plan selection
3. Set all new users to `subscription_plan = 'core'`
4. Remove credit refresh gating temporarily
5. Fix issues in dev environment
6. Redeploy when stable

## Next Steps

1. ✅ Run database migration
2. ✅ Create Stripe products and get price IDs
3. ✅ Add environment variables locally and on Netlify
4. ✅ Test Core plan signup flow
5. ✅ Test Pro plan signup flow
6. ✅ Test upgrade flow
7. ✅ Deploy to production
8. ✅ Monitor for 24 hours
9. ✅ Announce new pricing to users
