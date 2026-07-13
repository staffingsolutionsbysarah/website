import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using the Staffing Solutions by Sarah Fell website.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
