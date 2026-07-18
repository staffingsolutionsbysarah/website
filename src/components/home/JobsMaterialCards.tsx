'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { jobs } from '@/data/jobs';

gsap.registerPlugin(ScrollTrigger);

const TEXTURE_MAP = [
  { texture: 'paper-texture.webp', label: 'paper' },
  { texture: 'stone-texture.webp', label: 'stone' },
  { texture: 'metal-texture.webp', label: 'metal' },
  { texture: 'wood-texture.webp', label: 'wood' },
];

export default function JobsMaterialCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.job-card');
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const activeJobs = jobs.filter((j) => j.active && j.public);

  if (activeJobs.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="bg-[#F2EDE3] px-6 py-24 md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#4A6A58]/60">
            Active Roles
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight tracking-[-0.02em] text-[#2C3434] md:text-4xl">
            No active roles
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#2C3434]/60">
            No active roles &mdash; check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#F2EDE3] px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#4A6A58]/60">
            Active Roles
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight tracking-[-0.02em] text-[#2C3434] md:text-4xl">
            Current opportunities
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {activeJobs.slice(0, 4).map((job, index) => {
            const material = TEXTURE_MAP[index % TEXTURE_MAP.length];
            return (
              <Link
                key={job.id}
                href={job.href}
                className="job-card group relative block overflow-hidden"
                style={{ opacity: 0 }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(/textures/${material.texture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, rgba(44,52,52,0.03), rgba(44,52,52,0.08))`,
                  }}
                />
                <div className="relative border border-[#2C3434]/10 bg-white/60 p-8 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/80 group-hover:shadow-lg">
                  <span className="mb-2 inline-block rounded-full bg-[#C6A64A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C6A64A]">
                    {job.type}
                  </span>
                  <h3 className="font-serif text-xl font-light leading-snug tracking-[-0.02em] text-[#2C3434]">
                    {job.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#2C3434]/50">{job.location}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#2C3434]/70">
                    {job.summary}
                  </p>
                  {job.salary && (
                    <p className="mt-3 text-sm font-medium text-[#4A6A58]">
                      {job.salary}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
