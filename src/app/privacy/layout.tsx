import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Staffing Solutions by Sarah Fell collects, uses, and protects your data.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
