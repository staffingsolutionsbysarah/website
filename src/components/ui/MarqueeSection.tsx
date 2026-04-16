'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const seoPhrases = [
  'Industrial Recruitment Ontario',
  'Skilled Trades Hiring',
  'Direct Hire Placement',
  'Manufacturing Jobs',
  'Less Hiring Drag',
  'Ontario Recruitment',
  'Tighter Shortlists',
  'Contract Staffing',
  'Permanent Placement',
  'GTA Hiring',
  'Executive Search',
  'Operations Hiring',
  'Sector-Specific Search',
  'Payroll Solutions',
  'Direct Recruiter Access',
];

interface MarqueeSectionProps {
  variant?: 'light' | 'dark';
  speed?: number;
}

export function MarqueeSection({ variant = 'light', speed = 30 }: MarqueeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const duplicatedPhrases = [...seoPhrases, ...seoPhrases];

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'bg-[var(--color-dark)]' : 'bg-[var(--color-section)]';
  const textColor = isDark ? 'text-white/80' : 'text-[var(--color-smoked-umber)]';
  const dividerColor = isDark ? 'text-[var(--color-primary)]' : 'text-[var(--color-khaki)]';

  return (
    <div ref={containerRef} className={`${bgColor} overflow-hidden py-4 md:py-5`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{
          willChange: 'transform',
        }}
      >
        {duplicatedPhrases.map((phrase, index) => (
          <div key={`${phrase}-${index}`} className="flex items-center">
            <span
              className={`px-6 text-[13px] font-medium tracking-wide md:px-10 md:text-[14px] ${textColor}`}
            >
              {phrase}
            </span>
            <span className={`text-lg ${dividerColor}`}>·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <div className="bg-[var(--color-parchment-ivory)] py-3">
      <div className="flex items-center justify-center gap-4 overflow-hidden">
        {seoPhrases.slice(0, 4).map((phrase) => (
          <div key={phrase} className="flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              {phrase}
            </span>
            <div className="h-1 w-1 rounded-full bg-[var(--color-khaki)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
