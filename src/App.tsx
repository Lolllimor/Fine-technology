import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

export default function App() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const effect = NET({
      el: vantaRef.current!,
      THREE,
      mouseControls: true,
      touchControls: true,
      color: 0x9333ea, // purple net
      backgroundColor: 0x000000,
    });
    return () => effect.destroy();
  }, []);

  return (
    <section
      ref={vantaRef}
      className="h-screen w-screen flex items-center justify-center"
    >
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          IDRIS IBIKUNLE OLORUNNIMBE
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-300">
          Something exciting is coming soon
        </p>
      </div>
    </section>
  );
}
