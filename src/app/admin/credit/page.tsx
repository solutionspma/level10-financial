export default function AdminCredit() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Credit Oversight</h1>
      <p className="text-neutral-400 mb-8">Monitor credit pulls and FCRA compliance</p>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Credit Pulls (Today)</div>
          <div className="text-4xl font-bold text-white">47</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Credit Pulls (Month)</div>
          <div className="text-4xl font-bold text-white">1,284</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Active Authorizations</div>
          <div className="text-4xl font-bold text-green-400">2,801</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Disputes</div>
          <div className="text-4xl font-bold text-yellow-400">3</div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Credit Pulls</h3>
        <div className="space-y-3">
          {[
            { user: 'Jason Smith', bureau: 'Experian', score: '705', timestamp: '2 min ago' },
            { user: 'Sarah Johnson', bureau: 'TransUnion', score: '682', timestamp: '15 min ago' },
            { user: 'Mike Davis', bureau: 'Equifax', score: '658', timestamp: '1 hour ago' },
          ].map((pull, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-neutral-950 rounded-lg text-sm">
              <span className="font-medium">{pull.user}</span>
              <span className="text-neutral-400">{pull.bureau}</span>
              <span className="font-semibold">Score: {pull.score}</span>
              <span className="text-neutral-500">{pull.timestamp}</span>
              <span className="text-green-400">✓ Authorized</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">FCRA Compliance Monitoring</h3>
        <p className="text-neutral-300 text-sm mb-4">
          All credit pulls logged and monitored for permissible purpose compliance. 
          Audit trail maintained for regulatory review.
        </p>
        <button className="text-blue-400 hover:underline text-sm">View Audit Log →</button>
      </div>
    </div>
  );
}
