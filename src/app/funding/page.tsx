export default function Funding() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Funding Options</h1>
      <p className="text-neutral-400 mb-8">Lenders matched to your bankability profile</p>

      <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6 mb-8">
        <h3 className="text-yellow-400 font-semibold mb-2">🎯 Funding Readiness: 73%</h3>
        <p className="text-neutral-300 text-sm">
          You're close to optimal approval odds. Complete 4 more roadmap tasks to unlock premium lender matches.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-green-900 border border-green-700 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Community Development Lender</h3>
              <p className="text-neutral-300 text-sm">Small business loans • Mission-driven • Coaching included</p>
            </div>
            <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">STRONG MATCH</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-neutral-400 text-xs">Loan Amount</div>
              <div className="text-white font-semibold">$25K - $250K</div>
            </div>
            <div>
              <div className="text-neutral-400 text-xs">Interest Rate</div>
              <div className="text-white font-semibold">7.5% - 12%</div>
            </div>
            <div>
              <div className="text-neutral-400 text-xs">Term</div>
              <div className="text-white font-semibold">3 - 7 years</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Apply Now</button>
            <button className="border border-green-700 px-6 py-2 rounded-lg">View Details</button>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Alternative Business Lender</h3>
              <p className="text-neutral-300 text-sm">Revenue-based financing • Fast approval • Flexible terms</p>
            </div>
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">GOOD MATCH</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-neutral-400 text-xs">Loan Amount</div>
              <div className="text-white font-semibold">$10K - $500K</div>
            </div>
            <div>
              <div className="text-neutral-400 text-xs">Factor Rate</div>
              <div className="text-white font-semibold">1.15 - 1.40</div>
            </div>
            <div>
              <div className="text-neutral-400 text-xs">Payback</div>
              <div className="text-white font-semibold">6 - 18 months</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-neutral-700 text-white px-6 py-2 rounded-lg font-semibold">Pre-Qualify</button>
            <button className="border border-neutral-600 px-6 py-2 rounded-lg">Learn More</button>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 opacity-60">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Traditional Bank (SBA 7a)</h3>
              <p className="text-neutral-300 text-sm">Best rates • Strict requirements • Longer process</p>
            </div>
            <span className="bg-neutral-600 text-white text-xs font-bold px-3 py-1 rounded-full">LOCKED</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-neutral-400 text-xs">Loan Amount</div>
              <div className="text-neutral-500 font-semibold">$50K - $5M</div>
            </div>
            <div>
              <div className="text-neutral-400 text-xs">Interest Rate</div>
              <div className="text-neutral-500 font-semibold">6% - 9%</div>
            </div>
            <div>
              <div className="text-neutral-400 text-xs">Term</div>
              <div className="text-neutral-500 font-semibold">10 - 25 years</div>
            </div>
          </div>
          <p className="text-sm text-neutral-400">
            🔒 Complete roadmap Phase 3 to unlock this option (requires 700+ credit score)
          </p>
        </div>
      </div>

      <div className="mt-8 bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">No Silent Denials Guarantee</h3>
        <p className="text-neutral-300 text-sm">
          Every lender in our network agrees to either approve your application OR provide specific coaching 
          on what needs improvement. You'll never face a silent rejection.
        </p>
      </div>
    </div>
  );
}
