import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruitment Services for Ontario Employers',
  description: 'Permanent, contract, and payrolled placements with a single recruiter as your point of contact.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
