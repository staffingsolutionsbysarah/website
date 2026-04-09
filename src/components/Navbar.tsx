'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMotionValueEvent, useScroll, AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/about', label: 'About Us' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/book-a-call', label: 'Book a Call', cta: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  return (
    <nav
      className="sticky top-0 z-50 border-b border-black/8 bg-[#FAFAFA]/82 backdrop-blur-xl"
    >
      {/* Main bar */}
      <div
        className={[
          'mx-auto flex max-w-[1200px] items-center justify-between px-4 md:px-6 transition-all duration-300',
          isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20',
        ].join(' ')}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          data-brand-logo
          className="relative flex cursor-pointer flex-row items-center gap-2.5 font-heading leading-snug tracking-tight text-[var(--color-dark)]"
        >
          <Image src="/GreenS-logo.svg" alt="Staffing Solutions by Sarah Fell" width={40} height={40} className="object-contain mix-blend-multiply" />
          <div className="flex flex-col items-start">
            <span className="text-[10px] md:text-sm font-semibold uppercase tracking-widest">Staffing Solutions by</span>
            <span className="relative text-sm md:text-base font-medium italic tracking-normal text-gray-600">
              Sarah Fell, Inc.
              <span
                className={[
                  'absolute -bottom-1 left-0 h-px bg-[linear-gradient(90deg,#C6A64A_0%,rgba(198,166,74,0)_100%)] transition-all duration-300',
                  isScrolled ? 'w-full opacity-100' : 'w-2/3 opacity-70',
                ].join(' ')}
              />
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3 md:gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href;

            if (item.cta) {
              return (
                <Link
                  key={item.href}
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

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden items-center justify-center h-9 w-9 text-[#2C3434]"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/8 bg-[#FAFAFA]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;

                if (item.cta) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'mt-2 flex items-center justify-center rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition',
                        active
                          ? 'border-[#C6A64A] bg-[#C6A64A] text-[#1F2628]'
                          : 'border-[#2C3434] bg-[#2C3434] text-white',
                      ].join(' ')}
                    >
                      Book a Call
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      'px-2 py-3 text-sm uppercase tracking-widest border-b border-black/6 transition',
                      active ? 'text-gray-950' : 'text-gray-600',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
