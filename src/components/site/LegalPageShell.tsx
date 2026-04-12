import Link from 'next/link';
import PageHero from '@/components/site/PageHero';
import type { LegalDocument } from '@/data/legal-content';
import { legalDocuments } from '@/data/legal-content';

type LegalPageShellProps = {
  document: LegalDocument;
};

export default function LegalPageShell({ document }: LegalPageShellProps) {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Legal"
        title={document.title}
        description={document.intro}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: document.title },
        ]}
        actions={[
          { href: '/contact', label: 'Contact' },
          { href: '/book-a-call', label: 'Book a Call', variant: 'secondary' },
        ]}
      />

      <section className="px-4 pb-20 md:px-6 md:pb-24">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="depth-inset rounded-[28px] px-5 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Legal pages</p>
              <div className="mt-4 flex flex-col gap-2">
                {legalDocuments.map((item) => {
                  const active = item.href === document.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        'rounded-full border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition',
                        active
                          ? 'border-[#C6A64A] bg-[#C6A64A] text-[#1F2628]'
                          : 'border-black/10 bg-white/70 text-black/62 hover:border-[#C6A64A] hover:text-black',
                      ].join(' ')}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          <article className="depth-plane px-7 py-8 md:px-10 md:py-10">
            <div className="grid gap-3 border-b border-black/8 pb-6 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Effective date</p>
                <p className="mt-2 text-sm text-black/72">{document.effectiveDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Last updated</p>
                <p className="mt-2 text-sm text-black/72">{document.updatedDate}</p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {document.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[1.8rem] leading-[1.04] tracking-tight">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-black/72 md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
