'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
        <button 
          onClick={() => setActiveModal('analysis')}
          className="relative h-48 rounded-xl overflow-hidden group cursor-pointer text-left w-full"
        >
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
        </button>

        <button 
          onClick={() => setActiveModal('coaching')}
          className="relative h-48 rounded-xl overflow-hidden group cursor-pointer text-left w-full"
        >
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
        </button>

        <button 
          onClick={() => setActiveModal('matching')}
          className="relative h-48 rounded-xl overflow-hidden group cursor-pointer text-left w-full"
        >
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
        </button>
      </div>

      {/* Expanded Section - Built for Entrepreneurs */}
      <div className="mt-24 mb-16">
        <h2 className="text-4xl font-bold text-center mb-4">
          Built for Entrepreneurs, Gig Workers, and Business Owners
        </h2>
        <p className="text-xl text-neutral-400 text-center max-w-3xl mx-auto mb-16">
          Level10 is built for the entrepreneur, gig worker, and business owner who's been grinding for years 
          but never told exactly what lenders need to approve them.
        </p>

        {/* Smart Credit Analysis Block */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Smart Credit Analysis</h3>
          <p className="text-neutral-300 mb-4">
            We pull real credit data from industry-leading credit bureaus and show you exactly why lenders say no. 
            Our analysis highlights utilization issues, payment history gaps, and identity mismatches. 
            No disputes, no letters, no games — just the truth about what's blocking your approval.
          </p>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Who This Is For</h4>
            <ul className="text-neutral-400 space-y-1">
              <li>• Entrepreneurs with inconsistent income documentation</li>
              <li>• Gig workers building credit history</li>
              <li>• Contractors denied without explanation</li>
              <li>• Self-employed professionals navigating complex credit profiles</li>
            </ul>
          </div>
          <a 
            href="/register" 
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            See Your Credit Truth
          </a>
        </div>

        {/* Personalized Coaching Block */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Personalized Coaching</h3>
          <p className="text-neutral-300 mb-4">
            Tasks generated from lender logic. "Do this → then this → then apply." No guessing. 
            Progress tracking shows you exactly where you stand. We don't fix your credit — we show you 
            what lenders require to say yes.
          </p>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Who This Is For</h4>
            <ul className="text-neutral-400 space-y-1">
              <li>• People who've been denied but never told why</li>
              <li>• Business owners who need a clear roadmap</li>
              <li>• Anyone tired of guessing what lenders want</li>
              <li>• Professionals ready to become bankable on purpose</li>
            </ul>
          </div>
          <a 
            href="/register" 
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Get Your Roadmap
          </a>
        </div>

        {/* Lender Matching Block */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Lender Matching</h3>
          <p className="text-neutral-300 mb-4">
            Only matched to lenders willing to review your profile. No silent denials. 
            Feedback loop from lenders improves your Bankability Score over time. 
            You'll know exactly where you stand and what needs to happen next.
          </p>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Who This Is For</h4>
            <ul className="text-neutral-400 space-y-1">
              <li>• Entrepreneurs seeking business funding</li>
              <li>• Professionals with non-traditional income</li>
              <li>• Anyone who's been ghosted by lenders</li>
              <li>• Business owners ready for transparent financing</li>
            </ul>
          </div>
          <a 
            href="/register" 
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Find Your Lender
          </a>
        </div>
      </div>

      {/* Positioning Statement */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-green-500/20 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Become Bankable — On Purpose</h2>
        <div className="max-w-3xl mx-auto text-neutral-300 space-y-4 text-lg">
          <p>We don't sell hope. We surface requirements.</p>
          <p>
            If fixing credit is required, lenders will say so. If income documentation is the issue, you'll know. 
            If identity verification is blocking you, it gets flagged.
          </p>
          <p className="text-white font-semibold">No more guessing. No more silence.</p>
        </div>
        <div className="mt-8">
          <a 
            href="/register" 
            className="inline-block bg-green-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition"
          >
            Start Your Journey
          </a>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'analysis' && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-bold text-green-400 mb-4">Smart Credit Analysis</h3>
            <p className="text-neutral-300 mb-4">
              We pull real credit data from industry-leading credit bureaus and show you exactly why lenders say no. 
              Our analysis highlights utilization issues, payment history gaps, and identity mismatches.
            </p>
            <ul className="text-neutral-400 space-y-2 mb-6">
              <li>✓ Real credit data from trusted credit bureaus</li>
              <li>✓ Shows exactly why lenders deny you</li>
              <li>✓ Highlights utilization, payment history, identity issues</li>
              <li>✓ No disputes, no letters, no games</li>
            </ul>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Who This Is For</h4>
              <ul className="text-neutral-400 space-y-1">
                <li>• Entrepreneurs with inconsistent income documentation</li>
                <li>• Gig workers building credit history</li>
                <li>• Contractors denied without explanation</li>
                <li>• Self-employed professionals navigating complex credit profiles</li>
              </ul>
            </div>
            <div className="flex gap-4">
              <a 
                href="/register" 
                className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                See Your Credit Truth
              </a>
              <button 
                onClick={() => setActiveModal(null)}
                className="border border-neutral-700 px-6 py-3 rounded-lg hover:border-green-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'coaching' && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-bold text-green-400 mb-4">Personalized Coaching</h3>
            <p className="text-neutral-300 mb-4">
              Tasks generated from lender logic. "Do this → then this → then apply." No guessing. 
              Progress tracking shows you exactly where you stand.
            </p>
            <ul className="text-neutral-400 space-y-2 mb-6">
              <li>✓ Tasks generated from lender requirements</li>
              <li>✓ Clear step-by-step roadmap</li>
              <li>✓ Progress tracking built-in</li>
              <li>✓ We show what lenders require to say yes</li>
            </ul>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Who This Is For</h4>
              <ul className="text-neutral-400 space-y-1">
                <li>• People who've been denied but never told why</li>
                <li>• Business owners who need a clear roadmap</li>
                <li>• Anyone tired of guessing what lenders want</li>
                <li>• Professionals ready to become bankable on purpose</li>
              </ul>
            </div>
            <div className="flex gap-4">
              <a 
                href="/register" 
                className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Get Your Roadmap
              </a>
              <button 
                onClick={() => setActiveModal(null)}
                className="border border-neutral-700 px-6 py-3 rounded-lg hover:border-green-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'matching' && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-bold text-green-400 mb-4">Lender Matching</h3>
            <p className="text-neutral-300 mb-4">
              Only matched to lenders willing to review your profile. No silent denials. 
              Feedback loop from lenders improves your Bankability Score over time.
            </p>
            <ul className="text-neutral-400 space-y-2 mb-6">
              <li>✓ Matched only to willing lenders</li>
              <li>✓ No silent denials</li>
              <li>✓ Feedback loop improves your score</li>
              <li>✓ Know exactly where you stand</li>
            </ul>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Who This Is For</h4>
              <ul className="text-neutral-400 space-y-1">
                <li>• Entrepreneurs seeking business funding</li>
                <li>• Professionals with non-traditional income</li>
                <li>• Anyone who's been ghosted by lenders</li>
                <li>• Business owners ready for transparent financing</li>
              </ul>
            </div>
            <div className="flex gap-4">
              <a 
                href="/register" 
                className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Find Your Lender
              </a>
              <button 
                onClick={() => setActiveModal(null)}
                className="border border-neutral-700 px-6 py-3 rounded-lg hover:border-green-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
