'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import Preloader from '../components/home/Preloader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [loading, setLoading] = useState(() => {
    // Only ever run preloader on home page — other routes skip immediately
    if (typeof window === 'undefined') return false;
    if (!isHome) return false;
    return !sessionStorage.getItem('preloader-seen');
  });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Non-home routes: ensure content is always visible
    if (!isHome) {
      setLoading(false);
    }
  }, [isHome]);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader-seen', 'true');
    setLoading(false);
    if (contentRef.current) {
      gsap.to(contentRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' });
    }
  };

  return (
    <>
      {isHome && loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        ref={contentRef}
        className="contents"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </div>
    </>
  );
}
