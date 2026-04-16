import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import CallToActionPanel from '@/components/site/CallToActionPanel';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Staffing Solutions by Sarah Fell',
  description:
    'Get in touch with Staffing Solutions by Sarah Fell for employer and candidate inquiries, hiring discussions, and direct intake.',
};

const contactOptions = [
  {
    title: 'General inquiries',
    body: 'Use this route when the right next step is not obvious yet and you need to reach Sarah directly.',
    detail: 'Direct inquiry route',
  },
  {
    title: 'Hiring conversations',
    body: 'If the role is active or hiring pressure is real, booking a call is still the stronger route.',
    detail: 'Direct intake via booking page',
  },
  {
    title: 'Candidate questions',
    body: 'Candidates should use jobs or resume submission first, then contact if context still needs to be clarified.',
    detail: 'Jobs or resume path first',
  },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Contact"
        title="Direct contact without adding unnecessary friction."
        description="Use this page for general inquiries, or route directly to booking when the hiring conversation is ready to start. For a direct line, email Sarah.fell@staffingsolutionsbysarah.com."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Contact' },
        ]}
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/request-talent-profile', label: 'Request Talent Profile', variant: 'secondary' },
        ]}
      />

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-3">
          {contactOptions.map((option) => (
            <article key={option.title} className="depth-plane px-6 py-6">
              <h2 className="text-[1.7rem] leading-[1.04] tracking-tight">{option.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/68 md:text-base">{option.body}</p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {option.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-[640px]">
          <ContactForm />
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-3">
          {contactOptions.map((option) => (
            <article key={option.title} className="depth-plane px-6 py-6">
              <h2 className="text-[1.7rem] leading-[1.04] tracking-tight">{option.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/68 md:text-base">{option.body}</p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {option.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CallToActionPanel
        eyebrow="Utility path"
        title="Use contact when you need a direct routing layer."
        body="If the role is ready to discuss, booking is the fastest route. For everything else, reach Sarah directly at Sarah.fell@staffingsolutionsbysarah.com."
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/find-work', label: 'Find Work', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
