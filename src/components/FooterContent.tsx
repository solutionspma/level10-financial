'use client';

import { useState } from 'react';
import Link from 'next/link';
import ComplianceModal from './ComplianceModal';

export default function FooterContent() {
  const [activeModal, setActiveModal] = useState<'fcra' | 'glba' | 'dppa' | 'soc2' | 'encryption' | null>(null);

  return (
    <>
      <footer className="border-t border-neutral-800 p-6 text-xs text-neutral-400">
        <div className="max-w-6xl mx-auto">
          {/* Legal & Policy Links */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/privacy" className="text-green-400 hover:underline hover:text-green-300 transition">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="text-green-400 hover:underline hover:text-green-300 transition">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/fcra" className="text-green-400 hover:underline hover:text-green-300 transition">
              FCRA Notice
            </Link>
            <span>·</span>
            <Link href="/permissible-purpose" className="text-green-400 hover:underline hover:text-green-300 transition">
              Permissible Purpose
            </Link>
            <span>·</span>
            <Link href="/contact" className="text-green-400 hover:underline hover:text-green-300 transition">
              Contact Us
            </Link>
          </div>

          {/* Compliance Badges */}
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Level 10 Financial ·</span>
            <button
              onClick={() => setActiveModal('fcra')}
              className="text-green-400 hover:underline hover:text-green-300 transition"
            >
              FCRA
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveModal('glba')}
              className="text-green-400 hover:underline hover:text-green-300 transition"
            >
              GLBA
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveModal('dppa')}
              className="text-green-400 hover:underline hover:text-green-300 transition"
            >
              DPPA
            </button>
            <span>Compliant ·</span>
            <button
              onClick={() => setActiveModal('soc2')}
              className="text-green-400 hover:underline hover:text-green-300 transition"
            >
              SOC 2
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveModal('encryption')}
              className="text-green-400 hover:underline hover:text-green-300 transition"
            >
              256-bit Encryption
            </button>
          </div>

          {/* Company Credit */}
          <div className="text-center">
            A{' '}
            <a
              href="https://pitchmarketingagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              Pitch Market Strategies & Public Relations
            </a>{' '}
            Company
          </div>
        </div>
      </footer>

      {/* Compliance Modals */}
      {activeModal && (
        <ComplianceModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          type={activeModal}
        />
      )}
    </>
  );
}
