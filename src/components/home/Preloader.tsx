'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import GlobeComponent from './GlobeComponent';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
      onComplete: () => {
        sessionStorage.setItem('preloader-seen', 'true');
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1F2628]"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <GlobeComponent />
      </div>
      <div className="absolute bottom-10 right-10 md:bottom-12 md:right-12 flex items-end overflow-hidden">
        <span className="font-serif text-7xl font-light leading-none text-[#C6A64A] drop-shadow-lg md:text-9xl">
          {progress}
        </span>
        <span className="mb-2 ml-1 text-xl text-[#C6A64A]/60 drop-shadow-lg md:text-2xl">%</span>
      </div>
    </div>
  );
}
