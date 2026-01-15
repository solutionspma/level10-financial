# Two-Tier Pricing - Quick Reference

## 🎯 Pricing at a Glance

```
CORE                    PRO
$10/month              $29/month + $25 setup*
                       *one-time, never again

Monthly refresh        Unlimited refreshes
Basic features         Full features
No setup fee          $25 first time only
```

## 🔑 Environment Variables Needed

```bash
STRIPE_PRICE_CORE=price_xxxxx      # $10/mo Core subscription
STRIPE_PRICE_PRO=price_xxxxx       # $29/mo Pro subscription  
STRIPE_PRICE_PRO_SETUP=price_xxxxx # $25 one-time setup
```

## 📊 Database Columns Added

```sql
users.subscription_plan    VARCHAR(10)  'none' | 'core' | 'pro'
users.setup_fee_paid       BOOLEAN      true | false
```

## 🚀 Quick Deploy

```bash
# 1. Apply migration
./apply-migration.sh

# 2. Create Stripe products (see STRIPE_PRODUCT_SETUP_GUIDE.md)

# 3. Add env vars to .env.local
STRIPE_PRICE_CORE=price_xxxxx
STRIPE_PRICE_PRO=price_xxxxx
STRIPE_PRICE_PRO_SETUP=price_xxxxx

# 4. Deploy
git add .
git commit -m "Add two-tier pricing"
git push origin main
```

## 🧪 Test Cards

```
Success:    4242 4242 4242 4242
Decline:    4000 0000 0000 0002
Auth Req:   4000 0025 0000 3155
```

## 📍 Key URLs

```
Pricing:     /pricing
Register:    /register?plan=core or /register?plan=pro
Payment:     /payment?plan=core or /payment?plan=pro
Upgrade:     /payment?upgrade=pro
Dashboard:   /dashboard (shows plan badge)
```

## ✅ Test Checklist

- [ ] Core signup: $10 charged
- [ ] Pro signup: $54 charged ($29 + $25)
- [ ] Core refresh blocked at 30 days
- [ ] Pro refresh unlimited
- [ ] Upgrade: $54 first time, $29 if setup_fee_paid=true
- [ ] Plan badge shows on dashboard
- [ ] Database columns populated correctly

## 🎨 Feature Comparison

| Feature | Core | Pro |
|---------|------|-----|
| Credit pull frequency | 30 days | Unlimited |
| Readiness snapshot | ✅ | ✅ |
| Full analysis | ❌ | ✅ |
| Lender matching | ❌ | ✅ |
| Priority support | ❌ | ✅ |

## 💰 Revenue Model

```
Core:  $10/mo × 12 = $120/year
Pro:   $29/mo × 12 + $25 = $373/year

Credit bureau cost: $1-2 per pull
Break-even: ~10 pulls over lifetime (Core)
           Immediate profit (Pro with setup fee)
```

## 📞 Support

- Setup Guide: `STRIPE_PRODUCT_SETUP_GUIDE.md`
- Complete Docs: `PRICING_IMPLEMENTATION_COMPLETE.md`
- Backend Checklist: `BACKEND_IMPLEMENTATION_CHECKLIST.md`

## ⚠️ Common Issues

**"Payment configuration incomplete"**
→ Check all 3 STRIPE_PRICE_* env vars are set

**Setup fee charged twice**
→ Verify setup_fee_paid flag in database

**Wrong plan amount**
→ Check you're using correct price ID for plan

---

**Status**: ✅ Code Complete  
**Time to Deploy**: 2-4 hours  
**Risk**: Low
