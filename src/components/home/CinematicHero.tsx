'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import GlobeHero from './GlobeHero';

/**
 * CinematicHero
 * ──────────────
 * 1. GlobeHero (Canada signal preloader) shows full-screen
 * 2. On dismiss → dark hero with cycling industry images reveals
 * 3. Images rotate every 4 s with a 0.8 s crossfade (skip if reduced-motion)
 * 4. Normal scroll resumes after reveal — no sticky trap
 */

const HERO_IMAGES = [
  '/images/hero-industrial-manufacturing-ontario.png',
  '/images/hero-trades-construction-plans.png',
  '/images/hero-employer-hiring-toronto.png',
  '/images/industrial-factory-control-panel.png',
];

const PRELOADER_MIN_MS = 2800;
const IMAGE_CYCLE_MS   = 4200;

type Phase = 'preload' | 'reveal' | 'done';

export default function CinematicHero() {
  const [phase, setPhase]           = useState<Phase>('preload');
  const [imageIndex, setImageIndex] = useState(0);
  const prefersReducedMotion        = useReducedMotion();

  /* ── Lock/unlock body scroll around preloader ── */
  useEffect(() => {
    // Skip preloader if already seen this session
    if (sessionStorage.getItem('preloader-seen') === 'true') {
      document.body.style.overflow = '';
      setPhase('done');
      return;
    }

    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setPhase('reveal');
      sessionStorage.setItem('preloader-seen', 'true');
      setTimeout(() => {
        document.body.style.overflow = '';
        setPhase('done');
      }, 1500);
    }, PRELOADER_MIN_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  /* ── Image cycling — only after done + motion allowed ── */
  useEffect(() => {
    if (phase !== 'done' || prefersReducedMotion) return;
    const id = setInterval(
      () => setImageIndex((i) => (i + 1) % HERO_IMAGES.length),
      IMAGE_CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [phase, prefersReducedMotion]);

  return (
    <>
      {/* ── Full-screen preloader ── */}
      <AnimatePresence>
        {phase === 'preload' && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <GlobeHero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Dark cinematic hero — sits behind preloader, reveals on transition ── */}
      <section
        aria-label="Hero"
        className="relative z-0 h-screen w-full overflow-hidden bg-[#2C3434]"
      >
        {/* Cycling industry images */}
        <AnimatePresence mode="sync">
          <motion.div
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[imageIndex]}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              /* preload first image at priority */
              {...(imageIndex === 0 ? { fetchPriority: 'high' } as Record<string, string> : {})}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark vignette overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: [
              'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15,22,22,0.75) 0%, transparent 60%)',
              'radial-gradient(ellipse 50% 40% at 50% 0%,   rgba(15,22,22,0.50) 0%, transparent 70%)',
              'rgba(15,22,22,0.55)',
            ].join(', '),
          }}
        />

        {/* Hero copy — fades up after preloader exits */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={phase !== 'preload' ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ paddingTop: '6rem' }}
        >
          {/* Eyebrow */}
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.45em] text-white/50">
            Ontario Recruitment Partner
          </p>

          {/* Headline — Cormorant weight 300 */}
          <h1 className="max-w-4xl font-serif font-light text-4xl leading-[1.06] tracking-[-0.03em] text-white md:text-5xl lg:text-[3.6rem]">
            Recruitment support for employers who{' '}
            <em className="italic" style={{ color: '#C8AD6A' }}>cannot afford</em>{' '}
            the wrong hire.
          </h1>

          {/* Body — note: no missing </p> bug from mockup, properly closed */}
          <p className="mx-auto mt-6 max-w-[44ch] text-base leading-relaxed text-white/60">
            Sarah Fell works with Ontario employers hiring across manufacturing,
            skilled trades, operations, and construction. Direct recruiter access.
            Tighter shortlist logic. Less hiring drag.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/book-a-call" className="btn-gold px-10 py-4">
              Book a Hiring Call
            </Link>
            <Link
              href="/jobs"
              className="py-2 text-xs font-bold uppercase tracking-widest text-white/65 transition-colors hover:text-white"
            >
              View Active Roles →
            </Link>
          </div>

          {/* Proof strip — bottom-anchored */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === 'done' ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {[
              { stat: '10+',      label: 'Years placing'   },
              { stat: 'Ontario',  label: 'First focus'     },
              { stat: 'Direct',   label: 'Recruiter access'},
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <p className="font-serif font-light text-xl text-white/90">{item.stat}</p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === 'done' ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-7 left-6 text-[10px] uppercase tracking-[0.3em] text-white/25 md:left-10"
        >
          Scroll to explore
          <span className="ml-3 inline-block h-px w-8 align-middle bg-white/15" />
        </motion.div>
      </section>
    </>
  );
}
