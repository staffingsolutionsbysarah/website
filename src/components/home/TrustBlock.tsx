'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const pillars = [
  {
    num: '01',
    title: 'Direct search ownership',
    body: 'The search does not get handed off through layers. Intake, calibration, shortlist logic, and close stay connected — one recruiter, start to finish.',
  },
  {
    num: '02',
    title: 'Business-aware qualification',
    body: 'Candidate review is shaped around urgency, team reality, reporting line, and the actual cost of a weak hire — not just a skills checklist.',
  },
  {
    num: '03',
    title: 'Less hiring drag',
    body: 'Clearer search direction and tighter feedback loops help employers move faster without lowering judgment. Fewer rounds. Stronger shortlists.',
  },
] as const;

export default function TrustBlock() {
  const ref     = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: '#2C3434' }}
    >
      {/* Gold radial top-right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: '#8B764C' }}
      />

      <div className="relative mx-auto max-w-[1380px] px-6 md:px-10">

        {/* Top split: header + Sarah portrait */}
        <div className="mb-16 grid items-end gap-12 md:mb-20 md:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em] text-[#AB9D82]">
              Why Sarah
            </p>
            <h2 className="max-w-[18ch] font-serif text-[2.2rem] leading-[0.94] tracking-[-0.045em] text-white md:text-[3.2rem]">
              The boutique advantage for serious searches.
            </h2>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-white/56">
              10+ years of industrial and professional recruitment in Ontario. Every engagement runs with direct recruiter ownership — no hand-offs, no junior screening layers.
            </p>
          </motion.div>

          {/* Sarah portrait pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="hidden md:block"
          >
            <div
              className="relative h-24 w-24 overflow-hidden rounded-full border-2 md:h-28 md:w-28"
              style={{ borderColor: 'rgba(139,118,76,0.3)' }}
            >
              <Image
                src="/images/portrait-sarah-fell-recruitment.png"
                alt="Sarah Fell — Ontario Recruitment Consultant"
                fill
                sizes="112px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>

        {/* Editorial rule */}
        <div
          className="mb-14 h-px md:mb-16"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.08) 18%, rgba(255,255,255,0.08) 82%, rgba(255,255,255,0))',
          }}
        />

        {/* Pillars */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.12,
              }}
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="font-serif text-3xl font-light italic text-[#8B764C]/40">
                  {p.num}
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                />
              </div>
              <h4 className="mb-3 text-[1.05rem] font-semibold leading-snug tracking-tight text-white">
                {p.title}
              </h4>
              <p className="text-sm leading-relaxed text-white/52">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="mt-14 flex flex-wrap items-center gap-4 md:mt-16"
        >
          <Link href="/about" className="btn-gold">
            About Sarah
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/hire-talent"
            className="btn-outline border-white/14 text-white/72 hover:border-white/30 hover:text-white"
          >
            Start a Search
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
