'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const CONTACT_EMAIL = 'Sarah.fell@staffingsolutionsbysarah.com';

interface FormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  company?: string;
  message?: string;
}

type FormStatus = 'idle' | 'success';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    workEmail: '',
    company: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const subject = `Website inquiry from ${formData.firstName} ${formData.lastName}`;
    const body = [
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.workEmail}`,
      `Company: ${formData.company}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      '',
      formData.message,
    ].join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
    setFormData({
      firstName: '',
      lastName: '',
      workEmail: '',
      company: '',
      phone: '',
      message: '',
    });
  };

  const inputBaseClasses =
    'w-full px-4 py-3 bg-white/80 border border-black/10 rounded-xl text-[#2C3434] placeholder:text-gray-400 focus:outline-none focus:border-[#8B764C] focus:ring-2 focus:ring-[#8B764C]/20 transition-all duration-200';

  const inputErrorClasses = 'border-red-400 focus:border-red-400 focus:ring-red-400/20';

  const labelClasses = 'block text-[10px] font-bold uppercase tracking-[0.15em] text-[#2C3434] mb-2';

  const errorTextClasses = 'text-[11px] text-red-500 mt-1';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="depth-plane p-10 md:p-14 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B764C]/20 mb-6"
        >
          <CheckCircle className="w-8 h-8 text-[#8B764C]" />
        </motion.div>
        <h3 className="font-heading text-2xl md:text-3xl text-[#2C3434] mb-3">
          Email Draft Opened
        </h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Review the email draft in your mail app and send it when ready. Sarah will respond directly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="depth-plane p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="firstName" className={labelClasses}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`${inputBaseClasses} ${errors.firstName ? inputErrorClasses : ''}`}
            placeholder="Jane"
          />
          <AnimatePresence>
            {errors.firstName && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={errorTextClasses}
              >
                {errors.firstName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="lastName" className={labelClasses}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`${inputBaseClasses} ${errors.lastName ? inputErrorClasses : ''}`}
            placeholder="Smith"
          />
          <AnimatePresence>
            {errors.lastName && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={errorTextClasses}
              >
                {errors.lastName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="workEmail" className={labelClasses}>
          Work Email
        </label>
        <input
          type="email"
          id="workEmail"
          name="workEmail"
          value={formData.workEmail}
          onChange={handleChange}
          className={`${inputBaseClasses} ${errors.workEmail ? inputErrorClasses : ''}`}
          placeholder="jane@company.com"
        />
        <AnimatePresence>
          {errors.workEmail && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={errorTextClasses}
            >
              {errors.workEmail}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`${inputBaseClasses} ${errors.company ? inputErrorClasses : ''}`}
            placeholder="Acme Corp"
          />
          <AnimatePresence>
            {errors.company && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={errorTextClasses}
              >
                {errors.company}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputBaseClasses}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`${inputBaseClasses} resize-none ${errors.message ? inputErrorClasses : ''}`}
          placeholder="Tell us about your hiring needs or how we can help..."
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={errorTextClasses}
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full"
      >
        <Send className="w-4 h-4" />
        Open Email Draft
      </motion.button>
    </form>
  );
}
