'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Factory, HardHat, Briefcase } from 'lucide-react';

const caseStudies = [
  {
    category: 'Manufacturing',
    icon: Factory,
    title: 'Plant Manager Search in Quinte Region',
    challenge: 'A critical leadership role open for 4 months with previous failed agency attempts.',
    solution: 'Deep intake to clarify reporting friction, targeted outreach to regional industrial leads.',
    outcome: 'Successful placement in 5 weeks; retention maintained at 18 months.',
  },
  {
    category: 'Skilled Trades',
    icon: HardHat,
    title: 'Millwright Team Expansion for Food Processing',
    challenge: 'Scaling a maintenance team against high market competition and shift requirements.',
    solution: 'Recruiter-led screening focused on shift fit and technical credibility.',
    outcome: '3 millwrights hired within 60 days; zero attrition in the first year.',
  },
  {
    category: 'Operations',
    icon: Briefcase,
    title: 'Director of Operations for Southwestern Ontario Firm',
    challenge: 'Need for a commercially-aware leader with deep floor-level industrial experience.',
    solution: 'Direct search calibration and tighter shortlist presentation.',
    outcome: 'Shortlist of 3 candidates delivered; hire made from first interview round.',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)]">
      {/* Hero Section */}
      <section className="relative px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(circle_at_top_right,rgba(198,166,74,0.12),transparent_40%)]" />
        
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[700px]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--color-accent)]">
              Proof of Delivery
            </p>
            <h1 className="mt-6 text-5xl font-medium tracking-[-0.03em] md:text-7xl">
              Recruitment Case Studies.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-black/65">
              Success stories from Ontario manufacturing and industrial hiring. We focus on search outcomes, role fit, and long-term hiring success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="px-6 pb-32 pt-10">
        <div className="mx-auto max-w-[1200px] space-y-12">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="depth-plane overflow-hidden"
            >
              <div className="grid lg:grid-cols-[300px_1fr]">
                <div className="bg-[#1F2628] p-8 text-white flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7D08A]/10 text-[#E7D08A] mb-6 border border-[#E7D08A]/20">
                      <study.icon className="h-6 w-6" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D08A]/60">
                      {study.category}
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <CheckCircle2 className="h-10 w-10 text-[#E7D08A]/20" />
                  </div>
                </div>
                
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-medium tracking-tight mb-8">
                    {study.title}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3">Challenge</p>
                      <p className="text-sm leading-relaxed text-black/70">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3">Solution</p>
                      <p className="text-sm leading-relaxed text-black/70">{study.solution}</p>
                    </div>
                    <div className="bg-[#E7D08A]/10 p-4 rounded-2xl border border-[#E7D08A]/20">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8872F] mb-3">Outcome</p>
                      <p className="text-sm font-medium leading-relaxed text-[#2C3434]">{study.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
