export default function AdminUsers() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">User Management</h1>
      <p className="text-neutral-400 mb-8">Manage and monitor platform users</p>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search users..." 
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2"
          />
          <button className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">Search</button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Jason Smith', email: 'jason@acme.com', score: '8.2', status: 'Active', joined: 'Jan 5, 2026' },
            { name: 'Sarah Johnson', email: 'sarah@bright.com', score: '7.4', status: 'Active', joined: 'Jan 4, 2026' },
            { name: 'Mike Davis', email: 'mike@creative.com', score: '6.8', status: 'Active', joined: 'Jan 3, 2026' },
            { name: 'Lisa Brown', email: 'lisa@delta.com', score: '7.9', status: 'Suspended', joined: 'Jan 1, 2026' },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-neutral-400">{user.email}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-neutral-400">Level10 Score</div>
                  <div className="font-bold">{user.score}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-neutral-400">Status</div>
                  <div className={`text-sm font-semibold ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                    {user.status}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-neutral-400">Joined</div>
                  <div className="text-sm">{user.joined}</div>
                </div>
              </div>
              <button className="ml-4 text-green-400 hover:underline text-sm">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
