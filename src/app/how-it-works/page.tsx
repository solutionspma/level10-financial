'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ModalStepConnect, ModalStepAnalyze, ModalStepCoach, ModalStepApply } from '@/components/StepModals';

export default function HowItWorks() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const steps = [
    ['Connect', 'Securely connect your credit and financial data', 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260'],
    ['Analyze', 'We generate your Level10 Bankability Score', 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260'],
    ['Coach', 'Clear tasks to improve approval odds', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260'],
    ['Apply', 'Matched with lenders who approve or coach', 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260'],
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Financial planning"
          fill
          className="object-cover opacity-30"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">How Level 10 Works</h1>
            <p className="text-xl text-neutral-200">Four simple steps from denial to approval</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {steps.map(([title, desc, img], index) => (
          <button
            key={title}
            onClick={() => setActiveModal(index)}
            className="relative h-64 rounded-xl overflow-hidden group bg-neutral-900 text-left cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <Image 
              src={img} 
              alt={title} 
              fill 
              className="object-cover opacity-60 group-hover:opacity-70 transition-opacity" 
              unoptimized
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="text-green-400 font-bold text-2xl mb-2">Step {index + 1}</div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
              <p className="text-neutral-300 mb-2">{desc}</p>
              <span className="text-green-400 text-sm font-semibold">Click to learn more →</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="/register" className="bg-green-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition">
          Start Your Journey
        </a>
      </div>

      {/* Modals */}
      <ModalStepConnect isOpen={activeModal === 0} onClose={() => setActiveModal(null)} />
      <ModalStepAnalyze isOpen={activeModal === 1} onClose={() => setActiveModal(null)} />
      <ModalStepCoach isOpen={activeModal === 2} onClose={() => setActiveModal(null)} />
      <ModalStepApply isOpen={activeModal === 3} onClose={() => setActiveModal(null)} />
    </div>
  );
}
