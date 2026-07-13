'use client';

import { ArrowRight, TrendingUp, Users, Mail } from 'lucide-react';
import Link from 'next/link';

import CinematicHero from '@/components/home/CinematicHero';
import HorizontalStackingCards from '@/components/home/HorizontalStackingCards';
import { ServicesIndustriesSection } from '@/components/home/ServicesIndustriesSection';
import { DeliveryModelsSection } from '@/components/home/DeliveryModelsSection';
import TrustBlock from '@/components/home/TrustBlock';
import { ProcessSection } from '@/components/home/ProcessSection';

const proofStrip = [
  { value: '10+ Years', label: 'Experience' },
  { value: 'Direct Access', label: 'Network' },
  { value: 'Fit Over Volume', label: 'Philosophy' },
  { value: 'Global Network', label: 'Focus' },
] as const;

export default function HomePage() {
  return (
    <main className="bg-[#FAF9F6] text-[#2C3434]">
      {/* Hero — Canada signal preloader → cinematic image hero */}
      <CinematicHero />

      {/* Proof Strip — dark band anchored to hero base */}
      <section className="relative z-10 bg-[#2C3434] py-8 md:py-12 border-t border-white/8">
        <div className="mx-auto grid w-[calc(100%-3rem)] gap-6 py-4 md:grid-cols-4 md:px-10">
          {proofStrip.map((item, i) => (
            <div key={item.value} className={`text-center ${i < proofStrip.length - 1 ? 'border-r border-white/10' : ''}`}>
              <span className="block text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: '#C8AD6A' }}>
                {item.label}
              </span>
              <span className="text-white font-serif text-lg md:text-xl">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Cards - GSAP scroll-stop */}
      <HorizontalStackingCards />

      {/* Delivery Models */}
      <DeliveryModelsSection />

      {/* Services/Industries */}
      <ServicesIndustriesSection />

      {/* Trust Block */}
      <TrustBlock />

      {/* Client logos + testimonials removed until real, consented material exists (see PRD P2) */}

      {/* Process */}
      <ProcessSection />

      {/* Insights */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <div>
              <span className="text-espresso uppercase tracking-widest text-[10px] font-bold mb-4 block">
                Insights
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-espresso">Hiring Trends</h2>
            </div>
            <Link href="/insights" className="text-espresso font-bold text-[10px] uppercase tracking-widest hover:underline">
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'The Future of Skilled Trades in Ontario',
                date: 'Oct 2024',
                img: '/images/industrial-trades-blueprints.webp',
              },
              {
                title: 'Why Cultural Fit Outweighs Technical Skill',
                date: 'Sep 2024',
                img: '/images/business-planning-strategy-flatlay.webp',
              },
              {
                title: 'Navigating the Talent Shortage in Manufacturing',
                date: 'Aug 2024',
                img: '/images/hero-industrial-manufacturing-ontario.webp',
              },
            ].map((post, i) => (
              <Link key={post.title} href="/insights" className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 md:mb-6">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-espresso/70 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  {post.date}
                </span>
                <h4 className="text-lg md:text-xl font-serif text-espresso group-hover:text-brand-green transition-colors">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full blur-[120px] rounded-full" style={{ background: 'rgba(200,173,106,0.06)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl text-white font-serif mb-8 md:mb-12">
            Ready to find your <br />
            <span className="italic" style={{ color: '#C8AD6A' }}>perfect fit?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              href="/book-a-call"
              className="btn-gold px-8 md:px-12 py-4 md:py-5 text-xs md:text-sm w-full sm:w-auto"
            >
              Book a Hiring Call
            </Link>
            <Link
              href="/find-work"
              className="btn-outline border-white/20 text-white hover:bg-white hover:text-charcoal px-8 md:px-12 py-4 md:py-5 text-xs md:text-sm w-full sm:w-auto"
            >
              Find Your Next Role
            </Link>
          </div>
          <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Scalable Solutions
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Elite Network
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Direct Access
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
