'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Premium Shader for Taiko Glyph Face Gradient (Vibrant Pink/Magenta to Pure Silver-White)
const TaikoGradientShader = {
  vertexShader: `
    varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      vPos = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorA; // Vibrant Magenta Pink #FF007A
    uniform vec3 uColorB; // Pure Platinum White #FFFFFF
    uniform float uOpacity;
    varying vec3 vPos;
    varying vec3 vNormal;

    void main() {
      // Smooth diagonal gradient matching Image 1
      float gradFactor = clamp((vPos.x * 0.65 + vPos.y * 0.75 + 1.2) / 2.6, 0.0, 1.0);
      vec3 color = mix(uColorB, uColorA, gradFactor);
      
      // Specular rim reflection for sleek 3D glass/chrome feel
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
      rim = pow(rim, 2.5);
      color += vec3(rim * 0.22);

      gl_FragColor = vec4(color, uOpacity);
    }
  `,
};

// Premium Shader for Ethereum Line Gradient matching Image 2
const EthereumLineShader = {
  vertexShader: `
    varying vec3 vPos;
    void main() {
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorTop;
    uniform vec3 uColorBottom;
    uniform float uOpacity;
    varying vec3 vPos;

    void main() {
      float norm = clamp((vPos.y * 0.65 - vPos.x * 0.65 + 1.8) / 3.6, 0.0, 1.0);
      vec3 color = mix(uColorBottom, uColorTop, norm);
      gl_FragColor = vec4(color, uOpacity);
    }
  `,
};

// Generate Ultra-Sleek 3D Taiko Rounded Triangular Logo Geometry (Image 1)
function createTaikoLogoGeometry() {
  const shape = new THREE.Shape();

  const createRoundedTrianglePath = (cx: number, cy: number, size: number, radius: number, upsideDown = false) => {
    const path = new THREE.Path();
    const dir = upsideDown ? -1 : 1;
    const h = (Math.sqrt(3) / 2) * size * dir;
    const half = size / 2;

    const v1: [number, number] = [cx, cy + h * (2 / 3)];
    const v2: [number, number] = [cx + half, cy - h * (1 / 3)];
    const v3: [number, number] = [cx - half, cy - h * (1 / 3)];

    path.moveTo(v1[0], v1[1] - radius * dir);
    path.quadraticCurveTo(v1[0], v1[1], v1[0] + radius * 0.866, v1[1] - radius * 0.5 * dir);
    path.lineTo(v2[0] - radius * 0.866, v2[1] + radius * 0.5 * dir);
    path.quadraticCurveTo(v2[0], v2[1], v2[0] - radius * 0.866, v2[1] - radius * 0.5 * dir);
    path.lineTo(v3[0] + radius * 0.866, v3[1] - radius * 0.5 * dir);
    path.quadraticCurveTo(v3[0], v3[1], v3[0] + radius * 0.866, v3[1] + radius * 0.5 * dir);
    path.closePath();

    return path;
  };

  // Outer rounded triangle frame
  const outerPath = createRoundedTrianglePath(0, 0, 3.6, 0.48, false);
  shape.curves = outerPath.curves;

  // 1. Top triangle cutout
  const h1 = createRoundedTrianglePath(0, 0.75, 1.08, 0.16, false);
  shape.holes.push(h1);

  // 2. Bottom Left triangle cutout
  const h2 = createRoundedTrianglePath(-0.8, -0.58, 1.08, 0.16, false);
  shape.holes.push(h2);

  // 3. Bottom Right triangle cutout
  const h3 = createRoundedTrianglePath(0.8, -0.58, 1.08, 0.16, false);
  shape.holes.push(h3);

  // 4. Center Inverted triangle cutout
  const h4 = createRoundedTrianglePath(0, -0.24, 0.98, 0.14, true);
  shape.holes.push(h4);

  const extrudeSettings = {
    depth: 0.32,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: 0.09,
    bevelThickness: 0.09,
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  return geo;
}

// 1. Taiko 3D Logo Component (Image 1)
function TaikoGlyphMesh({ opacity = 1, scale = 1 }: { opacity?: number; scale?: number }) {
  const geometry = useMemo(() => createTaikoLogoGeometry(), []);

  const uniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color('#FF007A') }, // Vibrant Pink
      uColorB: { value: new THREE.Color('#FFFFFF') }, // Pure Platinum White
      uOpacity: { value: opacity },
    }),
    []
  );

  React.useEffect(() => {
    uniforms.uOpacity.value = opacity;
  }, [opacity, uniforms]);

  return (
    <group scale={scale}>
      <mesh geometry={geometry}>
        <shaderMaterial
          attach="material"
          vertexShader={TaikoGradientShader.vertexShader}
          fragmentShader={TaikoGradientShader.fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Outer subtle glowing edge contour */}
      <lineSegments>
        <wireframeGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial attach="material" color="#FF007A" transparent opacity={opacity * 0.35} />
      </lineSegments>
    </group>
  );
}

// 2. Ethereum 3D Wireframe Gem Component (Image 2)
function EthereumDiamondGem({ opacity = 1, scale = 1 }: { opacity?: number; scale?: number }) {
  const uniforms = useMemo(
    () => ({
      uColorTop: { value: new THREE.Color('#F1F5F9') }, // Silver White
      uColorBottom: { value: new THREE.Color('#FF007A') }, // Magenta Pink
      uOpacity: { value: opacity },
    }),
    []
  );

  React.useEffect(() => {
    uniforms.uOpacity.value = opacity;
  }, [opacity, uniforms]);

  const { lineGeometry, innerCoreLineGeo } = useMemo(() => {
    const topApex = [0, 2.2, 0];
    const p1 = [1.32, 0, 0];
    const p2 = [0, 0, 1.32];
    const p3 = [-1.32, 0, 0];
    const p4 = [0, 0, -1.32];
    const midLower = [0, -0.68, 0];
    const bottomApex = [0, -2.2, 0];

    const linePositions = [
      ...topApex, ...p1,
      ...topApex, ...p2,
      ...topApex, ...p3,
      ...topApex, ...p4,

      ...p1, ...p2,
      ...p2, ...p3,
      ...p3, ...p4,
      ...p4, ...p1,

      ...p1, ...midLower,
      ...p2, ...midLower,
      ...p3, ...midLower,
      ...p4, ...midLower,

      ...p1, ...bottomApex,
      ...p2, ...bottomApex,
      ...p3, ...bottomApex,
      ...p4, ...bottomApex,

      ...midLower, ...bottomApex,
    ];

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    const ip1 = [0.92, 0, 0];
    const ip2 = [0, 0, 0.92];
    const ip3 = [-0.92, 0, 0];
    const ip4 = [0, 0, -0.92];
    const itopApex = [0, 1.48, 0];
    const ibottomApex = [0, -1.48, 0];

    const innerPositions = [
      ...itopApex, ...ip1,
      ...itopApex, ...ip2,
      ...itopApex, ...ip3,
      ...itopApex, ...ip4,

      ...ip1, ...ip2,
      ...ip2, ...ip3,
      ...ip3, ...ip4,
      ...ip4, ...ip1,

      ...ibottomApex, ...ip1,
      ...ibottomApex, ...ip2,
      ...ibottomApex, ...ip3,
      ...ibottomApex, ...ip4,
    ];

    const ilGeo = new THREE.BufferGeometry();
    ilGeo.setAttribute('position', new THREE.Float32BufferAttribute(innerPositions, 3));

    return { lineGeometry: lGeo, innerCoreLineGeo: ilGeo };
  }, []);

  return (
    <group scale={scale}>
      <lineSegments geometry={lineGeometry}>
        <shaderMaterial
          attach="material"
          vertexShader={EthereumLineShader.vertexShader}
          fragmentShader={EthereumLineShader.fragmentShader}
          uniforms={uniforms}
          transparent
          linewidth={2}
        />
      </lineSegments>

      <lineSegments geometry={innerCoreLineGeo}>
        <lineBasicMaterial attach="material" color="#FF007A" transparent opacity={opacity * 0.45} />
      </lineSegments>
    </group>
  );
}

// 3. Drop-In Entrance Physics + Pause -> Fast 360 Spin & Swap Animation Engine
function DropInAndFastSpinSwapEngine() {
  const groupRef = useRef<THREE.Group>(null!);

  const [shapeState, setShapeState] = React.useState({
    taikoOpacity: 1,
    taikoScale: 1,
    ethOpacity: 0,
    ethScale: 0,
  });

  const dropYRef = useRef(4.8); // Starts high above (+4.8) for top drop-in entrance
  const timeRef = useRef(0);

  const HOLD_DURATION = 2.4;
  const SPIN_DURATION = 0.75;
  const TOTAL_CYCLE = HOLD_DURATION + SPIN_DURATION;

  useFrame((state, delta) => {
    // 1. Entrance Drop-In physics: Smoothly drop down from top (y: 4.8 -> 0.0)
    if (dropYRef.current > 0.005) {
      dropYRef.current = THREE.MathUtils.lerp(dropYRef.current, 0.0, delta * 3.8);
    } else {
      dropYRef.current = 0.0;
    }

    if (groupRef.current) {
      groupRef.current.position.y = dropYRef.current;
    }

    // 2. Only advance rotation time loop as shape settles into position
    if (dropYRef.current < 1.0) {
      timeRef.current += delta;
    }

    const currentTime = timeRef.current;
    const cycleIndex = Math.floor(currentTime / TOTAL_CYCLE);
    const localTime = currentTime % TOTAL_CYCLE;
    const isTaikoActive = cycleIndex % 2 === 0;

    let currentRotationY = cycleIndex * Math.PI * 2;

    if (localTime < HOLD_DURATION) {
      // Stationary Paused State
      if (isTaikoActive) {
        setShapeState({
          taikoOpacity: 1,
          taikoScale: 1,
          ethOpacity: 0,
          ethScale: 0,
        });
      } else {
        setShapeState({
          taikoOpacity: 0,
          taikoScale: 0,
          ethOpacity: 1,
          ethScale: 1,
        });
      }
    } else {
      // Fast 360 Spin & Swap State
      const spinProgress = (localTime - HOLD_DURATION) / SPIN_DURATION;
      const easedProgress = spinProgress < 0.5
        ? 4 * spinProgress * spinProgress * spinProgress
        : 1 - Math.pow(-2 * spinProgress + 2, 3) / 2;

      currentRotationY += easedProgress * Math.PI * 2;

      let swapFade = 0;
      if (spinProgress > 0.3 && spinProgress < 0.7) {
        swapFade = (spinProgress - 0.3) / 0.4;
      } else if (spinProgress >= 0.7) {
        swapFade = 1;
      }

      if (isTaikoActive) {
        setShapeState({
          taikoOpacity: 1 - swapFade,
          taikoScale: 1 - swapFade * 0.25,
          ethOpacity: swapFade,
          ethScale: 0.75 + swapFade * 0.25,
        });
      } else {
        setShapeState({
          taikoOpacity: swapFade,
          taikoScale: 0.75 + swapFade * 0.25,
          ethOpacity: 1 - swapFade,
          ethScale: 1 - swapFade * 0.25,
        });
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = currentRotationY;
    }
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* Shape 1: Ultra-Sleek Taiko Rounded Triangular Logo (Image 1) */}
      {shapeState.taikoOpacity > 0.001 && (
        <TaikoGlyphMesh opacity={shapeState.taikoOpacity} scale={shapeState.taikoScale} />
      )}

      {/* Shape 2: Crisp Ethereum Wireframe Diamond Gem (Image 2) */}
      {shapeState.ethOpacity > 0.001 && (
        <EthereumDiamondGem opacity={shapeState.ethOpacity} scale={shapeState.ethScale} />
      )}
    </group>
  );
}

// Continuous Falling Matrix Pixel Stream Particles
function FallingMatrixParticles({ count = 130 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    const colors = ['#FF007A', '#E6007A', '#A855F7', '#F59E0B', '#94A3B8', '#CBD5E1'];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6 - 2;
      const speed = 0.35 + Math.random() * 0.75;
      const scale = 0.04 + Math.random() * 0.05;
      const color = colors[Math.floor(Math.random() * colors.length)];

      temp.push({ x, y, z, speed, scale, color });
    }
    return temp;
  }, [count]);

  const colorArray = useMemo(() => {
    const array = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      const c = new THREE.Color(p.color);
      array[i * 3] = c.r;
      array[i * 3 + 1] = c.g;
      array[i * 3 + 2] = c.b;
    });
    return array;
  }, [particles, count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      p.y -= delta * p.speed * 2.2;
      if (p.y < -6) {
        p.y = 6;
      }
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1.6, 0.1]} />
      <meshBasicMaterial transparent opacity={0.75} />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}

const emptySubscribe = () => () => {};

export interface ThreeWireframeGradientShapeProps {
  className?: string;
  interactive?: boolean;
}

export function ThreeWireframeGradientShape({
  className = '',
  interactive = true,
}: ThreeWireframeGradientShapeProps) {
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div className={`w-full h-full min-h-[400px] bg-white flex items-center justify-center ${className}`}>
        <div className="w-10 h-10 border-4 border-[#FF007A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[420px] bg-transparent flex flex-col items-center justify-center ${className}`}>
      
      {/* 3D WebGL Canvas */}
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.6} color="#FFFFFF" />
          <directionalLight position={[-5, -5, -5]} intensity={1.1} color="#FF007A" />

          {/* Entrance Drop-In Physics + Pause & Fast Spin Swap Engine */}
          <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
            <DropInAndFastSpinSwapEngine />
          </Float>

          {/* Continuous Falling Matrix Pixel Stream Particles */}
          <FallingMatrixParticles count={140} />

          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.6}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Canvas>
      </div>

    </div>
  );
}

export default ThreeWireframeGradientShape;
