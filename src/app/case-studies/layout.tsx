import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Placement Case Studies',
  description: 'Real Ontario searches: the brief, the search in numbers, the hire, and time to fill.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
