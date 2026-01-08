export default function Register() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Start Your Bankability Journey</h1>
      <p className="text-neutral-400 mb-8">
        Create your Level10 account and get instant access to your credit analysis and improvement roadmap.
      </p>
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-6">
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input 
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="John"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input 
              type="tel" 
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              placeholder="••••••••"
            />
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-6">
            <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Credit Pull Authorization</h3>
            <p className="text-sm text-neutral-300 mb-3">
              By creating an account, you authorize Level10 Financial to access your credit report 
              via a <strong>soft inquiry</strong> that will NOT affect your credit score.
            </p>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" required />
              <span>
                I authorize Level10 to access my credit report for evaluation, coaching, 
                and funding prequalification purposes as described in our{' '}
                <a href="/permissible-purpose" className="text-green-400 hover:underline">Permissible Purpose</a>{' '}
                and <a href="/fcra" className="text-green-400 hover:underline">FCRA Compliance</a> policies.
              </span>
            </label>
          </div>
          
          <label className="flex items-start gap-2 text-sm text-neutral-400">
            <input type="checkbox" className="mt-1" required />
            <span>
              I agree to the <a href="/terms" className="text-green-400 hover:underline">Terms of Service</a>{' '}
              and <a href="/privacy" className="text-green-400 hover:underline">Privacy Policy</a>
            </span>
          </label>
          
          <button 
            type="submit" 
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition"
          >
            Create Account & Start Analysis
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-neutral-400">
          <a href="/login" className="text-green-400 hover:underline">Already have an account? Log in</a>
        </div>
      </div>
      
      <p className="text-xs text-neutral-500 text-center">
        Supabase Auth + Credit Authorization Flow (Ready for Backend Connection)
      </p>
    </div>
  );
}
