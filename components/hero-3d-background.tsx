'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRightRef = useRef<THREE.Mesh>(null!);
  const meshLeftRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRightRef.current) {
      meshRightRef.current.rotation.x += delta * 0.15;
      meshRightRef.current.rotation.y += delta * 0.2;
    }
    if (meshLeftRef.current) {
      meshLeftRef.current.rotation.x -= delta * 0.12;
      meshLeftRef.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
      {/* Outer Right Wireframe */}
      <mesh ref={meshRightRef} position={[5.2, 0.2, -3]}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          wireframe
          color="#EE461F"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Outer Left Wireframe */}
      <mesh ref={meshLeftRef} position={[-5.2, -0.4, -3.2]}>
        <torusGeometry args={[1.5, 0.35, 16, 45]} />
        <meshStandardMaterial
          wireframe
          color="#1433D1"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.18}
        />
      </mesh>
    </Float>
  );
}

export function Hero3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 6, 4]} intensity={1.2} color="#EE461F" />
        <directionalLight position={[-6, -4, -2]} intensity={0.9} color="#1433D1" />

        {/* Ambient 3D Geometric Accents on the sides */}
        <FloatingGeometry />

        {/* Multi-layered Soft Circular Sparkles */}
        {/* Layer 1: Brand Orange Sparkles */}
        <Sparkles
          count={85}
          scale={[18, 12, 8]}
          size={4}
          speed={0.45}
          color="#EE461F"
          opacity={0.75}
          noise={0.8}
        />

        {/* Layer 2: Royal Blue Sparkles */}
        <Sparkles
          count={75}
          scale={[18, 12, 8]}
          size={3.5}
          speed={0.35}
          color="#1433D1"
          opacity={0.65}
          noise={0.9}
        />

        {/* Layer 3: Warm Golden Accent Sparkles */}
        <Sparkles
          count={45}
          scale={[16, 10, 6]}
          size={2.8}
          speed={0.25}
          color="#F97316"
          opacity={0.6}
          noise={0.6}
        />
      </Canvas>
    </div>
  );
}

export default Hero3DBackground;
