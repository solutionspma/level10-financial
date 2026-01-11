'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface BorrowerApplication {
  id: string;
  user_id: string;
  business_name: string;
  industry: string;
  revenue: number;
  bankability_score: number;
  credit_score: number;
  funding_requested: number;
  status: string;
  created_at: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function LenderDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<BorrowerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    funded: 0,
  });

  useEffect(() => {
    // Redirect if not a lender
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'lender') {
      router.push('/dashboard');
    } else if (user.lenderStatus === 'active') {
      loadApplications();
    }
  }, [user, router]);

  const loadApplications = async () => {
    if (!user?.id) return;
    
    try {
      // Load borrower applications (you'll need to create this table)
      const { data, error } = await supabase
        .from('borrower_applications')
        .select(`
          *,
          user:users!borrower_applications_user_id_fkey (
            name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error && error.code !== 'PGRST116') throw error;

      const apps = data || [];
      setApplications(apps);

      // Calculate stats
      setStats({
        total: apps.length,
        new: apps.filter(a => a.status === 'new').length,
        contacted: apps.filter(a => a.status === 'contacted').length,
        funded: apps.filter(a => a.status === 'funded').length,
      });
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'lender') {
    return null;
  }

  // Show pending approval message if lender is not active
  if (user.lenderStatus !== 'active') {
    return (
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-neutral-900 border border-yellow-500/30 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Awaiting Admin Approval</h1>
          <p className="text-lg text-neutral-400 mb-6">
            Your lender application is under review by our admin team. You will receive an email notification once your account has been approved.
          </p>
          
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Admin team reviews your application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>You receive approval confirmation email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Access to full lender dashboard unlocked</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Start receiving qualified borrower matches</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-neutral-500 mt-8">
            Questions? Contact support at <a href="mailto:support@level10.financial" className="text-green-400 hover:underline">support@level10.financial</a>
          </p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center text-neutral-400">Loading applications...</div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Lender Dashboard</h1>
        <p className="text-xl text-neutral-400">
          Welcome back, {user.organizationName || user.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Total Applications</div>
          <div className="text-4xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">New Matches</div>
          <div className="text-4xl font-bold text-green-400">{stats.new}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Contacted</div>
          <div className="text-4xl font-bold text-blue-400">{stats.contacted}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Funded</div>
          <div className="text-4xl font-bold text-purple-400">{stats.funded}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/lender/applications"
          className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group"
        >
          <div className="text-3xl mb-3">📋</div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">All Applications</h3>
          <p className="text-sm text-neutral-400">View and manage all borrower applications</p>
        </Link>

        <Link
          href="/lender/commissions"
          className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group"
        >
          <div className="text-3xl mb-3">💰</div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">Commissions</h3>
          <p className="text-sm text-neutral-400">Track your earnings and funded loans</p>
        </Link>

        <Link
          href="/profile"
          className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group"
        >
          <div className="text-3xl mb-3">⚙️</div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">Profile Settings</h3>
          <p className="text-sm text-neutral-400">Update your lending criteria and info</p>
        </Link>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">No Applications Yet</h3>
            <p className="text-neutral-400 text-lg mb-8">
              When borrowers complete their Level10 pre-qualification and match your lending criteria, their applications will appear here.
            </p>

            <p className="text-sm text-neutral-500">
              Approved borrowers see no SSNs, no full credit reports, just Level10 Scores and business info to help you decide who to contact.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-2xl font-bold">Recent Applications</h2>
          </div>
          <div className="divide-y divide-neutral-800">
            {applications.slice(0, 5).map((app) => (
              <Link
                key={app.id}
                href={`/lender/application/${app.id}`}
                className="block p-6 hover:bg-neutral-800 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold">{app.business_name || 'Unnamed Business'}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'new' ? 'bg-green-500/20 text-green-400' :
                        app.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                        app.status === 'funded' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-neutral-700 text-neutral-300'
                      }`}>
                        {app.status === 'new' ? 'New Match' : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-neutral-400">Level10 Score</div>
                        <div className="font-semibold text-green-400">{app.bankability_score?.toFixed(1) || '—'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Industry</div>
                        <div className="font-semibold">{app.industry || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Funding Request</div>
                        <div className="font-semibold">${(app.funding_requested || 0).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Applied</div>
                        <div className="font-semibold">{new Date(app.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          {applications.length > 5 && (
            <div className="p-6 border-t border-neutral-800 text-center">
              <Link href="/lender/applications" className="text-green-400 hover:text-green-300 font-semibold">
                View All {applications.length} Applications →
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

  // Show pending approval message if lender is not active
  if (user.lenderStatus !== 'active') {
    return (
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-neutral-900 border border-yellow-500/30 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Awaiting Admin Approval</h1>
          <p className="text-lg text-neutral-400 mb-6">
            Your lender application is under review by our admin team. You will receive an email notification once your account has been approved.
          </p>
          
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Admin team reviews your application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>You receive approval confirmation email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Access to full lender dashboard unlocked</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Start receiving qualified borrower matches</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-neutral-500 mt-8">
            Questions? Contact support at <a href="mailto:support@level10.financial" className="text-green-400 hover:underline">support@level10.financial</a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Lender Dashboard Is Live</h1>
            <p className="text-xl text-neutral-400">
              Qualified borrower profiles will appear here once applicants match your criteria.
            </p>
          </div>
        </div>
      </div>

      {/* Lender Info Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Lending Profile</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-neutral-400 mb-1">Organization</p>
            <p className="text-lg font-semibold">{user.organizationName}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400 mb-1">Lender Type</p>
            <p className="text-lg font-semibold capitalize">{user.lenderType}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400 mb-1">States Served</p>
            <p className="text-lg font-semibold">{user.statesServed}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400 mb-1">Products Offered</p>
            <p className="text-lg font-semibold">{user.productsOffered}</p>
          </div>
        </div>
      </div>

      {/* Empty State - No Borrowers Yet */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">No Borrower Matches Yet</h3>
          <p className="text-neutral-400 text-lg mb-8">
            When applicants complete the Level10 pre-qualification process and match your lending criteria, their profiles will appear here. You&apos;ll see their bankability score, business details, and contact information — but <strong className="text-white">no SSNs, no full credit reports, and no consumer dashboards</strong>.
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className={`bg-neutral-950 border border-neutral-700 rounded-lg p-6 text-left transition ${
              user.lenderStatus === 'active' ? 'hover:border-green-500 cursor-pointer' : 'opacity-60 cursor-not-allowed'
            }`}>
              <h4 className="font-semibold mb-2">Define Your Products</h4>
              <p className="text-sm text-neutral-400">Set loan amounts, terms, and rates for each product you offer.</p>
              {user.lenderStatus !== 'active' && (
                <p className="text-xs text-yellow-500 mt-2">Available after approval</p>
              )}
            </div>
            <div className={`bg-neutral-950 border border-neutral-700 rounded-lg p-6 text-left transition ${
              user.lenderStatus === 'active' ? 'hover:border-green-500 cursor-pointer' : 'opacity-60 cursor-not-allowed'
            }`}>
              <h4 className="font-semibold mb-2">Set Matching Criteria</h4>
              <p className="text-sm text-neutral-400">Configure minimum scores, revenue, credit thresholds, and more.</p>
              {user.lenderStatus !== 'active' && (
                <p className="text-xs text-yellow-500 mt-2">Available after approval</p>
              )}
            </div>
            <div className={`bg-neutral-950 border border-neutral-700 rounded-lg p-6 text-left transition ${
              user.lenderStatus === 'active' ? 'hover:border-green-500 cursor-pointer' : 'opacity-60 cursor-not-allowed'
            }`}>
              <h4 className="font-semibold mb-2">Manage Preferences</h4>
              <p className="text-sm text-neutral-400">Control email notifications and dashboard settings.</p>
              {user.lenderStatus !== 'active' && (
                <p className="text-xs text-yellow-500 mt-2">Available after approval</p>
              )}
            </div>
          </div>

          {/* Coming Soon Note */}
          <div className="mt-8 pt-8 border-t border-neutral-800">
            <p className="text-sm text-neutral-500">
              🚧 Product setup and matching criteria tools coming soon. For now, contact <a href="mailto:support@level10.financial" className="text-green-500 hover:underline">support@level10.financial</a> to configure your preferences.
            </p>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="mt-12 bg-neutral-950 border border-neutral-700 rounded-xl p-8">
        <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
        <div className="space-y-4 text-neutral-300">
          <div className="flex gap-4">
            <span className="text-green-500 font-bold">1.</span>
            <p>A Level10 admin will review your lender profile and activate your account (typically within 24 hours).</p>
          </div>
          <div className="flex gap-4">
            <span className="text-green-500 font-bold">2.</span>
            <p>Once approved, borrowers who match your criteria will begin appearing on this dashboard.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-green-500 font-bold">3.</span>
            <p>You&apos;ll receive email notifications when new qualified matches are available.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-green-500 font-bold">4.</span>
            <p>You decide who to contact — no obligation, no upfront fees. Level10 earns a 5% commission only when you successfully fund a loan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
