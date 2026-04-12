'use client';

import { useParams } from 'next/navigation';
import { industries } from '@/data/industries';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Factory, Hammer, HardHat, BriefcaseBusiness, Users, MapPinned } from 'lucide-react';
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

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return <div>Industry not found.</div>;
  }

  const Icon = iconMap[industry.slug as string] || Factory;

  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)]">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[800px]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Sector Focus</p>
            </div>
            <h1 className="mt-8 text-[3.2rem] leading-[0.92] tracking-[-0.04em] md:text-[4.5rem]">{industry.title}</h1>
            <p className="mt-8 text-lg leading-relaxed text-black/70">
              {industry.summary} We support Ontario employers in this sector with specialized recruiter judgment and tighter shortlist control.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            <div className="depth-plane p-10">
              <h2 className="text-2xl font-medium tracking-tight">For Employers</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/64">
                We find sector-specific talent for your team. Permanent roles. Temporary coverage. Hard-to-fill leadership positions. 
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book-a-call" className="btn-primary">
                  Request Talent Profile
                </Link>
                <Link href="/book-a-call" className="btn-outline">
                  Book a Strategy Call
                </Link>
              </div>
            </div>

            <div className="depth-plane p-10">
              <h2 className="text-2xl font-medium tracking-tight">For Candidates</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/64">
                Looking for your next role in this industry? Submit your resume and we will reach out when there is a fit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/submit-resume" className="btn-secondary">
                  Submit Resume
                </Link>
                <Link href="/jobs" className="btn-outline">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for static export
export function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}
