# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Name:** level10-financial
   - **Database Password:** (create a strong password and SAVE IT)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier is fine for now
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to initialize

## Step 2: Get API Keys

Once project is ready:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **"API"** in the left menu
3. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGc...
service_role key: eyJhbGc... (secret!)
```

## Step 3: Add to Environment Variables

### Local Development (.env.local)
Add these lines to your `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...
```

### Netlify (Production)
1. Go to Netlify dashboard → Your site → **Site settings** → **Environment variables**
2. Add three new variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = your service role key

## Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the query editor
5. Click **"Run"** or press `Ctrl+Enter`
6. Verify: Go to **Table Editor** → You should see tables: `users`, `payments`, `credit_reports`, `documents`

## Step 5: Test Connection

Run this in your terminal:

```bash
npm run dev
```

Then open browser console on your site and run:

```javascript
// Test Supabase connection
const { data, error } = await fetch('/api/test-supabase').then(r => r.json());
console.log('Supabase test:', data, error);
```

## Step 6: Migrate Existing Users (if any)

If you have users in localStorage, we'll need to migrate them. But since this is pre-launch, you can start fresh.

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure you added all 3 env vars to `.env.local`
- Restart your dev server after adding env vars

### "Row Level Security" errors
- RLS is enabled by default
- Service role key bypasses RLS for admin operations
- Anon key respects RLS policies

### Connection refused
- Check your Project URL is correct (should be https://xxxxx.supabase.co)
- Verify project is active in Supabase dashboard

## Next Steps

After Supabase is connected:
1. Update auth flow to use Supabase Auth
2. Update payment flow to save subscriptions to database
3. Add Stripe webhooks to sync subscription status
4. Migrate localStorage users (if needed)
