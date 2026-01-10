// Quick script to check user data in Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local manually
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

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser() {
  const email = 'jason.harris@getcovered.life';
  
  console.log(`\n🔍 Checking for user: ${email}\n`);
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  if (data && data.length > 0) {
    console.log(`✅ FOUND ${data.length} RECORD(S):\n`);
    
    data.forEach((record, index) => {
      console.log(`\n--- RECORD ${index + 1} ---`);
      console.log('ID:', record.id);
      console.log('Email:', record.email);
      console.log('Name:', record.name || `${record.first_name || ''} ${record.last_name || ''}`);
      console.log('Role:', record.role);
      console.log('KYC Status:', record.kyc_status);
      console.log('SSN (last 4):', record.ssn_last_4 || 'Not set');
      console.log('DOB:', record.date_of_birth || 'Not set');
      console.log('\n💳 PAYMENT INFO:');
      console.log('Subscription Status:', record.subscription_status);
      console.log('Subscription Plan:', record.subscription_plan || 'None');
      console.log('Subscription Amount:', record.subscription_amount || 'N/A');
      console.log('Stripe Customer ID:', record.stripe_customer_id || 'None');
      console.log('Stripe Subscription ID:', record.stripe_subscription_id || 'None');
      console.log('Last Payment Date:', record.last_payment_date || 'Never');
      console.log('Next Billing Date:', record.next_billing_date || 'N/A');
      console.log('\n🏢 BUSINESS INFO:');
      console.log('Business Name:', record.business_name || 'Not set');
      console.log('EIN:', record.ein || 'Not set');
      console.log('Industry:', record.industry || 'Not set');
      console.log('\nCreated:', record.created_at);
      console.log('Updated:', record.updated_at);
    });
  } else {
    console.log('❌ No user found with that email');
  }
}

checkUser().then(() => process.exit(0));
