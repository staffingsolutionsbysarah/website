'use client';

import { motion } from 'framer-motion';
import { Clock3, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BookACallPage() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)]">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1.58fr)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 lg:h-fit"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Direct Intake</p>
              <h1 className="mt-6 text-[2.8rem] leading-[0.96] tracking-[-0.04em] md:text-[3.8rem]">Book a Strategy Call</h1>
              <p className="mt-8 text-base leading-relaxed text-black/66">
                Schedule a 15-minute intake call with Sarah. No pressure, no sales pitch. Just a direct conversation about your role, timeline, and what success looks like.
              </p>

              <div className="mt-10 space-y-6">
                <div className="depth-plane p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/42">Before the call</p>
                  <ul className="mt-4 space-y-3 text-sm text-black/64">
                    <li className="flex gap-3">
                      <Clock3 className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      Role title and core must-haves
                    </li>
                    <li className="flex gap-3">
                      <Clock3 className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      Hiring timeline and urgency
                    </li>
                    <li className="flex gap-3">
                      <Clock3 className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      Budget and reporting structure
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-3 rounded-[22px] px-5 py-4 depth-inset">
                  <ShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/52">Confidential & Direct</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="depth-plane min-h-[700px] overflow-hidden rounded-[32px] bg-white p-2"
            >
              <iframe
                src="https://cal.com/staffingsolutionsbysarah/intake?embed=true"
                style={{ width: '100%', height: '100%', minHeight: '700px', border: 'none' }}
                title="Schedule a Call"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
