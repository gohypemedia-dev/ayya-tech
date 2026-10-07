'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

export interface ThreeGeometricShowcaseSectionProps {
  onCtaClick?: () => void;
  onNextClick?: () => void;
  className?: string;
}

// 10-Scroll Wavy Ribbon Lines & Screen Translation Component
function TenScrollWavyCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  // Smooth spring physics over 10 scroll steps
  const smoothScroll = useSpring(scrollProgress, {
    damping: 24,
    stiffness: 80,
  });

  // Screen translate rightwards across 10 scroll phases (translateX: 0px to 1600px)
  const screenTranslateX = useTransform(smoothScroll, [0, 1], [0, 1600]);

  // Vertical wave oscillations across 10 scroll steps
  const line1Y = useTransform(
    smoothScroll,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [0, -40, 60, -50, 70, -60, 50, -40, 60, -30, 0]
  );

  const line2Y = useTransform(
    smoothScroll,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [-30, 50, -40, 60, -50, 40, -60, 50, -30, 40, -20]
  );

  const line3Y = useTransform(
    smoothScroll,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [40, -60, 50, -70, 40, -50, 60, -30, 50, -40, 30]
  );

  // 10-Step Morphing Wavy Paths
  const path1D = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1.0],
    [
      'M -200,240 C 300,120 700,380 1200,180 C 1600,80 2000,220 2500,120 T 3200,180',
      'M -200,120 C 350,380 750,420 1250,220 C 1650,80 2050,140 2550,80 T 3200,120',
      'M -200,360 C 400,140 800,80 1300,280 C 1700,400 2100,200 2600,140 T 3200,240',
      'M -200,180 C 350,340 750,400 1250,280 C 1650,180 2050,260 2550,220 T 3200,160',
      'M -200,240 C 300,120 700,380 1200,180 C 1600,80 2000,220 2500,120 T 3200,180',
    ]
  );

  const path2D = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1.0],
    [
      'M -240,140 C 280,60 680,260 1160,100 C 1520,-10 1920,80 2400,20 T 3100,60',
      'M -240,60 C 320,240 720,340 1220,120 C 1580,-10 1980,50 2450,10 T 3100,40',
      'M -240,240 C 400,40 800,20 1300,180 C 1660,280 2060,160 2500,80 T 3100,140',
      'M -240,120 C 340,260 760,340 1260,200 C 1620,120 2020,200 2500,180 T 3100,100',
      'M -240,140 C 280,60 680,260 1160,100 C 1520,-10 1920,80 2400,20 T 3100,60',
    ]
  );

  const path3D = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1.0],
    [
      'M -160,420 C 320,340 680,180 1180,360 C 1540,460 1940,340 2400,280 T 3150,360',
      'M -160,280 C 360,440 720,340 1220,420 C 1580,480 1980,340 2450,220 T 3150,300',
      'M -160,460 C 400,240 800,180 1300,340 C 1660,440 2060,320 2500,240 T 3150,380',
      'M -160,320 C 380,420 760,460 1260,350 C 1620,260 2020,340 2500,360 T 3150,320',
      'M -160,420 C 320,340 680,180 1180,360 C 1540,460 1940,340 2400,280 T 3150,360',
    ]
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      
      {/* Screen Translates Rightwards across 10 Scroll Steps */}
      <motion.div
        style={{ x: screenTranslateX }}
        className="w-[280vw] h-full relative"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 3200 650"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Faint Construction Compass Circles & Grid Lines across 10 scroll range */}
          <g opacity="0.45">
            <circle cx="800" cy="420" r="300" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none" />
            <circle cx="1600" cy="380" r="320" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none" />
            <circle cx="2400" cy="440" r="280" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none" />

            <line x1="800" y1="0" x2="800" y2="650" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
            <line x1="1600" y1="0" x2="1600" y2="650" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
            <line x1="2400" y1="0" x2="2400" y2="650" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />

            <line x1="0" y1="380" x2="3200" y2="380" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          </g>

          {/* 3 Wavy Ribbon Lines */}
          <g>
            {/* Ribbon 2: Soft Pastel Light Pink */}
            <motion.path
              d={path2D}
              style={{ y: line2Y }}
              stroke="#FBCFE8"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Ribbon 3: Soft Pastel Purple Lavender */}
            <motion.path
              d={path3D}
              style={{ y: line3Y }}
              stroke="#C084FC"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Ribbon 1: Bold Hot Pink */}
            <motion.path
              d={path1D}
              style={{ y: line1Y }}
              stroke="#EC4899"
              strokeWidth="18"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </motion.div>

    </div>
  );
}

export function ThreeGeometricShowcaseSection({
  onCtaClick,
  onNextClick,
  className = '',
}: ThreeGeometricShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-white border-b border-[#DFE4EA] ${className}`}
      style={{ height: '350vh' }} // 10-scroll sticky height
    >
      
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center">
        
        {/* 10-Scroll Wavy Ribbon Lines & Screen Move Rightwards */}
        <TenScrollWavyCanvas scrollProgress={scrollYProgress} />

      </div>

    </section>
  );
}

export default ThreeGeometricShowcaseSection;
