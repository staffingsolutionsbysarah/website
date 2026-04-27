'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const models = [
  {
    label: '01',
    title: 'Direct Hire',
    body: 'Full-time permanent placement with direct recruiter ownership. Search, qualify, shortlist, close.',
  },
  {
    label: '02',
    title: 'Retained Search',
    body: 'Priority search for executive and hard-to-fill roles. Deeper market commitment, stronger shortlist control.',
  },
  {
    label: '03',
    title: 'Contract & Temp-to-Perm',
    body: 'Flexible staffing for project coverage or interim needs. Verify fit before a permanent commitment.',
  },
  {
    label: '04',
    title: 'Payroll / EOR',
    body: 'Administrative and payroll support for contract teams. Simplify workforce compliance and management.',
  },
] as const;

export function DeliveryModelsSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: '#EFEDEF' }}
    >
      <div className="mx-auto max-w-[1380px] px-6 md:px-10">

        {/* Header row */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em] text-[#8B764C]">
              How We Work
            </p>
            <h2 className="max-w-[16ch] font-serif text-[2.2rem] leading-[0.94] tracking-[-0.045em] text-[#2C3434] md:text-[3rem]">
              Delivery models built around the search, not a contract tier.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/services" className="btn-primary">
              All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Editorial rule */}
        <div className="editorial-rule mb-12 md:mb-14" />

        {/* Model rows — editorial list layout */}
        <div className="divide-y divide-black/[0.06]">
          {models.map((model, i) => (
            <motion.div
              key={model.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
              className="group grid grid-cols-[48px_1fr] items-start gap-6 py-6 md:grid-cols-[64px_1fr_1fr] md:items-center md:gap-10 md:py-7"
            >
              <span className="font-serif text-2xl font-light text-[#8B764C]/40 transition-colors duration-300 group-hover:text-[#8B764C]/70 md:text-3xl">
                {model.label}
              </span>
              <h3 className="font-serif text-[1.4rem] leading-tight tracking-[-0.02em] text-[#2C3434] md:text-[1.65rem]">
                {model.title}
              </h3>
              <p className="col-start-2 col-end-3 mt-1 text-sm leading-relaxed text-black/52 md:col-auto md:mt-0 md:text-base">
                {model.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="editorial-rule mt-0" />
      </div>
    </section>
  );
}
