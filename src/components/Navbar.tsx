'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMotionValueEvent, useScroll, AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const leftNavItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

const rightNavItems = [
  { href: '/jobs', label: 'Jobs' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Trigger at 60px — snappy, not annoying
    setIsScrolled(latest > 60);
  });

  const isHome = pathname === '/';
  // On non-home pages: always show solid dark bg (no floating transparent nav)
  const solidBg = isScrolled || !isHome;

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-[100] px-4 md:px-10 py-3 md:py-5 flex justify-between items-center transition-all duration-500',
        solidBg
          ? 'bg-[#2C3434]/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* Left Nav */}
      <div className="flex space-x-4 md:space-x-6 items-center flex-1">
        {leftNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link hidden sm:block text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 text-white/70 hover:text-[#AB9D82]"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Logo - Centered */}
      <Link href="/" className="flex-shrink-0 text-center flex-1">
        <div className="flex flex-col items-center">
          <span className="font-serif font-bold text-sm md:text-xl tracking-tighter uppercase leading-none text-white transition-colors duration-500">
            Staffing Solutions
          </span>
          <span className="text-[6px] md:text-[8px] uppercase tracking-[0.3em] mt-0.5 md:mt-1 text-[#AB9D82] transition-colors duration-500">
            by Sarah Fell, Inc.
          </span>
        </div>
      </Link>

      {/* Right Nav */}
      <div className="flex items-center space-x-4 md:space-x-6 justify-end flex-1">
        {rightNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link hidden lg:block text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 text-white/70 hover:text-[#AB9D82]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/book-a-call"
          className="hidden sm:inline-flex items-center px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[8px] md:text-[9px] uppercase tracking-widest font-bold transition-all duration-200 border border-[#8B764C]/60 text-[#AB9D82] hover:bg-[#8B764C] hover:border-[#8B764C] hover:text-white active:scale-[0.97]"
        >
          Book a Call
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="flex lg:hidden items-center justify-center h-9 w-9 rounded-full transition-colors ml-2 text-white/80 hover:bg-white/10"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#2C3434] shadow-xl lg:hidden border-t border-white/8"
          >
            <div className="flex flex-col p-6 gap-3">
              {[...leftNavItems, ...rightNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] font-bold uppercase tracking-[0.15em] transition-colors text-white/70 hover:text-[#AB9D82] border-b border-white/8 pb-3 last:border-0 last:pb-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/book-a-call"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-xl bg-[#8B764C] p-4 text-center text-white font-bold uppercase tracking-widest text-xs hover:bg-[#714E3C] transition-colors active:scale-[0.97]"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
