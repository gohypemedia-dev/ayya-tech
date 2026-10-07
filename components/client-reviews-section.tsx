'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, Building2, ShieldCheck } from 'lucide-react';

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

const reviews: Review[] = [
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

export function ClientReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay timer every 2 seconds (2000ms)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section
      id="reviews"
      className="relative w-full bg-[#FCFDFE] text-[#121A50] py-20 lg:py-28 border-t border-[#DFE4EA] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#EE461F]/10 via-[#1433D1]/5 to-[#EE461F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121A50] leading-tight">
            Trusted by Global Enterprise Leaders
          </h2>
        </div>

        {/* 3D Overlapping Carousel Stage */}
        <div className="relative w-full h-[420px] sm:h-[400px] flex items-center justify-center">
          
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {reviews.map((review, idx) => {
              // Compute distance relative to active center index
              let diff = (idx - currentIndex + reviews.length) % reviews.length;
              if (diff > reviews.length / 2) diff -= reviews.length;

              // Only render center, prev (-1), and next (1) for 3D overlap effect
              const isVisible = Math.abs(diff) <= 1;

              if (!isVisible) return null;

              const isCenter = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;

              return (
                <motion.div
                  key={review.id}
                  initial={false}
                  animate={{
                    x: isCenter ? '0%' : isPrev ? '-48%' : '48%',
                    scale: isCenter ? 1 : 0.88,
                    opacity: isCenter ? 1 : 0.65,
                    zIndex: isCenter ? 30 : 10,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onClick={() => {
                    if (isPrev) handlePrev();
                    if (isNext) handleNext();
                  }}
                  className={`absolute w-full max-w-[340px] sm:max-w-[540px] p-6 sm:p-8 rounded-2xl border transition-shadow duration-300 cursor-pointer bg-white ${
                    isCenter
                      ? 'border-[#EE461F] shadow-2xl shadow-[#121A50]/15'
                      : 'border-[#DFE4EA] shadow-lg hover:opacity-90'
                  }`}
                >
                  {/* Top Row: Rating Stars & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#EE461F] text-[#EE461F]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#EE461F] uppercase tracking-wider bg-[#EE461F]/10 px-3 py-1 rounded-full border border-[#EE461F]/20">
                      {review.badge}
                    </span>
                  </div>

                  {/* Review Content Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-[#EE461F]/15 absolute -top-3 -left-2 -z-10" />
                    <p className={`text-sm sm:text-base leading-relaxed ${isCenter ? 'text-[#121A50] font-medium' : 'text-[#4B5565]'}`}>
                      "{review.content}"
                    </p>
                  </div>

                  {/* Author Meta Info */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#EE461F]/30 shrink-0"
                    />
                    <div className="text-left overflow-hidden">
                      <h4 className="text-sm font-bold text-[#121A50] truncate">{review.name}</h4>
                      <p className="text-xs text-[#4B5565] truncate">
                        {review.role} • <span className="font-semibold text-[#121A50]">{review.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientReviewsSection;
