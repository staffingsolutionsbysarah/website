'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { href: '/about', label: 'About Us' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/book-a-call', label: 'Book a Call', cta: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  return (
    <motion.nav
      initial={shouldReduceMotion ? false : { y: -24, opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-black/8 bg-[#FAFAFA]/82 backdrop-blur-xl"
    >
      <div
        className={[
          'mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-all duration-300',
          isScrolled ? 'h-16' : 'h-20',
        ].join(' ')}
      >
        <Link href="/" className="relative flex cursor-pointer flex-col items-start font-heading leading-snug tracking-tight text-[var(--color-dark)]">
          <span className="text-sm font-semibold uppercase tracking-widest">Staffing Solutions by</span>
          <span className="pl-[14px] text-base font-medium italic tracking-normal text-gray-600">Sarah Fell, Inc.</span>
          <span
            className={[
              'absolute -bottom-2 left-0 h-px bg-[linear-gradient(90deg,#C6A64A_0%,rgba(198,166,74,0)_100%)] transition-all duration-300',
              isScrolled ? 'w-20 opacity-100' : 'w-10 opacity-70',
            ].join(' ')}
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href;

            if (item.cta) {
              return (
                <motion.div key={item.href} whileHover={shouldReduceMotion ? undefined : { y: -2 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}>
                  <Link
                    href={item.href}
                    className={[
                      'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition',
                      active
                        ? 'border-[#C6A64A] bg-[#C6A64A] text-[#1F2628] shadow-[0_10px_26px_rgba(198,166,74,0.28)]'
                        : 'border-[#2C3434] bg-[#2C3434] text-white hover:border-[#C6A64A] hover:bg-[#C6A64A] hover:text-[#1F2628]',
                    ].join(' ')}
                  >
                    <span className="relative z-10">Book a Call</span>
                  </Link>
                </motion.div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'relative px-2 pb-1 pt-1 text-sm uppercase tracking-widest transition',
                  active ? 'text-gray-950' : 'text-gray-600 hover:text-gray-900',
                ].join(' ')}
              >
                {item.label}
                <span
                  className={[
                    'absolute bottom-0 left-2 h-[2px] rounded-full bg-[#C6A64A] transition-all duration-300',
                    active ? 'w-[calc(100%-16px)] opacity-100' : 'w-0 opacity-0',
                  ].join(' ')}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
