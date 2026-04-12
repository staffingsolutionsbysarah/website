'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-dark)] min-h-screen">
      <section className="px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-medium tracking-tight md:text-6xl mb-8">Privacy Policy</h1>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-12">
              Last Updated: April 2024
            </p>
            
            <div className="depth-plane p-8 md:p-12 prose prose-sm prose-black/70 max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-medium text-black mb-4">1. Introduction</h2>
                <p>
                  Staffing Solutions by Sarah Fell, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">2. Information We Collect</h2>
                <p>
                  TODO: Detail types of personal information collected (e.g., name, contact info, resume data).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">3. How We Use Your Information</h2>
                <p>
                  TODO: Detail purposes of data use (e.g., recruitment services, communication, site improvement).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">4. Data Security</h2>
                <p>
                  TODO: Describe measures taken to protect user data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">5. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at sarah@sarahfell.ca.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
