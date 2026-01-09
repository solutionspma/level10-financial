'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FixUserPage() {
  const router = useRouter();

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem('level10_user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // Reset KYC status if incomplete data
      if (user.kycStatus === 'verified' && (!user.ssn || !user.dateOfBirth)) {
        user.kycStatus = 'none';
        user.ssn = undefined;
        user.dateOfBirth = undefined;
        user.driversLicense = undefined;
        user.licenseState = undefined;
        user.kycVerifiedDate = undefined;
        
        localStorage.setItem('level10_user', JSON.stringify(user));
        alert('KYC status reset! Redirecting to profile...');
        router.push('/profile');
      } else {
        alert('User data looks fine. Redirecting to profile...');
        router.push('/profile');
      }
    } else {
      alert('No user found in localStorage');
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-4">Fixing User Data...</h1>
      <p className="text-neutral-400">Please wait while we reset your KYC status.</p>
    </div>
  );
}
