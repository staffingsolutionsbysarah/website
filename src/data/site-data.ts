export type NavItem = {
  href: string;
  label: string;
  cta?: boolean;
};

export type LinkCard = {
  href: string;
  title: string;
  description: string;
  eyebrow?: string;
};

export type IndustryPage = {
  slug: string;
  title: string;
  summary: string;
  employerFocus: string;
  candidateFocus: string;
  commonRoles: string[];
  relatedLocationSlugs: string[];
};

export type LocationPage = {
  slug: string;
  title: string;
  summary: string;
  marketFocus: string;
  hiringNeeds: string[];
  relatedIndustrySlugs: string[];
};

export const primaryNavItems: NavItem[] = [
  { href: '/hire-talent', label: 'Hire Talent' },
  { href: '/find-work', label: 'Find Work' },
  { href: '/about', label: 'About' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/book-a-call', label: 'Book a Call', cta: true },
];

export const utilityFooterLinks: LinkCard[] = [
  {
    href: '/contact',
    title: 'Contact',
    description: 'General inquiries, hiring conversations, and next-step questions.',
  },
  {
    href: '/request-talent-profile',
    title: 'Request Talent Profile',
    description: 'Employer intake path for role briefs, search pressure, and shortlist needs.',
  },
  {
    href: '/submit-resume',
    title: 'Submit Resume',
    description: 'Candidate entry point for resume review and future-fit roles.',
  },
  {
    href: '/book-a-call',
    title: 'Book Strategy Call',
    description: 'Direct intake with Sarah for active hiring needs.',
  },
];

export const legalFooterLinks: LinkCard[] = [
  {
    href: '/privacy',
    title: 'Privacy Policy',
    description: 'How personal information and analytics data are handled.',
  },
  {
    href: '/terms',
    title: 'Terms of Use',
    description: 'Website use terms, limitations, and governing law.',
  },
  {
    href: '/disclaimer',
    title: 'Recruitment Disclaimer',
    description: 'No placement, interview, or engagement is guaranteed.',
  },
];

export const industries: IndustryPage[] = [
  {
    slug: 'manufacturing-skilled-trades',
    title: 'Manufacturing & Skilled Trades',
    summary:
      'Recruitment support for plant, production, maintenance, and floor leadership hiring where downtime, shift reality, and technical fit matter.',
    employerFocus:
      'Best suited for employers who need tighter screening for plant, maintenance, and production hiring without adding more process drag.',
    candidateFocus:
      'Relevant for tradespeople, supervisors, and industrial operators looking for practical Ontario roles with clearer expectations.',
    commonRoles: ['Millwright', 'Electrician', 'Maintenance Manager', 'Production Supervisor', 'Plant Manager'],
    relatedLocationSlugs: ['vaughan', 'windsor', 'belleville'],
  },
  {
    slug: 'food-grocery-retail',
    title: 'Food, Grocery & Retail',
    summary:
      'Hiring support for food production, grocery operations, and customer-facing leadership roles where pace, reliability, and service standards all matter.',
    employerFocus:
      'Useful for businesses balancing volume hiring, shift coverage, and quality expectations across production, retail, and store operations.',
    candidateFocus:
      'Relevant for candidates moving between food production, grocery leadership, and retail operations roles across Ontario.',
    commonRoles: ['Store Manager', 'Production Lead', 'Warehouse Supervisor', 'Department Manager', 'Operations Manager'],
    relatedLocationSlugs: ['toronto-gta', 'vaughan', 'chatham-kent'],
  },
  {
    slug: 'finance-accounting',
    title: 'Finance & Accounting',
    summary:
      'Business-side recruitment for accounting and finance teams that need cleaner shortlists, discretion, and stronger judgment early in the process.',
    employerFocus:
      'Built for employers who need finance hiring handled with tighter calibration around reporting lines, commercial awareness, and pace.',
    candidateFocus:
      'Relevant for accountants, analysts, controllers, and finance professionals looking for stronger role alignment and clearer employer context.',
    commonRoles: ['Controller', 'Senior Accountant', 'Financial Analyst', 'Bookkeeper', 'Accounting Manager'],
    relatedLocationSlugs: ['toronto-gta', 'vaughan', 'windsor'],
  },
  {
    slug: 'it-technology',
    title: 'IT & Technology',
    summary:
      'Technology and systems-adjacent hiring for employers who still want role clarity, business context, and recruiter judgment instead of keyword noise.',
    employerFocus:
      'Useful when the role touches systems, data, support, or operational technology and the hiring team needs cleaner candidate filtering.',
    candidateFocus:
      'Relevant for IT, systems, support, and implementation talent looking for direct communication and a clearer hiring path.',
    commonRoles: ['Systems Administrator', 'IT Support', 'ERP Analyst', 'Business Systems Analyst', 'Implementation Lead'],
    relatedLocationSlugs: ['toronto-gta', 'vaughan', 'windsor'],
  },
  {
    slug: 'sales-marketing',
    title: 'Sales & Marketing',
    summary:
      'Commercial hiring support for teams that need stronger communication, ownership, and performance fit in client-facing and growth roles.',
    employerFocus:
      'Built for employers hiring revenue and brand-facing talent where poor fit shows up quickly in results, culture, and follow-through.',
    candidateFocus:
      'Relevant for candidates with client-facing, account growth, marketing, and business development experience.',
    commonRoles: ['Account Manager', 'Business Development Manager', 'Sales Coordinator', 'Marketing Manager', 'Inside Sales'],
    relatedLocationSlugs: ['toronto-gta', 'vaughan', 'belleville'],
  },
  {
    slug: 'administrative-support',
    title: 'Administrative & Support',
    summary:
      'Office support hiring for employers who need dependable execution, communication, and follow-through across operations, service, and administration.',
    employerFocus:
      'Useful when the business needs support staff who can stabilize day-to-day execution instead of creating more coordination work.',
    candidateFocus:
      'Relevant for coordinators, administrators, and support professionals looking for practical next-step opportunities.',
    commonRoles: ['Office Administrator', 'Project Coordinator', 'Customer Support', 'Executive Assistant', 'Operations Coordinator'],
    relatedLocationSlugs: ['belleville', 'windsor', 'chatham-kent'],
  },
];

export const locations: LocationPage[] = [
  {
    slug: 'vaughan',
    title: 'Vaughan Recruitment Support',
    summary:
      'Hiring support for Vaughan employers across industrial, logistics, construction, and business-side operations where speed and fit both matter.',
    marketFocus:
      'Vaughan hiring pressure usually sits at the intersection of warehouse, plant, project, and head-office support functions.',
    hiringNeeds: ['Industrial operations', 'Warehouse and logistics', 'Construction support', 'Accounting and office leadership'],
    relatedIndustrySlugs: ['manufacturing-skilled-trades', 'food-grocery-retail', 'finance-accounting'],
  },
  {
    slug: 'toronto-gta',
    title: 'Toronto / GTA Recruitment Support',
    summary:
      'Recruitment support for Toronto and GTA employers hiring across professional, operational, and technical teams with broader market competition.',
    marketFocus:
      'The GTA requires cleaner role positioning and tighter process control because good candidates have more options and less patience for vague hiring.',
    hiringNeeds: ['Finance and accounting', 'Sales and commercial hiring', 'Technology and systems', 'Operations leadership'],
    relatedIndustrySlugs: ['finance-accounting', 'it-technology', 'sales-marketing'],
  },
  {
    slug: 'belleville',
    title: 'Belleville Recruitment Support',
    summary:
      'Recruitment support for Belleville employers across manufacturing, operations, administration, and regional business hiring.',
    marketFocus:
      'Belleville hiring still benefits from disciplined search work because candidate pools can be smaller and local fit matters quickly.',
    hiringNeeds: ['Production and maintenance', 'Operations support', 'Administrative hiring', 'Sales and service leadership'],
    relatedIndustrySlugs: ['manufacturing-skilled-trades', 'administrative-support', 'sales-marketing'],
  },
  {
    slug: 'windsor',
    title: 'Windsor Recruitment Support',
    summary:
      'Recruitment support for Windsor employers hiring into industrial, automotive-adjacent, operations, and finance roles.',
    marketFocus:
      'Windsor hiring often sits close to automotive, supplier, logistics, and operations pressure where technical relevance matters more than generic resume volume.',
    hiringNeeds: ['Industrial maintenance', 'Production leadership', 'Operations and dispatch', 'Accounting and office support'],
    relatedIndustrySlugs: ['manufacturing-skilled-trades', 'finance-accounting', 'it-technology'],
  },
  {
    slug: 'chatham-kent',
    title: 'Chatham-Kent Recruitment Support',
    summary:
      'Recruitment support for Chatham-Kent employers hiring across food production, industrial operations, and administrative support functions.',
    marketFocus:
      'The market needs practical local recruiting support because coverage, shift fit, and retention all matter in a tighter regional hiring environment.',
    hiringNeeds: ['Food and production hiring', 'Plant support', 'Administrative coverage', 'Retail and service leadership'],
    relatedIndustrySlugs: ['food-grocery-retail', 'administrative-support', 'manufacturing-skilled-trades'],
  },
];

export const industryHubCards: LinkCard[] = industries.map((industry) => ({
  href: `/industries/${industry.slug}`,
  title: industry.title,
  description: industry.summary,
  eyebrow: 'Industry page',
}));

export const locationHubCards: LinkCard[] = locations.map((location) => ({
  href: `/locations/${location.slug}`,
  title: location.title.replace(' Recruitment Support', ''),
  description: location.summary,
  eyebrow: 'Location page',
}));

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
