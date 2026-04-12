import Link from 'next/link';
import PageHero from '@/components/site/PageHero';

type SuccessPageShellProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export default function SuccessPageShell({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: SuccessPageShellProps) {
  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(198,166,74,0.18),rgba(198,166,74,0))]" />

      <PageHero
        eyebrow="Success"
        title={title}
        description={description}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Success' },
        ]}
        actions={[
          { href: primaryHref, label: primaryLabel },
          { href: secondaryHref, label: secondaryLabel, variant: 'secondary' },
        ]}
      />

      <section className="px-4 pb-20 md:px-6 md:pb-24">
        <div className="mx-auto max-w-[960px]">
          <div className="depth-plane px-7 py-8 text-center md:px-10 md:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Next step
            </p>
            <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-black/70 md:text-lg">
              If you reached this page directly, use the links below to return to the correct entry point. These
              success pages are in place for booking, resume, and contact flows as the rest of the conversion layer is
              completed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
              </Link>
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
