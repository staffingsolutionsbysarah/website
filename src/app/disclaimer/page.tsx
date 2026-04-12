'use client';

import { motion } from 'framer-motion';

export default function DisclaimerPage() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-dark)] min-h-screen">
      <section className="px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-medium tracking-tight md:text-6xl mb-8">Disclaimer</h1>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-12">
              Last Updated: April 2024
            </p>
            
            <div className="depth-plane p-8 md:p-12 prose prose-sm prose-black/70 max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-medium text-black mb-4">1. Information Accuracy</h2>
                <p>
                  The information provided on this website is for general informational purposes only. While we strive to keep information accurate, we make no representations or warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">2. Professional Advice</h2>
                <p>
                  TODO: Clarify that site content is not professional legal, financial, or career advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">3. External Links</h2>
                <p>
                  TODO: Clause on third-party links and lack of responsibility for external content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">4. Results Disclaimer</h2>
                <p>
                  TODO: Disclaimer regarding hiring outcomes and job placement guarantees.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">5. Contact Us</h2>
                <p>
                  For any questions regarding this disclaimer, please contact us at sarah@sarahfell.ca.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
