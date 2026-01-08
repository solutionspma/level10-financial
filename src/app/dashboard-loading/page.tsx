'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function DashboardLoading() {
  const router = useRouter();
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Preparing your profile...');

  useEffect(() => {
    if (!user || !user.hasAuthorizedAnalysis) {
      router.push('/start-analysis');
      return;
    }

    const messages = [
      'Preparing your profile...',
      'Analyzing available data...',
      'Generating preliminary score...',
      'Setting up your dashboard...',
    ];

    let currentMessage = 0;
    let currentProgress = 0;

    const messageInterval = setInterval(() => {
      currentMessage++;
      if (currentMessage < messages.length) {
        setMessage(messages[currentMessage]);
      }
    }, 1500);

    const progressInterval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      }
    }, 150);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-neutral-700 border-t-green-500 mb-6"></div>
          <h1 className="text-2xl font-bold mb-2">Setting Up Your Dashboard</h1>
          <p className="text-neutral-400">{message}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-neutral-900 rounded-full h-3 overflow-hidden mb-4">
          <div 
            className="bg-green-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-center text-sm text-neutral-500">
          {progress}% complete
        </p>
      </div>
    </div>
  );
}
