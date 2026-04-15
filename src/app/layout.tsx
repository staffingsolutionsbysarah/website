import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import '../styles/colors.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import CursorEffect from '../components/home/CursorEffect';
import ParallaxBackground from '../components/home/ParallaxBackground';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['500', '600', '700'],
});
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Staffing Solutions by Sarah Fell',
    default: 'Ontario Industrial & Trades Recruiter | Staffing Solutions by Sarah Fell',
  },
  description:
    'Ontario recruiter for manufacturing, skilled trades, operations, and industrial hiring. Reduce hiring drag with direct recruiter access, sharper screening, and stronger shortlist fit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
      </head>
      <body
        className={`${cormorant.variable} ${manrope.variable} font-body flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-dark)] antialiased`}
      >
        <CursorEffect />
        <SmoothScrollProvider>
          <ParallaxBackground />
          <Navbar />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
