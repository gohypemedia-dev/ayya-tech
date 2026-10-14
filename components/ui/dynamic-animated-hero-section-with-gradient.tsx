"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useSpring, useReducedMotion } from "framer-motion";

const TOTAL_FRAMES = 240;

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

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

  // Keep a small window decoded: the full sequence would use ~2 GB of memory.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = new Map<number, HTMLImageElement>();
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
      const img = images.get(requestedFrame);
      if (img?.complete && img.naturalWidth) draw(img);
    };

    const scheduleRender = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(render);
    };

    const loadFrame = (frame: number) => {
      if (frame < 1 || frame > TOTAL_FRAMES || images.has(frame)) return;
      const img = new Image();
      images.set(frame, img);
      img.onload = () => {
        if (active && frame === requestedFrame) scheduleRender();
      };
      img.src = `/parallax_frames/frame_${String(frame).padStart(4, "0")}.jpg`;
    };

    const update = (progress: number) => {
      requestedFrame = reduceMotion ? 1 : Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
      for (const [frame, img] of images) {
        if (Math.abs(frame - requestedFrame) > 12) {
          img.onload = null;
          images.delete(frame);
        }
      }
      loadFrame(requestedFrame);
      if (!reduceMotion) {
        for (let distance = 1; distance <= 12; distance++) {
          loadFrame(requestedFrame + distance);
          loadFrame(requestedFrame - distance);
        }
      }
      scheduleRender();
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
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
      for (const img of images.values()) img.onload = null;
      images.clear();
    };
  }, [smoothProgress, reduceMotion]);

  return (
    <div
      ref={targetRef}
      className="relative w-full h-[600svh] motion-reduce:h-svh bg-[#080D2B] text-white selection:bg-[#EE461F] selection:text-white"
    >
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-svh w-full flex flex-col justify-between overflow-hidden py-10">
        
        {/* 1. SCROLL-TRIGGERED HIGH QUALITY PARALLAX FRAME SCRUBBER CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url(/parallax_frames/frame_0001.jpg)" }}
          aria-hidden="true">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover object-center filter brightness-110 contrast-105"
          />

          {/* Subtle Top & Bottom Gradient for Clear Contrast without darkening the frame */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#080D2B]/85 via-[#080D2B]/30 to-transparent z-0" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080D2B]/90 via-[#080D2B]/30 to-transparent z-0" />
        </div>

        <h1 className="sr-only">AyyaTech ? IT consulting and software development</h1>

      </div>
    </div>
  );
}

export default HeroSection;

