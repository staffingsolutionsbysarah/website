export type LegalSection = {
  heading: string;
  body: string[];
};

export type LegalDocument = {
  href: string;
  title: string;
  effectiveDate: string;
  updatedDate: string;
  intro: string;
  sections: LegalSection[];
};

const dateLabel = 'April 12, 2026';
const contactEmail = 'Sarah.fell@staffingsolutionsbysarah.com';

export const legalDocuments: LegalDocument[] = [
  {
    href: '/privacy',
    title: 'Privacy Policy',
    effectiveDate: dateLabel,
    updatedDate: dateLabel,
    intro:
      'Staffing Solutions by Sarah Fell Incorporated respects your privacy and handles personal information in line with applicable Canadian privacy requirements, including PIPEDA where applicable.',
    sections: [
      {
        heading: '1. Information We Collect',
        body: [
          'We may collect personal information you choose to provide, including your name, email address, phone number, company name, job title, hiring details, booking details, and any information you include in a message or inquiry.',
          'We may also collect limited technical information through analytics tools, including browser type, device type, referral source, pages visited, and general interaction data.',
        ],
      },
      {
        heading: '2. Why We Collect It',
        body: [
          'We collect information to respond to inquiries, schedule calls, understand hiring needs, communicate about recruitment services, improve website performance, maintain business records, and comply with legal obligations.',
          'If candidate intake features expand later, information may also be used to review qualifications and assess fit for recruitment opportunities.',
        ],
      },
      {
        heading: '3. Consent',
        body: [
          'By submitting information through this website, you consent to its collection, use, and disclosure for the purposes described in this policy.',
          'You may withdraw consent at any time, subject to legal or contractual limits and reasonable notice. That may limit our ability to respond or provide services.',
        ],
      },
      {
        heading: '4. Analytics, Cookies, and Tracking',
        body: [
          'This website may use Google Analytics and Vercel Web Analytics to measure traffic and improve site performance.',
          'Google Analytics may use cookies or similar technologies. Vercel Web Analytics is described by Vercel as using anonymized data and not using cookies.',
        ],
      },
      {
        heading: '5. Disclosure',
        body: [
          'We do not sell personal information.',
          'Information may be shared with service providers supporting hosting, scheduling, analytics, or website operations, or where disclosure is required by law or necessary to protect our rights, systems, or operations.',
        ],
      },
      {
        heading: '6. Retention and Safeguards',
        body: [
          'Personal information is retained only as long as reasonably necessary for the purposes described here and to meet legal, regulatory, or legitimate business requirements.',
          'We use reasonable administrative, technical, and organizational safeguards, but no online system can guarantee absolute security.',
        ],
      },
      {
        heading: '7. Access and Corrections',
        body: [
          'Subject to applicable law, you may request access to the personal information we hold about you and request corrections if the information is inaccurate or incomplete.',
        ],
      },
      {
        heading: '8. Third-Party Services and Updates',
        body: [
          'This website may link to or rely on third-party tools and platforms. We are not responsible for their content, availability, or privacy practices.',
          `Questions about privacy or consent can be sent to ${contactEmail}. We may update this policy from time to time by posting a revised version on this page.`,
        ],
      },
    ],
  },
  {
    href: '/terms',
    title: 'Terms of Use',
    effectiveDate: dateLabel,
    updatedDate: dateLabel,
    intro:
      'By accessing or using this website, you agree to these Terms of Use. If you do not agree, do not use the website.',
    sections: [
      {
        heading: '1. Website Purpose',
        body: [
          'This website is provided for general information about Staffing Solutions by Sarah Fell Incorporated and its recruitment services.',
        ],
      },
      {
        heading: '2. No Reliance',
        body: [
          'Content on this website is provided for general informational purposes only. We aim to keep information current, but we do not guarantee that all content, service descriptions, or availability details will always be complete, current, or error-free.',
        ],
      },
      {
        heading: '3. Acceptable Use',
        body: [
          'You agree not to use the website for unlawful, fraudulent, or harmful purposes, interfere with its operation or security, submit false information, or attempt unauthorized access to any part of the site or its systems.',
        ],
      },
      {
        heading: '4. Intellectual Property',
        body: [
          'Unless otherwise stated, site content, branding, graphics, design elements, layout, and related materials are owned by or licensed to Staffing Solutions by Sarah Fell Incorporated and protected by applicable law.',
        ],
      },
      {
        heading: '5. Third-Party Links and Tools',
        body: [
          'This website may contain links to third-party websites, services, or tools. We do not control and are not responsible for their content, privacy practices, terms, or availability.',
        ],
      },
      {
        heading: '6. No Warranties and Limitation of Liability',
        body: [
          'This website is provided on an as-is and as-available basis. To the fullest extent permitted by law, we disclaim warranties related to availability, accuracy, fitness for a particular purpose, and non-infringement.',
          'To the fullest extent permitted by law, Staffing Solutions by Sarah Fell Incorporated will not be liable for losses, damages, costs, or claims arising from use of, inability to use, or reliance on this website or its content.',
        ],
      },
      {
        heading: '7. Changes and Governing Law',
        body: [
          'We may update these Terms of Use at any time by posting the revised version on this page. Continued use of the website means you accept the updated terms.',
          'These terms are governed by the laws of Ontario and the laws of Canada applicable therein.',
        ],
      },
      {
        heading: '8. Contact',
        body: [
          `Questions about these Terms of Use can be directed to ${contactEmail}.`,
        ],
      },
    ],
  },
  {
    href: '/disclaimer',
    title: 'Recruitment Disclaimer',
    effectiveDate: dateLabel,
    updatedDate: dateLabel,
    intro:
      'The information on this website is provided for general business and recruitment-related purposes only.',
    sections: [
      {
        heading: '1. No Guarantee of Placement, Interview, or Hiring',
        body: [
          'Using this website, submitting a form, sending an inquiry, or booking a call does not guarantee an interview, job offer, placement, candidate submission, client engagement, or any specific recruitment outcome.',
        ],
      },
      {
        heading: '2. No Employment or Agency Relationship',
        body: [
          'Visiting this website or sending information through it does not create an employment relationship, recruiter-client contract, candidate representation agreement, or agency relationship.',
        ],
      },
      {
        heading: '3. Services and Opportunities May Change',
        body: [
          'Services, opportunities, and recruitment-related information described on this website may change, be paused, or be removed at any time without notice.',
        ],
      },
      {
        heading: '4. Independent Decisions',
        body: [
          'Candidate decisions and hiring decisions remain solely with the individuals, employers, and clients involved. We do not guarantee any particular result.',
        ],
      },
      {
        heading: '5. No Professional Advice',
        body: [
          'Nothing on this website constitutes legal advice, employment law advice, HR compliance advice, immigration advice, or other regulated professional advice.',
        ],
      },
      {
        heading: '6. Third-Party Services',
        body: [
          'This website may rely on third-party tools or platforms, including scheduling and analytics providers. We are not responsible for outages, delays, errors, or privacy practices relating to those providers.',
        ],
      },
      {
        heading: '7. Contact',
        body: [
          `Questions about this disclaimer can be directed to ${contactEmail}. Personal information submitted through this site is handled in line with the Privacy Policy.`,
        ],
      },
    ],
  },
];

export function getLegalDocument(href: string) {
  return legalDocuments.find((document) => document.href === href);
}
