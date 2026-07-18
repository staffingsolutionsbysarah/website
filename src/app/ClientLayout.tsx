'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
