export default function Login() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      <p className="text-neutral-400 mb-8">
        Log in to access your Bankability Dashboard and continue your financial journey.
      </p>
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              placeholder="you@example.com"
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
          
          <button 
            type="submit" 
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition"
          >
            Log In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-neutral-400">
          <a href="/register" className="text-green-400 hover:underline">Don't have an account? Sign up</a>
          <br />
          <a href="#" className="text-neutral-400 hover:underline mt-2 inline-block">Forgot password?</a>
        </div>
      </div>
      
      <p className="text-xs text-neutral-500 text-center mt-6">
        Supabase Auth Integration (Ready for Backend Connection)
      </p>
    </div>
  );
}
