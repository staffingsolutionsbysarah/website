'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

/* ─── Ontario / Canada city coordinates mapped to canvas % ──── */
const CITIES = [
  { x: 0.622, y: 0.545, label: 'Toronto',        size: 3.5, gold: true  },
  { x: 0.606, y: 0.558, label: 'Hamilton',        size: 2.5, gold: true  },
  { x: 0.598, y: 0.548, label: 'Mississauga',     size: 2,   gold: true  },
  { x: 0.614, y: 0.534, label: 'Markham',         size: 1.8, gold: false },
  { x: 0.589, y: 0.543, label: 'Oakville',        size: 1.8, gold: false },
  { x: 0.578, y: 0.561, label: 'Kitchener',       size: 2.2, gold: true  },
  { x: 0.551, y: 0.564, label: 'London',          size: 2.2, gold: false },
  { x: 0.519, y: 0.572, label: 'Windsor',         size: 2,   gold: false },
  { x: 0.648, y: 0.530, label: 'Oshawa',          size: 1.8, gold: false },
  { x: 0.661, y: 0.514, label: 'Belleville',      size: 1.6, gold: false },
  { x: 0.700, y: 0.490, label: 'Ottawa',          size: 2.2, gold: false },
  // Western Canada
  { x: 0.258, y: 0.518, label: 'Vancouver',       size: 2,   gold: false },
  { x: 0.394, y: 0.540, label: 'Calgary',         size: 1.8, gold: false },
  { x: 0.420, y: 0.520, label: 'Edmonton',        size: 1.8, gold: false },
  // Eastern
  { x: 0.790, y: 0.490, label: 'Montreal',        size: 2,   gold: false },
  { x: 0.820, y: 0.510, label: 'Quebec City',     size: 1.6, gold: false },
  { x: 0.870, y: 0.520, label: 'Halifax',         size: 1.6, gold: false },
];

function OntarioCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const t         = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      t.current += 0.012;
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      /* subtle latitude grid lines */
      ctx.strokeStyle = 'rgba(139,118,76,0.04)';
      ctx.lineWidth   = 1;
      for (let i = 0; i < 6; i++) {
        const y = H * (0.3 + i * 0.08);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      /* connection lines between Ontario cities */
      const ontarioCities = CITIES.filter(c => c.gold);
      ctx.strokeStyle = 'rgba(139,118,76,0.08)';
      ctx.lineWidth   = 1;
      for (let i = 0; i < ontarioCities.length - 1; i++) {
        const a = ontarioCities[i];
        const b = ontarioCities[i + 1];
        ctx.beginPath();
        ctx.moveTo(a.x * W, a.y * H);
        ctx.lineTo(b.x * W, b.y * H);
        ctx.stroke();
      }

      /* draw each city */
      CITIES.forEach((city, idx) => {
        const cx = city.x * W;
        const cy = city.y * H;
        const phase = idx * 0.7;

        if (city.gold) {
          /* Ontario: animated gold pulse ring */
          const pulseScale = 1 + 0.6 * Math.abs(Math.sin(t.current + phase));
          const pulseAlpha = 0.25 * (1 - Math.abs(Math.sin(t.current + phase)));
          const ringR = city.size * 4 * pulseScale;
          const grad  = ctx.createRadialGradient(cx, cy, 0, cx, cy, ringR);
          grad.addColorStop(0,   `rgba(139,118,76,${pulseAlpha})`);
          grad.addColorStop(1,   'rgba(139,118,76,0)');
          ctx.beginPath();
          ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          /* solid gold dot */
          ctx.beginPath();
          ctx.arc(cx, cy, city.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139,118,76,${0.7 + 0.3 * Math.sin(t.current + phase)})`;
          ctx.fill();
        } else {
          /* Other cities: soft white dot, subtle breathe */
          const alpha = 0.2 + 0.08 * Math.sin(t.current * 0.5 + phase);
          ctx.beginPath();
          ctx.arc(cx, cy, city.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

export default function GlobeHero() {
  const router = useRouter();

  return (
    <section className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#2C3434]">

      {/* Animated Canada dots map */}
      <div className="absolute inset-0 z-0 opacity-70">
        <OntarioCanvas />
      </div>

      {/* Warm radial depth — gold at top-right, green at bottom-left */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#8B764C] opacity-[0.06] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#714E3C] opacity-[0.08] blur-[120px]" />
      </div>

      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(31,38,40,0.72) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.42em] text-[#AB9D82]"
          >
            Ontario-First Recruitment
          </motion.p>

          <h1
            className="font-serif text-4xl font-light leading-[0.92] tracking-[-0.04em] text-white md:text-5xl lg:text-[6rem]"
          >
            Recruitment built for
            <br />
            <span className="italic text-[#AB9D82]">the work that matters.</span>
          </h1>

          {/* Liquid-glass CTA panel */}
          <div className="relative mx-auto mt-8 w-full max-w-lg">
            <div
              className="liquid-glass relative z-20 mx-auto rounded-[2rem] px-6 py-8 md:px-10 md:py-10"
              style={{
                border:  '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow:
                  '0 0 0 1px rgba(139,118,76,0.08), 0 24px 64px rgba(0,0,0,0.3)',
              }}
            >
              <p className="mb-7 text-[15px] font-light leading-relaxed text-white/80">
                Industrial, trades, and operations hiring handled with direct recruiter
                ownership. We prioritize{' '}
                <span className="font-semibold text-[#AB9D82]">fit over volume.</span>
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <button
                  onClick={() => router.push('/book-a-call')}
                  className="btn-gold w-full py-3 sm:w-auto md:py-4"
                >
                  Book a Hiring Call
                </button>
                <button
                  onClick={() => router.push('/find-work')}
                  className="py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/64 transition-colors duration-180 hover:text-white"
                >
                  Find Work →
                </button>
              </div>
            </div>

            {/* Decorative blur orbs behind panel */}
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[#8B764C] opacity-20 blur-3xl" />
            <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-[#714E3C] opacity-25 blur-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/28 md:left-10">
        Scroll to explore
        <span className="h-px w-8 bg-white/20" />
      </div>

      {/* Bottom-right location tag */}
      <div className="pointer-events-none absolute bottom-8 right-6 text-[9px] font-bold uppercase tracking-[0.28em] text-[#8B764C]/50 md:right-10">
        Ontario · Canada
      </div>
    </section>
  );
}
