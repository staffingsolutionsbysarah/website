'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface PartnershipIntroProps {
  onComplete?: () => void;
}

const DOT_COUNT = 140;

interface DotPosition {
  x: number;
  y: number;
}

const generateScatterPositions = (count: number, width: number, height: number): DotPosition[] => {
  const positions: DotPosition[] = [];
  const padding = 80;
  for (let i = 0; i < count; i++) {
    positions.push({
      x: padding + Math.random() * (width - padding * 2),
      y: padding + Math.random() * (height - padding * 2),
    });
  }
  return positions;
};

const generateHandshakePositions = (count: number, cx: number, cy: number): DotPosition[] => {
  const positions: DotPosition[] = [];
  const basePath = [
    { x: 20, y: 105 },
    { x: 32, y: 90 },
    { x: 48, y: 72 },
    { x: 62, y: 58 },
    { x: 78, y: 52 },
    { x: 92, y: 56 },
    { x: 100, y: 72 },
    { x: 94, y: 88 },
    { x: 82, y: 98 },
    { x: 68, y: 102 },
    { x: 54, y: 96 },
    { x: 42, y: 82 },
    { x: 30, y: 65 },
  ];

  const pathLen = basePath.length;
  const ptsPerSeg = Math.ceil(count / pathLen);

  for (let i = 0; i < count; i++) {
    const segIdx = Math.floor(i / ptsPerSeg);
    const t = (i % ptsPerSeg) / ptsPerSeg;
    const curr = basePath[segIdx];
    const next = basePath[(segIdx + 1) % pathLen];
    const x = curr.x + (next.x - curr.x) * t;
    const y = curr.y + (next.y - curr.y) * t;
    const jitter = 6;
    positions.push({
      x: cx + (x - 60) * 1.5 + (Math.random() - 0.5) * jitter,
      y: cy + (y - 78) * 1.5 + (Math.random() - 0.5) * jitter,
    });
  }

  return positions;
};

const generateLogoPositions = (
  count: number,
  width: number,
  height: number,
  isLeft: boolean
): DotPosition[] => {
  const positions: DotPosition[] = [];
  const leftText = 'TOP TIER';
  const rightText = 'SARAH FELL';
  const text = isLeft ? leftText : rightText;
  const cx = isLeft ? width * 0.32 : width * 0.68;
  const cy = height * 0.5;
  const lw = width * (isLeft ? 0.28 : 0.24);
  const lh = height * 0.14;
  const letterW = lw / text.length;
  const cols = text.length;
  const rows = Math.ceil(count / cols);

  let dotIdx = 0;
  for (let r = 0; r < rows && dotIdx < count; r++) {
    for (let c = 0; c < cols && dotIdx < count; c++) {
      const letterX = cx - lw / 2 + c * letterW + letterW / 2;
      const letterY = cy - lh / 2 + r * (lh / rows) + (lh / rows) / 2;
      positions.push({
        x: letterX + (Math.random() - 0.5) * letterW * 0.6,
        y: letterY + (Math.random() - 0.5) * (lh / rows) * 0.6,
      });
      dotIdx++;
    }
  }

  return positions;
};

export default function PartnershipIntro({ onComplete }: PartnershipIntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [viewport, setViewport] = useState({ width: 1024, height: 768 });
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [isExiting, setIsExiting] = useState(false);
  const [show, setShow] = useState(true);

  const scatter = useMemo(
    () => generateScatterPositions(DOT_COUNT, viewport.width, viewport.height),
    [viewport.width, viewport.height]
  );

  const handshake = useMemo(
    () => generateHandshakePositions(DOT_COUNT, viewport.width / 2, viewport.height / 2),
    [viewport]
  );

  const logos = useMemo(
    () => [
      ...generateLogoPositions(Math.floor(DOT_COUNT / 2), viewport.width, viewport.height, true),
      ...generateLogoPositions(Math.floor(DOT_COUNT / 2), viewport.width, viewport.height, false),
    ],
    [viewport]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setViewport({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase(1);
      setTimeout(() => setPhase(2), 600);
      setTimeout(() => setIsExiting(true), 1200);
      setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 1600);
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 300 + 1000 + 800);
    const t3 = setTimeout(() => setIsExiting(true), 300 + 1000 + 800 + 1000 + 500);
    const t4 = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [shouldReduceMotion, onComplete]);

  if (!show) return null;

  const getPositions = () => {
    if (phase === 0) return scatter;
    if (phase === 1) return handshake;
    return logos;
  };

  const positions = getPositions();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden bg-white"
    >
      {positions.map((pos, i) => {
        const prevPositions =
          phase === 0 ? scatter : phase === 1 ? handshake : logos;
        const startPos = prevPositions[i] || scatter[i] || pos;

        return (
          <motion.div
            key={i}
            initial={{
              x: startPos.x,
              y: startPos.y,
              scale: phase === 0 ? 0 : 1,
              opacity: phase === 0 ? 0 : 1,
            }}
            animate={{
              x: pos.x,
              y: pos.y,
              opacity: isExiting ? 0 : 1,
            }}
            transition={{
              duration: phase === 0 ? 0.9 : phase === 1 ? 1.2 : 1,
              ease: [0.22, 1, 0.36, 1],
              delay: phase === 0 ? i * 0.003 : 0,
            }}
            className="absolute h-2 w-2 rounded-full bg-black"
            style={{
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}

      {phase === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-x-0 bottom-[18%] flex justify-center gap-20"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/45">
            Top Tier Talent Group
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/45">
            Sarah Fell
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}