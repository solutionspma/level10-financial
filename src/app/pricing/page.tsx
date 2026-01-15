import Image from 'next/image';

export default function Pricing() {
  const coreFeatures = [
    'Readiness snapshot',
    'Educational insights',
    'Basic credit monitoring',
    'Community support',
  ];

  const proFeatures = [
    'Identity validation',
    'Full credit analysis with Level10 Score',
    'Unlimited credit refreshes',
    'Personalized improvement roadmap',
    'Lender matching & prequalification',
    'Real-time monitoring & alerts',
    'Document vault',
    'Priority coaching signals',
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-64 mb-12 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Success"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-neutral-200">Choose the plan that fits your funding journey</p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Core Plan */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 flex flex-col">
          <div className="text-green-400 text-sm font-semibold mb-3">LEVEL10 CORE</div>
          <div className="flex items-baseline mb-4">
            <span className="text-5xl font-bold text-white">$10</span>
            <span className="text-xl text-neutral-400 ml-2">/month</span>
          </div>
          <p className="text-neutral-300 mb-6">
            Perfect for business owners who want to understand their funding readiness baseline.
          </p>
          
          <div className="mb-8 flex-1">
            <div className="space-y-3">
              {coreFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-neutral-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="/register?plan=core" className="block text-center bg-neutral-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-neutral-700 transition">
            Start with Core
          </a>
          <p className="text-xs text-neutral-500 mt-3 text-center">No setup fee • Cancel anytime</p>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-green-900/30 to-neutral-900 border-2 border-green-500 rounded-2xl p-8 flex flex-col relative">
          <div className="absolute top-0 right-8 -mt-3">
            <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
          </div>
          
          <div className="text-green-400 text-sm font-semibold mb-3">LEVEL10 PRO</div>
          <div className="flex items-baseline mb-2">
            <span className="text-5xl font-bold text-white">$29</span>
            <span className="text-xl text-neutral-400 ml-2">/month</span>
          </div>
          <div className="text-sm text-neutral-400 mb-4">
            + $25 one-time Readiness Setup
          </div>
          <p className="text-neutral-300 mb-6">
            Full platform access with identity validation, ongoing monitoring, and lender matching.
          </p>
          
          <div className="mb-8 flex-1">
            <div className="space-y-3">
              {proFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-neutral-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="/register?plan=pro" className="block text-center bg-green-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition">
            Start with Pro
          </a>
          <p className="text-xs text-neutral-400 mt-3 text-center">$25 setup charged once • Cancel anytime</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h3 className="font-bold mb-2">What's included in the $25 Readiness Setup?</h3>
            <p className="text-neutral-400 text-sm">
              The one-time setup fee covers identity validation, initial credit analysis with industry-leading credit bureaus, 
              and establishing your baseline Level10 Score. This is charged only once when you start Pro.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h3 className="font-bold mb-2">Can I upgrade from Core to Pro later?</h3>
            <p className="text-neutral-400 text-sm">
              Yes! You can upgrade anytime. The $25 setup fee applies when you upgrade to Pro. 
              Your Core subscription ends and Pro begins immediately.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h3 className="font-bold mb-2">What's the difference in credit monitoring?</h3>
            <p className="text-neutral-400 text-sm">
              Core gives you a monthly readiness snapshot. Pro includes unlimited credit refreshes, 
              real-time monitoring, and alerts when changes impact your bankability.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h3 className="font-bold mb-2">Do lenders pay anything?</h3>
            <p className="text-neutral-400 text-sm">
              No. Lenders join free by invite and earn a 5% commission on funded loans. 
              Level10 only succeeds when you fund borrowers.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-neutral-400">
        <p>Questions? <a href="/contact" className="text-green-400 hover:underline">Contact us</a> or check our <a href="/how-it-works" className="text-green-400 hover:underline">FAQ</a></p>
      </div>
    </div>
  );
}
