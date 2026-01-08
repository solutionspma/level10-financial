'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'lender' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('level10_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Demo auth - just check if email exists
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Determine role based on email
    let role: 'user' | 'lender' | 'admin' = 'user';
    if (email.includes('lender')) role = 'lender';
    if (email.includes('admin')) role = 'admin';
    
    const demoUser: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
      role,
    };
    
    localStorage.setItem('level10_user', JSON.stringify(demoUser));
    setUser(demoUser);
    setLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const demoUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      role: 'user',
    };
    
    localStorage.setItem('level10_user', JSON.stringify(demoUser));
    setUser(demoUser);
    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('level10_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
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
