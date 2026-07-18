'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PreloaderMachined({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const partRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('sf-preloader-seen') === 'true') {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('sf-preloader-seen', 'true');
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.fromTo(
      partRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'power3.out' },
      0.2,
    );

    tl.fromTo(
      blueprintRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 0.15, scale: 1, duration: 1, ease: 'power2.out' },
      0.4,
    );

    tl.fromTo(
      brandRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      1.2,
    );

    tl.to({}, { duration: 0.5 }, 2.0);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#1E2622]"
    >
      <div
        ref={blueprintRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage: 'url(/textures/blueprint-sheet.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
        }}
      />

      <div
        ref={partRef}
        className="relative mb-8 flex items-center justify-center opacity-0"
        style={{ width: 120, height: 120 }}
      >
        <div className="h-full w-full rounded-sm border border-white/10 bg-gradient-to-br from-[#2A3632] to-[#1E2622]" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(198,166,74,0.15), transparent 70%)',
          }}
        />
      </div>

      <div ref={brandRef} className="text-center opacity-0">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.5em] text-[#C6A64A]/60">
          Precision · Engineered
        </p>
        <h1 className="font-serif text-2xl font-light tracking-[-0.03em] text-white md:text-3xl">
          Staffing Solutions
        </h1>
        <div
          className="mx-auto mt-2 h-px w-16"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(198,166,74,0.5), transparent)',
          }}
        />
        <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.4em] text-white/25">
          by Sarah Fell
        </p>
      </div>
    </div>
  );
}
