'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Check, ShieldCheck, Zap, Layers, Cloud } from 'lucide-react';

interface StatItemProps {
  endValue: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ endValue, label, suffix = '+', prefix = '' }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const frameTime = 1000 / 60;
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
    <div ref={ref} className="flex flex-col items-center justify-center p-5 sm:p-6 text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#121A50] tracking-tight mb-1 flex items-center">
        {prefix}
        <span>{count.toLocaleString()}</span>
        <span className="text-[#EE461F]">{suffix}</span>
      </div>
      <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-500 uppercase">
        {label}
      </span>
    </div>
  );
}

export function AgencyStatsAndFeaturesSection() {
  const capabilities = [
    {
      icon: Layers,
      title: 'Total Design & Architecture Freedom',
      description: 'Bespoke systems and modular microservices with zero vendor lock-in.',
    },
    {
      icon: Zap,
      title: 'Agile Enterprise Software Development',
      description: 'Rapid sprint cycles delivering production-ready, test-covered code.',
    },
    {
      icon: Cloud,
      title: 'Cloud-Native Scalability & 24/7 DevOps',
      description: 'Multi-cloud Kubernetes clusters with automated CI/CD and 99.9% uptime SLAs.',
    },
  ];

  const trustChecklist = [
    'Proven Digital & Software Strategies',
    'Experienced Tech Architects & Senior Developers',
    'Data-Driven & Scalable Enterprise Approach',
    'Full Source Code & 100% Client IP Ownership',
  ];

  return (
    <section className="relative w-full bg-[#FAFBFD] text-[#121A50] py-16 lg:py-24 border-t border-slate-200/80">
      {/* Soft warm/blue subtle background gradient orbs matching FAQ & Services */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EE461F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#1433D1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col gap-8 lg:gap-10">
        
        {/* ========================================================= */}
        {/* TOP STATS COUNTER BAR (Clean Elevated White Card)          */}
        {/* ========================================================= */}
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl shadow-xs p-2 sm:p-3">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <AnimatedCounter endValue={1500} label="Projects Completed" suffix="+" />
            <AnimatedCounter endValue={180} label="Active Enterprise Clients" suffix="+" />
            <AnimatedCounter endValue={2500} label="Code Repos & Builds" suffix="+" />
            <AnimatedCounter endValue={2000} label="Happy Enterprise Clients" suffix="+" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN 2-COLUMN CARDS SHOWCASE                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* LEFT CARD: Core Commitment & Technical Pillars */}
          <div className="lg:col-span-5 flex flex-col bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-300">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EE461F]/10 border border-[#EE461F]/20 text-xs font-semibold text-[#EE461F] mb-5 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#EE461F]" />
              <span>Our Core Commitment</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121A50] tracking-tight leading-snug mb-3">
              Delivering high-velocity, production-grade solutions that fuel enterprise growth.
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We combine deep technical architecture with rapid execution, empowering businesses to outpace competition and scale fearlessly.
            </p>

            {/* Capabilities List */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-[#EE461F]/30 hover:bg-[#FAFBFD] transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#EE461F]/10 border border-[#EE461F]/20 text-[#EE461F] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-sm font-bold text-[#121A50] tracking-tight leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CARD: Enterprise Trust & Client Track Record */}
          <div className="lg:col-span-7 flex flex-col bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-300">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1433D1]/10 border border-[#1433D1]/20 text-xs font-semibold text-[#1433D1] mb-5 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1433D1]" />
              <span>Enterprise Proven Track Record</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121A50] tracking-tight leading-tight mb-3">
              Trusted by more than <span className="text-[#EE461F]">1,500</span> clients worldwide.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-2xl">
              Global leaders and high-growth scale-ups rely on our engineering squads to modernize legacy architectures, launch mission-critical systems, and drive measurable revenue impact.
            </p>

            {/* Bottom Row: Team Image & Verified Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center pt-5 border-t border-slate-100">
              
              {/* Framed Team Photo */}
              <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs group/img">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Ayya Tech Engineering Team Collaboration"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                  Global Engineering Pods
                </div>
              </div>

              {/* Verified Checklist */}
              <div className="flex flex-col gap-3 text-left">
                {trustChecklist.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EE461F]/10 flex items-center justify-center shrink-0 border border-[#EE461F]/20">
                      <Check className="w-3 h-3 text-[#EE461F] stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
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
