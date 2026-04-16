import type { Metadata } from 'next';
import JobsPageClient from './JobsPageClient';

export const metadata: Metadata = {
  title: 'Active Roles — Industrial & Trades Jobs in Ontario',
  description:
    'Browse active industrial, skilled trades, and operations roles across Ontario. Direct hire and contract positions with Staffing Solutions by Sarah Fell.',
};

export default function JobsPage() {
  return <JobsPageClient />;
}
