"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// --- 1. FRONT SIDE CERTIFICATE TEXTURE ---
function createFrontCertificateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background fill
    ctx.fillStyle = "rgba(16, 16, 22, 0.84)";
    ctx.fillRect(0, 0, 1024, 1440);

    // Radial Lighting Gradient
    const bgGrad = ctx.createRadialGradient(512, 450, 80, 512, 720, 850);
    bgGrad.addColorStop(0, "rgba(34, 34, 44, 0.45)");
    bgGrad.addColorStop(1, "rgba(10, 10, 14, 0.70)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1440);

    // Fine paper grain noise
    for (let i = 0; i < 28000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1440;
      const alpha = Math.random() * 0.04;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Inset border frame
    const pad = 36;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(pad, pad, 1024 - pad * 2, 1440 - pad * 2, 24);
    ctx.stroke();

    // Top Header - Company Logo & Tag
    ctx.font = "bold 58px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.fillText("AYYA TECH", 96, 145);

    // Orange Dot Accent
    const logoWidth = ctx.measureText("AYYA TECH").width;
    ctx.fillStyle = "#EE461F";
    ctx.beginPath();
    ctx.arc(96 + logoWidth + 12, 130, 8, 0, Math.PI * 2);
    ctx.fill();

    // Top Right Pill Badge
    ctx.fillStyle = "rgba(238, 70, 31, 0.18)";
    ctx.strokeStyle = "rgba(238, 70, 31, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(640, 95, 280, 50, 25);
    ctx.fill();
    ctx.stroke();

    ctx.font = "600 16px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("ENTERPRISE PROFILE 2026", 662, 127);

    // Main Headline
    ctx.font = "bold 52px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.fillText("Leading IT Consultancy", 96, 260);

    ctx.font = "bold 52px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("& Software Agency.", 96, 325);

    // Subtitle Paragraph
    ctx.font = "400 22px Inter, sans-serif";
    ctx.fillStyle = "rgba(190, 190, 205, 0.85)";
    ctx.fillText("Empowering enterprise clients with scalable cloud architecture,", 96, 395);
    ctx.fillText("custom AI systems, and high-performance full-stack applications.", 96, 430);

    // Capabilities Divider
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(96, 480);
    ctx.lineTo(928, 480);
    ctx.stroke();

    // Capability 01
    ctx.font = "bold 20px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("01. CLOUD ARCHITECTURE & MICROSERVICES", 96, 535);

    ctx.font = "400 19px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.85)";
    ctx.fillText("Enterprise AWS/GCP Kubernetes clusters, serverless pipelines, and low-code velocity.", 96, 570);

    // Capability 02
    ctx.font = "bold 20px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("02. AI SYSTEMS & AGENTIC WORKFLOWS", 96, 640);

    ctx.font = "400 19px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.85)";
    ctx.fillText("Custom LLMs, neural model integration, automated decision systems & RAG databases.", 96, 675);

    // Capability 03
    ctx.font = "bold 20px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("03. HIGH-PERFORMANCE WEB & MOBILE", 96, 745);

    ctx.font = "400 19px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.85)";
    ctx.fillText("Modern Next.js platforms with micro-animation velocity, zero-trust security & 99.9% uptime.", 96, 780);

    // Bottom Box - Official Stamp / Verification
    const boxY = 870;
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(96, boxY, 832, 380, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 24px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fillText("Official Excellence Verification", 136, boxY + 60);

    ctx.font = "400 19px Inter, sans-serif";
    ctx.fillStyle = "rgba(180, 180, 195, 0.8)";
    ctx.fillText("Certified by Ayya Tech senior architects team to guarantee high-throughput", 136, boxY + 105);
    ctx.fillText("scalability, zero-latency microservices, and industry-leading design.", 136, boxY + 138);

    // Signature Doodle
    ctx.strokeStyle = "rgba(238, 70, 31, 0.75)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(136, boxY + 240);
    ctx.bezierCurveTo(170, boxY + 215, 210, boxY + 265, 250, boxY + 225);
    ctx.bezierCurveTo(290, boxY + 195, 330, boxY + 255, 370, boxY + 220);
    ctx.bezierCurveTo(410, boxY + 200, 440, boxY + 240, 470, boxY + 225);
    ctx.stroke();

    ctx.font = "500 15px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillText("Chief Technology Architect", 136, boxY + 280);

    // Bottom Footer Logo & Flip Hint
    ctx.font = "bold 32px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fillText("AYYA TECH", 96, 1340);

    ctx.font = "600 18px Inter, sans-serif";
    ctx.fillStyle = "rgba(238, 70, 31, 0.9)";
    ctx.fillText("FLIP PAGE TO SEE BACK SIDE ↺", 620, 1340);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// --- 2. BACK SIDE CERTIFICATE TEXTURE ---
function createBackCertificateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background fill
    ctx.fillStyle = "rgba(14, 14, 18, 0.86)";
    ctx.fillRect(0, 0, 1024, 1440);

    // Radial Lighting Gradient
    const bgGrad = ctx.createRadialGradient(512, 500, 100, 512, 720, 850);
    bgGrad.addColorStop(0, "rgba(28, 28, 38, 0.45)");
    bgGrad.addColorStop(1, "rgba(8, 8, 12, 0.75)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1440);

    // Fine paper grain noise
    for (let i = 0; i < 28000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1440;
      const alpha = Math.random() * 0.04;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Inset border frame
    const pad = 36;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(pad, pad, 1024 - pad * 2, 1440 - pad * 2, 24);
    ctx.stroke();

    // Top Header
    ctx.font = "600 20px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("WHY ENTERPRISES CHOOSE US", 96, 120);

    ctx.font = "bold 52px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.fillText("Proven Delivery & Stats.", 96, 190);

    // 3 Key Stat Cards Grid
    const statY = 240;
    const cardWidth = 250;
    const cardHeight = 220;

    // Stat Card 1
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(96, statY, cardWidth, cardHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 56px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("1500+", 120, statY + 90);
    ctx.font = "600 17px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.9)";
    ctx.fillText("Enterprise Projects", 120, statY + 140);
    ctx.fillText("Shipped Globally", 120, statY + 168);

    // Stat Card 2
    ctx.beginPath();
    ctx.roundRect(386, statY, cardWidth, cardHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 56px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("99.9%", 410, statY + 90);
    ctx.font = "600 17px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.9)";
    ctx.fillText("Cloud Platform", 410, statY + 140);
    ctx.fillText("Uptime SLA", 410, statY + 168);

    // Stat Card 3
    ctx.beginPath();
    ctx.roundRect(676, statY, cardWidth, cardHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 56px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("24/7", 700, statY + 90);
    ctx.font = "600 17px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.9)";
    ctx.fillText("Senior Architect", 700, statY + 140);
    ctx.fillText("Support Team", 700, statY + 168);

    // Divider Line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.moveTo(96, 510);
    ctx.lineTo(928, 510);
    ctx.stroke();

    // Tech Stack List
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fillText("Technologies We Master", 96, 565);

    ctx.font = "600 20px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("Cloud & DevOps:", 96, 620);
    ctx.font = "400 20px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.85)";
    ctx.fillText("AWS · GCP · Azure · Kubernetes · Terraform · Docker", 270, 620);

    ctx.font = "600 20px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("AI & Intelligence:", 96, 675);
    ctx.font = "400 20px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.85)";
    ctx.fillText("OpenAI · PyTorch · TensorFlow · Vector DBs · LangChain", 270, 675);

    ctx.font = "600 20px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("Web & Mobile:", 96, 730);
    ctx.font = "400 20px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 230, 0.85)";
    ctx.fillText("Next.js · React · Node.js · GraphQL · iOS & Android", 270, 730);

    // Contact Box at Bottom
    const boxY = 820;
    ctx.fillStyle = "rgba(238, 70, 31, 0.08)";
    ctx.strokeStyle = "rgba(238, 70, 31, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(96, boxY, 832, 420, 20);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 32px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Ready to Scale Your Platform?", 140, boxY + 80);

    ctx.font = "400 21px Inter, sans-serif";
    ctx.fillStyle = "rgba(220, 220, 235, 0.85)";
    ctx.fillText("Get in touch with our senior tech architects to schedule a comprehensive", 140, boxY + 130);
    ctx.fillText("discovery call and code architecture review for your business.", 140, boxY + 165);

    // Direct Contact Badges
    ctx.font = "600 22px Inter, sans-serif";
    ctx.fillStyle = "#EE461F";
    ctx.fillText("EMAIL: hello@ayyatech.com", 140, boxY + 240);
    ctx.fillText("WEBSITE: www.ayyatech.com", 140, boxY + 285);

    // Bottom Footer
    ctx.font = "bold 32px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fillText("AYYA TECH", 96, 1340);

    ctx.font = "600 18px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("FRONT SIDE OVERVIEW ↺", 680, 1340);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function Nocturne3DPaperSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 2. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3.2, 25);
    pointLight.position.set(0, 0, 6);
    scene.add(pointLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(6, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x90a0ff, 0.9);
    dirLight2.position.set(-6, -6, 3);
    scene.add(dirLight2);

    // --- 3. Double-Sided 3D Paper Group ---
    const paperGroup = new THREE.Group();

    const planeWidth = 3.6;
    const planeHeight = 5.0;
    const segs = 64;

    // Front Side Mesh & Geometry
    const frontGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, segs, segs);
    const frontPosAttr = frontGeometry.attributes.position;
    const vertexCount = frontPosAttr.count;

    const initialPositionsFront = new Float32Array(frontPosAttr.array.length);
    initialPositionsFront.set(frontPosAttr.array);

    const frontTexture = createFrontCertificateTexture();
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      transparent: true,
      opacity: 0.85,
      roughness: 0.25,
      metalness: 0.05,
      side: THREE.FrontSide,
      shadowSide: THREE.FrontSide,
      depthWrite: false,
    });
    const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
    frontMesh.position.z = 0.003;
    paperGroup.add(frontMesh);

    // Back Side Mesh & Geometry
    const backGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, segs, segs);
    const backPosAttr = backGeometry.attributes.position;

    const backTexture = createBackCertificateTexture();
    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      transparent: true,
      opacity: 0.85,
      roughness: 0.25,
      metalness: 0.05,
      side: THREE.FrontSide,
      shadowSide: THREE.FrontSide,
      depthWrite: false,
    });
    const backMesh = new THREE.Mesh(backGeometry, backMaterial);
    backMesh.rotation.y = Math.PI; // Flipped 180 deg to face backwards
    backMesh.position.z = -0.003;
    paperGroup.add(backMesh);

    scene.add(paperGroup);

    // --- 4. Interactive Drag & Hover Physics ---
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0.08;
    let currentRotationY = -0.12;

    let targetLightX = 0;
    let targetLightY = 0;

    let isHovered = false;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerEnter = () => {
      isHovered = true;
    };

    const onPointerLeave = () => {
      isHovered = false;
      isDragging = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetLightX = normX * 4.5;
      targetLightY = normY * 3.5;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domTarget = container;
    domTarget.addEventListener("pointerenter", onPointerEnter);
    domTarget.addEventListener("pointerleave", onPointerLeave);
    domTarget.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // --- 5. Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- 6. Render Loop with Synchronized Paper Bending Math & Dynamic Hover Opacity ---
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth rotation lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      paperGroup.rotation.x = currentRotationX + Math.sin(time * 0.8) * 0.05;
      paperGroup.rotation.y = currentRotationY + Math.cos(time * 0.6) * 0.05;
      paperGroup.rotation.z = Math.sin(time * 0.4) * 0.03;

      // Smooth light position lerp
      pointLight.position.x += (targetLightX - pointLight.position.x) * 0.1;
      pointLight.position.y += (targetLightY - pointLight.position.y) * 0.1;

      // Hover opacity & lighting boost lerp
      const targetOpacity = isHovered ? 0.98 : 0.72;
      frontMaterial.opacity += (targetOpacity - frontMaterial.opacity) * 0.08;
      backMaterial.opacity += (targetOpacity - backMaterial.opacity) * 0.08;

      const targetLightIntensity = isHovered ? 4.2 : 2.5;
      pointLight.intensity += (targetLightIntensity - pointLight.intensity) * 0.08;

      // Synchronized corner flex deformation for both Front & Back meshes
      for (let i = 0; i < vertexCount; i++) {
        const ix = initialPositionsFront[i * 3];
        const iy = initialPositionsFront[i * 3 + 1];

        const distFromCenter = Math.sqrt(ix * ix + iy * iy);
        const bendWave = Math.sin(time * 1.5 + ix * 1.2 + iy * 0.8) * 0.18 * (distFromCenter / 2.5);
        const curlEdge = Math.cos(time * 1.0 + iy * 1.5) * 0.12 * Math.abs(ix / 1.8);

        const zVal = bendWave + curlEdge;
        frontPosAttr.setZ(i, zVal);
        backPosAttr.setZ(i, -zVal); // Inverted z for rotated back mesh
      }

      frontPosAttr.needsUpdate = true;
      backPosAttr.needsUpdate = true;
      frontGeometry.computeVertexNormals();
      backGeometry.computeVertexNormals();

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      domTarget.removeEventListener("pointerenter", onPointerEnter);
      domTarget.removeEventListener("pointerleave", onPointerLeave);
      domTarget.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      resizeObserver.disconnect();

      frontGeometry.dispose();
      backGeometry.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] bg-[#121216] overflow-hidden select-none border-t border-b border-[#222228] transition-colors duration-500"
    >
      {/* 1. Giant Background Word */}
      <div className="absolute inset-0 z-[1] overflow-hidden flex items-center justify-center pointer-events-none">
        <h1 className="font-sans font-extrabold tracking-[-0.055em] text-[clamp(64px,14vw,340px)] leading-[0.8] whitespace-nowrap text-[rgba(255,255,255,0.05)] select-none">
          AYYA TECH
        </h1>
      </div>

      {/* 2. DOF Blur overlay */}
      <div className="absolute -inset-[30px] z-[2] pointer-events-none backdrop-blur-[2px] bg-[rgba(0,0,0,0.12)]" />

      {/* 3. Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[3] block touch-none cursor-grab active:cursor-grabbing"
      />

      {/* 4. Film Grain Overlays */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.04] mix-blend-overlay bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.02] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* 5. Light Black Radial Vignette Overlay */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </section>
  );
}

export default Nocturne3DPaperSection;
