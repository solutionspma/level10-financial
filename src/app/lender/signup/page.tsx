'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LenderSignupPage() {
  const router = useRouter();
  const { updateUser } = useAuth();
  
  const [step, setStep] = useState<'invite' | 'welcome' | 'form' | 'request'>('invite');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [validatingCode, setValidatingCode] = useState(false);
  
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    lenderType: '' as 'bank' | 'cdfi' | 'fintech' | 'private' | '',
    statesServed: '',
    productsOffered: '',
  });
  
  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const handleValidateInviteCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidatingCode(true);
    setInviteError('');

    try {
      const response = await fetch('/api/validate-invite-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: inviteCode })
      });

      const data = await response.json();

      if (data.valid) {
        // Store the validated code for later use
        sessionStorage.setItem('lender_invite_code', inviteCode.toUpperCase());
        setStep('welcome');
      } else {
        setInviteError(data.error || 'Invalid invite code');
      }
    } catch (error) {
      setInviteError('Failed to validate invite code. Please try again.');
    } finally {
      setValidatingCode(false);
    }
  };

  const handleRequestInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInviteError('');

    try {
      const response = await fetch('/api/request-invite-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (data.success) {
        setRequestSuccess(true);
      } else {
        setInviteError(data.error || 'Failed to submit request');
      }
    } catch (error) {
      setInviteError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Store lender data temporarily in session
    const dataWithInvite = {
      ...formData,
      inviteCode: sessionStorage.getItem('lender_invite_code')
    };
    sessionStorage.setItem('lender_signup_data', JSON.stringify(dataWithInvite));
    
    // Redirect to agreement
    router.push('/lender/agreement');
  };


  // Invite Code Step
  if (step === 'invite') {
    return (
      <section className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-4xl font-bold mb-4">Lender Partner Access</h1>
          <p className="text-xl text-neutral-400">
            Enter your invite code to continue. Don&apos;t have one? Request access below.
          </p>
        </div>

        <form onSubmit={handleValidateInviteCode} className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Invite Code *</label>
            <input
              type="text"
              required
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value.toUpperCase());
                setInviteError('');
              }}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-center text-2xl font-mono tracking-wider focus:outline-none focus:border-green-500 transition"
              placeholder="Enter Code"
              maxLength={20}
            />
            {inviteError && (
              <p className="text-red-400 text-sm mt-2">⚠️ {inviteError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={validatingCode || !inviteCode}
            className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {validatingCode ? 'Validating...' : 'Continue'}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setStep('request')}
              className="text-green-400 hover:text-green-300 transition text-sm"
            >
              Don&apos;t have an invite code? Request one →
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>Already have an account? <a href="/login" className="text-green-400 hover:underline">Sign in</a></p>
        </div>
      </section>
    );
  }

  // Welcome Step - Show value proposition
  if (step === 'welcome') {
    return (
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-5xl font-bold mb-4">Welcome to Level10 Lending</h1>
          <p className="text-2xl text-neutral-400">
            You&apos;re joining an exclusive network of forward-thinking lenders
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Here&apos;s What You Get</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Pre-Qualified Leads</h3>
              <p className="text-neutral-400">
                Only see borrowers who meet your exact criteria. No time wasted on unqualified applications.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Level10 Bankability Score</h3>
              <p className="text-neutral-400">
                Our proprietary scoring system analyzes real credit data and tells you exactly what needs fixing.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-2">5% Commission on Funded Loans</h3>
              <p className="text-neutral-400">
                Zero upfront costs. Level10 only earns when you successfully fund. We&apos;re aligned with your success.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-xl font-bold mb-2">No Silent Denials</h3>
              <p className="text-neutral-400">
                Every borrower gets feedback. You choose to approve, coach, or pass — but they always know why.
              </p>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>⚡</span> The Level10 Advantage
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Borrowers come ready:</strong> Credit pulled, documents uploaded, KYC verified</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Smart matching:</strong> See only businesses in your service area and product range</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Built-in coaching:</strong> Help borrowers improve before applying (or send them back with a roadmap)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Zero risk:</strong> No fees, no subscriptions. Commission-only after funding.</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={() => setStep('form')}
              className="bg-green-500 text-black px-12 py-4 rounded-lg font-bold text-xl hover:bg-green-600 transition"
            >
              Get Started →
            </button>
            <p className="text-sm text-neutral-500 mt-4">Takes less than 2 minutes • No payment required</p>
          </div>
        </div>
      </section>
    );
  }

  // Request Invite Step
  if (step === 'request') {
    if (requestSuccess) {
      return (
        <section className="max-w-2xl mx-auto px-6 py-20">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold mb-4">Request Submitted!</h2>
            <p className="text-neutral-400 mb-6">
              We&apos;ve received your request for a lender invite code. Our team will review your application and send you an invite code within 24 hours.
            </p>
            <p className="text-sm text-neutral-500 mb-8">
              Check your email at <span className="text-white font-semibold">{requestData.email}</span>
            </p>
            <button
              onClick={() => {
                setStep('invite');
                setRequestSuccess(false);
                setRequestData({ name: '', email: '', phone: '', company: '', message: '' });
              }}
              className="bg-green-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Back to Login
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Request Lender Access</h1>
          <p className="text-xl text-neutral-400">
            Tell us about yourself and we&apos;ll send you an invite code to join as a lending partner.
          </p>
        </div>

        <form onSubmit={handleRequestInvite} className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <input
                type="text"
                required
                value={requestData.name}
                onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Work Email *</label>
              <input
                type="email"
                required
                value={requestData.email}
                onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="jane@yourbank.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={requestData.phone}
                onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company/Organization *</label>
              <input
                type="text"
                required
                value={requestData.company}
                onChange={(e) => setRequestData({ ...requestData, company: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="First National Bank"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tell us about your lending operation</label>
              <textarea
                rows={4}
                value={requestData.message}
                onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="What types of business loans do you offer? What states do you serve?"
              />
            </div>

            {inviteError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">⚠️ {inviteError}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                setStep('invite');
                setInviteError('');
              }}
              className="text-neutral-400 hover:text-white transition"
            >
              ← Back to Invite Code
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Request Invite Code'}
            </button>
          </div>
        </form>
      </section>
    );
  }

  // Original Form Step (after invite code validated)
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">✓</div>
          <h1 className="text-4xl font-bold">Become a Lending Partner</h1>
        </div>
        <p className="text-xl text-neutral-400">
          Tell us about your organization. No password required yet — we&apos;ll create your account after you review the agreement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
        <div className="space-y-6">
          {/* Organization Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Organization Name *</label>
            <input
              type="text"
              required
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              placeholder="First National Bank"
            />
          </div>

          {/* Contact Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Contact Name *</label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              placeholder="Jane Smith"
            />
          </div>

          {/* Work Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Work Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              placeholder="jane@firstnationalbank.com"
            />
            <p className="text-sm text-neutral-500 mt-1">
              We&apos;ll send partnership details to this address
            </p>
          </div>

          {/* Lender Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Lender Type *</label>
            <select
              required
              value={formData.lenderType}
              onChange={(e) => setFormData({ ...formData, lenderType: e.target.value as any })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
            >
              <option value="">Select type</option>
              <option value="bank">Bank</option>
              <option value="cdfi">CDFI</option>
              <option value="fintech">Fintech</option>
              <option value="private">Private Lender</option>
            </select>
          </div>

          {/* States Served */}
          <div>
            <label className="block text-sm font-medium mb-2">States Served *</label>
            <input
              type="text"
              required
              value={formData.statesServed}
              onChange={(e) => setFormData({ ...formData, statesServed: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              placeholder="CA, TX, NY (or 'All 50 states')"
            />
          </div>

          {/* Products Offered */}
          <div>
            <label className="block text-sm font-medium mb-2">Products Offered *</label>
            <textarea
              required
              rows={3}
              value={formData.productsOffered}
              onChange={(e) => setFormData({ ...formData, productsOffered: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              placeholder="Business lines of credit, term loans, SBA 7(a), etc."
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-neutral-400 hover:text-white transition"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Continue to Agreement'}
          </button>
        </div>
      </form>

      {/* Trust Signals */}
      <div className="mt-8 text-center text-sm text-neutral-500">
        <p>No password required at this stage • No payment information needed • Review agreement before activation</p>
      </div>
    </section>
  );
}
