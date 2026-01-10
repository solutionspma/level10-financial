// Script to create/restore your user record
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

async function createUser() {
  const userData = {
    email: 'jason.harris@getcovered.life',
    first_name: 'Jason',
    last_name: 'Harris',
    name: 'Jason Harris',
    phone: '225-418-8858',
    role: 'public',
    email_verified: true,
    kyc_status: 'verified',
    ssn_last_4: '9142',
    date_of_birth: '1981-08-15',
    drivers_license: '',
    license_state: '',
    has_authorized_credit: true,
    subscription_status: 'active',
    subscription_plan: 'Level10 Pro',
    subscription_amount: 10.00,
    next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    last_payment_date: new Date().toISOString(),
    stripe_customer_id: '',
    stripe_subscription_id: '',
    business_name: '',
    ein: '',
    industry: 'Professional Services',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  console.log('\n🔨 Creating user record...\n');

  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error('❌ Error creating user:', error.message);
    return;
  }

  console.log('✅ USER CREATED SUCCESSFULLY!\n');
  console.log('ID:', data.id);
  console.log('Email:', data.email);
  console.log('Subscription Status:', data.subscription_status);
  console.log('\n👉 Now try logging in again!');
}

createUser().then(() => process.exit(0));
