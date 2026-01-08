'use client';

import Modal from './Modal';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'fcra' | 'glba' | 'dppa' | 'soc2' | 'encryption';
}

export default function ComplianceModal({ isOpen, onClose, type }: ComplianceModalProps) {
  const content = {
    fcra: {
      title: 'FCRA Compliance',
      icon: '📄',
      description: 'The Fair Credit Reporting Act (FCRA) protects your credit information.',
      points: [
        'We only access your credit data for legally permitted purposes',
        'You must provide explicit consent before any credit pull',
        'Soft inquiries do not affect your credit score',
        'You can dispute inaccurate information at any time',
        'Your data is never shared without your permission',
      ],
    },
    glba: {
      title: 'GLBA Compliance',
      icon: '🔐',
      description: 'The Gramm-Leach-Bliley Act requires financial institutions to protect your privacy.',
      points: [
        'We explain how we collect and use your information',
        'Your data is protected with bank-level security',
        'We never sell your personal information',
        'You can opt out of data sharing with third parties',
        'Annual privacy notices keep you informed',
      ],
    },
    dppa: {
      title: 'DPPA Compliance',
      icon: '🚗',
      description: 'The Driver\'s Privacy Protection Act safeguards your motor vehicle records.',
      points: [
        'We only access DMV records for permissible purposes',
        'Personal information from DMV is kept confidential',
        'Used only for credit evaluation and fraud prevention',
        'Never used for solicitation or marketing',
        'Strict access controls and audit trails maintained',
      ],
    },
    soc2: {
      title: 'SOC 2 Certified',
      icon: '✓',
      description: 'SOC 2 certification means our systems are independently audited for security and compliance.',
      points: [
        'Independent third-party audits of our security controls',
        'Verified protection against unauthorized access',
        'Continuous monitoring of system availability',
        'Regular security updates and patch management',
        'Incident response procedures tested and verified',
      ],
    },
    encryption: {
      title: '256-Bit Encryption',
      icon: '🔒',
      description: 'We use military-grade encryption to protect your data at all times.',
      points: [
        'AES 256-bit encryption for data at rest',
        'TLS 1.3 encryption for data in transit',
        'End-to-end encryption for sensitive transactions',
        'Encrypted backups with secure key management',
        'Zero-knowledge architecture where possible',
      ],
    },
  };

  const { title, icon, description, points } = content[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="600px">
      <div className="p-8">
        <div className="text-4xl mb-4 text-center">{icon}</div>
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-neutral-300 mb-6">{description}</p>
        
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-white mb-4">What This Means For You</h3>
          <ul className="space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-neutral-400">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{point}</span>
              </li>
            ))}
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
