#!/bin/bash

# Supabase Setup Script for Level10 Financial

echo "==================================="
echo "Supabase Auto-Setup for Level10"
echo "==================================="
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    brew install supabase/tap/supabase
fi

echo "✓ Supabase CLI found"
echo ""

# Create project
echo "📦 Creating Supabase project 'level10-financial'..."
echo "   Region: us-east-1 (East US)"
echo "   DB Password: Level10Secure2026!"
echo ""

# Use single quotes to avoid shell issues
supabase projects create 'level10-financial' \
  --org-id 'mtvqebzjkbvjbaybemip' \
  --db-password 'Level10Secure2026!' \
  --region 'us-east-1' \
  --interactive=false

# Get the project reference
PROJECT_REF=$(supabase projects list | grep 'level10-financial' | awk '{print $3}')

if [ -z "$PROJECT_REF" ]; then
    echo ""
    echo "❌ Project creation may have failed or is still in progress."
    echo "Please check https://supabase.com/dashboard"
    echo ""
    echo "If project exists, find it and copy the values manually:"
    echo "1. Project URL"
    echo "2. Anon key"  
    echo "3. Service role key"
    exit 1
fi

echo ""
echo "✓ Project created successfully!"
echo "   Reference ID: $PROJECT_REF"
echo ""

# Wait for project to be ready
echo "⏳ Waiting for project to initialize (this takes ~2 minutes)..."
sleep 120

# Link the project
echo "🔗 Linking project to local workspace..."
supabase link --project-ref "$PROJECT_REF"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Check .env.local file has been updated with Supabase credentials"
echo "2. Run: npm run dev"
echo "3. Navigate to: http://localhost:3000/api/test-supabase"
echo ""
