'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const deliveryModels = [
  {
    title: 'Direct Hire / Permanent Placement',
    body: 'Targeted recruitment for full-time roles where long-term retention and cultural fit are critical.',
  },
  {
    title: 'Retained Search',
    body: 'Priority search ownership for executive, specialized, or sensitive operations leadership roles.',
  },
  {
    title: 'Exclusive Search',
    body: 'A dedicated, focused search process that creates deeper market commitment and stronger shortlist control.',
  },
  {
    title: 'Contract Staffing',
    body: 'Flexible staffing support for project-based needs, seasonal peaks, and interim coverage.',
  },
  {
    title: 'Temp-to-Perm',
    body: 'A practical bridge that allows both employer and candidate to verify fit before a permanent commitment.',
  },
  {
    title: 'Payroll / EOR Support',
    body: 'Administrative and payroll support to simplify workforce management and compliance for contract teams.',
  },
];

export default function ServicesPage() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)]">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[800px]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Recruitment Delivery</p>
            <h1 className="mt-6 text-[3.2rem] leading-[0.92] tracking-[-0.04em] md:text-[4.5rem]">Our Services</h1>
            <p className="mt-8 text-lg leading-relaxed text-black/70">
              We offer multiple recruitment delivery models designed to solve specific hiring pressures. Whether you need an urgent permanent hire or flexible contract support, we manage the search with direct ownership.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveryModels.map((model) => (
              <article key={model.title} className="depth-plane p-8">
                <h2 className="text-2xl font-medium tracking-tight">{model.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-black/64">{model.body}</p>
                <div className="mt-8 editorial-rule" />
                <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  <CheckCircle2 className="h-4 w-4" />
                  Service Available
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 depth-plane p-10 text-center">
            <h2 className="text-3xl font-medium tracking-tight">Ready to discuss your hiring plan?</h2>
            <p className="mt-4 mx-auto max-w-[600px] text-black/64">
              Book a 15-minute intake call to determine which delivery model best fits your role, timeline, and team reality.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/book-a-call" className="btn-primary">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-outline">
                General Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
