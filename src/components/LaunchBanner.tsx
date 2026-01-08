'use client';

import { useState } from 'react';

export default function LaunchBanner() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('launch_banner_dismissed') === 'true';
    }
    return false;
  });

  const handleDismiss = () => {
    localStorage.setItem('launch_banner_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-b border-green-700/50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">🚀</span>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm md:text-base">
                Early Access — Full Bankability Engine Going Live Monday
              </p>
              <p className="text-green-200 text-xs md:text-sm">
                Explore the platform now. Identity verification, live credit pulls, and lender matching activate Monday.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-green-200 hover:text-white transition-colors p-2"
            aria-label="Dismiss banner"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
