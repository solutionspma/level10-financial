export default function LenderApplicationDetail() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <a href="/lender/applications" className="text-green-400 hover:underline text-sm">← Back to Applications</a>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Acme Construction LLC</h1>
          <p className="text-neutral-400">Application submitted Jan 5, 2026</p>
        </div>
        <span className="bg-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-full">UNDER REVIEW</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900 to-green-950 border border-green-800 rounded-xl p-6">
          <div className="text-sm text-green-400 mb-1">Level10 Score</div>
          <div className="text-5xl font-bold text-white">8.2</div>
          <div className="text-xs text-neutral-300">Strong bankability</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Credit Score</div>
          <div className="text-5xl font-bold text-white">705</div>
          <div className="text-xs text-neutral-300">Good</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Requested Amount</div>
          <div className="text-5xl font-bold text-white">$125K</div>
          <div className="text-xs text-neutral-300">Working capital</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Business Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">Business Name:</span>
              <span className="text-white">Acme Construction LLC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Industry:</span>
              <span className="text-white">Construction</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Years in Business:</span>
              <span className="text-white">5 years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Annual Revenue:</span>
              <span className="text-white">$850K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Employees:</span>
              <span className="text-white">12</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Documents</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-neutral-950 rounded">
              <span>Business Tax Returns (2y)</span>
              <a href="#" className="text-green-400 hover:underline">View</a>
            </div>
            <div className="flex items-center justify-between p-2 bg-neutral-950 rounded">
              <span>Bank Statements (3m)</span>
              <a href="#" className="text-green-400 hover:underline">View</a>
            </div>
            <div className="flex items-center justify-between p-2 bg-neutral-950 rounded">
              <span>P&L Statement</span>
              <a href="#" className="text-green-400 hover:underline">View</a>
            </div>
            <div className="flex items-center justify-between p-2 bg-neutral-950 rounded">
              <span>Business License</span>
              <a href="#" className="text-green-400 hover:underline">View</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Credit Analysis</h3>
        <div className="grid md:grid-cols-5 gap-4 text-sm">
          <div>
            <div className="text-neutral-400 mb-1">Payment History</div>
            <div className="text-2xl font-bold text-green-400">Excellent</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">Utilization</div>
            <div className="text-2xl font-bold text-green-400">22%</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">Credit Age</div>
            <div className="text-2xl font-bold text-blue-400">8 years</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">Delinquencies</div>
            <div className="text-2xl font-bold text-green-400">0</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">Collections</div>
            <div className="text-2xl font-bold text-green-400">0</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">Level10 Recommendation</h3>
        <p className="text-neutral-300 mb-4">
          <strong>APPROVE</strong> - This applicant demonstrates strong creditworthiness and business fundamentals. 
          Revenue is stable, payment history is excellent, and debt-to-income ratio is healthy.
        </p>
        <p className="text-sm text-neutral-400">
          Suggested terms: $125K at 8.5% over 5 years
        </p>
      </div>

      <div className="flex gap-4">
        <button className="bg-green-500 text-black px-8 py-3 rounded-lg font-semibold text-lg">
          Approve Application
        </button>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg">
          Provide Coaching Feedback
        </button>
        <button className="border border-neutral-700 px-8 py-3 rounded-lg text-lg">
          Request More Info
        </button>
      </div>
    </div>
  );
}
