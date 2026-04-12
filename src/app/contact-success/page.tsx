'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactSuccessPage() {
  return (
    <div className="depth-canvas bg-[var(--color-bg)] text-[var(--color-dark)] min-h-[80vh] flex items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(circle_at_top,rgba(198,166,74,0.12),transparent_40%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="depth-plane p-10 md:p-16 max-w-[600px] text-center relative z-10"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E7D08A]/20 text-[#A8872F] mb-8">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <h1 className="text-4xl font-medium tracking-tight mb-6">Message Sent.</h1>
        <p className="text-lg text-black/60 leading-relaxed mb-10">
          Thank you for reaching out. We have received your inquiry and Sarah will review it shortly. You can expect a response within 24 business hours.
        </p>
        
        <div className="editorial-rule mb-10" />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/about" className="btn-secondary">
            About Sarah
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
