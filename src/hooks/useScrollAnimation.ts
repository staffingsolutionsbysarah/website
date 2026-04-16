'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
  speed?: number;
  offset?: [number, number];
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return { ref, y, scrollYProgress };
}

export function useScrollReveal(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options?.once !== false) {
            observer.unobserve(element);
          }
        } else if (options?.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px 0px -50px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, isVisible };
}

interface CinematicRevealOptions {
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: [number, number];
}

export function useCinematicReveal(options?: CinematicRevealOptions) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  
  const variants = {
    hidden: {
      opacity: 0,
      y: options?.distance ?? 60,
      scale: options?.scale?.[0] ?? 0.94,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: options?.scale?.[1] ?? 1,
    },
  };

  return {
    ref,
    isVisible,
    variants,
    transition: {
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

export function useDepthLayers(layerCount: number = 3) {
  const layers = useScroll({
    offset: ['start end', 'end start'],
  });

  return {
    scrollYProgress: layers.scrollYProgress,
    layers: Array.from({ length: layerCount }, (_, i) => {
      const speed = 0.1 + (i * 0.15);
      const y = useTransform(
        layers.scrollYProgress,
        [0, 1],
        [50 * speed, -50 * speed]
      );
      return { y, speed };
    }),
  };
}

interface FloatingElementOptions {
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function useFloatingEffect(options?: FloatingElementOptions) {
  const amplitude = options?.amplitude ?? 12;
  const duration = options?.duration ?? 4;
  const delay = options?.delay ?? 0;

  return {
    initial: { y: 0 },
    animate: {
      y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };
}

interface ScrollVelocityOptions {
  multiplier?: number;
}

export function useScrollVelocity(options?: ScrollVelocityOptions) {
  const ref = useRef<HTMLElement>(null);
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime.current;

      if (timeDelta > 0) {
        const newVelocity = (currentScrollY - lastScrollY.current) / timeDelta;
        setVelocity(newVelocity * (options?.multiplier ?? 1));
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [options?.multiplier]);

  return { ref, velocity };
}

export function useStickySection(stickyHeight: string = '100vh') {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);

  return { containerRef, scrollYProgress, opacity, scale };
}

interface OverlapRevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export function useOverlapReveal(options?: OverlapRevealOptions) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  
  const direction = options?.direction ?? 'up';
  const distance = options?.distance ?? 80;
  
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { y: 0, x: distance };
      case 'right': return { y: 0, x: -distance };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
    scale: 0.95,
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  };

  return {
    ref,
    isVisible,
    initial,
    animate,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}
