import Image from 'next/image';

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Admin dashboard"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Level 10 Admin</h1>
            <p className="text-lg text-neutral-200">Platform management and oversight</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Total Users</div>
          <div className="text-4xl font-bold text-white">2,847</div>
          <div className="text-xs text-green-400">+124 this month</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Active Lenders</div>
          <div className="text-4xl font-bold text-white">18</div>
          <div className="text-xs text-neutral-400">Verified partners</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Applications</div>
          <div className="text-4xl font-bold text-white">156</div>
          <div className="text-xs text-yellow-400">42 pending review</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">MRR</div>
          <div className="text-4xl font-bold text-white">$28K</div>
          <div className="text-xs text-green-400">+18% growth</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <a href="/admin/users" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              Manage Users →
            </a>
            <a href="/admin/credit" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              Credit Oversight →
            </a>
            <a href="/admin/lenders" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              Lender Management →
            </a>
            <a href="/admin/documents" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              Document Review →
            </a>
            <a href="/admin/analytics" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              Analytics Dashboard →
            </a>
            <a href="/admin/ai" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              AI Configuration →
            </a>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-300">New user signup</span>
              <span className="text-neutral-500">2 min ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-300">Lender approved application</span>
              <span className="text-neutral-500">15 min ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-300">Credit pull authorized</span>
              <span className="text-neutral-500">1 hour ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-300">Document uploaded</span>
              <span className="text-neutral-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">Compliance Status</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-neutral-400 mb-1">FCRA Compliance</div>
            <div className="text-green-400 font-semibold">✓ Active</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">Credit Bureau Integration</div>
            <div className="text-yellow-400 font-semibold">⚠ Pending</div>
          </div>
          <div>
            <div className="text-neutral-400 mb-1">SOC 2 Certification</div>
            <div className="text-green-400 font-semibold">✓ Valid</div>
          </div>
        </div>
      </div>
    </div>
  );
}
