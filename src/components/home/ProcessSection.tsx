'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    title: 'Scope the role properly',
    body: 'Start with the real vacancy: reporting line, urgency, shift or plant context, team pressure, compensation, and what happens if the role stays open.',
    outcome: 'Clearer search brief and better market alignment.',
  },
  {
    title: 'Search and screen against reality',
    body: 'Candidate outreach and qualification stay anchored to technical relevance, environment fit, and whether the person can actually work in the role as described.',
    outcome: 'Less noise and fewer weak interviews.',
  },
  {
    title: 'Present a tighter shortlist',
    body: 'Candidates are framed with fit rationale so the hiring team is reviewing a smaller, stronger group instead of sorting volume.',
    outcome: 'Faster review with better judgment.',
  },
  {
    title: 'Run a tighter feedback loop',
    body: 'Interview movement, objections, and decision friction are managed directly so good candidates do not disappear into slow process.',
    outcome: 'More momentum through interview stage.',
  },
  {
    title: 'Support the close',
    body: 'Offer-stage communication stays practical and direct through acceptance, handoff, and the final stretch of the hiring decision.',
    outcome: 'Stronger close quality and less last-mile wobble.',
  },
] as const;

function ProcessCard({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      className={[
        'depth-plane-dark rounded-[30px] px-6 py-6 md:px-8 md:py-8',
        index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12',
      ].join(' ')}
    >
      <div className="absolute -left-[1.15rem] top-7 flex h-9 w-9 items-center justify-center rounded-full border border-[#E7D08A]/26 bg-[#E7D08A]/12 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E7D08A] md:-left-[1.4rem] md:h-11 md:w-11">
        {String(index + 1).padStart(2, '0')}
      </div>

      <h3 className="max-w-[18ch] text-[1.7rem] leading-[1.02] tracking-tight text-white md:text-[2rem]">
        {step.title}
      </h3>
      <p className="mt-4 max-w-[40rem] text-sm leading-relaxed text-white/74 md:text-base">
        {step.body}
      </p>
      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
        {step.outcome}
      </p>
    </motion.article>
  );
}

function ConnectingLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="absolute bottom-6 left-0 top-6 w-px overflow-hidden bg-[linear-gradient(180deg,rgba(231,208,138,0.12),rgba(231,208,138,0.72),rgba(231,208,138,0.12))]">
      <motion.div
        className="absolute inset-x-0 top-0 bg-[#E7D08A]"
        style={{ height: isInView ? undefined : '0%', scaleY: height }}
      />
    </div>
  );
}

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ y: sectionY, opacity }}
      className="relative mt-4 px-4 pb-20 pt-18 text-white md:px-6 md:pb-26 md:pt-24" 
      id="process"
    >
      <div className="absolute inset-x-0 bottom-0 top-0 bg-[#1F2628]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(198,166,74,0.18),transparent_58%)]" />
      <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[minmax(300px,0.36fr)_minmax(0,0.64fr)]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#E7D08A]">Process</p>
            <h2 className="mt-4 max-w-[10ch] text-[2.7rem] leading-[0.94] tracking-[-0.045em] text-white md:text-[3.65rem]">
              A guided search process instead of a vague recruiter pitch.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-white/72">
              Five steps with no hand-offs between intake and close. Scope, search, shortlist, feedback, and offer-stage communication stay connected so judgment does not get lost between stages.
            </p>

            <div className="mt-8 depth-plane-dark rounded-[30px] px-6 py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">Outcome focus</p>
              <p className="mt-4 text-[1.35rem] leading-[1.45] tracking-tight text-white">
                Clearer briefs. Fewer weak interviews. Better shortlist control.
              </p>
            </div>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative pl-7 md:pl-10">
          <ConnectingLine />

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}