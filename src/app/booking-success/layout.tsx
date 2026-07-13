import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your call with Sarah is booked.',
  robots: { index: false, follow: false },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
