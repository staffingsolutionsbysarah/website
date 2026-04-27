'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Building2, Factory, ShieldCheck } from 'lucide-react';

const slides = [
  {
    id: 'employer',
    image: '/images/Business handshake in Toronto office.png',
    eyebrow: 'Hiring Support',
    title: 'Recruitment for employers who cannot afford the wrong hire.',
    body: 'Industrial, trades, and operations hiring handled with direct recruiter ownership, tighter shortlist logic, and less drag.',
    primaryCTA: { label: 'Hire Talent', href: '/hire-talent' },
    secondaryCTA: { label: 'Book a Call', href: '/book-a-call' },
    icon: Factory,
  },
  {
    id: 'industrial',
    image: '/images/Worker with tablet in manufacturing facility.png',
    eyebrow: 'Find Work',
    title: "Your next role in Ontario's industrial core starts here.",
    body: 'We connect skilled professionals with employers who value technical fit, reliability, and long-term career growth.',
    primaryCTA: { label: 'Find Work', href: '/find-work' },
    secondaryCTA: { label: 'View Jobs', href: '/jobs' },
    icon: Users,
  },
  {
    id: 'trades',
    image: '/images/Construction professionals reviewing plans together.png',
    eyebrow: 'Sector Coverage',
    title: "Industry-specific recruitment across Ontario's core hiring lanes.",
    body: 'Manufacturing, trades, construction, and business-side hiring supported with clearer sector context and better search judgment.',
    primaryCTA: { label: 'View Industries', href: '/industries' },
    secondaryCTA: { label: 'Our Services', href: '/services' },
    icon: Building2,
  },
  {
    id: 'toronto',
    image: '/images/Toronto at golden hour.png',
    eyebrow: 'Ontario Footprint',
    title: '10+ years of industrial recruitment expertise.',
    body: 'Built on a decade of search experience across Ontario, from the GTA to Windsor. A strategic partner for your workforce.',
    primaryCTA: { label: 'Our Process', href: '/our-process' },
    secondaryCTA: { label: 'About Sarah', href: '/about' },
    icon: ShieldCheck,
  },
];

const AUTO_ROTATE_INTERVAL = 8000; // Slightly longer for better readability

export default function HeroStage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative h-[90vh] min-h-[720px] w-full overflow-hidden bg-[#2C3434]">
      {/* Immersive Background Image Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Robust Gradients for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-[1380px] flex-col justify-center px-6 pb-24 pt-20">
        <div className="max-w-[52rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#AB9D82]">
                {currentSlide.eyebrow}
              </p>
              <h1 className="mt-8 text-[3.2rem] leading-[0.88] tracking-[-0.05em] text-white md:text-[5.5rem] lg:text-[6.5rem]">
                {currentSlide.title}
              </h1>
              <p className="mt-10 max-w-[40ch] text-lg leading-relaxed text-white/74 md:text-xl">
                {currentSlide.body}
              </p>

              <div className="mt-14 flex flex-wrap gap-5">
                <Link href={currentSlide.primaryCTA.href} className="btn-primary !bg-white !text-[#2C3434] hover:!bg-[#AB9D82] transition-all px-8 py-4">
                  {currentSlide.primaryCTA.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={currentSlide.secondaryCTA.href} className="btn-outline !border-white/30 !text-white hover:!bg-white/10 transition-all px-8 py-4">
                  {currentSlide.secondaryCTA.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Refined Manual Controls */}
        <div className="absolute bottom-8 left-6 right-6 flex items-end justify-start sm:bottom-10">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/6 backdrop-blur-xl transition-all hover:bg-white/14 sm:h-12 sm:w-12"
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={currentIndex === index}
              >
                <slide.icon className={`h-4 w-4 transition-all ${currentIndex === index ? 'text-[#AB9D82] scale-110' : 'text-white/30 group-hover:text-white/60'}`} />
                
                {currentIndex === index && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 border border-[#AB9D82]/40 rounded-full"
                  />
                )}

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/5" />
                {currentIndex === index && (
                  <motion.div
                    layoutId="active-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: isPaused ? 0.3 : AUTO_ROTATE_INTERVAL / 1000, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-0.5 bg-[#AB9D82]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
