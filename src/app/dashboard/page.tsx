'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Check payment status - redirect if not paid
    if (user.subscriptionStatus !== 'active') {
      router.push('/payment');
      return;
    }
  }, [user, router]);

  if (!user) return null;
  
  // Check payment gate
  if (user.subscriptionStatus !== 'active') {
    return null; // Will redirect via useEffect
  }

  // Show preview mode if no authorization
  if (!user.hasAuthorizedCredit) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Dashboard overview"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Bankability Dashboard</h1>
              <p className="text-lg text-neutral-200">Preview Mode - Authorization Required</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-8 text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Complete Your Setup</h2>
          <p className="text-neutral-300 mb-6">
            To view your real Bankability Score and personalized roadmap, you need to authorize 
            access to your financial data.
          </p>
          <a 
            href="/start-analysis"
            className="inline-block bg-green-500 text-black font-semibold px-8 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Complete Authorization
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Dashboard overview"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.firstName || user.name?.split(' ')[0] || 'there'}!</h1>
            <p className="text-lg text-neutral-200">Your complete financial health overview</p>
          </div>
        </div>
      </div>

      {/* Demo Data Notice */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-yellow-400 mb-1">Demo Data Displayed</h3>
            <p className="text-sm text-neutral-300">
              You are viewing sample bankability data. Your real credit analysis will appear here once MicroBilt API integration is activated (awaiting production credentials). 
              <strong className="text-white">Your payment of $10 has been processed successfully</strong> - you'll receive real data as soon as the integration goes live.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900 to-green-950 border border-green-800 rounded-xl p-6">
          <div className="text-sm text-green-400 mb-1">Level10 Score</div>
          <div className="text-5xl font-bold text-white mb-2">7.8</div>
          <div className="text-xs text-neutral-300">Strong bankability (Sample)</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Credit Score</div>
          <div className="text-5xl font-bold text-white mb-2">682</div>
          <div className="text-xs text-neutral-300">Fair • +12 this month</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Funding Readiness</div>
          <div className="text-5xl font-bold text-white mb-2">73%</div>
          <div className="text-xs text-neutral-300">4 tasks remaining</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Active Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium">Dispute incorrect late payment</div>
                <div className="text-sm text-neutral-400">Credit Report • High Impact</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium">Reduce credit utilization to 30%</div>
                <div className="text-sm text-neutral-400">Credit Cards • Medium Impact</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium">Update business revenue documentation</div>
                <div className="text-sm text-neutral-400">Documents • Required for approval</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-300">Credit report updated</span>
              <span className="text-neutral-500">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-300">New lender match available</span>
              <span className="text-neutral-500">1 day ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-300">Task completed: Pay down Card #4</span>
              <span className="text-neutral-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 pt-8 border-t border-neutral-800">
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/credit"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">View Full Credit Analysis</h3>
            <p className="text-sm text-neutral-400">Deep dive into your credit profile, score factors, and improvement opportunities</p>
          </Link>

          <Link
            href="/roadmap"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">See Your Roadmap</h3>
            <p className="text-sm text-neutral-400">Step-by-step path to improve your bankability and funding readiness</p>
          </Link>

          <Link
            href="/funding"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">Explore Funding Options</h3>
            <p className="text-sm text-neutral-400">Discover lenders and products matched to your current profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
