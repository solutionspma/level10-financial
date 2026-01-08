export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
      <p className="text-neutral-400 mb-8">Manage your account and preferences</p>

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
                  defaultValue="Jason"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                  defaultValue="Smith"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                defaultValue="jason@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input 
                type="tel" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                defaultValue="(555) 123-4567"
              />
            </div>
          </div>
          <button className="mt-4 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Save Changes</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name</label>
              <input 
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                defaultValue="Acme Enterprises LLC"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">EIN</label>
              <input 
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
                defaultValue="12-3456789"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <select className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2">
                <option>Professional Services</option>
                <option>Retail</option>
                <option>Manufacturing</option>
                <option>Technology</option>
              </select>
            </div>
          </div>
          <button className="mt-4 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Save Changes</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Level10 Pro</div>
              <div className="text-sm text-neutral-400">$10/month • Next billing: Feb 7, 2026</div>
            </div>
            <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">ACTIVE</span>
          </div>
          <div className="flex gap-3">
            <button className="border border-neutral-700 px-4 py-2 rounded-lg text-sm">Update Payment Method</button>
            <button className="border border-red-700 text-red-400 px-4 py-2 rounded-lg text-sm">Cancel Subscription</button>
          </div>
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
