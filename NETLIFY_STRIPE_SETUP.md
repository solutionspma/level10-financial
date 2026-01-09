# 🚀 Deploy Production Keys to Netlify

## ✅ Local Development Keys Configured

Your `.env.local` file contains your production keys for local testing.

⚠️ **These are LIVE keys - test carefully before deploying!**

---

## 🌐 Add Keys to Netlify (Manual Setup)

### Step 1: Go to Netlify Dashboard
1. Open https://app.netlify.com
2. Click on your **level10-financial** site
3. Go to **Site configuration** → **Environment variables**

### Step 2: Add STRIPE_SECRET_KEY
1. Click **Add a variable** → **Add a single variable**
2. **Key**: `STRIPE_SECRET_KEY`
3. **Value**: Copy from your `.env.local` file (starts with `sk_live_`)
4. **Scopes**: Select **Production**
5. Click **Create variable**

### Step 3: Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
1. Click **Add a variable** → **Add a single variable**
2. **Key**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. **Value**: Copy from your `.env.local` file (starts with `pk_live_`)
4. **Scopes**: Select **Production**
5. Click **Create variable**

### Step 4: Add OPENAI_API_KEY
1. Click **Add a variable** → **Add a single variable**
2. **Key**: `OPENAI_API_KEY`
3. **Value**: Copy from your `.env.local` file (starts with `sk-proj-`)
4. **Scopes**: Select **Production**
5. Click **Create variable**

### Step 5: Add TELNYX_API_KEY (Optional - for future SMS)
1. Click **Add a variable** → **Add a single variable**
2. **Key**: `TELNYX_API_KEY`
3. **Value**: Copy from your `.env.local` file (starts with `KEY`)
4. **Scopes**: Select **Production**
5. Click **Create variable**

---

## 🔄 Deploy

After adding both variables:

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait 2-3 minutes for build

---

## ✅ Test the Payment Flow

### Local Testing First
```bash
npm run dev
```
- Go to http://localhost:3000
- Register new account
- Complete KYC
- **Use a REAL credit card** (test cards like 4242... won't work in live mode!)
- Verify $10 charge in https://dashboard.stripe.com/payments

### Production Testing
- Go to https://level10-financial.netlify.app
- Register with new email
- Complete flow with real card
- Check Stripe Dashboard for payment

---

## 🎉 You're Live!

- ✅ Real payments processed
- ✅ $10/month recurring subscriptions
- ✅ Automated billing
- ✅ Monitor at https://dashboard.stripe.com

---

## ⚠️ Important Notes

### Security
- ✅ Keys in `.env.local` (not committed)
- ✅ Netlify stores keys securely
- ❌ Never commit `.env.local`
- ❌ Never share secret keys

### Live Mode
- ❌ Test cards (4242...) DON'T work
- ✅ Real Visa/Mastercard/Amex only
- 💰 Real money charged immediately

---

## 🆘 Troubleshooting

### Payment fails
- Verify both keys added to Netlify
- Check no extra spaces in values
- Confirm new deploy triggered after adding keys

### Keys from Stripe Dashboard
1. Go to https://dashboard.stripe.com/apikeys
2. Ensure you're in **Live Mode** (toggle at top)
3. Copy **Secret key** (sk_live_...)
4. Copy **Publishable key** (pk_live_...)
