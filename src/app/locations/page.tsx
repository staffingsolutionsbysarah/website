import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import LinkCardGrid from '@/components/site/LinkCardGrid';
import CallToActionPanel from '@/components/site/CallToActionPanel';
import { locationHubCards } from '@/data/site-data';

export const metadata: Metadata = {
  title: 'Ontario Locations — Recruitment Coverage Across Ontario',
  description:
    'Staffing Solutions by Sarah Fell provides skilled trades, manufacturing, and operations recruitment support across key Ontario markets — Vaughan, Toronto GTA, Belleville, Windsor, and Chatham-Kent.',
};

export default function LocationsPage() {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Ontario Coverage"
        title="Where Sarah recruits."
        description="Skilled trades, manufacturing, and operations hiring across Ontario. Select a region to see typical roles, active industries, and what a realistic recruitment timeline looks like."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Locations' },
        ]}
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/contact', label: 'Get in Touch', variant: 'secondary' },
        ]}
      />

      <LinkCardGrid
        title="Areas served"
        description="Each region has its own hiring pressures. Select a market to see typical roles, sector coverage, and what realistic candidate pools look like in that area."
        cards={locationHubCards}
      />

      <CallToActionPanel
        eyebrow="Start here"
        title="Need to hire in Ontario?"
        body="Book a call and we'll map your role to the right regional market, timeline, and candidate pool."
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/contact', label: 'Get in Touch', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
