"use client";

import React, { useEffect, useRef } from "react";
import {
  createWarpFieldRenderer,
  WARP_FIELD_DEFAULTS,
  type WarpFieldOptions,
} from "./warp-field-renderer";

export type WarpFieldBackgroundProps = Partial<WarpFieldOptions> & { className?: string };

export function WarpFieldBackground({ className = "", ...props }: WarpFieldBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...WARP_FIELD_DEFAULTS, ...props });
  optionsRef.current = { ...WARP_FIELD_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const renderer = createWarpFieldRenderer(canvas, () => optionsRef.current);
    let frame = 0;
    let visible = true;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.resize(bounds.width, bounds.height);
      renderer.render();
    };

    const tick = () => {
      renderer.render();
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(tick);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(host);
    intersection.observe(host);

    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`relative w-full h-[600px] sm:h-[700px] bg-[#030706] overflow-hidden select-none border-t border-b border-emerald-950/60 ${
        className ? ` ${className}` : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 block cursor-crosshair"
        style={{
          filter: `hue-rotate(${optionsRef.current.hue}deg) saturate(${optionsRef.current.saturation}) brightness(${optionsRef.current.brightness})`,
        }}
      />
    </div>
  );
}

export default WarpFieldBackground;
