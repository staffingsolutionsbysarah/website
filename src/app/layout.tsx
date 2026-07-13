import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import '../styles/colors.css';
import ClientLayout from './ClientLayout';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
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
  icons: {
    icon: '/vectors/sf-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cal.com" />
        <Script src="https://assets.cal.com/embed/embed.js" strategy="lazyOnload" />
      </head>
      <body
        className={`${cormorant.variable} ${manrope.variable} font-body flex min-h-screen flex-col bg-[#2C3434] text-[var(--color-dark)] antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
