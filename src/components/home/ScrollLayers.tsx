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
        y: -150 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
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

    const yMove = direction === 'up' ? -250 * speed : 250 * speed;

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
          scrub: 1.5,
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
  intensity?: 'subtle' | 'medium' | 'dramatic';
}

export function ScrollReveal({
  children,
  direction = 'up',
  className = '',
  id,
  stagger = false,
  delay = 0,
  intensity = 'medium',
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const distances = {
    subtle: { x: 40, y: 40 },
    medium: { x: 100, y: 80 },
    dramatic: { x: 180, y: 120 },
  };

  const distance = distances[intensity];

  const getInitial = () => {
    switch (direction) {
      case 'left': return { x: -distance.x, opacity: 0, scale: 0.95 };
      case 'right': return { x: distance.x, opacity: 0, scale: 0.95 };
      case 'up': return { y: distance.y, opacity: 0, scale: 0.95 };
      case 'down': return { y: -distance.y, opacity: 0, scale: 0.95 };
      default: return { y: distance.y, opacity: 0, scale: 0.95 };
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
        scale: 1,
        duration: stagger ? 0.9 : 1.2,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        delay: stagger ? 0 : delay,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
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
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
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

interface ClipRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'right' | 'left' | 'down';
  className?: string;
  id?: string;
  duration?: number;
}

export function ClipReveal({
  children,
  direction = 'up',
  className = '',
  id,
  duration = 1.2,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getClipInit = () => {
    switch (direction) {
      case 'up': return { clipPath: 'inset(100% 0 0 0)' };
      case 'right': return { clipPath: 'inset(0 0 0 100%)' };
      case 'left': return { clipPath: 'inset(0 100% 0 0)' };
      case 'down': return { clipPath: 'inset(0 0 100% 0)' };
      default: return { clipPath: 'inset(100% 0 0 0)' };
    }
  };

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      getClipInit(),
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: duration,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} id={id} className={className} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  );
}

interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  scale?: number;
}

export function ScaleReveal({
  children,
  className = '',
  id,
  scale = 1.15,
}: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: scale, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
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

interface LayeredSectionProps {
  children: React.ReactNode;
  className?: string;
  overlap?: 'sm' | 'md' | 'lg' | 'xl';
  zIndex?: number;
}

export function LayeredSection({
  children,
  className = '',
  overlap = 'md',
  zIndex = 10,
}: LayeredSectionProps) {
  const overlapValues = {
    sm: '-mt-12',
    md: '-mt-20',
    lg: '-mt-32',
    xl: '-mt-48',
  };

  return (
    <div
      className={`${overlapValues[overlap]} relative z-[${zIndex}] ${className}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.2,
  overlay = true,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const movement = 200 * speed;

    gsap.fromTo(
      img,
      { y: -movement },
      {
        y: movement,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: '120%', top: '-10%' }}
    >
      <div
        ref={imgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
      {overlay && <div className="absolute inset-0 bg-black/20" />}
    </div>
  );
}

export { ScrollTrigger, gsap };
