'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export interface StorySlide {
  tag: string;
  category: string;
  title: string;
  description: string;
  metrics: string;
  metricValue?: string;
  metricLabel?: string;
  stack: string[];
  image: string;
  client?: string;
  impact?: string;
  icon?: React.ReactNode;
}

const defaultSlidesData: StorySlide[] = [
  {
    category: 'FINTECH INFRASTRUCTURE',
    tag: 'Case Study 01',
    client: 'Global Payments Provider',
    title: 'Enterprise High-Throughput Payment Engine',
    description:
      'Re-architected distributed microservices handling 25M+ daily transactions with 99.99% uptime SLA and sub-50ms latency across global banking endpoints.',
    metrics: '25M+ Daily Transactions • Sub-50ms Latency',
    metricValue: '99.99%',
    metricLabel: 'Platform Availability SLA',
    impact: 'Handled 25M+ daily transactions with zero packet drop',
    stack: ['AWS EKS', 'PostgreSQL', 'Kafka', 'Go', 'Redis'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'CLOUD MODERNIZATION',
    tag: 'Case Study 02',
    client: 'Enterprise SaaS Provider',
    title: 'Multi-Region Enterprise Cloud Architecture & Migration',
    description:
      'Automated zero-downtime multi-region database replication and infrastructure-as-code deployments across AWS & GCP for low-latency global delivery.',
    metrics: 'Multi-Region Replication • Zero Downtime Cutover',
    metricValue: '100%',
    metricLabel: 'Zero-Downtime Migration',
    impact: 'Reduced cloud infrastructure spend by $180,000/year',
    stack: ['GCP Cloud Run', 'Terraform', 'BigQuery', 'Docker', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'AI & STREAMING SYSTEMS',
    tag: 'Case Study 03',
    client: 'Algorithmic Risk Platform',
    title: 'Real-Time AI Fraud Detection & Event Streaming Pipeline',
    description:
      'Engineered an ultra-low latency event processing engine processing 100,000 events/sec with real-time machine learning anomaly isolation.',
    metrics: '100,000 Events/sec • 99.4% Model Precision',
    metricValue: '<12ms',
    metricLabel: 'End-to-End Decision Latency',
    impact: 'Prevented $4.2M in fraudulent transactions in 90 days',
    stack: ['Apache Flink', 'Python ML', 'Kubernetes', 'ClickHouse', 'gRPC'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'HIGH-CONCURRENCY COMMERCE',
    tag: 'Case Study 04',
    client: 'D2C Retail Unicorn',
    title: 'Next-Gen Headless E-Commerce & Checkout Engine',
    description:
      'Modernized core e-commerce architecture to withstand 10x peak traffic surges during flash sales with sub-second page loads and instant checkouts.',
    metrics: '3.4x Faster Checkout • 40% Lower Infra Costs',
    metricValue: '3.4x',
    metricLabel: 'Checkout Speed Improvement',
    impact: 'Handled 1.2M concurrent shoppers during peak flash sales',
    stack: ['Next.js', 'GraphQL', 'Stripe API', 'Cloudflare Workers', 'Redis'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  },
];

export interface ScrollingFeatureShowcaseProps {
  slides?: StorySlide[];
  onCtaClick?: () => void;
  ctaText?: string;
  badgeText?: string;
  className?: string;
}

export function ScrollingFeatureShowcase({
  slides = defaultSlidesData,
  onCtaClick,
  ctaText = 'Discuss Your Architecture',
  className = '',
}: ScrollingFeatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const newIndex = Math.min(
        slides.length - 1,
        Math.floor(progress * slides.length)
      );

      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [slides.length]);

  const activeSlide = slides[activeIndex] || slides[0];

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const step = totalScrollable / (slides.length - 1 || 1);
    const targetScroll = container.offsetTop + step * index;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="case-studies"
      className={`relative w-full bg-white border-b border-[#DFE4EA] ${className}`}
      style={{ height: `${slides.length * 100}vh` }}
    >
      {/* Sticky Panel pinned during scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center bg-white overflow-hidden pt-20 pb-8 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col h-full justify-between">
          
          {/* Main Content Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1 my-auto py-4">
            
            {/* Left Column: Narrative & Metrics */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#121A50] leading-tight mb-4 min-h-[50px] sm:min-h-[70px] flex items-center">
                {activeSlide.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#4B5565] leading-relaxed max-w-xl mb-6">
                {activeSlide.description}
              </p>

              {/* Key Metrics Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-xl">
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#DFE4EA] flex flex-col">
                  <span className="text-2xl font-black text-[#121A50] leading-none mb-1">
                    {activeSlide.metricValue || '99.9%'}
                  </span>
                  <span className="text-xs text-[#717E91] font-medium">
                    {activeSlide.metricLabel || 'Performance Result'}
                  </span>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#DFE4EA] flex flex-col justify-center">
                  <span className="text-xs font-bold text-[#EE461F] uppercase tracking-wider mb-0.5">
                    Measurable Impact
                  </span>
                  <span className="text-xs text-[#121A50] font-semibold leading-snug">
                    {activeSlide.impact || activeSlide.metrics}
                  </span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs font-mono text-[#8C98A9] mr-1">Stack:</span>
                {activeSlide.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-[#EDF0F3] text-[#121A50] border border-[#DFE4EA]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#EE461F] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#D63B15] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                {activeIndex < slides.length - 1 && (
                  <button
                    type="button"
                    onClick={() => scrollToSlide(activeIndex + 1)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121A50] hover:text-[#EE461F] transition-colors cursor-pointer py-2 px-3"
                  >
                    <span>Next Case Study</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Clean Bright Image Showcase with Ultra-Smooth Ease-In-Out Transition */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-[500px] h-[392px] sm:h-[436px] bg-white rounded-2xl shadow-xl border border-[#DFE4EA] overflow-hidden p-2.5 flex items-center justify-center">
                <motion.img
                  key={`case-study-img-${activeIndex}`}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80';
                  }}
                  className="h-full w-full object-cover object-center rounded-[8px] absolute inset-2.5 transform-gpu"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ScrollingFeatureShowcase;
