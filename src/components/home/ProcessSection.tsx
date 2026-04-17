'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Understanding your technical needs and culture.' },
  { step: '02', title: 'Search', desc: 'Targeted outreach to passive and active talent.' },
  { step: '03', title: 'Vetting', desc: 'In-depth interviewing and technical assessment.' },
  { step: '04', title: 'Placement', desc: 'Negotiation support and onboarding success.' },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-10 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal">The Hiring Journey</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {processSteps.map((p, i) => (
            <div key={p.step} className="relative group">
              <div className="text-gold/10 text-6xl md:text-8xl font-serif absolute -top-8 md:-top-10 -left-4 group-hover:text-gold/20 transition-colors">
                {p.step}
              </div>
              <div className="relative z-10 pt-8 md:pt-10">
                <h4 className="text-lg md:text-xl font-bold text-charcoal mb-3 md:mb-4">{p.title}</h4>
                <p className="text-charcoal/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}