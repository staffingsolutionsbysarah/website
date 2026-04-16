'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const proofStrip = [
  { value: '10+ years', label: 'industrial and business-side recruitment' },
  { value: 'Direct access', label: 'to Sarah from intake through close' },
  { value: 'Fit over volume', label: 'to reduce weak interviews and wasted review' },
  { value: 'Ontario-first', label: 'with manufacturing and skilled trades relevance' },
] as const;

export function ProofStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative z-10 -mt-16 md:-mt-24"
    >
      <div className="depth-earth mx-auto grid w-[calc(100%-3rem)] gap-6 py-8 md:grid-cols-4 md:px-10">
        {proofStrip.map((item, index) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative py-4"
          >
            <motion.div 
              className="absolute -inset-4 rounded-[28px] bg-white/60 backdrop-blur-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                boxShadow: '0 8px 32px rgba(92, 74, 61, 0.08), 0 16px 48px rgba(92, 74, 61, 0.05)'
              }}
            />
            <div className="relative">
              <p className="text-[1.45rem] tracking-tight text-[var(--color-dark)]">{item.value}</p>
              <p className="mt-3 max-w-[18ch] text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
