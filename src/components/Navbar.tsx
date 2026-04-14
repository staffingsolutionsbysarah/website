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
          ? 'border-b border-white/10 bg-[#1C312A]/95 backdrop-blur-2xl shadow-sm'
          : isHome
            ? 'border-transparent bg-transparent shadow-none backdrop-blur-none'
            : 'border-b border-white/10 bg-[#1C312A]/90 backdrop-blur-md',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 md:px-6 h-16 md:h-20 transition-all duration-500">
        {/* Logo Lockup */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="group relative flex items-center gap-3"
        >
          <div className="relative h-10 w-[26px] md:h-11 md:w-[28px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo-mark.svg"
              alt="Staffing Solutions by Sarah Fell logo mark"
              fill
              className="object-contain transition-all duration-500 brightness-0 invert"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] leading-none text-white transition-colors duration-500">
              Staffing Solutions
            </span>
            <span className="mt-1 text-xs md:text-sm font-medium italic tracking-tight leading-none text-white/70 transition-colors duration-500">
              by Sarah Fell, Inc.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href;

            if (item.cta) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'inline-flex items-center rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300',
                    active
                      ? 'bg-[#C6A64A] text-[#1F2628]'
                      : 'bg-white text-[#1C312A] hover:bg-[#C6A64A] hover:text-[#1F2628]',
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
                  active ? 'text-[#E7D08A]' : 'text-white/70 hover:text-white',
                ].join(' ')}
              >
                {item.label}
                <span className={[
                  'absolute -bottom-1 left-0 h-[1.5px] bg-[#E7D08A] transition-all duration-300',
                  active ? 'w-full opacity-100' : 'w-0 opacity-0',
                ].join(' ')} />
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex lg:hidden items-center justify-center h-10 w-10 rounded-full text-white transition-colors hover:bg-white/10"
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
            className="absolute inset-x-0 top-full overflow-hidden border-b border-white/10 bg-[#1C312A] shadow-xl lg:hidden"
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
                      ? 'mt-2 rounded-xl bg-white p-4 text-center text-[#1C312A] active:bg-[#C6A64A]'
                      : 'border-b border-white/10 pb-4 text-white/70 active:text-white'
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
