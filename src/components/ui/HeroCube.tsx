// src/components/ui/HeroCube.tsx
// 3D WebGL cube — React Three Fiber
// Black BoxGeometry + EdgesGeometry wireframe in #292d30
// Slow auto-rotation + subtle mouse-tracking tilt
// Canvas background: transparent

'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

/** Inner rotating mesh — lives inside the Canvas context */
function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Track mouse position for tilt (normalized -1 to 1)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Slow base rotation
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.1;

    // Subtle mouse-tracking tilt (lerped for smoothness)
    meshRef.current.rotation.x +=
      (mouse.y * 0.15 - meshRef.current.rotation.x) * delta * 2;
    meshRef.current.rotation.y +=
      (mouse.x * 0.15 - meshRef.current.rotation.y) * delta * 2;
  });

  return (
    <mesh ref={meshRef}>
      {/* Black cube geometry */}
      <boxGeometry args={[2.4, 2.4, 2.4]} />
      {/* Void black surface — no color, just black */}
      <meshStandardMaterial
        color="#000000"
        roughness={1}
        metalness={0}
      />
      {/* Graphite hairline edges — the design detail */}
      <Edges
        threshold={15}
        color="#292d30"
        lineWidth={1}
      />
    </mesh>
  );
}

interface HeroCubeProps {
  width?: number | string;
  height?: number | string;
}

export default function HeroCube({ width = '100%', height = 480 }: HeroCubeProps) {
  return (
    <div
      style={{ width, height, flexShrink: 0 }}
      aria-hidden="true" /* decorative 3D element */
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          alpha: true,          /* transparent canvas background */
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} /* device pixel ratio for sharp rendering */
      >
        {/* Minimal lighting — ambient keeps it dark, point adds edge catch */}
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#292d30" />
        <pointLight position={[-5, -5, -5]} intensity={0.1} color="#ffffff" />

        <RotatingCube />
      </Canvas>
    </div>
  );
}
