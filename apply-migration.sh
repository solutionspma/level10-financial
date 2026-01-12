#!/bin/bash

# Apply subscription plan migration to Supabase
# This adds subscription_plan and setup_fee_paid columns to the users table

echo "🚀 Applying subscription plan migration to Supabase..."
echo ""

# Check if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "⚠️  Environment variables not set. Please run:"
    echo ""
    echo "export SUPABASE_URL='your-project-url'"
    echo "export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'"
    echo ""
    echo "Or apply the migration manually in Supabase SQL Editor:"
    echo "https://supabase.com/dashboard/project/YOUR_PROJECT/sql"
    echo ""
    cat supabase/migrations/20260112000000_add_subscription_plan_fields.sql
    exit 1
fi

# Apply migration using Supabase REST API
SQL_CONTENT=$(cat supabase/migrations/20260112000000_add_subscription_plan_fields.sql)

RESPONSE=$(curl -s -X POST \
  "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${SQL_CONTENT}\"}")

if [ $? -eq 0 ]; then
    echo "✅ Migration applied successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Create Stripe products (see BACKEND_IMPLEMENTATION_CHECKLIST.md)"
    echo "2. Add Stripe price IDs to environment variables"
    echo "3. Test the signup flows"
else
    echo "❌ Migration failed. Please apply manually in Supabase SQL Editor."
    echo ""
    echo "SQL to run:"
    cat supabase/migrations/20260112000000_add_subscription_plan_fields.sql
fi
