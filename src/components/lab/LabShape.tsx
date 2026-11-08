// src/components/lab/LabShape.tsx
// 3D custom GLB model loader per lab using @react-three/drei's useGLTF
// Models:
// SE: /models/uika-ti-se-loop.glb
// CSN: /models/uika-ti-csn-loop.glb
// GIT: /models/uika-ti-git-loop.glb
// KERIS: /models/uika-ti-keris-loop.glb

'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

type LabId = 'se' | 'csn' | 'git' | 'keris';

const modelPaths: Record<LabId, string> = {
  se: '/models/uika-ti-se-loop.glb',
  csn: '/models/uika-ti-csn-loop.glb',
  git: '/models/uika-ti-git-loop.glb',
  keris: '/models/uika-ti-keris-loop.glb',
};

function ModelItem({
  labId,
  accentColor,
}: {
  labId: LabId;
  accentColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPaths[labId]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Continuous smooth auto-rotation
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x += delta * 0.12;
    // Interactive mouse tilt with subtle damping (gentle response, no wide intrusion)
    groupRef.current.rotation.y += (mouse.x * 0.10 - groupRef.current.rotation.y) * delta * 1.2;
    groupRef.current.rotation.x += (mouse.y * 0.10 - groupRef.current.rotation.x) * delta * 1.2;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene.clone()} scale={1.15} />
      </Center>
    </group>
  );
}

// Preload all 4 models for instantaneous response
Object.values(modelPaths).forEach((path) => {
  useGLTF.preload(path);
});

interface LabShapeProps {
  labId: LabId;
  accentColor: string;
  height?: number;
}

export default function LabShape({ labId, accentColor, height = 300 }: LabShapeProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '360px',
        height,
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, -3]} intensity={1.2} color={accentColor} />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffffff" />
        <Suspense fallback={null}>
          <ModelItem labId={labId} accentColor={accentColor} />
        </Suspense>
      </Canvas>
    </div>
  );
}
