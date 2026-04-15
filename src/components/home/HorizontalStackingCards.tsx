'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const cards = [
  {
    image: '/images/Business handshake in Toronto office.png',
    kicker: 'Employer + Hiring',
    title: 'Build Your Team',
    body: 'Direct recruiter ownership from intake through close. Clear search briefs, tighter shortlists, faster decisions.',
  },
  {
    image: '/images/Worker with tablet in manufacturing facility.png',
    kicker: 'Candidate + Find Work',
    title: 'Find Your Next Role',
    body: 'Active industrial and trades opportunities across Ontario. Real roles, real timelines, direct communication.',
  },
  {
    image: '/images/Skilled trades workers reviewing blueprints.png',
    kicker: 'Industries',
    title: 'Manufacturing, Finance & Tech',
    body: 'Specialist coverage across production, skilled trades, accounting, and technology. Sector-aware search logic.',
  },
  {
    image: '/images/Construction professionals reviewing plans together.png',
    kicker: 'Ontario Trust',
    title: 'Regional Expertise',
    body: 'Ontario-first recruitment with manufacturing and skilled trades relevance. Local market knowledge, local results.',
  },
] as const;

export default function HorizontalStackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  const snapToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const cardWidth = track.children[0] as HTMLElement;
    const gap = 32;
    const scrollPos = (cardWidth.offsetWidth + gap) * index;
    
    gsap.to(track, {
      x: -scrollPos,
      duration: 0.6,
      ease: 'power2.out',
    });
    
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    const progressDots = progressRef.current?.querySelectorAll('.dot');

    if (!container || !track) return;

    const totalWidth = track.scrollWidth;
    const viewportWidth = container.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${scrollDistance * 1.5}`,
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressDots) {
            const activeIndex = Math.min(
              Math.floor(self.progress * cards.length),
              cards.length - 1
            );
            progressDots.forEach((dot, i) => {
              dot.classList.toggle('active', i === activeIndex);
            });
          }
        },
      },
    });

    tl.to(track, {
      x: -scrollDistance,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--color-bg)]"
    >
      <motion.div
        ref={trackRef}
        className="flex h-full cursor-grab items-center gap-8 px-[10vw]"
        style={{ x }}
        drag="x"
        dragElastic={0.1}
        dragMomentum={false}
        dragConstraints={{ left: -1200, right: 0 }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.kicker}
            className="card relative flex h-[70vh] w-[min(70vw,700px)] shrink-0 items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-2xl">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="70vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E7D08A]">
                  {card.kicker}
                </p>
                <h3 className="mt-3 text-[2.2rem] leading-[0.96] tracking-tight text-white md:text-[3rem]">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-[32rem] text-base leading-relaxed text-white/78 md:text-lg">
                  {card.body}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div
        ref={progressRef}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3"
      >
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => snapToIndex(index)}
            className={`dot h-2.5 w-2.5 rounded-full bg-[#C6A64A] transition-all duration-300 ${
              index === 0 ? 'active w-10' : 'opacity-40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
