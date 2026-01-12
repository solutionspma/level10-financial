'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    creditAuth: false,
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useSupabaseAuth, setUseSupabaseAuth] = useState(true);

  // Get selected plan from URL
  const selectedPlan = searchParams.get('plan') || 'core';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      if (useSupabaseAuth) {
        // Real Supabase Auth Registration
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            }
          }
        });

        if (authError) {
          throw new Error(authError.message);
        }

        if (!authData.user) {
          throw new Error('Registration failed');
        }

        // Insert user into users table
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            name: `${formData.firstName} ${formData.lastName}`,
            role: 'public',
            email_verified: false,
            kyc_status: 'none',
            subscription_status: 'none',
            has_authorized_credit: false,
          });

        if (insertError) {
          throw new Error(insertError.message);
        }

        // Load user into context
        await login({
          id: authData.user.id,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          role: 'public',
          hasAuthorizedCredit: false,
          kycStatus: 'none',
          emailVerified: false,
          subscriptionStatus: 'none',
          subscriptionPlan: 'none',
        });

        // Redirect to payment with selected plan
        router.push(`/payment?plan=${selectedPlan}`);
      } else {
        // Demo mode fallback
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          role: 'public' as const,
          hasAuthorizedCredit: false,
          kycStatus: 'none' as const,
          emailVerified: false,
          subscriptionStatus: 'none' as const,
          subscriptionPlan: 'none' as const,
        };

        await login(userData);
        
        // Redirect to payment with selected plan
        router.push(`/payment?plan=${selectedPlan}`);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section with Image */}
      <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="New beginning"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Start Your Bankability Journey</h1>
            <p className="text-xl text-neutral-200">Get instant credit analysis and your personalized roadmap to approval</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-400">Selected plan:</span>
              <span className={`font-semibold ${selectedPlan === 'pro' ? 'text-green-400' : 'text-blue-400'}`}>
                {selectedPlan === 'pro' ? '⭐ Level10 Pro' : 'Level10 Core'}
              </span>
              <span className="text-neutral-500">•</span>
              <a href="/pricing" className="text-green-400 hover:text-green-300 transition">Change plan</a>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/20 border border-red-900 text-red-400 rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                  placeholder="John"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="(555) 123-4567"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            
            <label className="flex items-start gap-2 text-sm text-neutral-400 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1" 
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                required 
              />
              <span>
                I agree to the <a href="/terms" className="text-green-400 hover:underline">Terms of Service</a>{' '}
                and <a href="/privacy" className="text-green-400 hover:underline">Privacy Policy</a>
              </span>
            </label>
            
            <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                checked={useSupabaseAuth}
                onChange={(e) => setUseSupabaseAuth(e.target.checked)}
              />
              <span>Use Supabase Auth (Real Registration)</span>
            </label>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-neutral-400">
            <a href="/login" className="text-green-400 hover:underline">Already have an account? Log in</a>
          </div>
        </div>

        {/* Benefits Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-3">✨ What You'll Get</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>✓ Instant credit analysis</li>
              <li>✓ Personalized improvement tasks</li>
              <li>✓ Level10 Bankability Score</li>
              <li>✓ Lender matching & prequalification</li>
              <li>✓ Financial coaching resources</li>
              <li>✓ Monthly progress tracking</li>
            </ul>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">🔒 Your Privacy</h3>
            <p className="text-sm text-neutral-400 mb-3">
              We use military-grade encryption and follow strict FCRA, GLBA, and DPPA guidelines.
            </p>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>✓ Soft pull only (no score impact)</li>
              <li>✓ SOC 2 compliant</li>
              <li>✓ Your data is never sold</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
