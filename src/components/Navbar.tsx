'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMotionValueEvent, useScroll, AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/hire-talent', label: 'Hire Talent' },
  { href: '/find-work', label: 'Find Work' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/locations', label: 'Locations' },
  { href: '/about', label: 'About' },
  { href: '/book-a-call', label: 'Book a Call', cta: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  const isHome = pathname === '/';

  return (
    <nav
      className={[
        'sticky top-0 z-50 transition-all duration-500',
        isScrolled
          ? 'border-b border-black/5 bg-white/95 backdrop-blur-2xl shadow-sm'
          : isHome
            ? 'border-transparent bg-transparent shadow-none backdrop-blur-none'
            : 'border-b border-black/5 bg-[#FAFAFA]/90 backdrop-blur-md',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 h-16 md:h-20 transition-all duration-500">
        {/* Logo Lockup */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="group relative flex items-center gap-3"
        >
          <div className="relative h-12 w-[32px] md:h-12 md:w-[32px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo-mark.svg"
              alt="Staffing Solutions by Sarah Fell logo mark"
              fill
              className={`object-contain transition-all duration-500 ${!isScrolled && isHome ? 'brightness-0 invert' : ''}`}
            />
          </div>
          <div className="flex flex-col">
            <span className={[
              'text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] leading-none transition-colors duration-500',
              !isScrolled && isHome ? 'text-white' : 'text-[#2C3434]'
            ].join(' ')}>
              Staffing Solutions
            </span>
            <span className={[
              'mt-1 text-xs md:text-sm font-medium italic tracking-tight leading-none transition-colors duration-500',
              !isScrolled && isHome ? 'text-white/80' : 'text-gray-500'
            ].join(' ')}>
              by Sarah Fell, Inc.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const useLightText = !isScrolled && isHome;

            if (item.cta) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'inline-flex items-center rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300',
                    active
                      ? 'bg-[#C6A64A] text-[#1F2628]'
                      : useLightText
                        ? 'bg-white text-[#2C3434] hover:bg-[#C6A64A] hover:text-[#1F2628]'
                        : 'bg-[#2C3434] text-white hover:bg-[#C6A64A]'
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'relative text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300',
                  active
                    ? useLightText ? 'text-[#E7D08A]' : 'text-[#2C3434]'
                    : useLightText ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-[#2C3434]',
                ].join(' ')}
              >
                {item.label}
                <span className={[
                  'absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300',
                  active ? 'w-full opacity-100' : 'w-0 opacity-0',
                  useLightText ? 'bg-[#E7D08A]' : 'bg-[#C6A64A]'
                ].join(' ')} />
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className={[
            'flex lg:hidden items-center justify-center h-10 w-10 rounded-full transition-colors',
            !isScrolled && isHome ? 'text-white hover:bg-white/10' : 'text-[#2C3434] hover:bg-black/5'
          ].join(' ')}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-black/5 bg-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'text-[11px] font-bold uppercase tracking-[0.15em] transition-colors',
                    item.cta
                      ? 'mt-2 rounded-xl bg-[#2C3434] p-4 text-center text-white active:bg-[#C6A64A]'
                      : 'border-b border-black/5 pb-4 text-gray-600 active:text-[#2C3434]'
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
