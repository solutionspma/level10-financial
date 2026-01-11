'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface InviteCode {
  id: string;
  code: string;
  max_uses: number;
  current_uses: number;
  is_active: boolean;
  expires_at: string | null;
  notes: string;
  created_at: string;
}

interface InviteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminInviteCodes() {
  const { user } = useAuth();
  const router = useRouter();
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [inviteRequests, setInviteRequests] = useState<InviteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'codes' | 'requests'>('codes');

  // New code form
  const [newCode, setNewCode] = useState('');
  const [newCodeMaxUses, setNewCodeMaxUses] = useState(10);
  const [newCodeNotes, setNewCodeNotes] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push('/dashboard');
    } else {
      loadData();
    }
  }, [user, router]);

  const loadData = async () => {
    try {
      const [codesResult, requestsResult] = await Promise.all([
        supabase.from('lender_invite_codes').select('*').order('created_at', { ascending: false }),
        supabase.from('lender_invite_requests').select('*').order('created_at', { ascending: false })
      ]);

      if (codesResult.data) setInviteCodes(codesResult.data);
      if (requestsResult.data) setInviteRequests(requestsResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from('lender_invite_codes').insert({
        code: newCode.toUpperCase(),
        max_uses: newCodeMaxUses,
        notes: newCodeNotes,
        is_active: true
      });

      if (error) throw error;

      alert('Invite code created successfully!');
      setNewCode('');
      setNewCodeNotes('');
      loadData();
    } catch (error: any) {
      alert('Error creating code: ' + error.message);
    }
  };

  const toggleCodeStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('lender_invite_codes')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      alert('Error updating code status');
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('lender_invite_requests')
        .update({ 
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id
        })
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      alert('Error updating request status');
    }
  };

  if (!user || user.role !== 'admin') return null;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center text-neutral-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Lender Invite Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('codes')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeTab === 'codes' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          Invite Codes ({inviteCodes.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeTab === 'requests' ? 'bg-green-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          Invite Requests ({inviteRequests.filter(r => r.status === 'pending').length} pending)
        </button>
      </div>

      {/* Invite Codes Tab */}
      {activeTab === 'codes' && (
        <div>
          {/* Create New Code */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Create New Invite Code</h2>
            <form onSubmit={handleCreateCode} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Code *</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 font-mono"
                    placeholder="LAUNCH2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Uses *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newCodeMaxUses}
                    onChange={(e) => setNewCodeMaxUses(parseInt(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <input
                    type="text"
                    value={newCodeNotes}
                    onChange={(e) => setNewCodeNotes(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                    placeholder="For partners..."
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Create Code
              </button>
            </form>
          </div>

          {/* Codes List */}
          <div className="space-y-4">
            {inviteCodes.map((code) => (
              <div key={code.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <code className="text-2xl font-bold text-green-400">{code.code}</code>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        code.is_active ? 'bg-green-500/20 text-green-400' : 'bg-neutral-700 text-neutral-400'
                      }`}>
                        {code.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-neutral-400">Uses</div>
                        <div className="font-semibold">{code.current_uses} / {code.max_uses}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Created</div>
                        <div className="font-semibold">{new Date(code.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-neutral-400">Notes</div>
                        <div className="font-semibold">{code.notes || '—'}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleCodeStatus(code.id, code.is_active)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      code.is_active 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {code.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {inviteRequests.length === 0 ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">📬</div>
              <h3 className="text-2xl font-bold mb-2">No Requests Yet</h3>
              <p className="text-neutral-400">Lender invite requests will appear here.</p>
            </div>
          ) : (
            inviteRequests.map((request) => (
              <div key={request.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">{request.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        request.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <div className="text-neutral-400">Email</div>
                        <div className="font-semibold">{request.email}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Phone</div>
                        <div className="font-semibold">{request.phone || '—'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Company</div>
                        <div className="font-semibold">{request.company || '—'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Requested</div>
                        <div className="font-semibold">{new Date(request.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    {request.message && (
                      <div className="bg-neutral-950 rounded-lg p-4">
                        <div className="text-neutral-400 text-sm mb-1">Message</div>
                        <div className="text-sm">{request.message}</div>
                      </div>
                    )}
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateRequestStatus(request.id, 'approved')}
                        className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateRequestStatus(request.id, 'rejected')}
                        className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-500/30 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
