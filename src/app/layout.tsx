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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://sarah-fell-website-vercel-clone.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Staffing Solutions by Sarah Fell',
    default: 'Ontario Industrial & Trades Recruiter | Staffing Solutions by Sarah Fell',
  },
  description:
    'Ontario recruiter for manufacturing, skilled trades, operations, and industrial hiring. Reduce hiring drag with direct recruiter access, sharper screening, and stronger shortlist fit.',
  icons: {
    icon: '/vectors/sf-favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Staffing Solutions by Sarah Fell',
    url: siteUrl,
    title: 'Ontario Industrial & Trades Recruiter | Staffing Solutions by Sarah Fell',
    description:
      'Direct recruiter access for Ontario employers hiring across manufacturing, skilled trades, operations, and construction.',
    images: [
      {
        url: '/images/hero-ontario-toronto-skyline.webp',
        width: 1600,
        height: 1067,
        alt: 'Staffing Solutions by Sarah Fell, Ontario industrial recruitment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ontario Industrial & Trades Recruiter | Staffing Solutions by Sarah Fell',
    description:
      'Direct recruiter access for Ontario employers hiring across manufacturing, skilled trades, operations, and construction.',
    images: ['/images/hero-ontario-toronto-skyline.webp'],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: 'Staffing Solutions by Sarah Fell',
    url: siteUrl,
    description:
      'Ontario recruitment agency for manufacturing, skilled trades, operations, and industrial hiring.',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
      { '@type': 'City', name: 'Vaughan' },
      { '@type': 'City', name: 'Toronto' },
      { '@type': 'City', name: 'Belleville' },
      { '@type': 'City', name: 'Chatham-Kent' },
      { '@type': 'City', name: 'Windsor' },
    ],
    sameAs: ['https://www.linkedin.com/in/sarah-fell-3b8a5810'],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cal.com" />
        <Script src="https://assets.cal.com/embed/embed.js" strategy="lazyOnload" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${manrope.variable} font-body flex min-h-screen flex-col bg-[#2C3434] text-[var(--color-dark)] antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
