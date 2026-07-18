'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// Rolling searches — slow to fast, brand lands last
const SEARCHES = [
  'temporary work', 'temp jobs', 'contract jobs', 'permanent jobs', 'jobs near me',
  'hiring now', 'staffing agencies', 'temp agencies', 'recruitment agencies',
  'employment agencies', 'talent solutions', 'workforce solutions', 'skilled trades jobs',
  'electrician jobs', '309A jobs', 'millwright jobs', 'warehouse jobs',
  'manufacturing jobs', 'production jobs', 'general labour jobs', 'unionized jobs',
  'jobs with benefits', 'day shift jobs', 'night shift jobs', 'weekend jobs',
  'industrial jobs', 'local jobs', 'high-paying jobs', 'licensed trades jobs',
  'apprenticeship jobs', 'reliable workers', 'temporary workers', 'contract workers',
  'skilled workers', 'qualified candidates', 'local talent', 'industrial staffing',
  'trades recruitment', 'permanent hiring', 'executive search', 'hard-to-fill roles',
  'payroll services', 'direct hire', 'workforce support', 'hiring solutions',
];
const FINAL = 'staffing solutions by Sarah';
// accelerating display time: readable start, blur-fast middle, snap to brand
function durFor(i: number): number {
  if (i === 0) return 0.7;
  if (i === 1) return 0.55;
  if (i === 2) return 0.45;
  return Math.max(0.1, 0.45 * Math.pow(0.8, i - 2));
}

export default function PreloaderSearch({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    sessionStorage.setItem('sf-preloader-seen', 'true');
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete,
    });
  }, [onComplete]);

  useEffect(() => {
    if (sessionStorage.getItem('sf-preloader-seen') === 'true') {
      doneRef.current = true;
      onComplete();
      return;
    }

    const word = wordRef.current;
    if (!word) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      word.textContent = FINAL;
      word.style.color = '#A8894E';
      const t = setTimeout(finish, 1200);
      return () => clearTimeout(t);
    }

    const tl = gsap.timeline({ onComplete: finish });

    // intro: pill rises in
    tl.fromTo(
      pillRef.current,
      { y: 26, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      0.15,
    );

    // rolling words: first few slide legibly, then raw rapid-fire swaps (search-montage blur)
    let at = 0.75;
    SEARCHES.forEach((text, i) => {
      const d = durFor(i);
      if (d >= 0.3) {
        tl.call(() => { word.textContent = text; }, undefined, at);
        tl.fromTo(
          word,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: Math.min(0.2, d * 0.5), ease: 'power2.out' },
          at,
        );
        tl.to(
          word,
          { y: -12, opacity: 0, duration: Math.min(0.16, d * 0.4), ease: 'power2.in' },
          at + d - Math.min(0.16, d * 0.4),
        );
      } else {
        // fast phase: hard swaps, word stays planted
        tl.call(() => {
          word.textContent = text;
          gsap.set(word, { y: 0, opacity: 1 });
        }, undefined, at);
      }
      at += d;
    });

    // brand lands: types on fast, settles gold, holds
    tl.call(() => {
      word.textContent = '';
      word.style.color = '#A8894E';
    }, undefined, at);
    tl.set(word, { y: 0, opacity: 1, filter: 'none' }, at);
    const chars = FINAL.length;
    const typeDur = 0.75;
    for (let c = 1; c <= chars; c++) {
      tl.call(() => { word.textContent = FINAL.slice(0, c); }, undefined, at + (typeDur * c) / chars);
    }
    // small settle pulse on the pill, then hold before fade
    tl.fromTo(
      pillRef.current,
      { scale: 1 },
      { scale: 1.015, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' },
      at + typeDur + 0.05,
    );
    tl.to({}, { duration: 0.7 }, at + typeDur + 0.3);

    return () => { tl.kill(); };
  }, [finish, onComplete]);

  return (
    <div
      ref={containerRef}
      onClick={finish}
      className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#1F2628] px-6"
      aria-label="Loading Staffing Solutions by Sarah"
      role="status"
    >
      {/* faint blueprint ghost keeps the industrial thread */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'url(/textures/blueprint-sheet.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* search pill */}
      <div
        ref={pillRef}
        className="relative flex w-full max-w-[620px] items-center rounded-full bg-[#F7F5F0] py-4 pl-7 pr-16 opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.45)] md:py-5 md:pl-9 md:pr-20"
      >
        <p className="flex min-w-0 items-baseline gap-[0.45em] whitespace-nowrap font-sans text-sm text-[#2C3434] md:text-lg">
          <span className="shrink-0 italic text-[#2C3434]/45">Searching for</span>
          <span ref={wordRef} className="inline-block min-w-0 truncate font-semibold" />
          <span className="caret-blink -ml-[0.2em] inline-block h-[1.15em] w-px shrink-0 translate-y-[0.15em] bg-[#2C3434]/70" />
        </p>

        {/* magnifier button */}
        <span className="absolute right-1.5 top-1/2 flex h-[calc(100%-12px)] -translate-y-1/2 items-center md:right-2">
          <span className="flex aspect-square h-full items-center justify-center rounded-full bg-[#2C3434]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F7F5F0" strokeWidth="2" strokeLinecap="round" className="h-[38%] w-[38%]">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </span>
        </span>
      </div>

      <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
        Click to skip
      </p>

      <style jsx>{`
        .caret-blink {
          animation: sf-caret 0.9s step-end infinite;
        }
        @keyframes sf-caret {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
