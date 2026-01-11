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
  funding_purpose: string;
  status: string;
  created_at: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function LenderApplications() {
  const { user } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<BorrowerApplication[]>([]);
  const [filteredApps, setFilteredApps] = useState<BorrowerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'lender') {
      router.push('/dashboard');
    } else if (user.lenderStatus !== 'active') {
      router.push('/lender/dashboard');
    } else {
      loadApplications();
    }
  }, [user, router]);

  const loadApplications = async () => {
    if (!user?.id) return;
    
    try {
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
      setFilteredApps(apps);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = (status: string) => {
    setActiveFilter(status);
    if (status === 'all') {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter(app => app.status === status));
    }
  };

  const getStatusCounts = () => {
    return {
      all: applications.length,
      new: applications.filter(a => a.status === 'new').length,
      contacted: applications.filter(a => a.status === 'contacted').length,
      in_review: applications.filter(a => a.status === 'in_review').length,
      funded: applications.filter(a => a.status === 'funded').length,
      declined: applications.filter(a => a.status === 'declined').length,
    };
  };

  if (!user || user.role !== 'lender' || user.lenderStatus !== 'active') {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center text-neutral-400">Loading applications...</div>
      </div>
    );
  }

  const counts = getStatusCounts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Applications</h1>
        <p className="text-neutral-400">Review and manage borrower applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button 
          onClick={() => filterApplications('all')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
            activeFilter === 'all' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          All ({counts.all})
        </button>
        <button 
          onClick={() => filterApplications('new')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
            activeFilter === 'new' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          New ({counts.new})
        </button>
        <button 
          onClick={() => filterApplications('contacted')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
            activeFilter === 'contacted' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          Contacted ({counts.contacted})
        </button>
        <button 
          onClick={() => filterApplications('in_review')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
            activeFilter === 'in_review' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          In Review ({counts.in_review})
        </button>
        <button 
          onClick={() => filterApplications('funded')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
            activeFilter === 'funded' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          Funded ({counts.funded})
        </button>
        <button 
          onClick={() => filterApplications('declined')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
            activeFilter === 'declined' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          Declined ({counts.declined})
        </button>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-bold mb-2">No Applications</h3>
          <p className="text-neutral-400">
            {activeFilter === 'all' 
              ? 'No borrower applications yet. They will appear here once borrowers complete their Level10 qualification.'
              : `No applications with status "${activeFilter}".`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => {
            const initials = app.business_name 
              ? app.business_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              : 'B';
            
            return (
              <div key={app.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {initials}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold truncate">{app.business_name || 'Business Name Not Provided'}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        app.status === 'new' ? 'bg-green-500/20 text-green-400' :
                        app.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                        app.status === 'in_review' ? 'bg-yellow-500/20 text-yellow-400' :
                        app.status === 'funded' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {app.status === 'in_review' ? 'In Review' : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <div className="text-neutral-400">Level10 Score</div>
                        <div className="font-semibold text-green-400">{app.bankability_score?.toFixed(1) || '—'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Credit Score</div>
                        <div className="font-semibold">{app.credit_score || '—'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Industry</div>
                        <div className="font-semibold truncate">{app.industry || 'Not specified'}</div>
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
                  
                  <Link
                    href={`/lender/application/${app.id}`}
                    className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition whitespace-nowrap"
                  >
                    Review
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
