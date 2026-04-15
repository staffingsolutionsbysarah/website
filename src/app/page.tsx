'use client';

import { CheckCircle2, Clock3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal, ParallaxSection, Parallax, FadeIn, ClipReveal, ScaleReveal, LayeredSection } from '@/components/home/ScrollLayers';

import LiquidGlassHero from '@/components/home/LiquidGlassHero';
import HorizontalStackingCards from '@/components/home/HorizontalStackingCards';
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
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)]">
      {/* Hero - Full bleed, cinematic */}
      <ScaleReveal className="relative z-0">
        <LiquidGlassHero />
      </ScaleReveal>

      {/* Proof Strip - Layered over hero with earth tone depth */}
      <LayeredSection overlap="lg" className="relative z-10">
        <ParallaxSection direction="up" speed={0.12} className="w-full px-6">
          <div className="depth-earth mx-auto grid w-full gap-6 py-6 md:grid-cols-4 md:px-8">
            {proofStrip.map((item) => (
              <div key={item.value} className="stagger-item py-6 md:py-8">
                <p className="text-[1.45rem] tracking-tight text-[var(--color-dark)]">{item.value}</p>
                <p className="mt-3 max-w-[18ch] text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </ParallaxSection>
      </LayeredSection>

      {/* Horizontal Cards - Dramatic reveal with bronze depth */}
      <ClipReveal direction="up" className="relative z-20">
        <ScrollReveal direction="left" intensity="dramatic">
          <HorizontalStackingCards />
        </ScrollReveal>
      </ClipReveal>

      {/* Delivery Models - Khaki depth with overlap */}
      <LayeredSection overlap="md" zIndex={15}>
        <ScaleReveal>
          <ScrollReveal direction="right" intensity="medium">
            <DeliveryModelsSection />
          </ScrollReveal>
        </ScaleReveal>
      </LayeredSection>

      {/* Services/Industries - Bronze glow reveal */}
      <div className="relative z-20 bg-ivory">
        <div className="absolute inset-0 bg-bronze-glow opacity-50" />
        <div className="relative">
          <ClipReveal direction="up">
            <ScrollReveal direction="left" stagger intensity="dramatic">
              <ServicesIndustriesSection />
            </ScrollReveal>
          </ClipReveal>
        </div>
      </div>

      {/* Trust Block - Dark panel with gold accents */}
      <LayeredSection overlap="lg" zIndex={10}>
        <ParallaxSection direction="up" speed={0.15}>
          <TrustBlock />
        </ParallaxSection>
      </LayeredSection>

      {/* Testimonials - Clay/beige depth */}
      <div className="relative z-20 bg-clay">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-parchment-ivory)]" />
        <div className="relative">
          <ClipReveal direction="right">
            <ScaleReveal scale={1.1}>
              <ScrollReveal direction="right" intensity="medium">
                <TestimonialsCarousel />
              </ScrollReveal>
            </ScaleReveal>
          </ClipReveal>
        </div>
      </div>

      {/* Process - Taupe section */}
      <div className="relative z-20 bg-taupe">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-parchment-ivory)] via-transparent to-[var(--color-crease)]" />
        <div className="relative">
          <ClipReveal direction="left">
            <ScrollReveal direction="left" stagger intensity="medium">
              <ProcessSection />
            </ScrollReveal>
          </ClipReveal>
        </div>
      </div>

      {/* Insights - Earth/khaki depth with gold accents */}
      <LayeredSection overlap="lg" zIndex={25} className="relative z-30">
        <FadeIn id="insights" className="px-6 py-24 md:py-32">
          <div className="depth-khaki mx-auto grid w-full gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <article className="stagger-item px-8 py-10 md:px-12 md:py-12">
              <p className="stagger-item text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-primary)]">
                Insights / content module
              </p>
              <h2 className="stagger-item mt-5 max-w-[11ch] text-[2.65rem] leading-[0.95] tracking-[-0.045em] md:text-[3.45rem]">
                Current enough to feel alive. Focused enough to stay credible.
              </h2>
              <p className="stagger-item mt-6 max-w-[48ch] text-base leading-relaxed text-[var(--color-smoked-umber)]">
                Periodic notes from Sarah on what is affecting industrial and trades hiring across Ontario.
              </p>

              <div className="stagger-item mt-12 h-px bg-gradient-to-r from-transparent via-[var(--color-khaki)] to-transparent" />

              <p className="stagger-item mt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-stone-veil)]">From Sarah</p>
              <p className="stagger-item mt-4 max-w-[36ch] text-[1.5rem] leading-[1.38] tracking-tight text-[var(--color-dark)] md:text-[1.82rem]">
                The fastest way to lose good industrial candidates is still the same: a vague brief, slow feedback, and too much internal hesitation.
              </p>
            </article>

            <div className="space-y-5">
              {insightCards.map((card) => (
                <article key={card.title} className="stagger-item rounded-[28px] border border-[var(--color-muted-clay-beige)] bg-white/80 px-6 py-7 backdrop-blur-sm md:px-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-dusty-bronze)]">{card.kicker}</p>
                  <h3 className="mt-4 text-[1.5rem] leading-[1.08] tracking-tight text-[var(--color-espresso-brown)]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-smoked-umber)]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </LayeredSection>

      {/* CTA - Dark panel with bronze accents */}
      <div className="relative z-40 bg-[var(--color-espresso-brown)]">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-crease)] via-transparent to-transparent opacity-30" />
        <LayeredSection overlap="xl" zIndex={35} className="relative">
          <FadeIn id="cta" className="px-6 pb-0">
            <div className="mx-auto w-full">
              <div className="relative z-10 mb-[-6rem] grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_360px]">
                <div className="depth-dark-panel stagger-item px-8 py-10 md:px-12 md:py-12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-aged-brass-highlight)]">
                    Final step
                  </p>
                  <h2 className="stagger-item mt-5 max-w-[13ch] text-[2.45rem] leading-[0.98] tracking-[-0.04em] text-white md:text-[3.2rem]">
                    Talk through the role. Leave with a clearer hiring plan.
                  </h2>
                  <p className="stagger-item mt-5 max-w-[46ch] text-base leading-relaxed text-white/70">
                    Whether the search is urgent coverage or a harder-to-fill long-term role, the next step should feel direct, useful, and commercially grounded.
                  </p>

                  <div className="stagger-item mt-10 flex flex-wrap gap-4">
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

                <div className="stagger-item rounded-[30px] border border-[var(--color-dusty-bronze)]/30 bg-[var(--color-smoked-umber)]/40 px-7 py-9 backdrop-blur-md md:px-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-champagne-haze)]">Candidate path</p>
                  <h3 className="mt-5 text-[1.85rem] leading-[1.04] tracking-tight text-white">Looking for an active role?</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    Browse current public openings or use the candidate hub as the cleanest route into the recruitment side of the site.
                  </p>

                  <Link
                    href="/find-work"
                    className="stagger-item mt-10 inline-flex items-center justify-between border border-[var(--color-aged-brass-highlight)]/50 bg-[var(--color-aged-brass-highlight)]/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-champagne-haze)] transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/30"
                  >
                    Find Your Next Role
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </LayeredSection>
      </div>
    </div>
  );
}
