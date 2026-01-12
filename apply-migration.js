#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://krbhbouvtvzhexvtazfi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  console.log('🚀 Applying subscription plan migration...\n');

  try {
    // Add subscription_plan column
    console.log('Adding subscription_plan column...');
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(10) DEFAULT 'none' CHECK (subscription_plan IN ('none', 'core', 'pro'))`
    });

    // Add setup_fee_paid column
    console.log('Adding setup_fee_paid column...');
    const { error: error2 } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE users ADD COLUMN IF NOT EXISTS setup_fee_paid BOOLEAN DEFAULT false`
    });

    // Update existing users
    console.log('Updating existing active users to core plan...');
    const { error: error3 } = await supabase
      .from('users')
      .update({ subscription_plan: 'core' })
      .eq('subscription_status', 'active')
      .or('subscription_plan.is.null,subscription_plan.eq.none');

    // Create index
    console.log('Creating index...');
    const { error: error4 } = await supabase.rpc('exec_sql', {
      sql: `CREATE INDEX IF NOT EXISTS idx_users_subscription_plan ON users(subscription_plan)`
    });

    if (error1 || error2 || error3 || error4) {
      console.error('⚠️  Some operations had errors (may be expected if columns already exist)');
      if (error1) console.error('Column 1 error:', error1.message);
      if (error2) console.error('Column 2 error:', error2.message);
      if (error3) console.error('Update error:', error3.message);
      if (error4) console.error('Index error:', error4.message);
    }

    // Verify columns exist
    console.log('\n✅ Migration applied! Verifying...');
    const { data, error: verifyError } = await supabase
      .from('users')
      .select('subscription_plan, setup_fee_paid')
      .limit(1);

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError.message);
      console.log('\n📝 Please apply migration manually in Supabase SQL Editor:');
      console.log('   Go to: https://supabase.com/dashboard/project/krbhbouvtvzhexvtazfi/sql');
      console.log('   Run: supabase/migrations/20260112000000_add_subscription_plan_fields.sql');
    } else {
      console.log('✅ Columns verified! Migration successful.');
      console.log('\nNext steps:');
      console.log('1. ✅ Stripe products created');
      console.log('2. ✅ Environment variables added to .env.local');
      console.log('3. ✅ Database migration applied');
      console.log('4. 🔄 Add env vars to Netlify and redeploy');
      console.log('5. 🧪 Test the signup flows');
    }
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.log('\n📝 Please apply migration manually in Supabase SQL Editor:');
    console.log('   Go to: https://supabase.com/dashboard/project/krbhbouvtvzhexvtazfi/sql');
    console.log('   Paste contents of: supabase/migrations/20260112000000_add_subscription_plan_fields.sql');
  }
}

applyMigration();
