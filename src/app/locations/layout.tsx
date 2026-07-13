import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruitment Across Ontario',
  description: 'Recruitment in Vaughan, Toronto GTA, Belleville, Chatham-Kent, and Windsor.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
