import PageHero from '@/components/site/PageHero';
import LinkCardGrid from '@/components/site/LinkCardGrid';
import CallToActionPanel from '@/components/site/CallToActionPanel';
import { locationHubCards } from '@/data/site-data';

export default function LocationsPage() {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Location Hub"
        title="Ontario location pages built to preserve regional trust and local search structure."
        description="Locations stay separated by URL so regional intent is not flattened into one generic market page. That matches the build guide and keeps the site extensible."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Locations' },
        ]}
        actions={[
          { href: '/hire-talent', label: 'Hire Talent' },
          { href: '/contact', label: 'Contact', variant: 'secondary' },
        ]}
      />

      <LinkCardGrid
        title="Location pages"
        description="Each page anchors the site to a real Ontario market instead of collapsing everything into one province-wide summary."
        cards={locationHubCards}
      />

      <CallToActionPanel
        eyebrow="Ontario coverage"
        title="Use the regional pages to keep local relevance visible."
        body="Location pages create a cleaner structure for employers, candidates, and future content linking without changing the site’s core architecture."
        actions={[
          { href: '/book-a-call', label: 'Book a Call' },
          { href: '/jobs', label: 'Browse Jobs', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
