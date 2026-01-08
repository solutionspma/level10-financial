'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VerificationPendingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <section className="max-w-2xl mx-auto px-6 py-20">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
        </div>

        <div className="mb-8">
          <p className="text-neutral-300 mb-4">
            We've sent a verification email to:
          </p>
          <p className="text-green-400 font-semibold text-lg mb-6">
            {user.email}
          </p>
          <p className="text-neutral-400 text-sm">
            Click the link in the email to verify your account and continue to your dashboard.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push('/start-analysis')}
            className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Continue to Account Setup
          </button>
          <button
            onClick={() => {
              // In production, this would resend the verification email
              alert('Verification email resent!');
            }}
            className="text-neutral-400 hover:text-green-400 text-sm transition"
          >
            Didn&apos;t receive the email? Resend
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-neutral-500">
        <p>Wrong email address?{' '}
          <button 
            onClick={() => router.push('/register')}
            className="text-green-400 hover:underline"
          >
            Create a new account
          </button>
        </p>
      </div>
    </section>
  );
}
