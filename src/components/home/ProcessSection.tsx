'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    headline: 'Understanding the real shape of the role.',
    body: 'We start with intake that goes beyond the job description — urgency, team reality, reporting line, and the actual cost of the wrong hire. The search is calibrated before it starts.',
    proof: 'Most failed hires trace back to a weak brief, not a weak market.',
  },
  {
    step: '02',
    title: 'Search',
    headline: 'Targeted outreach, not resume blasting.',
    body: 'Active and passive candidate pools are worked with the same criteria. Search logic is applied to the specific pressures of the industry — not a generic sourcing playbook.',
    proof: 'We work the hidden market. Most shortlisted candidates are not actively applying.',
  },
  {
    step: '03',
    title: 'Vetting',
    headline: 'In-depth qualification, not resume screening.',
    body: 'Every candidate is assessed against the real requirements — technical fit, shift reality, cultural alignment, and long-term viability. You receive a shortlist, not a stack.',
    proof: 'Tight shortlist logic means faster decisions and fewer second rounds.',
  },
  {
    step: '04',
    title: 'Placement',
    headline: 'Close support through offer and onboard.',
    body: 'Negotiation, offer framing, and early-tenure check-ins are part of the engagement. The hire does not end at acceptance — it ends when the person is productively in seat.',
    proof: 'Placement support reduces offer-to-start attrition and early exit risk.',
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-120px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.process-item');
      if (!items?.length) return;

      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#2C3434] py-24 md:py-36"
    >
      {/* Gold radial — top left */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: '#8B764C' }}
      />

      <div className="mx-auto max-w-[1380px] px-6 md:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em] text-[#AB9D82]">
            How It Works
          </p>
          <h2 className="max-w-[14ch] font-serif text-[2.4rem] leading-[0.92] tracking-[-0.045em] text-white md:text-[3.5rem]">
            The hiring journey, step by step.
          </h2>
        </motion.div>

        {/* Desktop: sticky left nav + right detail */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">

          {/* Left — step list (sticky) */}
          <div className="sticky top-28 h-fit space-y-1">
            {processSteps.map((p, i) => (
              <button
                key={p.step}
                onClick={() => setActive(i)}
                className={[
                  'process-item group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300',
                  active === i
                    ? 'bg-white/6'
                    : 'hover:bg-white/3',
                ].join(' ')}
                style={{ opacity: 0 }}
              >
                <span
                  className={[
                    'shrink-0 font-serif text-[11px] font-light transition-colors duration-300',
                    active === i ? 'text-[#8B764C]' : 'text-white/24',
                  ].join(' ')}
                >
                  {p.step}
                </span>
                <span
                  className={[
                    'text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300',
                    active === i ? 'text-white' : 'text-white/38 group-hover:text-white/60',
                  ].join(' ')}
                >
                  {p.title}
                </span>
                {active === i && (
                  <motion.div
                    layoutId="step-indicator"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8B764C]"
                  />
                )}
              </button>
            ))}

            <div className="px-5 pt-8">
              <Link
                href="/our-process"
                className="btn-outline border-white/14 py-3 text-[10px] text-white/60 hover:border-[#8B764C] hover:text-[#8B764C]"
              >
                Full Process Overview
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — detail panel */}
          <div className="relative min-h-[440px]">
            {processSteps.map((p, i) => (
              <motion.div
                key={p.step}
                initial={false}
                animate={
                  active === i
                    ? { opacity: 1, y: 0, pointerEvents: 'auto' }
                    : { opacity: 0, y: 16, pointerEvents: 'none' }
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="process-item depth-plane-dark rounded-[2rem] p-10 md:p-12" style={{ opacity: 0 }}>
                  {/* Step badge */}
                  <div className="mb-8 flex items-center gap-4">
                    <span className="rounded-full border border-[#8B764C]/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B764C]">
                      Step {p.step}
                    </span>
                    <div className="h-px flex-1 bg-white/6" />
                  </div>

                  <h3 className="mb-4 font-serif text-[2rem] leading-[0.96] tracking-[-0.03em] text-white md:text-[2.4rem]">
                    {p.headline}
                  </h3>
                  <p className="mb-8 max-w-[44ch] text-base leading-relaxed text-white/64">
                    {p.body}
                  </p>

                  {/* Proof statement */}
                  <div
                    className="rounded-xl border border-[#8B764C]/12 px-6 py-4"
                    style={{ background: 'rgba(139,118,76,0.05)' }}
                  >
                    <p className="text-sm leading-relaxed text-[#AB9D82]/80 italic">
                      &ldquo;{p.proof}&rdquo;
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="mt-10 flex gap-2">
                    {processSteps.map((_, j) => (
                      <button
                        key={j}
                        onClick={() => setActive(j)}
                        className={[
                          'h-1 rounded-full transition-all duration-300',
                          j === i
                            ? 'w-8 bg-[#8B764C]'
                            : 'w-2 bg-white/18 hover:bg-white/30',
                        ].join(' ')}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="space-y-5 lg:hidden">
          {processSteps.map((p, i) => (
            <div
              key={p.step}
              className="process-item depth-plane-dark rounded-[1.5rem] p-7"
              style={{ opacity: 0 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8B764C]">
                  {p.step} — {p.title}
                </span>
              </div>
              <h3 className="mb-3 font-serif text-[1.5rem] leading-[0.96] tracking-tight text-white">
                {p.headline}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{p.body}</p>
              <p className="mt-4 border-l border-[#8B764C]/20 pl-4 text-xs italic leading-relaxed text-[#AB9D82]/60">
                {p.proof}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
