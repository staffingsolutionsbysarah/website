'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import Preloader from '../components/home/Preloader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('preloader-seen');
    if (hasSeenPreloader) {
      setLoading(false);
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1 });
      }
    }
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    if (contentRef.current) {
      gsap.to(contentRef.current, { opacity: 1, duration: 1.5, ease: 'power2.out' });
    }
  };

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        ref={contentRef}
        className="contents"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow bg-parchment">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </div>
    </>
  );
}
