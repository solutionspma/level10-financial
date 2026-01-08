import Image from 'next/image';

export default function LenderPortal() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Lender portal"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Lender Portal</h1>
            <p className="text-lg text-neutral-200">Review applicants, approve or coach—no silent denials</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">New Applications</div>
          <div className="text-4xl font-bold text-white">12</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Under Review</div>
          <div className="text-4xl font-bold text-yellow-400">8</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Approved</div>
          <div className="text-4xl font-bold text-green-400">24</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Coached</div>
          <div className="text-4xl font-bold text-blue-400">6</div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Applications</h2>
          <a href="/lender/applications" className="text-green-400 hover:underline text-sm">View All →</a>
        </div>

        <div className="space-y-4">
          <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div>
                <div className="font-semibold">Acme Construction LLC</div>
                <div className="text-sm text-neutral-400">
                  $125K request • Level10 Score: 8.2 • Credit: 705
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Review</button>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <div>
                <div className="font-semibold">Bright Ideas Marketing</div>
                <div className="text-sm text-neutral-400">
                  $50K request • Level10 Score: 7.4 • Credit: 682
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Review</button>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div>
                <div className="font-semibold">Creative Solutions Inc</div>
                <div className="text-sm text-neutral-400">
                  $200K request • Level10 Score: 6.8 • Credit: 658
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Review</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <a href="/lender/applications" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              View All Applications →
            </a>
            <a href="/lender/commissions" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              Commission Reports →
            </a>
            <a href="#" className="block p-3 bg-neutral-950 rounded-lg hover:bg-neutral-800 transition">
              Update Lending Criteria →
            </a>
          </div>
        </div>

        <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">No Silent Denials Policy</h3>
          <p className="text-neutral-300 text-sm">
            As a Level10 partner lender, you've committed to providing specific feedback to every 
            applicant. If you can't approve, provide coaching on what needs improvement.
          </p>
        </div>
      </div>
    </div>
  );
}
