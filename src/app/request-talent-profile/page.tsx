import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import CallToActionPanel from '@/components/site/CallToActionPanel';
import TalentRequestForm from '@/components/forms/TalentRequestForm';

export const metadata: Metadata = {
  title: 'Request Talent Profile — Employer Intake',
  description:
    'Start an employer intake conversation with Staffing Solutions by Sarah Fell. Book a call or contact directly to discuss an active hiring requirement.',
};

const intakeItems = [
  'Role title and scope',
  'Location, schedule, and on-site expectations',
  'Compensation range and timing',
  'Why the role is open and what happens if it stays open',
];

export default function RequestTalentProfilePage() {
  return (
    <div className="relative overflow-hidden bg-[#EFEDEF] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(139,118,76,0.18),rgba(139,118,76,0))]" />

      <PageHero
        eyebrow="Employer Support"
        title="Request Talent Profile"
        description="Talent profile requests are handled through direct intake. Start with a call or send a brief outline of the role — we will respond with the right next step."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Request Talent Profile' },
        ]}
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/contact', label: 'Contact', variant: 'secondary' },
        ]}
      />

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.6fr)]">
          <article className="depth-plane px-7 py-8 md:px-10 md:py-10">
            <TalentRequestForm />
          </article>

          <article className="depth-inset rounded-[30px] px-6 py-7 md:px-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Helpful intake details</p>
            <ul className="mt-4 space-y-3">
              {intakeItems.map((item) => (
                <li key={item} className="rounded-[20px] border border-black/8 bg-white/70 px-4 py-3 text-sm text-black/70">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <CallToActionPanel
        eyebrow="Employer next step"
        title="Move into the direct intake route."
        body="Use booking for an active hiring discussion or contact if the conversation needs a different entry point first."
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/contact', label: 'Contact', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
