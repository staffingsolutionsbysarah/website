'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows, Float } from '@react-three/drei';
import { type Group } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

function MachinedPart({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF('/3d/industrial-part-1/scene.gltf');

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
      groupRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.05;
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        y: -1.5,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=60%',
          scrub: 0.5,
        },
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.2, 0]} scale={0.6}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function BlueprintPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial
        color="#1E2622"
        transparent
        opacity={0.3}
        wireframe={false}
      />
    </mesh>
  );
}

function Scene({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [scrollProgress] = useState(0);

  if (prefersReducedMotion) return null;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#C6A64A" />
      <directionalLight position={[-3, 5, -3]} intensity={0.3} color="#4A6A58" />
      <spotLight position={[0, 5, 2]} angle={0.3} penumbra={1} intensity={0.8} color="#C6A64A" />

      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <MachinedPart scrollProgress={scrollProgress} />
      </Float>

      <BlueprintPlane />

      <ContactShadows
        position={[0, -0.6, 0]}
        opacity={0.5}
        scale={5}
        blur={2.5}
        far={1}
      />
    </>
  );
}

export default function HeroMachinedStage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const lines = headlineRef.current?.querySelectorAll('.line');
      const ctas = ctaRef.current?.querySelectorAll('.cta-item');

      if (lines?.length) {
        tl.fromTo(
          lines,
          { y: 60, opacity: 0, rotateX: -15 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15 },
          0.3,
        );
      }

      if (ctas?.length) {
        tl.fromTo(
          ctas,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          0.8,
        );
      }
    });

    return () => ctx.revert();
  }, [mounted, prefersReducedMotion]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1E2622]">
      {mounted && !prefersReducedMotion && (
        <Canvas
          camera={{ position: [0, 0, 3], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <Scene prefersReducedMotion={false} />
        </Canvas>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: [
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(30,38,34,0.85) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 30% at 50% 0%, rgba(30,38,34,0.4) 0%, transparent 70%)',
            'rgba(30,38,34,0.3)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          ref={headlineRef}
          className="max-w-5xl font-serif text-4xl font-light leading-[1.08] tracking-[-0.03em] text-white md:text-5xl lg:text-[3.8rem]"
        >
          <span className="line inline-block">Precision hiring for</span>{' '}
          <span className="line inline-block" style={{ color: '#C6A64A' }}>industry leaders</span>{' '}
          <span className="line inline-block">& exceptional talent.</span>
        </h1>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/book-a-call"
            className="cta-item inline-flex items-center gap-2 rounded-none border border-[#C6A64A] bg-[#C6A64A] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1E2622] transition-colors hover:bg-transparent hover:text-[#C6A64A]"
          >
            Book a Call
          </Link>
          <Link
            href="/jobs"
            className="cta-item py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            View Jobs
          </Link>
        </div>
      </div>

      {!mounted && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#1E2622]">
          <div
            className="h-24 w-24 rounded-full border border-white/10"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(198,166,74,0.1), transparent 70%)',
            }}
          />
        </div>
      )}
    </section>
  );
}
