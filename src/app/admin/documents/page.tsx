export default function AdminDocuments() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Document Review</h1>
      <p className="text-neutral-400 mb-8">Review and verify user-uploaded documents</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Pending Review</div>
          <div className="text-4xl font-bold text-yellow-400">23</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Approved Today</div>
          <div className="text-4xl font-bold text-green-400">41</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="text-sm text-neutral-400 mb-1">Flagged</div>
          <div className="text-4xl font-bold text-red-400">2</div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Documents Pending Review</h3>
        <div className="space-y-3">
          {[
            { user: 'Jason Smith', doc: 'Business Tax Return 2024', uploaded: '2 hours ago' },
            { user: 'Sarah Johnson', doc: 'Bank Statements Q4 2025', uploaded: '3 hours ago' },
            { user: 'Mike Davis', doc: 'P&L Statement 2025', uploaded: '5 hours ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold">{item.user}</div>
                <div className="text-sm text-neutral-400">{item.doc}</div>
              </div>
              <div className="text-sm text-neutral-500 mr-4">{item.uploaded}</div>
              <div className="flex gap-2">
                <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Approve</button>
                <button className="bg-red-900 text-white px-4 py-2 rounded-lg font-semibold text-sm">Flag</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
