import { notFound } from 'next/navigation';
import PageHero from '@/components/site/PageHero';
import LinkCardGrid from '@/components/site/LinkCardGrid';
import CallToActionPanel from '@/components/site/CallToActionPanel';
import { getLocation, industries, locations } from '@/data/site-data';

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const relatedIndustries = industries
    .filter((industry) => location.relatedIndustrySlugs.includes(industry.slug))
    .map((industry) => ({
      href: `/industries/${industry.slug}`,
      title: industry.title,
      description: industry.summary,
      eyebrow: 'Related industry',
    }));

  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Location Page"
        title={location.title}
        description={location.summary}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/locations', label: 'Locations' },
          { label: location.title.replace(' Recruitment Support', '') },
        ]}
        actions={[
          { href: '/contact', label: 'Contact' },
          { href: '/book-a-call', label: 'Book a Call', variant: 'secondary' },
        ]}
      />

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.6fr)]">
          <article className="depth-plane px-7 py-8 md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Market focus
            </p>
            <p className="mt-4 text-base leading-relaxed text-black/72 md:text-lg">{location.marketFocus}</p>
          </article>

          <article className="depth-inset rounded-[30px] px-6 py-7 md:px-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Typical hiring needs</p>
            <ul className="mt-4 space-y-3">
              {location.hiringNeeds.map((need) => (
                <li key={need} className="rounded-[20px] border border-black/8 bg-white/70 px-4 py-3 text-sm text-black/70">
                  {need}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <LinkCardGrid
        title="Related industry pages"
        description="Industries active in this region. Explore the sector coverage most relevant to your hiring needs."
        cards={relatedIndustries}
      />

      <CallToActionPanel
        eyebrow="Next step"
        title="Ready to talk through a role in this area?"
        body="Local market knowledge is only useful when the next step is clear. Book a call to discuss the role, or browse active jobs in the region."
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/jobs', label: 'Browse Jobs', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
