'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProcessItem {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessItem[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We analyze your business goals, tech stack, and digital objectives.',
  },
  {
    number: '02',
    title: 'Direction',
    description: 'We define the system architecture, technical roadmap, and UI strategy.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We craft high-performance UI/UX, wireframes, and design systems.',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'We engineer scalable microservices, cloud APIs, and web platforms.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Rigorous security audits, automated testing, and zero-downtime deploy.',
  },
  {
    number: '06',
    title: 'Improve',
    description: 'Continuous cloud optimization, monitoring, and proactive updates.',
  },
];

export function ProvenDeliveryProcessSection() {
  return (
    <section className="relative w-full bg-[#F3F1EA] text-[#111111] py-20 lg:py-36 px-4 sm:px-8 lg:px-12 border-b border-black/10 selection:bg-[#EE461F] selection:text-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">
        
        {/* LEFT COLUMN - Sticky Pinned Section Header & Tagline */}
        <div className="lg:col-span-5 lg:sticky lg:top-36 pt-4 sm:pt-8 lg:pt-12 flex flex-col justify-between self-start pb-8">
          
          {/* Main Giant Editorial Heading */}
          <div className="relative mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EE461F] block mb-3 font-sans">
              OUR PROVEN METHODOLOGY
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#111111] leading-[0.92] font-sans">
              HOW WE
              <br />
              MAKE
              <br />
              <span className="font-serif italic font-normal uppercase tracking-tight text-[#EE461F] inline-block pt-1">
                THINGS.
              </span>
            </h2>
          </div>

          {/* Subtitle / Philosophy Notes */}
          <div className="space-y-1 text-sm sm:text-base text-black/70 font-normal leading-relaxed border-l-2 border-[#EE461F]/40 pl-3">
            <p className="font-medium text-[#111111]">Clear enough to trust.</p>
            <p>Loose enough for transformative engineering ideas.</p>
          </div>

        </div>

        {/* RIGHT COLUMN - Scrolling Process Steps */}
        <div className="lg:col-span-7 flex flex-col border-t border-black/20 lg:pl-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="relative py-8 sm:py-10 border-b border-black/20 group transition-colors duration-300 hover:bg-black/[0.02] px-2 sm:px-4 cursor-pointer overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-4 items-baseline">
                
                {/* Step Number */}
                <div className="col-span-2 sm:col-span-2 text-xs sm:text-sm font-mono text-black/50 font-normal group-hover:text-[#EE461F] transition-colors duration-300">
                  {step.number}
                </div>

                {/* Step Title (Clean Regular Weight Sans Font) */}
                <div className="col-span-10 sm:col-span-5">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide text-[#111111] group-hover:translate-x-2 transition-transform duration-300 font-sans">
                    {step.title}
                  </h3>
                </div>

                {/* Step Description */}
                <div className="col-span-12 sm:col-span-5 mt-2 sm:mt-0 text-sm sm:text-base text-black/75 font-normal leading-relaxed">
                  {step.description}
                </div>

              </div>

              {/* Animated Colored Horizontal Line traveling Left to Right on Hover */}
              <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#EE461F] via-[#F97316] to-[#EE461F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProvenDeliveryProcessSection;
