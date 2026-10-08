'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import {
  Cpu,
  Cloud,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Database,
  Code2,
  Server,
  Lock,
  Activity,
  Globe,
  TrendingUp,
  BarChart3,
  Check,
  Terminal,
  Play
} from 'lucide-react';

interface ParallaxServicesSectionProps {
  onCtaClick?: () => void;
}

interface ServiceCardData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  statValue: string;
  statLabel: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  icon: React.ElementType;
  techStack: string[];
  features: string[];
  visualType: 'network' | 'ai' | 'browser' | 'security';
}

const serviceCards: ServiceCardData[] = [
  {
    id: '01',
    category: 'CLOUD & MICROSERVICES',
    title: 'Enterprise High-Throughput Architecture',
    subtitle: 'Event-Driven Microservices • Sub-10ms Latency • Multi-Region Scaling',
    description:
      'Engineered for maximum resilience and extreme scale. We architect fault-tolerant distributed systems capable of handling 100,000+ transactions per second with zero packet loss.',
    statValue: '100K+',
    statLabel: 'Req / Sec Capacity',
    badgeBg: 'bg-[#EE461F]/10',
    badgeText: 'text-[#EE461F]',
    accentColor: '#EE461F',
    bgGradient: 'from-[#FFF8F6] to-[#FFFFFF]',
    borderColor: 'border-[#EE461F]/20',
    icon: Server,
    techStack: ['Go', 'Rust', 'Kubernetes', 'Apache Kafka', 'gRPC', 'AWS EKS'],
    features: [
      'Active-Active Multi-Region Database Replication',
      'Kafka Event Streaming & Sub-10ms Message Queues',
      'Automated Zero-Downtime CI/CD Blue/Green Deploys',
      'Distributed Tracing with Jaeger & Prometheus'
    ],
    visualType: 'network'
  },
  {
    id: '02',
    category: 'INTELLIGENT AUTOMATION',
    title: 'Real-Time AI & Predictive ML Pipelines',
    subtitle: 'Autonomous AI Agents • Anomaly Isolation • Custom LLM Vector RAG',
    description:
      'Embed real-time machine learning inference engines directly into your core workflow. Detect fraud instantly, automate decisioning, and search unstructured data with sub-12ms precision.',
    statValue: '< 12ms',
    statLabel: 'Decision Latency',
    badgeBg: 'bg-[#1433D1]/10',
    badgeText: 'text-[#1433D1]',
    accentColor: '#1433D1',
    bgGradient: 'from-[#F5F8FF] to-[#FFFFFF]',
    borderColor: 'border-[#1433D1]/20',
    icon: Cpu,
    techStack: ['Python ML', 'PyTorch', 'ClickHouse', 'Apache Flink', 'Pinecone', 'LangChain'],
    features: [
      'Real-Time Anomaly Scoring & Fraud Isolation',
      'Custom LLM Fine-Tuning & Vector RAG Engines',
      'Autonomous Multi-Agent Task Execution',
      'Real-Time Streaming Feature Store Integration'
    ],
    visualType: 'ai'
  },
  {
    id: '03',
    category: 'HIGH-CONCURRENCY WEB',
    title: 'Next-Gen Full-Stack Web & SaaS Platforms',
    subtitle: 'Headless Commerce • Sub-Second Page Loads • Serverless Edge APIs',
    description:
      'Crafting lightning-fast digital experiences with Next.js 15, dynamic server-side rendering, and headless API architecture designed to convert visitors into loyal customers.',
    statValue: '3.4x',
    statLabel: 'Speed Improvement',
    badgeBg: 'bg-[#10B981]/10',
    badgeText: 'text-[#10B981]',
    accentColor: '#10B981',
    bgGradient: 'from-[#F0FDF4] to-[#FFFFFF]',
    borderColor: 'border-[#10B981]/20',
    icon: Code2,
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Supabase'],
    features: [
      'Next.js 15 App Router & Edge Infrastructure',
      'Sub-Second Core Web Vitals (LCP < 0.8s)',
      'Headless Checkout & Stripe API Integrations',
      'Real-Time WebSocket Data Dashboards'
    ],
    visualType: 'browser'
  },
  {
    id: '04',
    category: 'CYBERSECURITY & COMPLIANCE',
    title: 'Zero-Trust Infrastructure & Cloud Audits',
    subtitle: 'SOC-2 Type II Certified • Encrypted Data Vaults • Threat Mitigation',
    description:
      'Fortify your enterprise applications with zero-trust access controls, continuous vulnerability monitoring, and automated infrastructure compliance built for strict global standards.',
    statValue: '99.99%',
    statLabel: 'Uptime SLA',
    badgeBg: 'bg-[#8B5CF6]/10',
    badgeText: 'text-[#8B5CF6]',
    accentColor: '#8B5CF6',
    bgGradient: 'from-[#F9F5FF] to-[#FFFFFF]',
    borderColor: 'border-[#8B5CF6]/20',
    icon: ShieldCheck,
    techStack: ['Terraform', 'HashiCorp Vault', 'Cloudflare Workers', 'Docker', 'OpenTelemetry'],
    features: [
      'Zero-Trust mTLS Microservice Communication',
      'Automated Infrastructure-as-Code Security Audits',
      'Immutable Encryption-at-Rest & In-Transit',
      '24/7 Threat Telemetry & Intrusion Detection'
    ],
    visualType: 'security'
  }
];

function CardVisualContent({ type, accentColor }: { type: string; accentColor: string }) {
  if (type === 'network') {
    return (
      <div className="w-full h-full bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
        
        <div className="flex items-center justify-between relative z-10 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-800">Kafka Stream Cluster</span>
          </div>
          <span className="text-[11px] font-mono font-medium text-slate-500 px-2 py-0.5 rounded bg-slate-100">
            99.999% SLA
          </span>
        </div>

        {/* Nodes Visual Graph */}
        <div className="my-6 grid grid-cols-3 gap-3 relative z-10 items-center text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <Server className="w-5 h-5 text-slate-600 mb-1" />
            <span className="text-[10px] font-mono text-slate-500">Ingress Node</span>
            <span className="text-xs font-bold text-slate-800">50K req/s</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 shadow-md text-white flex flex-col items-center" style={{ backgroundColor: accentColor }}>
            <Activity className="w-5 h-5 text-white mb-1 animate-pulse" />
            <span className="text-[10px] font-mono text-white/80">Event Router</span>
            <span className="text-xs font-bold text-white">4.2ms</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <Database className="w-5 h-5 text-slate-600 mb-1" />
            <span className="text-[10px] font-mono text-slate-500">Persistence</span>
            <span className="text-xs font-bold text-slate-800">0 Packet Loss</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500 relative z-10">
          <span>Active Regions: US-EAST, EU-WEST, AP-SOUTH</span>
          <span className="text-emerald-600 font-bold">● Healthy</span>
        </div>
      </div>
    );
  }

  if (type === 'ai') {
    return (
      <div className="w-full h-full bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-semibold text-slate-800">ML Anomaly Engine</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-blue-600 px-2 py-0.5 rounded bg-blue-50">
            Precision 99.4%
          </span>
        </div>

        {/* Live Anomaly Bars Visual */}
        <div className="my-4 space-y-2.5">
          <div className="flex justify-between text-[11px] text-slate-600 font-medium">
            <span>Transaction Risk Score</span>
            <span className="font-mono text-slate-900 font-bold">0.02 (Safe)</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full w-[25%]" />
          </div>

          <div className="flex justify-between text-[11px] text-slate-600 font-medium pt-1">
            <span>Fraud Isolation Speed</span>
            <span className="font-mono text-slate-900 font-bold">8.4ms</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[90%]" />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Prevented Fraud (90D):</span>
          <span className="font-mono font-bold text-slate-900">$4,200,000</span>
        </div>
      </div>
    );
  }

  if (type === 'browser') {
    return (
      <div className="w-full h-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
        {/* Browser Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="px-3 py-1 bg-slate-100 rounded-md text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-400" />
            <span>https://client-app.tech/dashboard</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Lighthouse Metric Badges */}
        <div className="my-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center">
            <span className="text-lg font-black text-emerald-600 font-mono">100</span>
            <span className="text-[10px] font-semibold text-emerald-800">Performance</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center">
            <span className="text-lg font-black text-emerald-600 font-mono">100</span>
            <span className="text-[10px] font-semibold text-emerald-800">Accessibility</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center">
            <span className="text-lg font-black text-emerald-600 font-mono">100</span>
            <span className="text-[10px] font-semibold text-emerald-800">SEO Score</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
          <span>First Contentful Paint: 0.3s</span>
          <span className="text-emerald-600 font-bold">Fastest 1%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-semibold text-slate-800">Zero-Trust Vault</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-purple-700 px-2 py-0.5 rounded bg-purple-50">
          SOC-2 Type II
        </span>
      </div>

      <div className="my-3 space-y-2">
        <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs">
          <span className="text-slate-700 font-medium">mTLS Payload Encryption</span>
          <span className="text-purple-700 font-bold font-mono">TLS 1.3 Active</span>
        </div>
        <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs">
          <span className="text-slate-700 font-medium">Vulnerability Status</span>
          <span className="text-emerald-600 font-bold font-mono">0 Vulnerabilities</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>Continuous Threat Scans</span>
        <span className="text-purple-600 font-bold">● Active</span>
      </div>
    </div>
  );
}

function StickyParallaxCard({
  card,
  index,
  total,
  onCtaClick
}: {
  card: ServiceCardData;
  index: number;
  total: number;
  onCtaClick?: () => void;
}) {
  const IconComponent = card.icon;

  return (
    <div
      className="sticky top-28 sm:top-32 w-full max-w-5xl mb-12 sm:mb-16 transition-all duration-300"
      style={{
        zIndex: index + 10,
      }}
    >
      <div
        className={`w-full rounded-2xl sm:rounded-3xl border ${card.borderColor} bg-gradient-to-br ${card.bgGradient} p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(18,26,80,0.08)] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(18,26,80,0.12)]`}
      >
        {/* Top Decorative Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: card.accentColor }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Content & Features */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${card.badgeBg} ${card.badgeText} flex items-center gap-1.5`}
              >
                <Sparkles className="w-3 h-3" />
                {card.category}
              </span>
              <span className="text-xs font-mono text-slate-400 font-medium">
                SERVICE 0{index + 1}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold tracking-wide mb-4" style={{ color: card.accentColor }}>
              {card.subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
              {card.description}
            </p>

            {/* Key Capabilities List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-6">
              {card.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" style={{ color: card.accentColor }} />
                  </div>
                  <span className="text-xs text-slate-700 font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {card.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Button & Stat Highlight */}
            <div className="flex flex-wrap items-center gap-6 w-full pt-4 border-t border-slate-200/80">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-102 cursor-pointer"
                style={{ backgroundColor: card.accentColor }}
              >
                <span>Discuss Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {card.statValue}
                </div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider leading-tight">
                  {card.statLabel}
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Light Visual Card */}
          <div className="lg:col-span-5 w-full h-full min-h-[260px] flex flex-col">
            <CardVisualContent type={card.visualType} accentColor={card.accentColor} />
          </div>

        </div>

      </div>
    </div>
  );
}

export function ParallaxServicesSection({ onCtaClick }: ParallaxServicesSectionProps) {
  return (
    <section className="relative w-full bg-[#F8FAFC] text-slate-900 py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden selection:bg-[#EE461F] selection:text-white">
      
      {/* Background Soft Grids & Ambient Light Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f008_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f008_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#EE461F]/05 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#1433D1]/05 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 max-w-4xl">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1433D1]/20 bg-[#1433D1]/05 text-[#1433D1] text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <Zap className="w-4 h-4 fill-current" />
            <span>CORE ENGINEERING SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-5 font-[family-name:var(--font-heading)]">
            Architected for <span className="bg-gradient-to-r from-[#1433D1] via-[#EE461F] to-[#10B981] bg-clip-text text-transparent">Scale, Speed & Security</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl">
            Explore our specialized engineering capabilities. Built for high throughput, sub-second SLAs, and zero-downtime enterprise operations.
          </p>

        </div>

        {/* Sticky Parallax Stacked Cards Container */}
        <div className="w-full flex flex-col items-center relative min-h-screen">
          {serviceCards.map((card, index) => (
            <StickyParallaxCard
              key={card.id}
              card={card}
              index={index}
              total={serviceCards.length}
              onCtaClick={onCtaClick}
            />
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-[0_20px_50px_rgba(18,26,80,0.06)] mt-8">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1433D1] via-[#EE461F] to-[#10B981]" />
          
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Need a Custom Architecture Blueprint?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mb-6">
            Schedule a technical deep-dive with our senior engineering architects to evaluate your legacy migration or new platform rollout.
          </p>

          <button
            onClick={onCtaClick}
            className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span>Request Free Technical Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default ParallaxServicesSection;
