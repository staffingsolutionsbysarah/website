'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlobeComponent from './GlobeComponent';

export default function GlobeHero({ visible = true }: { visible?: boolean }) {
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setGlobeLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-charcoal">
      {/* Globe */}
      <div
        className={`absolute inset-0 z-0 flex items-center justify-center opacity-40 transition-opacity duration-1000 ${
          globeLoaded ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <GlobeComponent />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-0 bg-charcoal" />

      {/* Hero content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 1, ease: 'easeOut', delay: visible ? 0.1 : 0 }}
          className="mx-auto max-w-5xl text-center"
        >
          <h1 className="text-4xl font-light leading-[1.1] text-white md:text-5xl lg:text-7xl">
            Precision Hiring for Industry Leaders <br />
            <span className="italic text-stone">&amp; Exceptional Talent</span>
          </h1>

          {/* Liquid glass panel */}
          <div className="relative mx-auto mt-4 w-full max-w-xl">
            <div className="liquid-glass relative z-20 mx-auto rounded-3xl border border-brand-green/30 bg-brand-green/10 px-6 py-10 backdrop-blur-xl shadow-[0_0_40px_rgba(61,122,101,0.2)] md:px-12 md:py-16">
              <p className="mb-6 text-base font-light leading-relaxed text-white/90 md:text-lg">
                Direct access to elite talent in Manufacturing, Construction, and Skilled Trades.{' '}
                We prioritize <span className="font-medium text-gold">fit over volume</span>.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-6">
                <button
                  onClick={() => router.push('/book-a-call')}
                  className="btn-gold w-full sm:w-auto py-3 md:py-4"
                >
                  Book a Hiring Call
                </button>
                <button
                  onClick={() => router.push('/about')}
                  className="py-2 text-xs font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white md:text-sm"
                >
                  About Sarah
                </button>
              </div>
            </div>

            {/* Decorative blurs */}
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand-green/30 blur-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-6 text-[10px] uppercase tracking-[0.3em] text-white/30 md:left-10">
        Scroll to explore
        <span className="ml-3 inline-block h-px w-8 align-middle bg-white/20" />
      </div>
    </section>
  );
}
