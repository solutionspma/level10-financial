'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LenderAgreementPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState<any>(null);

  useEffect(() => {
    // Retrieve signup data from session
    const data = sessionStorage.getItem('lender_signup_data');
    if (!data) {
      router.push('/lender/signup');
      return;
    }
    setSignupData(JSON.parse(data));
  }, [router]);

  const handleActivate = async () => {
    if (!agreed || !signupData) return;
    
    setLoading(true);

    try {
      // Track invite code usage before creating account
      const inviteCode = signupData.inviteCode;
      if (inviteCode) {
        // Note: In a real implementation, this would increment usage count
        // For now, we'll just store it with the user
        console.log('Lender used invite code:', inviteCode);
      }

      // Create lender account with pending status
      login({
        id: Math.random().toString(36).substr(2, 9),
        email: signupData.email,
        name: signupData.contactName,
        role: 'lender',
        kycStatus: 'verified',
        hasAuthorizedCredit: true,
        organizationName: signupData.organizationName,
        lenderType: signupData.lenderType,
        statesServed: signupData.statesServed,
        productsOffered: signupData.productsOffered,
        agreementAccepted: true,
        lenderStatus: 'pending', // Set to pending for admin review
        inviteCodeUsed: inviteCode,
      });

      // Clear signup data and invite code
      sessionStorage.removeItem('lender_signup_data');
      sessionStorage.removeItem('lender_invite_code');

      // Redirect to verification pending page
      router.push('/verification-pending');
    } catch (error) {
      console.error('Error activating lender account:', error);
      setLoading(false);
    }
  };
  };

  if (!signupData) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-neutral-400">Loading...</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Lender Participation Agreement</h1>
        <p className="text-xl text-neutral-400">
          Please review the agreement below. Your account will be submitted for admin review upon acceptance.
        </p>
      </div>

      {/* Agreement Text */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-8 max-h-96 overflow-y-auto">
        <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-4">
          <h2 className="text-lg font-bold text-white">Level10 Lender Participation Agreement</h2>
          
          <p><strong>Effective Date:</strong> Upon Acceptance</p>
          
          <p><strong>Parties:</strong> Level10 Financial, Inc. ("Level10") and the Participating Lender ("Lender")</p>
          
          <h3 className="text-md font-semibold text-white mt-6">1. Purpose</h3>
          <p>
            Level10 operates a bankability and borrower readiness platform. Borrowers are prepared and coached prior to lender review. Level10 routes applicants who are aligned with lender criteria and consented for review.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">2. No Upfront Fees</h3>
          <p>
            There are <strong>no subscription fees, tiers, or upfront costs</strong> for lenders to participate in Level10.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">3. Commission on Funded Deals</h3>
          <p>
            Lender agrees to pay <strong>a commission equal to five percent (5%) of the funded loan amount</strong> for each loan funded through the Level10 platform.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Commission is due <strong>only upon successful funding</strong></li>
            <li>No commission is owed on declined or withdrawn applications</li>
          </ul>
          
          <h3 className="text-md font-semibold text-white mt-6">4. Approval or Coaching Requirement</h3>
          <p>
            Lender agrees to one of the following outcomes for each routed borrower:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Approval</li>
            <li>Conditional approval</li>
            <li>Coaching to approval</li>
          </ul>
          <p className="mt-2">
            <strong>Silent denials are not permitted.</strong>
          </p>
          <p className="mt-2">
            If a borrower is not approved, lender must provide a coaching reason indicating what must change for approval to be possible.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">5. Permissible Purpose (FCRA)</h3>
          <p>
            All borrower information is accessed solely for permissible purposes under the Fair Credit Reporting Act (FCRA), including credit evaluation and prequalification.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">6. Data Scope</h3>
          <p>Level10 provides:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Soft-pull credit insights</li>
            <li>Borrower-submitted financial data</li>
            <li>Identity verification status (when authorized)</li>
          </ul>
          <p className="mt-3">Level10 does not provide:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Full credit reports without consent</li>
            <li>SSNs unless explicitly authorized</li>
            <li>Any data beyond borrower permission</li>
          </ul>
          
          <h3 className="text-md font-semibold text-white mt-6">7. No Obligation to Fund</h3>
          <p>
            Lender is under no obligation to approve or fund any borrower.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">8. Feedback Loop</h3>
          <p>
            Lender feedback will be used to improve borrower readiness and platform matching. This feedback does not obligate lender to future approvals.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">9. Termination</h3>
          <p>
            Either party may terminate participation at any time.
          </p>
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 bg-neutral-950 border-2 border-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500 checked:bg-green-500 checked:border-green-500 transition"
          />
          <span className="text-base group-hover:text-white transition">
            I agree to the Level10 Lender Participation Agreement
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-neutral-400 hover:text-white transition"
        >
          ← Back to Signup
        </button>
        <button
          onClick={handleActivate}
          disabled={!agreed || loading}
          className="bg-green-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit for Review'}
        </button>
      </div>
    </section>
  );
}
