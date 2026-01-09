'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'public' | 'lender' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  hasAuthorizedCredit?: boolean;
  kycStatus?: 'none' | 'pending' | 'verified';
  emailVerified?: boolean;
  // KYC fields
  ssn?: string;
  dateOfBirth?: string;
  driversLicense?: string;
  licenseState?: string;
  kycVerifiedDate?: string;
  // Payment fields
  subscriptionStatus?: 'none' | 'active' | 'cancelled' | 'past_due';
  subscriptionPlan?: string;
  subscriptionAmount?: number;
  nextBillingDate?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  lastPaymentDate?: string;
  // Personal fields
  firstName?: string;
  lastName?: string;
  phone?: string;
  // Business fields
  businessName?: string;
  ein?: string;
  industry?: string;
  // Lender-specific fields
  organizationName?: string;
  lenderType?: 'bank' | 'cdfi' | 'fintech' | 'private';
  statesServed?: string[];
  productsOffered?: string[];
  agreementAccepted?: boolean;
  lenderStatus?: 'pending' | 'active' | 'suspended';
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('level10_user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const login = (userData: User) => {
    localStorage.setItem('level10_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('level10_user');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('level10_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
