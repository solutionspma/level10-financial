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

    // Create lender account
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
      lenderStatus: 'pending',
    });

    // Clear signup data
    sessionStorage.removeItem('lender_signup_data');

    // Redirect to lender dashboard
    router.push('/lender/dashboard');
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
          Please review the agreement below. Once accepted, your lender account will be activated.
        </p>
      </div>

      {/* Agreement Text */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-8 max-h-96 overflow-y-auto">
        <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-4">
          <h2 className="text-lg font-bold text-white">Level10 Lender Participation Agreement</h2>
          
          <p><strong>Effective Date:</strong> Upon Acceptance</p>
          
          <p><strong>Parties:</strong> Level10 Financial, Inc. ("Level10") and the Participating Lender ("Lender")</p>
          
          <h3 className="text-md font-semibold text-white mt-6">1. Purpose and Scope</h3>
          <p>
            This agreement governs the Lender&apos;s participation in the Level10 Financial platform (the "Platform"), which connects pre-qualified borrower applicants with lending partners based on defined lending criteria. Level10 provides borrower identity verification, soft credit pulls, and bankability assessments. The Lender receives borrower profiles that match their stated criteria and may choose to engage with those borrowers directly.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">2. No Obligation to Lend</h3>
          <p>
            Participation in the Platform does not obligate the Lender to make any loans, extend credit, or enter into agreements with any borrower. All lending decisions remain entirely at the Lender&apos;s discretion.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">3. Borrower Data and Privacy</h3>
          <p>
            Level10 provides the Lender with borrower profiles containing name, email, phone, business information, and bankability scores derived from soft credit inquiries. The Lender agrees to:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Use borrower data solely for evaluating lending opportunities presented through the Platform.</li>
            <li>Not share, sell, or distribute borrower data to third parties without explicit written consent from Level10 and the borrower.</li>
            <li>Maintain reasonable data security measures to protect borrower information.</li>
            <li>Comply with all applicable federal and state privacy laws, including but not limited to the Gramm-Leach-Bliley Act (GLBA) and state consumer privacy statutes.</li>
          </ul>
          
          <h3 className="text-md font-semibold text-white mt-6">4. Fair Credit Reporting Act (FCRA) Compliance</h3>
          <p>
            Level10 performs soft credit inquiries as a Consumer Reporting Agency (CRA) in compliance with the Fair Credit Reporting Act (FCRA). The Lender acknowledges that:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Borrower profiles provided by Level10 do not include full consumer credit reports.</li>
            <li>If the Lender wishes to obtain a full credit report, the Lender must do so independently and in compliance with FCRA, including obtaining the borrower&apos;s written authorization.</li>
            <li>The Lender is solely responsible for compliance with FCRA in connection with any credit decisions or adverse actions taken.</li>
          </ul>
          
          <h3 className="text-md font-semibold text-white mt-6">5. Equal Credit Opportunity Act (ECOA) and Anti-Discrimination</h3>
          <p>
            The Lender agrees to comply with the Equal Credit Opportunity Act (ECOA) and all other applicable anti-discrimination laws. The Lender will not discriminate against any borrower on the basis of race, color, religion, national origin, sex, marital status, age, or any other protected class.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">6. Fees and Payment Terms</h3>
          <p>
            Lender participation in the Platform may be subject to subscription fees, per-lead fees, or success fees as agreed upon separately in writing. Payment terms will be specified in a separate fee schedule or statement of work.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">7. Term and Termination</h3>
          <p>
            This agreement begins upon acceptance and continues until terminated by either party with 30 days&apos; written notice. Upon termination, the Lender must cease using the Platform and delete or return any borrower data received through the Platform, except as required by law or regulation.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">8. Limitation of Liability</h3>
          <p>
            Level10 provides the Platform and borrower profiles "as is" and makes no warranties regarding the creditworthiness, accuracy, or completeness of borrower information. The Lender assumes all risk associated with lending decisions. Level10&apos;s total liability under this agreement shall not exceed the fees paid by the Lender in the preceding 12 months.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">9. Indemnification</h3>
          <p>
            The Lender agrees to indemnify and hold harmless Level10 from any claims, damages, or liabilities arising from the Lender&apos;s use of the Platform, lending decisions, or non-compliance with applicable laws.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">10. Governing Law</h3>
          <p>
            This agreement shall be governed by the laws of the State of Delaware, without regard to conflict of law principles.
          </p>
          
          <h3 className="text-md font-semibold text-white mt-6">11. Entire Agreement</h3>
          <p>
            This agreement constitutes the entire understanding between Level10 and the Lender regarding participation in the Platform and supersedes all prior agreements or understandings, whether written or oral.
          </p>
          
          <p className="mt-6 text-neutral-400 italic">
            By clicking "Activate Lender Account" below, you acknowledge that you have read, understood, and agree to be bound by this Lender Participation Agreement.
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
            I agree to the Level10 Lender Participation Agreement on behalf of <strong>{signupData.organizationName}</strong>
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
          {loading ? 'Activating...' : 'Activate Lender Account'}
        </button>
      </div>
    </section>
  );
}
