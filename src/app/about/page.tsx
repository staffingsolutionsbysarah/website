'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const values = [
  {
    title: 'Recruiter-Led Partnership',
    body: 'You work directly with Sarah and her team from intake through placement, with clear ownership at every stage.',
  },
  {
    title: 'Industrial Expertise, Broader Coverage',
    body: 'Built on manufacturing and skilled trades depth, now extended to construction, logistics, and operations hiring.',
  },
  {
    title: 'Quality Over Candidate Volume',
    body: 'Every shortlist is built around role fit, team fit, and retention outcomes, not resume quantity.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <section className="px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-black/10 bg-[#ECE7DB] p-3 shadow-[0_22px_60px_rgba(0,0,0,0.14)]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[22px]">
              <Image src="/sarah-fell.png" alt="Sarah Fell portrait" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 500px" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl font-medium tracking-[-0.03em] md:text-6xl">Senior recruitment support for industrial and operations hiring.</h1>
            <p className="mt-6 text-sm font-bold tracking-[0.05em] text-[#C6A64A] uppercase md:text-base">
              Recruitment expertise built on more than a decade of search experience.
            </p>
            <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
              Staffing Solutions by Sarah Fell, Inc. was founded to support hiring managers responsible for filling critical roles across technical, operational, and professional teams. The focus is a practical, recruiter-led search process built around clear communication, role fit, and long-term hiring success.
            </p>
            <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
              Through a strategic partnership with <a href="https://toptiertalentgroup.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-black hover:underline">Top Tier Talent Group</a>, I now support a broader range of sectors while maintaining the same direct recruiter relationship, disciplined search approach, and quality-first delivery clients rely on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#book"
                className="inline-flex items-center gap-2 border border-black/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/75 transition hover:border-[#C6A64A] hover:text-black"
              >
                Book a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#1F2628] px-6 py-16 text-white md:py-20">
        <motion.div
          className="mx-auto max-w-[1200px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-medium tracking-tight text-[#E4CF8C] md:text-5xl">What clients can expect</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
                <h3 className="text-2xl font-medium tracking-tight text-[#E4CF8C]">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{value.body}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <motion.div
          className="mx-auto grid max-w-[1200px] gap-5 rounded-3xl border border-black/10 bg-white/85 p-8 md:grid-cols-2 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border border-black/10 bg-[#F9F7F1] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">For Hiring Managers</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight">Faster hiring with stronger quality control</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Get role-specific search strategy, transparent communication, and candidate shortlists built around the
              realities of your team and timeline.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-[#F9F7F1] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">For HR & Operations Leaders</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight">A scalable partner for growth and hard-to-fill roles</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Gain consistent delivery capacity across industrial, field, and operational hiring needs while keeping
              direct access to Sarah&apos;s role-specific recruitment expertise.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
