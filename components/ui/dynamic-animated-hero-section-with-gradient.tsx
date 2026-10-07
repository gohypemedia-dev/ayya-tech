"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

interface HeroSectionProps {
  onCtaClick?: () => void;
}

interface ServiceStage {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  startFrame: number;
  endFrame: number;
}

const serviceStages: ServiceStage[] = [
  {
    id: "01",
    tag: "STRATEGIC ADVISORY",
    title: "IT Consultancy & Digital Transformation",
    subtitle: "Enterprise Roadmaps • Legacy Modernization • CTO Advisory",
    startFrame: 1,
    endFrame: 40,
  },
  {
    id: "02",
    tag: "CUSTOM ENGINEERING",
    title: "Bespoke Full-Stack Software Development",
    subtitle: "Microservices Architecture • Scalable APIs • Clean Code Standards",
    startFrame: 41,
    endFrame: 80,
  },
  {
    id: "03",
    tag: "RAPID PLATFORMS",
    title: "Low-Code & No-Code Applications",
    subtitle: "Rapid MVP Builds • Webflow & Retool • Automated Logic Pipelines",
    startFrame: 81,
    endFrame: 120,
  },
  {
    id: "04",
    tag: "CLOUD & DEVOPS",
    title: "Cloud-Native Infrastructure & DevOps",
    subtitle: "AWS, Azure & Kubernetes • 99.99% Uptime • Infrastructure as Code",
    startFrame: 121,
    endFrame: 160,
  },
  {
    id: "05",
    tag: "CONNECTED SYSTEMS",
    title: "IoT & Smart Hardware Engineering",
    subtitle: "Sensor Telemetry • Edge Computing • Real-Time MQTT Streaming",
    startFrame: 161,
    endFrame: 200,
  },
  {
    id: "06",
    tag: "INTELLIGENT AUTOMATION",
    title: "AI-Powered Enterprise Software & RAG",
    subtitle: "Custom LLM Fine-Tuning • Autonomous AI Agents • Predictive Models",
    startFrame: 201,
    endFrame: 240,
  },
];

const TOTAL_FRAMES = 240;

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(1);

  // Raw Scroll Progress for Hero Section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth Physics Spring for Liquid Parallax Frame Scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.0001,
  });

  // Preload Frame Images into memory for instant 60fps responsiveness
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, "0");
      img.src = `/parallax_frames_hq/frame_${frameNum}.webp`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Render active WebP frame onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[currentFrame - 1];
    if (!img) return;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgWidth = img.naturalWidth || 1920;
      const imgHeight = img.naturalHeight || 1080;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        img.onload = () => {
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };
      }
    };

    render();

    const handleResize = () => render();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrame]);

  // Update current frame index live on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.max(Math.floor(latest * TOTAL_FRAMES) + 1, 1),
      TOTAL_FRAMES
    );
    if (frameIndex !== currentFrame) {
      setCurrentFrame(frameIndex);
    }
  });

  // Calculate Active Service Stage & Frame-wise Opacity Reveal
  const activeStageIndex = Math.min(
    Math.floor(((currentFrame - 1) / TOTAL_FRAMES) * serviceStages.length),
    serviceStages.length - 1
  );
  const activeStage = serviceStages[activeStageIndex];

  // Stage progress ratio (0 to 1) for the current stage
  const stageFrameRange = activeStage.endFrame - activeStage.startFrame;
  const stageProgress = Math.max(
    0,
    Math.min((currentFrame - activeStage.startFrame) / stageFrameRange, 1)
  );

  // Smooth gradual fade in and out between stages (Always 100% visible on initial stage / page load)
  let headingOpacity = 1;
  if (activeStageIndex === 0 && stageProgress < 0.8) {
    headingOpacity = 1;
  } else if (stageProgress < 0.2) {
    headingOpacity = Math.max(0.3, stageProgress / 0.2);
  } else if (stageProgress > 0.8) {
    headingOpacity = Math.max(0.3, (1 - stageProgress) / 0.2);
  }

  return (
    <div
      ref={targetRef}
      className="relative w-full h-[300vh] bg-[#080D2B] text-white selection:bg-[#EE461F] selection:text-white"
    >
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-10">
        
        {/* 1. SCROLL-TRIGGERED HIGH QUALITY PARALLAX FRAME SCRUBBER CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover object-center filter brightness-110 contrast-105"
          />

          {/* Fallback Image while Canvas Loads */}
          <img
            src={`/parallax_frames_hq/frame_${String(currentFrame).padStart(4, "0")}.webp`}
            alt="Parallax Frame Background"
            className="absolute inset-0 w-full h-full object-cover z-[-1] pointer-events-none filter brightness-110 contrast-105"
          />

          {/* Subtle Top & Bottom Gradient for Clear Contrast without darkening the frame */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#080D2B]/85 via-[#080D2B]/30 to-transparent z-0" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080D2B]/90 via-[#080D2B]/30 to-transparent z-0" />
        </div>

        {/* 2. FRAME-WISE SYNCHRONIZED SERVICE HEADING OVERLAY (FAR LEFT ALIGNED & BRIGHT) */}
        <div className="relative z-20 pointer-events-none flex-1 flex flex-col items-start justify-center text-left pl-6 sm:pl-10 lg:pl-14 pr-6 max-w-5xl w-full mr-auto my-auto select-none">
          {/* Dynamic Service Main Title */}
          <h1
            style={{
              opacity: headingOpacity,
              transform: `translateY(${(1 - headingOpacity) * 10}px)`,
            }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#EE461F] leading-none font-[family-name:var(--font-heading)] drop-shadow-[0_4px_25px_rgba(238,70,31,0.35)] max-w-4xl transition-all duration-150"
          >
            {activeStage.title}
          </h1>
        </div>

      </div>
    </div>
  );
}

export default HeroSection;

