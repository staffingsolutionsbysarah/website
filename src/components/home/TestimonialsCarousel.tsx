'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Sarah found us three solid millwrights right when we needed them. She understands the plant environment and did not send random resumes for us to sort.',
    author: 'Maintenance Manager',
    company: 'Food Processing',
  },
  {
    quote:
      'We were struggling to find good mechanics for the floor. She clarified what we actually needed and brought us dependable people we could move on quickly.',
    author: 'Operations Director',
    company: 'Industrial Manufacturing',
  },
] as const;

const closingProof = [
  'Direct recruiter communication instead of layered process.',
  'Shortlist logic built around fit, urgency, and business pressure.',
  'A buyer-facing site that still supports real candidate pathways.',
] as const;

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="px-4 py-18 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[minmax(280px,0.34fr)_minmax(0,0.66fr)]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Testimonials + proof
          </p>
          <h2 className="mt-4 max-w-[10ch] text-[2.45rem] leading-[0.95] tracking-[-0.045em] md:text-[3.3rem]">
            Stronger trust signals without agency fluff.
          </h2>
          <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-black/66">
            Shorter review cycles. Stronger shortlists. Fewer interviews wasted on candidates who looked right on paper but
            were not the right fit for the actual role and team.
          </p>

          <div className="mt-8 space-y-3">
            {closingProof.map((item) => (
              <div key={item} className="depth-inset flex items-start gap-3 rounded-[22px] px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                <p className="text-sm leading-relaxed text-black/68">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col justify-center">
          <div className="relative h-[320px] w-full">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === activeIndex && (
                    <motion.div
                      key={testimonial.quote}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.05, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="depth-plane absolute inset-0 px-6 py-7 md:px-8 md:py-8"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        Hiring manager perspective
                      </p>
                      <p className="mt-5 text-[1.08rem] leading-[1.7] text-black/78 md:text-[1.2rem]">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="mt-6 editorial-rule" />
                      <div className="mt-4">
                        <p className="text-base tracking-tight">{testimonial.author}</p>
                        <p className="mt-1 text-sm text-black/52">{testimonial.company}</p>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-[var(--color-accent)] scale-125'
                    : 'bg-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}