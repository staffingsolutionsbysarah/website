import Link from 'next/link';

type ActionItem = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

type CallToActionPanelProps = {
  eyebrow: string;
  title: string;
  body: string;
  actions: ActionItem[];
};

export default function CallToActionPanel({
  eyebrow,
  title,
  body,
  actions,
}: CallToActionPanelProps) {
  return (
    <section className="px-4 pb-20 pt-6 md:px-6 md:pb-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="depth-plane grid gap-6 px-7 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-[14ch] text-[2.2rem] leading-[0.98] tracking-[-0.04em] md:text-[3rem]">
              {title}
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-black/68">{body}</p>
          </div>

          <div className="flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
