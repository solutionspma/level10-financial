export default function FCRA() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">FCRA Compliance</h1>
      
      <div className="space-y-6 text-neutral-300">
        <p className="text-lg">
          Level10 Financial is committed to full compliance with the Fair Credit Reporting Act (FCRA) 
          and maintains rigorous standards for consumer credit data protection.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Our FCRA Commitments</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Permissible Purpose</strong> - We only access credit data for legally authorized purposes</li>
            <li><strong>User Authorization</strong> - Explicit written consent obtained before any credit pull</li>
            <li><strong>Accurate Disclosure</strong> - Clear explanation of what data we access and why</li>
            <li><strong>Secure Handling</strong> - Enterprise-grade encryption and access controls</li>
            <li><strong>Limited Retention</strong> - Data stored only as long as necessary for stated purposes</li>
            <li><strong>No Unauthorized Sharing</strong> - Consumer data never sold or shared without permission</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Soft Credit Pull Disclosure</h2>
          <p className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            Level10 uses <strong>soft credit inquiries</strong> that do not impact your credit score. 
            These inquiries are visible only to you and are used exclusively for generating your 
            Bankability Score and providing financial coaching recommendations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Your Rights Under FCRA</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Right to know what information is in your file</li>
            <li>Right to dispute incomplete or inaccurate information</li>
            <li>Right to revoke authorization at any time</li>
            <li>Right to know who has accessed your credit report</li>
            <li>Right to opt out of prescreened credit offers</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">Dispute Resolution</h2>
          <p>
            If you believe any credit information we've accessed is inaccurate or being used improperly, 
            please contact our compliance team immediately at compliance@level10.financial. 
            We will investigate and respond within 30 days as required by FCRA.
          </p>
        </div>

        <div className="bg-green-950 border border-green-800 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Consumer Reporting Agency (CRA) Partnership</h3>
          <p>
            Level10 partners with FCRA-compliant Consumer Reporting Agencies including MicroBilt 
            to access credit data. All CRA partners maintain strict compliance standards and 
            are regularly audited for data protection practices.
          </p>
        </div>

        <p className="text-sm text-neutral-400 mt-8">
          Last Updated: January 2026<br />
          FCRA Reference: 15 U.S.C. § 1681 et seq.<br />
          Questions? Contact compliance@level10.financial
        </p>
      </div>
    </div>
  );
}
