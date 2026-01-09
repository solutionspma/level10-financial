import { NextRequest, NextResponse } from 'next/server';

// This is a server-side API route for processing Stripe payments
export async function POST(request: NextRequest) {
  try {
    const { amount, cardNumber, expiry, cvc, zip, email } = await request.json();

    // Validate required fields
    if (!amount || !cardNumber || !expiry || !cvc || !zip || !email) {
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

    // Initialize Stripe (you'll need to install: npm install stripe)
    const Stripe = require('stripe');
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Parse expiry date
    const [expMonth, expYear] = expiry.split('/').map((n: string) => n.trim());
    
    // Create a payment method with the card details
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber.replace(/\s/g, ''),
        exp_month: parseInt(expMonth),
        exp_year: parseInt('20' + expYear), // Assuming YY format
        cvc: cvc,
      },
      billing_details: {
        email: email,
        address: {
          postal_code: zip,
        },
      },
    });

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        payment_method: paymentMethod.id,
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethod.id,
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
            unit_amount: amount,
            recurring: {
              interval: 'month',
            },
          },
        },
      ],
      default_payment_method: paymentMethod.id,
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
    
    return NextResponse.json(
      { 
        error: error.message || 'Payment processing failed',
        type: error.type,
        code: error.code,
      },
      { status: 400 }
    );
  }
}
