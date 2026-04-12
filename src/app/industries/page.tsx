'use client';

import { industries } from '@/data/industries';
import { motion } from 'framer-motion';
import { Factory, Hammer, HardHat, BriefcaseBusiness, Users, MapPinned, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  'manufacturing-skilled-trades': Factory,
  'food-grocery-retail': MapPinned,
  'construction': HardHat,
  'finance-accounting': BriefcaseBusiness,
  'it-technology': MapPinned,
  'sales-marketing': Users,
  'administrative-support': Users,
};

export default function IndustriesHub() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)]">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[800px]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Specialization</p>
            <h1 className="mt-6 text-[3.2rem] leading-[0.92] tracking-[-0.04em] md:text-[4.5rem]">Industry Coverage</h1>
            <p className="mt-8 text-lg leading-relaxed text-black/70">
              We focus on the sectors where recruiter judgment and sector-specific experience directly impact hiring quality. Our primary coverage includes industrial, technical, and professional operations across Ontario.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = iconMap[industry.slug] || Factory;
              return (
                <Link key={industry.slug} href={`/industries/${industry.slug}`} className="group depth-plane p-8 block transition hover:border-[var(--color-accent)]/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-6 text-2xl font-medium tracking-tight group-hover:text-[var(--color-accent)] transition">{industry.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-black/64">{industry.summary}</p>
                  <div className="mt-8 editorial-rule" />
                  <div className="mt-6 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    View Sector
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
