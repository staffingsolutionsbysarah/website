'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const advantages = [
  {
    num: '01',
    title: 'Direct Access',
    desc: 'No junior recruiters. You work directly with Sarah for every search.',
  },
  {
    num: '02',
    title: 'Market Intelligence',
    desc: 'Deep-rooted knowledge of the industrial and professional landscape.',
  },
  {
    num: '03',
    title: 'Rigorous Vetting',
    desc: "We don't just send resumes; we send solutions. Every candidate is thoroughly vetted.",
  },
];

export default function TrustBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-10 bg-parchment text-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-12 md:mb-16 text-espresso">
          The Boutique Advantage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="space-y-4"
            >
              <div className="text-brand-green text-3xl md:text-4xl font-serif italic">
                {item.num}
              </div>
              <h4 className="text-lg md:text-xl font-bold text-espresso">{item.title}</h4>
              <p className="text-charcoal/70 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}