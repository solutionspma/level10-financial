'use client';

import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'lender') return '/lender/dashboard';
    if (user.role === 'admin') return '/admin';
    return '/dashboard';
  };

  return (
    <header className="border-b border-neutral-800 py-3 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center hover:opacity-80 transition">
          <Image 
            src="/level10_logo_cleaned.png" 
            alt="Level 10 Financial" 
            width={360} 
            height={90}
            priority
            className="h-20 w-auto"
          />
        </Link>
        
        <nav className="flex items-center gap-4 text-sm">
          {/* Public navigation - only show when NOT logged in */}
          {!user && (
            <>
              <Link href="/how-it-works" className="hover:text-green-400 transition">
                How It Works
              </Link>
              <Link href="/lender/signup" className="hover:text-green-400 transition">
                For Lenders
              </Link>
              <Link href="/pricing" className="hover:text-green-400 transition">
                Pricing
              </Link>
              <Link 
                href="/login" 
                className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                Login
              </Link>
            </>
          )}
          
          {/* Member navigation - show when logged in as regular user */}
          {user && user.role !== 'lender' && user.role !== 'admin' && (
            <>
              <Link href="/dashboard" className="hover:text-green-400 transition">
                Dashboard
              </Link>
              <Link href="/documents" className="hover:text-green-400 transition">
                Documents
              </Link>
              <Link href="/credit" className="hover:text-green-400 transition">
                Credit Reports
              </Link>
            </>
          )}
          
          {/* Lender navigation */}
          {user && user.role === 'lender' && (
            <>
              <Link href="/lender/dashboard" className="hover:text-green-400 transition">
                Dashboard
              </Link>
              <Link href="/lender/applications" className="hover:text-green-400 transition">
                Applications
              </Link>
              <Link href="/lender/commissions" className="hover:text-green-400 transition">
                Commissions
              </Link>
            </>
          )}
          
          {/* Admin navigation */}
          {user && user.role === 'admin' && (
            <>
              <Link href="/admin" className="hover:text-green-400 transition">
                Admin Panel
              </Link>
              <Link href="/admin/users" className="hover:text-green-400 transition">
                Users
              </Link>
              <Link href="/admin/payments" className="hover:text-green-400 transition">
                Payments
              </Link>
            </>
          )}
          
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
              >
                <span className="text-sm">{user.email}</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg overflow-hidden z-50">
                  <Link
                    href={getDashboardLink()}
                    className="block px-4 py-2 hover:bg-neutral-700 transition"
                    onClick={() => setShowMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-neutral-700 transition"
                    onClick={() => setShowMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                      window.location.href = '/';
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-700 transition text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
