'use client';

import Modal from './Modal';

interface StepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalStepConnect({ isOpen, onClose }: StepModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-green-400 text-sm font-semibold mb-2">STEP 1</div>
        <h2 className="text-3xl font-bold mb-6">Connect Your Financial Data</h2>
        
        <p className="text-neutral-300 mb-6">
          Level 10 uses secure, read-only access to analyze your financial profile. 
          We never store your login credentials and all data is encrypted both in transit and at rest.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔒</div>
            <div>
              <h3 className="font-semibold text-white mb-1">Bank-Level Security</h3>
              <p className="text-sm text-neutral-400">256-bit encryption protects your data at all times</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="text-2xl">📄</div>
            <div>
              <h3 className="font-semibold text-white mb-1">FCRA Compliant</h3>
              <p className="text-sm text-neutral-400">We only access data for legally permitted purposes</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="text-2xl">👁</div>
            <div>
              <h3 className="font-semibold text-white mb-1">Read-Only Access</h3>
              <p className="text-sm text-neutral-400">We can't move money or make changes to your accounts</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-white mb-2">What We Need</h4>
          <ul className="text-sm text-neutral-400 space-y-1">
            <li>✓ No SSN required at this stage</li>
            <li>✓ No hard credit pull</li>
            <li>✓ Basic financial data only</li>
          </ul>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition"
        >
          Got It
        </button>
      </div>
    </Modal>
  );
}

export function ModalStepAnalyze({ isOpen, onClose }: StepModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-green-400 text-sm font-semibold mb-2">STEP 2</div>
        <h2 className="text-3xl font-bold mb-6">Analyze Your Bankability</h2>
        
        <p className="text-neutral-300 mb-6">
          We generate your <strong>Level 10 Bankability Score</strong> — a proprietary metric 
          that estimates your likelihood of approval across different lenders and loan products.
        </p>

        <div className="bg-gradient-to-br from-green-900/30 to-neutral-900 border border-green-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-green-400 mb-3">What is the Bankability Score?</h3>
          <p className="text-sm text-neutral-300 mb-3">
            Unlike a traditional credit score (FICO), your Bankability Score measures your 
            <strong> complete financial readiness</strong> for funding approval.
          </p>
          <p className="text-sm text-neutral-300">
            It considers: credit history, income stability, debt ratios, banking behavior, 
            and business revenue (if applicable).
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Initial Analysis (No Identity Verification)</h4>
            <p className="text-sm text-neutral-400">
              We use <strong>partial signals</strong> to generate a preliminary score. 
              Full verification comes later when you're ready to apply.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Score Range: 1.0 - 10.0</h4>
            <p className="text-sm text-neutral-400">
              Higher scores indicate stronger approval probability. 
              Scores below 6.0 typically require improvement before applying.
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition"
        >
          Got It
        </button>
      </div>
    </Modal>
  );
}

export function ModalStepCoach({ isOpen, onClose }: StepModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-green-400 text-sm font-semibold mb-2">STEP 3</div>
        <h2 className="text-3xl font-bold mb-6">Get Coached to Improve</h2>
        
        <p className="text-neutral-300 mb-6">
          Our AI-powered coaching system creates a <strong>personalized roadmap</strong> with 
          specific, actionable tasks designed to improve your bankability over time.
        </p>

        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
          <p className="text-yellow-400 font-semibold mb-2">🎯 Education-First Approach</p>
          <p className="text-sm text-neutral-300">
            You remain in complete control. Nothing is applied, submitted, or changed 
            without your explicit consent.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="font-semibold text-white mb-2">What You Get</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>✓ Clear, prioritized tasks (e.g., "Reduce credit utilization to 30%")</li>
              <li>✓ Simulated outcomes showing score impact</li>
              <li>✓ Time-based guidance (30-day, 60-day, 90-day plans)</li>
              <li>✓ Educational resources for each task</li>
            </ul>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Example Task</h4>
            <p className="text-sm text-neutral-400 mb-2">
              <strong>Dispute Incorrect Late Payment</strong>
            </p>
            <p className="text-xs text-neutral-500">
              Impact: +0.4 to Bankability Score<br/>
              Timeline: 30-45 days<br/>
              Difficulty: Moderate
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition"
        >
          Got It
        </button>
      </div>
    </Modal>
  );
}

export function ModalStepApply({ isOpen, onClose }: StepModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-green-400 text-sm font-semibold mb-2">STEP 4</div>
        <h2 className="text-3xl font-bold mb-6">Apply to Matched Lenders</h2>
        
        <p className="text-neutral-300 mb-6">
          When you're ready, Level 10 connects you with lenders who are pre-qualified to 
          either <strong>approve you</strong> or <strong>coach you</strong> toward approval. 
          No more silent denials.
        </p>

        <div className="bg-gradient-to-br from-green-900/30 to-neutral-900 border border-green-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-green-400 mb-3">Soft Match vs Hard Inquiry</h3>
          <div className="space-y-3 text-sm text-neutral-300">
            <div>
              <strong className="text-white">Soft Match (No Credit Impact)</strong>
              <p>Initial lender review using your Bankability Score. Does not affect credit.</p>
            </div>
            <div>
              <strong className="text-white">Hard Inquiry (Only if You Proceed)</strong>
              <p>Full credit pull happens only when you formally apply to a lender.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">⚠️ Identity Verification Required</h4>
            <p className="text-sm text-neutral-400">
              At this stage, we'll need to verify your identity (SSN, DOB) to comply with 
              lending regulations and FCRA requirements.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Business vs Personal Funding</h4>
            <p className="text-sm text-neutral-400 mb-2">
              <strong>Personal:</strong> SSN, income verification<br/>
              <strong>Business:</strong> EIN, business tax returns, ownership structure
            </p>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
          <p className="text-blue-400 font-semibold mb-2">🤝 The Level 10 Guarantee</p>
          <p className="text-sm text-neutral-300">
            Every lender on our platform commits to either approve you or provide specific, 
            actionable coaching. No silent denials.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition"
        >
          Got It
        </button>
      </div>
    </Modal>
  );
}
