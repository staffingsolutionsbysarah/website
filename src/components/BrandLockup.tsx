'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

type BrandLockupProps = {
  compact?: boolean;
  className?: string;
};

export default function BrandLockup({ compact = false, className = '' }: BrandLockupProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={['relative flex items-center', className].join(' ').trim()}>
      <div className="relative flex shrink-0 items-center justify-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18, y: 5, scale: 1.18, filter: 'blur(8px)' }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={shouldReduceMotion ? undefined : { duration: 0.86, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
          className={[
            'relative rounded-[14px] bg-[rgba(255,252,246,0.66)] shadow-[0_8px_18px_rgba(44,52,52,0.04)]',
            compact ? 'pl-8 pr-3.5 py-2 md:pl-9 md:pr-4 md:py-2.5' : 'pl-9 pr-4 py-2.5 md:pl-10 md:pr-4.5 md:py-3',
          ].join(' ')}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 14, scale: 1.22, rotate: -6, filter: 'blur(10px)' }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            transition={shouldReduceMotion ? undefined : { duration: 0.92, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            data-brand-logo
            className={[
              'absolute left-1 top-1/2 -translate-y-1/2',
              compact ? 'h-[38px] w-[21px] md:h-[42px] md:w-[23px]' : 'h-[42px] w-[23px] md:h-[48px] md:w-[26px]',
            ].join(' ')}
          >
            <Image
              src="/brand/sarah-crest-thin-charcoal.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 21px, 24px"
              className="object-contain"
            />
          </motion.div>

          <div className="relative flex flex-col items-start text-[var(--color-dark)] leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#5B6363] md:text-[11px]">
              Staffing Solutions
            </span>
            <span className="mt-0.5 pl-[2px] text-[11px] font-medium tracking-[0.08em] text-[#5B6363] md:text-[12px]">
              by Sarah Fell, Inc.
            </span>
            <motion.span
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { width: 0, opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { width: compact ? 86 : 102, opacity: compact ? 0.82 : 1 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
              className="mt-1.5 h-px rounded-full bg-[linear-gradient(90deg,#C6A64A_0%,rgba(198,166,74,0)_100%)]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
