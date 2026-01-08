import Image from 'next/image';

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Hero Image */}
      <div className="mb-8 rounded-2xl overflow-hidden h-64 relative">
        <Image
          src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Business success"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
      </div>

      <h1 className="text-5xl font-extrabold mb-6">
        Become Bankable.
        <br />
        <span className="text-green-400">No More Denials.</span>
      </h1>

      <p className="text-lg text-neutral-300 max-w-2xl mb-8">
        Level10 is a financial coaching and bankability platform that analyzes real credit data,
        assigns clear improvement tasks, and connects users to lenders who agree to approve or coach — never silently deny.
      </p>

      <div className="flex gap-4 mb-16">
        <a href="/register" className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
          Start Your Roadmap
        </a>
        <a href="/how-it-works" className="border border-neutral-700 px-6 py-3 rounded-lg hover:border-green-500 transition">
          How It Works
        </a>
      </div>

      {/* Feature Images */}
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="relative h-48 rounded-xl overflow-hidden group">
          <Image
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Credit analysis"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">Smart Credit Analysis</h3>
            <p className="text-sm text-neutral-300">AI-powered insights</p>
          </div>
        </div>

        <div className="relative h-48 rounded-xl overflow-hidden group">
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Financial coaching"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">Personalized Coaching</h3>
            <p className="text-sm text-neutral-300">Step-by-step guidance</p>
          </div>
        </div>

        <div className="relative h-48 rounded-xl overflow-hidden group">
          <Image
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Lender matching"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">Lender Matching</h3>
            <p className="text-sm text-neutral-300">No silent denials</p>
          </div>
        </div>
      </div>
    </section>
  );
}
