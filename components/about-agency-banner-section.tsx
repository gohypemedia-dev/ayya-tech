'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronUp } from 'lucide-react';

interface AboutAgencyBannerSectionProps {
  onCtaClick?: () => void;
}

export function AboutAgencyBannerSection({ onCtaClick }: AboutAgencyBannerSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#FAF6F0] text-[#121A50] overflow-hidden py-16 lg:py-24 select-none border-t border-b border-[#E8E0D2]">
      
      {/* Cream Dual-Tone Split Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
        <div className="w-full lg:w-[32%] bg-[#F0E8DC]" />
        <div className="hidden lg:block w-[68%] bg-[#FAF6F0]" />
      </div>

      {/* Tech Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(18, 26, 80, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(18, 26, 80, 0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Vertical Bar + Overlapping Monochrome Images */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-start">
            
            {/* Thick Brand Orange Accent Bar on Far Left */}
            <div className="absolute -left-4 sm:left-0 top-6 bottom-6 w-3.5 bg-[#EE461F] rounded-full z-10 hidden sm:block shadow-lg shadow-[#EE461F]/25" />

            {/* Overlapping Images Container */}
            <div className="relative w-full max-w-[460px] h-[340px] sm:h-[440px] ml-0 sm:ml-6">
              
              {/* Top Image: Professional Business Men Collaborating */}
              <motion.div
                initial={{ y: -130, x: 35, scale: 1.16, opacity: 0.2 }}
                whileInView={{ y: 0, x: 0, scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  type: 'spring',
                  stiffness: 55,
                  damping: 18,
                  mass: 0.9,
                }}
                className="absolute top-0 right-0 w-[80%] h-[68%] rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-white/60 z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="Professional IT Experts Collaborating"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95"
                />
              </motion.div>

              {/* Bottom Image: Team High-Five over Laptop */}
              <motion.div
                initial={{ y: 130, x: -35, scale: 0.86, opacity: 0.2 }}
                whileInView={{ y: 0, x: 0, scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  type: 'spring',
                  stiffness: 55,
                  damping: 18,
                  mass: 0.9,
                  delay: 0.1,
                }}
                className="absolute bottom-0 left-0 w-[80%] h-[66%] rounded-xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.22)] border-4 border-[#F0E8DC] z-20"
              >
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                  alt="Digital Engineering Team High Five"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95"
                />
              </motion.div>

            </div>
          </div>

          {/* Right Column: Perfectly Aligned Content Area */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#121A50] leading-[1.08] mb-5 font-sans">
              WE&apos;RE THE LEADING IT CONSULTANCY &amp; SOFTWARE AGENCY <span className="text-[#EE461F]">.</span>
            </h2>

            {/* Sub-headline Brand Orange Text */}
            <h3 className="text-xs sm:text-sm lg:text-[15px] font-extrabold tracking-wide text-[#EE461F] leading-relaxed mb-5 max-w-2xl">
              We are committed to delivering scalable cloud architecture, AI systems &amp; high-performance software for enterprises.
            </h3>

            {/* Paragraph Text */}
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-7 max-w-xl font-normal">
              Our team of senior tech architects continuously leverages cutting-edge frameworks, microservices, and AI models to ensure our enterprise clients maintain a decisive competitive advantage.
            </p>

            {/* Checkmark Feature List */}
            <div className="space-y-3.5 mb-9">
              <div className="flex items-center gap-3.5">
                <Check className="w-5 h-5 text-[#EE461F] stroke-[3.5] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#121A50]">
                  Team of Senior IT Architects &amp; Proven Engineering Excellence
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <Check className="w-5 h-5 text-[#EE461F] stroke-[3.5] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#121A50]">
                  Empowering Enterprises with Cloud-Native &amp; AI-Powered Platforms
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <Check className="w-5 h-5 text-[#EE461F] stroke-[3.5] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#121A50]">
                  Modernizing Legacy Systems using Latest Tech &amp; Low-Code Velocity
                </span>
              </div>
            </div>

            {/* Discover More CTA Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onCtaClick}
                className="px-10 py-4 bg-[#EE461F] hover:bg-[#D63B15] text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-md shadow-xl shadow-[#EE461F]/25 hover:shadow-[#EE461F]/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer w-fit"
              >
                DISCOVER MORE
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Floating Brand Orange Scroll-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 bg-[#EE461F] hover:bg-[#D63B15] text-white rounded-full shadow-2xl shadow-[#EE461F]/40 flex items-center justify-center z-40 transition-all duration-200 hover:scale-110 cursor-pointer"
      >
        <ChevronUp className="w-6 h-6 stroke-[3]" />
      </button>

    </section>
  );
}

export default AboutAgencyBannerSection;
