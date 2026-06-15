'use client';

import { useState, useRef, type FormEvent, type ChangeEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Upload, FileText, X } from 'lucide-react';

const CONTACT_EMAIL = 'Sarah.fell@staffingsolutionsbysarah.com';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ['.pdf', '.doc', '.docx'];

type FormState = 'idle' | 'success' | 'error';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  resumeUrl: string;
  targetRole: string;
  notes: string;
}

export default function ResumeForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    resumeUrl: '',
    targetRole: '',
    notes: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (!file) return;

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_TYPES.includes(fileExtension)) {
      setFileError('Please upload a PDF, DOC, or DOCX file.');
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be under 5MB.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setFormData((prev) => ({ ...prev, resumeUrl: file.name }));
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFormData((prev) => ({ ...prev, resumeUrl: '' }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedFile) {
      setFormState('error');
      setErrorMessage('Attach a resume before opening the email draft.');
      return;
    }

    const subject = `Resume submission from ${formData.firstName} ${formData.lastName}`;
    const body = [
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Location: ${formData.location}`,
      `Target Role: ${formData.targetRole}`,
      `LinkedIn: ${formData.linkedinUrl || 'Not provided'}`,
      `Resume file to attach: ${selectedFile.name}`,
      '',
      `Notes: ${formData.notes || 'None provided'}`,
      '',
      'Please attach the selected resume file before sending this email.',
    ].join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormState('success');
  };

  if (formState === 'success') {
    return (
      <div className="depth-plane rounded-[32px] bg-white p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
            <CheckCircle2 className="h-8 w-8 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Email Draft Opened</h2>
          <p className="mt-4 max-w-[42ch] text-base text-black/66">
            Review the email draft, attach your resume file, and send it when ready. Sarah will respond directly if there is a fit.
          </p>
          <Link href="/submit-resume" className="btn-primary mt-8">
            Submit Another
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="depth-plane rounded-[32px] bg-white p-8 md:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
        Candidate Intake
      </p>
      <p className="mt-3 text-sm text-black/60">All fields required unless marked optional.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            Phone <span className="text-black/40">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            placeholder="e.g. Hamilton, Ontario"
            value={formData.location}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="targetRole" className="form-label">
            Target Role
          </label>
          <select
            id="targetRole"
            name="targetRole"
            required
            value={formData.targetRole}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">Select a role type</option>
            <option value="Industrial Labourer">Industrial Labourer</option>
            <option value="Machine Operator">Machine Operator</option>
            <option value="Warehouse Associate">Warehouse Associate</option>
            <option value="Forklift Operator">Forklift Operator</option>
            <option value="Welder">Welder</option>
            <option value="Electrician">Electrician</option>
            <option value="Millwright">Millwright</option>
            <option value="Production Supervisor">Production Supervisor</option>
            <option value="Quality Control">Quality Control</option>
            <option value="Maintenance Technician">Maintenance Technician</option>
            <option value="Shipping & Receiving">Shipping & Receiving</option>
            <option value="General Labour">General Labour</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="linkedinUrl" className="form-label">
            LinkedIn URL <span className="text-black/40">(optional)</span>
          </label>
          <input
            type="url"
            id="linkedinUrl"
            name="linkedinUrl"
            placeholder="https://linkedin.com/in/your-profile"
            value={formData.linkedinUrl}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="md:col-span-2">
          <label className="form-label">Resume Upload</label>
          <div
            className={`relative rounded-[20px] border-2 border-dashed p-6 transition-colors ${
              selectedFile
                ? 'border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5'
                : 'border-black/12 hover:border-black/20'
            }`}
          >
            {selectedFile ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[var(--color-accent)]" />
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-black/50">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-full p-1 text-black/40 transition-colors hover:bg-black/5 hover:text-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
                  <Upload className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Drop your resume here or{' '}
                    <span className="text-[var(--color-accent)]">browse</span>
                  </p>
                  <p className="mt-1 text-xs text-black/40">PDF, DOC, or DOCX up to 5MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>
            )}
          </div>
          {fileError && (
            <p className="mt-2 flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {fileError}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className="form-label">
            Additional Notes <span className="text-black/40">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Years of experience, certifications, shift preferences, or anything else relevant..."
            value={formData.notes}
            onChange={handleInputChange}
            className="form-input resize-none"
          />
        </div>
      </div>

      {formState === 'error' && (
        <div className="mt-6 flex items-center gap-3 rounded-[20px] bg-red-50 px-5 py-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs text-black/40">
          By submitting, you agree to be contacted about relevant opportunities.
        </p>
        <button
          type="submit"
          disabled={!selectedFile}
          className="btn-primary min-w-[160px]"
        >
          Open Email Draft
        </button>
      </div>

      <style jsx>{`
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-dark);
        }
        .form-input {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(44, 52, 52, 0.12);
          background: rgba(255, 255, 255, 0.8);
          padding: 0.875rem 1rem;
          font-size: 0.9375rem;
          color: var(--color-dark);
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(75, 99, 94, 0.1);
        }
        .form-input::placeholder {
          color: rgba(44, 52, 52, 0.35);
        }
        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232C3434' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
      `}</style>
    </form>
  );
}
