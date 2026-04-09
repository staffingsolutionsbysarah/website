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

export default function JobsPage() {
  const [search, setSearch] = useState('');

  const activeJobs = useMemo(
    () => jobs.filter((job) => isActive(job.active) && isPublic(job.public)),
    [],
  );

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return activeJobs;
    }

    return activeJobs.filter((job) =>
      [job.title, job.location, job.type, job.summary].some((value) => value.toLowerCase().includes(query)),
    );
  }, [activeJobs, search]);

  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <section className="px-4 pb-20 pt-16 md:px-6 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(340px,0.44fr)] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-black/55">Open Roles</p>
              <h1 className="mt-4 max-w-[16ch] text-5xl tracking-[-0.04em] md:text-6xl">
                Active positions we are currently recruiting.
              </h1>
              <p className="mt-6 max-w-[44rem] text-base leading-relaxed text-black/70 md:text-lg">
                Each role below is an active public search. If you are a hiring manager looking to fill a similar
                position, book a call.
              </p>
            </div>

            {activeJobs.length > 0 && (
              <div className="depth-inset rounded-[28px] px-5 py-5 md:px-6">
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
                  placeholder="Search roles…"
                  className="mt-3 w-full border-b border-black/12 bg-transparent px-0 py-3 text-sm text-black/82 outline-none transition placeholder:text-black/36 focus:border-[#C6A64A]"
                />
              </div>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="depth-plane mt-12 max-w-[58rem] px-8 py-12 md:px-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">No active roles</p>
              <h2 className="mt-3 text-2xl tracking-tight md:text-3xl">
                {search ? 'No roles match your search.' : 'Nothing posted right now.'}
              </h2>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-black/70 md:text-base">
                {search
                  ? 'Try a different keyword or clear your search.'
                  : 'We post roles as searches go live. Check back soon, or book a call to discuss an upcoming hiring need.'}
              </p>
              <Link href="/book-a-call" className="btn-primary mt-7">
                Book a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">{job.type}</p>
                    <h2 className="mt-3 text-[1.8rem] leading-[1.02] tracking-tight">{job.title}</h2>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/44">
                      <span>{job.location}</span>
                      {job.salary ? <span>{job.salary}</span> : null}
                    </div>
                    <p className="mt-5 max-w-[48rem] text-sm leading-relaxed text-black/68 md:text-base">{job.summary}</p>
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
    </div>
  );
}
