export default function AdminAI() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">AI Configuration</h1>
      <p className="text-neutral-400 mb-8">Configure AI-powered credit analysis and recommendations</p>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Level10 Score Algorithm</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Credit Score Weight</label>
            <input type="range" min="0" max="100" defaultValue="40" className="w-full" />
            <div className="text-sm text-neutral-400 mt-1">40% weighting</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Payment History Weight</label>
            <input type="range" min="0" max="100" defaultValue="25" className="w-full" />
            <div className="text-sm text-neutral-400 mt-1">25% weighting</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Business Metrics Weight</label>
            <input type="range" min="0" max="100" defaultValue="20" className="w-full" />
            <div className="text-sm text-neutral-400 mt-1">20% weighting</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Document Completeness Weight</label>
            <input type="range" min="0" max="100" defaultValue="15" className="w-full" />
            <div className="text-sm text-neutral-400 mt-1">15% weighting</div>
          </div>
        </div>
        <button className="mt-6 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Save Algorithm</button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Recommendation Engine</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Auto-generate improvement tasks based on credit analysis</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Prioritize tasks by estimated score impact</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Match users to lenders based on approval probability</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" />
            <span className="text-sm">Send weekly AI-generated progress reports</span>
          </label>
        </div>
        <button className="mt-6 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Save Settings</button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Lender Matching Algorithm</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-neutral-300">Minimum Level10 Score for matching</span>
            <input type="number" defaultValue="6.0" step="0.1" className="bg-neutral-950 border border-neutral-700 rounded px-3 py-1 w-24" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-300">Maximum pending applications per user</span>
            <input type="number" defaultValue="3" className="bg-neutral-950 border border-neutral-700 rounded px-3 py-1 w-24" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-300">Re-match frequency (days)</span>
            <input type="number" defaultValue="30" className="bg-neutral-950 border border-neutral-700 rounded px-3 py-1 w-24" />
          </div>
        </div>
        <button className="mt-6 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Save Settings</button>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">AI Model Performance</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-neutral-400 mb-1">Score Prediction Accuracy</div>
            <div className="text-2xl font-bold text-white">94.2%</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">Task Completion Rate</div>
            <div className="text-2xl font-bold text-white">78%</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">Lender Match Success</div>
            <div className="text-2xl font-bold text-white">68%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
