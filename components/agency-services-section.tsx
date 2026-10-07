'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Briefcase,
  Code2,
  Layers,
  Cloud,
  Cpu,
  Smartphone,
  Globe,
  Bot,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';

interface AgencyServicesSectionProps {
  onQuoteClick?: () => void;
  onExploreClick?: (serviceTitle: string) => void;
}

const servicesList = [
  {
    number: '01',
    category: 'STRATEGIC ADVISORY',
    title: 'IT Consultancy Services',
    shortDesc: 'Strategic tech roadmaps, digital transformation & enterprise architecture.',
    description:
      'Empowering enterprise growth through high-level technology consulting, legacy system modernization, CTO-as-a-service advisory, and resilient IT architecture design tailored to your strategic roadmap.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    icon: Briefcase,
    highlights: [
      'CTO advisory & digital transformation roadmaps',
      'Legacy modernization & enterprise IT auditing',
      'Cybersecurity compliance & operational resilience',
    ],
  },
  {
    number: '02',
    category: 'CUSTOM ENGINEERING',
    title: 'Software Development',
    shortDesc: 'Custom enterprise software, API ecosystems & scalable platforms.',
    description:
      'We design, build, and deploy robust full-stack software applications crafted to solve complex business challenges with microservices architecture and clean code standards.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    icon: Code2,
    highlights: [
      'Bespoke full-stack web & backend platform builds',
      'Microservices architecture & high-throughput APIs',
      'Automated testing pipelines & CI/CD deployment',
    ],
  },
  {
    number: '03',
    category: 'RAPID APPLICATION',
    title: 'Low-Code / No-Code Applications',
    shortDesc: 'Rapid deployment with Webflow, Retool, Bubble & automated workflows.',
    description:
      'Accelerate your time-to-market with enterprise-grade low-code/no-code platforms, custom internal tools, workflow automation, and seamless third-party API integrations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    icon: Layers,
    highlights: [
      'Rapid MVP & internal tool deployment in days',
      'Custom Webflow, Retool, Bubble & FlutterFlow builds',
      'Zapier & Make automated business logic pipelines',
    ],
  },
  {
    number: '04',
    category: 'CLOUD & DEVOPS',
    title: 'Cloud-Native Architecture',
    shortDesc: 'AWS, Azure, Kubernetes, serverless & 99.99% uptime infra.',
    description:
      'Build scalable, auto-healing cloud environments using AWS, Azure, Docker, and Kubernetes with serverless scalability, IaC infrastructure automation, and 99.99% operational uptime.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    icon: Cloud,
    highlights: [
      'Multi-cloud deployment (AWS, GCP, Azure & Vercel)',
      'Kubernetes orchestration & Infrastructure as Code (Terraform)',
      'Zero-downtime CI/CD pipelines & automated monitoring',
    ],
  },
  {
    number: '05',
    category: 'CONNECTED SYSTEMS',
    title: 'IoT (Internet of Things)',
    shortDesc: 'Connected sensors, smart edge devices & real-time analytics.',
    description:
      'Connecting hardware devices to intelligent cloud platforms with low-latency MQTT protocols, telemetry data processing, embedded software, and real-time remote device monitoring.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    icon: Cpu,
    highlights: [
      'End-to-end IoT sensor & hardware connectivity',
      'Real-time telemetry ingestion & edge computing',
      'Custom IoT dashboards & MQTT / WebSockets streaming',
    ],
  },
  {
    number: '06',
    category: 'CROSS-PLATFORM MOBILE',
    title: 'Mobile App Development',
    shortDesc: 'High-performance React Native & Flutter iOS / Android apps.',
    description:
      'Creating engaging mobile user experiences for iOS and Android with React Native and Flutter, complete with offline sync, biometric security, push notifications, and store optimization.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    icon: Smartphone,
    highlights: [
      'iOS & Android native performance with React Native / Flutter',
      'Seamless offline data sync & biometric security',
      'App Store & Google Play launch optimization',
    ],
  },
  {
    number: '07',
    category: 'WEB & DIGITAL EXPERIENCES',
    title: 'Website Development',
    shortDesc: 'Next.js 16, React 19, Headless CMS & sub-second Core Web Vitals.',
    description:
      'We engineer pixel-perfect, ultra-fast digital platforms using Next.js 16 and modern headless architectures designed for seamless user experience, high conversion rates, and enterprise-grade reliability.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    icon: Globe,
    highlights: [
      'Next.js 16 & React 19 Server Components architecture',
      'Sub-second Core Web Vitals & edge CDN acceleration',
      'Seamless headless CMS, Stripe & CRM API integrations',
    ],
  },
  {
    number: '08',
    category: 'INTELLIGENT AUTOMATION',
    title: 'AI-Powered Software',
    shortDesc: 'Custom LLM integrations, predictive RAG & intelligent agents.',
    description:
      'Transforming enterprise operations with custom LLM integrations, Retrieval-Augmented Generation (RAG), predictive analytics models, and autonomous AI agents designed for real-world workflows.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    icon: Bot,
    highlights: [
      'Custom LLM fine-tuning & RAG pipeline integration',
      'Autonomous AI agent workflows for enterprise operations',
      'Predictive analytics, NLP & computer vision models',
    ],
  },
  {
    number: '09',
    category: 'TALENT & STAFFING',
    title: 'IT Resources & Staff Augmentation',
    shortDesc: 'Dedicated senior developers, DevOps engineers & agile squads.',
    description:
      'Scale your internal engineering team on-demand with pre-vetted senior full-stack developers, cloud architects, QA engineers, and UI/UX designers ready to integrate into your agile workflow.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    icon: Users,
    highlights: [
      'Top 1% pre-vetted senior engineering talent',
      'Flexible engagement: staff augmentation or dedicated pods',
      'Seamless timezone overlap & immediate 48-hour onboarding',
    ],
  },
];

export function AgencyServicesSection({
  onQuoteClick,
  onExploreClick,
}: AgencyServicesSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  // Raw Scroll Progress for Section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Physics Spring Dampening for Liquid-Smooth Slow Motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0005,
  });

  // Step Distance Math: 88.25vw step * 8 = 706vw total translation (50% gap reduction)
  const screenX = useTransform(smoothProgress, [0, 1], ['0vw', '-706vw']);

  // Parallax Background movement
  const parallaxBgX = useTransform(smoothProgress, [0, 1], ['-15%', '15%']);

  return (
    <section id="services" ref={targetRef} className="relative w-full h-[600vh] bg-[#080D2B] text-white">
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6">
        
        {/* Ambient Background Glow */}
        <motion.div
          style={{ x: parallaxBgX }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[600px] bg-gradient-to-r from-[#EE461F]/20 via-[#1433D1]/25 to-purple-600/20 blur-[140px] pointer-events-none z-0"
        />

        {/* TOP SECTION HEADER (Fixed in Viewport) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center mb-2 sm:mb-4">
          {/* Section Main Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-4xl">
            <span className="text-white">Transformative </span>
            <span className="bg-gradient-to-r from-[#EE461F] via-orange-400 to-[#EE461F] bg-clip-text text-transparent">Digital Engineering</span>
            <span className="text-white"> &amp; Technology Services</span>
          </h2>
        </div>

        {/* EXACT HORIZONTAL SCREEN STAGE */}
        <div className="relative z-10 w-full flex-1 overflow-hidden flex items-center">
          <motion.div style={{ x: screenX }} className="relative w-full h-full flex items-center">
            {servicesList.map((service, idx) => {
              const IconComponent = service.icon;

              return (
                <div
                  key={service.number}
                  style={{ left: `${50 + idx * 88.25}vw` }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[920px] shrink-0 flex justify-center items-center"
                >
                  {/* Service Card (LIGHT THEME) */}
                  <div className="w-full h-[400px] sm:h-[440px] bg-white backdrop-blur-2xl border border-slate-200/80 rounded-[10px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative group flex flex-col justify-between p-5 sm:p-7 transition-all duration-300 hover:border-[#EE461F] hover:shadow-[0_25px_60px_rgba(238,70,31,0.25)]">
                    
                    {/* Right-Side Image Visual Zone */}
                    <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[60%] overflow-hidden pointer-events-none z-0 rounded-r-[10px]">
                      <img
                        src={service.image}
                        alt={service.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80';
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
                      />
                      {/* Smooth Fade Gradient to White Text Container */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/20" />
                    </div>

                    {/* CARD TOP ROW */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080D2B] text-white font-bold text-xs shadow-md border border-[#080D2B]/30">
                        <IconComponent className="w-3.5 h-3.5 text-[#EE461F]" />
                        <span>{service.category}</span>
                      </div>
                    </div>

                    {/* CARD MIDDLE CONTENT */}
                    <div className="relative z-10 mt-auto mb-3">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#080D2B] tracking-tight leading-tight mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl line-clamp-2 font-medium">
                        {service.description}
                      </p>

                      {/* Highlights List */}
                      <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-slate-200">
                        {service.highlights.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#080D2B] bg-slate-100 px-3 py-1 rounded-full border border-slate-200 shadow-2xs"
                          >
                            <Check className="w-3 h-3 text-[#EE461F]" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CARD BOTTOM ACTION ROW */}
                    <div className="relative z-10 pt-3 border-t border-slate-200 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (onExploreClick) {
                            onExploreClick(service.title);
                          } else if (onQuoteClick) {
                            onQuoteClick();
                          }
                        }}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#080D2B] group-hover:text-[#EE461F] transition-colors cursor-pointer"
                      >
                        <span>Explore Service Details</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => onQuoteClick?.()}
                        className="px-5 py-2 rounded-lg bg-[#EE461F] hover:bg-[#D63B15] text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-orange-500/20"
                      >
                        Get Started
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>


      </div>
    </section>
  );
}

export default AgencyServicesSection;
