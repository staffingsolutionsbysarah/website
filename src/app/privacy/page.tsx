'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="depth-canvas bg-[#FAFAFA] text-[var(--color-dark)] px-6 py-24 md:py-40">
      <div className="mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#C6A64A]">Compliance</p>
          <h1 className="mt-8 text-[3rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]">Privacy Policy</h1>
          
          <div className="mt-16 space-y-12 text-black/70 leading-relaxed">
            <section>
              <p className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-4">Effective: April 12, 2026</p>
              <p>
                Staffing Solutions by Sarah Fell Incorporated ("we," "us," "our") respects your privacy and is committed to protecting personal information in accordance with applicable Canadian privacy law, including the Personal Information Protection and Electronic Documents Act (PIPEDA), where applicable.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, disclose, retain, and protect personal information when you use this website, submit a contact form, book a call, or otherwise interact with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">1. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide, including:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>full name</li>
                <li>email address</li>
                <li>phone number</li>
                <li>company name</li>
                <li>job title or hiring details</li>
                <li>information included in your message or inquiry</li>
                <li>booking details you submit through our scheduling flow</li>
              </ul>
              <p className="mt-4">
                If resume submission or candidate application features are added in the future, we may also collect resume or CV information, employment history, qualifications, and other information you choose to submit in connection with a job inquiry or candidate profile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">2. Why We Collect Information</h2>
              <p>We collect and use personal information for purposes reasonably connected to our business, including to:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>respond to inquiries</li>
                <li>schedule calls or meetings</li>
                <li>communicate about recruitment services</li>
                <li>understand hiring needs</li>
                <li>improve website performance and user experience</li>
                <li>maintain internal business records</li>
                <li>comply with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">3. Consent</h2>
              <p>
                By submitting your personal information through this website, you consent to our collection, use, and disclosure of that information for the purposes described in this Privacy Policy.
              </p>
              <p className="mt-4">
                You may withdraw consent at any time, subject to legal or contractual restrictions and reasonable notice. Withdrawal of consent may limit our ability to respond to your request or provide services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">4. Analytics, Cookies, and Tracking</h2>
              <p>
                This website may use analytics tools, including Google Analytics and Vercel Web Analytics, to understand site traffic and improve performance.
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li><strong>Google Analytics</strong> may use cookies or similar technologies to collect information about website usage and visitor interactions.</li>
                <li><strong>Vercel Web Analytics</strong> is described by Vercel as using anonymized data and not using cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">5. Disclosure of Information</h2>
              <p>We do not sell personal information. We may disclose personal information only where reasonably necessary, including to service providers that support hosting, scheduling, analytics, or website operations, or where required by law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">6. Retention and Safeguards</h2>
              <p>
                We retain personal information only for as long as reasonably necessary for the purposes described in this policy and to meet legal, regulatory, or legitimate business requirements.
              </p>
              <p className="mt-4">
                We use reasonable administrative, technical, and organizational safeguards appropriate to the sensitivity of the information, but no method of transmission over the internet or electronic storage is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">7. Access, Corrections, and Third-Party Services</h2>
              <p>
                Subject to applicable law, you may request access to personal information we hold about you and request correction of inaccurate or incomplete information.
              </p>
              <p className="mt-4">
                This website may link to or use third-party tools or platforms, including scheduling services, analytics tools, or other external services. We are not responsible for the privacy practices, content, or availability of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">8. Future Candidate Submissions and Updates</h2>
              <p>
                At present, the website is primarily used for inquiries and booking requests. If resume uploads, candidate profiles, or job application features are expanded later, this policy may be updated to describe those practices in more detail.
              </p>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. Questions about privacy, access, correction, or consent withdrawal should be directed through the website contact path.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
