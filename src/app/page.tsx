'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Factory,
  Hammer,
  HardHat,
  MapPinned,
  MessageSquareMore,
  NotebookText,
  ShieldCheck,
  Users,
} from 'lucide-react';

const revealUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const heroSlides = [
  {
    image: '/images/download-2.jpg',
    eyebrow: 'Manufacturing hiring support',
    title: 'Plant, production, and operations hiring handled with tighter intake and less drag.',
    body: 'Built for employers who need better fit, faster decisions, and fewer weak interviews when downtime matters.',
    note: 'Urgent coverage. Better fit. Direct recruiter ownership.',
  },
  {
    image: '/images/download-1.jpg',
    eyebrow: 'Skilled trades recruitment',
    title: 'Trades searches run against shift reality, technical credibility, and actual plant fit.',
    body: 'Millwright, mechanic, electrician, maintenance, and field-heavy roles where title matching is not enough.',
    note: 'Ontario-first trades lens with sharper qualification.',
  },
  {
    image: '/images/download-4.jpg',
    eyebrow: 'Operations and project pressure',
    title: 'Search support for fast-moving teams that cannot afford a slow or noisy process.',
    body: 'Useful when the role brief is messy, the hiring team is stretched, and the shortlist still needs to be strong.',
    note: 'Cleaner process. Stronger shortlist. Better communication.',
  },
] as const;

const proofStrip = [
  {
    value: '10+ years',
    label: 'industrial and business-side recruitment',
  },
  {
    value: 'Direct access',
    label: 'to Sarah from intake through close',
  },
  {
    value: 'Fit over volume',
    label: 'to reduce weak interviews and wasted review',
  },
  {
    value: 'Ontario-first',
    label: 'with manufacturing and skilled trades relevance',
  },
] as const;

const roleRail = [
  'Millwrights',
  'Electricians',
  'Maintenance Managers',
  'Production Supervisors',
  'Operations Leaders',
  'Project Coordinators',
  'Controllers',
  'Sales Support',
  'Logistics Planners',
] as const;

const serviceModel = [
  {
    title: 'Direct search ownership',
    body: 'The search does not get handed off through layers. Intake, calibration, shortlist logic, and close stay connected.',
  },
  {
    title: 'Business-aware qualification',
    body: 'Candidate review is shaped around urgency, team reality, reporting line, and the actual cost of a weak hire.',
  },
  {
    title: 'Less hiring drag',
    body: 'Clearer search direction and tighter feedback loops help employers move faster without lowering judgment.',
  },
] as const;

const capabilityLanes = [
  {
    icon: Factory,
    image: '/images/download-2.jpg',
    title: 'Manufacturing & Industrial',
    summary: 'Industrial recruitment for production, quality, plant, and operations hiring where productivity pressure is real.',
    pressure: 'When the line cannot sit open and the hiring team needs usable candidates quickly.',
    tags: ['Production', 'Quality', 'Plant leadership'],
  },
  {
    icon: Hammer,
    image: '/images/download-1.jpg',
    title: 'Skilled Trades & Maintenance',
    summary: 'Skilled trades recruitment for maintenance-heavy environments where technical fit and shift reality matter.',
    pressure: 'When the role is hard to fill and weak screening gets expensive fast.',
    tags: ['Millwrights', 'Electricians', 'Maintenance'],
  },
  {
    icon: HardHat,
    image: '/images/download-4.jpg',
    title: 'Construction & Engineering',
    summary: 'Search support for field, project, and engineering-adjacent teams that need stronger shortlist judgment.',
    pressure: 'When site pressure, delivery pressure, or project timing leaves little room for process waste.',
    tags: ['Site leadership', 'Projects', 'Engineering'],
  },
  {
    icon: BriefcaseBusiness,
    image: '/images/download.jpg',
    title: 'Accounting & Finance',
    summary: 'Business-side recruitment for firms that still want direct recruiter judgment rather than generic resume flow.',
    pressure: 'When the role needs commercial awareness, discretion, and cleaner early filtering.',
    tags: ['Accounting', 'Finance', 'Controllers'],
  },
  {
    icon: Users,
    image: '/images/download-3.jpg',
    title: 'Sales & Office Support',
    summary: 'Office and support hiring where reliability, communication, and role fit still drive business outcomes.',
    pressure: 'When the team needs someone dependable who can support execution, not just fill a seat.',
    tags: ['Coordinators', 'Support', 'Office roles'],
  },
  {
    icon: MapPinned,
    image: '/images/download-4.jpg',
    title: 'Technology & Logistics',
    summary: 'Adjacent hiring coverage for planning, dispatch, logistics, and systems-adjacent operational roles.',
    pressure: 'When the brief is mixed and the search still needs structure, speed, and recruiter judgment.',
    tags: ['Logistics', 'Planning', 'Dispatch'],
  },
] as const;

const processSteps = [
  {
    title: 'Scope the role properly',
    body: 'Start with the real vacancy: reporting line, urgency, shift or plant context, team pressure, compensation, and what happens if the role stays open.',
    outcome: 'Clearer search brief and better market alignment.',
  },
  {
    title: 'Search and screen against reality',
    body: 'Candidate outreach and qualification stay anchored to technical relevance, environment fit, and whether the person can actually work in the role as described.',
    outcome: 'Less noise and fewer weak interviews.',
  },
  {
    title: 'Present a tighter shortlist',
    body: 'Candidates are framed with fit rationale so the hiring team is reviewing a smaller, stronger group instead of sorting volume.',
    outcome: 'Faster review with better judgment.',
  },
  {
    title: 'Run a tighter feedback loop',
    body: 'Interview movement, objections, and decision friction are managed directly so good candidates do not disappear into slow process.',
    outcome: 'More momentum through interview stage.',
  },
  {
    title: 'Support the close',
    body: 'Offer-stage communication stays practical and direct through acceptance, handoff, and the final stretch of the hiring decision.',
    outcome: 'Stronger close quality and less last-mile wobble.',
  },
] as const;

const insightCards = [
  {
    kicker: 'From Sarah',
    title: 'Where industrial hiring processes lose good candidates first.',
    body: 'A recruiter-led note on vague briefs, slow interview movement, and why good people disappear faster than teams expect.',
  },
  {
    kicker: 'Market signals',
    title: 'What Ontario employers are tightening in skilled trades hiring right now.',
    body: 'Short commercial observations designed to help employers calibrate earlier and hire with less drag.',
  },
  {
    kicker: 'Newsletter-ready',
    title: 'A cleaner place for market notes, hiring commentary, and LinkedIn-adjacent thought leadership.',
    body: 'Built to keep the site feeling current without turning the homepage into a generic blog grid.',
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
      'We were struggling to find good mechanics for the floor. She clarified what we actually needed and brought us dependable people we could move on quickly.',
    author: 'Operations Director',
    company: 'Industrial Manufacturing',
  },
] as const;

const closingProof = [
  'Direct recruiter communication instead of layered process.',
  'Shortlist logic built around fit, urgency, and business pressure.',
  'A buyer-facing site that still supports real candidate pathways.',
] as const;

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeLane, setActiveLane] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const currentSlide = heroSlides[activeSlide];
  const currentLane = capabilityLanes[activeLane];
  const currentStep = processSteps[activeStep];

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-dark)]">
      <section className="relative overflow-hidden border-b border-black/8 bg-[linear-gradient(180deg,#faf9f6_0%,#f8f4ea_54%,#faf9f6_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[52vh] bg-[radial-gradient(circle_at_top_left,rgba(198,166,74,0.16),transparent_40%),radial-gradient(circle_at_76%_18%,rgba(75,99,94,0.14),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[9.5rem] hidden h-px bg-[linear-gradient(90deg,rgba(44,52,52,0)_0%,rgba(44,52,52,0.08)_16%,rgba(44,52,52,0.08)_84%,rgba(44,52,52,0)_100%)] lg:block" />

        <div className="mx-auto max-w-[1380px] px-4 pb-16 pt-10 md:px-6 md:pb-22 md:pt-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(520px,1fr)] lg:items-end">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="max-w-[680px]"
            >
              <motion.p
                variants={revealUp}
                className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--color-accent)]"
              >
                Ontario recruitment partner
              </motion.p>
              <motion.h1
                variants={revealUp}
                className="mt-5 max-w-[12ch] text-[3.15rem] leading-[0.86] tracking-[-0.05em] md:text-[4.7rem] xl:text-[5.45rem]"
              >
                Recruitment support for employers who cannot afford the wrong hire.
              </motion.h1>
              <motion.p
                variants={revealUp}
                className="mt-6 max-w-[58ch] text-[1.02rem] leading-relaxed text-black/68 md:text-[1.08rem]"
              >
                Sarah Fell works with Ontario employers hiring into manufacturing, skilled trades, operations,
                construction, and related business functions. The value is direct recruiter access, tighter shortlist
                logic, less hiring drag, and stronger fit.
              </motion.p>

              <motion.div variants={revealUp} className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book-a-call"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2C3434] bg-[#2C3434] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[#C6A64A] hover:bg-[#C6A64A] hover:text-[#1F2628]"
                >
                  Book a Hiring Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/78 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/70 transition hover:border-[#C6A64A] hover:bg-white hover:text-black"
                >
                  View Active Roles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div variants={revealUp} className="mt-10 grid gap-px bg-black/10 sm:grid-cols-3">
                {[
                  'Manufacturing, skilled trades, operations, and industrial hiring.',
                  'Direct recruiter ownership from intake through close.',
                  'Built to reduce weak interviews, wasted review, and hiring drag.',
                ].map((item) => (
                  <div key={item} className="bg-[#FBF9F4] px-4 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/42">Employer view</p>
                    <p className="mt-2 text-sm leading-relaxed text-black/68">{item}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="grid gap-4 lg:pl-6"
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_190px]">
                <div className="relative min-h-[620px] overflow-hidden rounded-[34px] border border-black/10 bg-[#DBE0DB] shadow-[0_32px_80px_rgba(31,38,40,0.12)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide.image}
                      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentSlide.image}
                        alt={currentSlide.eyebrow}
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 680px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,246,0.05)_0%,rgba(44,52,52,0.2)_44%,rgba(31,38,40,0.88)_100%)]" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute left-5 top-5 rounded-full border border-black/10 bg-[#FAF9F6]/82 px-3 py-2 pr-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/sarah-fell.png"
                        alt="Sarah Fell"
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Direct with Sarah</p>
                        <p className="text-sm text-black/74">Recruiter-led search ownership</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_250px] md:items-end">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                          {currentSlide.eyebrow}
                        </p>
                        <h2 className="mt-3 max-w-[17ch] text-[2rem] leading-[0.96] tracking-[-0.04em] text-white md:text-[2.45rem]">
                          {currentSlide.title}
                        </h2>
                        <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-white/74 md:text-[0.98rem]">
                          {currentSlide.body}
                        </p>
                      </div>
                      <motion.div
                        key={currentSlide.note}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-md"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/66">Operational note</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/86">{currentSlide.note}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-px bg-black/10">
                  {heroSlides.map((slide, index) => {
                    const active = index === activeSlide;
                    return (
                      <button
                        key={slide.eyebrow}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={[
                          'group bg-[#FBF9F4] px-4 py-5 text-left transition-colors',
                          active ? 'bg-[#F3EEE0]' : 'hover:bg-[#F7F4EC]',
                        ].join(' ')}
                        aria-label={`Show ${slide.eyebrow}`}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/38">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="mt-4 text-lg leading-tight tracking-tight text-[var(--color-dark)]">
                          {slide.eyebrow}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-black/60">{slide.note}</p>
                        <div className="mt-5 h-px bg-black/8">
                          <motion.div
                            animate={{ width: active ? '100%' : '0%' }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-[#C6A64A]"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 overflow-hidden border-y border-black/8 py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee-track gap-3 pr-3">
              {[...roleRail, ...roleRail].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="border border-black/10 bg-[#FBF9F4] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/56"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F2ED] px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto grid max-w-[1380px] gap-px bg-black/10 lg:grid-cols-4">
          {proofStrip.map((item) => (
            <motion.article
              key={item.value}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FBF9F4] px-5 py-6"
            >
              <p className="text-[1.35rem] tracking-tight text-[var(--color-dark)]">{item.value}</p>
              <p className="mt-3 max-w-[28ch] text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                {item.label}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-24" id="services">
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[minmax(340px,0.74fr)_minmax(0,1.26fr)]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Services + industries
            </p>
            <h2 className="mt-4 max-w-[12ch] text-[2.65rem] leading-[0.94] tracking-[-0.045em] md:text-[3.65rem]">
              Specialist coverage with stronger search judgment.
            </h2>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-black/66">
              This section no longer behaves like a generic services grid. One lane stays in focus at a time so the
              site reads more like deliberate recruiter positioning and less like a template list.
            </p>

            <div className="mt-8 overflow-hidden rounded-[30px] border border-black/10 bg-[#F7F4EC] shadow-[0_24px_60px_rgba(31,38,40,0.08)]">
              <div className="relative min-h-[380px] overflow-hidden bg-[#D9DDD6]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLane.title}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentLane.image}
                      alt={currentLane.title}
                      fill
                      sizes="(max-width: 1023px) 100vw, 480px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,246,0.1)_0%,rgba(31,38,40,0.2)_45%,rgba(31,38,40,0.84)_100%)]" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                    Active sector view
                  </p>
                  <h3 className="mt-3 max-w-[14ch] text-[2rem] leading-[0.96] tracking-[-0.04em] text-white">
                    {currentLane.title}
                  </h3>
                  <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/78">{currentLane.pressure}</p>
                </div>
              </div>

              <div className="grid gap-px bg-black/8">
                {serviceModel.map((item) => (
                  <div key={item.title} className="bg-[#FBF9F4] px-5 py-5">
                    <p className="text-[1.2rem] tracking-tight">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-black/66">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-px bg-black/10">
            {capabilityLanes.map((lane, index) => {
              const active = index === activeLane;
              return (
                <motion.button
                  key={lane.title}
                  type="button"
                  onMouseEnter={() => setActiveLane(index)}
                  onFocus={() => setActiveLane(index)}
                  onClick={() => setActiveLane(index)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  aria-pressed={active}
                  className={[
                    'grid gap-5 px-6 py-6 text-left transition-colors md:grid-cols-[86px_minmax(0,1fr)_220px] md:items-start',
                    active ? 'bg-[#F4EEDB]' : 'bg-[#FBF9F4] hover:bg-[#F7F4EC]',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-4 md:block">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A64A]/28 bg-[#EFE6CB] text-[#7F6A2A]">
                      <lane.icon className="h-5 w-5" />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38 md:mt-4">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[1.5rem] leading-[1.02] tracking-tight">{lane.title}</h3>
                      {active && (
                        <span className="border border-[#C6A64A]/30 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7F6A2A]">
                          In focus
                        </span>
                      )}
                    </div>
                    <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-black/66 md:text-base">
                      {lane.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {lane.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-black/8 bg-white/72 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/56"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#1F2628] px-4 py-16 text-white md:px-6 md:py-24"
        id="process"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(198,166,74,0.18),transparent_56%)]" />
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[minmax(340px,0.72fr)_minmax(0,1.28fr)]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#E7D08A]">Process</p>
            <h2 className="mt-4 max-w-[12ch] text-[2.65rem] leading-[0.94] tracking-[-0.045em] text-white md:text-[3.55rem]">
              A guided search process instead of a vague recruiter pitch.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/72">
              This is the second homepage wow moment. As the user scrolls, the process section is meant to feel sequenced,
              controlled, and visibly recruiter-led.
            </p>

            <div className="mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E7D08A]/26 bg-[#E7D08A]/10 text-xl text-[#E7D08A]">
                  {String(activeStep + 1).padStart(2, '0')}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">Active step</p>
                  <h3 className="mt-2 text-[1.5rem] leading-[1.04] tracking-tight text-white">{currentStep.title}</h3>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/74 md:text-base">{currentStep.body}</p>

              <div className="mt-7 grid grid-cols-5 gap-2">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="h-1.5 bg-white/10">
                    <motion.div
                      animate={{ width: index <= activeStep ? '100%' : '0%' }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-[#C6A64A]"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                Outcome: {currentStep.outcome}
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">
            {processSteps.map((step, index) => {
              const active = index === activeStep;
              const passed = index < activeStep;

              return (
                <motion.article
                  key={step.title}
                  onViewportEnter={() => setActiveStep(index)}
                  viewport={{ amount: 0.52 }}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className={[
                    'grid gap-5 rounded-[30px] border p-6 transition-all md:grid-cols-[88px_1fr] md:items-start md:p-7',
                    active
                      ? 'border-[#E7D08A]/30 bg-white/[0.08] shadow-[0_28px_56px_rgba(0,0,0,0.22)]'
                      : 'border-white/10 bg-white/[0.03]',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex h-16 w-16 items-center justify-center rounded-full text-lg transition-colors',
                      active || passed
                        ? 'border border-[#E7D08A]/26 bg-[#E7D08A]/12 text-[#E7D08A]'
                        : 'border border-white/10 bg-white/[0.04] text-white/58',
                    ].join(' ')}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div>
                    <h3 className="text-[1.55rem] leading-[1.04] tracking-tight text-white">{step.title}</h3>
                    <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-white/72 md:text-base">{step.body}</p>
                    <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                      {step.outcome}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF9F6] px-4 py-16 md:px-6 md:py-24" id="insights">
        <div className="mx-auto max-w-[1380px]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
          >
            <article className="relative overflow-hidden rounded-[34px] border border-black/10 bg-[linear-gradient(135deg,#F8F4EA_0%,#F3EEE1_52%,#EEF2EE_100%)] p-8 shadow-[0_24px_60px_rgba(31,38,40,0.08)] md:p-10">
              <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(198,166,74,0.22),transparent_66%)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
                Insights / content module
              </p>
              <h2 className="mt-4 max-w-[12ch] text-[2.55rem] leading-[0.95] tracking-[-0.045em] md:text-[3.35rem]">
                Current enough to feel alive. Focused enough to stay credible.
              </h2>
              <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-black/66">
                This section is designed for newsletter previews, recruiter commentary, and short market notes that make
                the site feel active without turning it into a blog-first experience.
              </p>

              <div className="mt-10 border-t border-black/8 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/40">From Sarah</p>
                <p className="mt-4 max-w-[32ch] text-[1.4rem] leading-[1.35] tracking-tight text-[var(--color-dark)] md:text-[1.58rem]">
                  The fastest way to lose good industrial candidates is still the same: a vague brief, slow feedback,
                  and too much internal hesitation.
                </p>
              </div>
            </article>

            <div className="grid gap-px bg-black/10">
              {insightCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="bg-[#FBF9F4] p-6"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8872F]">{card.kicker}</p>
                  <h3 className="mt-5 text-[1.45rem] leading-[1.08] tracking-tight">{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/66">{card.body}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Testimonials + proof
            </p>
            <h2 className="mt-4 max-w-[12ch] text-[2.45rem] leading-[0.95] tracking-[-0.045em] md:text-[3.3rem]">
              Stronger trust signals without agency fluff.
            </h2>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-black/66">
              Employers need to feel quickly that Sarah understands hiring pressure, communicates directly, and improves
              the quality of decision-making around the shortlist.
            </p>

            <div className="mt-8 grid gap-px bg-black/10">
              {closingProof.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-[#FBF9F4] px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                  <p className="text-sm leading-relaxed text-black/68">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-px bg-black/10">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.quote}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#FBF9F4] p-6 md:p-8"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Hiring manager perspective
                </p>
                <p className="mt-5 text-[1.12rem] leading-[1.7] text-black/78 md:text-[1.22rem]">
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
          transition={{ duration: 0.45 }}
          className="mx-auto grid max-w-[1380px] gap-px overflow-hidden rounded-[34px] border border-black/10 bg-black/10 shadow-[0_24px_60px_rgba(31,38,40,0.08)] lg:grid-cols-[minmax(0,1.2fr)_360px]"
        >
          <div className="bg-[linear-gradient(135deg,#F8F4EA_0%,#F4F2ED_48%,#E9EFEC_100%)] px-6 py-8 md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Final step
            </p>
            <h2 className="mt-4 max-w-[14ch] text-[2.35rem] leading-[0.98] tracking-[-0.04em] md:text-[3.1rem]">
              Talk through the role. Leave with a clearer hiring plan.
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-black/66">
              Whether the search is urgent coverage or a harder-to-fill long-term role, the next step should feel
              direct, useful, and commercially grounded.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-a-call"
                className="inline-flex items-center gap-2 rounded-full border border-[#2C3434] bg-[#2C3434] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[#C6A64A] hover:bg-[#C6A64A] hover:text-[#1F2628]"
              >
                <Clock3 className="h-4 w-4" />
                Book a Hiring Call
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/78 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/70 transition hover:border-[#C6A64A] hover:bg-white hover:text-black"
              >
                About Sarah
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-px bg-black/10 md:grid-cols-3">
              <div className="flex items-start gap-3 bg-white/70 px-4 py-4">
                <MessageSquareMore className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                <p className="text-sm leading-relaxed text-black/66">
                  Start with the real hiring problem, not generic recruiter language.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-white/70 px-4 py-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                <p className="text-sm leading-relaxed text-black/66">
                  Protect fit, speed, and communication without making the process heavier.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-white/70 px-4 py-4">
                <NotebookText className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                <p className="text-sm leading-relaxed text-black/66">
                  Keep the employer path primary while still supporting real candidate traffic.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#FBF9F4] px-6 py-8 md:px-8 md:py-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/42">Candidate path</p>
              <h3 className="mt-4 text-[1.8rem] leading-[1.04] tracking-tight">Looking for an active role?</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/66">
                Browse current public openings or use the jobs page as the cleanest route into the candidate side of the site.
              </p>
            </div>

            <Link
              href="/jobs"
              className="mt-8 inline-flex items-center justify-between border border-black/10 bg-[#F4F2ED] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black/70 transition hover:border-[#C6A64A] hover:text-black"
            >
              View Active Roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
