import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServiceSupabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const supabase = getServiceSupabase();

  try {
    switch (event.type) {
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await updateSubscriptionStatus(
          supabase,
          subscription.id,
          subscription.customer as string,
          subscription.status,
          (subscription as any).current_period_end
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await updateSubscriptionStatus(
          supabase,
          subscription.id,
          subscription.customer as string,
          'canceled',
          null
        );
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if ((invoice as any).subscription) {
          await updateSubscriptionStatus(
            supabase,
            (invoice as any).subscription as string,
            invoice.customer as string,
            'past_due',
            null
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function updateSubscriptionStatus(
  supabase: any,
  subscriptionId: string,
  customerId: string,
  status: string,
  periodEnd: number | null
) {
  // Map Stripe status to our subscription_status values
  let subscriptionStatus: 'active' | 'past_due' | 'canceled';
  
  if (status === 'active') {
    subscriptionStatus = 'active';
  } else if (status === 'past_due' || status === 'unpaid') {
    subscriptionStatus = 'past_due';
  } else {
    subscriptionStatus = 'canceled';
  }

  const updateData: any = {
    subscription_status: subscriptionStatus,
    updated_at: new Date().toISOString(),
  };

  if (periodEnd) {
    updateData.next_billing_date = new Date(periodEnd * 1000).toISOString();
  }

  // Try to find user by subscription ID first, then by customer ID
  const { data: userBySubscription, error: subError } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_subscription_id', subscriptionId)
    .single();

  if (userBySubscription && !subError) {
    await supabase
      .from('users')
      .update(updateData)
      .eq('id', userBySubscription.id);
    
    console.log(`Updated subscription status for user ${userBySubscription.id}`);
    return;
  }

  // Fallback: find by customer ID
  const { data: userByCustomer, error: custError } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (userByCustomer && !custError) {
    await supabase
      .from('users')
      .update(updateData)
      .eq('id', userByCustomer.id);
    
    console.log(`Updated subscription status for user ${userByCustomer.id}`);
  } else {
    console.error(`No user found for subscription ${subscriptionId} or customer ${customerId}`);
  }
}
