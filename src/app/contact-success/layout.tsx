import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Message Sent',
  description: 'Thank you for reaching out. Sarah will be in touch.',
  robots: { index: false, follow: false },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
