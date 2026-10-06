'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover & Define',
    description:
      'Deep dive into business goals and requirements. We craft a precise project blueprint.',
  },
  {
    number: '02',
    title: 'Architect & Plan',
    description:
      'System architecture, tech stack, sprint roadmap. Built for scale from day one.',
  },
  {
    number: '03',
    title: 'Design & Build',
    description:
      'Agile sprints with bi-weekly demos. Clean documented code and automated testing.',
  },
  {
    number: '04',
    title: 'Test & Secure',
    description:
      'Rigorous QA, performance benchmarks, security audits and UAT before production.',
  },
  {
    number: '05',
    title: 'Deploy & Support',
    description:
      'Zero-downtime deployment and ongoing managed support with guaranteed SLAs.',
  },
];

export function ProvenDeliveryProcessSection() {
  return (
    <section className="relative w-full bg-[#F4F7FB] text-[#121A50] py-20 lg:py-28 overflow-hidden border-b border-[#DFE4EA]">
      {/* Subtle Binary Grid Ambient Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#121A50_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          
          {/* Eyebrow Label with Accent Dash */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-[#EE461F]" />
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#EE461F]">
              HOW WE WORK
            </span>
            <span className="w-8 h-0.5 bg-[#EE461F]" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121A50] tracking-tight mb-4 font-sans">
            Our Proven Delivery Process
          </h2>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-[#4B5565] leading-relaxed max-w-xl mx-auto">
            A structured yet flexible approach ensuring quality, transparency, and on-time delivery every time.
          </p>

        </div>

        {/* 5-Step Process Timeline Container */}
        <div className="relative w-full pt-4 pb-8">
          
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-[#D6E0EE] z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Circle Number Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-gray-100 shadow-[0_10px_25px_rgba(18,26,80,0.08)] flex items-center justify-center text-center mb-6 group-hover:border-[#EE461F] group-hover:scale-110 group-hover:shadow-[0_15px_30px_rgba(238,70,31,0.2)] transition-all duration-300 relative z-10">
                  <span className="text-base sm:text-lg font-bold font-serif text-[#EE461F] group-hover:text-[#EE461F]">
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#121A50] mb-2.5 group-hover:text-[#EE461F] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default ProvenDeliveryProcessSection;
