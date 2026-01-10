'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useSupabaseAuth, setUseSupabaseAuth] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (useSupabaseAuth) {
        // Real Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          throw new Error(authError.message);
        }

        if (!authData.user) {
          throw new Error('Authentication failed');
        }

        // Fetch user data from users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (userError || !userData) {
          throw new Error('User data not found');
        }

        // Load into auth context
        await login({
          id: userData.id,
          email: userData.email,
          name: userData.name || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email.split('@')[0],
          role: userData.role,
          hasAuthorizedCredit: userData.has_authorized_credit,
          kycStatus: userData.kyc_status,
          emailVerified: userData.email_verified,
          firstName: userData.first_name,
          lastName: userData.last_name,
          phone: userData.phone,
          subscriptionStatus: userData.subscription_status,
          subscriptionPlan: userData.subscription_plan,
          subscriptionAmount: userData.subscription_amount,
          nextBillingDate: userData.next_billing_date,
          stripeCustomerId: userData.stripe_customer_id,
          stripeSubscriptionId: userData.stripe_subscription_id,
          lastPaymentDate: userData.last_payment_date,
          businessName: userData.business_name,
          ein: userData.ein,
          industry: userData.industry,
          organizationName: userData.organization_name,
          lenderType: userData.lender_type,
          statesServed: userData.states_served,
          productsOffered: userData.products_offered,
          agreementAccepted: userData.agreement_accepted,
          lenderStatus: userData.lender_status,
        });

        // Redirect based on role
        if (userData.role === 'admin') {
          router.push('/admin');
        } else if (userData.role === 'lender') {
          router.push('/lender/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        // Demo login fallback - BUT check Supabase first
        try {
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

          if (existingUser) {
            // User exists in Supabase, load their real data
            await login({
              id: existingUser.id,
              email: existingUser.email,
              name: existingUser.name || `${existingUser.first_name || ''} ${existingUser.last_name || ''}`.trim() || existingUser.email.split('@')[0],
              role: existingUser.role,
              hasAuthorizedCredit: existingUser.has_authorized_credit,
              kycStatus: existingUser.kyc_status,
              emailVerified: existingUser.email_verified,
              firstName: existingUser.first_name,
              lastName: existingUser.last_name,
              phone: existingUser.phone,
              subscriptionStatus: existingUser.subscription_status,
              subscriptionPlan: existingUser.subscription_plan,
              subscriptionAmount: existingUser.subscription_amount,
              nextBillingDate: existingUser.next_billing_date,
              stripeCustomerId: existingUser.stripe_customer_id,
              stripeSubscriptionId: existingUser.stripe_subscription_id,
              lastPaymentDate: existingUser.last_payment_date,
              businessName: existingUser.business_name,
              ein: existingUser.ein,
              industry: existingUser.industry,
              ssn: existingUser.ssn_last_4,
              dateOfBirth: existingUser.date_of_birth,
              driversLicense: existingUser.drivers_license,
              licenseState: existingUser.license_state,
              organizationName: existingUser.organization_name,
              lenderType: existingUser.lender_type,
              statesServed: existingUser.states_served,
              productsOffered: existingUser.products_offered,
              agreementAccepted: existingUser.agreement_accepted,
              lenderStatus: existingUser.lender_status,
            });
            
            // Redirect based on role
            if (existingUser.role === 'admin') {
              router.push('/admin');
            } else if (existingUser.role === 'lender') {
              router.push('/lender/dashboard');
            } else {
              router.push('/dashboard');
            }
          } else {
            // Truly new demo user
            const userData = {
              id: Math.random().toString(36).substr(2, 9),
              email: email,
              name: email.split('@')[0],
              role: email.includes('lender') ? 'lender' as const : 
                    email.includes('admin') ? 'admin' as const : 
                    'public' as const,
              hasAuthorizedCredit: true,
              kycStatus: 'verified' as const,
              emailVerified: true,
            };

            await login(userData);
            
            // Redirect based on role
            if (userData.role === 'admin') {
              router.push('/admin');
            } else if (userData.role === 'lender') {
              router.push('/lender/dashboard');
            } else {
              router.push('/dashboard');
            }
          }
        } catch (err: any) {
          console.error('Demo login error:', err);
          // Fallback to pure demo mode
          const userData = {
            id: Math.random().toString(36).substr(2, 9),
            email: email,
            name: email.split('@')[0],
            role: email.includes('lender') ? 'lender' as const : 
                  email.includes('admin') ? 'admin' as const : 
                  'public' as const,
            hasAuthorizedCredit: true,
            kycStatus: 'verified' as const,
            emailVerified: true,
          };

          await login(userData);
          
          // Redirect based on role
          if (userData.role === 'admin') {
            router.push('/admin');
          } else if (userData.role === 'lender') {
            router.push('/lender/dashboard');
          } else {
            router.push('/dashboard');
          }
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to log in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section with Image */}
      <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Financial success"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-xl text-neutral-200">Access your bankability dashboard and financial roadmap</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Login Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          
          {error && (
            <div className="bg-red-900/20 border border-red-900 text-red-400 rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 space-y-2 text-center text-sm">
            <a href="/register" className="text-green-400 hover:underline block">
              Don't have an account? Sign up
            </a>
            <a href="#" className="text-neutral-400 hover:underline block">
              Forgot password?
            </a>
          </div>
        </div>

          <div className="space-y-6">
          <div className="bg-green-900/20 border border-green-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-3">✨ Authentication Mode</h3>
            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={useSupabaseAuth}
                onChange={(e) => setUseSupabaseAuth(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-neutral-300">Use Supabase Auth (Real)</span>
            </label>
            
            {!useSupabaseAuth && (
              <>
                <p className="text-sm text-neutral-300 mb-4">
                  For the demo, you can log in with any email/password. Try these roles:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <div className="font-semibold text-white">User Dashboard</div>
                    <div className="text-neutral-400">Email: user@example.com</div>
                    <div className="text-neutral-400">Password: any</div>
                  </div>
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <div className="font-semibold text-white">Lender Portal</div>
                    <div className="text-neutral-400">Email: lender@example.com</div>
                    <div className="text-neutral-400">Password: any</div>
                  </div>
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <div className="font-semibold text-white">Admin Dashboard</div>
                    <div className="text-neutral-400">Email: admin@example.com</div>
                    <div className="text-neutral-400">Password: any</div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">🔒 Production Ready</h3>
            <p className="text-sm text-neutral-400">
              This is a demo authentication system. In production, we'll integrate:
            </p>
            <ul className="mt-3 space-y-1 text-sm text-neutral-400">
              <li>✓ Supabase Auth with JWT</li>
              <li>✓ Secure password hashing</li>
              <li>✓ Email verification</li>
              <li>✓ 2FA authentication</li>
              <li>✓ OAuth providers (Google, Apple)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
