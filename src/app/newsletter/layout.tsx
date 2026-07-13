import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Ontario hiring-market notes and new roles, delivered monthly.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
