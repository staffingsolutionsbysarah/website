'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  roleTitle: string;
  roleType: string;
  timeline: string;
  budget: string;
  roleDescription: string;
  hiringNeeds: string;
}

const initialFormData: FormData = {
  companyName: '',
  contactName: '',
  workEmail: '',
  phone: '',
  roleTitle: '',
  roleType: '',
  timeline: '',
  budget: '',
  roleDescription: '',
  hiringNeeds: '',
};

export default function TalentRequestForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/talent-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Submission failed. Please try again.');
      }

      setFormState('success');
      setFormData(initialFormData);
    } catch (err) {
      setFormState('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="depth-plane rounded-[32px] p-8 md:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
            <CheckCircle2 className="h-7 w-7 text-[var(--color-accent)]" />
          </div>
          <h3 className="mt-6 text-[1.8rem] leading-tight tracking-[-0.03em]">
            Request received
          </h3>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-black/64">
            Thank you for your talent profile request. Sarah will review your requirements and respond within 1-2 business days.
          </p>
          <button
            onClick={() => setFormState('idle')}
            className="btn-secondary mt-8"
          >
            Submit another request
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="depth-plane overflow-hidden rounded-[32px]"
    >
      <div className="bg-white p-8 md:p-10">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
            Talent Profile Request
          </p>
          <h2 className="mt-3 text-[1.6rem] leading-tight tracking-[-0.02em] md:text-[1.8rem]">
            Tell us about your hiring need
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-black/58">
            Complete the form below and Sarah will follow up with the right next step for your requirement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Company Name <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Your organization"
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contactName" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Contact Name <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="workEmail" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Work Email <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleChange}
              required
              placeholder="you@company.com"
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="roleTitle" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Role Title <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              type="text"
              id="roleTitle"
              name="roleTitle"
              value={formData.roleTitle}
              onChange={handleChange}
              required
              placeholder="Position you are hiring for"
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="roleType" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Role Type <span className="text-[var(--color-primary)]">*</span>
            </label>
            <select
              id="roleType"
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              required
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            >
              <option value="">Select type</option>
              <option value="full-time">Full-time</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="timeline" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Timeline <span className="text-[var(--color-primary)]">*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            >
              <option value="">Select timeline</option>
              <option value="immediate">Immediate</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="1-month">1 month</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
              Budget Range <span className="text-black/32">(optional)</span>
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., $60-80k or competitive"
              className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <label htmlFor="roleDescription" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
            Role Description <span className="text-[var(--color-primary)]">*</span>
          </label>
          <textarea
            id="roleDescription"
            name="roleDescription"
            value={formData.roleDescription}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Key responsibilities, requirements, and what makes this role unique"
            className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] resize-none"
          />
        </div>

        <div className="mt-6 space-y-2">
          <label htmlFor="hiringNeeds" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/52">
            Additional Hiring Context <span className="text-[var(--color-primary)]">*</span>
          </label>
          <textarea
            id="hiringNeeds"
            name="hiringNeeds"
            value={formData.hiringNeeds}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Location, schedule, why the role is open, reporting structure, or anything else relevant"
            className="w-full rounded-[14px] border border-black/10 bg-[var(--color-section-soft)] px-4 py-3 text-sm transition-colors placeholder:text-black/32 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] resize-none"
          />
        </div>

        {formState === 'error' && (
          <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-black/38">
            <span className="text-[var(--color-primary)]">*</span> Required fields
          </p>
          <button
            type="submit"
            disabled={formState === 'loading'}
            className="btn-primary min-w-[160px]"
          >
            {formState === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
