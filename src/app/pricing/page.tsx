import Image from 'next/image';

export default function Pricing() {
  const features = [
    'Real-time credit analysis',
    'Level10 Bankability Score',
    'Personalized improvement tasks',
    'Lender matching & prequalification',
    'Business credit tracking',
    'Financial coaching resources',
    'Monthly progress reports',
    'Priority support',
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
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
            <p className="text-xl text-neutral-200">Everything you need to become bankable</p>
          </div>
        </div>
      </div>

      {/* Pricing Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-900/30 to-neutral-900 border-2 border-green-500 rounded-2xl p-10 text-center">
          <div className="text-green-400 text-sm font-semibold mb-3">MONTHLY SUBSCRIPTION</div>
          <div className="flex items-baseline justify-center mb-6">
            <span className="text-6xl font-bold text-white">$10</span>
            <span className="text-2xl text-neutral-400 ml-2">/month</span>
          </div>
          <p className="text-xl text-neutral-300 mb-8">
            Full access to your Bankability Dashboard, Credit Coaching, Funding Readiness, Business Credit Suite, and Lender Matching.
          </p>
          
          <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-3 text-left">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-neutral-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="/register" className="inline-block bg-green-500 text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition">
            Get Started Now
          </a>
          <p className="text-sm text-neutral-400 mt-4">Just $10/month. Cancel anytime.</p>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-400">
          <p>Questions? <a href="/contact" className="text-green-400 hover:underline">Contact us</a> or check our <a href="/how-it-works" className="text-green-400 hover:underline">FAQ</a></p>
        </div>
      </div>
    </div>
  );
}
