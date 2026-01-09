import Link from 'next/link';

export default function Credit() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Credit Analysis</h1>
      <p className="text-neutral-400 mb-8">Comprehensive breakdown of your credit profile</p>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Credit Score Breakdown</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div>
            <div className="text-neutral-400 text-sm mb-1">Payment History</div>
            <div className="text-2xl font-bold text-yellow-400">35%</div>
            <div className="text-xs text-neutral-500">Needs Improvement</div>
          </div>
          <div>
            <div className="text-neutral-400 text-sm mb-1">Credit Utilization</div>
            <div className="text-2xl font-bold text-green-400">15%</div>
            <div className="text-xs text-neutral-500">Excellent</div>
          </div>
          <div>
            <div className="text-neutral-400 text-sm mb-1">Credit Age</div>
            <div className="text-2xl font-bold text-green-400">15%</div>
            <div className="text-xs text-neutral-500">Good</div>
          </div>
          <div>
            <div className="text-neutral-400 text-sm mb-1">Account Mix</div>
            <div className="text-2xl font-bold text-blue-400">10%</div>
            <div className="text-xs text-neutral-500">Fair</div>
          </div>
          <div>
            <div className="text-neutral-400 text-sm mb-1">New Credit</div>
            <div className="text-2xl font-bold text-green-400">10%</div>
            <div className="text-xs text-neutral-500">Good</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Credit Accounts</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Chase Freedom</span>
                <span className="text-neutral-400">$2,400 / $10,000</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '24%'}}></div>
              </div>
              <div className="text-xs text-neutral-500 mt-1">24% utilization • Excellent</div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Discover Card</span>
                <span className="text-neutral-400">$4,200 / $8,000</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '52%'}}></div>
              </div>
              <div className="text-xs text-neutral-500 mt-1">52% utilization • Needs attention</div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Credit Inquiries</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Auto loan inquiry (soft)</span>
              <span className="text-neutral-500">2 weeks ago</span>
            </div>
            <div className="flex justify-between">
              <span>Level10 analysis (soft)</span>
              <span className="text-neutral-500">1 month ago</span>
            </div>
            <p className="text-xs text-neutral-400 mt-4">
              All inquiries shown are soft pulls that don't affect your score.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">Recommended Actions</h3>
        <ul className="space-y-2 text-neutral-300">
          <li>• Pay down Discover Card to below 30% utilization (+18 point estimated impact)</li>
          <li>• Dispute late payment on Auto Loan from 2023 (if inaccurate)</li>
          <li>• Request credit limit increase on Chase Freedom (improves utilization ratio)</li>
        </ul>
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
            href="/roadmap"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 hover:border-green-500 transition group text-center"
          >
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition">See Your Roadmap</h3>
            <p className="text-sm text-neutral-400">Step-by-step path to improve your bankability</p>
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
