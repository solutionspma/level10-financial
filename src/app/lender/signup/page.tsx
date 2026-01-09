'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LenderSignupPage() {
  const router = useRouter();
  const { updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    lenderType: '' as 'bank' | 'cdfi' | 'fintech' | 'private' | '',
    statesServed: '',
    productsOffered: '',
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Store lender data temporarily in session
    sessionStorage.setItem('lender_signup_data', JSON.stringify(formData));
    
    // Redirect to agreement
    router.push('/lender/agreement');
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Become a Lending Partner</h1>
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
