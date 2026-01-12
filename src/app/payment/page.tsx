'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  
  // Determine plan from URL params
  const urlPlan = searchParams.get('plan') || searchParams.get('upgrade');
  const selectedPlan = urlPlan === 'pro' ? 'pro' : 'core';
  const isUpgrade = searchParams.get('upgrade') === 'pro';

  const planDetails = {
    core: {
      name: 'Level10 Core',
      price: 10,
      setupFee: 0,
      total: 10,
      features: ['Readiness snapshot', 'Educational insights', 'Monthly credit monitoring']
    },
    pro: {
      name: 'Level10 Pro',
      price: 29,
      setupFee: user?.setupFeePaid ? 0 : 25,
      total: user?.setupFeePaid ? 29 : 54,
      features: ['Full credit analysis', 'Unlimited refreshes', 'Lender matching', 'Priority coaching']
    }
  };

  const plan = planDetails[selectedPlan];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: user?.email,
        },
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }

      // Call backend with payment method ID and plan details
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          email: user?.email,
          userId: user?.id,
          plan: selectedPlan,
          isUpgrade: isUpgrade,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        console.error('Payment API error:', data);
        const errorMsg = data.decline_code 
          ? `Card declined: ${data.decline_code}` 
          : data.error || 'Unknown error';
        alert(`Payment failed: ${errorMsg}`);
        setLoading(false);
        return;
      }

      // Payment successful - update user with data from database
      await updateUser({ 
        id: data.user.id,
        subscriptionStatus: 'active',
        subscriptionPlan: selectedPlan,
        subscriptionAmount: plan.price,
        nextBillingDate: data.user.next_billing_date,
        stripeCustomerId: data.user.stripe_customer_id,
        stripeSubscriptionId: data.user.stripe_subscription_id,
        lastPaymentDate: data.user.last_payment_date,
        setupFeePaid: data.user.setup_fee_paid || user?.setupFeePaid,
      });

      // Redirect to start analysis or dashboard
      router.push(isUpgrade ? '/dashboard' : '/start-analysis');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Secure payment"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Complete Your Subscription</h1>
            <p className="text-lg text-neutral-200">Get instant access to your Bankability Score and roadmap</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Card Information</label>
              <div className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3">
                <CardElement 
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#ffffff',
                        '::placeholder': {
                          color: '#737373',
                        },
                      },
                      invalid: {
                        color: '#ef4444',
                      },
                    },
                    hidePostalCode: false,
                  }}
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">Use test card: 4242 4242 4242 4242, any future expiry/CVC, any ZIP</p>
            </div>

            <button 
              type="submit"
              disabled={loading || !stripe}
              className="w-full bg-green-500 text-black font-semibold py-4 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay $${plan.total} and Continue`}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure payment powered by Stripe</span>
            </div>
            {selectedPlan === 'pro' && !user?.setupFeePaid && (
              <p className="text-xs text-neutral-500 mt-3">* One-time setup fee includes identity verification and initial credit analysis</p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-6">
            <h3 className="text-xl font-bold mb-6">
              {isUpgrade ? 'Upgrade Summary' : 'Order Summary'}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-300">{plan.name} (Monthly)</span>
                <span className="font-semibold">${plan.price.toFixed(2)}</span>
              </div>
              {plan.setupFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-neutral-300">Setup Fee (one-time)</span>
                  <span className="font-semibold">${plan.setupFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-neutral-400">
                <span>First billing date</span>
                <span>Today</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Next billing</span>
                <span>{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Due Today</span>
                <span className="text-green-500">${plan.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-800 rounded-xl p-6">
            <h4 className="font-semibold text-green-400 mb-3">✓ What&apos;s Included</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              {plan.features.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
            <p className="text-xs text-neutral-400 mt-4">Cancel anytime. No long-term commitment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading payment...</div>}>
        <CheckoutForm />
      </Suspense>
    </Elements>
  );
}
