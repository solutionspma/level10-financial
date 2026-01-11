'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';

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
  ssn?: string; // Last 4 digits for display
  ssnFull?: string; // Full SSN for MicroBilt API calls
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
  lenderStatus?: 'pending' | 'active' | 'suspended' | 'pending_admin_review' | 'rejected';
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
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

  const refreshUser = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user from database:', error);
        return;
      }

      if (data) {
        const updatedUser: User = {
          id: data.id,
          email: data.email,
          name: data.name || '',
          role: data.role || 'public',
          hasAuthorizedCredit: data.has_authorized_credit,
          kycStatus: data.kyc_status || 'none',
          emailVerified: data.email_verified,
          ssn: data.ssn_last_4,
          ssnFull: data.ssn_full,
          dateOfBirth: data.date_of_birth,
          driversLicense: data.drivers_license,
          licenseState: data.license_state,
          kycVerifiedDate: data.kyc_verified_date,
          subscriptionStatus: data.subscription_status || 'none',
          subscriptionPlan: data.subscription_plan,
          subscriptionAmount: data.subscription_amount,
          nextBillingDate: data.next_billing_date,
          stripeCustomerId: data.stripe_customer_id,
          stripeSubscriptionId: data.stripe_subscription_id,
          lastPaymentDate: data.last_payment_date,
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          businessName: data.business_name,
          ein: data.ein,
          industry: data.industry,
          organizationName: data.organization_name,
          lenderType: data.lender_type,
          statesServed: data.states_served,
          productsOffered: data.products_offered,
          agreementAccepted: data.agreement_accepted,
          lenderStatus: data.lender_status,
        };
        
        localStorage.setItem('level10_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Fetch user from Supabase on mount and when user ID changes
  useEffect(() => {
    if (user?.id) {
      refreshUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const login = async (userData: User) => {
    // Store in localStorage for immediate access
    localStorage.setItem('level10_user', JSON.stringify(userData));
    setUser(userData);

    // Sync with database
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', userData.email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error fetching user from database:', error);
        return;
      }

      if (data) {
        // User exists in database, update local state with DB data
        const dbUser: User = {
          id: data.id,
          email: data.email,
          name: data.name || userData.name,
          role: data.role || userData.role,
          hasAuthorizedCredit: data.has_authorized_credit,
          kycStatus: data.kyc_status || 'none',
          emailVerified: data.email_verified,
          ssn: data.ssn_last_4,
          ssnFull: data.ssn_full,
          dateOfBirth: data.date_of_birth,
          driversLicense: data.drivers_license,
          licenseState: data.license_state,
          kycVerifiedDate: data.kyc_verified_date,
          subscriptionStatus: data.subscription_status || 'none',
          subscriptionPlan: data.subscription_plan,
          subscriptionAmount: data.subscription_amount,
          nextBillingDate: data.next_billing_date,
          stripeCustomerId: data.stripe_customer_id,
          stripeSubscriptionId: data.stripe_subscription_id,
          lastPaymentDate: data.last_payment_date,
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          businessName: data.business_name,
          ein: data.ein,
          industry: data.industry,
          organizationName: data.organization_name,
          lenderType: data.lender_type,
          statesServed: data.states_served,
          productsOffered: data.products_offered,
          agreementAccepted: data.agreement_accepted,
          lenderStatus: data.lender_status,
        };
        localStorage.setItem('level10_user', JSON.stringify(dbUser));
        setUser(dbUser);
      } else {
        // User doesn't exist in database, create them
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            email: userData.email,
            name: userData.name,
            role: userData.role,
            email_verified: userData.emailVerified || false,
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user in database:', insertError);
          return;
        }

        if (newUser) {
          const createdUser: User = {
            ...userData,
            id: newUser.id,
          };
          localStorage.setItem('level10_user', JSON.stringify(createdUser));
          setUser(createdUser);
        }
      }
    } catch (error) {
      console.error('Error in login:', error);
    }
  };

  const logout = async () => {
    localStorage.removeItem('level10_user');
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    localStorage.setItem('level10_user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Sync with database
    try {
      // Convert camelCase to snake_case for database
      const dbUpdates: Record<string, unknown> = {};
      
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.role !== undefined) dbUpdates.role = updates.role;
      if (updates.hasAuthorizedCredit !== undefined) dbUpdates.has_authorized_credit = updates.hasAuthorizedCredit;
      if (updates.kycStatus !== undefined) dbUpdates.kyc_status = updates.kycStatus;
      if (updates.emailVerified !== undefined) dbUpdates.email_verified = updates.emailVerified;
      if (updates.dateOfBirth !== undefined) dbUpdates.date_of_birth = updates.dateOfBirth;
      if (updates.driversLicense !== undefined) dbUpdates.drivers_license = updates.driversLicense;
      if (updates.licenseState !== undefined) dbUpdates.license_state = updates.licenseState;
      if (updates.kycVerifiedDate !== undefined) dbUpdates.kyc_verified_date = updates.kycVerifiedDate;
      if (updates.ssn !== undefined) dbUpdates.ssn_last_4 = updates.ssn;
      if (updates.ssnFull !== undefined) dbUpdates.ssn_full = updates.ssnFull;
      if (updates.subscriptionStatus !== undefined) dbUpdates.subscription_status = updates.subscriptionStatus;
      if (updates.subscriptionPlan !== undefined) dbUpdates.subscription_plan = updates.subscriptionPlan;
      if (updates.subscriptionAmount !== undefined) dbUpdates.subscription_amount = updates.subscriptionAmount;
      if (updates.nextBillingDate !== undefined) dbUpdates.next_billing_date = updates.nextBillingDate;
      if (updates.stripeCustomerId !== undefined) dbUpdates.stripe_customer_id = updates.stripeCustomerId;
      if (updates.stripeSubscriptionId !== undefined) dbUpdates.stripe_subscription_id = updates.stripeSubscriptionId;
      if (updates.lastPaymentDate !== undefined) dbUpdates.last_payment_date = updates.lastPaymentDate;
      if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
      if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.businessName !== undefined) dbUpdates.business_name = updates.businessName;
      if (updates.ein !== undefined) dbUpdates.ein = updates.ein;
      if (updates.industry !== undefined) dbUpdates.industry = updates.industry;
      if (updates.organizationName !== undefined) dbUpdates.organization_name = updates.organizationName;
      if (updates.lenderType !== undefined) dbUpdates.lender_type = updates.lenderType;
      if (updates.statesServed !== undefined) dbUpdates.states_served = updates.statesServed;
      if (updates.productsOffered !== undefined) dbUpdates.products_offered = updates.productsOffered;
      if (updates.agreementAccepted !== undefined) dbUpdates.agreement_accepted = updates.agreementAccepted;
      if (updates.lenderStatus !== undefined) dbUpdates.lender_status = updates.lenderStatus;

      const { error } = await supabase
        .from('users')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user in database:', error);
      }
    } catch (error) {
      console.error('Error in updateUser:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, refreshUser }}>
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
