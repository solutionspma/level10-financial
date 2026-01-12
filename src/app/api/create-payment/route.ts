import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import Stripe from 'stripe';

// This is a server-side API route for processing Stripe payments
export async function POST(request: NextRequest) {
  try {
    const { paymentMethodId, email, plan = 'core', isUpgrade = false } = await request.json();

    // Validate required fields
    if (!paymentMethodId || !email) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { status: 400 }
      );
    }

    // Validate plan
    if (plan !== 'core' && plan !== 'pro') {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Check if Stripe secret key is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY not configured');
      return NextResponse.json(
        { 
          error: 'Payment processing not configured. Please contact support.',
          details: 'Stripe API key missing - add STRIPE_SECRET_KEY to environment variables'
        },
        { status: 503 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
    });

    // Get Stripe price IDs from environment
    const stripePrices = {
      core: process.env.STRIPE_PRICE_CORE,
      pro: process.env.STRIPE_PRICE_PRO,
      proSetup: process.env.STRIPE_PRICE_PRO_SETUP,
    };

    // Validate required price IDs exist
    if (!stripePrices.core || !stripePrices.pro || !stripePrices.proSetup) {
      console.error('Stripe price IDs not fully configured');
      return NextResponse.json(
        { 
          error: 'Payment configuration incomplete. Please contact support.',
          details: 'Add STRIPE_PRICE_CORE, STRIPE_PRICE_PRO, and STRIPE_PRICE_PRO_SETUP to environment variables'
        },
        { status: 503 }
      );
    }

    const selectedPrice = plan === 'core' ? stripePrices.core : stripePrices.pro;
    const planAmount = plan === 'core' ? 10.00 : 29.00;

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
      // Attach payment method to existing customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });
      // Update default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } else {
      customer = await stripe.customers.create({
        email: email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Check if user needs to pay setup fee (Pro plan only, first time)
    const supabase = getServiceSupabase();
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email, setup_fee_paid')
      .eq('email', email)
      .single();

    const needsSetupFee = plan === 'pro' && !existingUser?.setup_fee_paid;

    // Build subscription items
    const subscriptionItems: Stripe.SubscriptionCreateParams.Item[] = [
      {
        price: selectedPrice,
      },
    ];

    // Add setup fee as one-time charge if needed
    if (needsSetupFee) {
      subscriptionItems.push({
        price: stripePrices.proSetup!,
        quantity: 1,
      });
    }

    // Create or update subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: subscriptionItems,
      default_payment_method: paymentMethodId,
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        plan: plan,
        is_upgrade: isUpgrade.toString(),
      },
    });

    // Save/update user in Supabase
    
    // Check if user exists (already queried above for setup fee check)
    const userData = {
      email,
      subscription_status: 'active',
      subscription_plan: plan,
      subscription_amount: planAmount,
      next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id,
      last_payment_date: new Date().toISOString(),
      setup_fee_paid: needsSetupFee ? true : (existingUser?.setup_fee_paid || false),
    };

    let dbUser;
    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('email', email)
        .select()
        .single();
      
      if (error) throw error;
      dbUser = data;
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      if (error) throw error;
      dbUser = data;
    }

    // Calculate total payment amount
    const totalAmount = needsSetupFee ? planAmount + 25.00 : planAmount;

    // Log payment transaction
    await supabase.from('payments').insert([{
      user_id: dbUser.id,
      stripe_subscription_id: subscription.id,
      amount: totalAmount,
      currency: 'usd',
      status: 'succeeded',
      description: `Level10 ${plan === 'core' ? 'Core' : 'Pro'} - ${isUpgrade ? 'Upgrade' : 'Monthly Subscription'}${needsSetupFee ? ' + Setup Fee' : ''}`,
      metadata: {
        subscription_id: subscription.id,
        customer_id: customer.id,
        plan: plan,
        setup_fee_included: needsSetupFee,
      },
    }]);

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      customerId: customer.id,
      userId: dbUser.id,
      user: dbUser,
      message: 'Subscription created successfully',
    });

  } catch (error) {
    console.error('Stripe payment error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: errorMessage || 'Payment processing failed',
      },
      { status: 400 }
    );
  }
}
