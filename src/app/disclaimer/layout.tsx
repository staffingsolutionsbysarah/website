import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Website disclaimer for Staffing Solutions by Sarah Fell.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
