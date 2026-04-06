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
  title: 'Staffing Solutions by Sarah Fell, Inc. | Skilled Trades Recruitment',
  description: 'Fast, conversion-focused skilled trades and manufacturing recruitment in Canada. Connecting top talent with top employers.',
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
