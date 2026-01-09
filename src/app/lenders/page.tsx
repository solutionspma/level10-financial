import Image from 'next/image';
import Link from 'next/link';

export default function LendersPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="mb-8 rounded-2xl overflow-hidden h-64 relative">
        <Image
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Lender partnership"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent"></div>
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              Get Pre-Qualified Borrowers<br />
              <span className="text-green-400">Not Applications That Go Nowhere</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Subheadline */}
      <div className="max-w-3xl mb-16">
        <p className="text-2xl text-neutral-300 mb-8">
          Level10 prepares borrowers before they reach you and documents exactly why they&apos;re ready — or what&apos;s missing.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="text-green-400 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-3">No Silent Denials</h3>
          <p className="text-neutral-400">
            Every decline comes with clear reasoning. Borrowers know what to fix, and you don&apos;t waste time on repeat unqualified applications.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="text-green-400 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-3">Soft-Pull Insights Only</h3>
          <p className="text-neutral-400">
            See bankability scores and readiness indicators without triggering hard inquiries. No impact on borrower credit during screening.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="text-green-400 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-3">Identity Verified When Required</h3>
          <p className="text-neutral-400">
            KYC/KYB verification happens before final application. You receive pre-verified applicants aligned to your requirements.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="text-green-400 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-3">Clear Decline Reasons Captured</h3>
          <p className="text-neutral-400">
            Your feedback improves borrower readiness over time. The platform learns what works for your criteria and routes better matches.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="text-green-400 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-3">Zero Obligation to Fund</h3>
          <p className="text-neutral-400">
            Participation does not obligate you to approve any applicant. All lending decisions remain solely at your discretion.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="text-green-400 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-3">FCRA Compliant Platform</h3>
          <p className="text-neutral-400">
            All data access is permissible purpose certified. Borrower consent is captured before any information is shared with lenders.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-green-900/30 to-neutral-900 border border-green-800 rounded-xl p-10 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How Level10 Works for Lenders</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Define Your Criteria</h4>
              <p className="text-neutral-400">
                Set products, minimum requirements, and geographic preferences. We route applicants based on your specifications.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Receive Qualified Profiles</h4>
              <p className="text-neutral-400">
                Borrowers appear in your dashboard only after credit authorization, bankability analysis, and readiness scoring.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Review &amp; Decide</h4>
              <p className="text-neutral-400">
                Access borrower profiles, soft-pull insights, and readiness documentation. Approve, request more info, or decline with reasoning.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Provide Feedback</h4>
              <p className="text-neutral-400">
                Your feedback helps borrowers understand what to fix and improves future match quality for your organization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Receive Qualified Borrowers?</h2>
        <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
          Join Level10 as a lending partner. No cost to participate. No obligation to fund. Better deal flow starts here.
        </p>
        <Link
          href="/lender/signup"
          className="inline-block bg-green-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition"
        >
          Become a Lending Partner
        </Link>
        <p className="text-sm text-neutral-500 mt-4">
          Questions? <a href="/contact" className="text-green-400 hover:underline">Contact us</a>
        </p>
      </div>
    </section>
  );
}
