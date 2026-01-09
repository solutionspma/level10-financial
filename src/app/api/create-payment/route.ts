import { NextRequest, NextResponse } from 'next/server';

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
    const Stripe = require('stripe');
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
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

    // Create a payment intent for the first payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // $10.00 in cents
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      description: 'Level10 Financial - Monthly Subscription',
      metadata: {
        email: email,
        plan: 'Level10 Pro',
      },
    });

    // Create subscription for recurring billing
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Level10 Pro',
              description: 'Monthly subscription to Level10 Financial platform',
            },
            unit_amount: 1000, // $10.00 in cents
            recurring: {
              interval: 'month',
            },
          },
        },
      ],
      default_payment_method: paymentMethodId,
    });

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      customerId: customer.id,
      subscriptionId: subscription.id,
      message: 'Payment processed successfully',
    });

  } catch (error: any) {
    console.error('Stripe payment error:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      decline_code: error.decline_code,
      raw: error.raw,
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Payment processing failed',
        type: error.type,
        code: error.code,
        decline_code: error.decline_code,
      },
      { status: 400 }
    );
  }
}
