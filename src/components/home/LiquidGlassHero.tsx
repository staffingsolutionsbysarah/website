'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 'employer',
    image: '/images/Business handshake in Toronto office.png',
    eyebrow: 'Hiring Support',
    title: 'Recruitment built for the work that matters.',
    body: 'Industrial, trades, and operations hiring handled with direct recruiter ownership, tighter shortlist logic, and less drag.',
    cta: { label: 'Hire Talent', href: '/hire-talent' },
  },
  {
    id: 'industrial',
    image: '/images/Worker with tablet in manufacturing facility.png',
    eyebrow: 'Industrial Hiring',
    title: 'Your next role in Ontario starts here.',
    body: 'We connect skilled professionals with employers who value technical fit, reliability, and long-term career growth.',
    cta: { label: 'Find Work', href: '/find-work' },
  },
  {
    id: 'trades',
    image: '/images/Construction professionals reviewing plans together.png',
    eyebrow: 'Trades & Construction',
    title: 'Industry-specific recruitment across Ontario.',
    body: 'Manufacturing, trades, construction, and business-side hiring supported with clearer sector context.',
    cta: { label: 'View Industries', href: '/industries' },
  },
  {
    id: 'toronto',
    image: '/images/Toronto at golden hour.png',
    eyebrow: 'Ontario',
    title: '10+ years of industrial recruitment expertise.',
    body: 'Built on a decade of search experience across Ontario, from the GTA to Windsor.',
    cta: { label: 'About Sarah', href: '/about' },
  },
];

const AUTO_ROTATE_INTERVAL = 6000;

export default function LiquidGlassHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#1F2628]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full w-full flex-col justify-end pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1380px] px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[48rem] lg:max-w-[42rem]"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-6 text-[10px] font-semibold uppercase tracking-[0.5em] text-white/60"
              >
                {currentSlide.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[2.8rem] leading-[0.92] tracking-[-0.04em] text-white md:text-[4.5rem] lg:text-[5.5rem]"
              >
                {currentSlide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 max-w-[38ch] text-base leading-relaxed text-white/70 md:text-lg"
              >
                {currentSlide.body}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href={currentSlide.cta.href}
                  className="mt-10 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-sm font-medium uppercase tracking-[0.2em] text-white transition-all hover:border-[#C6A64A] hover:text-[#C6A64A] md:text-base"
                >
                  {currentSlide.cta.label}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 right-6 flex gap-3 md:right-10 md:bottom-10"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-700 ${
                currentIndex === index
                  ? 'w-16 bg-[#C6A64A]'
                  : 'w-6 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="pointer-events-none absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-white/30 md:left-10"
      >
        Scroll to explore
        <span className="ml-3 inline-block h-px w-8 bg-white/20 align-middle" />
      </motion.div>
    </section>
  );
}
