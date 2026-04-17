'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Zap, Users } from 'lucide-react';

const deliveryModels = [
  {
    icon: Target,
    title: 'Retained Search',
    desc: 'Dedicated resources for high-priority executive roles.',
  },
  {
    icon: Zap,
    title: 'Contingent Placement',
    desc: 'Success-based hiring for specialized roles.',
  },
  {
    icon: Users,
    title: 'Project RPO',
    desc: 'Scaling your team for specific project timelines.',
  },
] as const;

export function DeliveryModelsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 px-6 md:px-10 bg-crease">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <span className="text-brass uppercase tracking-widest text-[10px] font-bold mb-4 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6 md:mb-8">
            Tailored Delivery Models
          </h2>
          <p className="text-charcoal/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12">
            Every hire is unique. We offer flexible engagement models designed to align with your
            business goals and urgency.
          </p>
          <div className="space-y-6 md:space-y-8">
            {deliveryModels.map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-brass/10 rounded-xl flex items-center justify-center text-brass flex-shrink-0">
                  <model.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal mb-1">{model.title}</h4>
                  <p className="text-charcoal/50 text-sm">{model.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1974"
              alt="Collaboration"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 liquid-glass p-8 rounded-2xl shadow-xl max-w-xs bg-white/40">
            <Target className="text-brass w-8 h-8 mb-4" />
            <p className="text-charcoal font-serif text-lg italic">
              &quot;Fit-first methodology ensures 98% retention rate over 2 years.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
