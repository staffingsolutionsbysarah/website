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

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Plant Manager',
    location: 'Greater Toronto Area, ON',
    type: 'Full-time',
    salary: '$110,000 – $135,000',
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
    salary: '$32 – $40 / hour',
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
    salary: '$65,000 – $80,000',
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
    salary: '$38 – $48 / hour',
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
    salary: '$24 – $28 / hour',
    summary: 'Load and unload trailers, move pallets, and maintain yard organization. Valid forklift certification required.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
  {
    id: '6',
    title: 'Shift Supervisor — Food Manufacturing',
    location: 'Vaughan, ON',
    type: 'Full-time',
    salary: '$70,000 – $85,000',
    summary: 'Supervise 25–30 operators across a morning or afternoon shift. Food safety and GMP experience required.',
    active: true,
    public: true,
    href: '/request-talent-profile',
  },
  {
    id: '7',
    title: 'General Labour — Industrial',
    location: 'Toronto, ON',
    type: 'Full-time',
    salary: '$22 – $26 / hour',
    summary: 'Entry-level production positions. No experience required — training provided. Shift premiums for nights and weekends.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
  {
    id: '8',
    title: 'Logistics Coordinator',
    location: 'Ottawa, ON',
    type: 'Full-time',
    salary: '$55,000 – $68,000',
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
    salary: '$36 – $44 / hour',
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
    salary: '$22 – $27 / hour',
    summary: 'Process incoming and outgoing shipments. Experience with shipping documents, customs paperwork, and warehouse systems.',
    active: true,
    public: true,
    href: '/submit-resume',
  },
];
