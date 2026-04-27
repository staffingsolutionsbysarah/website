import PageHero from '@/components/site/PageHero';
import CallToActionPanel from '@/components/site/CallToActionPanel';

const processSteps = [
  {
    title: 'Scope the role properly',
    body: 'Start with the real vacancy: reporting line, urgency, compensation, shift reality, and what happens if the role stays open.',
  },
  {
    title: 'Search and screen against reality',
    body: 'Qualification stays anchored to technical relevance, environment fit, and whether the person can actually succeed in the role as described.',
  },
  {
    title: 'Present a tighter shortlist',
    body: 'Candidate presentation should make review easier for the hiring team, not heavier.',
  },
  {
    title: 'Keep feedback moving',
    body: 'Interview movement, objections, and process friction are handled directly so good candidates do not disappear into delay.',
  },
  {
    title: 'Support the close',
    body: 'Offer-stage communication stays practical through acceptance and the final stretch of the hiring decision.',
  },
];

export default function OurProcessPage() {
  return (
    <div className="relative overflow-hidden bg-[#2C3434] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(139,118,76,0.22),transparent_58%)]" />

      <PageHero
        eyebrow="Process"
        title="A hiring process built around clarity, fit, and pace."
        description="This page expands the process preview from the homepage without turning it into vague recruiter language. The sequence is direct because the outcome needs to be usable."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Our Process' },
        ]}
        actions={[
          { href: '/request-talent-profile', label: 'Request Talent Profile' },
          { href: '/book-a-call', label: 'Book a Call', variant: 'secondary' },
        ]}
        theme="dark"
      />

      <section className="px-4 pb-8 md:px-6 md:pb-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="space-y-5">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className={[
                  'depth-plane-dark rounded-[30px] px-6 py-6 md:px-8 md:py-8',
                  index % 2 === 0 ? 'lg:mr-14' : 'lg:ml-14',
                ].join(' ')}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#AB9D82]">
                  Step {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-3 text-[1.8rem] leading-[1.04] tracking-tight text-white md:text-[2.1rem]">
                  {step.title}
                </h2>
                <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/78 md:text-base">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToActionPanel
        eyebrow="Next step"
        title="Use the process page as a bridge, not the finish line."
        body="Once the process is clear, the route should move into intake, booking, or candidate review without extra ambiguity."
        actions={[
          { href: '/request-talent-profile', label: 'Request Talent Profile' },
          { href: '/jobs', label: 'Browse Jobs', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
