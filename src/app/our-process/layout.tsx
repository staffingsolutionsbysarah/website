import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Search Process',
  description: 'How Sarah runs an industrial search from intake through placement.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
