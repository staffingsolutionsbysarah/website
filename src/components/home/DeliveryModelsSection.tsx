'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Crown,
  Search,
  Clock,
  ArrowRightFromLine,
  ArrowRight,
  Briefcase,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';

const deliveryModels = [
  {
    icon: UserCheck,
    title: 'Direct Hire / Permanent Placement',
    description: 'Long-term hires placed directly with your organization. Full-cycle recruitment from intake through onboarding.',
  },
  {
    icon: Crown,
    title: 'Executive Search',
    description: 'Senior and C-suite level placements. Targeted outreach and rigorous evaluation for leadership roles.',
  },
  {
    icon: Search,
    title: 'Retained Search',
    description: 'Exclusive search engagement with upfront commitment. Dedicated resources and priority positioning on hard-to-fill roles.',
  },
  {
    icon: Clock,
    title: 'Contract Staffing',
    description: 'Temporary coverage for seasonal peaks, project needs, or leave replacements. Flexible hiring to match workload demands.',
  },
  {
    icon: ArrowRightFromLine,
    title: 'Contract-to-Perm',
    description: 'Trial period before permanent offer. Evaluate fit in your environment before making a long-term commitment.',
  },
  {
    icon: Briefcase,
    title: 'Admin Support',
    description: 'Administrative professionals for office operations. Reception, coordination, and executive support roles.',
  },
  {
    icon: Wallet,
    title: 'Payroll',
    description: 'Payroll management services for contractor and temporary workforce. Handling compliance, timesheets, and payments.',
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
    },
  }),
};

interface DeliveryCardProps {
  model: (typeof deliveryModels)[number];
  index: number;
}

function DeliveryCard({ model, index }: DeliveryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="depth-plane group relative cursor-pointer overflow-hidden rounded-[20px] transition-transform duration-300"
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <div
        className="absolute inset-0 rounded-[20px] transition-shadow duration-300"
        style={{
          boxShadow: isHovered
            ? '0 20px 40px -10px rgba(0,0,0,0.2)'
            : '0 4px 12px -4px rgba(0,0,0,0.08)',
        }}
      />

      <div className="relative p-6 md:p-7">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--color-section)] transition-colors duration-300 group-hover:bg-[var(--color-accent)]">
          <model.icon className="h-5 w-5 text-[var(--color-dark)] transition-colors duration-300 group-hover:text-white" />
        </div>

        <h3 className="text-[1.25rem] leading-[1.2] tracking-tight text-[var(--color-dark)]">
          {model.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-black/64">
          {model.description}
        </p>
      </div>
    </motion.article>
  );
}

export function DeliveryModelsSection() {
  return (
    <section className="px-4 py-18 md:px-6 md:py-24" id="delivery-models">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-12 md:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Delivery models
          </p>
          <h2 className="mt-4 max-w-[14ch] text-[2.45rem] leading-[0.95] tracking-[-0.045em] md:text-[3.35rem]">
            Flexible hiring models for every workforce need.
          </h2>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-black/66 md:max-w-[36ch]">
            From permanent placement to contract coverage. Choose the model that matches your timeline, budget, and risk tolerance.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deliveryModels.map((model, index) => (
            <DeliveryCard key={model.title} model={model} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 md:mt-14">
          <Link href="/hire-talent" className="btn-primary">
            Discuss Your Hiring Needs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
