import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { jobs, slugifyJob, getJobBySlug, parseSalary } from '@/data/jobs';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://sarah-fell-website-vercel-clone.vercel.app';

export function generateStaticParams() {
  return jobs
    .filter((job) => job.active && job.public)
    .map((job) => ({ slug: slugifyJob(job) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: 'Role not found' };

  const city = job.location.split(',')[0];
  const title = `${job.title} in ${city}, ON`;
  const description = `${job.salary ? job.salary + '. ' : ''}${job.summary}`.slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/jobs/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/jobs/${slug}`,
      type: 'website',
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job || !job.active || !job.public) notFound();

  const city = job.location.split(',')[0];
  const salary = parseSalary(job.salary);

  // JobPosting structured data -> eligible for Google Jobs listings.
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.summary,
    employmentType: job.type.toUpperCase().replace(/[^A-Z]/g, '_'),
    datePosted: '2026-07-01',
    validThrough: '2026-12-31',
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Staffing Solutions by Sarah Fell',
      sameAs: siteUrl,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
    },
    ...(salary
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'CAD',
            value: {
              '@type': 'QuantitativeValue',
              minValue: salary.min,
              maxValue: salary.max,
              unitText: salary.unit,
            },
          },
        }
      : {}),
  };

  const otherRoles = jobs
    .filter((j) => j.active && j.public && j.id !== job.id)
    .slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-[#FAF9F6] text-[#2C3434]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      <section className="px-4 pb-20 pt-16 md:px-6 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[1080px]">
          <Link
            href="/jobs"
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45 transition-colors hover:text-[#8B764C]"
          >
            Back to all roles
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">
                {job.type}
              </p>
              <h1 className="mt-4 text-4xl leading-[1.02] tracking-[-0.03em] md:text-5xl">
                {job.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-black/50">
                <span>{job.location}</span>
                {job.salary ? <span className="text-[#8B764C]">{job.salary}</span> : null}
              </div>

              <div className="editorial-rule my-8" />

              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">
                About the role
              </h2>
              <p className="mt-4 max-w-[46rem] text-base leading-relaxed text-black/72 md:text-lg">
                {job.summary}
              </p>

              <p className="mt-8 max-w-[46rem] text-sm leading-relaxed text-black/60">
                This is an active search handled directly by Sarah Fell. Apply below and expect a
                recruiter reply within two business days if there is a fit.
              </p>
            </div>

            {/* Sticky apply panel */}
            <aside className="depth-plane rounded-[24px] px-6 py-7 lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">
                Apply for this role
              </p>
              {job.salary ? (
                <p className="mt-3 text-lg font-semibold text-[#8B764C]">{job.salary}</p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-black/64">
                Send your resume and Sarah will review it against this role directly.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/submit-resume" className="btn-primary justify-center">
                  Apply with Resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/book-a-call" className="btn-secondary justify-center">
                  Book a Call
                </Link>
              </div>
            </aside>
          </div>

          {otherRoles.length > 0 && (
            <div className="mt-20 border-t border-black/8 pt-12">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">
                Other open roles
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {otherRoles.map((other) => (
                  <Link
                    key={other.id}
                    href={`/jobs/${slugifyJob(other)}`}
                    className="depth-plane group px-5 py-5 transition-transform hover:-translate-y-1"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/42">
                      {other.location.split(',')[0]}
                    </p>
                    <h3 className="mt-2 text-lg leading-tight tracking-tight group-hover:text-[#8B764C]">
                      {other.title}
                    </h3>
                    {other.salary ? (
                      <p className="mt-2 text-sm text-black/55">{other.salary}</p>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
