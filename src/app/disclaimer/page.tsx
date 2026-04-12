'use client';

import { motion } from 'framer-motion';

export default function DisclaimerPage() {
  return (
    <div className="depth-canvas bg-[#FAFAFA] text-[var(--color-dark)] px-6 py-24 md:py-40">
      <div className="mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#C6A64A]">Compliance</p>
          <h1 className="mt-8 text-[3rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]">Recruitment Disclaimer</h1>
          
          <div className="mt-16 space-y-12 text-black/70 leading-relaxed">
            <section>
              <p className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-4">Last Updated: April 12, 2026</p>
              <p>
                The information on this website is provided for general business and recruitment-related purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">1. No Guarantee of Placement, Interview, or Hiring</h2>
              <p>Using this website, submitting a form, or booking a call does not guarantee:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>an interview</li>
                <li>a job offer</li>
                <li>a job placement</li>
                <li>a candidate submission</li>
                <li>a client engagement</li>
                <li>any specific business or recruitment outcome</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">2. No Employment Relationship Created</h2>
              <p>
                Visiting this website, sending an inquiry, booking a call, or submitting information through the website does not create an employment relationship, agency relationship, recruiter-client contract, or candidate representation agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">3. Services and Opportunities May Change</h2>
              <p>
                Any services, opportunities, or recruitment-related information described on this website may change, be revised, be paused, or be removed at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">4. Independent Decisions</h2>
              <p>
                Candidate decisions and hiring decisions remain solely with the individuals, employers, and clients involved. We do not guarantee any particular result.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">5. No Professional Advice</h2>
              <p>
                Nothing on this website constitutes legal advice, employment law advice, HR compliance advice, immigration advice, or other regulated professional advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-[var(--color-dark)] mb-6">6. Third-Party Services and Contact</h2>
              <p>
                This website may rely on third-party tools or platforms, including scheduling or analytics providers. We are not responsible for outages, delays, errors, or privacy practices relating to third-party services.
              </p>
              <p className="mt-4">
                Questions about this Disclaimer may be directed to Staffing Solutions by Sarah Fell Incorporated at{' '}
                <a href="mailto:Sarah.fell@staffingsolutionsbysarah.com" className="underline hover:text-[var(--color-primary)]">Sarah.fell@staffingsolutionsbysarah.com</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
