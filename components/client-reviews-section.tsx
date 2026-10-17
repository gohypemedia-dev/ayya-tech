'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  badge: string;
  content: string;
}

export const reviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'FinEdge Global',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Cloud-Native Migration',
    content:
      'Ayya Tech delivered our multi-cloud microservices architecture with zero operational downtime. Their senior engineering squad operated seamlessly like a core part of our internal tech team.',
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    role: 'VP of Product Engineering',
    company: 'HealthSphere Systems',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Low-Code & Healthcare App',
    content:
      'The custom workflow automation and mobile apps engineered by Ayya Tech reduced patient onboarding overhead by 65%. Exceptional speed, clean code standards, and top-tier communication.',
  },
  {
    id: 'rev-3',
    name: 'David Chen',
    role: 'Founder & CEO',
    company: 'NexaFlow AI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'AI & Custom LLM RAG',
    content:
      'Integrating custom RAG models into our enterprise platform transformed our customer ops overnight. Ayya Tech is genuinely the top 1% technology partner in the industry.',
  },
  {
    id: 'rev-4',
    name: 'Sarah Jenkins',
    role: 'Head of Engineering',
    company: 'LogisticsOne Global',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'IoT Edge Telemetry',
    content:
      'Our IoT hardware telemetry ingests over 10 Million events daily thanks to Ayya Tech\'s low-latency MQTT architecture. Highly reliable infrastructure engineering.',
  },
  {
    id: 'rev-5',
    name: 'Liam O\'Connor',
    role: 'Director of Technology',
    company: 'PayMatrix FinTech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'IT Staff Augmentation',
    content:
      'Their pre-vetted staff augmentation developers were onboarded in under 48 hours and pushed production-ready microservices code within their first week.',
  },
  {
    id: 'rev-6',
    name: 'Sophia Al-Mansoor',
    role: 'Chief Digital Officer',
    company: 'OmniRetail Enterprise',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Next.js 16 Web Platform',
    content:
      'The Next.js 16 digital storefront reduced our Core Web Vitals load times to under 300ms, doubling our online enterprise conversion rates.',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
};

export function ClientReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-move carousel every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section
      id="reviews"
      className="relative w-full bg-[#FCFDFE] text-[#121A50] py-20 lg:py-28 border-t border-[#DFE4EA] overflow-hidden select-none"
    >
      {/* Background Decorator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#EE461F]/10 via-[#1433D1]/5 to-[#EE461F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#121A50] leading-tight">
            TRUSTED BY GLOBAL ENTERPRISE LEADERS
          </h2>
        </div>

        {/* Single Centered Review Card (No Side Cards) */}
        <div className="relative w-full max-w-2xl mx-auto min-h-[320px] sm:min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentReview.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="w-full p-7 sm:p-9 rounded-2xl border border-[#EE461F] bg-white shadow-xl shadow-[#121A50]/10 flex flex-col justify-between"
            >
              {/* Top Row: Rating Stars & Badge */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-1">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EE461F] text-[#EE461F]" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#EE461F] uppercase tracking-wider bg-[#EE461F]/10 px-3 py-1 rounded-full border border-[#EE461F]/20">
                  {currentReview.badge}
                </span>
              </div>

              {/* Review Content Quote */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-[#EE461F]/15 absolute -top-3 -left-2 -z-10" />
                <p className="text-base sm:text-lg leading-relaxed text-[#121A50] font-medium">
                  "{currentReview.content}"
                </p>
              </div>

              {/* Author Meta Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <img
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#EE461F]/30 shrink-0"
                />
                <div className="text-left overflow-hidden">
                  <h4 className="text-base font-bold text-[#121A50] truncate">
                    {currentReview.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5565] truncate">
                    {currentReview.role} • <span className="font-semibold text-[#121A50]">{currentReview.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Controls & Indicators */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-[#DFE4EA] bg-white hover:border-[#EE461F] hover:text-[#EE461F] text-[#121A50] flex items-center justify-center shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i
                    ? 'w-7 bg-[#EE461F]'
                    : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-[#DFE4EA] bg-white hover:border-[#EE461F] hover:text-[#EE461F] text-[#121A50] flex items-center justify-center shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default ClientReviewsSection;
