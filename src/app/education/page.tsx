export default function Education() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Financial Education</h1>
      <p className="text-neutral-400 mb-8">Learn the fundamentals of credit, funding, and bankability</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900 to-green-950 border border-green-800 rounded-xl p-6">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-xl font-semibold text-white mb-2">24 Lessons</h3>
          <p className="text-neutral-300 text-sm">Comprehensive credit and funding curriculum</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 rounded-xl p-6">
          <div className="text-4xl mb-3">🎓</div>
          <h3 className="text-xl font-semibold text-white mb-2">8 Completed</h3>
          <p className="text-neutral-300 text-sm">You're making great progress</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-800 rounded-xl p-6">
          <div className="text-4xl mb-3">⏱️</div>
          <h3 className="text-xl font-semibold text-white mb-2">~30 min each</h3>
          <p className="text-neutral-300 text-sm">Bite-sized, actionable lessons</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Module 1: Credit Fundamentals</h2>
          <div className="space-y-3">
            <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                <div>
                  <div className="font-semibold text-white">Understanding Your Credit Score</div>
                  <div className="text-sm text-neutral-300">Completed • 25 minutes</div>
                </div>
              </div>
            </div>

            <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                <div>
                  <div className="font-semibold text-white">The 5 Factors That Impact Your Score</div>
                  <div className="text-sm text-neutral-300">Completed • 30 minutes</div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <div className="font-semibold text-white">Credit Utilization Strategies</div>
                  <div className="text-sm text-neutral-400">Not started • 28 minutes</div>
                </div>
              </div>
              <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Start</button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Module 2: Credit Repair</h2>
          <div className="space-y-3">
            <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                <div>
                  <div className="font-semibold text-white">Reading Your Credit Report</div>
                  <div className="text-sm text-neutral-300">Completed • 35 minutes</div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <div className="font-semibold text-white">How to Dispute Credit Errors</div>
                  <div className="text-sm text-neutral-400">Recommended next • 40 minutes</div>
                </div>
              </div>
              <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Start</button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Module 3: Business Credit</h2>
          <div className="space-y-3">
            <div className="bg-neutral-900 border border-neutral-700 opacity-50 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center text-sm">🔒</div>
                <div>
                  <div className="font-semibold text-neutral-400">Building Business Credit from Scratch</div>
                  <div className="text-sm text-neutral-500">Unlocks after Module 2 completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">Why Education Matters</h3>
        <p className="text-neutral-300 text-sm">
          Understanding credit and funding isn't just about getting approved—it's about building 
          long-term financial health. Every lesson you complete makes you more bankable and better 
          equipped to manage your business finances.
        </p>
      </div>
    </div>
  );
}
