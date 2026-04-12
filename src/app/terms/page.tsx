'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-dark)] min-h-screen">
      <section className="px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-medium tracking-tight md:text-6xl mb-8">Terms of Service</h1>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-12">
              Last Updated: April 2024
            </p>
            
            <div className="depth-plane p-8 md:p-12 prose prose-sm prose-black/70 max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-medium text-black mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you agree to comply with and be bound by these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">2. Services</h2>
                <p>
                  TODO: Describe services provided through the website (e.g., job listings, resume submission, booking).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">3. User Obligations</h2>
                <p>
                  TODO: Detail user responsibilities (e.g., providing accurate info, lawful use).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">4. Intellectual Property</h2>
                <p>
                  TODO: Clause on ownership of website content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">5. Limitation of Liability</h2>
                <p>
                  TODO: Standard limitation of liability clause.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">6. Contact Us</h2>
                <p>
                  For any questions regarding these terms, please contact us at sarah@sarahfell.ca.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
