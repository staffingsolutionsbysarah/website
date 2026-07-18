'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { Box3, Vector3, Mesh, MeshStandardMaterial, MathUtils, type Group } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { jobs } from '@/data/jobs';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-story hero. The section pins for 300vh while scroll scrubs a
 * choreographed timeline: the machined part rotates on a turntable and
 * travels across the stage, headline acts move at parallax depths, and
 * the blueprint floor drifts beneath. Cursor adds a live parallax layer
 * on top of whatever the scroll has staged.
 */

// mutable channel between the DOM scroll timeline and the R3F scene
type StageState = {
  scroll: number; // 0..1 scrub progress through the pinned story
  mouseX: number; // -1..1
  mouseY: number; // -1..1
};

function MachinedPart({ stage }: { stage: StageState }) {
  const groupRef = useRef<Group>(null);
  const innerRef = useRef<Group>(null);
  const gltf = useGLTF('/3d/industrial-part-1/scene.gltf');
  const { viewport } = useThree();
  const wide = viewport.width > 4.2;

  // Sketchfab node chain offsets/scales the mesh — normalize to origin, steel material
  useEffect(() => {
    if (!innerRef.current) return;
    const box = new Box3().setFromObject(gltf.scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 1.25 / maxDim;
    innerRef.current.scale.setScalar(s);
    innerRef.current.position.set(-center.x * s, -center.y * s, -center.z * s);

    gltf.scene.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.metalness = 0.85;
        obj.material.roughness = 0.34;
        obj.material.envMapIntensity = 1.1;
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const p = stage.scroll;

    // --- scroll choreography (three acts) ---
    // act 1 (0→.33): part right of stage, slow turntable
    // act 2 (.33→.66): travels to left, rolls to show the flange face
    // act 3 (.66→1): returns to center, settles lower, faces camera
    const act12 = MathUtils.smoothstep(p, 0.08, 0.4);
    const act23 = MathUtils.smoothstep(p, 0.55, 0.92);

    const baseX = wide ? 1.0 : 0;
    const x = MathUtils.lerp(MathUtils.lerp(baseX, -0.95, act12), 0, act23);
    const y = MathUtils.lerp(MathUtils.lerp(wide ? -0.12 : 0.35, 0.1, act12), -0.35, act23);
    const rotY = p * Math.PI * 2.2; // full turntable across the story
    const rotX = MathUtils.lerp(0.0, 0.45, act12) * (1 - act23) + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;

    // --- cursor parallax layered on top ---
    const mx = stage.mouseX * 0.16;
    const my = stage.mouseY * 0.1;

    g.position.x = MathUtils.damp(g.position.x, x + mx, 4, delta);
    g.position.y = MathUtils.damp(g.position.y, y - my, 4, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, rotY + stage.mouseX * 0.12, 6, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, rotX + stage.mouseY * 0.08, 6, delta);

    // breathe
    g.position.y += Math.sin(state.clock.elapsedTime * 0.6) * 0.012;
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

// Drafting-table floor: preloader's blueprint carried into the hero, drifting with scroll
function BlueprintFloor({ stage }: { stage: StageState }) {
  const tex = useTexture('/textures/blueprint-sheet.webp');
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = stage.scroll;
    ref.current.position.z = MathUtils.damp(ref.current.position.z, -0.4 + p * 1.2, 4, delta);
    ref.current.rotation.z = MathUtils.damp(ref.current.rotation.z, 0.08 + p * 0.22, 4, delta);
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0.08]} position={[0.4, -1.05, -0.4]}>
      <planeGeometry args={[7.2, 5.1]} />
      <meshBasicMaterial map={tex} transparent opacity={0.07} depthWrite={false} />
    </mesh>
  );
}

function Scene({ stage }: { stage: StageState }) {
  return (
    <>
      <ambientLight intensity={0.55} color="#e8e4d8" />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#C6A64A" />
      <directionalLight position={[-5, 3, -2]} intensity={0.55} color="#7fa08c" />
      <spotLight position={[-2, 5, 3]} angle={0.4} penumbra={1} intensity={3.2} color="#f5efe0" />
      <spotLight position={[2.5, -1, 4]} angle={0.5} penumbra={1} intensity={0.5} color="#C6A64A" />

      <MachinedPart stage={stage} />
      <BlueprintFloor stage={stage} />

      <ContactShadows position={[0.6, -1.02, 0]} opacity={0.45} scale={6} blur={2.8} far={1.4} />

      {/* local HDR environment — machined-steel reflections, no network fetch */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[5, 1.2, 1]} color="#f0ead8" />
        <Lightformer intensity={1.1} position={[-3, 1, -1]} rotation-y={Math.PI / 3} scale={[2, 3, 1]} color="#C6A64A" />
        <Lightformer intensity={0.5} position={[3, -1, 2]} rotation-y={-Math.PI / 4} scale={[3, 1, 1]} color="#7fa08c" />
        <Lightformer intensity={0.8} position={[0, -2, 3]} scale={[4, 0.8, 1]} color="#d8d2c0" />
      </Environment>
    </>
  );
}

// The three story acts shown as DOM overlays while the section is pinned.
// Copy from the Claude Design UI kit hero slides (employer / candidate / sectors).
const ACTS = [
  {
    eyebrow: 'Industrial · Skilled Trades · Ontario',
    lines: ['Precision hiring for', 'industry leaders', '& exceptional talent.'],
    body: 'Industrial, trades, and operations hiring handled with direct recruiter ownership, tighter shortlist logic, and less drag.',
    accent: 1,
  },
  {
    eyebrow: 'Find Work',
    lines: ['Your next role in', "Ontario's industrial core", 'starts here.'],
    body: 'We connect skilled professionals with employers who value technical fit, reliability, and long-term career growth.',
    accent: 1,
  },
  {
    eyebrow: 'Live Roles · Ontario',
    lines: ['The work is real.', 'Start here.'],
    body: '',
    accent: 1,
  },
] as const;

const SNEAK_JOBS = jobs.filter((j) => j.active && j.public).slice(0, 3);

export default function HeroMachinedStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<StageState>({ scroll: 0, mouseX: 0, mouseY: 0 });
  const actRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // cursor parallax feed
  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: PointerEvent) => {
      stageRef.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stageRef.current.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [prefersReducedMotion]);

  // pinned scroll story
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ONE master timeline owns the pin, the scrub, and every act tween —
      // positions are scroll fractions because total duration is padded to 1
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => { stageRef.current.scroll = self.progress; },
        },
      });

      const windows: [number, number][] = [
        [0.0, 0.3],
        [0.34, 0.62],
        [0.66, 1.0],
      ];

      actRefs.current.forEach((el, i) => {
        if (!el) return;
        const [a, b] = windows[i];
        const mid = (a + b) / 2;
        const lines = el.querySelectorAll('.act-line');

        if (i === 0) {
          master.set(lines, { y: 0, opacity: 1 }, 0);
        } else {
          master.set(el, { autoAlpha: 0 }, 0);
          master.to(el, { autoAlpha: 1, duration: 0.05 }, a);
          master.fromTo(
            lines,
            { y: 90, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02, duration: 0.08 },
            a,
          );
        }
        // parallax drift out: lines at different speeds
        lines.forEach((line, li) => {
          master.to(line, { y: -40 - li * 26, duration: b - mid }, mid);
        });
        if (i !== ACTS.length - 1) {
          master.to(el, { autoAlpha: 0, duration: 0.05 }, b - 0.05);
        }
      });

      // CTAs: present in act 1, hidden mid-story, back for the closing act
      if (ctaRef.current) {
        master.to(ctaRef.current, { autoAlpha: 0, y: 30, duration: 0.05 }, 0.26);
        master.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.8);
      }

      // pad to exactly 1 so position == scroll fraction
      master.to({}, { duration: 0.001 }, 0.999);
    });

    return () => ctx.revert();
  }, [mounted, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#1F2628]">
      {mounted && !prefersReducedMotion && (
        <Canvas
          camera={{ position: [0, 0, 3], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <Suspense fallback={null}>
            <Scene stage={stageRef.current} />
          </Suspense>
        </Canvas>
      )}

      {/* vignette + legibility gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: [
            'linear-gradient(90deg, rgba(30,38,34,0.82) 0%, rgba(30,38,34,0.35) 45%, rgba(30,38,34,0.05) 70%)',
            'radial-gradient(ellipse 80% 45% at 50% 100%, rgba(30,38,34,0.9) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(30,38,34,0.55) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* story acts */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[90rem] flex-col justify-center px-6 pt-24 pb-20 text-center md:px-12 md:text-left lg:px-20">
        <div className="relative min-h-[21rem] sm:min-h-[23rem] md:min-h-[27rem] lg:min-h-[31rem]">
          {ACTS.map((act, i) => (
            <div
              key={act.eyebrow}
              ref={(el) => { actRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{ visibility: i === 0 ? 'visible' : 'hidden' }}
            >
              <p className="act-line mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-[#E7D08A] md:mb-7">
                {act.eyebrow}
              </p>
              <h2
                className={`mx-auto max-w-[18ch] font-serif font-normal leading-[0.92] tracking-[-0.05em] text-white md:mx-0 ${
                  i === ACTS.length - 1 ? 'text-[clamp(2rem,4.2vw,3.8rem)]' : 'text-[clamp(2.6rem,6.5vw,6rem)]'
                }`}
                style={{ textWrap: 'balance' }}
              >
                {act.lines.map((line, li) => (
                  <span
                    key={line}
                    className={`act-line block ${li === act.accent ? 'text-[#C6A64A]' : ''}`}
                  >
                    {line}
                  </span>
                ))}
              </h2>
              {act.body && (
                <p className="act-line mx-auto mt-7 max-w-[44ch] font-sans text-[15px] leading-[1.65] text-white/70 md:mx-0 md:text-[17px]">
                  {act.body}
                </p>
              )}
              {i === ACTS.length - 1 && (
                <div className="mx-auto mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-3 md:mx-0">
                  {SNEAK_JOBS.map((job) => (
                    <Link
                      key={job.id}
                      href={job.href}
                      className="act-line group relative block overflow-hidden rounded-[20px] border border-white/10 p-5 text-left shadow-[0_8px_24px_-6px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]"
                      style={{ background: 'linear-gradient(150deg, #232a2c 0%, #1f2628 46%, #273032 100%)' }}
                    >
                      <span
                        className="pointer-events-none absolute inset-0"
                        style={{ background: 'radial-gradient(circle at top right, rgba(198,166,74,0.14), transparent 40%)' }}
                      />
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#E7D08A]">{job.type}</p>
                      <h3 className="mb-2 font-serif text-[22px] font-normal leading-[0.96] tracking-[-0.04em] text-white">
                        {job.title}
                      </h3>
                      <p className="mb-1 text-[12px] text-white/60">{job.location}</p>
                      {job.salary && <p className="text-[12px] font-medium text-[#C6A64A]">{job.salary}</p>}
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-white">
                        View
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center md:mt-12 md:justify-start"
        >
          <Link
            href="/book-a-call"
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1F2628] transition-all hover:-translate-y-px hover:border-[#E7D08A] hover:bg-[#E7D08A]"
          >
            Book a Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-all hover:-translate-y-px hover:border-[#C6A64A] hover:text-white"
          >
            View Jobs
            <span className="inline-block h-px w-6 bg-[#C6A64A]/50 transition-all group-hover:w-9 group-hover:bg-[#C6A64A]" />
          </Link>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:left-20 md:translate-x-0">
        <div className="flex items-center gap-3">
          <span className="block h-8 w-px bg-gradient-to-b from-[#C6A64A]/70 to-transparent" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">Scroll</span>
        </div>
      </div>

      {!mounted && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#1F2628]">
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
