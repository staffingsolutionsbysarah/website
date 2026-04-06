'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  Hammer,
  HardHat,
  MapPinned,
  MessageSquareMore,
  NotebookText,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const heroSlides = [
  {
    image: '/images/download-2.jpg',
    label: 'Manufacturing & Industrial',
    title: 'Plant-floor hiring that respects downtime, coverage, and role fit.',
    note: 'Maintenance, production, supervision, and operations coverage built for real-world urgency.',
    signals: ['Urgent backfills', 'Supervisor hiring', 'Retention-minded shortlist'],
  },
  {
    image: '/images/download-1.jpg',
    label: 'Skilled Trades & Maintenance',
    title: 'Hard-to-fill trades searches managed with tighter intake and stronger screening.',
    note: 'Millwright, mechanic, electrician, maintenance, and field-heavy roles where weak fit gets expensive fast.',
    signals: ['Trades-specific search', 'Shift reality considered', 'Less interview drag'],
  },
  {
    image: '/images/download-4.jpg',
    label: 'Construction & Field Teams',
    title: 'Search support for fast-moving projects, site leadership, and labour pressure.',
    note: 'Built for hiring managers who need better candidate judgement, not a pile of unusable resumes.',
    signals: ['Site-ready lens', 'Calibrated shortlist', 'Direct recruiter feedback'],
  },
] as const;

const proofStrip = [
  {
    value: '10+ years',
    label: 'recruitment experience',
    detail: 'More than a decade of search work across industrial and operational hiring.',
  },
  {
    value: 'Direct access',
    label: 'to Sarah',
    detail: 'No anonymous recruiter queue between intake, shortlist, and close.',
  },
  {
    value: 'Ontario-first',
    label: 'hiring lens',
    detail: 'Built around plant, trade, operations, and business-side hiring pressure in Ontario.',
  },
  {
    value: 'Fit over volume',
    label: 'every shortlist',
    detail: 'Candidates are framed around role reality, team reality, and staying power.',
  },
] as const;

const serviceModel = [
  {
    title: 'Search ownership',
    body: 'Sarah runs the search directly, from intake and calibration through shortlist, feedback, and close.',
  },
  {
    title: 'Shortlist discipline',
    body: 'Candidates arrive with fit rationale, not just a forwarded resume and a generic note.',
  },
  {
    title: 'Operational awareness',
    body: 'Hiring urgency, shift realities, reporting lines, and production impact are treated as search inputs, not afterthoughts.',
  },
] as const;

const capabilityLanes = [
  {
    icon: Factory,
    title: 'Manufacturing & Industrial',
    summary: 'Industrial environments where productivity loss, missed shifts, and weak supervision hurt fast.',
    roles: 'Production leaders, plant support, quality, operations, and industrial coordination.',
  },
  {
    icon: Hammer,
    title: 'Skilled Trades & Maintenance',
    summary: 'Trades hiring where role reality matters more than title matching.',
    roles: 'Millwrights, mechanics, electricians, technicians, and maintenance coverage.',
  },
  {
    icon: HardHat,
    title: 'Construction & Engineering',
    summary: 'Project-driven teams that need site-aware hiring support with tighter qualification logic.',
    roles: 'Site leadership, project support, engineering-adjacent, and field-heavy hiring.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Accounting & Finance',
    summary: 'Business-side hiring for firms that still want a direct recruiter relationship and cleaner candidate fit.',
    roles: 'Accounting, finance support, controllers, coordinators, and operational admin talent.',
  },
  {
    icon: Users,
    title: 'Sales & Office Support',
    summary: 'Commercial and support roles that need better screening, better communication, and less wasted time.',
    roles: 'Sales support, coordinators, customer-facing operations, and office-based hires.',
  },
  {
    icon: MapPinned,
    title: 'Technology & Logistics',
    summary: 'Adjacent coverage for teams that value practical search management over volume-driven recruiting.',
    roles: 'Logistics support, systems-adjacent roles, dispatch, planning, and execution support.',
  },
] as const;

const processSteps = [
  {
    title: 'Calibrate the role properly',
    body: 'Start with scope, pressure points, reporting line, must-haves, and what happens if the role stays open.',
  },
  {
    title: 'Search the actual lane',
    body: 'Focus the search around the right sector, title reality, compensation range, and candidate environment fit.',
  },
  {
    title: 'Shortlist with context',
    body: 'Present a smaller group of candidates with role-fit reasoning so your team can decide faster.',
  },
  {
    title: 'Run a tighter feedback loop',
    body: 'Keep interviews moving, surface concerns early, and stop good candidates from dying in slow process.',
  },
  {
    title: 'Support close and retention',
    body: 'Offer-stage support and post-placement follow-through protect the hire after acceptance.',
  },
] as const;

const insightsCards = [
  {
    kicker: 'From Sarah',
    title: 'What Ontario employers are asking for in skilled trades hires right now.',
    body: 'Short market notes and hiring signals that help clients tighten intake before the search drifts.',
  },
  {
    kicker: 'Hiring Signals',
    title: 'Where candidate quality drops when the role brief is too loose.',
    body: 'A future-facing module for market insight, shortlist calibration, and client education that feels current, not bolted on.',
  },
  {
    kicker: 'Newsletter Ready',
    title: 'A cleaner way to share market updates, role-family shifts, and employer guidance.',
    body: 'Built as cards so LinkedIn posts, newsletters, and internal articles can slot in without turning the page into an embed mess.',
  },
] as const;

const testimonials = [
  {
    quote:
      'Sarah found us three solid millwrights right when we needed them. She understands the plant environment and did not send random resumes for us to sort.',
    author: 'Maintenance Manager',
    company: 'Food Processing',
  },
  {
    quote:
      'We were struggling to find good mechanics for the floor. She stepped in, clarified what we actually needed, and brought us dependable people we could move on quickly.',
    author: 'Operations Director',
    company: 'Industrial Manufacturing',
  },
] as const;

const closingProof = [
  'Employer-first communication without the fluff.',
  'Candidate shortlists shaped around fit, urgency, and retention.',
  'A recruiter-led process that removes drag instead of adding admin.',
] as const;

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="relative overflow-hidden bg-[var(--color-bg)] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[linear-gradient(180deg,rgba(198,166,74,0.16),rgba(198,166,74,0.02)_58%,rgba(250,249,246,0)_100%)]" />
      <div className="pointer-events-none absolute -top-16 right-[-120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(198,166,74,0.22)_0%,_rgba(198,166,74,0)_70%)]" />
      <div className="pointer-events-none absolute top-[28%] left-[-120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(75,99,94,0.16)_0%,_rgba(75,99,94,0)_74%)]" />

      <section className="relative border-b border-black/8 px-4 pb-16 pt-8 md:px-6 md:pb-22 md:pt-14 lg:pb-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(460px,0.95fr)] lg:items-end">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="relative z-10 max-w-[640px]"
          >
            <motion.p
              variants={revealUp}
              className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]"
            >
              Ontario recruitment partner
            </motion.p>
            <motion.h1
              variants={revealUp}
              className="mt-5 max-w-[12ch] text-[3.05rem] leading-[0.87] tracking-[-0.045em] md:text-[4.6rem] xl:text-[5.5rem]"
            >
              Recruitment support for employers who cannot afford the wrong hire.
            </motion.h1>
            <motion.p
              variants={revealUp}
              className="mt-6 max-w-[58ch] text-[1.02rem] leading-relaxed text-black/68 md:text-[1.08rem]"
            >
              Sarah Fell runs the search directly, helping Ontario hiring managers reduce interview drag, tighten fit,
              and move critical roles with more confidence across manufacturing, trades, operations, and adjacent
              business functions.
            </motion.p>

            <motion.div variants={revealUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-a-call"
                className="halo-button inline-flex items-center gap-2 rounded-full border border-[#2C3434] bg-[#2C3434] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[#C6A64A] hover:bg-[#C6A64A] hover:text-[#1F2628]"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Book a Hiring Call
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/72 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/70 transition hover:border-[#C6A64A] hover:bg-white hover:text-black"
              >
                View Active Roles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div variants={revealUp} className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                'Manufacturing, skilled trades, operations',
                'Direct recruiter ownership from intake to close',
                'Built for urgency, clarity, and better fit',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-black/8 bg-white/68 px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
                >
                  <p className="text-sm leading-relaxed text-black/70">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -right-6 top-[-28px] h-28 w-28 rounded-full border border-[#C6A64A]/35" />
            <div className="pointer-events-none absolute right-12 top-12 h-20 w-20 rounded-full border border-black/10" />

            <div className="relative rounded-[36px] border border-black/10 bg-white/76 p-4 shadow-[0_34px_90px_rgba(25,31,30,0.10)] md:p-5">
              <div className="grid gap-4 md:grid-cols-[1.04fr_0.96fr]">
                <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#DBE0DB]">
                  <Image
                    src="/sarah-fell.png"
                    alt="Sarah Fell portrait"
                    fill
                    sizes="(max-width: 767px) 100vw, 420px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_38%,rgba(31,38,40,0.62)_100%)]" />
                  <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/12 bg-[#1F2628]/78 p-4 text-white backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                      Direct with Sarah
                    </p>
                    <p className="mt-2 text-lg tracking-tight">Recruiter-led intake, shortlist, and close.</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/72">
                      A calmer process for employers who need search ownership, not another layer of admin.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="relative min-h-[250px] overflow-hidden rounded-[28px] border border-black/10 bg-[#232A2C]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide.image}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={currentSlide.image}
                          alt={currentSlide.label}
                          fill
                          sizes="(max-width: 767px) 100vw, 360px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,38,40,0.12)_0%,rgba(31,38,40,0.5)_54%,rgba(31,38,40,0.86)_100%)]" />
                        <div className="absolute left-4 top-4 rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
                          {currentSlide.label}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="max-w-[19ch] text-[1.45rem] leading-[1.04] tracking-[-0.03em] text-white">
                            {currentSlide.title}
                          </p>
                          <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/76">{currentSlide.note}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="grid gap-3">
                    {currentSlide.signals.map((signal, index) => (
                      <motion.div
                        key={signal}
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        className="rounded-[22px] border border-black/10 bg-[#F8F6F0] px-4 py-3.5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
                      >
                        <div className="flex items-start gap-3">
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                          <p className="text-sm leading-relaxed text-black/72">{signal}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between rounded-[22px] border border-black/8 bg-white/70 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/44">
                      Current view
                    </p>
                    <div className="flex gap-2">
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.label}
                          type="button"
                          aria-label={`Show ${slide.label}`}
                          onClick={() => setActiveSlide(index)}
                          className={[
                            'h-2.5 rounded-full transition-all',
                            index === activeSlide ? 'w-8 bg-[#C6A64A]' : 'w-2.5 bg-black/15 hover:bg-black/30',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 right-6 hidden max-w-[250px] rounded-[24px] border border-[#C6A64A]/20 bg-[#FAF7EF]/92 p-4 shadow-[0_20px_44px_rgba(0,0,0,0.08)] lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Why employers stay
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/68">
                Tighter intake, direct communication, and fewer weak interviews reduce wasted time across the process.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#F7F4EC] px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto grid max-w-[1280px] gap-3 md:grid-cols-2 xl:grid-cols-4">
          {proofStrip.map((item) => (
            <motion.article
              key={item.value}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="rounded-[24px] border border-black/8 bg-white/70 px-5 py-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
            >
              <p className="text-[1.35rem] tracking-tight text-[var(--color-dark)]">{item.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-black/65">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-22" id="services">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Services + industries
            </p>
            <h2 className="mt-4 max-w-[12ch] text-[2.6rem] leading-[0.95] tracking-[-0.04em] md:text-[3.65rem]">
              Search support that feels more deliberate than the usual staffing site.
            </h2>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-black/66">
              The positioning stays industrial-rooted, but the delivery supports broader business needs where direct
              recruiter communication and better shortlist quality still matter.
            </p>

            <div className="mt-8 space-y-3">
              {serviceModel.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-black/8 bg-[#F8F5EE] px-5 py-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
                >
                  <p className="text-[1.28rem] tracking-tight">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/66">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilityLanes.map((lane, index) => (
              <motion.article
                key={lane.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="rounded-[28px] border border-black/8 bg-white/82 p-6 shadow-[0_16px_34px_rgba(0,0,0,0.04)]"
              >
                <lane.icon className="h-5 w-5 text-[#A8872F]" />
                <h3 className="mt-5 text-[1.62rem] leading-[1.05] tracking-tight">{lane.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/66">{lane.summary}</p>
                <div className="mt-5 border-t border-black/8 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Role families</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/68">{lane.roles}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1F2628] px-4 py-16 text-white md:px-6 md:py-22" id="process">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E7D08A]">Process</p>
            <h2 className="mt-4 max-w-[12ch] text-[2.6rem] leading-[0.95] tracking-[-0.04em] text-white md:text-[3.5rem]">
              A tighter search process for pressured hiring decisions.
            </h2>
            <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-white/72">
              The goal is not to impress you with activity. The goal is to reduce noise, move the right people faster,
              and make each decision easier for the hiring team.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['intake', 'search lane', 'shortlist', 'feedback', 'close'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-[30px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.12)] md:p-7"
              >
                <div className="grid gap-5 md:grid-cols-[74px_1fr] md:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E7D08A]/28 bg-[#E7D08A]/8 text-lg text-[#E7D08A]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-[1.5rem] leading-[1.06] tracking-tight text-white">{step.title}</h3>
                    <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-white/72 md:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#FAF8F3] px-4 py-16 md:px-6 md:py-22" id="insights">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-[760px]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Insights / content module
            </p>
            <h2 className="mt-4 text-[2.45rem] leading-[0.96] tracking-[-0.04em] md:text-[3.4rem]">
              A site that feels informed, not frozen.
            </h2>
            <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-black/66">
              The homepage should show Sarah as an active recruiter with current market judgment. This module is built
              so LinkedIn previews, newsletter issues, and short internal market notes can drop in cleanly later.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {insightsCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-[28px] border border-black/8 bg-white/84 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.04)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8872F]">{card.kicker}</p>
                <h3 className="mt-5 text-[1.7rem] leading-[1.06] tracking-tight">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/66">{card.body}</p>
                <div className="mt-8 flex items-center justify-between border-t border-black/8 pt-4 text-sm text-black/54">
                  <span>Preview-ready module</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-22">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Testimonials + proof
            </p>
            <h2 className="mt-4 max-w-[12ch] text-[2.45rem] leading-[0.96] tracking-[-0.04em] md:text-[3.35rem]">
              Fewer promises. Stronger signals.
            </h2>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-black/66">
              This should feel like a hiring partner who understands role pressure, communication drag, and what a good
              shortlist is supposed to do for the business.
            </p>

            <div className="mt-8 space-y-3">
              {closingProof.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-black/8 bg-[#F7F4EC] px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                  <p className="text-sm leading-relaxed text-black/68">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.quote}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-[30px] border border-black/8 bg-white/84 p-6 shadow-[0_16px_34px_rgba(0,0,0,0.04)] md:p-7"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Hiring manager perspective
                </p>
                <p className="mt-5 text-[1.16rem] leading-[1.65] text-black/78 md:text-[1.22rem]">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-6 border-t border-black/8 pt-4">
                  <p className="text-base tracking-tight">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-black/52">{testimonial.company}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-18 md:px-6 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[1280px] rounded-[34px] border border-[#D6C58E]/32 bg-[linear-gradient(135deg,#F8F4EA_0%,#F6F3EC_50%,#E9EFEC_100%)] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.06)] md:px-10 md:py-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Final step
              </p>
              <h2 className="mt-4 max-w-[14ch] text-[2.3rem] leading-[0.98] tracking-[-0.04em] md:text-[3.2rem]">
                Talk through the role. Leave with a clearer search plan.
              </h2>
              <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-black/66">
                Whether the need is urgent coverage or a harder-to-fill long-term role, the next step should feel
                direct, calm, and useful.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/book-a-call"
                className="inline-flex items-center gap-2 rounded-full border border-[#2C3434] bg-[#2C3434] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[#C6A64A] hover:bg-[#C6A64A] hover:text-[#1F2628]"
              >
                <Clock3 className="h-4 w-4" />
                Book a Call
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/78 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/70 transition hover:border-[#C6A64A] hover:bg-white hover:text-black"
              >
                <Search className="h-4 w-4" />
                Browse Roles
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-black/8 pt-6 md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-[20px] bg-white/58 px-4 py-4">
              <MessageSquareMore className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
              <p className="text-sm leading-relaxed text-black/66">Start with the real hiring problem, not generic recruiter talk.</p>
            </div>
            <div className="flex items-start gap-3 rounded-[20px] bg-white/58 px-4 py-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
              <p className="text-sm leading-relaxed text-black/66">Protect fit, speed, and communication without making the process feel heavier.</p>
            </div>
            <div className="flex items-start gap-3 rounded-[20px] bg-white/58 px-4 py-4">
              <NotebookText className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
              <p className="text-sm leading-relaxed text-black/66">Give candidates a cleaner path too, without letting the homepage stop serving employers first.</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
