import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Received',
  description: 'Your resume has been submitted for review.',
  robots: { index: false, follow: false },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
