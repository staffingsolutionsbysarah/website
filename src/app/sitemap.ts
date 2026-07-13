import type { MetadataRoute } from 'next';
import { industries, locations } from '@/data/site-data';
import { jobs, slugifyJob } from '@/data/jobs';

export const dynamic = 'force-static';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://sarah-fell-website-vercel-clone.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/hire-talent',
    '/find-work',
    '/jobs',
    '/services',
    '/industries',
    '/locations',
    '/about',
    '/our-process',
    '/case-studies',
    '/insights',
    '/newsletter',
    '/book-a-call',
    '/contact',
    '/submit-resume',
    '/request-talent-profile',
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: (path === '' || path === '/jobs' ? 'daily' : 'monthly') as
      | 'daily'
      | 'monthly',
    priority: path === '' ? 1 : path === '/jobs' ? 0.9 : 0.7,
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const locationRoutes = locations.map((location) => ({
    url: `${siteUrl}/locations/${location.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const jobRoutes = jobs
    .filter((job) => job.active && job.public)
    .map((job) => ({
      url: `${siteUrl}/jobs/${slugifyJob(job)}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  return [...staticRoutes, ...industryRoutes, ...locationRoutes, ...jobRoutes];
}
