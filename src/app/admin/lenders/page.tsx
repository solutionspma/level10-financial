'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function AdminLenders() {
  const { user } = useAuth();
  const router = useRouter();
  const [pendingLenders, setPendingLenders] = useState<any[]>([]);
  const [activeLenders, setActiveLenders] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    // Load lenders from localStorage
    const allUsers = Object.keys(localStorage)
      .filter(key => key.startsWith('user_'))
      .map(key => JSON.parse(localStorage.getItem(key) || '{}'))
      .filter(u => u.role === 'lender');

    setPendingLenders(allUsers.filter(l => l.lenderStatus === 'pending_admin_review'));
    setActiveLenders(allUsers.filter(l => l.lenderStatus === 'active'));
  }, [user, router]);

  const handleApprove = (lenderId: string) => {
    const lenderKey = `user_${lenderId}`;
    const lender = JSON.parse(localStorage.getItem(lenderKey) || '{}');
    lender.lenderStatus = 'active';
    localStorage.setItem(lenderKey, JSON.stringify(lender));
    
    // Refresh lists
    setPendingLenders(prev => prev.filter(l => l.id !== lenderId));
    setActiveLenders(prev => [...prev, lender]);
  };

  const handleReject = (lenderId: string) => {
    const lenderKey = `user_${lenderId}`;
    const lender = JSON.parse(localStorage.getItem(lenderKey) || '{}');
    lender.lenderStatus = 'rejected';
    localStorage.setItem(lenderKey, JSON.stringify(lender));
    
    setPendingLenders(prev => prev.filter(l => l.id !== lenderId));
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Lender Management</h1>
      <p className="text-neutral-400 mb-8">Review and approve pending lender applications</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-900 border border-yellow-800 rounded-xl p-6">
          <div className="text-sm text-yellow-400 mb-1">Pending Review</div>
          <div className="text-4xl font-bold text-white">{pendingLenders.length}</div>
        </div>

        <div className="bg-green-900 border border-green-800 rounded-xl p-6">
          <div className="text-sm text-green-400 mb-1">Active Lenders</div>
          <div className="text-4xl font-bold text-white">{activeLenders.length}</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Total Commission (5%)</div>
          <div className="text-2xl font-bold text-white">On funded deals only</div>
        </div>
      </div>

      {/* Pending Lenders */}
      {pendingLenders.length > 0 && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">⏳ Pending Lender Applications</h3>
          <div className="space-y-3">
            {pendingLenders.map((lender) => (
              <div key={lender.id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg border border-yellow-500/30">
                <div className="flex-1">
                  <div className="font-semibold text-lg">{lender.organizationName}</div>
                  <div className="text-sm text-neutral-400 mt-1">
                    <span className="capitalize">{lender.lenderType}</span> · {lender.statesServed} · {lender.productsOffered}
                  </div>
                  <div className="text-sm text-neutral-500 mt-1">Contact: {lender.name} ({lender.email})</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(lender.id)}
                    className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(lender.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-red-400 px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Lenders */}
      {activeLenders.length > 0 && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">✅ Active Partner Lenders</h3>
          <div className="space-y-3">
            {activeLenders.map((lender) => (
              <div key={lender.id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold">{lender.organizationName}</div>
                  <div className="text-sm text-neutral-400 capitalize">{lender.lenderType} Lender · {lender.statesServed}</div>
                </div>
                <div className="text-sm text-green-400">Active</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Silent Denials Policy */}
      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">🎯 No Silent Denials Compliance</h3>
        <p className="text-neutral-300 text-sm mb-3">
          All partner lenders have agreed to:
        </p>
        <ul className="list-disc list-inside text-sm text-neutral-300 space-y-1">
          <li>Approve, conditionally approve, or coach to approval</li>
          <li>Never silently deny applications</li>
          <li>Provide specific coaching feedback when not approving</li>
          <li>Pay 5% commission on successfully funded loans only</li>
        </ul>
      </div>
    </div>
  );
}
