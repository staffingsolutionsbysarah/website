import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import IntroOverlay from '../components/IntroOverlay';

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
  title: 'Ontario Manufacturing & Skilled Trades Recruiter | Staffing Solutions by Sarah Fell',
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
      <body
        className={`${cormorant.variable} ${manrope.variable} font-body flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-dark)] antialiased`}
      >
        <IntroOverlay />
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
