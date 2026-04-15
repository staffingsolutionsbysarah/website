'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const clients = [
  'Manufacturing Co.',
  'Ontario Plants',
  'Trades Union',
  'Construction Group',
  'Finance Partners',
  'Retail Chain',
];

export function ClientLogosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-[var(--color-parchment-ivory)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,166,74,0.08),transparent_70%)]" />

      <div ref={ref} className="relative mx-auto max-w-[1380px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-stone-veil)]">
            Trusted by employers across Ontario
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="flex h-14 items-center justify-center rounded-[12px] border border-[var(--color-khaki)]/30 bg-white/60 px-6 py-3 transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:bg-white hover:shadow-md">
                <span className="text-[13px] font-medium tracking-wide text-[var(--color-smoked-umber)] transition-colors group-hover:text-[var(--color-dark)]">
                  {client}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
