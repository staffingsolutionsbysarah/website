'use client';

import { useRef } from 'react';
import { Clock3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

import LiquidGlassHero from '@/components/home/LiquidGlassHero';
import HorizontalStackingCards from '@/components/home/HorizontalStackingCards';
import { ClientLogosSection } from '@/components/home/ClientLogosSection';
import { ServicesIndustriesSection } from '@/components/home/ServicesIndustriesSection';
import { DeliveryModelsSection } from '@/components/home/DeliveryModelsSection';
import TrustBlock from '@/components/home/TrustBlock';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import { ProcessSection } from '@/components/home/ProcessSection';

const proofStrip = [
  { value: '10+ years', label: 'industrial and business-side recruitment' },
  { value: 'Direct access', label: 'to Sarah from intake through close' },
  { value: 'Fit over volume', label: 'to reduce weak interviews and wasted review' },
  { value: 'Ontario-first', label: 'with manufacturing and skilled trades relevance' },
] as const;

const insightCards = [
  {
    kicker: 'From Sarah',
    title: 'Where industrial hiring processes lose good candidates first.',
    body: 'A recruiter-led note on vague briefs, slow interview movement, and why good people disappear faster than teams expect.',
  },
  {
    kicker: 'Market signals',
    title: 'What Ontario employers are tightening in skilled trades hiring right now.',
    body: 'Short commercial observations designed to help employers calibrate earlier and hire with less drag.',
  },
  {
    kicker: 'Perspective',
    title: 'What hiring managers are getting wrong about candidate availability right now.',
    body: 'Strong candidates move faster than most hiring timelines expect. The employers closing roles in this market are calibrated earlier — not lower.',
  },
] as const;

export default function HomePage() {
  const insightsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: insightsRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-dark)]">
      {/* Hero - Full bleed */}
      <LiquidGlassHero />

      {/* Proof Strip - Layered over hero */}
      <section className="relative z-10 -mt-16 md:-mt-24">
        <div className="depth-earth mx-auto grid w-[calc(100%-3rem)] gap-6 py-8 md:grid-cols-4 md:px-10">
          {proofStrip.map((item) => (
            <div key={item.value} className="py-4">
              <p className="text-[1.45rem] tracking-tight text-[var(--color-dark)]">{item.value}</p>
              <p className="mt-3 max-w-[18ch] text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Cards - GSAP scroll-stop */}
      <HorizontalStackingCards />

      {/* Client Logos */}
      <ClientLogosSection />

      {/* Delivery Models */}
      <DeliveryModelsSection />

      {/* Services/Industries */}
      <section className="bg-[var(--color-parchment-ivory)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,166,74,0.12),transparent_60%)] opacity-50" />
        <div className="relative">
          <ServicesIndustriesSection />
        </div>
      </section>

      {/* Trust Block */}
      <TrustBlock />

      {/* Testimonials */}
      <section className="bg-[var(--color-muted-clay-beige)]">
        <TestimonialsCarousel />
      </section>

      {/* Process */}
      <section className="bg-[var(--color-soft-mushroom-taupe)]">
        <ProcessSection />
      </section>

      {/* Insights */}
      <motion.div
        ref={insightsRef}
        style={{ y, opacity }}
        className="bg-[var(--color-crease)] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="depth-khaki mx-auto grid w-full gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <article className="px-8 py-10 md:px-12 md:py-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-primary)]">
              Insights / content module
            </p>
            <h2 className="mt-5 max-w-[11ch] text-[2.65rem] leading-[0.95] tracking-[-0.045em] md:text-[3.45rem]">
              Current enough to feel alive. Focused enough to stay credible.
            </h2>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-[var(--color-smoked-umber)]">
              Periodic notes from Sarah on what is affecting industrial and trades hiring across Ontario.
            </p>

            <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[var(--color-khaki)] to-transparent" />

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-stone-veil)]">From Sarah</p>
            <p className="mt-4 max-w-[36ch] text-[1.5rem] leading-[1.38] tracking-tight text-[var(--color-dark)] md:text-[1.82rem]">
              The fastest way to lose good industrial candidates is still the same: a vague brief, slow feedback, and too much internal hesitation.
            </p>
          </article>

          <div className="space-y-5">
            {insightCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="rounded-[28px] border border-[var(--color-muted-clay-beige)] bg-white/80 px-6 py-7 backdrop-blur-sm md:px-7"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-dusty-bronze)]">{card.kicker}</p>
                <h3 className="mt-4 text-[1.5rem] leading-[1.08] tracking-tight text-[var(--color-espresso-brown)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-smoked-umber)]">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <section className="relative bg-[var(--color-espresso-brown)] pt-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-crease)] to-transparent opacity-40" />
        <div className="relative mx-auto grid max-w-[1380px] gap-6 px-6 pb-0 lg:grid-cols-[minmax(0,1.18fr)_360px]">
          <div className="depth-dark-panel px-8 py-10 md:px-12 md:py-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-aged-brass-highlight)]">
              Final step
            </p>
            <h2 className="mt-5 max-w-[13ch] text-[2.45rem] leading-[0.98] tracking-[-0.04em] text-white md:text-[3.2rem]">
              Talk through the role. Leave with a clearer hiring plan.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/70">
              Whether the search is urgent coverage or a harder-to-fill long-term role, the next step should feel direct, useful, and commercially grounded.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/book-a-call" className="btn-primary !bg-[var(--color-primary)] !border-[var(--color-primary)] !text-[var(--color-dark)] hover:!bg-[var(--color-aged-brass-highlight)] hover:!border-[var(--color-aged-brass-highlight)]">
                <Clock3 className="h-4 w-4" />
                Book a Hiring Call
              </Link>
              <Link href="/about" className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                About Sarah
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-[var(--color-dusty-bronze)]/30 bg-[var(--color-smoked-umber)]/40 px-7 py-9 backdrop-blur-md md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-champagne-haze)]">Candidate path</p>
            <h3 className="mt-5 text-[1.85rem] leading-[1.04] tracking-tight text-white">Looking for an active role?</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Browse current public openings or use the candidate hub as the cleanest route into the recruitment side of the site.
            </p>

            <Link
              href="/find-work"
              className="mt-10 inline-flex items-center justify-between border border-[var(--color-aged-brass-highlight)]/50 bg-[var(--color-aged-brass-highlight)]/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-champagne-haze)] transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/30"
            >
              Find Your Next Role
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
