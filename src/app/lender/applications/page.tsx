export default function LenderApplications() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Applications</h1>
      <p className="text-neutral-400 mb-8">Review and manage funding applications</p>

      <div className="mb-6 flex gap-4">
        <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold">All (50)</button>
        <button className="bg-neutral-800 px-4 py-2 rounded-lg">New (12)</button>
        <button className="bg-neutral-800 px-4 py-2 rounded-lg">Under Review (8)</button>
        <button className="bg-neutral-800 px-4 py-2 rounded-lg">Approved (24)</button>
        <button className="bg-neutral-800 px-4 py-2 rounded-lg">Coached (6)</button>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Acme Construction LLC', amount: '$125K', score: '8.2', credit: '705', color: 'green' },
          { name: 'Bright Ideas Marketing', amount: '$50K', score: '7.4', credit: '682', color: 'blue' },
          { name: 'Creative Solutions Inc', amount: '$200K', score: '6.8', credit: '658', color: 'purple' },
          { name: 'Delta Logistics', amount: '$75K', score: '7.9', credit: '695', color: 'yellow' },
          { name: 'Echo Tech Services', amount: '$100K', score: '8.5', credit: '720', color: 'red' },
        ].map((app, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 bg-gradient-to-br from-${app.color}-500 to-${app.color}-600 rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                {app.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{app.name}</div>
                <div className="text-sm text-neutral-400">
                  {app.amount} request • Level10 Score: {app.score} • Credit: {app.credit}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`/lender/application/${i + 1}`} className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold">
                Review
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
