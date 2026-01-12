'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface DashboardData {
  creditReport: any;
  documents: any[];
  bankabilityScore: number;
  fundingReadiness: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

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

    loadDashboardData();
  }, [user, router]);

  const loadDashboardData = async () => {
    if (!user?.id) return;
    
    try {
      // Load credit report
      const { data: creditData } = await supabase
        .from('credit_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('pulled_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      // Load documents
      const { data: docsData } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id);

      // Calculate funding readiness (% of required documents + KYC status)
      const requiredDocCount = 5; // 5 required documents
      const hasKYC = user.kycStatus === 'verified' ? 1 : 0;
      const fundingReadiness = Math.round(((docsData?.length || 0) / requiredDocCount + hasKYC) / 2 * 100);

      setData({
        creditReport: creditData,
        documents: docsData || [],
        bankabilityScore: creditData?.bankability_score || 0,
        fundingReadiness,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;
  
  // Check payment gate
  if (user.subscriptionStatus !== 'active') {
    return null; // Will redirect via useEffect
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center text-neutral-400">Loading your dashboard...</div>
      </div>
    );
  }

  const hasCreditReport = !!data?.creditReport;
  const creditScore = data?.creditReport?.report_data?.score || 0;
  const tasksRemaining = 7 - (data?.documents.length || 0) + (user.kycStatus === 'verified' ? 0 : 1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Plan Badge */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            user.subscriptionPlan === 'pro' 
              ? 'bg-green-500 text-black' 
              : 'bg-neutral-800 text-neutral-300'
          }`}>
            {user.subscriptionPlan === 'pro' ? '⭐ Level10 Pro' : 'Level10 Core'}
          </span>
          {user.subscriptionPlan === 'core' && (
            <Link 
              href="/payment?upgrade=pro" 
              className="text-green-400 hover:text-green-300 text-sm font-semibold transition"
            >
              Upgrade to Pro →
            </Link>
          )}
        </div>
      </div>

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

      {/* No Credit Report Notice */}
      {!hasCreditReport && (
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-400 mb-1">Pull Your Credit Report</h3>
              <p className="text-sm text-neutral-300 mb-3">
                Get your comprehensive credit analysis to see your bankability score, credit breakdown, and personalized recommendations.
              </p>
              <Link 
                href="/credit"
                className="inline-block bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition text-sm"
              >
                Pull Credit Report
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900 to-green-950 border border-green-800 rounded-xl p-6">
          <div className="text-sm text-green-400 mb-1">Level10 Score</div>
          <div className="text-5xl font-bold text-white mb-2">
            {data?.bankabilityScore ? data.bankabilityScore.toFixed(1) : '—'}
          </div>
          <div className="text-xs text-neutral-300">
            {data?.bankabilityScore 
              ? data.bankabilityScore >= 7 ? 'Strong bankability' : data.bankabilityScore >= 5 ? 'Moderate bankability' : 'Needs improvement'
              : 'Pull credit report to calculate'
            }
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Credit Score</div>
          <div className="text-5xl font-bold text-white mb-2">
            {creditScore || '—'}
          </div>
          <div className="text-xs text-neutral-300">
            {creditScore 
              ? creditScore >= 700 ? 'Good' : creditScore >= 650 ? 'Fair' : 'Needs improvement'
              : 'Not yet pulled'
            }
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Funding Readiness</div>
          <div className="text-5xl font-bold text-white mb-2">{data?.fundingReadiness || 0}%</div>
          <div className="text-xs text-neutral-300">{tasksRemaining} tasks remaining</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Active Tasks</h2>
          <div className="space-y-3">
            {user.kycStatus !== 'verified' && (
              <div className="flex items-start gap-3 p-3 bg-neutral-800 rounded-lg">
                <span className="text-xl">🔒</span>
                <div className="flex-1">
                  <div className="font-medium">Complete KYC Verification</div>
                  <div className="text-sm text-neutral-400 mb-2">Required for credit pulls</div>
                  <Link href="/kyc" className="text-sm text-green-400 hover:text-green-300">
                    Complete Now →
                  </Link>
                </div>
              </div>
            )}
            
            {!hasCreditReport && user.kycStatus === 'verified' && (
              <div className="flex items-start gap-3 p-3 bg-neutral-800 rounded-lg">
                <span className="text-xl">📊</span>
                <div className="flex-1">
                  <div className="font-medium">Pull Credit Report</div>
                  <div className="text-sm text-neutral-400 mb-2">Get your bankability score</div>
                  <Link href="/credit" className="text-sm text-green-400 hover:text-green-300">
                    Pull Report →
                  </Link>
                </div>
              </div>
            )}

            {(data?.documents.length || 0) < 7 && (
              <div className="flex items-start gap-3 p-3 bg-neutral-800 rounded-lg">
                <span className="text-xl">📄</span>
                <div className="flex-1">
                  <div className="font-medium">Upload Required Documents</div>
                  <div className="text-sm text-neutral-400 mb-2">
                    {data?.documents.length || 0} of 7 uploaded
                  </div>
                  <Link href="/documents" className="text-sm text-green-400 hover:text-green-300">
                    Upload Now →
                  </Link>
                </div>
              </div>
            )}

            {hasCreditReport && data?.creditReport?.report_data?.recommendations?.length > 0 && (
              <div className="flex items-start gap-3 p-3 bg-neutral-800 rounded-lg">
                <span className="text-xl">⬆️</span>
                <div className="flex-1">
                  <div className="font-medium">Improve Credit Score</div>
                  <div className="text-sm text-neutral-400 mb-2">
                    {data.creditReport.report_data.recommendations[0]}
                  </div>
                  <Link href="/credit" className="text-sm text-green-400 hover:text-green-300">
                    View All →
                  </Link>
                </div>
              </div>
            )}

            {user.kycStatus === 'verified' && hasCreditReport && (data?.documents.length || 0) >= 5 && (
              <div className="text-center py-6 text-green-400">
                <div className="text-4xl mb-2">✅</div>
                <div className="font-semibold">All major tasks complete!</div>
                <div className="text-sm text-neutral-400 mt-1">You're ready to explore funding options</div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-neutral-800 rounded-lg">
              <div>
                <div className="text-sm text-neutral-400">Subscription</div>
                <div className="font-semibold text-green-400">{user.subscriptionPlan || 'Level10 Pro'}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-400">Status</div>
                <div className="font-semibold capitalize">{user.subscriptionStatus || 'Active'}</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-neutral-800 rounded-lg">
              <div>
                <div className="text-sm text-neutral-400">Documents</div>
                <div className="font-semibold">{data?.documents.length || 0} uploaded</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-400">KYC Status</div>
                <div className={`font-semibold capitalize ${user.kycStatus === 'verified' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {user.kycStatus || 'Pending'}
                </div>
              </div>
            </div>

            {hasCreditReport && (
              <div className="flex justify-between items-center p-3 bg-neutral-800 rounded-lg">
                <div>
                  <div className="text-sm text-neutral-400">Last Credit Pull</div>
                  <div className="font-semibold">
                    {new Date(data.creditReport.pulled_at).toLocaleDateString()}
                  </div>
                </div>
                <Link href="/credit" className="text-sm text-green-400 hover:text-green-300">
                  View Report →
                </Link>
              </div>
            )}
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
