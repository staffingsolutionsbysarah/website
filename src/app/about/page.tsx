'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const values = [
  {
    title: 'Recruiter-Led Partnership',
    body: 'You work directly with Sarah from intake through placement, with clear ownership at every stage.',
  },
  {
    title: 'Industrial Expertise, Broader Coverage',
    body: 'Built on manufacturing and skilled trades depth, now extended to construction, logistics, and operations hiring.',
  },
  {
    title: 'Quality Over Candidate Volume',
    body: 'Every shortlist is built around role fit, team fit, and retention outcomes — not resume quantity.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-[#FAF9F6] text-[#2C3434]">

      {/* Hero banner — dark full-width */}
      <section className="relative min-h-[52vh] bg-[#2C3434] px-6 py-24 md:py-36 flex items-end overflow-hidden">
        {/* Radial gold accent */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 80% 15%, rgba(200,173,106,0.10), transparent 60%)',
          }}
        />
        <motion.div
          className="relative z-10 mx-auto max-w-[1200px] w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#AB9D82]">
            About Sarah Fell
          </p>
          <h1 className="mt-6 max-w-[16ch] font-serif text-[2.8rem] font-light leading-[0.9] tracking-[-0.045em] text-white md:text-[4.5rem] lg:text-[5.5rem]">
            Building Ontario's industrial workforce, one right hire at a time.
          </h1>
        </motion.div>
      </section>

      {/* Portrait + Bio */}
      <section className="px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-black/10 bg-[#ECE7DB] p-3 shadow-[0_22px_60px_rgba(0,0,0,0.12)]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[22px]">
              <Image
                src="/sarah-fell-recruitment-consultant.png"
                alt="Sarah Fell — Ontario industrial and trades recruitment consultant"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#4A6A58]">
              Over a Decade of Search Experience
            </p>
            <h2 className="mt-5 font-serif text-[2rem] font-light leading-[1.0] tracking-[-0.03em] text-[#2C3434] md:text-[2.6rem]">
              Senior recruitment support for industrial and operations hiring.
            </h2>
            <div className="editorial-rule my-8" />
            <p className="text-base leading-relaxed text-black/70 md:text-lg">
              Staffing Solutions by Sarah Fell, Inc. was founded to support hiring managers responsible
              for filling critical roles across technical, operational, and professional teams. The focus
              is a practical, recruiter-led search process built around clear communication, role fit,
              and long-term hiring success.
            </p>
            <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
              Through a strategic partnership with{' '}
              <a
                href="https://toptiertalentgroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2C3434] hover:text-[#4A6A58] transition-colors underline"
              >
                Top Tier Talent Group
              </a>
              , I now support a broader range of sectors while maintaining the same direct recruiter
              relationship, disciplined search approach, and quality-first delivery clients rely on.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/book-a-call" className="btn-primary">
                Book a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/hire-talent" className="btn-secondary">
                Hire Talent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What clients can expect — dark section */}
      <section className="bg-[#2C3434] px-6 py-16 text-white md:py-24">
        <motion.div
          className="mx-auto max-w-[1200px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#AB9D82]/60">
            Working With Sarah
          </p>
          <h2 className="mt-5 font-serif text-[2rem] font-light tracking-tight text-[#AB9D82] md:text-[2.8rem]">
            What clients can expect
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value, i) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7"
              >
                <h3 className="font-serif text-xl font-light text-[#AB9D82]">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/72">{value.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* For Hiring Managers / HR Leaders split */}
      <div className="editorial-rule" style={{ margin: 0 }} />

      <section className="px-6 py-16 md:py-20">
        <motion.div
          className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="depth-plane p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A6A58]">
              For Hiring Managers
            </p>
            <h3 className="mt-4 font-serif text-[1.6rem] font-light leading-tight tracking-tight text-[#2C3434]">
              Faster hiring with stronger quality control
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-black/70">
              Get role-specific search strategy, transparent communication, and candidate shortlists
              built around the realities of your team and timeline.
            </p>
          </div>
          <div className="depth-plane p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A6A58]">
              For HR & Operations Leaders
            </p>
            <h3 className="mt-4 font-serif text-[1.6rem] font-light leading-tight tracking-tight text-[#2C3434]">
              A scalable partner for growth and hard-to-fill roles
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-black/70">
              Gain consistent delivery capacity across industrial, field, and operational hiring needs
              while keeping direct access to Sarah&apos;s role-specific recruitment expertise.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA — dark closing section */}
      <section className="bg-[#2C3434] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[800px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#AB9D82]/60">
              Next Step
            </p>
            <h2 className="mt-5 font-serif text-[2.4rem] font-light leading-[0.95] tracking-[-0.03em] text-white md:text-[3.5rem]">
              Start the conversation.
            </h2>
            <p className="mx-auto mt-6 max-w-[40ch] text-base leading-relaxed text-white/60">
              Whether the role is active or the need is upcoming — direct intake is the fastest way to
              move from brief to shortlist.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/book-a-call" className="btn-gold px-8 py-4">
                Book a Hiring Call
              </Link>
              <Link
                href="/hire-talent"
                className="btn-outline border-white/20 text-white hover:bg-white/8 px-8 py-4"
              >
                Hire Talent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
