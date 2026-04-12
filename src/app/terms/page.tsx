'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="depth-canvas bg-[#FAFAFA] text-[var(--color-dark)] px-6 py-24 md:py-40">
      <div className="mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#C6A64A]">Compliance</p>
          <h1 className="mt-8 text-[3rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]">Terms of Use</h1>
          
          <div className="mt-16 space-y-12 text-black/70 leading-relaxed">
            <section>
              <p className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-4">Last Updated: April 12, 2026</p>
              <p>
                By accessing or using this website, you agree to these Terms of Use. If you do not agree, do not use the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">1. Website Purpose</h2>
              <p>This website is provided for general information about Staffing Solutions by Sarah Fell Incorporated and its services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">2. No Reliance</h2>
              <p>
                The content on this website is provided for general informational purposes only. While we aim to keep information reasonably accurate and current, we do not guarantee that all content, service descriptions, availability, or other website information will always be complete, current, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">3. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>use the website for unlawful, fraudulent, or harmful purposes</li>
                <li>interfere with the website's operation, availability, or security</li>
                <li>submit false, misleading, or unauthorized information</li>
                <li>attempt unauthorized access to any part of the website or its systems</li>
                <li>copy, scrape, reproduce, or republish site materials without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">4. Intellectual Property</h2>
              <p>
                Unless otherwise stated, all content on this website, including text, branding, graphics, design elements, layout, and other materials, is owned by or licensed to Staffing Solutions by Sarah Fell Incorporated and is protected by applicable intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">5. No Warranties</h2>
              <p>
                This website is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, representations, and conditions, express or implied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">6. Third-Party Links and Limitation of Liability</h2>
              <p>
                This website may contain links to third-party websites, services, or tools. We do not control and are not responsible for their content, privacy practices, terms, or availability.
              </p>
              <p className="mt-4">
                To the fullest extent permitted by law, Staffing Solutions by Sarah Fell Incorporated will not be liable for any loss, damage, cost, or claim arising from or related to your use of, inability to use, or reliance on this website or its content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">7. Changes and Governing Law</h2>
              <p>
                We may update these Terms of Use at any time by posting the revised version on this page. Continued use of the website after changes are posted means you accept the updated terms.
              </p>
              <p className="mt-4">
                These Terms of Use are governed by the laws of the Province of Ontario and the laws of Canada applicable therein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">8. Contact</h2>
              <p>
                Questions about these Terms of Use may be directed to Staffing Solutions by Sarah Fell Incorporated through the website contact path.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
