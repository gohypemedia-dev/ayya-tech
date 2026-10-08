'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TrustedClientsGridSectionProps {
  className?: string;
}

// 10 Client / Partner Brands Data matching exact visual typography & icons from screenshot
const CLIENT_PARTNERS = [
  // ROW 1
  {
    name: '8VC',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="30" fontFamily="Inter, system-ui, sans-serif" fontSize="34" fontWeight="300" fill="#121A50" letterSpacing="4">8VC</text>
      </svg>
    ),
  },
  {
    name: 'Ryder',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 14 Q 50 4 110 14" stroke="#EE461F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <text x="12" y="32" fontFamily="Georgia, serif" fontSize="28" fontStyle="italic" fontWeight="700" fill="#121A50" letterSpacing="-0.5">Ryder®</text>
      </svg>
    ),
  },
  {
    name: 'Lineage',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="#1433D1">
          <polygon points="14,10 20,10 17,15" />
          <polygon points="10,17 16,17 13,22" />
          <polygon points="18,17 24,17 21,22" />
        </g>
        <text x="32" y="27" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="700" fill="#121A50" letterSpacing="-0.2">Lineage®</text>
      </svg>
    ),
  },
  {
    name: 'Prologis',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="20" r="9" stroke="#EE461F" strokeWidth="2" fill="none" />
        <path d="M12 16 L20 24 M12 24 L20 16" stroke="#EE461F" strokeWidth="2" strokeLinecap="round" />
        <text x="34" y="26" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#121A50" letterSpacing="1.5">PROLOGIS</text>
      </svg>
    ),
  },
  {
    name: 'NFI',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12 Q 70 2 130 14" stroke="#1433D1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <text x="25" y="32" fontFamily="Arial, sans-serif" fontSize="28" fontStyle="italic" fontWeight="900" fill="#121A50" letterSpacing="1">NFI</text>
      </svg>
    ),
  },
  // ROW 2
  {
    name: 'Stripe',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="28" fontFamily="Inter, system-ui, sans-serif" fontSize="28" fontWeight="800" fill="#121A50" letterSpacing="-1">stripe</text>
      </svg>
    ),
  },
  {
    name: 'AWS',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="12" y="24" fontFamily="Inter, system-ui, sans-serif" fontSize="24" fontWeight="800" fill="#121A50" letterSpacing="1">aws</text>
        <path d="M14 30 Q 45 38 75 30 L71 27" stroke="#EE461F" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Snowflake',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#1433D1" strokeWidth="2" strokeLinecap="round">
          <line x1="16" y1="12" x2="16" y2="28" />
          <line x1="8" y1="20" x2="24" y2="20" />
          <line x1="10" y1="14" x2="22" y2="26" />
          <line x1="10" y1="26" x2="22" y2="14" />
        </g>
        <text x="34" y="26" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="700" fill="#121A50" letterSpacing="-0.3">snowflake</text>
      </svg>
    ),
  },
  {
    name: 'Datadog',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="16" height="16" rx="3" stroke="#EE461F" strokeWidth="2" fill="none" />
        <text x="32" y="26" fontFamily="Inter, system-ui, sans-serif" fontSize="19" fontWeight="800" fill="#121A50" letterSpacing="0.5">DATADOG</text>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    svg: (
      <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,12 26,28 6,28" fill="#121A50" />
        <text x="34" y="26" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#121A50" letterSpacing="1">VERCEL</text>
      </svg>
    ),
  },
];

export function TrustedClientsGridSection({ className = '' }: TrustedClientsGridSectionProps) {
  return (
    <section className={`relative w-full py-20 lg:py-28 bg-[#FAF8F5] text-[#121A50] border-b border-[#DFE4EA] overflow-hidden ${className}`}>
      
      {/* Background Soft Glow using Brand Accent Palette (#1433D1 & #EE461F) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial from-[#1433D1]/5 via-[#EE461F]/3 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Web Services-Oriented Main Heading with Brand Color Gradient */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#121A50] tracking-tight leading-tight max-w-3xl mb-10 sm:mb-14">
          Empowering Tech Leaders with{' '}
          <span className="bg-gradient-to-r from-[#EE461F] via-[#1433D1] to-[#121A50] bg-clip-text text-transparent">
            Next-Gen Web Solutions
          </span>
        </h2>

        {/* UNIFIED ARCHITECTURAL BLUEPRINT GRID (10 LOGOS IN 2 ROWS X 5 COLS) */}
        <div className="w-full relative py-12">
          
          {/* Continuous Vertical Lines with Brand Border Color */}
          <div className="absolute inset-0 top-0 bottom-0 grid grid-cols-5 pointer-events-none z-0">
            {[0, 1, 2, 3, 4].map((colIdx) => (
              <div key={`vert-line-${colIdx}`} className="h-full border-r border-[#DFE4EA]/80" />
            ))}
            <div className="absolute inset-y-0 left-0 border-l border-[#DFE4EA]/80" />
          </div>

          {/* Logo Cells Grid Box */}
          <div className="relative z-10 my-10 border-t border-b border-[#DFE4EA]/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-white/60 backdrop-blur-2xs">
            
            {CLIENT_PARTNERS.map((client, idx) => {
              const isRow1 = idx < 5;

              return (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`relative h-28 sm:h-36 flex items-center justify-center p-6 hover:bg-white transition-all duration-300 group cursor-pointer ${
                    isRow1 ? 'border-b border-[#DFE4EA]/80' : ''
                  }`}
                >
                  {/* Logo SVG with Brand Colors and Opacity Hover Effect */}
                  <div className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 transform-gpu">
                    {client.svg}
                  </div>
                </motion.div>
              );
            })}

          </div>

          {/* CROSSHAIRS '+' AT ALL GRID INTERSECTIONS WITH BRAND ACCENT TINT */}

          {/* 1. TOP HORIZONTAL LINE CROSSHAIRS (6 '+') */}
          <div className="absolute top-10 left-0 right-0 pointer-events-none z-20 grid grid-cols-5">
            <span className="absolute top-0 left-0 -mt-1.5 -ml-1.5 text-[10px] text-[#1433D1]/60 font-mono select-none">+</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={`top-cross-${i}`} className="relative h-0">
                <span className="absolute top-0 right-0 -mt-1.5 -mr-1.5 text-[10px] text-[#1433D1]/60 font-mono select-none">+</span>
              </div>
            ))}
          </div>

          {/* 2. MIDDLE HORIZONTAL LINE CROSSHAIRS (6 '+') */}
          <div className="absolute top-[calc(10px+50%)] left-0 right-0 pointer-events-none z-20 grid grid-cols-5">
            <span className="absolute top-0 left-0 -mt-1.5 -ml-1.5 text-[10px] text-[#EE461F]/60 font-mono select-none">+</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={`mid-cross-${i}`} className="relative h-0">
                <span className="absolute top-0 right-0 -mt-1.5 -mr-1.5 text-[10px] text-[#EE461F]/60 font-mono select-none">+</span>
              </div>
            ))}
          </div>

          {/* 3. BOTTOM HORIZONTAL LINE CROSSHAIRS (6 '+') */}
          <div className="absolute bottom-10 left-0 right-0 pointer-events-none z-20 grid grid-cols-5">
            <span className="absolute top-0 left-0 -mt-1.5 -ml-1.5 text-[10px] text-[#1433D1]/60 font-mono select-none">+</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={`bot-cross-${i}`} className="relative h-0">
                <span className="absolute top-0 right-0 -mt-1.5 -mr-1.5 text-[10px] text-[#1433D1]/60 font-mono select-none">+</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}

export default TrustedClientsGridSection;
