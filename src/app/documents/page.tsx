export default function Documents() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Document Center</h1>
      <p className="text-neutral-400 mb-8">Upload and manage your funding documents</p>

      <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6 mb-8">
        <h3 className="text-yellow-400 font-semibold mb-2">📄 4 of 7 documents uploaded</h3>
        <p className="text-neutral-300 text-sm">
          Complete your document checklist to unlock premium lender matches and expedite approval.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500 text-black rounded-lg flex items-center justify-center text-xl">✓</div>
            <div>
              <div className="font-semibold text-white">Business Tax Return (2024)</div>
              <div className="text-sm text-neutral-300">Uploaded Dec 15, 2025 • business_tax_2024.pdf</div>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-white">View</button>
        </div>

        <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500 text-black rounded-lg flex items-center justify-center text-xl">✓</div>
            <div>
              <div className="font-semibold text-white">Business Tax Return (2023)</div>
              <div className="text-sm text-neutral-300">Uploaded Dec 15, 2025 • business_tax_2023.pdf</div>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-white">View</button>
        </div>

        <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500 text-black rounded-lg flex items-center justify-center text-xl">✓</div>
            <div>
              <div className="font-semibold text-white">Bank Statements (Oct-Dec 2025)</div>
              <div className="text-sm text-neutral-300">Uploaded Jan 2, 2026 • bank_statements_q4.pdf</div>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-white">View</button>
        </div>

        <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500 text-black rounded-lg flex items-center justify-center text-xl">✓</div>
            <div>
              <div className="font-semibold text-white">Business License</div>
              <div className="text-sm text-neutral-300">Uploaded Dec 10, 2025 • business_license.pdf</div>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-white">View</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 border-dashed rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center text-xl">📄</div>
            <div>
              <div className="font-semibold text-white">Profit & Loss Statement (2025)</div>
              <div className="text-sm text-neutral-400">Required for approval • Not yet uploaded</div>
            </div>
          </div>
          <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Upload</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 border-dashed rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center text-xl">📄</div>
            <div>
              <div className="font-semibold text-white">Business Debt Schedule</div>
              <div className="text-sm text-neutral-400">Required for SBA loans • Not yet uploaded</div>
            </div>
          </div>
          <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Upload</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 border-dashed rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center text-xl">📄</div>
            <div>
              <div className="font-semibold text-white">Personal Financial Statement</div>
              <div className="text-sm text-neutral-400">Optional • Improves approval odds</div>
            </div>
          </div>
          <button className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">Upload</button>
        </div>
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">Document Security</h3>
        <p className="text-neutral-300 text-sm">
          All documents are encrypted at rest and in transit using 256-bit SSL. Your files are stored 
          in SOC 2 compliant infrastructure and are never shared without your explicit permission.
        </p>
      </div>
    </div>
  );
}
