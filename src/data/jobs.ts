export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  salary?: string;
  summary: string;
  active: boolean;
  public: boolean;
  href: string;
};

export function slugifyJob(job: Pick<Job, 'title' | 'location' | 'id'>): string {
  const city = job.location.split(',')[0];
  return `${job.title}-${city}-${job.id}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => slugifyJob(job) === slug);
}

/** Parse a display salary like "$110,000 to $135,000" or "$32 to $40 / hour" into schema fields. */
export function parseSalary(salary?: string):
  | { min: number; max: number; unit: 'HOUR' | 'YEAR' }
  | null {
  if (!salary) return null;
  const unit = /hour|hr|\/\s*h/i.test(salary) ? 'HOUR' : 'YEAR';
  const nums = salary
    .replace(/,/g, '')
    .match(/\d+(?:\.\d+)?/g)
    ?.map(Number);
  if (!nums || nums.length === 0) return null;
  return { min: nums[0], max: nums[nums.length - 1], unit };
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Plant Manager',
    location: 'Greater Toronto Area, ON',
    type: 'Full-time',
    salary: '$110,000 to $135,000',
    summary: 'Lead daily operations at a high-volume manufacturing facility. Oversee production, safety, and a team of 80+ across two shifts.',
    active: true,
    public: true,
    href: '/request-talent-profile',
  },
  {
    id: '2',
    title: 'CNC Machine Operator',
    location: 'Brampton, ON',
    type: 'Full-time',
    salary: '$32 to $40 / hour',
    summary: 'Set up and operate CNC milling and turning machines. 3+ years of experience with Fanuc or Mazak controls required.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
  {
    id: '3',
    title: 'Warehouse Supervisor',
    location: 'Mississauga, ON',
    type: 'Full-time',
    salary: '$65,000 to $80,000',
    summary: 'Manage receiving, putaway, and order fulfillment operations. Experience with RF scanning and WMS required.',
    active: true,
    public: true,
    href: '/request-talent-profile',
  },
  {
    id: '4',
    title: 'Industrial Maintenance Technician',
    location: 'Hamilton, ON',
    type: 'Full-time',
    salary: '$38 to $48 / hour',
    summary: 'Preventive and corrective maintenance on production equipment including hydraulics, pneumatics, and PLCs (Allen-Bradley).',
    active: true,
    public: true,
    href: '/submit-resume',
  },
  {
    id: '5',
    title: 'Forklift Operator',
    location: 'Brampton, ON',
    type: 'Full-time',
    salary: '$24 to $28 / hour',
    summary: 'Load and unload trailers, move pallets, and maintain yard organization. Valid forklift certification required.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
  {
    id: '6',
    title: 'Shift Supervisor, Food Manufacturing',
    location: 'Vaughan, ON',
    type: 'Full-time',
    salary: '$70,000 to $85,000',
    summary: 'Supervise 25 to 30 operators across a morning or afternoon shift. Food safety and GMP experience required.',
    active: true,
    public: true,
    href: '/request-talent-profile',
  },
  {
    id: '7',
    title: 'General Labour, Industrial',
    location: 'Toronto, ON',
    type: 'Full-time',
    salary: '$22 to $26 / hour',
    summary: 'Entry-level production positions. No experience required, training provided. Shift premiums for nights and weekends.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
  {
    id: '8',
    title: 'Logistics Coordinator',
    location: 'Ottawa, ON',
    type: 'Full-time',
    salary: '$55,000 to $68,000',
    summary: 'Coordinate inbound and outbound freight. Experience with TMS and Microsoft Dynamics an asset.',
    active: true,
    public: true,
    href: '/request-talent-profile',
  },
  {
    id: '9',
    title: 'Mig Welder',
    location: 'Sarnia, ON',
    type: 'Full-time',
    salary: '$36 to $44 / hour',
    summary: 'Structural and plate welding in a fabrication shop environment. CWB certification preferred.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
  {
    id: '10',
    title: 'Shipping & Receiving Clerk',
    location: 'Belleville, ON',
    type: 'Full-time',
    salary: '$22 to $27 / hour',
    summary: 'Process incoming and outgoing shipments. Experience with shipping documents, customs paperwork, and warehouse systems.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
];
