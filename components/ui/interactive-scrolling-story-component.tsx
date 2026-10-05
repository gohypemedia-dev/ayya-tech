'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronRight, Activity, Server, Cpu, Globe } from 'lucide-react';

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
    title: 'Scaling High-Throughput Payment Gateways',
    description:
      'Re-architected distributed microservices handling 25M+ daily transactions with 99.99% uptime and sub-50ms latency across global endpoints.',
    metrics: '25M+ Daily Transactions • Sub-50ms Latency',
    metricValue: '99.99%',
    metricLabel: 'Platform Availability SLA',
    impact: 'Zero packet drop during 15x peak holiday load surge',
    stack: ['AWS EKS', 'PostgreSQL', 'Kafka', 'Go', 'Redis'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'CLOUD MODERNIZATION',
    tag: 'Case Study 02',
    client: 'Enterprise Enterprise SaaS',
    title: 'Global SaaS Multi-Region Migration',
    description:
      'Automated continuous zero-downtime database replication and Terraform IaC deployments across EU and US regions for enterprise compliance and low-latency delivery.',
    metrics: 'Multi-Region Replication • Zero Downtime Cutover',
    metricValue: '100%',
    metricLabel: 'Zero-Downtime Data Migration',
    impact: 'Saved $180k/yr in redundant cloud compute spend',
    stack: ['GCP Cloud Run', 'Terraform', 'BigQuery', 'Docker', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'AI & EVENT-DRIVEN SYSTEMS',
    tag: 'Case Study 03',
    client: 'Algorithmic Risk Platform',
    title: 'Real-Time Fraud & Anomaly Detection',
    description:
      'Engineered an ultra-low latency streaming inference pipeline processing 100,000 events/sec with sub-second ML decisioning and automated threat isolation.',
    metrics: '100,000 Events/sec • 99.4% Model Precision',
    metricValue: '<12ms',
    metricLabel: 'End-to-End Decision Latency',
    impact: '$4.2M prevented fraud losses within first 90 days',
    stack: ['Apache Flink', 'Python ML', 'Kubernetes', 'ClickHouse', 'gRPC'],
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'HIGH-CONCURRENCY COMMERCE',
    tag: 'Case Study 04',
    client: 'D2C Retail Unicorn',
    title: 'Next-Gen Headless E-Commerce Platform',
    description:
      'Modernized core commerce architecture to withstand 10x traffic surges during flash sales with sub-second page loads and instantaneous checkouts.',
    metrics: '3.4x Faster Checkout • 40% Lower Infra Costs',
    metricValue: '3.4x',
    metricLabel: 'Checkout Speed Improvement',
    impact: 'Handled 1.2M concurrent shoppers without degradation',
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
  badgeText = 'PROVEN RESULTS',
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
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-[#E2E6EB] gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EE461F]" />
                <span className="text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#EE461F]">
                  {badgeText}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121A50]">
                Featured Case Studies
              </h2>
            </div>

            {/* Interactive Progress Indicators / Tabs */}
            <div className="flex items-center gap-2 self-start sm:self-end">
              <span className="text-xs font-mono font-bold text-[#121A50] mr-2">
                0{activeIndex + 1} <span className="text-[#8C98A9]">/ 0{slides.length}</span>
              </span>
              <div className="flex items-center gap-1.5 bg-[#EDF0F3] p-1.5 rounded-full border border-[#DFE4EA]">
                {slides.map((slide, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToSlide(idx)}
                    className={`px-3 py-1 text-[11px] font-mono font-bold rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex
                        ? 'bg-[#EE461F] text-white shadow-xs'
                        : 'text-[#4B5565] hover:text-[#121A50] hover:bg-white/70'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1 my-auto py-4">
            
            {/* Left Column: Narrative & Metrics */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Category Pill & Client */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#FDEAE4] text-[#EE461F] text-xs font-mono font-bold uppercase tracking-wider rounded-md border border-[#FAD2C7]">
                  {activeSlide.category}
                </span>
                {activeSlide.client && (
                  <span className="text-xs font-semibold text-[#717E91]">
                    • {activeSlide.client}
                  </span>
                )}
              </div>

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

            {/* Right Column: Visual Showcase Device Mockup */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-[460px] bg-white rounded-2xl shadow-xl border border-[#DFE4EA] overflow-hidden">
                {/* Mockup Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#F4F6F8] border-b border-[#DFE4EA]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#8C98A9]">
                    ayyatech.com/cases/0{activeIndex + 1}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#EE461F] border border-[#DFE4EA]">
                    LIVE
                  </span>
                </div>

                {/* Sliding Viewport */}
                <div className="relative h-[340px] sm:h-[380px] w-full overflow-hidden bg-[#121A50]">
                  <div
                    className="w-full transition-transform duration-700 ease-in-out"
                    style={{
                      height: `${slides.length * 100}%`,
                      transform: `translateY(-${(activeIndex * 100) / slides.length}%)`,
                    }}
                  >
                    {slides.map((slide, idx) => (
                      <div
                        key={idx}
                        className="w-full relative group overflow-hidden"
                        style={{ height: `${100 / slides.length}%` }}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#EE461F] font-bold">
                            {slide.category}
                          </span>
                          <h4 className="text-lg font-bold leading-snug text-white mt-1">
                            {slide.title}
                          </h4>
                          <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                            {slide.metrics}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer of the sticky panel */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2E6EB]/60 text-xs text-[#8C98A9] font-mono shrink-0">
            <span>SCROLL TO ADVANCE STORIES</span>
            <span>END-TO-END PRODUCTION SYSTEMS</span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ScrollingFeatureShowcase;
