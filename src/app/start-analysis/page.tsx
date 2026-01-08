'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';

export default function StartAnalysis() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleAuthorize = async () => {
    if (!authorized) {
      alert('Please check the authorization box to continue');
      return;
    }

    setLoading(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUser({ hasAuthorizedAnalysis: true });
    router.push('/dashboard-loading');
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Start analysis"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user.name}!</h1>
            <p className="text-lg text-neutral-200">Let's analyze your bankability</p>
          </div>
        </div>
      </div>

      {/* Explanation Card */}
      <div className="bg-gradient-to-br from-green-900/30 to-neutral-900 border border-green-800 rounded-xl p-8 mb-6">
        <h2 className="text-2xl font-bold mb-4">What Happens Next</h2>
        <p className="text-neutral-300 mb-4">
          To generate your <strong>Level 10 Bankability Score</strong> and personalized improvement roadmap, 
          we need your authorization to access your financial data.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-400 text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-white">No SSN Required Yet</h3>
              <p className="text-sm text-neutral-400">Identity verification comes later when you're ready to apply</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400 text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-white">Soft Inquiry Only</h3>
              <p className="text-sm text-neutral-400">Will NOT impact your credit score</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400 text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-white">Secure & Compliant</h3>
              <p className="text-sm text-neutral-400">FCRA-permitted purpose, bank-level encryption</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-white mb-3">What We'll Analyze</h3>
        <ul className="space-y-2 text-sm text-neutral-400">
          <li>• Credit history and payment patterns</li>
          <li>• Current debt obligations and utilization</li>
          <li>• Income stability and banking behavior</li>
          <li>• Public records (if any)</li>
          <li>• Business revenue (if applicable)</li>
        </ul>
      </div>

      {/* Authorization */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6 mb-6">
        <h3 className="text-yellow-400 font-semibold mb-3">⚠️ Credit Analysis Authorization</h3>
        <p className="text-sm text-neutral-300 mb-4">
          By checking the box below, you authorize Level 10 Financial to access your credit report 
          via a <strong>soft inquiry</strong> for the purpose of generating your Bankability Score, 
          providing financial coaching, and matching you with appropriate lenders.
        </p>
        <label className="flex items-start gap-3 text-sm cursor-pointer">
          <input 
            type="checkbox" 
            className="mt-1" 
            checked={authorized}
            onChange={(e) => setAuthorized(e.target.checked)}
          />
          <span>
            I authorize Level 10 Financial to access my credit report for evaluation, coaching, 
            and funding prequalification purposes as described in the{' '}
            <a href="/permissible-purpose" target="_blank" className="text-green-400 hover:underline">Permissible Purpose</a>{' '}
            and <a href="/fcra" target="_blank" className="text-green-400 hover:underline">FCRA Compliance</a> policies.
          </span>
        </label>
      </div>

      {/* CTA */}
      <button
        onClick={handleAuthorize}
        disabled={loading}
        className="w-full bg-green-500 text-black font-bold py-4 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Authorize & Continue'}
      </button>

      <p className="text-xs text-neutral-500 text-center mt-4">
        You can revoke this authorization at any time from your account settings
      </p>
    </div>
  );
}
