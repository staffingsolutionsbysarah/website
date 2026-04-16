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
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  
  const floatingY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -8, 0, 8, 0]
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden px-4 py-18 md:px-6 md:py-24">
      <motion.div 
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-parchment-ivory)] via-transparent to-[var(--color-parchment-ivory)]"
      />
      
      <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)] lg:items-center">
        <motion.div
          ref={imageRef}
          style={{ y: imageY, scale: imageScale }}
          className="relative aspect-[3/4] overflow-hidden rounded-[28px] lg:aspect-square"
        >
          <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent blur-2xl" />
          <Image
            src="/images/portrait-sarah-fell-recruitment.png"
            alt="Sarah Fell - Recruitment Consultant"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 38vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          
          <motion.div
            style={{ y: floatingY }}
            className="absolute -right-4 -bottom-4 rounded-[20px] border border-[var(--color-khaki)]/30 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-md lg:-right-6 lg:-bottom-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-smoked-umber)]">Trusted by</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-[var(--color-dark)]">100+ Employers</p>
          </motion.div>
        </motion.div>

        <motion.div ref={textRef} style={{ y: textY }}>
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
                initial={{ opacity: 0, x: -40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3"
              >
                <motion.div 
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="text-sm leading-relaxed text-black/78">{credential}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}