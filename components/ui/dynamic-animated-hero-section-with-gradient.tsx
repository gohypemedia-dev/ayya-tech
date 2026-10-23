"use client";

import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 240;
const serviceTitles = [
  "IT Consultancy & Digital Transformation",
  "Bespoke Full-Stack Software Development",
  "Low-Code & No-Code Applications",
  "Cloud-Native Infrastructure & DevOps",
  "IoT & Smart Hardware Engineering",
  "AI-Powered Enterprise Software & RAG",
];

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  // Raw Scroll Progress for Hero Section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth Physics Spring for Liquid Parallax Frame Scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 38,
    restDelta: 0.0001,
  });

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const frame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
    setActiveStage(Math.min(serviceTitles.length - 1, Math.floor((frame - 1) / 40)));
  });

  // Keep a small window decoded: the full sequence would use ~2 GB of memory.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = new Map<number, HTMLImageElement>();
    const loading = new Set<number>();
    const failed = new Set<number>();
    let queue: number[] = [];
    let active = true;
    let requestedFrame = 1;
    let lastDrawn: HTMLImageElement | undefined;
    let animationFrame = 0;

    const draw = (img: HTMLImageElement) => {
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const width = img.naturalWidth * scale;
      const height = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      lastDrawn = img;
    };

    const render = () => {
      animationFrame = 0;
      // Keep moving with the closest decoded frame while the exact one loads.
      let nearest = requestedFrame;
      if (!images.has(nearest)) {
        for (const frame of images.keys()) {
          if (!images.has(nearest) || Math.abs(frame - requestedFrame) < Math.abs(nearest - requestedFrame)) nearest = frame;
        }
      }
      const img = images.get(nearest);
      if (img && img !== lastDrawn) draw(img);
    };

    const scheduleRender = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(render);
    };

    const pump = () => {
      while (active && loading.size < 4 && queue.length) {
        const frame = queue.shift()!;
        if (images.has(frame) || loading.has(frame) || failed.has(frame)) continue;
        loading.add(frame);
        const img = new Image();
        img.decoding = "async";
        img.src = `/parallax_frames/frame_${String(frame).padStart(4, "0")}.jpg`;
        void img.decode().then(() => {
          if (active && Math.abs(frame - requestedFrame) <= 16) {
            images.set(frame, img);
            scheduleRender();
          }
        }).catch(() => {
          failed.add(frame);
        }).finally(() => {
          loading.delete(frame);
          if (active) pump();
        });
      }
    };

    const update = (progress: number) => {
      const nextFrame = reduceMotion ? 1 : Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
      if (nextFrame === requestedFrame && (images.has(nextFrame) || loading.has(nextFrame))) return;
      const direction = nextFrame >= requestedFrame ? 1 : -1;
      requestedFrame = nextFrame;
      for (const frame of images.keys()) {
        if (Math.abs(frame - requestedFrame) > 16) {
          images.delete(frame);
        }
      }
      // Replace stale queued work after a fast scroll; prioritize the current frame.
      queue = [requestedFrame];
      if (!reduceMotion) {
        for (let distance = 1; distance <= 12; distance++) {
          queue.push(requestedFrame + distance * direction, requestedFrame - distance * direction);
        }
      }
      queue = queue.filter(frame => frame >= 1 && frame <= TOTAL_FRAMES);
      pump();
      scheduleRender();
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      // Avoid scaling a 1080p source into an unnecessarily large retina canvas.
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, 1920 / Math.max(bounds.width, 1));
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      if (lastDrawn) draw(lastDrawn);
      scheduleRender();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    update(smoothProgress.get());
    const unsubscribe = smoothProgress.on("change", update);

    return () => {
      active = false;
      unsubscribe();
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      queue = [];
      images.clear();
    };
  }, [smoothProgress, reduceMotion]);

  return (
    <div
      id="hero-video"
      ref={targetRef}
      className="relative w-full h-[300svh] sm:h-[600svh] motion-reduce:h-svh bg-[#121D50] text-white selection:bg-[#EC4621] selection:text-white"
    >
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-svh w-full flex flex-col justify-end overflow-hidden py-10 sm:pb-16 lg:pb-20">
        
        {/* 1. SCROLL-TRIGGERED HIGH QUALITY PARALLAX FRAME SCRUBBER CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url(/parallax_frames/frame_0001.jpg)" }}
          aria-hidden="true">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover object-center filter brightness-110 contrast-105"
          />

          {/* Subtle Top & Bottom Gradient for Clear Contrast without darkening the frame */}
          <div className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-[#121D50]/95 via-[#121D50]/75 to-transparent z-0" />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#121D50]/95 via-[#121D50]/60 to-transparent z-0" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-12 pointer-events-none">
          <h1 className="max-w-none text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.75rem] 2xl:text-[6.25rem] font-normal leading-[1.08] sm:leading-[1.05] tracking-tight text-white font-[family-name:var(--font-heading)] drop-shadow-lg">
            {reduceMotion ? serviceTitles[0] : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeStage}
                  className="block origin-top-left"
                  initial={{ opacity: 0, y: 6, scale: 0.99, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: -4,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { duration: 0.26, ease: [0.4, 0, 1, 1] },
                  }}
                  transition={{ duration: 0.42, delay: 0.06, ease: [0.2, 0, 0, 1] }}
                >
                  {serviceTitles[activeStage]}
                </motion.span>
              </AnimatePresence>
            )}
          </h1>
        </div>

      </div>
    </div>
  );
}

export default HeroSection;

