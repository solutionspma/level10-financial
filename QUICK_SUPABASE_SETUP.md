# Quick Supabase Setup - 2 Minutes

## Step 1: Create Project (90 seconds)
1. Open: https://supabase.com/dashboard/projects
2. Click green **"New Project"** button
3. Fill in:
   - **Name:** `level10-financial`
   - **Database Password:** `Level10Secure2026!` (copy this exactly)
   - **Region:** East US (North Virginia) or East US (Ohio)
   - Click **"Create new project"**
4. Wait ~90 seconds for "Setting up project" to complete

## Step 2: Get API Keys (30 seconds)
1. Once project is ready, click **Settings** (gear icon, bottom of left sidebar)
2. Click **API** in the settings menu
3. You'll see three values - copy them:

```
Project URL: https://xxxxxxxxx.supabase.co
anon public: eyJhbGc... (long string starting with eyJ)
service_role: eyJhbGc... (different long string, also starting with eyJ)
```

## Step 3: Add to .env.local
Open `.env.local` and add these three lines at the bottom:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key-here...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key-here...
```

## Step 4: I'll Handle The Rest
Once you paste those 3 values into `.env.local`, tell me and I'll:
1. Run the database schema
2. Test the connection
3. Update the payment flow to use Supabase
4. Deploy it

**Just ping me when you have the 3 env vars added!**
