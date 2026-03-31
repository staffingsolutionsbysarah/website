'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'sf-intro-seen-v2';
const INTRO_HOLD_MS = 1820;
const INTRO_EXIT_MS = 2360;

const MOBILE_MARK = { width: 186, height: 328 };
const DESKTOP_MARK = { width: 268, height: 472 };
const DISTORT_FILTER_ID = 'intro-snake-distort';
const DISTORT_MAP_ID = 'intro-snake-map';

type MotionTarget = {
  x: number;
  y: number;
  scale: number;
};

export default function IntroOverlay() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [brandTarget, setBrandTarget] = useState<MotionTarget>({ x: 0, y: 0, scale: 0.1 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = window.localStorage.getItem(STORAGE_KEY);

    if (shouldReduceMotion || seen === 'true') {
      return;
    }

    const syncGeometry = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const mark = isMobile ? MOBILE_MARK : DESKTOP_MARK;
      const anchor = document.querySelector<HTMLElement>('[data-brand-logo]');
      const fallbackTarget = {
        x: -Math.round(width / 2) + (isMobile ? 102 : 148),
        y: -Math.round(height / 2) + (isMobile ? 76 : 92),
        scale: isMobile ? 0.13 : 0.1,
      };

      setViewport({ width, height });

      if (!anchor) {
        setBrandTarget(fallbackTarget);
        return;
      }

      const rect = anchor.getBoundingClientRect();

      setBrandTarget({
        x: rect.left + rect.width / 2 - width / 2,
        y: rect.top + rect.height / 2 - height / 2,
        scale: Math.max(0.08, Math.min(0.22, (rect.width / mark.width) * 1.06)),
      });
    };

    const frame = window.requestAnimationFrame(() => {
      syncGeometry();
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    });
    window.addEventListener('resize', syncGeometry);

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, INTRO_HOLD_MS);

    const cleanupTimer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, 'true');
      document.body.style.overflow = '';
      setIsVisible(false);
    }, INTRO_HOLD_MS + INTRO_EXIT_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(cleanupTimer);
      window.removeEventListener('resize', syncGeometry);
      document.body.style.overflow = '';
    };
  }, [shouldReduceMotion]);

  const markSize = useMemo(() => {
    if (!viewport.width) {
      return DESKTOP_MARK;
    }

    return viewport.width < 768 ? MOBILE_MARK : DESKTOP_MARK;
  }, [viewport.width]);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: isExiting ? 1.56 : 0 }}
        className="pointer-events-auto fixed inset-0 z-[120] overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={isExiting ? { y: '-108%' } : { y: '0%' }}
          transition={{ duration: 1.55, ease: [0.65, 0, 0.2, 1] }}
          className="absolute inset-x-0 top-0 h-[51%] bg-[linear-gradient(180deg,#f1e6cf_0%,#eddcbe_100%)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.34),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.08),transparent_42%)]" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={false}
          animate={isExiting ? { y: '108%' } : { y: '0%' }}
          transition={{ duration: 1.55, ease: [0.65, 0, 0.2, 1] }}
          className="absolute inset-x-0 bottom-0 h-[51%] bg-[linear-gradient(180deg,#eddcbe_0%,#f4e8d5_100%)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_68%,rgba(255,255,255,0.28),transparent_26%),linear-gradient(90deg,transparent_58%,rgba(255,255,255,0.08)_100%)]" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={false}
          animate={isExiting ? { opacity: 0, scaleX: 1.06 } : { opacity: 0.14, scaleX: 1 }}
          transition={{ duration: 0.95, ease: [0.33, 1, 0.68, 1] }}
          className="absolute left-1/2 top-1/2 h-px w-[min(34vw,240px)] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(12,107,82,0)_0%,rgba(12,107,82,0.12)_18%,rgba(12,107,82,0.24)_50%,rgba(12,107,82,0.12)_82%,rgba(12,107,82,0)_100%)]"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: `${markSize.width}px`,
              height: `${markSize.height}px`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 2, filter: 'blur(6px)' }}
              animate={
                isExiting
                  ? {
                      opacity: [1, 1, 0.96, 0.92],
                      x: [0, 4, -3, brandTarget.x],
                      y: [0, -3, 2, brandTarget.y],
                      scale: [1, 1.004, 0.998, brandTarget.scale],
                      rotate: [0, 0.18, -0.12, 0],
                      filter: 'blur(0px)',
                    }
                  : {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                      filter: 'blur(0px)',
                    }
              }
              transition={{
                duration: isExiting ? 1.92 : 1.18,
                delay: isExiting ? 0.1 : 0.06,
                times: isExiting ? [0, 0.26, 0.54, 1] : undefined,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 will-change-transform"
            >
              <svg
                viewBox={`0 0 ${markSize.width} ${markSize.height}`}
                className="h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <filter id={DISTORT_FILTER_ID} x="-16%" y="-16%" width="132%" height="132%">
                    <feImage href="/brand/intro-displace-map.png" result={DISTORT_MAP_ID} preserveAspectRatio="none" />
                    <feDisplacementMap in="SourceGraphic" in2={DISTORT_MAP_ID} scale="0" xChannelSelector="R" yChannelSelector="G">
                      <animate
                        attributeName="scale"
                        dur="2.35s"
                        values="0;0;11;15;7;0"
                        keyTimes="0;0.16;0.38;0.58;0.8;1"
                        calcMode="spline"
                        keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
                        fill="freeze"
                      />
                    </feDisplacementMap>
                  </filter>
                </defs>

                <image
                  href="/brand/sarah-crest-thin-charcoal.png"
                  width={markSize.width}
                  height={markSize.height}
                  preserveAspectRatio="xMidYMid meet"
                  filter={`url(#${DISTORT_FILTER_ID})`}
                />
              </svg>
            </motion.div>

            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scaleX: 0.92, scaleY: 0.86 }}
              animate={isExiting ? { opacity: 0, scaleX: 1.03, scaleY: 0.97 } : { opacity: 0.1, scaleX: 1, scaleY: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-[-10px] inset-y-[20%] rounded-[999px] bg-[radial-gradient(circle,rgba(12,107,82,0.08)_0%,rgba(12,107,82,0.025)_42%,rgba(12,107,82,0)_72%)] blur-[10px]"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
