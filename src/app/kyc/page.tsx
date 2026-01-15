'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';

export default function KYCPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ssn: '',
    dob: '',
    driversLicense: '',
    licenseState: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate KYC verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update user with KYC data
      // Extract last 4 digits for display
      const last4 = formData.ssn.slice(-4);
      
      await updateUser({ 
        ssn: last4,
        ssnFull: formData.ssn,
        dateOfBirth: formData.dob,
        driversLicense: formData.driversLicense,
        licenseState: formData.licenseState,
        kycStatus: 'verified',
        kycVerifiedDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating KYC data:', error);
      setLoading(false);
      return;
    }

    // Redirect to payment
    router.push('/payment');
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Identity verification"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Identity Verification (KYC)</h1>
            <p className="text-lg text-neutral-200">Required for credit analysis and FCRA compliance</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* KYC Form */}
        <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Personal Identification</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SSN */}
            <div>
              <label className="block text-sm font-medium mb-2">Social Security Number (SSN)</label>
              <input 
                type="text" 
                value={formData.ssn}
                onChange={(e) => setFormData({...formData, ssn: e.target.value.replace(/\D/g, '')})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="123456789"
                maxLength={9}
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                🔒 Enter full 9-digit SSN. Encrypted and stored securely for credit bureau integration.
              </p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <input 
                type="date" 
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                required
              />
            </div>

            {/* Driver's License */}
            <div>
              <label className="block text-sm font-medium mb-2">Driver&apos;s License Number</label>
              <input 
                type="text" 
                value={formData.driversLicense}
                onChange={(e) => setFormData({...formData, driversLicense: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="DL1234567"
                required
              />
            </div>

            {/* License State */}
            <div>
              <label className="block text-sm font-medium mb-2">License Issuing State</label>
              <select 
                value={formData.licenseState}
                onChange={(e) => setFormData({...formData, licenseState: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                required
              >
                <option value="">Select state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">🔐 Why We Need This</h4>
              <ul className="text-sm text-neutral-300 space-y-1">
                <li>• <strong>SSN:</strong> Required for FCRA-compliant credit bureau access</li>
                <li>• <strong>DOB:</strong> Verifies identity and matches credit file</li>
                <li>• <strong>Driver&apos;s License:</strong> Secondary verification via DMV check</li>
              </ul>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-black font-semibold py-4 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Identity and Continue'}
            </button>
          </form>
        </div>

        {/* Security Info */}
        <div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Your Data is Secure
            </h3>
            <ul className="text-sm text-neutral-300 space-y-2">
              <li>✓ 256-bit encryption (bank-level)</li>
              <li>✓ SOC 2 Type II certified</li>
              <li>✓ FCRA compliant storage</li>
              <li>✓ Never sold to third parties</li>
              <li>✓ Deleted upon request</li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-6">
            <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Important</h4>
            <p className="text-sm text-neutral-300">
              This information is required by federal law (FCRA) for anyone accessing credit reports. 
              Without it, we cannot pull your credit or generate your Bankability Score.
            </p>
          </div>

          <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h4 className="font-semibold mb-3">What Happens Next?</h4>
            <ol className="text-sm text-neutral-300 space-y-2">
              <li>1. We verify your identity via DMV</li>
              <li>2. You complete payment ($10/month)</li>
              <li>3. We perform soft credit pull</li>
              <li>4. You get instant Bankability Score</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
