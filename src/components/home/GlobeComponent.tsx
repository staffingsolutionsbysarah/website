'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const pings = [
  { lat: 43.6532, lng: -79.3832, label: 'Toronto' },
  { lat: 43.2557, lng: -79.8711, label: 'Hamilton' },
  { lat: 43.4516, lng: -80.4925, label: 'Kitchener' },
  { lat: 42.9849, lng: -81.2453, label: 'London' },
  { lat: 45.4215, lng: -75.6972, label: 'Ottawa' },
  { lat: 44.1628, lng: -77.3832, label: 'Belleville' },
  { lat: 43.8971, lng: -78.8658, label: 'Oshawa' },
  { lat: 42.3149, lng: -83.0364, label: 'Windsor' },
];

export default function GlobeComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !globeEl.current) return;
    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5;
    controls.enableZoom = false;
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      ringsData={pings}
      ringColor={() => '#C6A64A'}
      ringMaxRadius={3}
      ringPropagationSpeed={2}
      ringRepeatPeriod={800}
    />
  );
}
