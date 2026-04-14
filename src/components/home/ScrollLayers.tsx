'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 0 },
      {
        y: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down';
  className?: string;
  id?: string;
  speed?: number;
}

export function ParallaxSection({
  children,
  direction = 'up',
  className = '',
  id,
  speed = 0.2,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const yMove = direction === 'up' ? -150 * speed : 150 * speed;

    gsap.fromTo(
      bg,
      { y: 0 },
      {
        y: yMove,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id={id} className={`relative overflow-hidden ${className}`}>
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 z-0"
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
  id?: string;
  stagger?: boolean;
  delay?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  className = '',
  id,
  stagger = false,
  delay = 0,
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const getInitial = () => {
    switch (direction) {
      case 'left': return { x: -120, opacity: 0 };
      case 'right': return { x: 120, opacity: 0 };
      case 'up': return { y: 100, opacity: 0 };
      case 'down': return { y: -100, opacity: 0 };
      default: return { y: 100, opacity: 0 };
    }
  };

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = stagger 
      ? section.querySelectorAll('.stagger-item')
      : [section];

    gsap.fromTo(
      elements,
      getInitial(),
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: stagger ? 0.1 : 0,
        delay: stagger ? 0 : delay,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function FadeIn({ children, className = '', id, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}

export { ScrollTrigger, gsap };
