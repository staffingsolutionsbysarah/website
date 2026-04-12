'use client';

import { motion } from 'framer-motion';
import { Mail, ShieldCheck, Zap } from 'lucide-react';

export default function NewsletterPage() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)] min-h-screen">
      <section className="relative px-6 pb-20 pt-16 md:pb-32 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(circle_at_top_right,rgba(198,166,74,0.15),transparent_40%)]" />
        
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
              <h1 className="mt-6 text-5xl font-medium tracking-[-0.03em] md:text-7xl">
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7D08A]/20 text-[#A8872F]">
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
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.1em] text-black/40 mb-2 ml-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="you@company.ca"
                    className="w-full rounded-2xl border border-black/10 bg-white/50 px-5 py-4 text-sm focus:border-[#C6A64A] focus:outline-none transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="btn-primary w-full py-5 text-sm"
                >
                  Subscribe
                </button>
                <p className="text-[10px] text-center text-black/40 mt-4 leading-relaxed">
                  By subscribing, you agree to receive marketing communications from Staffing Solutions by Sarah Fell.
                </p>
              </form>
              
              <div className="mt-10 editorial-rule" />
              <p className="mt-6 text-center text-xs text-black/50 italic">
                TODO: Connect to Mailchimp, ConvertKit, or similar ESP.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
