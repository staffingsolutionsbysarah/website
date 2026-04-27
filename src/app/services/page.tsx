'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MarqueeSection } from '@/components/ui/MarqueeSection';

const deliveryModels = [
  {
    title: 'Direct Hire / Permanent Placement',
    body: 'Targeted recruitment for full-time roles where long-term retention and cultural fit are critical. We manage the search from intake through calibration to close.',
    image: '/images/hero-industrial-manufacturing-ontario.png',
    align: 'left'
  },
  {
    title: 'Retained & Exclusive Search',
    body: 'Priority search ownership for executive or specialized leadership roles. A dedicated process that creates deeper market commitment and stronger shortlist control.',
    image: '/images/hero-ontario-toronto-skyline.png',
    align: 'right'
  },
  {
    title: 'Contract & Temp-to-Perm',
    body: 'Flexible staffing support for project-based needs or interim coverage. A practical bridge that allows both parties to verify fit before a permanent commitment.',
    image: '/images/hero-trades-construction-plans.png',
    align: 'left'
  },
  {
    title: 'Payroll / EOR Support',
    body: 'Administrative and payroll support to simplify workforce management and compliance for contract teams and dispersed project staff.',
    image: '/images/hero-employer-hiring-toronto.png',
    align: 'right'
  },
];

export default function ServicesPage() {
  return (
    <div className="depth-canvas bg-[#EFEDEF] text-[var(--color-dark)]">
      {/* Editorial Header */}
      <section className="px-6 pb-20 pt-24 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end border-b border-black/5 pb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#8B764C]">Recruitment Delivery</p>
              <h1 className="mt-8 font-serif font-light text-[3.5rem] leading-[0.88] tracking-[-0.05em] md:text-[6rem] lg:text-[7.5rem]">
                How we <br />build teams.
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[420px] pb-4"
            >
              <p className="text-lg leading-relaxed text-black/60 font-medium">
                Multiple recruitment delivery models designed to solve specific hiring pressures. We manage the search with direct ownership and sector-specific judgment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <MarqueeSection variant="dark" speed={28} />

      {/* Asymmetrical Service Sections */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1380px] space-y-24 md:space-y-32">
          {deliveryModels.map((model, index) => {
            const isReversed = model.align === 'right';

            return (
            <div 
              key={model.title} 
              className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  'relative aspect-[4/5] overflow-hidden rounded-[48px] bg-gray-100 shadow-2xl shadow-black/5',
                  isReversed ? 'lg:order-2' : '',
                ].join(' ')}
              >
                <Image 
                  src={model.image} 
                  alt={model.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              <div
                className={[
                  'flex flex-col justify-center',
                  isReversed ? 'lg:order-1 lg:pr-12 xl:pr-16' : 'lg:pl-12 xl:pl-16',
                ].join(' ')}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B764C]">
                  Delivery Model {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="font-serif font-light text-3xl tracking-tight md:text-5xl lg:text-6xl max-w-[12ch]">{model.title}</h2>
                <div className="mt-8 h-px w-12 bg-[#8B764C]" />
                <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-black/62 md:text-xl">
                  {model.body}
                </p>
                <div className="mt-12 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B764C]/10 text-[#8B764C]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B764C]">Direct Search Ownership</span>
                </div>
              </div>
            </div>
          )})}
        </div>
      </section>

      {/* Integrated CTA Stage */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1380px]">
          <div className="relative overflow-hidden rounded-[60px] bg-[#2C3434] p-12 md:p-24 text-white">
            <div className="relative z-10 max-w-[700px]">
              <h2 className="text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl">Ready to talk <br />through the role?</h2>
              <p className="mt-10 text-xl text-white/60 leading-relaxed max-w-[480px]">
                Book a 15-minute intake call to determine which delivery model best fits your timeline and team reality.
              </p>
              <div className="mt-14 flex flex-wrap gap-6">
                <Link href="/book-a-call" className="btn-primary !bg-white !text-[#2C3434] hover:!bg-[#8B764C] hover:!text-white transition-all px-8 py-4">
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn-outline !border-white/20 !text-white hover:!bg-white/5 transition-all px-8 py-4">
                  General Inquiry
                </Link>
              </div>
            </div>
            {/* Subtle Texture Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(139,118,76,0.4),transparent_50%)]" />
          </div>
        </div>
      </section>
    </div>
  );
}
