import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import Stripe from 'stripe';

// This is a server-side API route for processing Stripe payments
export async function POST(request: NextRequest) {
  try {
    const { paymentMethodId, email } = await request.json();

    // Validate required fields
    if (!paymentMethodId || !email) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
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
    } else {
      customer = await stripe.customers.create({
        email: email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Create subscription for recurring billing (this will also charge the first payment)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: 'usd',
            product: process.env.STRIPE_PRODUCT_ID || 'prod_level10_pro', // Use product ID
            unit_amount: 1000, // $10.00 in cents
            recurring: {
              interval: 'month',
            },
          },
        },
      ],
      default_payment_method: paymentMethodId,
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    // Save/update user in Supabase
    const supabase = getServiceSupabase();
    
    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    const userData = {
      email,
      subscription_status: 'active',
      subscription_plan: 'Level10 Pro',
      subscription_amount: 10.00,
      next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id,
      last_payment_date: new Date().toISOString(),
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

    // Log payment transaction
    await supabase.from('payments').insert([{
      user_id: dbUser.id,
      stripe_subscription_id: subscription.id,
      amount: 10.00,
      currency: 'usd',
      status: 'succeeded',
      description: 'Level10 Pro - Monthly Subscription',
      metadata: {
        subscription_id: subscription.id,
        customer_id: customer.id,
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
