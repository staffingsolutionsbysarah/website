'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { ArrowRight, CalendarClock, ClipboardList, Mail, ShieldCheck } from 'lucide-react';

const prepItems = [
  'Role title, core responsibilities, and must-have experience',
  'Timeline, urgency, and what happens if the role stays open',
  'Team structure, reporting line, and on-site realities',
  'Compensation range, shift details, and hiring constraints',
];

const callFlow = [
  {
    title: 'Clarify the role',
    body: 'Get clear on the real job, not just the generic title. Scope, pressure points, and fit all matter.',
  },
  {
    title: 'Set the search lane',
    body: 'Define where the search should focus, what strong candidates look like, and how quickly the shortlist should move.',
  },
  {
    title: 'Leave with a plan',
    body: 'You should leave knowing the likely route, timeline, and next actions instead of guessing what happens after the call.',
  },
];

const detailCards = [
  { label: 'Call length', value: '15 min', icon: CalendarClock },
  { label: 'Format', value: 'direct intake', icon: ClipboardList },
  { label: 'Approach', value: 'low pressure', icon: ShieldCheck },
  { label: 'Outcome', value: 'clear next step', icon: ArrowRight },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function BookACallPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden bg-[#F3EFE6] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(198,166,74,0.22),rgba(198,166,74,0))]" />
      <div className="pointer-events-none absolute right-[-90px] top-[12%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(110,141,136,0.2)_0%,_rgba(110,141,136,0)_72%)]" />
      <div className="pointer-events-none absolute bottom-[-120px] left-[-40px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(35,42,44,0.16)_0%,_rgba(35,42,44,0)_70%)]" />

      <section className="border-b border-black/10 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.p variants={fadeUp} className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">
              Book a Call
            </motion.p>
            <motion.h1 variants={fadeUp} className="max-w-[12ch] text-5xl font-medium leading-[0.92] tracking-[-0.04em] md:text-7xl">
              A booking page that actually feels like a booking page.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[58ch] text-base leading-relaxed text-black/70 md:text-lg">
              Book a 15-minute intake call to talk through the role, timeline, pressure points, and what a strong
              search should look like. No recycled homepage block. No vague next step.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#calendar"
                className="halo-button inline-flex items-center gap-2 border border-[#2C3434] bg-[#2C3434] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-[#C6A64A] hover:bg-[#C6A64A] hover:text-[#1F2628]"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  See Available Times
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-black/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/75 transition hover:border-[#C6A64A] hover:text-black"
              >
                Back Home
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="orbital-ring left-[8%] top-[6%] h-[84%] w-[84%]" />
            <div className="orbital-ring right-[-5%] top-[24%] h-[46%] w-[46%]" />

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -9, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              className="motion-panel overflow-hidden rounded-[32px] border border-black/10 bg-[linear-gradient(160deg,#fcf8ef_0%,#ece2cb_54%,#dfe8e4_100%)] p-6 shadow-[0_28px_65px_rgba(0,0,0,0.14)]"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {detailCards.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + index * 0.05, duration: 0.4 }}
                    className="rounded-2xl border border-black/10 bg-white/78 p-4 shadow-[0_12px_26px_rgba(0,0,0,0.04)]"
                  >
                    <item.icon className="h-4 w-4 text-[#9A7E2F]" />
                    <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-black/48">{item.label}</p>
                    <p className="mt-2 text-lg font-medium text-black/82">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 rounded-[24px] border border-black/10 bg-[#232A2C] p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Come prepared with</p>
                <ul className="mt-4 space-y-3">
                  {prepItems.slice(0, 3).map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.34 + index * 0.05, duration: 0.35 }}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white/82"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E7D08A]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20" id="calendar">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-4"
          >
            <motion.div
              variants={fadeUp}
              className="motion-panel rounded-[28px] border border-black/10 bg-white/82 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/50">Before the call</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">Bring the details that matter.</h2>
              <div className="mt-5 space-y-3">
                {prepItems.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: -18 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[#F9F8F5] p-3"
                  >
                    <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-[#C6A64A]" />
                    <p className="text-sm text-black/72">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="motion-panel rounded-[28px] border border-black/10 bg-[#232A2C] p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">Prefer email first</p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">Send the hiring brief directly.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78">
                If you would rather share the role details before booking, send the basics first and the intake call can
                start from a stronger baseline.
              </p>
              <a
                href="mailto:sarah@staffingsolutionsbysarah.com"
                className="mt-5 inline-flex items-center gap-2 border border-white/18 bg-white/8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-[#E7D08A] hover:text-[#E7D08A]"
              >
                <Mail className="h-4 w-4" />
                Email Sarah
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="motion-panel overflow-hidden rounded-[32px] border border-black/10 bg-white/86 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.08)] md:p-5"
          >
            <div className="rounded-[24px] border border-black/8 bg-[#F8F5EE] p-2">
              <InlineWidget
                url="https://calendly.com/staffingsolutionsbysarah/intake"
                styles={{ height: '780px', minWidth: '320px' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#202628] px-6 py-16 text-white md:py-20">
        <motion.div
          className="mx-auto max-w-[1200px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight text-white md:text-5xl">
              What happens on the call
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-white/72">
              Short call. Clear purpose. No dead-end conversation.
            </motion.p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {callFlow.map((item, index) => (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 24, rotate: index === 1 ? 0 : index % 2 === 0 ? -1.2 : 1.2 },
                  show: { opacity: 1, y: 0, rotate: 0 },
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -10, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
                }
                className="motion-panel rounded-[24px] border border-white/15 bg-white/[0.04] p-6 shadow-[0_14px_28px_rgba(0,0,0,0.2)]"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#E7D08A]">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
