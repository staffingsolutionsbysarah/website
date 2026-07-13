'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import GlobeHero from './GlobeHero';

const PRELOADER_MIN_MS = 2800; // globe shows for at least this long
const VIDEO_SRC = '/video/hero.mp4';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'preload' | 'reveal' | 'done'>('preload');

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    let videoReady = false;
    let timerDone = false;

    const tryReveal = () => {
      if (videoReady && timerDone) {
        setPhase('reveal');
        // Unlock scroll after reveal animation completes
        setTimeout(() => {
          document.body.style.overflow = '';
          setPhase('done');
        }, 1600);
      }
    };

    // Minimum preloader time — feels intentional, not a flash
    const minTimer = setTimeout(() => {
      timerDone = true;
      tryReveal();
    }, PRELOADER_MIN_MS);

    // Video ready — OR fall back to poster after 3s if no video
    const video = videoRef.current;
    const fallbackTimer = setTimeout(() => {
      videoReady = true;
      tryReveal();
    }, 3200);

    const onVideoReady = () => {
      videoReady = true;
      clearTimeout(fallbackTimer);
      tryReveal();
    };

    if (video) {
      video.addEventListener('canplaythrough', onVideoReady);
      if (video.readyState >= 3) onVideoReady();
    } else {
      videoReady = true; // no video element, fall through to poster
    }

    return () => {
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
      video?.removeEventListener('canplaythrough', onVideoReady);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* ── Full-screen preloader overlay ── */}
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

      {/* ── Cinematic video hero (sits behind preloader, reveals on transition) ── */}
      <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#2C3434]">

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-ontario-toronto-skyline.webp"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/75" />

        {/* Hero text — fades in after reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={phase !== 'preload' ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pt-24"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/50 mb-8">
            Ontario-First Recruitment
          </p>
          <h1 className="font-heading text-4xl font-light leading-[1.08] text-white md:text-6xl lg:text-7xl max-w-5xl">
            Recruitment built for
            <br />
            <span className="italic text-stone">the work that matters.</span>
          </h1>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/book-a-call" className="btn-gold px-10 py-4">
              Book a Hiring Call
            </Link>
            <Link
              href="/find-work"
              className="py-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              Find Work →
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === 'done' ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="pointer-events-none absolute bottom-8 left-6 text-[10px] uppercase tracking-[0.3em] text-white/30 md:left-10"
        >
          Scroll to explore
          <span className="ml-3 inline-block h-px w-8 align-middle bg-white/20" />
        </motion.div>
      </section>
    </>
  );
}
