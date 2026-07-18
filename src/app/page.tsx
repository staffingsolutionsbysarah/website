'use client';

import { useState } from 'react';
import PreloaderSearch from '@/components/home/PreloaderSearch';
import HeroMachinedStage from '@/components/home/HeroMachinedStage';
import JobsMaterialCards from '@/components/home/JobsMaterialCards';
import { ProcessSection } from '@/components/home/ProcessSection';

const proofStrip = [
  { value: '10+ Years', label: 'Experience' },
  { value: 'Direct Access', label: 'Network' },
  { value: 'Fit Over Volume', label: 'Philosophy' },
  { value: 'Global Network', label: 'Focus' },
] as const;

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <main className="bg-[#FAF9F6] text-[#2C3434]">
      {/* Search-montage preloader — every search ends at the brand */}
      {!preloaderDone && (
        <PreloaderSearch onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Hero — 3D machined part on dark stage */}
      <HeroMachinedStage />

      {/* Proof Strip — dark band anchored to hero base */}
      <section className="relative z-10 bg-[#2C3434] py-8 md:py-12 border-t border-white/8">
        <div className="mx-auto grid w-[calc(100%-3rem)] gap-6 py-4 md:grid-cols-4 md:px-10">
          {proofStrip.map((item, i) => (
            <div key={item.value} className={`text-center ${i < proofStrip.length - 1 ? 'border-r border-white/10' : ''}`}>
              <span className="block text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: '#C8AD6A' }}>
                {item.label}
              </span>
              <span className="text-white font-serif text-lg md:text-xl">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Active roles — material texture cards */}
      <JobsMaterialCards />

      {/* Client logos + testimonials removed until real, consented material exists (see PRD P2) */}

      {/* Process */}
      <ProcessSection />

    </main>
  );
}
