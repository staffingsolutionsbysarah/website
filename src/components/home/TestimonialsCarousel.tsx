'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Sarah's understanding of the sector is unparalleled. She found us a leader who not only had the skills but fit our culture perfectly.",
    author: 'VP Operations, Global Supplier',
  },
  {
    text: 'The boutique approach makes a massive difference. The quality of candidates we received was significantly higher than any large agency we\'ve used.',
    author: 'HR Director, Professional Services Group',
  },
];

export default function TestimonialsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-10 bg-clay overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-20">
          <div>
            <span className="text-espresso uppercase tracking-widest text-[10px] font-bold mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-espresso">Client Voices</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-parchment p-8 md:p-12 rounded-3xl shadow-sm relative border border-charcoal/5"
            >
              <Quote className="absolute top-6 md:top-8 right-6 md:right-8 text-brass/20 w-8 h-8 md:w-12 md:h-12" />
              <p className="text-espresso/80 text-lg md:text-xl font-serif italic mb-6 md:mb-8 leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-clay rounded-full" />
                <span className="text-espresso font-bold text-[10px] md:text-xs uppercase tracking-widest">
                  {t.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}