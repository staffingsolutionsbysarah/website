'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileCheck, ArrowRight, Search } from 'lucide-react';

export default function ResumeSubmissionSuccessPage() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)] min-h-[80vh] flex items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(circle_at_top,rgba(75,99,94,0.12),transparent_40%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="depth-plane p-10 md:p-16 max-w-[600px] text-center relative z-10"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E7D08A]/20 text-[#A8872F] mb-8">
          <FileCheck className="h-10 w-10" />
        </div>
        
        <h1 className="text-4xl font-medium tracking-tight mb-6">Resume Submitted.</h1>
        <p className="text-lg text-black/60 leading-relaxed mb-10">
          Your profile has been added to our confidential candidate network. Sarah and her team will reach out if your experience aligns with any active or upcoming searches.
        </p>
        
        <div className="editorial-rule mb-10" />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jobs" className="btn-primary">
            <Search className="h-4 w-4" />
            Browse Open Jobs
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
