export default function HowItWorks() {
  const steps = [
    ['Connect', 'Securely connect your credit and financial data'],
    ['Analyze', 'We generate your Level10 Bankability Score'],
    ['Coach', 'Clear tasks to improve approval odds'],
    ['Apply', 'Matched with lenders who approve or coach'],
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold mb-10">How Level10 Works</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map(([title, desc]) => (
          <div key={title} className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-neutral-400">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
