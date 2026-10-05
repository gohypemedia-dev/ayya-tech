'use client';

import React, { useEffect } from 'react';
import { Hero3DBackground } from '@/components/hero-3d-background';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  useEffect(() => {
    // Calculate path lengths for accurate animations
    document.querySelectorAll<SVGPathElement>('.animation-line').forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}px`;
      path.style.strokeDashoffset = `${len}px`;

      // Trigger the animation after a short delay
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = '0px';
      }, 500);
    });
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .gradient-text {
            background: linear-gradient(270deg, #EE461F, #1433D1, #1F49E4, #EE461F);
            background-size: 600% 600%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 12s ease infinite;
          }
          
          .animation-line {
            fill: none;
            stroke: #EE461F;
            stroke-width: 2.5;
            filter: drop-shadow(0 0 8px rgba(238, 70, 31, 0.45));
          }
          
          /* Pulse animation for the button */
          @keyframes pulse {
            0% { box-shadow: 0 0 5px rgba(238, 70, 31, 0.3); }
            50% { box-shadow: 0 0 25px rgba(238, 70, 31, 0.6); }
            100% { box-shadow: 0 0 5px rgba(238, 70, 31, 0.3); }
          }
          
          .pulse-animation {
            animation: pulse 2.5s infinite;
          }
        `}
      </style>

      <div className="min-h-screen flex items-center justify-center bg-white text-[#121A50] font-sans overflow-hidden relative border-b border-[#DFE4EA]">
        {/* 3D Interactive Three.js Background */}
        <Hero3DBackground />

        {/* Container */}
        <div className="container max-w-5xl text-center z-10 relative p-10 animate-fadeIn pt-28">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight m-0 relative z-20 tracking-tight text-[#121A50]">
            Ready to build
            <br />
            <span className="gradient-text inline-block relative z-10">
              the software of the future?
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#4B5565] max-w-2xl mx-auto leading-relaxed">
            Engineering reliable software, scalable cloud architecture, and mission-critical digital systems.
          </p>
          <button
            onClick={onCtaClick}
            className="mt-10 px-10 py-4 bg-[#EE461F] text-white border-none rounded-xl cursor-pointer text-lg font-bold transition-all duration-300 ease-in-out hover:bg-[#D63B15] hover:shadow-[0_0_30px_rgba(238,70,31,0.6)] hover:translate-y-[-2px] shadow-[0_0_15px_rgba(238,70,31,0.3)] hover:scale-105 pulse-animation"
          >
            Start building
          </button>
        </div>

        {/* Dynamic Lines */}
        <div className="line-group absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-85">
          <svg
            className="line-wrapper absolute w-full h-full"
            viewBox="0 0 177 159"
            preserveAspectRatio="none"
          >
            <path
              id="main-line"
              className="animation-line"
              d="M176 1L53.5359 1C52.4313 1 51.5359 1.89543 51.5359 3L51.5359 56C51.5359 57.1046 50.6405 58 49.5359 58L0 58"
            />
          </svg>

          <svg
            className="line-wrapper absolute w-full h-full"
            viewBox="0 0 176 59"
            preserveAspectRatio="none"
          >
            <path
              className="animation-line"
              d="M0 1L122.464 1C123.569 1 124.464 1.89543 124.464 3L124.464 56C124.464 57.1046 125.36 58 126.464 58L176 58"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
export { HeroSection };
