'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const credentials = [
  '10+ years industrial and business-side recruitment',
  'Direct access to Sarah from intake through close',
  'Fit over volume to reduce weak interviews and wasted review',
  'Ontario-first with manufacturing and skilled trades relevance',
];

export default function TrustBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative px-4 py-18 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)] lg:items-center">
        <motion.div
          style={{ y, opacity }}
          className="relative aspect-[3/4] overflow-hidden rounded-[28px] lg:aspect-square"
        >
          <Image
            src="/images/Sarah Fell-image.png"
            alt="Sarah Fell - Recruitment Consultant"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 38vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Why Sarah?
          </p>
          <h2 className="mt-4 max-w-[12ch] text-[2.5rem] leading-[0.95] tracking-[-0.045em] md:text-[3.3rem]">
            A recruiter who stays connected from intake to close.
          </h2>
          <p className="mt-5 max-w-[40rem] text-base leading-relaxed text-black/66">
            No hand-offs, no layered process. Every call, shortlist, and hiring decision moves through the same
            recruiter who understood the role from the start.
          </p>

          <div className="mt-10 space-y-4">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <p className="text-sm leading-relaxed text-black/78">{credential}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}