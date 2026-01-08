export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-neutral-300">
        <p className="text-lg">
          Level10 Financial is committed to protecting your privacy and maintaining the confidentiality 
          of your personal and financial information.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Personal identification information (name, email, phone number)</li>
            <li>Credit report data (accessed with your explicit authorization)</li>
            <li>Financial account information (for assessment purposes)</li>
            <li>Business information (for business credit services)</li>
            <li>Usage data and platform interactions</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Generate your Level10 Bankability Score</li>
            <li>Provide personalized financial coaching and recommendations</li>
            <li>Match you with appropriate lenders</li>
            <li>Track your credit improvement progress</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Data Security</h2>
          <p className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            We employ industry-leading security measures including:
            <br /><br />
            • 256-bit SSL encryption for all data transmission
            <br />• SOC 2 Type II compliant infrastructure
            <br />• Multi-factor authentication
            <br />• Regular security audits and penetration testing
            <br />• Encrypted data storage with access logging
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Data Sharing</h2>
          <p>
            We do NOT sell your personal information. We may share data only in these limited circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>With your explicit consent (e.g., when applying to a lender)</li>
            <li>With service providers under strict confidentiality agreements</li>
            <li>When required by law or legal process</li>
            <li>To protect against fraud or security threats</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Your Privacy Rights</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Access your personal data</li>
            <li>Request data correction or deletion</li>
            <li>Opt out of non-essential communications</li>
            <li>Revoke credit data access authorization</li>
            <li>Export your data in portable format</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Compliance Frameworks</h2>
          <p>
            Level10 Financial complies with:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Fair Credit Reporting Act (FCRA)</li>
            <li>Gramm-Leach-Bliley Act (GLBA)</li>
            <li>Driver's Privacy Protection Act (DPPA)</li>
            <li>State consumer privacy laws (CCPA, CPRA, etc.)</li>
          </ul>
        </div>

        <p className="text-sm text-neutral-400 mt-8">
          Last Updated: January 2026<br />
          Contact our Data Protection Officer: privacy@level10.financial
        </p>
      </div>
    </div>
  );
}
