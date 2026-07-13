import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Sarah Fell',
  description: 'Over a decade placing manufacturing and trades talent across Ontario. Direct recruiter access and disciplined search.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
