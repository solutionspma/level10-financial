export default function LenderCommissions() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Commission Reports</h1>
      <p className="text-neutral-400 mb-8">Track your earnings and funded loans</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900 to-green-950 border border-green-800 rounded-xl p-6">
          <div className="text-sm text-green-400 mb-1">Total Commissions (2026)</div>
          <div className="text-4xl font-bold text-white">$48,250</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Loans Funded</div>
          <div className="text-4xl font-bold text-white">24</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Avg Commission</div>
          <div className="text-4xl font-bold text-white">$2,010</div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Commissions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-lg">
            <div>
              <div className="font-semibold">Acme Construction LLC</div>
              <div className="text-sm text-neutral-400">$125K loan • Funded Jan 4, 2026</div>
            </div>
            <div className="text-green-400 font-bold">$2,500</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-lg">
            <div>
              <div className="font-semibold">Bright Ideas Marketing</div>
              <div className="text-sm text-neutral-400">$50K loan • Funded Jan 2, 2026</div>
            </div>
            <div className="text-green-400 font-bold">$1,000</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-lg">
            <div>
              <div className="font-semibold">Delta Logistics</div>
              <div className="text-sm text-neutral-400">$75K loan • Funded Dec 28, 2025</div>
            </div>
            <div className="text-green-400 font-bold">$1,500</div>
          </div>
        </div>

        <button className="mt-4 text-green-400 hover:underline text-sm">Download Full Report →</button>
      </div>
    </div>
  );
}
