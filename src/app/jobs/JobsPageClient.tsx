'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { jobs } from '@/data/jobs';

function isActive(active: boolean | string) {
  return String(active).trim().toLowerCase() === 'true';
}

function isPublic(value: boolean | string) {
  return String(value).trim().toLowerCase() === 'true';
}

export default function JobsPageClient() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const activeJobs = useMemo(
    () => jobs.filter((job) => isActive(job.active) && isPublic(job.public)),
    [],
  );

  const jobTypes = useMemo(() => {
    const types = [...new Set(activeJobs.map((job) => job.type))];
    return types.sort();
  }, [activeJobs]);

  const filteredJobs = useMemo(() => {
    let result = activeJobs;

    if (typeFilter) {
      result = result.filter((job) => job.type === typeFilter);
    }

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((job) =>
        [job.title, job.location, job.type, job.summary].some((value) =>
          value.toLowerCase().includes(query),
        ),
      );
    }

    return result;
  }, [activeJobs, typeFilter, search]);

  return (
    <div className="relative overflow-hidden bg-[#FAF9F6] text-[#2C3434]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(200,173,106,0.12),rgba(200,173,106,0))]" />

      <section className="px-4 pb-20 pt-16 md:px-6 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(340px,0.44fr)] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-black/55">
                Open Roles
              </p>
              <h1 className="mt-4 max-w-[16ch] text-5xl tracking-[-0.04em] md:text-6xl">
                Active positions we are currently recruiting.
              </h1>
              <p className="mt-6 max-w-[44rem] text-base leading-relaxed text-black/70 md:text-lg">
                Each role below is an active public search. If you are a hiring manager looking to
                fill a similar position, book a call.
              </p>
            </div>

            {activeJobs.length > 0 && (
              <div className="depth-inset rounded-[28px] px-5 py-5 md:px-6">
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="jobs-search"
                      className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42"
                    >
                      Search roles
                    </label>
                    <input
                      id="jobs-search"
                      name="jobs-search"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Role, location, type…"
                      className="mt-2 w-full border-b border-black/12 bg-transparent px-0 py-2 text-sm text-black/82 outline-none transition placeholder:text-black/36 focus:border-[#C8AD6A]"
                    />
                  </div>
                  {jobTypes.length > 1 && (
                    <div className="w-40">
                      <label
                        htmlFor="type-filter"
                        className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42"
                      >
                        Role type
                      </label>
                      <select
                        id="type-filter"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="mt-2 w-full cursor-pointer border-b border-black/12 bg-transparent px-0 py-2 text-sm text-black/82 outline-none transition focus:border-[#C8AD6A]"
                      >
                        <option value="">All types</option>
                        {jobTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-black/36">
                  {filteredJobs.length} of {activeJobs.length} role{activeJobs.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="depth-plane mt-12 max-w-[58rem] px-8 py-12 md:px-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">
                No active roles
              </p>
              <h2 className="mt-3 text-2xl tracking-tight md:text-3xl">
                {search || typeFilter ? 'No roles match your filters.' : 'Nothing posted right now.'}
              </h2>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-black/70 md:text-base">
                {search || typeFilter
                  ? 'Try a different keyword or clear your filters.'
                  : 'We post roles as searches go live. Check back soon, or submit your resume for future-fit opportunities.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/submit-resume" className="btn-primary">
                  Submit Resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/book-a-call" className="btn-secondary">
                  Book a Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-5">
              {filteredJobs.map((job, index) => (
                <article
                  key={job.id}
                  className={[
                    'depth-plane grid gap-5 px-6 py-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-end md:px-8',
                    index % 2 === 1 ? 'lg:mr-12' : 'lg:ml-12',
                  ].join(' ')}
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">
                      {job.type}
                    </p>
                    <h2 className="mt-3 text-[1.8rem] leading-[1.02] tracking-tight">{job.title}</h2>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/44">
                      <span>{job.location}</span>
                      {job.salary ? <span>{job.salary}</span> : null}
                    </div>
                    <p className="mt-5 max-w-[48rem] text-sm leading-relaxed text-black/68 md:text-base">
                      {job.summary}
                    </p>
                  </div>

                  {job.href ? (
                    <Link href={job.href} className="btn-secondary md:justify-self-end">
                      View Role
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-black/8 px-4 pb-20 pt-12 md:px-6">
        <div className="mx-auto max-w-[1280px]">
          <div className="depth-plane grid gap-6 px-7 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
                Hiring manager?
              </p>
              <h2 className="mt-4 max-w-[16ch] text-[2.2rem] leading-[0.98] tracking-[-0.04em] md:text-[2.8rem]">
                Have a role to fill?
              </h2>
              <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-black/68">
                Most roles are worked confidentially and are not posted publicly. Book a call to
                discuss your requirement directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/request-talent-profile" className="btn-primary">
                Request Talent Profile
              </Link>
              <Link href="/book-a-call" className="btn-secondary">
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
