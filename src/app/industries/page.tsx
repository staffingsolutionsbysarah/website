'use client';

import { industries } from '@/data/industries';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MarqueeSection } from '@/components/ui/MarqueeSection';

const industryImages: Record<string, string> = {
  'manufacturing-skilled-trades': '/images/hero-industrial-manufacturing-ontario.png',
  'food-grocery-retail': '/images/hero-employer-hiring-toronto.png',
  'construction': '/images/hero-ontario-toronto-skyline.png',
  'finance-accounting': '/images/hero-ontario-toronto-skyline.png',
  'it-technology': '/images/hero-ontario-toronto-skyline.png',
  'sales-marketing': '/images/hero-employer-hiring-toronto.png',
  'administrative-support': '/images/hero-trades-construction-plans.png',
};

export default function IndustriesHub() {
  return (
    <div className="depth-canvas bg-[#EFEDEF] text-[var(--color-dark)]">
      <section className="px-6 pb-20 pt-24 md:pt-40">
        <div className="mx-auto max-w-[1380px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[900px]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#8B764C]">Industries</p>
            <h1 className="mt-8 text-[3.5rem] leading-[0.88] tracking-[-0.05em] md:text-[6rem] lg:text-[7.5rem]">
              Ontario Sector <br />Coverage.
            </h1>
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-black/60">
              Separate industry pages keep sector relevance, hiring pressure, and search context clearer for both employers and candidates.
            </p>
          </motion.div>
        </div>
      </section>
      <MarqueeSection variant="dark" speed={32} />

      {/* Editorial List Hub */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1380px]">
          <div className="border-t border-black/10">
            {industries.map((industry) => (
              <Link 
                key={industry.slug} 
                href={`/industries/${industry.slug}`}
                className="group relative block border-b border-black/10 px-4 py-12 transition-all hover:bg-white/70 md:px-8 md:py-16"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
                  <div className="max-w-[800px]">
                    <h2 className="text-3xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl lg:text-6xl">
                      {industry.title}
                    </h2>
                    <p className="mt-6 max-w-[620px] text-base leading-relaxed text-black/58 transition-colors duration-300 group-hover:text-black/74 md:text-lg">
                      {industry.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 lg:justify-end">
                    <div className="relative hidden h-40 w-60 overflow-hidden rounded-[28px] border border-black/6 shadow-[0_18px_42px_rgba(0,0,0,0.08)] lg:block">
                      <Image 
                        src={industryImages[industry.slug] || '/images/hero-industrial-manufacturing-ontario.png'} 
                        alt={industry.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-[#8B764C] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Footer */}
      <section className="px-6 pb-32 pt-16">
        <div className="mx-auto max-w-[1380px] grid lg:grid-cols-2 gap-20 border-t border-black/5 pt-32">
          <div>
            <h3 className="text-3xl font-medium tracking-tight">Depth over breadth.</h3>
            <p className="mt-8 text-xl leading-relaxed text-black/60 max-w-[540px]">
              We focus on the sectors where recruiter judgment directly impacts hiring quality. By specializing in Ontario’s industrial, technical, and professional operations, we provide a search process built on actual sector relevance.
            </p>
          </div>
          <div className="flex flex-col justify-end items-start lg:items-end">
            <Link href="/book-a-call" className="group flex items-center gap-6 text-3xl font-medium tracking-tight hover:text-[#8B764C] transition-colors">
              Discuss requirements
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 group-hover:border-[#8B764C] group-hover:bg-[#8B764C] group-hover:text-white transition-all">
                <ArrowRight className="h-6 w-6" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
