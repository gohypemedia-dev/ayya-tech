"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <div className="relative w-full min-h-[105vh] lg:min-h-[115vh] bg-[#121D50] text-white overflow-hidden flex flex-col justify-between select-none pt-28 sm:pt-36 pb-20 lg:pb-28 selection:bg-[#EE461F] selection:text-white">
      {/* 1. Full Screen Vivid IT Team Background Image with subtle Ken-Burns Motion */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/full_screen_it_team_bg.jpg"
          alt="AYYATECH IT Engineering Team Working"
          fill
          priority
          className="object-cover object-center filter contrast-110 brightness-[0.75]"
        />
        {/* Layered Brand Gradient Overlays (Deep Navy #121D50 & Cobalt Blue #0E33D1) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121D50]/95 via-[#121D50]/85 to-[#0E33D1]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121D50] via-transparent to-[#121D50]/70" />
        <div className="absolute inset-0 bg-[#121D50]/35 backdrop-blur-[1px]" />
      </motion.div>

      {/* 2. Animated Decorative Brand Accent Swooshes (Vibrant Orange #EE461F & Cobalt #1F45E4) */}
      {/* Left Outer Loop Curve in Brand Orange */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[300px] sm:w-[480px] lg:w-[650px] h-full z-10 pointer-events-none"
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M -60 -40 C 320 80, 340 450, -40 580 C -220 660, 20 780, 160 840"
          stroke="#EE461F"
          strokeWidth="4.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Hand-drawn Swirl Loop next to Headline */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "backOut" }}
        className="absolute left-6 sm:left-24 lg:left-[18%] top-[34%] sm:top-[32%] w-24 sm:w-36 h-24 sm:h-36 z-10 pointer-events-none"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 20 80 C 10 30, 80 10, 100 50 C 120 90, 40 120, 60 70 C 70 45, 95 65, 80 85"
          stroke="#EE461F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Bottom Right Large Brand Orange Curved Swoop */}
      <motion.div
        initial={{ opacity: 0, x: 100, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-0 z-10 pointer-events-none w-[320px] sm:w-[580px] md:w-[750px] lg:w-[900px] h-[260px] sm:h-[440px] md:h-[580px]"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 800 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 800 0 C 420 200, 220 360, 0 550 L 800 550 Z"
            fill="url(#brand-orange-gradient)"
          />
          <defs>
            <linearGradient id="brand-orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EE461F" />
              <stop offset="100%" stopColor="#D63B15" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Translucent Rings on Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-[24%] right-[8%] sm:right-[16%] z-10 pointer-events-none hidden sm:block"
      >
        <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-xs mb-3 animate-pulse" />
        <div className="w-16 h-16 rounded-full border border-[#1F45E4]/40 bg-[#1F45E4]/10 backdrop-blur-xs ml-10" />
      </motion.div>

      {/* 3. Main Center Content with Kinetic Motion Entrance Effects */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl text-left xl:ml-20">
          
          {/* Subheading Badge with Blur & Fade Effect */}
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#EE461F] animate-ping" />
            <p className="text-xs sm:text-sm font-extrabold tracking-widest text-white uppercase">
              WELCOME TO AYYATECH IT & DIGITAL AGENCY
            </p>
          </motion.div>

          {/* Headline Line 1 Effect: Soft Blur & Upward Slide Reveal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] font-[family-name:var(--font-heading)] drop-shadow-2xl"
            >
              DIGITAL MARKETING &
            </motion.h1>
          </div>

          {/* Headline Line 2 Effect: Staggered Slide Reveal */}
          <div className="overflow-hidden mt-1 sm:mt-2">
            <motion.h1
              initial={{ opacity: 0, y: 45, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] font-[family-name:var(--font-heading)] drop-shadow-2xl"
            >
              <span className="text-white relative inline-block">
                SOFTWARE AGENCY IN DELHI
              </span>
            </motion.h1>
          </div>

          {/* Subtitle Description Effect */}
          <motion.p
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
            className="mt-6 text-sm sm:text-lg md:text-xl text-neutral-200 max-w-2xl leading-relaxed font-normal drop-shadow-md"
          >
            Empowering global enterprises with high-performance software engineering, cloud architecture, AI solutions, and digital growth marketing.
          </motion.p>

          {/* Call To Action Buttons Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onCtaClick}
              className="px-8 sm:px-10 py-4.5 bg-[#EE461F] hover:bg-[#D63B15] text-white text-sm sm:text-base font-black tracking-wider uppercase rounded-md shadow-2xl shadow-[#EE461F]/40 hover:shadow-[#EE461F]/60 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex items-center gap-3 group"
            >
              <span>CONTACT US</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <a
              href="#services"
              className="px-7 py-4 border border-white/30 hover:border-[#1F45E4] bg-white/10 hover:bg-[#0E33D1]/40 text-white hover:text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md transition-all backdrop-blur-md shadow-lg"
            >
              EXPLORE SERVICES
            </a>
          </motion.div>

          {/* Trust Badges Bar Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-bold tracking-wider uppercase text-neutral-300"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EE461F]" />
              <span>Enterprise Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#EE461F]" />
              <span>High Scalability</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#EE461F]" />
              <span>24/7 Expert Support</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Left Vertical Marginal Labels (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col gap-24 text-[11px] font-bold tracking-widest text-neutral-400 uppercase pointer-events-auto z-30"
      >
        <div className="transform -rotate-90 origin-left whitespace-nowrap text-neutral-300">
          MON - FRI &nbsp;|&nbsp; 10AM - 7PM
        </div>
        <div className="transform -rotate-90 origin-left whitespace-nowrap flex items-center gap-4 text-neutral-300">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#EE461F] transition-colors">
            INSTAGRAM
          </a>
          <span>•</span>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#EE461F] transition-colors">
            FACEBOOK
          </a>
          <span>•</span>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#EE461F] transition-colors">
            TWITTER
          </a>
        </div>
      </motion.div>

      {/* Floating Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-100 transition-opacity"
        onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
          Scroll Down
        </span>
        <div className="w-8 h-8 rounded-full border border-white/25 bg-white/10 flex items-center justify-center animate-bounce shadow-lg backdrop-blur-xs">
          <ChevronDown className="w-4 h-4 text-[#EE461F]" />
        </div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
