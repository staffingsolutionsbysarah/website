'use client';

import { ArrowRight, TrendingUp, Users, Mail } from 'lucide-react';
import Link from 'next/link';

import GlobeHero from '@/components/home/GlobeHero';
import HorizontalStackingCards from '@/components/home/HorizontalStackingCards';
import { ClientLogosSection } from '@/components/home/ClientLogosSection';
import { ServicesIndustriesSection } from '@/components/home/ServicesIndustriesSection';
import { DeliveryModelsSection } from '@/components/home/DeliveryModelsSection';
import TrustBlock from '@/components/home/TrustBlock';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import { ProcessSection } from '@/components/home/ProcessSection';

const proofStrip = [
  { value: '10+ Years', label: 'Experience' },
  { value: 'Direct Access', label: 'Network' },
  { value: 'Fit Over Volume', label: 'Philosophy' },
  { value: 'Global Network', label: 'Focus' },
] as const;

export default function HomePage() {
  return (
    <main className="bg-parchment text-charcoal">
      {/* Hero - Globe hero */}
      <GlobeHero />

      {/* Proof Strip - Layered over hero */}
      <section className="relative z-10 -mt-16 bg-brand-green py-8 md:-mt-24 md:py-12 border-y border-white/10">
        <div className="mx-auto grid w-[calc(100%-3rem)] gap-6 py-4 md:grid-cols-4 md:px-10">
          {proofStrip.map((item, i) => (
            <div key={item.value} className={`text-center ${i < proofStrip.length - 1 ? 'border-r border-white/10' : ''}`}>
              <span className="block text-gold text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-1">
                {item.label}
              </span>
              <span className="text-white font-serif text-lg md:text-xl">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Cards - GSAP scroll-stop */}
      <HorizontalStackingCards />

      {/* Client Logos */}
      <ClientLogosSection />

      {/* Delivery Models */}
      <DeliveryModelsSection />

      {/* Services/Industries */}
      <ServicesIndustriesSection />

      {/* Trust Block */}
      <TrustBlock />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Process */}
      <ProcessSection />

      {/* Insights */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-khaki">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <div>
              <span className="text-espresso uppercase tracking-widest text-[10px] font-bold mb-4 block">
                Insights
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-espresso">Hiring Trends</h2>
            </div>
            <button className="text-espresso font-bold text-[10px] uppercase tracking-widest hover:underline">
              View All Articles
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'The Future of Skilled Trades in Ontario',
                date: 'Oct 2024',
                img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
              },
              {
                title: 'Why Cultural Fit Outweighs Technical Skill',
                date: 'Sep 2024',
                img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070',
              },
              {
                title: 'Navigating the Talent Shortage in Manufacturing',
                date: 'Aug 2024',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
              },
            ].map((post, i) => (
              <div key={post.title} className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 md:mb-6">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-espresso/70 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  {post.date}
                </span>
                <h4 className="text-lg md:text-xl font-serif text-espresso group-hover:text-brand-green transition-colors">
                  {post.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl text-white font-serif mb-8 md:mb-12">
            Ready to find your <br />
            <span className="italic text-gold">perfect fit?</span>
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
