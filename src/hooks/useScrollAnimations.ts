'use client';

import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface UseStickySectionOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export function useStickySection<T extends HTMLElement>(
  options: UseStickySectionOptions = {}
) {
  const { start = 'top top', end = '+=100%', scrub = 0.5 } = options;
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
          pin: true,
          pinSpacing: false,
        },
      });
    },
    { scope: ref }
  );

  return ref;
}

export interface UseHorizontalScrollOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export function useHorizontalScroll<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  options: UseHorizontalScrollOptions = {}
) {
  const { start = 'top top', end = '+=300%', scrub = 0.5 } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const slides = container.querySelectorAll('.h-scroll-slide');

      if (slides.length === 0) return;

      const totalWidth = container.scrollWidth - container.clientWidth;

      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

export interface UseParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
}

export function useParallax<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: UseParallaxOptions = {}
) {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return ref;
}

export interface UseFadeInUpOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  y?: number;
}

export function useFadeInUp<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: UseFadeInUpOptions = {}
) {
  const { threshold = 0.1, delay = 0, duration = 0.8, y = 40 } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: `top ${100 - threshold * 100}%`,
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: ref }
  );

  return ref;
}

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  ScrollTrigger.refresh();
}