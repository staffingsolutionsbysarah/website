import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/data/industries';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const industryImages: Record<string, string> = {
  'manufacturing-skilled-trades': '/images/hero-industrial-manufacturing-ontario.png',
  'food-grocery-retail': '/images/hero-employer-hiring-toronto.png',
  'construction': '/images/hero-ontario-toronto-skyline.png',
  'finance-accounting': '/images/hero-ontario-toronto-skyline.png',
  'it-technology': '/images/hero-ontario-toronto-skyline.png',
  'sales-marketing': '/images/hero-employer-hiring-toronto.png',
  'administrative-support': '/images/hero-trades-construction-plans.png',
};

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: `${industry.title} Recruitment in Ontario`,
    description: industry.summary,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const mainImage = industryImages[industry.slug as string] || '/images/hero-industrial-manufacturing-ontario.png';

  return (
    <div className="depth-canvas bg-[#FAFAFA] text-[var(--color-dark)]">
      {/* Featured Header */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src={mainImage} 
          alt={industry.title} 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative z-10 mx-auto flex h-full max-w-[1380px] flex-col justify-end px-6 pb-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#E7D08A]">Sector Detail</p>
            <h1 className="mt-6 text-[3.5rem] leading-[0.9] tracking-[-0.05em] text-white md:text-[6rem] lg:text-[7rem]">
              {industry.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Editorial Content Layout */}
      <section className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-20 lg:grid-cols-[1fr_0.6fr]">
            <div>
              <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
                Recruitment support built around {industry.title}.
              </h2>
              <div className="mt-12 space-y-8 text-xl leading-relaxed text-black/60">
                <p>
                  {industry.summary} We support employers in this sector with specialized recruiter judgment and a search process built around role clarity, technical credibility, and team fit.
                </p>
                <p>
                  In sectors where the wrong shortlist creates operational drag quickly, direct recruiter ownership helps keep the role calibrated and the search commercially useful.
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-2">
                <div className="rounded-[32px] border border-black/5 bg-white p-10">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-[#C6A64A]">For Employers</h3>
                  <p className="mt-6 text-sm leading-relaxed text-black/50">
                    Use the employer path when the role is active and the team needs cleaner intake, stronger qualification, and more direct search ownership.
                  </p>
                  <Link href="/request-talent-profile" className="mt-8 inline-flex items-center gap-2 font-medium hover:text-[#C6A64A] transition-colors">
                    Request Talent Profile <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-[32px] border border-black/5 bg-white p-10">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-[#C6A64A]">For Candidates</h3>
                  <p className="mt-6 text-sm leading-relaxed text-black/50">
                    Start with active public roles when they exist. If nothing current is posted, use the resume path for future-fit opportunities.
                  </p>
                  <Link href="/jobs" className="mt-8 inline-flex items-center gap-2 font-medium hover:text-[#C6A64A] transition-colors">
                    Browse Active Roles <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-32 lg:h-fit">
              <div className="rounded-[40px] bg-[#1F2628] p-10 text-white md:p-12">
                <h3 className="text-2xl font-medium tracking-tight text-[#E7D08A]">Sector Expertise</h3>
                <ul className="mt-10 space-y-6">
                  {['Technical Calibration', 'Ontario Market Insight', 'Direct Recruiter Leads', 'Retention Outcomes'].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-sm font-medium uppercase tracking-[0.1em] text-white/70">
                      <CheckCircle2 className="h-5 w-5 text-[#C6A64A]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-12 border-t border-white/10">
                  <p className="text-sm text-white/40 italic leading-relaxed">
                    "We don't just send resumes. We provide high-judgment search support for roles that matter."
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}
