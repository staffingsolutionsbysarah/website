import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Hiring Call',
  description: 'Book a call with Sarah Fell to discuss your Ontario hiring need.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
