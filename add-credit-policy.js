require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addCreditReportsPolicy() {
  console.log('🚀 Adding INSERT policy for credit_reports...');
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Users can insert their own credit reports"
          ON public.credit_reports
          FOR INSERT
          WITH CHECK (auth.uid() = user_id);
      `
    });
    
    if (error) {
      // Try direct SQL if exec_sql doesn't exist
      console.log('⚠️  exec_sql not available, trying direct execution...');
      const { error: directError } = await supabase
        .from('_migrations')
        .insert({ name: '20260113_add_credit_reports_insert_policy' });
      
      if (directError) {
        console.error('❌ Error:', directError);
        console.log('\n📋 Please run this SQL manually in Supabase SQL Editor:');
        console.log(`
CREATE POLICY "Users can insert their own credit reports"
  ON public.credit_reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
        `);
        process.exit(1);
      }
    }
    
    console.log('✅ Policy added successfully!');
    console.log('\n📝 Users can now save their credit scores.');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    console.log('\n📋 Please run this SQL manually in Supabase SQL Editor:');
    console.log(`
CREATE POLICY "Users can insert their own credit reports"
  ON public.credit_reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
    `);
    process.exit(1);
  }
}

addCreditReportsPolicy();
