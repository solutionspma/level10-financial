# Stripe Products Setup for Level10 Pricing

## Overview
Level10 uses a two-tier subscription model with Stripe for payment processing.

---

## Products to Create in Stripe Dashboard

### 1. Level10 Core - Monthly Subscription
**Product Name:** Level10 Core  
**Description:** Readiness snapshot, educational insights, and basic monitoring  
**Pricing:** $10.00 USD / month (recurring)  
**Billing Period:** Monthly  
**Type:** Recurring subscription

**Stripe Price ID:** `price_core_monthly_10`  
*(Replace with actual ID after creating in Stripe Dashboard)*

**Metadata (optional):**
- `plan_tier`: `core`
- `features`: `readiness_snapshot,education,basic_monitoring`

---

### 2. Level10 Pro - Monthly Subscription
**Product Name:** Level10 Pro  
**Description:** Full platform access with identity validation, unlimited credit refreshes, and lender matching  
**Pricing:** $29.00 USD / month (recurring)  
**Billing Period:** Monthly  
**Type:** Recurring subscription

**Stripe Price ID:** `price_pro_monthly_29`  
*(Replace with actual ID after creating in Stripe Dashboard)*

**Metadata (optional):**
- `plan_tier`: `pro`
- `features`: `full_credit_analysis,unlimited_refreshes,lender_matching,monitoring,coaching`

---

### 3. Level10 Pro - Readiness Setup Fee
**Product Name:** Level10 Pro Readiness Setup  
**Description:** One-time identity validation and baseline credit analysis setup  
**Pricing:** $25.00 USD (one-time)  
**Type:** One-time payment

**Stripe Price ID:** `price_pro_setup_25`  
*(Replace with actual ID after creating in Stripe Dashboard)*

**Metadata (optional):**
- `setup_fee`: `true`
- `plan_tier`: `pro`
- `one_time`: `true`

---

## Implementation Notes

### Environment Variables to Add

Add these to `.env.local` and Netlify after creating products in Stripe:

```bash
# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_CORE=price_core_monthly_10
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_pro_monthly_29
NEXT_PUBLIC_STRIPE_PRICE_PRO_SETUP=price_pro_setup_25
```

### Payment Flow Logic

**For Core Signup:**
1. User clicks "Start with Core" on pricing page
2. Redirected to `/register?plan=core`
3. After registration, redirected to `/payment?plan=core`
4. Stripe checkout created with `STRIPE_PRICE_CORE` only
5. On success: Set `subscriptionPlan = 'core'` in database

**For Pro Signup:**
1. User clicks "Start with Pro" on pricing page
2. Redirected to `/register?plan=pro`
3. After registration, redirected to `/payment?plan=pro`
4. Stripe checkout created with **both**:
   - `STRIPE_PRICE_PRO` (recurring)
   - `STRIPE_PRICE_PRO_SETUP` (one-time)
5. On success: Set `subscriptionPlan = 'pro'` and `setupFeePaid = true` in database

**For Core → Pro Upgrade:**
1. User clicks "Upgrade to Pro" from dashboard
2. Redirected to `/payment?upgrade=pro`
3. Cancel existing Core subscription
4. Create new Pro subscription with setup fee
5. Update: `subscriptionPlan = 'pro'`, `setupFeePaid = true`

---

## Stripe Webhook Events to Handle

Update `/api/webhooks/stripe` to handle these events:

### `checkout.session.completed`
- Extract `customer_id`, `subscription_id`, `client_reference_id` (user_id)
- Determine plan tier from line items
- Check if setup fee was included
- Update user record:
  - `subscriptionStatus = 'active'`
  - `subscriptionPlan = 'core' | 'pro'`
  - `setupFeePaid = true` (if Pro setup fee present)
  - `stripeCustomerId`
  - `stripeSubscriptionId`

### `customer.subscription.updated`
- Handle plan changes (upgrades/downgrades)
- Update `subscriptionPlan` accordingly

### `customer.subscription.deleted`
- Set `subscriptionStatus = 'cancelled'`
- Optionally downgrade to free tier or lock access

### `invoice.payment_failed`
- Set `subscriptionStatus = 'past_due'`
- Send notification (future enhancement)

---

## Database Schema Updates

Already added to `User` interface in `auth-context.tsx`:

```typescript
subscriptionPlan?: 'none' | 'core' | 'pro';
setupFeePaid?: boolean;
```

These should also exist in Supabase `users` table:

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'none';
ALTER TABLE users ADD COLUMN IF NOT EXISTS setup_fee_paid BOOLEAN DEFAULT false;
```

---

## Testing Checklist

- [ ] Create all 3 products in Stripe Dashboard (test mode first)
- [ ] Copy Price IDs to `.env.local`
- [ ] Test Core signup flow end-to-end
- [ ] Test Pro signup flow (verify both charges)
- [ ] Test upgrade from Core to Pro
- [ ] Verify setup fee only charged once
- [ ] Confirm database fields update correctly
- [ ] Test cancellation flows

---

## Pricing Summary

| Plan | Monthly | Setup Fee | Total First Month |
|------|---------|-----------|-------------------|
| Core | $10     | $0        | $10               |
| Pro  | $29     | $25       | $54               |

**Upgrade:** Core → Pro costs $29/month + $25 setup (one-time)

---

## Notes

- Setup fee is **one-time only** - never charged again even if user cancels and resubscribes
- Core users can upgrade to Pro anytime
- Pro users cannot downgrade to Core (business decision - may change)
- All subscriptions can be cancelled anytime (no refunds for current period)
- Lenders never pay - they're invite-only and commission-based (5% of funded loans)
