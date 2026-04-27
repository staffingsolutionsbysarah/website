'use client';

import { motion } from 'framer-motion';
import { Mail, ShieldCheck, Zap } from 'lucide-react';

export default function NewsletterPage() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)] min-h-screen">
      <section className="relative px-6 pb-20 pt-16 md:pb-32 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(circle_at_top_right,rgba(139,118,76,0.15),transparent_40%)]" />
        
        <div className="mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--color-accent)]">
                Recruiter Field Notes
              </p>
              <h1 className="mt-6 font-serif font-light text-[3rem] leading-[0.92] tracking-[-0.04em] md:text-[5rem]">
                Stay current with Ontario hiring.
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-black/65">
                Occasional emails for Ontario industrial leaders, hiring managers, and HR professionals. We cover market trends, search strategy, and practical hiring advice.
              </p>
              
              <div className="mt-12 space-y-6">
                {[
                  { icon: Zap, title: 'No Fluff', body: 'Short, practical insights you can actually use.' },
                  { icon: ShieldCheck, title: 'Privacy First', body: 'We never share your data. Unsubscribe anytime.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#AB9D82]/20 text-[#714E3C]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-sm text-black/60">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="depth-plane p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/5 text-black mb-6">
                  <Mail className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-medium tracking-tight">Join the network</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-black/60">
                  The newsletter subscription form is being set up. To be added to the list in the meantime, email directly:
                </p>
                <a
                  href="mailto:Sarah.fell@staffingsolutionsbysarah.com?subject=Newsletter%20Subscription"
                  className="btn-primary w-full justify-center py-5 text-sm"
                >
                  Email to Subscribe
                </a>
                <p className="text-[10px] text-center text-black/40 mt-4 leading-relaxed">
                  You will receive occasional market notes and hiring commentary for Ontario industrial leaders.
                </p>
              </div>

              <div className="mt-10 editorial-rule" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
