"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .cursor_point {
        width: 8px;
        height: 8px;
        background: #8B764C;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
      }
      .cursor_outer {
        width: 40px;
        height: 40px;
        border: 1px solid #8B764C;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease-out;
      }
      @media (max-width: 768px) {
        .cursor_point, .cursor_outer {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-[99] pointer-events-none overflow-hidden"
      style={{ transform: `translateY(${y.get()}px)` }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #8B764C 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}