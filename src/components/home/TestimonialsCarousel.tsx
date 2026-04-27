'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    quote:
      "Sarah filled a role we had struggled with for months. Her shortlist was tight and every candidate was genuinely qualified. We made an offer in the first round.",
    name:    'Operations Manager',
    company: 'Ontario Manufacturing Co.',
    sector:  'Manufacturing',
  },
  {
    quote:
      "What stood out was that Sarah understood the pressure we were under. She moved fast without dropping judgment — that's a rare combination.",
    name:    'HR Director',
    company: 'GTA Industrial Group',
    sector:  'Industrial',
  },
  {
    quote:
      "We've used larger agencies before. The difference with Sarah is that she actually understood what we needed before she started searching. Stronger shortlist, less back-and-forth.",
    name:    'Plant Manager',
    company: 'Windsor Distribution Centre',
    sector:  'Operations',
  },
];

export default function TestimonialsCarousel() {
  const ref     = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: '#EFEDEF' }}
    >
      {/* Subtle warm radial */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139,118,76,0.06), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-[1380px] px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-18"
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em] text-[#8B764C]">
            Client Voices
          </p>
          <h2 className="max-w-[16ch] font-serif text-[2.2rem] leading-[0.94] tracking-[-0.045em] text-[#2C3434] md:text-[3.2rem]">
            Built on trust and real results.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }}
              className="depth-plane flex flex-col rounded-[2rem] p-8 md:p-10"
            >
              {/* Sector tag */}
              <div className="mb-6">
                <span
                  className="inline-block rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em]"
                  style={{
                    background: 'rgba(139,118,76,0.1)',
                    color: '#8B764C',
                  }}
                >
                  {t.sector}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="flex-1">
                <p
                  className="font-serif text-[1.2rem] italic leading-[1.45] tracking-[-0.01em] text-[#2C3434] md:text-[1.35rem]"
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Divider */}
              <div
                className="editorial-rule my-6"
              />

              {/* Attribution */}
              <footer>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2C3434]">
                  {t.name}
                </p>
                <p className="mt-1 text-[11px] text-[#2C3434]/44">
                  {t.company}
                </p>
              </footer>
            </motion.article>
          ))}
        </div>

        {/* Bottom editorial rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="editorial-rule mt-14 md:mt-18"
        />
      </div>
    </section>
  );
}
