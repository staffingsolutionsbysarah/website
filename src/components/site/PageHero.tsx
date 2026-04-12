import Link from 'next/link';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/site/Breadcrumbs';

type ActionLink = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: ActionLink[];
  theme?: 'light' | 'dark';
};

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions = [],
  theme = 'light',
}: PageHeroProps) {
  const eyebrowClass = theme === 'dark' ? 'text-[#E7D08A]' : 'text-[var(--color-accent)]';
  const titleClass = theme === 'dark' ? 'text-white' : 'text-[var(--color-dark)]';
  const descriptionClass = theme === 'dark' ? 'text-white/74' : 'text-black/70';

  return (
    <section className="px-4 pb-12 pt-16 md:px-6 md:pb-16 md:pt-24">
      <div className="mx-auto max-w-[1280px]">
        <Breadcrumbs items={breadcrumbs} theme={theme} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.48fr)] lg:items-end">
          <div>
            <p className={['text-[11px] font-semibold uppercase tracking-[0.28em]', eyebrowClass].join(' ')}>
              {eyebrow}
            </p>
            <h1 className={['mt-4 max-w-[13ch] text-5xl tracking-[-0.04em] md:text-6xl', titleClass].join(' ')}>
              {title}
            </h1>
            <p className={['mt-6 max-w-[60ch] text-base leading-relaxed md:text-lg', descriptionClass].join(' ')}>
              {description}
            </p>
          </div>

          {actions.length > 0 ? (
            <div className="depth-inset rounded-[28px] px-5 py-5 md:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">Next step</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={action.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
