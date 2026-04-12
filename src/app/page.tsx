'use client';

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import HeroStage from '@/components/home/HeroStage';

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

import { Factory, Hammer, HardHat, BriefcaseBusiness, Users, MapPinned } from 'lucide-react';

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
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)]">
      <HeroStage />

      <div className="mx-auto max-w-[1380px] px-4 md:px-6">
        <div className="relative z-20 -mt-10 md:-mt-16">
          <div className="depth-plane mx-auto grid max-w-[1220px] gap-6 px-6 py-6 md:grid-cols-4 md:px-8">
            {proofStrip.map((item) => (
              <div key={item.value}>
                <p className="text-[1.35rem] tracking-tight text-[var(--color-dark)]">{item.value}</p>
                <p className="mt-3 max-w-[18ch] text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative -mt-6 px-4 py-18 md:px-6 md:py-24" id="services">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[minmax(280px,0.34fr)_minmax(0,0.66fr)]">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Services + industries
            </p>
            <h2 className="mt-4 max-w-[10ch] text-[2.65rem] leading-[0.94] tracking-[-0.045em] md:text-[3.65rem]">
              Specialist coverage with stronger search judgment.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-black/66">
              The page still reads like a one-pager, but this section opens sideways into different hiring lanes.
              Trackpad, swipe, or drag through the sector chapters without breaking the overall flow.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/industries" className="btn-primary">
                View Industries
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/hire-talent" className="btn-secondary">
                Hire Talent
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 depth-inset rounded-[28px] px-5 py-6">
              {serviceModel.map((item, index) => (
                <div
                  key={item.title}
                  className={index === serviceModel.length - 1 ? '' : 'border-b border-black/8 pb-5 mb-5'}
                >
                  <p className="text-[1.12rem] tracking-tight">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/64">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto pb-4 [scrollbar-color:rgba(44,52,52,0.24)_transparent] [scrollbar-width:thin]">
            <div className="flex min-w-max gap-5 pr-6">
              {capabilityLanes.map((lane, index) => (
                <article
                  key={lane.title}
                  className="depth-plane relative min-h-[560px] w-[min(82vw,740px)] shrink-0 snap-start"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={lane.image}
                      alt={lane.title}
                      fill
                      sizes="(max-width: 1023px) 82vw, 740px"
                      className="object-cover"
                    />
                    <div className="depth-veil" />
                  </div>

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
                    <div className="rounded-full px-4 py-2 depth-caption">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/48">
                        Sector {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur-sm">
                      <lane.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="max-w-[30rem]">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                        {lane.tags.join(' / ')}
                      </p>
                      <h3 className="mt-3 max-w-[14ch] text-[2rem] leading-[0.96] tracking-[-0.04em] text-white md:text-[2.55rem]">
                        {lane.title}
                      </h3>
                      <p className="mt-4 max-w-[30rem] text-sm leading-relaxed text-white/78 md:text-base">
                        {lane.summary}
                      </p>
                      <p className="mt-5 max-w-[28rem] border-l border-white/18 pl-4 text-sm leading-relaxed text-white/68">
                        {lane.pressure}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-4 px-4 pb-20 pt-18 text-white md:px-6 md:pb-26 md:pt-24" id="process">
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[#1F2628]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(198,166,74,0.18),transparent_58%)]" />
        <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[minmax(300px,0.36fr)_minmax(0,0.64fr)]">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#E7D08A]">Process</p>
            <h2 className="mt-4 max-w-[10ch] text-[2.7rem] leading-[0.94] tracking-[-0.045em] text-white md:text-[3.65rem]">
              A guided search process instead of a vague recruiter pitch.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-white/72">
              The process section is treated like a recessed chamber in the page. The content moves forward through
              sequence, not through aggressive animation.
            </p>

            <div className="mt-8 depth-plane-dark rounded-[30px] px-6 py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">Outcome focus</p>
              <p className="mt-4 text-[1.35rem] leading-[1.45] tracking-tight text-white">
                Clearer briefs. Fewer weak interviews. Better shortlist control.
              </p>
            </div>
          </div>

          <div className="relative pl-7 md:pl-10">
            <div className="absolute bottom-6 left-0 top-6 w-px bg-[linear-gradient(180deg,rgba(231,208,138,0.12),rgba(231,208,138,0.72),rgba(231,208,138,0.12))]" />

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className={[
                    'depth-plane-dark rounded-[30px] px-6 py-6 md:px-8 md:py-8',
                    index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12',
                  ].join(' ')}
                >
                  <div className="absolute -left-[1.15rem] top-7 flex h-9 w-9 items-center justify-center rounded-full border border-[#E7D08A]/26 bg-[#E7D08A]/12 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E7D08A] md:-left-[1.4rem] md:h-11 md:w-11">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="max-w-[18ch] text-[1.7rem] leading-[1.02] tracking-tight text-white md:text-[2rem]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[40rem] text-sm leading-relaxed text-white/74 md:text-base">
                    {step.body}
                  </p>
                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                    {step.outcome}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-10 px-4 py-18 md:px-6 md:py-24" id="insights">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <article className="depth-plane px-7 py-8 md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Insights / content module
            </p>
            <h2 className="mt-4 max-w-[11ch] text-[2.55rem] leading-[0.95] tracking-[-0.045em] md:text-[3.35rem]">
              Current enough to feel alive. Focused enough to stay credible.
            </h2>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-black/66">
              The site can feel expansive without becoming noisy. This section keeps market notes and recruiter
              perspective visible without turning the homepage into a content feed.
            </p>

            <div className="mt-10 editorial-rule" />

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/40">From Sarah</p>
            <p className="mt-4 max-w-[34ch] text-[1.45rem] leading-[1.38] tracking-tight text-[var(--color-dark)] md:text-[1.72rem]">
              The fastest way to lose good industrial candidates is still the same: a vague brief, slow feedback, and
              too much internal hesitation.
            </p>
          </article>

          <div className="space-y-4">
            {insightCards.map((card) => (
              <article key={card.title} className="depth-inset rounded-[28px] px-5 py-6 md:px-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8872F]">{card.kicker}</p>
                <h3 className="mt-4 text-[1.45rem] leading-[1.08] tracking-tight">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/66">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[minmax(280px,0.34fr)_minmax(0,0.66fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Testimonials + proof
            </p>
            <h2 className="mt-4 max-w-[10ch] text-[2.45rem] leading-[0.95] tracking-[-0.045em] md:text-[3.3rem]">
              Stronger trust signals without agency fluff.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-black/66">
              Employers need to feel quickly that Sarah understands hiring pressure, communicates directly, and improves
              the quality of decision-making around the shortlist.
            </p>

            <div className="mt-8 space-y-3">
              {closingProof.map((item) => (
                <div key={item} className="depth-inset flex items-start gap-3 rounded-[22px] px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A8872F]" />
                  <p className="text-sm leading-relaxed text-black/68">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.quote}
                className={[
                  'depth-plane px-6 py-7 md:px-8',
                  index === 1 ? 'md:translate-y-10' : '',
                ].join(' ')}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Hiring manager perspective
                </p>
                <p className="mt-5 text-[1.08rem] leading-[1.7] text-black/78 md:text-[1.2rem]">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-6 editorial-rule" />
                <div className="mt-4">
                  <p className="text-base tracking-tight">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-black/52">{testimonial.company}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-0 md:px-6">
        <div className="mx-auto max-w-[1380px]">
          <div className="relative z-10 mb-[-5rem] grid gap-5 lg:grid-cols-[minmax(0,1.18fr)_360px]">
            <div className="depth-plane px-7 py-8 md:px-10 md:py-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
                Final step
              </p>
              <h2 className="mt-4 max-w-[13ch] text-[2.35rem] leading-[0.98] tracking-[-0.04em] md:text-[3.1rem]">
                Talk through the role. Leave with a clearer hiring plan.
              </h2>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-black/66">
                Whether the search is urgent coverage or a harder-to-fill long-term role, the next step should feel
                direct, useful, and commercially grounded.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book-a-call" className="btn-primary">
                  <Clock3 className="h-4 w-4" />
                  Book a Hiring Call
                </Link>
                <Link href="/about" className="btn-secondary">
                  About Sarah
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 border-l border-black/10 pl-5">
                <p className="text-sm leading-relaxed text-black/68">
                  Start with the real hiring problem, not generic recruiter language. Protect fit, speed, and
                  communication without making the process heavier.
                </p>
              </div>
            </div>

            <div className="depth-inset rounded-[30px] px-6 py-8 md:px-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/42">Candidate path</p>
              <h3 className="mt-4 text-[1.8rem] leading-[1.04] tracking-tight">Looking for an active role?</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/66">
                Browse current public openings or use the candidate hub as the cleanest route into the recruitment side of the site.
              </p>

              <Link
                href="/find-work"
                className="mt-8 inline-flex items-center justify-between border border-black/10 bg-white/72 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black/70 transition hover:border-[#C6A64A] hover:text-black"
              >
                Find Your Next Role
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
