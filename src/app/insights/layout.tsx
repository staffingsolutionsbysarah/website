import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hiring Insights for Ontario Manufacturers',
  description: 'Salary guides, hiring-market notes, and interview playbooks for plant and operations leadership.',
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
