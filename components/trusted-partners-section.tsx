'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TrustedPartnersSectionProps {
  className?: string;
}

// Enterprise Client / Partner Logos Data
const PARTNER_LOGOS = [
  {
    name: '8VC',
    svg: (
      <svg className="h-8 sm:h-10 w-auto" viewBox="0 0 160 50" fill="currentColor">
        <text x="10" y="38" fontFamily="sans-serif" fontSize="36" fontWeight="300" letterSpacing="2">8VC</text>
      </svg>
    ),
  },
  {
    name: 'Ryder',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 180 50" fill="currentColor">
        <path d="M15 38 L30 10 L60 10 C75 10 85 18 80 28 C76 36 65 38 50 38 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="35" y="35" fontFamily="sans-serif" fontSize="30" fontWeight="900" fontStyle="italic">Ryder</text>
      </svg>
    ),
  },
  {
    name: 'Lineage',
    svg: (
      <svg className="h-8 sm:h-10 w-auto" viewBox="0 0 200 50" fill="currentColor">
        <g transform="translate(10, 8)">
          <polygon points="12,0 24,10 18,24 6,24 0,10" fill="currentColor" opacity="0.8" />
          <polygon points="28,0 40,10 34,24 22,24 16,10" fill="currentColor" />
        </g>
        <text x="58" y="34" fontFamily="sans-serif" fontSize="26" fontWeight="700">Lineage</text>
      </svg>
    ),
  },
  {
    name: 'Prologis',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 200 50" fill="currentColor">
        <circle cx="25" cy="25" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M20 18 L32 25 L20 32 Z" fill="currentColor" />
        <text x="52" y="33" fontFamily="sans-serif" fontSize="24" fontWeight="800" letterSpacing="3">PROLOGIS</text>
      </svg>
    ),
  },
  {
    name: 'NFI',
    svg: (
      <svg className="h-8 sm:h-10 w-auto" viewBox="0 0 180 50" fill="currentColor">
        <path d="M10 12 C60 2 120 2 160 22 C110 32 50 32 10 12 Z" fill="currentColor" opacity="0.2" />
        <text x="25" y="38" fontFamily="sans-serif" fontSize="32" fontWeight="900" fontStyle="italic" letterSpacing="2">NFI</text>
      </svg>
    ),
  },
  {
    name: 'AWS',
    svg: (
      <svg className="h-8 sm:h-10 w-auto" viewBox="0 0 160 50" fill="currentColor">
        <text x="15" y="34" fontFamily="sans-serif" fontSize="30" fontWeight="900" letterSpacing="2">aws</text>
        <path d="M20 40 Q 80 50 140 38" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: 'Snowflake',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 200 50" fill="currentColor">
        <path d="M25 10 L25 40 M10 25 L40 25 M14 14 L36 36 M14 36 L36 14" stroke="currentColor" strokeWidth="3" fill="none" />
        <text x="52" y="34" fontFamily="sans-serif" fontSize="24" fontWeight="700">snowflake</text>
      </svg>
    ),
  },
  {
    name: 'Stripe',
    svg: (
      <svg className="h-8 sm:h-10 w-auto" viewBox="0 0 180 50" fill="currentColor">
        <text x="20" y="36" fontFamily="sans-serif" fontSize="34" fontWeight="800" letterSpacing="-1">stripe</text>
      </svg>
    ),
  },
  {
    name: 'Datadog',
    svg: (
      <svg className="h-8 sm:h-10 w-auto" viewBox="0 0 200 50" fill="currentColor">
        <rect x="15" y="12" width="26" height="26" rx="6" fill="currentColor" opacity="0.8" />
        <text x="52" y="34" fontFamily="sans-serif" fontSize="24" fontWeight="800">DATADOG</text>
      </svg>
    ),
  },
  {
    name: 'Twilio',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 180 50" fill="currentColor">
        <circle cx="25" cy="25" r="12" fill="currentColor" />
        <text x="50" y="33" fontFamily="sans-serif" fontSize="26" fontWeight="700">twilio</text>
      </svg>
    ),
  },
];

export function TrustedPartnersSection({ className = '' }: TrustedPartnersSectionProps) {
  return (
    <section className={`relative w-full bg-[#FAF8F5] text-[#121A50] py-20 sm:py-28 px-4 sm:px-8 border-b border-[#E8E4DD] ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Centered Capsule Tag */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#E4E0D8] text-[11px] font-mono font-bold text-[#717E91] uppercase tracking-widest mb-6 shadow-2xs">
          BUILT FOR & TRUSTED BY INDUSTRY LEADERS
        </div>

        {/* Heading indicating which companies we work with */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#121A50] text-center tracking-tight leading-tight max-w-4xl mx-auto mb-16 sm:mb-20">
          Trusted by logistics &amp; enterprise leaders who demand a new benchmark in performance
        </h2>

        {/* Technical Crosshair Grid Layout for Partner Logos (1:1 matching screenshot) */}
        <div className="w-full max-w-6xl border-t border-l border-[#E6E1D8] bg-white/40 shadow-xs relative">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {PARTNER_LOGOS.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative h-28 sm:h-36 border-r border-b border-[#E6E1D8] flex items-center justify-center p-6 text-[#4A5568] hover:text-[#121A50] hover:bg-white/80 transition-all duration-300 group cursor-pointer"
              >
                {/* Plus (+) Crosshairs at corners matching screenshot */}
                <span className="absolute -top-1.5 -left-1.5 text-[10px] text-stone-400 font-mono select-none">
                  +
                </span>
                <span className="absolute -top-1.5 -right-1.5 text-[10px] text-stone-400 font-mono select-none">
                  +
                </span>
                <span className="absolute -bottom-1.5 -left-1.5 text-[10px] text-stone-400 font-mono select-none">
                  +
                </span>
                <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-stone-400 font-mono select-none">
                  +
                </span>

                {/* Monochromatic Gray SVG Logo with Hover Polish */}
                <div className="opacity-65 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                  {partner.svg}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default TrustedPartnersSection;
