import Link from 'next/link';

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  theme?: 'light' | 'dark';
};

export default function Breadcrumbs({ items, theme = 'light' }: BreadcrumbsProps) {
  const baseClass =
    theme === 'dark'
      ? 'flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/46'
      : 'flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42';
  const linkClass = theme === 'dark' ? 'transition hover:text-white/72' : 'transition hover:text-black/70';
  const currentClass = theme === 'dark' ? 'text-white/72' : 'text-black/62';
  const dividerClass = theme === 'dark' ? 'text-white/24' : 'text-black/22';

  return (
    <nav aria-label="Breadcrumb" className={baseClass}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? currentClass : ''}>{item.label}</span>
            )}
            {!isLast ? <span className={dividerClass}>/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
