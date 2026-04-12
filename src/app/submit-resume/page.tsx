import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import CallToActionPanel from '@/components/site/CallToActionPanel';

export const metadata: Metadata = {
  title: 'Submit Resume — Candidate Intake',
  description:
    'Submit your resume for current and future industrial and trades roles in Ontario. Resume intake is handled manually by Staffing Solutions by Sarah Fell.',
};

const resumeGuidance = [
  'Use the jobs page first if you want to see active public roles.',
  'If no role is live, submit your resume through the manual path and keep the signal specific.',
  'Location, compensation alignment, and role fit still matter more than broad distribution.',
];

export default function SubmitResumePage() {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Candidate Support"
        title="Submit Resume"
        description="This page is the candidate support route when there is no public role that fits yet. Resume intake is still manual, which is clearer than pretending there is a completed application system when there is not."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Submit Resume' },
        ]}
        actions={[
          { href: '/jobs', label: 'Browse Jobs' },
          { href: '/contact', label: 'Contact', variant: 'secondary' },
        ]}
      />

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.6fr)]">
          <article className="depth-plane px-7 py-8 md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Manual intake
            </p>
            <p className="mt-4 text-base leading-relaxed text-black/72 md:text-lg">
              Resume review is handled manually. That keeps the candidate path honest — no automated system that collects your details and goes nowhere.
            </p>
          </article>

          <article className="depth-inset rounded-[30px] px-6 py-7 md:px-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Keep it specific</p>
            <ul className="mt-4 space-y-3">
              {resumeGuidance.map((item) => (
                <li key={item} className="rounded-[20px] border border-black/8 bg-white/70 px-4 py-3 text-sm text-black/70">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <CallToActionPanel
        eyebrow="Candidate next step"
        title="Start with active roles, then use resume submission when needed."
        body="Start with active roles. If nothing fits right now, reach out directly at Sarah.fell@staffingsolutionsbysarah.com — resume intake is handled manually and responses are honest."
        actions={[
          { href: '/jobs', label: 'Browse Jobs' },
          { href: '/contact', label: 'Contact', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
