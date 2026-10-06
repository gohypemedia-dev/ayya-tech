'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

interface StatItemProps {
  endValue: number;
  label: string;
  suffix?: string;
}

function AnimatedCounter({ endValue, label, suffix = '+' }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const frameTime = 1000 / 60; // 60 fps
    const totalFrames = duration / frameTime;
    const increment = endValue / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [isInView, endValue]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 font-heading">
        {count}
        {suffix}
      </span>
      <span className="text-xs sm:text-sm font-bold tracking-widest text-white/80 uppercase">
        {label}
      </span>
    </div>
  );
}

export function AgencyStatsAndFeaturesSection() {
  const features = [
    {
      number: '01',
      title: 'TOTAL DESIGN & ARCHITECTURE FREEDOM',
      subtitle: 'CORE CAPABILITIES',
    },
    {
      number: '02',
      title: 'AGILE ENTERPRISE SOFTWARE DEVELOPMENT',
      subtitle: 'CORE CAPABILITIES',
    },
    {
      number: '03',
      title: 'CLOUD-NATIVE SCALABILITY & 24/7 DEVOPS',
      subtitle: 'CORE CAPABILITIES',
    },
  ];

  const checkPoints = [
    'Proven Digital & Software Strategies.',
    'Experienced Tech Architects & Developers.',
    'Data-Driven Enterprise Approach.',
    'Focused on Real Scalable Business Growth.',
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      
      {/* Fixed Parallax Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center filter grayscale contrast-125 opacity-35"
        style={{
          backgroundImage: `url('/full_screen_it_team_bg.jpg')`,
        }}
      />
      
      {/* Dark Overlay Gradient for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080D2B]/90 via-[#0B1238]/85 to-[#080D2B]/95" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1540px] mx-auto py-20 lg:py-28 px-6 sm:px-10 lg:px-16 flex flex-col gap-16 lg:gap-24">
        
        {/* ========================================== */}
        {/* TOP STATS COUNTER BAR (Unboxed 4 Columns with Divider Lines) */}
        {/* ========================================== */}
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20 border-t border-b border-white/10 py-6 sm:py-8">
            <AnimatedCounter endValue={1500} label="PROJECTS COMPLETED" />
            <AnimatedCounter endValue={180} label="ACTIVE CLIENTS" />
            <AnimatedCounter endValue={2500} label="CODE REPOS & BUILDS" />
            <AnimatedCounter endValue={2000} label="HAPPY CLIENTS" />
          </div>
        </div>

        {/* ========================================== */}
        {/* BOTTOM CONTENT GRID (Scrolls Over Fixed BG) */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Orange Headline Card + Vertical Core Features List */}
          <div className="lg:col-span-5 flex flex-col w-full shadow-2xl rounded-none overflow-hidden border border-white/10 bg-[#0E1438]/90 backdrop-blur-xl">
            
            {/* Bright Orange Highlight Box */}
            <div className="bg-[#EE461F] p-8 sm:p-10 text-white flex flex-col justify-center rounded-none">
              <h3 className="text-xl sm:text-2xl font-black leading-snug tracking-tight uppercase">
                WE ARE COMMITTED TO DELIVERING HIGH QUALITY DIGITAL SOLUTIONS THAT HELP BUSINESSES GROW.
              </h3>
            </div>

            {/* Core Features List below Orange Box */}
            <div className="p-6 sm:p-8 flex flex-col divide-y divide-white/10">
              {features.map((item) => (
                <div key={item.number} className="py-6 first:pt-2 last:pb-2 flex items-start gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-none bg-[#EE461F]/15 border border-[#EE461F]/30 flex items-center justify-center shrink-0 group-hover:bg-[#EE461F] transition-colors duration-300">
                    <span className="text-lg font-black text-[#EE461F] group-hover:text-white transition-colors duration-300 font-mono">
                      {item.number}
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-wide leading-snug group-hover:text-[#EE461F] transition-colors duration-200">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-extrabold tracking-widest text-[#EE461F] uppercase mt-1">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Dark Executive Card ("Trusted by 1500+ Clients") */}
          <div className="lg:col-span-7 flex flex-col justify-between w-full bg-[#0E1438]/90 backdrop-blur-xl rounded-none border border-white/10 p-8 sm:p-10 lg:p-12 shadow-2xl">
            
            <div>
              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white leading-tight tracking-tight mb-6">
                WE’RE TRUSTED BY MORE THAN <span className="text-white">1500 CLIENTS</span><span className="text-[#EE461F]">.</span>
              </h2>

              {/* Sub-description */}
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-2xl">
                Businesses across different industries trust our digital engineering expertise to grow their online presence, modernize legacy IT infrastructure, and generate real measurable results.
              </p>
            </div>

            {/* Bottom Row: Image + Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center pt-6 border-t border-white/10">
              
              {/* Team Image Box */}
              <div className="relative w-full h-[210px] sm:h-[230px] rounded-none overflow-hidden border border-white/15 shadow-md">
                <img
                  src="/it_team_left.jpg"
                  alt="IT Team Collaboration"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Checklist Points */}
              <div className="flex flex-col gap-3.5 text-left">
                {checkPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EE461F]/20 flex items-center justify-center shrink-0 border border-[#EE461F]/40">
                      <Check className="w-3.5 h-3.5 text-[#EE461F] stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white/90 leading-tight">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AgencyStatsAndFeaturesSection;
