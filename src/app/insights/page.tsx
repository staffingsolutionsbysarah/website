'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const placeholderInsights = [
  {
    title: 'Where industrial hiring processes lose good candidates first.',
    date: 'April 10, 2024',
    readTime: '5 min read',
    summary: 'A recruiter-led note on vague briefs, slow interview movement, and why good people disappear faster than teams expect.',
  },
  {
    title: 'What Ontario employers are tightening in skilled trades hiring right now.',
    date: 'March 28, 2024',
    readTime: '4 min read',
    summary: 'Short commercial observations designed to help employers calibrate earlier and hire with less drag.',
  },
  {
    title: 'Calibration over volume: Why the massive resume dump is failing.',
    date: 'March 15, 2024',
    readTime: '6 min read',
    summary: 'How hiring managers can regain control of their schedule by insisting on tighter shortlist logic.',
  },
];

export default function InsightsPage() {
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
              Recruiter Perspectives
            </p>
            <h1 className="mt-6 text-5xl font-medium tracking-[-0.03em] md:text-7xl">
              Insights & Market Notes.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-black/65">
              Practical observations on Ontario recruitment, industrial hiring trends, and search strategy. No fluff, just field notes for employers and candidates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 pb-32 pt-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {placeholderInsights.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="depth-plane group cursor-pointer"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.1em] text-black/40 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-medium tracking-tight mb-4 group-hover:text-[#A8872F] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-black/60 mb-10 flex-grow">
                    {post.summary}
                  </p>
                  
                  <div className="editorial-rule mb-6" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A64A]">Read article</span>
                    <ArrowRight className="h-4 w-4 text-[#C6A64A] transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-sm text-black/40 italic">
              TODO: Integrate with CMS or Markdown for dynamic content loading.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Strip */}
      <section className="bg-[var(--color-dark-panel)] px-6 py-20 text-white">
        <div className="mx-auto max-w-[800px] text-center">
           <h2 className="text-3xl font-medium tracking-tight md:text-4xl text-[#E7D08A]">
             Get the field notes in your inbox.
           </h2>
           <p className="mt-4 text-white/60">
             Occasional market updates and hiring advice for Ontario industrial leaders.
           </p>
           <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
             <Link href="/newsletter" className="btn-primary border-[#E7D08A] bg-[#E7D08A] text-black hover:bg-white hover:border-white">
               Subscribe to Newsletter
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
