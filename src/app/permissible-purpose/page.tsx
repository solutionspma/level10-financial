export default function PermissiblePurpose() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Permissible Purpose Statement</h1>
      
      <div className="space-y-6 text-neutral-300">
        <p className="text-lg">
          Level10 Financial accesses and uses consumer credit information strictly under permissible purposes 
          as defined by the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681b.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Our Permissible Purposes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Credit evaluation and assessment</strong> - Analyzing creditworthiness for financial coaching</li>
            <li><strong>Financial education and coaching</strong> - Providing personalized improvement recommendations</li>
            <li><strong>Funding prequalification</strong> - Matching users with appropriate lenders</li>
            <li><strong>Identity verification</strong> - Ensuring secure access and fraud prevention</li>
            <li><strong>Account review and monitoring</strong> - Tracking credit improvement progress</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">What We Do NOT Do</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Sell or share consumer data with third parties for marketing purposes</li>
            <li>Use credit data for employment screening</li>
            <li>Access credit information without explicit user authorization</li>
            <li>Make lending decisions on behalf of financial institutions</li>
          </ul>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-white mb-3">User Authorization</h3>
          <p>
            All users must provide explicit written authorization before Level10 accesses their credit data. 
            Users are informed about the nature of the inquiry, its purpose, and how the data will be used 
            to improve their financial standing.
          </p>
        </div>

        <p className="text-sm text-neutral-400 mt-8">
          Last Updated: January 2026<br />
          Questions? Contact compliance@level10.financial
        </p>
      </div>
    </div>
  );
}
