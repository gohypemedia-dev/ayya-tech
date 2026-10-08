'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* Exact 9 website services */
const WEBSITE_SERVICES = [
  'IT CONSULTANCY SERVICES',
  'SOFTWARE DEVELOPMENT',
  'LOW-CODE / NO-CODE APPLICATIONS',
  'CLOUD-NATIVE ARCHITECTURE',
  'IOT (INTERNET OF THINGS)',
  'MOBILE DEVELOPMENT',
  'WEBSITE DEVELOPMENT',
  'AI-POWERED SOFTWARE',
  'IT RESOURCES & STAFF AUGMENTATION',
];

export function YellowServicesTicker() {
  // Duplicate array 3 times for seamless 100% infinite looping
  const repeatedServices = [
    ...WEBSITE_SERVICES,
    ...WEBSITE_SERVICES,
    ...WEBSITE_SERVICES,
  ];

  return (
    <div className="relative w-full overflow-hidden py-3 bg-transparent z-20">
      {/* Light-themed tilted strip without black background & with slow motion scroll */}
      <div className="relative w-[112%] -left-[6%] -rotate-1 bg-gradient-to-r from-[#EEF4FF] via-[#F8FAFC] to-[#EBF3FF] border-y border-[#1433D1]/20 py-3 sm:py-4 shadow-sm overflow-hidden flex items-center select-none backdrop-blur-md">
        <motion.div
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 70, // Slow motion smooth scroll speed
          }}
          className="flex items-center whitespace-nowrap shrink-0 gap-8 sm:gap-12"
        >
          {repeatedServices.map((service, index) => (
            <React.Fragment key={index}>
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-[#121A50] tracking-wider uppercase font-sans">
                {service}
              </span>
              <span className="text-sm sm:text-lg text-[#EE461F] font-black">
                ✦
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default YellowServicesTicker;
