'use client';

import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  // Show preview mode if no authorization
  if (!user.hasAuthorizedAnalysis) {
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
          <p className="text-neutral-300 mb-4">
            To view your real Bankability Score and personalized roadmap, you need to authorize 
            access to your financial data.
          </p>
          <div className="bg-yellow-800/20 border border-yellow-600/30 rounded-lg p-3 mb-6 text-sm">
            <p className="text-yellow-200">
              Full credit analysis and identity verification coming online Monday.
            </p>
          </div>
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
            <h1 className="text-4xl font-bold text-white mb-2">Bankability Dashboard</h1>
            <p className="text-lg text-neutral-200">Your complete financial health overview</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900 to-green-950 border border-green-800 rounded-xl p-6">
          <div className="text-sm text-green-400 mb-1">Level10 Score</div>
          <div className="text-5xl font-bold text-white mb-2">7.8</div>
          <div className="text-xs text-neutral-300">Strong bankability</div>
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

      <div className="mt-6 flex gap-4">
        <a href="/credit" className="text-green-400 hover:underline">View Full Credit Analysis →</a>
        <a href="/roadmap" className="text-green-400 hover:underline">See Your Roadmap →</a>
        <a href="/funding" className="text-green-400 hover:underline">Explore Funding Options →</a>
      </div>
    </div>
  );
}
