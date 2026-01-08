export default function BusinessCredit() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Business Credit Suite</h1>
      <p className="text-neutral-400 mb-8">Build and monitor your business credit profile</p>

      <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Business Credit Score</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-blue-400 text-sm mb-1">Dun & Bradstreet</div>
            <div className="text-4xl font-bold text-white">72</div>
            <div className="text-xs text-neutral-300">PAYDEX Score</div>
          </div>
          <div>
            <div className="text-blue-400 text-sm mb-1">Experian Business</div>
            <div className="text-4xl font-bold text-white">68</div>
            <div className="text-xs text-neutral-300">Intelliscore Plus</div>
          </div>
          <div>
            <div className="text-blue-400 text-sm mb-1">Equifax Business</div>
            <div className="text-4xl font-bold text-white">N/A</div>
            <div className="text-xs text-neutral-300">Not yet established</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Business Accounts</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Office Depot Trade Line</span>
                <span className="text-green-400">Reporting</span>
              </div>
              <p className="text-xs text-neutral-400">$2,500 limit • Pay in 30 days • Strong payment history</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Grainger Industrial</span>
                <span className="text-green-400">Reporting</span>
              </div>
              <p className="text-xs text-neutral-400">$5,000 limit • Net 45 terms • Excellent standing</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Uline</span>
                <span className="text-yellow-400">Pending</span>
              </div>
              <p className="text-xs text-neutral-400">Application submitted • Awaiting approval</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Recommended Trade Lines</h3>
          <div className="space-y-3">
            <div className="p-3 bg-neutral-800 rounded-lg">
              <div className="font-medium mb-1">Quill Business Supplies</div>
              <p className="text-xs text-neutral-400 mb-2">Net-30 vendor • Reports to D&B • Easy approval</p>
              <button className="text-xs bg-green-500 text-black px-3 py-1 rounded">Apply Now</button>
            </div>
            <div className="p-3 bg-neutral-800 rounded-lg">
              <div className="font-medium mb-1">Crown Office Furniture</div>
              <p className="text-xs text-neutral-400 mb-2">Net-30 vendor • Reports to Experian • Strong reputation</p>
              <button className="text-xs bg-green-500 text-black px-3 py-1 rounded">Apply Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Business Credit Builder Plan</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 text-black rounded-full flex items-center justify-center text-xs font-bold">✓</div>
            <span className="text-neutral-300">Register business with D&B and obtain DUNS number</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 text-black rounded-full flex items-center justify-center text-xs font-bold">✓</div>
            <span className="text-neutral-300">Open business bank account and establish EIN</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <span className="text-neutral-300">Establish 3-5 starter vendor trade lines (In Progress)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-neutral-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <span className="text-neutral-400">Apply for business credit card (Unlocks at 80 PAYDEX)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-neutral-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
            <span className="text-neutral-400">Scale to 10+ reporting trade lines</span>
          </div>
        </div>
      </div>
    </div>
  );
}
