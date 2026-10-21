"use client";

import type React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

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
      '/images/case-studies/payments.png',
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
      '/images/case-studies/cloud.png',
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
      '/images/case-studies/ai.png',
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
      '/images/case-studies/commerce.png',
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
  ctaText = 'Discuss your project',
  className = '',
}: ScrollingFeatureShowcaseProps) {
  return (
    <section id="case-studies" aria-label="Case study projects" className={`w-full px-5 sm:px-8 lg:px-12 pb-16 text-[#121D50] ${className}`}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {slides.map((slide) => (
          <article key={slide.tag} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#EDF0F3] bg-white">
            <div className="relative aspect-[16/10] bg-[#EDF0F3]">
              <Image src={slide.image} alt={`${slide.title} project preview`} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 44px), calc(50vw - 60px)" className="object-cover" unoptimized={!slide.image.startsWith('/')} />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="mb-3 text-xs font-medium text-[#0E33CB]">{slide.category.toLowerCase().replace(/^./, c => c.toUpperCase())}</p>
              <h2 className="text-xl font-semibold leading-snug tracking-[-0.035em] text-[#0E33CB] sm:text-2xl">{slide.title}</h2>
              <p className="mt-3 text-sm leading-7">{slide.description}</p>
              <div className="my-5 grid grid-cols-2 gap-4 border-y border-[#EDF0F3] py-4">
                <div>
                  <p className="text-xl font-semibold text-[#0E33CB]">{slide.metricValue || slide.metrics}</p>
                  <p className="mt-1 text-xs leading-relaxed">{slide.metricLabel || 'Project outcome'}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold">Impact</p>
                  <p className="text-xs leading-relaxed">{slide.impact || slide.metrics}</p>
                </div>
              </div>
              <ul aria-label="Technologies used" className="mb-6 flex flex-wrap gap-2">
                {slide.stack.map(tech => <li key={tech} className="rounded-md bg-[#EDF0F3] px-2.5 py-1 text-xs">{tech}</li>)}
              </ul>
              {onCtaClick && <button type="button" onClick={onCtaClick} className="mt-auto inline-flex w-fit cursor-pointer items-center gap-3 rounded-lg bg-[#EC4621] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0E33CB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F45E4]">{ctaText}<ArrowUpRight size={16} aria-hidden="true" /></button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ScrollingFeatureShowcase;
