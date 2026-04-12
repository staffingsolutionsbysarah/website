import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LinkCard } from '@/data/site-data';

type LinkCardGridProps = {
  title: string;
  description: string;
  cards: LinkCard[];
};

export default function LinkCardGrid({ title, description, cards }: LinkCardGridProps) {
  return (
    <section className="px-4 py-14 md:px-6 md:py-18">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[48rem]">
          <h2 className="text-4xl tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-black/68 md:text-lg">{description}</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="depth-plane px-6 py-6 transition hover:-translate-y-0.5">
              {card.eyebrow ? (
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/42">{card.eyebrow}</p>
              ) : null}
              <h3 className="mt-3 text-[1.7rem] leading-[1.04] tracking-tight">{card.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/68 md:text-base">{card.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                View Page
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
