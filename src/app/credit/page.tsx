'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CreditReport {
  id: string;
  report_data: any;
  bankability_score: number;
  pulled_at: string;
}

export default function Credit() {
  const { user } = useAuth();
  const router = useRouter();
  const [creditReport, setCreditReport] = useState<CreditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [pulling, setPulling] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadCreditReport();
  }, [user, router]);

  const loadCreditReport = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('credit_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('pulled_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setCreditReport(data);
    } catch (error) {
      console.error('Error loading credit report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePullCredit = async () => {
    if (!user?.ssnFull || !user?.dateOfBirth) {
      alert('Please complete KYC verification first. Full SSN and date of birth are required.');
      router.push('/kyc');
      return;
    }

    setPulling(true);

    try {
      // Call MicroBilt API (will implement this endpoint next)
      const response = await fetch('/api/pull-credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ssn: user.ssnFull,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
        }),
      });

      if (!response.ok) throw new Error('Failed to pull credit report');

      const data = await response.json();
      
      // Save to database
      const { error } = await supabase
        .from('credit_reports')
        .insert({
          user_id: user.id,
          report_data: data.report,
          bankability_score: data.bankability_score,
        });

      if (error) throw error;

      // Reload
      await loadCreditReport();
    } catch (error) {
      console.error('Error pulling credit:', error);
      alert('Failed to pull credit report. Please try again or contact support.');
    } finally {
      setPulling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center text-neutral-400">Loading credit report...</div>
      </div>
    );
  }

  // No credit report yet
  if (!creditReport) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">Credit Analysis</h1>
        <p className="text-neutral-400 mb-8">Pull your comprehensive credit report</p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-2xl font-bold mb-4">No Credit Report on File</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Pull your credit report to see your detailed credit profile, payment history, utilization, 
            and personalized recommendations to improve your bankability score.
          </p>
          
          <button
            onClick={handlePullCredit}
            disabled={pulling}
            className="bg-green-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
          >
            {pulling ? 'Pulling Report...' : 'Pull Credit Report'}
          </button>

          <div className="mt-8 pt-8 border-t border-neutral-800">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">🔒 Soft Pull - No Impact on Score</h3>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              This is a soft inquiry that will not affect your credit score. Your report is pulled directly 
              from credit bureaus via MicroBilt and stored securely in your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Display credit report data
  const reportData = creditReport.report_data || {};
  const accounts = reportData.accounts || [];
  const inquiries = reportData.inquiries || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Credit Analysis</h1>
          <p className="text-neutral-400">
            Last updated: {new Date(creditReport.pulled_at).toLocaleDateString()} at {new Date(creditReport.pulled_at).toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={handlePullCredit}
          disabled={pulling}
          className="bg-neutral-800 border border-neutral-700 px-6 py-2 rounded-lg hover:bg-neutral-700 transition disabled:opacity-50"
        >
          {pulling ? 'Refreshing...' : '🔄 Refresh Report'}
        </button>
      </div>

      {reportData.score_breakdown && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Credit Score Breakdown</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(reportData.score_breakdown).map(([key, value]: [string, any]) => (
              <div key={key}>
                <div className="text-neutral-400 text-sm mb-1">{value.label}</div>
                <div className={`text-2xl font-bold ${value.status === 'excellent' ? 'text-green-400' : value.status === 'good' ? 'text-blue-400' : 'text-yellow-400'}`}>
                  {value.percentage}%
                </div>
                <div className="text-xs text-neutral-500">{value.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Credit Accounts</h3>
          {accounts.length > 0 ? (
            <div className="space-y-4">
              {accounts.slice(0, 5).map((account: any, idx: number) => {
                const utilization = (account.balance / account.limit) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{account.name || 'Credit Account'}</span>
                      <span className="text-neutral-400">
                        ${account.balance?.toLocaleString()} / ${account.limit?.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${utilization < 30 ? 'bg-green-500' : utilization < 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{width: `${Math.min(utilization, 100)}%`}}
                      ></div>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {utilization.toFixed(0)}% utilization • {utilization < 30 ? 'Excellent' : utilization < 50 ? 'Good' : 'Needs attention'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-neutral-400 text-sm">No active credit accounts found.</p>
          )}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Credit Inquiries</h3>
          {inquiries.length > 0 ? (
            <div className="space-y-3 text-sm">
              {inquiries.slice(0, 5).map((inquiry: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{inquiry.name} ({inquiry.type})</span>
                  <span className="text-neutral-500">{inquiry.date}</span>
                </div>
              ))}
              <p className="text-xs text-neutral-400 mt-4">
                Soft inquiries shown do not affect your credit score.
              </p>
            </div>
          ) : (
            <p className="text-neutral-400 text-sm">No recent credit inquiries.</p>
          )}
        </div>
      </div>

      {reportData.recommendations && reportData.recommendations.length > 0 && (
        <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">Recommended Actions</h3>
          <ul className="space-y-2 text-neutral-300">
            {reportData.recommendations.map((rec: string, idx: number) => (
              <li key={idx}>• {rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="mt-8 pt-8 border-t border-neutral-800">
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/dashboard"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">Back to Dashboard</h3>
            <p className="text-sm text-neutral-400">Return to your main bankability overview</p>
          </Link>

          <Link
            href="/roadmap"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">See Your Roadmap</h3>
            <p className="text-sm text-neutral-400">Step-by-step path to improve your bankability</p>
          </Link>

          <Link
            href="/funding"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">Explore Funding Options</h3>
            <p className="text-sm text-neutral-400">Discover matched lenders and products</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
