'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Factory,
  Hammer,
  HardHat,
  BriefcaseBusiness,
  Users,
  MapPinned,
  Megaphone,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const serviceModel = [
  {
    title: 'Direct search ownership',
    body: 'The search does not get handed off through layers. Intake, calibration, shortlist logic, and close stay connected.',
  },
  {
    title: 'Business-aware qualification',
    body: 'Candidate review is shaped around urgency, team reality, reporting line, and the actual cost of a weak hire.',
  },
  {
    title: 'Less hiring drag',
    body: 'Clearer search direction and tighter feedback loops help employers move faster without lowering judgment.',
  },
] as const;

const capabilityLanes = [
  {
    icon: Factory,
    image: '/images/hero-industrial-manufacturing-ontario.webp',
    title: 'Manufacturing & Industrial',
    summary: 'Industrial recruitment for production, quality, plant, and operations hiring where productivity pressure is real.',
    pressure: 'When the line cannot sit open and the hiring team needs usable candidates quickly.',
    tags: ['Production', 'Quality', 'Plant leadership'],
  },
  {
    icon: Hammer,
    image: '/images/industrial-trades-blueprints.webp',
    title: 'Skilled Trades & Maintenance',
    summary: 'Skilled trades recruitment for maintenance-heavy environments where technical fit and shift reality matter.',
    pressure: 'When the role is hard to fill and weak screening gets expensive fast.',
    tags: ['Millwrights', 'Electricians', 'Maintenance'],
  },
  {
    icon: HardHat,
    image: '/images/hero-trades-construction-plans.webp',
    title: 'Construction & Engineering',
    summary: 'Search support for field, project, and engineering-adjacent teams that need stronger shortlist judgment.',
    pressure: 'When site pressure, delivery pressure, or project timing leaves little room for process waste.',
    tags: ['Site leadership', 'Projects', 'Engineering'],
  },
  {
    icon: BriefcaseBusiness,
    image: '/images/business-planning-strategy-flatlay.webp',
    title: 'Accounting & Finance',
    summary: 'Business-side recruitment for firms that still want direct recruiter judgment rather than generic resume flow.',
    pressure: 'When the role needs commercial awareness, discretion, and cleaner early filtering.',
    tags: ['Accounting', 'Finance', 'Controllers'],
  },
  {
    icon: Users,
    image: '/images/retail-supermarket-teamwork-ontario.webp',
    title: 'Sales & Office Support',
    summary: 'Office and support hiring where reliability, communication, and role fit still drive business outcomes.',
    pressure: 'When the team needs someone dependable who can support execution, not just fill a seat.',
    tags: ['Coordinators', 'Support', 'Office roles'],
  },
  {
    icon: MapPinned,
    image: '/images/industrial-factory-control-panel.webp',
    title: 'Technology & Logistics',
    summary: 'Adjacent hiring coverage for planning, dispatch, logistics, and systems-adjacent operational roles.',
    pressure: 'When the brief is mixed and the search still needs structure, speed, and recruiter judgment.',
    tags: ['Logistics', 'Planning', 'Dispatch'],
  },
  {
    icon: Megaphone,
    image: '/images/business-planning-strategy-flatlay.webp',
    title: 'Marketing & Creative',
    summary: 'Hire for campaign, content, and brand roles where commercial instinct matters more than credentials alone.',
    pressure: 'When the team needs someone who understands both the audience and the business, not just the deliverable.',
    tags: ['Digital Marketing', 'Content', 'Brand'],
  },
  {
    icon: TrendingUp,
    image: '/images/retail-supermarket-teamwork-ontario.webp',
    title: 'Business Development',
    summary: 'Revenue-adjacent and client-facing hiring for roles where relationship quality and commercial judgment drive outcomes.',
    pressure: 'When the hire has to build trust fast and carry real accountability for results.',
    tags: ['BD', 'Account Management', 'Client Relations'],
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
    },
  }),
};

interface IndustryCardProps {
  lane: (typeof capabilityLanes)[number];
  index: number;
}

function IndustryCard({ lane, index }: IndustryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="depth-plane relative min-h-[560px] w-[min(82vw,740px)] shrink-0 snap-start transition-transform duration-300 ease-out"
      style={{
        y: isHovered ? -8 : 0,
      }}
    >
      <div
        className="absolute inset-0 rounded-[28px] transition-shadow duration-300 ease-out"
        style={{
          boxShadow: isHovered
            ? '0 24px 48px -12px rgba(0,0,0,0.25)'
            : '0 8px 24px -6px rgba(0,0,0,0.12)',
        }}
      >
        <Image
          src={lane.image}
          alt={lane.title}
          fill
          sizes="(max-width: 1023px) 82vw, 740px"
          className="rounded-[28px] object-cover"
        />
        <div className="depth-veil rounded-[28px]" />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
        <div className="rounded-full px-4 py-2 depth-caption">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/48">
            Sector {String(index + 1).padStart(2, '0')}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur-sm">
          <lane.icon className="h-5 w-5" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <div className="max-w-[30rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#AB9D82]">
            {lane.tags.join(' / ')}
          </p>
          <h3 className="mt-3 max-w-[14ch] text-[2rem] leading-[0.96] tracking-[-0.04em] text-white md:text-[2.55rem]">
            {lane.title}
          </h3>
          <p className="mt-4 max-w-[30rem] text-sm leading-relaxed text-white/78 md:text-base">
            {lane.summary}
          </p>
          <p className="mt-5 max-w-[28rem] border-l border-white/18 pl-4 text-sm leading-relaxed text-white/68">
            {lane.pressure}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesIndustriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const updateProgress = () => {
        const { scrollLeft, scrollWidth: sw, clientWidth } = scrollRef.current!;
        const maxScroll = sw - clientWidth;
        const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        setScrollProgress(progress);
      };

      const container = scrollRef.current;
      container.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
      return () => container.removeEventListener('scroll', updateProgress);
    }
  }, []);

  return (
    <section className="relative -mt-6 px-4 py-18 md:px-6 md:py-24" id="services">
      <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[minmax(280px,0.34fr)_minmax(0,0.66fr)]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Services + industries
          </p>
          <h2 className="mt-4 max-w-[10ch] text-[2.65rem] leading-[0.94] tracking-[-0.045em] md:text-[3.65rem]">
            Specialist coverage with stronger search judgment.
          </h2>
          <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-black/66">
            Eight hiring lanes. Each sector operates with the same direct recruiter ownership and qualification logic — applied to the specific pressures of that industry and role environment.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/industries" className="btn-primary">
              View Industries
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/hire-talent" className="btn-secondary">
              Hire Talent
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 depth-inset rounded-[28px] px-5 py-6">
            {serviceModel.map((item, index) => (
              <div
                key={item.title}
                className={index === serviceModel.length - 1 ? '' : 'border-b border-black/8 pb-5 mb-5'}
              >
                <p className="text-[1.12rem] tracking-tight">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/64">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/8">
              <motion.div
                className="h-full rounded-full bg-[var(--color-accent)]"
                style={{
                  width: `${scrollProgress * 100}%`,
                }}
              />
            </div>
            <span className="ml-4 text-xs text-black/40">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          <div
            ref={scrollRef}
            className="overflow-x-auto pb-4 [scrollbar-color:rgba(44,52,52,0.24)_transparent] [scrollbar-width:thin] snap-x snap-mandatory"
          >
            <div className="flex min-w-max gap-5 pr-6">
              {capabilityLanes.map((lane, index) => (
                <IndustryCard key={lane.title} lane={lane} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}