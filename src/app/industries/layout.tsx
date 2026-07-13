import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries We Recruit For in Ontario',
  description: 'Manufacturing, skilled trades, construction, finance, IT, and operations recruitment across Ontario.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
