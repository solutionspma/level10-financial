'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const { updateUser } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('token') ? 'verifying' : 'error';
    }
    return 'verifying';
  });

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      return;
    }

    // Simulate verification (in production, this would call an API)
    setTimeout(() => {
      updateUser({ emailVerified: true });
      setStatus('success');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }, 1000);
  }, [updateUser, router]);

  return (
    <section className="max-w-2xl mx-auto px-6 py-20 text-center">
      {status === 'verifying' && (
        <>
          <div className="mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto"></div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Verifying Your Email...</h1>
          <p className="text-neutral-400">Please wait while we verify your email address.</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="mb-8">
            <div className="text-green-500 text-6xl">✓</div>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-green-400">Email Verified!</h1>
          <p className="text-neutral-400 mb-6">
            Your email has been successfully verified. Redirecting you to your dashboard...
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="mb-8">
            <div className="text-red-500 text-6xl">✗</div>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-red-400">Verification Failed</h1>
          <p className="text-neutral-400 mb-6">
            The verification link is invalid or has expired.
          </p>
          <a 
            href="/login"
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Go to Login
          </a>
        </>
      )}
    </section>
  );
}
