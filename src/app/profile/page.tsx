'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Profile() {
  const { user, updateUser, login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    ein: '',
    industry: '',
  });
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Auto-sync user data from Supabase on mount
    syncUserData();
  }, [user?.email, router]);

  const syncUserData = async () => {
    if (!user?.email) return;
    
    try {
      setSyncing(true);
      // Try to find user in Supabase by email
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (!error && data) {
        // Update local user with Supabase data
        const updatedUser = {
          id: data.id,
          email: data.email,
          name: data.name || `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.email.split('@')[0],
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          role: data.role,
          hasAuthorizedCredit: data.has_authorized_credit,
          kycStatus: data.kyc_status,
          emailVerified: data.email_verified,
          ssn: data.ssn_last_4,
          dateOfBirth: data.date_of_birth,
          driversLicense: data.drivers_license,
          licenseState: data.license_state,
          kycVerifiedDate: data.kyc_verified_date,
          subscriptionStatus: data.subscription_status,
          subscriptionPlan: data.subscription_plan,
          subscriptionAmount: data.subscription_amount,
          nextBillingDate: data.next_billing_date,
          stripeCustomerId: data.stripe_customer_id,
          stripeSubscriptionId: data.stripe_subscription_id,
          lastPaymentDate: data.last_payment_date,
          businessName: data.business_name,
          ein: data.ein,
          industry: data.industry,
        };
        
        await login(updatedUser);
        
        // Populate form
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          businessName: data.business_name || '',
          ein: data.ein || '',
          industry: data.industry || 'Professional Services',
        });
      } else {
        // No Supabase record, use local data
        setFormData({
          firstName: user.firstName || user.name?.split(' ')[0] || '',
          lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
          email: user.email || '',
          phone: user.phone || '',
          businessName: user.businessName || '',
          ein: user.ein || '',
          industry: user.industry || 'Professional Services',
        });
      }
    } catch (error) {
      console.error('Error syncing user data:', error);
      // Fallback to local data
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
        businessName: user.businessName || '',
        ein: user.ein || '',
        industry: user.industry || 'Professional Services',
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleSavePersonal = async () => {
    try {
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      });
      alert('Personal information updated successfully!');
    } catch (error) {
      console.error('Error updating personal info:', error);
      alert('Failed to update personal information. Please try again.');
    }
  };

  const handleSaveBusiness = async () => {
    try {
      await updateUser({
        businessName: formData.businessName,
        ein: formData.ein,
        industry: formData.industry,
      });
      alert('Business information updated successfully!');
    } catch (error) {
      console.error('Error updating business info:', error);
      alert('Failed to update business information. Please try again.');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-neutral-400">Manage your account and preferences</p>
        </div>
        <button
          onClick={syncUserData}
          disabled={syncing}
          className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-700 transition disabled:opacity-50 text-sm"
        >
          {syncing ? 'Syncing...' : '🔄 Refresh Data'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input 
                type="tel" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <button 
            onClick={handleSavePersonal}
            className="mt-4 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        </div>

        {/* KYC Information Display */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Identity Verification (KYC)</h2>
            {user.kycStatus === 'verified' && user.ssn && user.dateOfBirth ? (
              <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">VERIFIED</span>
            ) : user.kycStatus === 'pending' ? (
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">PENDING</span>
            ) : (
              <span className="bg-neutral-700 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full">NOT VERIFIED</span>
            )}
          </div>
          
          {user.kycStatus === 'verified' && user.ssn && user.dateOfBirth ? (
            <>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">SSN</span>
                  <span>***-**-{user.ssn?.slice(-4) || '****'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Date of Birth</span>
                  <span>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Driver&apos;s License</span>
                  <span>{user.driversLicense || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">License State</span>
                  <span>{user.licenseState || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Verified Date</span>
                  <span>{user.kycVerifiedDate ? new Date(user.kycVerifiedDate).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-4">
                🔒 For security reasons, KYC information cannot be edited. Contact support to update.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-neutral-400 mb-4">Identity verification is required to access credit analysis and funding opportunities.</p>
              <button 
                onClick={() => router.push('/kyc')}
                className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Complete Verification
              </button>
            </div>
          )}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name</label>
              <input 
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">EIN</label>
              <input 
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                value={formData.ein}
                onChange={(e) => setFormData({...formData, ein: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <select 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              >
                <option>Professional Services</option>
                <option>Retail</option>
                <option>Manufacturing</option>
                <option>Technology</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleSaveBusiness}
            className="mt-4 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          {user.subscriptionStatus === 'active' ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">{user.subscriptionPlan || 'Level10 Pro'}</div>
                  <div className="text-sm text-neutral-400">
                    ${user.subscriptionAmount || 10}/month • Next billing: {user.nextBillingDate ? new Date(user.nextBillingDate).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
                <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">ACTIVE</span>
              </div>
              <div className="flex gap-3">
                <button className="border border-neutral-700 px-4 py-2 rounded-lg text-sm hover:bg-neutral-800 transition">
                  Update Payment Method
                </button>
                <button className="border border-red-700 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-900/20 transition">
                  Cancel Subscription
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-neutral-400 mb-4">No active subscription</p>
              <button 
                onClick={() => router.push('/payment')}
                className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Start Subscription ($10/month)
              </button>
            </div>
          )}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Credit Authorization</h2>
          <p className="text-sm text-neutral-300 mb-4">
            You authorized Level10 to access your credit report on Dec 1, 2025. 
            This authorization is required for your Bankability Score and coaching services.
          </p>
          <button className="border border-red-700 text-red-400 px-4 py-2 rounded-lg text-sm">Revoke Authorization</button>
          <p className="text-xs text-neutral-500 mt-2">
            Revoking authorization will pause your account but preserve your data for 30 days.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Email me when my credit score changes</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Notify me of new lender matches</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span className="text-sm">Send weekly progress reports</span>
            </label>
          </div>
          <button className="mt-4 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Save Preferences</button>
        </div>
      </div>
    </div>
  );
}
