export default function AdminLenders() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Lender Management</h1>
      <p className="text-neutral-400 mb-8">Manage partner lenders and matching algorithms</p>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Active Lenders</div>
          <div className="text-4xl font-bold text-white">18</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Pending Applications</div>
          <div className="text-4xl font-bold text-yellow-400">156</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Loans Funded (MTD)</div>
          <div className="text-4xl font-bold text-green-400">42</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Approval Rate</div>
          <div className="text-4xl font-bold text-white">68%</div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Partner Lenders</h3>
        <div className="space-y-3">
          {[
            { name: 'Community Development Fund', type: 'CDFI', loans: '24', rate: '85%' },
            { name: 'Alternative Business Capital', type: 'Alternative', loans: '18', rate: '72%' },
            { name: 'Regional Business Bank', type: 'Traditional', loans: '12', rate: '58%' },
          ].map((lender, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold">{lender.name}</div>
                <div className="text-sm text-neutral-400">{lender.type} Lender</div>
              </div>
              <div className="text-center mr-6">
                <div className="text-xs text-neutral-400">Loans Funded</div>
                <div className="font-bold">{lender.loans}</div>
              </div>
              <div className="text-center mr-6">
                <div className="text-xs text-neutral-400">Approval Rate</div>
                <div className="font-bold text-green-400">{lender.rate}</div>
              </div>
              <button className="text-green-400 hover:underline text-sm">Manage</button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">No Silent Denials Compliance</h3>
        <p className="text-neutral-300 text-sm">
          All partner lenders have agreed to provide specific feedback for every declined application. 
          Monitor compliance and lender performance metrics.
        </p>
      </div>
    </div>
  );
}
