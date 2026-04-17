'use client';

import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

const cards = [
  {
    title: 'Manufacturing & Operations',
    desc: 'From plant managers to specialized technicians, we source the backbone of modern industry.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
    href: '/industries',
  },
  {
    title: 'Construction & Infrastructure',
    desc: 'Certified professionals for high-stakes projects. We understand the technical nuances of every trade.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
    href: '/industries',
  },
  {
    title: 'Professional Services',
    desc: 'Strategic leadership placement in Sales, Marketing, and Finance for companies ready to scale.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
    href: '/services',
  },
];

export default function HorizontalStackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    if (!container || !horizontal) return;

    const panels = gsap.utils.toArray<HTMLElement>('.horizontal-panel');

    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => '+=' + container.offsetWidth,
      },
    });

    panels.forEach((panel) => {
      const img = panel.querySelector('.panel-img');
      const text = panel.querySelector('.panel-text');

      if (img) {
        gsap.from(img, {
          y: -80,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (text) {
        gsap.from(text, {
          y: 80,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center bg-parchment overflow-hidden h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full mb-12">
        <span className="text-brass uppercase tracking-widest text-[10px] font-bold mb-4 block">
          Our Expertise
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-espresso">
          Specialized Domains
        </h2>
      </div>

      <div ref={horizontalRef} className="flex w-[300vw] h-[60vh]">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="horizontal-panel w-screen px-6 md:px-10 flex items-center justify-center"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 panel-img">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/20">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4 md:space-y-6 panel-text">
                <span className="text-brass font-serif text-3xl md:text-4xl italic">
                  0{i + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-espresso">
                  {card.title}
                </h3>
                <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
                  {card.desc}
                </p>

                <Link
                  href={card.href}
                  className="group inline-flex items-center overflow-hidden relative w-48 h-12 cursor-pointer border border-brass/30 rounded-full bg-brass/5 hover:bg-brass/10 transition-colors"
                >
                  <div className="flex whitespace-nowrap animate-marquee group-hover:animate-none">
                    <span className="text-brass font-bold text-[10px] uppercase tracking-widest mx-4 flex items-center">
                      Learn More <ArrowRight className="ml-2 w-3 h-3" /> &bull; Learn More{' '}
                      <ArrowRight className="ml-2 w-3 h-3" /> &bull; Learn More{' '}
                      <ArrowRight className="ml-2 w-3 h-3" /> &bull;{' '}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
