export default function AdminAnalytics() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-neutral-400 mb-8">Platform performance and user insights</p>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Total Users</div>
          <div className="text-4xl font-bold text-white">2,847</div>
          <div className="text-xs text-green-400">+124 this month</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Avg Score Improvement</div>
          <div className="text-4xl font-bold text-green-400">+28</div>
          <div className="text-xs text-neutral-400">points in 90 days</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Funding Success Rate</div>
          <div className="text-4xl font-bold text-white">68%</div>
          <div className="text-xs text-green-400">+5% vs last month</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Churn Rate</div>
          <div className="text-4xl font-bold text-white">3.2%</div>
          <div className="text-xs text-green-400">Industry: 5-7%</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">User Engagement</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">Daily Active Users</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Avg Session Duration</span>
              <span className="font-semibold">12m 34s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Tasks Completed (Today)</span>
              <span className="font-semibold">342</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Education Lessons Viewed</span>
              <span className="font-semibold">89</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Revenue Metrics</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">MRR</span>
              <span className="font-semibold text-green-400">$28,470</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">ARR</span>
              <span className="font-semibold">$341,640</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Customer LTV</span>
              <span className="font-semibold">$840</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">CAC</span>
              <span className="font-semibold">$120</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Credit Score Distribution</h3>
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-400">8%</div>
            <div className="text-xs text-neutral-400">300-579</div>
            <div className="text-xs text-neutral-500">Poor</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">18%</div>
            <div className="text-xs text-neutral-400">580-669</div>
            <div className="text-xs text-neutral-500">Fair</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">42%</div>
            <div className="text-xs text-neutral-400">670-739</div>
            <div className="text-xs text-neutral-500">Good</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">24%</div>
            <div className="text-xs text-neutral-400">740-799</div>
            <div className="text-xs text-neutral-500">Very Good</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">8%</div>
            <div className="text-xs text-neutral-400">800-850</div>
            <div className="text-xs text-neutral-500">Excellent</div>
          </div>
        </div>
      </div>
    </div>
  );
}
