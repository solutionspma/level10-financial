'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [zip, setZip] = useState('');
  const stripe = useStripe();
  const elements = useElements();

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
          address: {
            postal_code: zip,
          },
        },
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }

      // Call backend with payment method ID
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          email: user?.email,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        alert(`Payment failed: ${data.error || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      // Payment successful - update user
      updateUser({ 
        subscriptionStatus: 'active',
        subscriptionPlan: 'Level10 Pro',
        subscriptionAmount: 10,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        stripeCustomerId: data.customerId,
        stripeSubscriptionId: data.subscriptionId,
        lastPaymentDate: new Date().toISOString(),
      });

      // Redirect to start analysis
      router.push('/start-analysis');
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
                  }}
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">Use test card: 4242 4242 4242 4242</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code</label>
              <input 
                type="text" 
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="12345"
                maxLength={10}
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading || !stripe}
              className="w-full bg-green-500 text-black font-semibold py-4 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Pay $10 and Continue'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure payment powered by Stripe</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-6">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-300">Level10 Pro (Monthly)</span>
                <span className="font-semibold">$10.00</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-400">
                <span>First billing date</span>
                <span>Today</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Next billing</span>
                <span>Feb 8, 2026</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Due Today</span>
                <span className="text-green-500">$10.00</span>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-800 rounded-xl p-6">
            <h4 className="font-semibold text-green-400 mb-3">✓ What&apos;s Included</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Instant Bankability Score (0-10 scale)</li>
              <li>• Full credit analysis with soft pull</li>
              <li>• Personalized funding roadmap</li>
              <li>• Lender matching and recommendations</li>
              <li>• No Silent Denials™ guarantee</li>
              <li>• Monthly credit monitoring</li>
              <li>• Priority support</li>
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
      <CheckoutForm />
    </Elements>
  );
}
