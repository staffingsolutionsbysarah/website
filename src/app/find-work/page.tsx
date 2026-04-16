import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import CallToActionPanel from '@/components/site/CallToActionPanel';
import { MarqueeSection } from '@/components/ui/MarqueeSection';

export const metadata: Metadata = {
  title: 'Find Work — Active Industrial & Trades Roles in Ontario',
  description:
    'Browse active industrial, trades, and operations roles in Ontario. Submit your resume for future-fit opportunities with Staffing Solutions by Sarah Fell.',
};

const candidateSteps = [
  {
    title: 'Browse active public roles',
    body: 'Use the jobs page first if you want to see current public openings that are actively live.',
  },
  {
    title: 'Submit your resume',
    body: 'If nothing is posted right now, submit your resume so relevant opportunities can be reviewed manually.',
  },
  {
    title: 'Keep the signal clean',
    body: 'Role fit, location, compensation alignment, and practical expectations all matter more than broad applications.',
  },
];

export default function FindWorkPage() {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Candidate Hub"
        title="A cleaner candidate path for active roles and future-fit opportunities."
        description="This page is the candidate-facing route into the site. It keeps the path simple: browse active jobs first, then use resume submission when a role is not yet posted or a future-fit opportunity makes more sense."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Find Work' },
        ]}
        actions={[
          { href: '/jobs', label: 'Browse Jobs' },
          { href: '/submit-resume', label: 'Submit Resume', variant: 'secondary' },
        ]}
      />

      <MarqueeSection variant="dark" speed={35} />

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-3">
          {candidateSteps.map((step) => (
            <article key={step.title} className="depth-plane px-6 py-6">
              <h2 className="text-[1.7rem] leading-[1.04] tracking-tight">{step.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/68 md:text-base">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-2">
          <article className="depth-plane px-7 py-8 md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Active roles
            </p>
            <h2 className="mt-4 text-[2.15rem] leading-[0.98] tracking-[-0.04em] md:text-[2.8rem]">
              The jobs page stays clean by design.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-black/68">
              Only active public roles should appear. If there are no current openings, the site keeps the candidate
              path open without pretending there is a live listing when there is not.
            </p>
          </article>

          <article className="depth-inset rounded-[30px] px-6 py-7 md:px-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Resume path</p>
            <p className="mt-4 text-sm leading-relaxed text-black/70 md:text-base">
              Resume submission is handled manually right now. That keeps the current implementation honest while the
              broader conversion layer is still being completed.
            </p>
          </article>
        </div>
      </section>

      <CallToActionPanel
        eyebrow="Candidate path"
        title="Use the right route for the right stage."
        body="Browse current openings when they exist. Use resume submission when you want to be considered for future-fit roles or nothing public is live yet."
        actions={[
          { href: '/jobs', label: 'Browse Jobs' },
          { href: '/submit-resume', label: 'Submit Resume', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
