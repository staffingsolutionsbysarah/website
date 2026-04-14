'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, Building2, Factory, ShieldCheck } from 'lucide-react';

const slides = [
  {
    id: 'employer',
    image: '/images/download-2.jpg',
    eyebrow: 'Hiring Support',
    title: 'Recruitment for employers who cannot afford the wrong hire.',
    body: 'Industrial, trades, and operations hiring handled with direct recruiter ownership, tighter shortlist logic, and less drag.',
    primaryCTA: { label: 'Hire Talent', href: '/hire-talent' },
    secondaryCTA: { label: 'Book a Call', href: '/book-a-call' },
    icon: Factory,
  },
  {
    id: 'candidate',
    image: '/images/download-1.jpg',
    eyebrow: 'Find Work',
    title: "Your next role in Ontario's industrial core starts here.",
    body: 'We connect skilled professionals with employers who value technical fit, reliability, and long-term career growth.',
    primaryCTA: { label: 'Find Work', href: '/find-work' },
    secondaryCTA: { label: 'View Jobs', href: '/jobs' },
    icon: Users,
  },
  {
    id: 'industries',
    image: '/images/download-4.jpg',
    eyebrow: 'Sector Coverage',
    title: "Industry-specific recruitment across Ontario's core hiring lanes.",
    body: 'Manufacturing, trades, construction, and business-side hiring supported with clearer sector context and better search judgment.',
    primaryCTA: { label: 'View Industries', href: '/industries' },
    secondaryCTA: { label: 'Our Services', href: '/services' },
    icon: Building2,
  },
  {
    id: 'trust',
    image: '/images/download-3.jpg',
    eyebrow: 'Ontario Footprint',
    title: '10+ years of industrial recruitment expertise.',
    body: 'Built on a decade of search experience across Ontario, from the GTA to Windsor. A strategic partner for your workforce.',
    primaryCTA: { label: 'Our Process', href: '/our-process' },
    secondaryCTA: { label: 'About Sarah', href: '/about' },
    icon: ShieldCheck,
  },
];

const AUTO_ROTATE_INTERVAL = 8000;

export default function LiquidGlassHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const slideOffset = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const slideX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const glassStyles = isMobile
    ? {
        backdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.18)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }
    : {
        backdropFilter: 'blur(20px)',
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
      };

  return (
    <section ref={sectionRef} className="relative h-[85vh] min-h-[640px] w-full overflow-hidden bg-[#1F2628]">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full w-full flex-col justify-center px-6 pb-24 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-[52rem]"
          style={glassStyles}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{
                opacity: 0,
                x: currentIndex % 2 === 0 ? -300 : 300,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: currentIndex % 2 === 0 ? 300 : -300,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                x: slideX,
              }}
              className="rounded-[24px] px-8 py-10 md:px-12 md:py-12"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#E7D08A]">
                {currentSlide.eyebrow}
              </p>
              <h1 className="mt-8 text-[3.2rem] leading-[0.88] tracking-[-0.05em] text-white md:text-[5.5rem] lg:text-[6.5rem]">
                {currentSlide.title}
              </h1>
              <p className="mt-10 max-w-[40ch] text-lg leading-relaxed text-white/74 md:text-xl">
                {currentSlide.body}
              </p>

              <div className="mt-14 flex flex-wrap gap-5">
                <Link href={currentSlide.primaryCTA.href} className="btn-primary !bg-white !text-[#1F2628] hover:!bg-[#E7D08A] transition-all px-8 py-4">
                  {currentSlide.primaryCTA.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={currentSlide.secondaryCTA.href} className="btn-outline !border-white/30 !text-white hover:!bg-white/10 transition-all px-8 py-4">
                  {currentSlide.secondaryCTA.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`relative h-2.5 rounded-full transition-all duration-500 ${
                currentIndex === index
                  ? 'w-12 bg-[#E7D08A]'
                  : 'w-2.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={currentIndex === index}
            >
              {currentIndex === index && (
                <motion.div
                  layoutId="progress-dot"
                  className="absolute inset-0 rounded-full border border-[#E7D08A]/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}