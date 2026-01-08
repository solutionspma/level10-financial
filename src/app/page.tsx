export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-extrabold mb-6">
        Become Bankable.
        <br />
        <span className="text-green-400">No More Denials.</span>
      </h1>

      <p className="text-lg text-neutral-300 max-w-2xl mb-8">
        Level10 is a financial coaching and bankability platform that analyzes real credit data,
        assigns clear improvement tasks, and connects users to lenders who agree to approve or coach — never silently deny.
      </p>

      <div className="flex gap-4">
        <a href="/register" className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold">
          Start Your Roadmap
        </a>
        <a href="/how-it-works" className="border border-neutral-700 px-6 py-3 rounded-lg">
          How It Works
        </a>
      </div>
    </section>
  );
}
