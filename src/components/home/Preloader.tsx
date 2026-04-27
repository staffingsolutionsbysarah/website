'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Canada Talent Signal Preloader
 * ─────────────────────────────
 * 1. Dark charcoal-green screen appears
 * 2. Signal dots fade in across Canada (west → east)
 * 3. Ontario cluster pulses gold — strongest signal
 * 4. Brand text appears
 * 5. Preloader fades out (≤ 2.5s total)
 */

/* City coordinates as % of container (approximate screen positions) */
const CANADA_CITIES = [
  // Western
  { id: 'vancouver',   x: 12,  y: 60, r: 3,   ontario: false },
  { id: 'victoria',    x: 10,  y: 63, r: 2,   ontario: false },
  { id: 'calgary',     x: 22,  y: 57, r: 3,   ontario: false },
  { id: 'edmonton',    x: 21,  y: 52, r: 3,   ontario: false },
  { id: 'saskatoon',   x: 31,  y: 55, r: 2.5, ontario: false },
  { id: 'winnipeg',    x: 42,  y: 58, r: 3,   ontario: false },
  // Ontario — the pulse cluster
  { id: 'windsor',     x: 55,  y: 65, r: 3.5, ontario: true  },
  { id: 'london',      x: 58,  y: 62, r: 4,   ontario: true  },
  { id: 'kitchener',   x: 61,  y: 60, r: 4,   ontario: true  },
  { id: 'hamilton',    x: 63,  y: 59, r: 4.5, ontario: true  },
  { id: 'toronto',     x: 65,  y: 57, r: 6,   ontario: true  },   // strongest
  { id: 'oshawa',      x: 67,  y: 57, r: 3,   ontario: true  },
  { id: 'belleville',  x: 69,  y: 56, r: 3,   ontario: true  },
  // Eastern
  { id: 'ottawa',      x: 72,  y: 54, r: 3.5, ontario: false },
  { id: 'montreal',    x: 78,  y: 54, r: 4,   ontario: false },
  { id: 'quebec',      x: 82,  y: 51, r: 3,   ontario: false },
  { id: 'halifax',     x: 88,  y: 58, r: 2.5, ontario: false },
  { id: 'stjohns',     x: 96,  y: 56, r: 2,   ontario: false },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const dotsRef       = useRef<(SVGCircleElement | null)[]>([]);
  const ringsRef      = useRef<(SVGCircleElement | null)[]>([]);
  const brandRef      = useRef<HTMLDivElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('preloader-seen', 'true');
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    /* ── Phase 1: dots fade in west → east (0 – 0.9s) ── */
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      const city = CANADA_CITIES[i];
      tl.fromTo(
        dot,
        { opacity: 0, scale: 0, transformOrigin: 'center' },
        {
          opacity: city.ontario ? 0.9 : 0.35,
          scale: 1,
          duration: 0.22,
          ease: 'back.out(1.6)',
        },
        i * 0.055, // stagger by city order (roughly west → east)
      );
    });

    /* ── Phase 2: Ontario rings pulse (0.9 – 1.6s) ── */
    const ontarioIndices = CANADA_CITIES
      .map((c, i) => (c.ontario ? i : -1))
      .filter(i => i >= 0);

    ontarioIndices.forEach((idx, j) => {
      const ring = ringsRef.current[idx];
      const city = CANADA_CITIES[idx];
      if (!ring) return;
      tl.fromTo(
        ring,
        { opacity: 0.6, scale: 1, transformOrigin: 'center' },
        {
          opacity: 0,
          scale: city.id === 'toronto' ? 4 : 2.8,
          duration: 0.9,
          ease: 'power2.out',
          repeat: 1,
        },
        0.85 + j * 0.06,
      );
    });

    /* ── Phase 3: brand text fades up (1.4 – 2.0s) ── */
    tl.fromTo(
      brandRef.current,
      { opacity: 0, y: 18, clipPath: 'inset(0 0 100% 0)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.7,
        ease: 'power3.out',
      },
      1.4,
    );
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      1.75,
    );

    /* ── Hold 0.3s then fade out ── */
    tl.to({}, { duration: 0.3 }, 2.1);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#1A2222]"
    >
      {/* Subtle gold radial at top-left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 20%, rgba(139,118,76,0.07), transparent)',
        }}
      />

      {/* SVG dot map — full bleed */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {CANADA_CITIES.map((city, i) => (
          <g key={city.id}>
            {/* Pulse ring (starts hidden, animated by GSAP) */}
            <circle
              ref={el => { ringsRef.current[i] = el; }}
              cx={city.x}
              cy={city.y}
              r={city.r}
              fill="none"
              stroke={city.ontario ? '#8B764C' : 'rgba(255,255,255,0.3)'}
              strokeWidth={city.ontario ? 0.3 : 0.2}
              opacity={0}
            />
            {/* Core dot */}
            <circle
              ref={el => { dotsRef.current[i] = el; }}
              cx={city.x}
              cy={city.y}
              r={city.ontario ? city.r * 0.5 : city.r * 0.4}
              fill={city.ontario ? '#8B764C' : 'white'}
              opacity={0}
            />
          </g>
        ))}

        {/* Faint connection lines within Ontario */}
        {[
          ['windsor','london'], ['london','kitchener'], ['kitchener','hamilton'],
          ['hamilton','toronto'], ['toronto','oshawa'], ['oshawa','belleville'],
        ].map(([a, b]) => {
          const ca = CANADA_CITIES.find(c => c.id === a)!;
          const cb = CANADA_CITIES.find(c => c.id === b)!;
          return (
            <line
              key={`${a}-${b}`}
              x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y}
              stroke="rgba(139,118,76,0.12)"
              strokeWidth="0.15"
            />
          );
        })}
      </svg>

      {/* Brand text — centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={brandRef} className="text-center" style={{ opacity: 0 }}>
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.5em] text-[#AB9D82]">
            Ontario · Canada
          </p>
          <h1
            className="font-serif text-2xl font-light leading-tight tracking-[-0.03em] text-white md:text-3xl"
          >
            Staffing Solutions
          </h1>
          <div
            className="mx-auto mt-1 h-px w-16"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(139,118,76,0.6), transparent)',
            }}
          />
        </div>
        <p
          ref={subtitleRef}
          className="mt-3 text-[9px] font-bold uppercase tracking-[0.35em] text-white/30"
          style={{ opacity: 0 }}
        >
          by Sarah Fell, Inc.
        </p>
      </div>
    </div>
  );
}
