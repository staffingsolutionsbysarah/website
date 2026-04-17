'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMotionValueEvent, useScroll, AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const leftNavItems = [
  { href: '/hire-talent', label: 'Hire Talent' },
  { href: '/find-work', label: 'Find Work' },
  { href: '/services', label: 'Services' },
];

const rightNavItems = [
  { href: '/industries', label: 'Industries' },
  { href: '/locations', label: 'Locations' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > window.innerHeight - 80);
  });

  const isHome = pathname === '/';
  const textClass = isScrolled ? 'text-charcoal' : 'text-white';
  const useLightBg = !isScrolled && isHome;

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-[100] px-4 md:px-10 py-4 md:py-6 flex justify-between items-center transition-all duration-500',
        isScrolled ? 'bg-parchment text-charcoal shadow-sm' : 'bg-transparent text-white'
      ].join(' ')}
    >
      {/* Left Nav */}
      <div className="flex space-x-4 md:space-x-6 items-center flex-1">
        {leftNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'nav-link hidden sm:block text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300',
              useLightBg ? 'text-white hover:text-white/80' : 'text-charcoal hover:text-brand-green'
            ].join(' ')}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Logo - Centered */}
      <div
        className="flex-shrink-0 text-center flex-1 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center">
          <span className={[
            'font-serif font-bold text-sm md:text-xl tracking-tighter uppercase leading-none transition-colors duration-500',
            useLightBg ? 'text-white' : 'text-charcoal'
          ].join(' ')}>
            Staffing Solutions
          </span>
          <span className={[
            'text-[6px] md:text-[8px] uppercase tracking-[0.3em] mt-0.5 md:mt-1 transition-colors duration-500',
            useLightBg ? 'text-white/60' : 'text-gold'
          ].join(' ')}>
            by Sarah Fell, Inc.
          </span>
        </div>
      </div>

      {/* Right Nav */}
      <div className="flex items-center space-x-4 md:space-x-6 justify-end flex-1">
        {rightNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'nav-link hidden lg:block text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300',
              useLightBg ? 'text-white hover:text-white/80' : 'text-charcoal hover:text-brand-green'
            ].join(' ')}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={() => window.location.href = '/book-a-call'}
          className={[
            'px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all',
            useLightBg
              ? 'bg-white text-charcoal hover:bg-gold hover:text-white'
              : 'bg-charcoal text-white hover:bg-gold hover:text-charcoal'
          ].join(' ')}
        >
          Book a Call
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        className={[
          'flex lg:hidden items-center justify-center h-10 w-10 rounded-full transition-colors ml-2',
          useLightBg ? 'text-white hover:bg-white/10' : 'text-charcoal hover:bg-black/5'
        ].join(' ')}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 overflow-hidden bg-parchment shadow-xl lg:hidden border-b border-charcoal/5"
          >
            <div className="flex flex-col p-6 gap-3">
              {[...leftNavItems, ...rightNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] font-bold uppercase tracking-[0.15em] transition-colors text-charcoal hover:text-brand-green border-b border-charcoal/5 pb-3 last:border-0 last:pb-0"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { window.location.href = '/book-a-call'; setMobileOpen(false); }}
                className="mt-3 rounded-xl bg-charcoal p-4 text-center text-white font-bold uppercase tracking-widest text-xs"
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
