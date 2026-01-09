import Link from 'next/link';

export default function Roadmap() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Your Bankability Roadmap</h1>
      <p className="text-neutral-400 mb-8">Step-by-step path to loan approval</p>

      <div className="space-y-6">
        <div className="bg-green-900 border border-green-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Phase 1: Foundation (Complete)</h3>
              <ul className="space-y-1 text-neutral-200">
                <li>✓ Credit report accessed and analyzed</li>
                <li>✓ Level10 score generated</li>
                <li>✓ Initial improvement plan created</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900 border border-yellow-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Phase 2: Credit Repair (In Progress)</h3>
              <ul className="space-y-2 text-neutral-200">
                <li className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span>Dispute incorrect late payment</span>
                  <span className="text-xs text-yellow-300">(In dispute)</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Reduce credit utilization below 30%</span>
                  <span className="text-xs text-yellow-300">(3 weeks)</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Set up automatic payments for all accounts</span>
                </li>
              </ul>
              <div className="mt-4 text-sm text-neutral-300">
                Estimated completion: 45 days • Estimated score impact: +25 points
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-neutral-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Phase 3: Documentation</h3>
              <ul className="space-y-2 text-neutral-300">
                <li>□ Upload 2 years of business tax returns</li>
                <li>□ Provide 3 months of business bank statements</li>
                <li>□ Complete business credit profile</li>
                <li>□ Upload proof of business registration</li>
              </ul>
              <div className="mt-4 text-sm text-neutral-400">
                Unlocks after Phase 2 completion
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-neutral-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Phase 4: Lender Matching</h3>
              <ul className="space-y-2 text-neutral-300">
                <li>□ Review matched lender options</li>
                <li>□ Complete pre-qualification applications</li>
                <li>□ Schedule lender consultations</li>
              </ul>
              <div className="mt-4 text-sm text-neutral-400">
                Unlocks after Phase 3 completion
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-neutral-600 text-white rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Phase 5: Approval & Funding</h3>
              <ul className="space-y-2 text-neutral-300">
                <li>□ Submit formal loan applications</li>
                <li>□ Review and negotiate terms</li>
                <li>□ Close and receive funding</li>
              </ul>
              <div className="mt-4 text-sm text-neutral-400">
                Final phase - your goal destination
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">Your Progress</h3>
        <div className="w-full bg-neutral-800 rounded-full h-3 mb-2">
          <div className="bg-blue-500 h-3 rounded-full" style={{width: '35%'}}></div>
        </div>
        <p className="text-sm text-neutral-300">35% complete • On track for lender matching in 6-8 weeks</p>
      </div>

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
            href="/credit"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">View Full Credit Analysis</h3>
            <p className="text-sm text-neutral-400">Deep dive into your credit profile and scores</p>
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
