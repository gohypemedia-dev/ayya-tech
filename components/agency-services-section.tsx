'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  shortDesc: string;
  tagline: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  highlights: string[];
  ctaText: string;
}

const servicesList: ServiceItem[] = [
  {
    id: 'it-consultancy',
    number: '01',
    category: 'STRATEGIC ADVISORY',
    title: 'IT Consultancy Services',
    shortDesc: 'Strategic tech roadmaps, digital transformation & enterprise architecture.',
    tagline: 'Strategic IT Advisory & Digital Transformation Engineering',
    description:
      'Empowering enterprise growth through high-level technology consulting, legacy system modernization, CTO-as-a-service advisory, and resilient IT architecture design tailored to your strategic roadmap.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    icon: <Briefcase className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'CTO advisory & digital transformation roadmaps',
      'Legacy modernization & enterprise IT auditing',
      'Cybersecurity compliance & operational resilience',
    ],
    ctaText: 'Explore IT Consultancy',
  },
  {
    id: 'software-development',
    number: '02',
    category: 'CUSTOM ENGINEERING',
    title: 'Software Development',
    shortDesc: 'Custom enterprise software, API ecosystems & scalable platforms.',
    tagline: 'Bespoke Enterprise Software & Platform Development',
    description:
      'We design, build, and deploy robust full-stack software applications crafted to solve complex business challenges with microservices architecture and clean code standards.',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1200&q=80',
    icon: <Code2 className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'Bespoke full-stack web & backend platform builds',
      'Microservices architecture & high-throughput APIs',
      'Automated testing pipelines & CI/CD deployment',
    ],
    ctaText: 'Explore Software Development',
  },
  {
    id: 'low-code-no-code',
    number: '03',
    category: 'RAPID APPLICATION',
    title: 'Low-Code / No-Code Applications',
    shortDesc: 'Rapid deployment with Webflow, Retool, Bubble & automated workflows.',
    tagline: 'High-Speed Low-Code & No-Code App Engineering',
    description:
      'Accelerate your time-to-market with enterprise-grade low-code/no-code platforms, custom internal tools, workflow automation, and seamless third-party API integrations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    icon: <Layers className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'Rapid MVP & internal tool deployment in days',
      'Custom Webflow, Retool, Bubble & FlutterFlow builds',
      'Zapier & Make automated business logic pipelines',
    ],
    ctaText: 'Explore Low-Code Solutions',
  },
  {
    id: 'cloud-native',
    number: '04',
    category: 'CLOUD & DEVOPS',
    title: 'Cloud-Native Architecture',
    shortDesc: 'AWS, Azure, Kubernetes, serverless & 99.99% uptime infra.',
    tagline: 'Resilient Cloud-Native Infrastructure & DevOps Engineering',
    description:
      'Build scalable, auto-healing cloud environments using AWS, Azure, Docker, and Kubernetes with serverless scalability, IaC infrastructure automation, and 99.99% operational uptime.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    icon: <Cloud className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'Multi-cloud deployment (AWS, GCP, Azure & Vercel)',
      'Kubernetes orchestration & Infrastructure as Code (Terraform)',
      'Zero-downtime CI/CD pipelines & automated monitoring',
    ],
    ctaText: 'Explore Cloud Architecture',
  },
  {
    id: 'iot-development',
    number: '05',
    category: 'CONNECTED SYSTEMS',
    title: 'IoT (Internet of Things)',
    shortDesc: 'Connected sensors, smart edge devices & real-time analytics.',
    tagline: 'Smart IoT Hardware Integration & Real-Time Edge Analytics',
    description:
      'Connecting hardware devices to intelligent cloud platforms with low-latency MQTT protocols, telemetry data processing, embedded software, and real-time remote device monitoring.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    icon: <Cpu className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'End-to-end IoT sensor & hardware connectivity',
      'Real-time telemetry ingestion & edge computing',
      'Custom IoT dashboards & MQTT / WebSockets streaming',
    ],
    ctaText: 'Explore IoT Solutions',
  },
  {
    id: 'mobile-development',
    number: '06',
    category: 'CROSS-PLATFORM MOBILE',
    title: 'Mobile App Development',
    shortDesc: 'High-performance React Native & Flutter iOS / Android apps.',
    tagline: 'Native & Cross-Platform iOS & Android Mobile Apps',
    description:
      'Creating engaging mobile user experiences for iOS and Android with React Native and Flutter, complete with offline sync, biometric security, push notifications, and store optimization.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    icon: <Smartphone className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'iOS & Android native performance with React Native / Flutter',
      'Seamless offline data sync & biometric security',
      'App Store & Google Play launch optimization',
    ],
    ctaText: 'Explore Mobile Development',
  },
  {
    id: 'website-development',
    number: '07',
    category: 'WEB & DIGITAL EXPERIENCES',
    title: 'Website Development',
    shortDesc: 'Next.js 16, React 19, Headless CMS & sub-second Core Web Vitals.',
    tagline: 'High-Performance Websites & Digital Web Platforms',
    description:
      'We engineer pixel-perfect, ultra-fast digital platforms using Next.js 16 and modern headless architectures designed for seamless user experience, high conversion rates, and enterprise-grade reliability.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    icon: <Globe className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'Next.js 16 & React 19 Server Components architecture',
      'Sub-second Core Web Vitals & edge CDN acceleration',
      'Seamless headless CMS, Stripe & CRM API integrations',
    ],
    ctaText: 'Explore Website Development',
  },
  {
    id: 'ai-powered-software',
    number: '08',
    category: 'INTELLIGENT AUTOMATION',
    title: 'AI-Powered Software',
    shortDesc: 'Custom LLM integrations, predictive RAG & intelligent agents.',
    tagline: 'Next-Gen AI Integration & Machine Learning Solutions',
    description:
      'Transforming enterprise operations with custom LLM integrations, Retrieval-Augmented Generation (RAG), predictive analytics models, and autonomous AI agents designed for real-world workflows.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    icon: <Bot className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'Custom LLM fine-tuning & RAG pipeline integration',
      'Autonomous AI agent workflows for enterprise operations',
      'Predictive analytics, NLP & computer vision models',
    ],
    ctaText: 'Explore AI Software',
  },
  {
    id: 'it-resources',
    number: '09',
    category: 'TALENT & STAFFING',
    title: 'IT Resources & Staff Augmentation',
    shortDesc: 'Dedicated senior developers, DevOps engineers & agile squads.',
    tagline: 'Dedicated IT Staff Augmentation & Dedicated Pods',
    description:
      'Scale your internal engineering team on-demand with pre-vetted senior full-stack developers, cloud architects, QA engineers, and UI/UX designers ready to integrate into your agile workflow.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    icon: <Users className="w-5 h-5 text-[#EE461F]" />,
    highlights: [
      'Top 1% pre-vetted senior engineering talent',
      'Flexible engagement: staff augmentation or dedicated pods',
      'Seamless timezone overlap & immediate 48-hour onboarding',
    ],
    ctaText: 'Explore IT Staffing',
  },
];

import { ServiceCarousel, type Service } from '@/components/ui/animated-service-card';

const carouselServices: Service[] = [
  {
    number: '01',
    title: 'IT Consultancy Services',
    description: 'Strategic tech roadmaps, digital transformation & enterprise architecture.',
    icon: Briefcase,
    category: 'STRATEGIC ADVISORY',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    highlights: ['CTO Advisory', 'Legacy Modernization', 'IT Audits'],
    gradient: 'from-[#0E1438] via-[#121A50] to-[#1E2968]',
  },
  {
    number: '02',
    title: 'Software Development',
    description: 'Custom enterprise software, API ecosystems & scalable platforms.',
    icon: Code2,
    category: 'CUSTOM ENGINEERING',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Microservices', 'High-Throughput APIs', 'CI/CD Pipelines'],
    gradient: 'from-[#0F1E4A] via-[#12255B] to-[#163280]',
  },
  {
    number: '03',
    title: 'Low-Code / No-Code Apps',
    description: 'Rapid deployment with Webflow, Retool, Bubble & automated workflows.',
    icon: Layers,
    category: 'RAPID APPLICATION',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Rapid MVP Builds', 'Retool & Bubble', 'Automated Pipelines'],
    gradient: 'from-[#241246] via-[#33185E] to-[#451B80]',
  },
  {
    number: '04',
    title: 'Cloud-Native Architecture',
    description: 'AWS, Azure, Kubernetes, serverless & 99.99% uptime infra.',
    icon: Cloud,
    category: 'CLOUD & DEVOPS',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Kubernetes & Docker', 'Terraform IaC', '99.99% Uptime SLA'],
    gradient: 'from-[#0B2545] via-[#134074] to-[#1D4E89]',
  },
  {
    number: '05',
    title: 'IoT (Internet of Things)',
    description: 'Connected sensors, smart edge devices & real-time analytics.',
    icon: Cpu,
    category: 'CONNECTED SYSTEMS',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Hardware Telemetry', 'MQTT Streaming', 'Edge Analytics'],
    gradient: 'from-[#1A2E3B] via-[#243E50] to-[#2B4C5E]',
  },
  {
    number: '06',
    title: 'Mobile App Development',
    description: 'High-performance React Native & Flutter iOS / Android apps.',
    icon: Smartphone,
    category: 'CROSS-PLATFORM MOBILE',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['iOS & Android Native', 'Biometric Security', 'Offline Sync'],
    gradient: 'from-[#3D182B] via-[#521F3A] to-[#692344]',
  },
  {
    number: '07',
    title: 'Website Development',
    description: 'Next.js 16, React 19, Headless CMS & sub-second Core Web Vitals.',
    icon: Globe,
    category: 'WEB & DIGITAL EXPERIENCES',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Next.js 16 & React 19', 'Edge CDN', 'Headless CMS'],
    gradient: 'from-[#122C34] via-[#1B3C46] to-[#224855]',
  },
  {
    number: '08',
    title: 'AI-Powered Software',
    description: 'Custom LLM integrations, predictive RAG & intelligent agents.',
    icon: Bot,
    category: 'INTELLIGENT AUTOMATION',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    highlights: ['RAG Pipelines', 'Autonomous Agents', 'Predictive Analytics'],
    gradient: 'from-[#3B1F10] via-[#542B16] to-[#6B3215]',
  },
  {
    number: '09',
    title: 'IT Staff Augmentation',
    description: 'Dedicated senior developers, DevOps engineers & agile squads.',
    icon: Users,
    category: 'TALENT & STAFFING',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Top 1% Talent', '48-Hour Onboarding', 'Dedicated Pods'],
    gradient: 'from-[#1D2D44] via-[#2B3E59] to-[#3E5C76]',
  },
];

export function AgencyServicesSection({
  onQuoteClick,
  onExploreClick,
}: AgencyServicesSectionProps) {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const jumpToSpotlightStage = (index: number) => {
    const el = document.getElementById('services-carousel-wrapper');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative w-full bg-[#FCFDFE] text-[#121A50] border-b border-[#DFE4EA]">
      {/* ========================================================= */}
      {/* INTEGRATED ANIMATED SERVICE CAROUSEL */}
      {/* ========================================================= */}
      <div id="services-carousel-wrapper" className="w-full bg-[#080D2B] py-20 lg:py-28 relative overflow-hidden border-t border-white/10 text-white">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[500px] bg-gradient-to-r from-[#EE461F]/15 via-indigo-600/10 to-[#1433D1]/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 mb-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Enterprise Engineering Services &amp; Digital Solutions
          </h2>
        </div>

        {/* Integrated Animated Service Carousel */}
        <div className="relative z-10">
          <ServiceCarousel services={carouselServices} />
        </div>
      </div>

    </section>
  );
}

export default AgencyServicesSection;

