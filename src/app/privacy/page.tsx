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
              <p className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-4">Effective: April 16, 2026</p>
              <p>
                Staffing Solutions by Sarah Fell Incorporated ("we," "us," "our") respects your privacy and is committed to protecting personal information in accordance with applicable Canadian privacy law, including the Personal Information Protection and Electronic Documents Act (PIPEDA), where applicable.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, disclose, retain, and protect personal information when you use this website, submit a form, book a call, or otherwise interact with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">1. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide, depending on how you interact with us:</p>

              <p className="mt-4 font-semibold text-black/70">Contact and Inquiry Forms</p>
              <ul className="mt-2 list-disc pl-6 space-y-2">
                <li>first and last name</li>
                <li>work email address</li>
                <li>phone number (optional)</li>
                <li>company or organization name</li>
                <li>message or inquiry content</li>
              </ul>

              <p className="mt-6 font-semibold text-black/70">Resume / Candidate Submission</p>
              <ul className="mt-2 list-disc pl-6 space-y-2">
                <li>first and last name</li>
                <li>email address</li>
                <li>phone number (optional)</li>
                <li>location</li>
                <li>LinkedIn profile URL (optional)</li>
                <li>target role or position type</li>
                <li>resume file (PDF, DOC, or DOCX — maximum 5 MB)</li>
                <li>additional notes or context (optional)</li>
              </ul>

              <p className="mt-6 font-semibold text-black/70">Talent / Hiring Request Forms</p>
              <ul className="mt-2 list-disc pl-6 space-y-2">
                <li>company name</li>
                <li>contact name</li>
                <li>work email address</li>
                <li>phone number (optional)</li>
                <li>role title, type (full-time, contract, temporary), and timeline</li>
                <li>budget range (optional)</li>
                <li>role description and additional hiring context</li>
              </ul>

              <p className="mt-6 font-semibold text-black/70">Booking / Scheduling</p>
              <ul className="mt-2 list-disc pl-6 space-y-2">
                <li>name and email of booking participants</li>
                <li>event type, date, and time</li>
                <li>meeting or video call link (if applicable)</li>
              </ul>
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
              <p className="mt-4">The third-party services we use to process form submissions and bookings include:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li><strong>PocketBase</strong> — a self-hosted database used to store contact inquiries, candidate submissions, talent requests, and booking records. The database is administered by Staffing Solutions by Sarah Fell and hosted on infrastructure controlled by the business owner.</li>
                <li><strong>Make.com</strong> — an automation platform used to route submitted form data to internal workflows (such as notifications, CRM entries, or internal tracking). Data passed through Make.com is processed transiently and not retained long-term by the platform beyond what is needed to execute the workflow.</li>
                <li><strong>Cal.com</strong> — a scheduling platform used to manage booking appointments. Booking data is subject to Cal.com's own privacy policy and terms of service. We receive booking event notifications via a secure webhook when appointments are created or updated.</li>
                <li><strong>Vercel</strong> — the hosting platform for this website. Vercel may process minimal operational data as part of delivering the site.</li>
              </ul>
              <p className="mt-4">
                We take reasonable steps to ensure that any third-party service provider we share data with handles personal information in a manner consistent with this policy, but we are not responsible for the privacy practices of third-party platforms beyond our direct arrangements with them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">6. File Uploads</h2>
              <p>
                If you submit a resume or other document through this website, the following applies:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Accepted file formats: PDF, DOC, DOCX only.</li>
                <li>Maximum file size: 5 MB per submission.</li>
                <li>Files are transmitted securely and stored in our database (PocketBase).</li>
                <li>Files are retained only for the duration described in the Retention section below.</li>
                <li>Do not submit sensitive personal information beyond what is reasonably needed for a recruitment inquiry (e.g., avoid including government ID numbers, banking details, or health information in resume files).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">7. Retention and Safeguards</h2>
              <p>
                We retain personal information only for as long as reasonably necessary for the purposes described in this policy and to meet legal, regulatory, or legitimate business requirements. Specific retention periods:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li><strong>Contact inquiries:</strong> retained for up to 2 years from date of submission, unless a business relationship is established, in which case records may be kept for the duration of that relationship plus 2 years.</li>
                <li><strong>Candidate / resume submissions:</strong> retained for up to 1 year from date of submission, unless you request earlier deletion or a placement is made, in which case records may be retained longer as part of our placement documentation.</li>
                <li><strong>Talent / hiring requests:</strong> retained for up to 2 years from date of submission.</li>
                <li><strong>Booking records:</strong> retained for up to 1 year following the scheduled event.</li>
              </ul>
              <p className="mt-4">
                We use reasonable administrative, technical, and organizational safeguards appropriate to the sensitivity of the information, including secure storage (PocketBase with controlled access), webhook signature verification for automated data feeds, and encrypted transmission for form submissions. No method of transmission over the internet or electronic storage is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">8. Access, Corrections, and Your Rights</h2>
              <p>
                Subject to applicable law, you may request access to personal information we hold about you and request correction of inaccurate or incomplete information.
              </p>
              <p className="mt-4">
                This website may link to or use third-party tools or platforms, including scheduling services, analytics tools, or other external services. We are not responsible for the privacy practices, content, or availability of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">9. Policy Updates</h2>
              <p>
                Candidate submission features are now active on this website. This policy describes those current practices. Additional features or changes to data collection will be reflected in updates to this policy.
              </p>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. For privacy questions, access requests, correction requests, or consent withdrawal, contact Staffing Solutions by Sarah Fell Incorporated at{' '}
                <a href="mailto:Sarah.fell@staffingsolutionsbysarah.com" className="underline hover:text-[var(--color-primary)]">Sarah.fell@staffingsolutionsbysarah.com</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
