'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { jobs } from '@/data/jobs';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const activeJobs = jobs.filter((j) => j.active && j.public);

export default function JobsPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <section className="px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.p variants={fadeUp} className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/55">
              Open Roles
            </motion.p>
            <motion.h1 variants={fadeUp} className="max-w-[18ch] text-5xl font-medium tracking-[-0.04em] md:text-6xl">
              Active positions we are currently recruiting.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[52ch] text-base leading-relaxed text-black/70 md:text-lg">
              Each role below is an active search. If you are a hiring manager looking to fill a similar position, book a call.
            </motion.p>
          </motion.div>

          {activeJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 rounded-[24px] border border-black/10 bg-white/74 px-8 py-12 shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">No active roles</p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight">Nothing posted right now.</h2>
              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-black/70">
                We post roles as searches go live. Check back soon, or book a call to discuss an upcoming hiring need.
              </p>
              <Link
                href="/book-a-call"
                className="mt-6 inline-flex items-center gap-2 border border-[#2C3434] bg-[#2C3434] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-[#C6A64A] hover:bg-[#C6A64A] hover:text-[#1F2628]"
              >
                Book a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
              className="mt-10 grid gap-4"
            >
              {activeJobs.map((job) => (
                <motion.article
                  key={job.id}
                  variants={fadeUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                  className="motion-panel rounded-[24px] border border-black/10 bg-white/74 px-6 py-6 shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-medium tracking-tight">{job.title}</h2>
                        <span className="rounded-full border border-black/12 bg-[#F9F7F1] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55">
                          {job.type}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">{job.location}</p>
                      <p className="mt-3 text-sm leading-relaxed text-black/70">{job.summary}</p>
                    </div>
                    {job.href && (
                      <Link
                        href={job.href}
                        className="inline-flex shrink-0 items-center gap-2 border border-black/20 bg-transparent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/75 transition hover:border-[#C6A64A] hover:text-black"
                      >
                        View Role
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
