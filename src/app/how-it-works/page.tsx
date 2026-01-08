import Image from 'next/image';

export default function HowItWorks() {
  const steps = [
    ['Connect', 'Securely connect your credit and financial data', 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Analyze', 'We generate your Level10 Bankability Score', 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Coach', 'Clear tasks to improve approval odds', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Apply', 'Matched with lenders who approve or coach', 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Financial planning"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">How Level 10 Works</h1>
            <p className="text-xl text-neutral-200">Four simple steps from denial to approval</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {steps.map(([title, desc, img], index) => (
          <div key={title} className="relative h-64 rounded-xl overflow-hidden group bg-neutral-900">
            <Image src={img} alt={title} fill className="object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="text-green-400 font-bold text-2xl mb-2">Step {index + 1}</div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
              <p className="text-neutral-300">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="/register" className="bg-green-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition">
          Start Your Journey
        </a>
      </div>
    </div>
  );
}
