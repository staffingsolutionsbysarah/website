import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import CallToActionPanel from '@/components/site/CallToActionPanel';
import { MarqueeSection } from '@/components/ui/MarqueeSection';

export const metadata: Metadata = {
  title: 'Hire Talent — Ontario Industrial & Trades Recruitment',
  description:
    'Employer hub for manufacturing, skilled trades, and operations hiring in Ontario. Direct recruiter intake, sharper screening, and stronger shortlist fit.',
};

const valueCards = [
  {
    title: 'Sharper intake',
    body: 'Start with the actual role pressure, reporting line, shift reality, and cost of delay instead of a generic title.',
  },
  {
    title: 'Cleaner shortlist control',
    body: 'Candidate review stays focused on fit, not volume, so the hiring team spends less time sorting noise.',
  },
  {
    title: 'Direct communication',
    body: 'You work directly with Sarah so calibration, feedback, and next steps stay connected from intake through close.',
  },
];

const checklist = [
  'Role title and core responsibilities',
  'Timeline, urgency, and hiring constraints',
  'Compensation range and shift details',
  'Team structure and reporting line',
];

export default function HireTalentPage() {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Employer Hub"
        title="Recruitment support built for employers who need stronger fit and less drag."
        description="This is the employer-facing hub for intake, search direction, and next-step routing. Use it when the role is active, the process needs structure, and weak interviews are already costing time."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Hire Talent' },
        ]}
        actions={[
          { href: '/request-talent-profile', label: 'Request Talent Profile' },
          { href: '/book-a-call', label: 'Book a Call', variant: 'secondary' },
        ]}
      />

      <MarqueeSection variant="dark" speed={30} />

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-3">
          {valueCards.map((card) => (
            <article key={card.title} className="depth-plane px-6 py-6">
              <h2 className="text-[1.7rem] leading-[1.04] tracking-tight">{card.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/68 md:text-base">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)]">
          <article className="depth-plane px-7 py-8 md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Where this helps
            </p>
            <h2 className="mt-4 max-w-[14ch] text-[2.15rem] leading-[0.98] tracking-[-0.04em] md:text-[2.8rem]">
              Better for urgent, hard-to-fill, and messy searches.
            </h2>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-black/68">
              This path is meant for employers who need tighter qualification, cleaner communication, and a recruiter
              who understands that weak hiring process creates business drag fast.
            </p>
          </article>

          <article className="depth-inset rounded-[30px] px-6 py-7 md:px-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Bring to intake</p>
            <ul className="mt-4 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="rounded-[20px] border border-black/8 bg-white/70 px-4 py-3 text-sm text-black/70">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <CallToActionPanel
        eyebrow="Employer path"
        title="If the role is active, move into intake properly."
        body="Start with the role brief or book a direct call. Both routes are in place so the employer path is clear without adding a new system."
        actions={[
          { href: '/request-talent-profile', label: 'Request Talent Profile' },
          { href: '/book-a-call', label: 'Book a Call', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
