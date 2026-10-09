'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
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
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

interface AgencyServicesSectionProps {
  onQuoteClick?: () => void;
  onExploreClick?: (serviceTitle: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

interface SectionGroup {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  layoutPosition: 'right' | 'left'; // Section 1: Right, Section 2: Left, Section 3: Right
  services: ServiceItem[];
}

/* Helper function to render authentic SVG brand logos for technology tags */
function renderTechLogo(tag: string) {
  const lower = tag.toLowerCase();

  // Next.js 16 Official Logo
  if (lower.includes('next.js')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path
          d="M149.508 157.52L69.142 54.0005H54V126.001H67.5V73.4735L138.835 165.704C142.613 163.266 146.18 160.518 149.508 157.52Z"
          fill="url(#next_grad_svg)"
        />
        <rect x="115.5" y="54" width="13.5" height="72" fill="#FFFFFF" />
        <defs>
          <linearGradient
            id="next_grad_svg"
            x1="109"
            y1="116.5"
            x2="144.5"
            y2="160.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Headless CMS (Sanity / Contentful Logo)
  if (lower.includes('headless') || lower.includes('cms')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // Google Core Web Vitals Logo
  if (lower.includes('vitals') || lower.includes('core')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285F4" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // iOS & Android (Apple + Android Combined Logos)
  if (lower.includes('ios') || lower.includes('android')) {
    return (
      <div className="flex items-center gap-0.5 shrink-0">
        <svg className="w-3 h-3 fill-slate-800" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.01.12-9.88-1.93-14.62-6.15-3.17-2.74-7.05-7.38-11.64-13.93-6.23-8.85-11.17-18.66-14.81-29.43-3.64-10.77-5.46-21.14-5.46-31.11 0-14.34 3.73-26.04 11.19-35.1 7.46-9.06 16.73-13.68 27.81-13.86 5.12 0 10.63 1.25 16.53 3.75 5.9 2.5 10.02 3.75 12.36 3.75 2.12 0 6.33-1.3 12.63-3.9 6.3-2.6 11.59-3.8 15.87-3.6 12.12.59 21.6 5.06 28.44 13.41-11.05 6.69-16.46 15.82-16.23 27.39.24 9.17 3.86 16.85 10.86 23.04 7 6.19 15.22 9.77 24.66 10.74-2.58 7.55-5.96 15.11-10.14 22.67zm-30.82-113.64c0 6.69-2.44 13.06-7.32 19.11-4.88 6.05-10.97 9.87-18.27 11.46-.23-.82-.35-1.76-.35-2.82 0-6.69 2.53-13.11 7.59-19.26 5.06-6.15 11.17-9.98 18.35-11.49.12.94.18 1.94.18 3.00z"/>
        </svg>
        <svg className="w-3 h-3 fill-emerald-600" viewBox="0 0 24 24">
          <path d="M6 18c0 .55.45 1 1 1h1v3c0 .55.45 1 1 1s1-.45 1-1v-3h4v3c0 .55.45 1 1 1s1-.45 1-1v-3h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.51 1.23 12.3 1 11 1c-1.3 0-2.51.23-3.64.63L5.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C4.4 3.4 3 5.54 3 8h16c0-2.46-1.4-4.6-3.47-5.84zM7 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
        </svg>
      </div>
    );
  }

  // React / React Native / Flutter Logo
  if (lower.includes('flutter') || lower.includes('react')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 stroke-[#61DAFB] fill-none" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  // Webflow / Bubble Logo
  if (lower.includes('webflow') || lower.includes('bubble')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 fill-[#146EF5]" viewBox="0 0 24 24">
        <path d="M12.98 6.467h-2.186L7.141 17.533h2.383l.89-3.235h3.945l.89 3.235h2.383L14.07 6.467zm-2.008 5.86l1.427-5.187 1.427 5.187h-2.854zM24 0H0v24h24V0z"/>
      </svg>
    );
  }

  // Multi-Cloud Logo
  if (lower.includes('multi-cloud') || lower.includes('cloud')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M6 19a5 5 0 0 1-1-9.9A7 7 0 0 1 18.6 8A5 5 0 0 1 18 19H6z" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  // Kubernetes Official Logo
  if (lower.includes('kubernetes')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 fill-[#326CE5]" viewBox="0 0 24 24">
        <path d="M12 .8l-10.4 6v10.4l10.4 6 10.4-6V6.8L12 .8zm0 2.4l8.3 4.8v9.6L12 22.4l-8.3-4.8V8L12 3.2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
      </svg>
    );
  }

  // HashiCorp Terraform Logo (Infrastructure as Code)
  if (lower.includes('terraform') || lower.includes('infrastructure as code') || lower.includes('iac')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 fill-[#7B42BC]" viewBox="0 0 24 24">
        <path d="M1.4 0v7.6l6.6 3.8V3.8L1.4 0zm7.6 4.4v7.6l6.6 3.8V8.2L9 4.4zm7.6 4.4v7.6l6.6 3.8V12.6l-6.6-3.8zM9 12.9v7.6l6.6 3.8v-7.6L9 12.9z"/>
      </svg>
    );
  }

  // OpenAI Logo (Custom LLMs / AI / RAG)
  if (lower.includes('llm') || lower.includes('ai') || lower.includes('rag') || lower.includes('autonomous')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 fill-[#10A37F]" viewBox="0 0 24 24">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zM13.2599 22.4286a4.4262 4.4262 0 0 1-2.8762-1.0408l.1423-.0817 4.764-2.75 1.5837.915a.0817.0817 0 0 1 .0428.0673v3.7431a4.4983 4.4983 0 0 1-3.6566-.8529zm-7.608-2.617a4.4454 4.4454 0 0 1-.7769-2.9627l.1471.0865 4.764 2.75v1.83a.0817.0817 0 0 1-.0433.0673l-3.242 1.868a4.4983 4.4983 0 0 1-.8489-3.6491zm-2.932-7.8576a4.4406 4.4406 0 0 1 2.0945-2.0945v5.6703a.0817.0817 0 0 1-.0433.0721l-3.242 1.868a4.4983 4.4983 0 0 1-.3652-3.7317l.1423-.0865 1.4137-.8277zm1.8828-5.328a4.4262 4.4262 0 0 1 2.8762-1.0408v3.6663a.0817.0817 0 0 1-.0428.0673l-4.764 2.75-.1471-.0865a4.4983 4.4983 0 0 1 2.0777-5.3563zm8.457 1.5658l3.242-1.868a4.4983 4.4983 0 0 1 .8489 3.6491l-.1471-.0865-4.764-2.75V7.1268a.0817.0817 0 0 1 .0433-.0673zm4.9964 8.2323l-1.4137.8277a4.4406 4.4406 0 0 1-2.0945 2.0945v-5.6703a.0817.0817 0 0 1 .0433-.0721l3.242-1.868a4.4983 4.4983 0 0 1 .3652 3.7317l-.1423.0865z"/>
      </svg>
    );
  }

  // Default Clean Code Symbol Logo
  return (
    <svg className="w-3.5 h-3.5 shrink-0 stroke-indigo-600" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const THREE_SECTIONS: SectionGroup[] = [
  {
    id: 'web-mobile-section',
    number: '01',
    title: 'Web & Mobile Development',
    subtitle: 'Digital Frontend Systems',
    description:
      'Engineered for maximum speed, pixel-perfect UX, and seamless cross-platform performance across web, iOS, and Android.',
    accentColor: 'from-blue-600 via-indigo-600 to-purple-600',
    badgeBg: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: Globe,
    highlights: [
      'Next.js 16 & React 19 web applications',
      'React Native & Flutter mobile ecosystems',
      'Low-code / No-code rapid application MVPs',
    ],
    layoutPosition: 'left', // Section 1 on LEFT side
    services: [
      {
        id: 'web-dev',
        title: 'Website Development',
        description: 'Next.js 16, React 19, Headless CMS & sub-second Core Web Vitals.',
        icon: Globe,
        tags: ['Next.js 16', 'Headless CMS', 'Core Web Vitals'],
      },
      {
        id: 'mobile-dev',
        title: 'Mobile Development',
        description: 'High-performance React Native & Flutter iOS / Android apps.',
        icon: Smartphone,
        tags: ['iOS & Android', 'React Native / Flutter', 'Offline Sync'],
      },
      {
        id: 'lowcode-dev',
        title: 'Low-Code / No-Code Applications',
        description: 'Rapid deployment with Webflow, Retool, Bubble & automated workflows.',
        icon: Layers,
        tags: ['Rapid MVP', 'Webflow/Bubble', 'Automated Workflows'],
      },
    ],
  },
  {
    id: 'software-section',
    number: '02',
    title: 'Software Engineering & Talent',
    subtitle: 'Enterprise Systems & Squads',
    description:
      'Custom full-stack software development, strategic CTO advisory, and immediate on-demand senior developer talent.',
    accentColor: 'from-purple-600 via-indigo-600 to-cyan-500',
    badgeBg: 'bg-purple-50 text-purple-600 border-purple-200',
    icon: Code2,
    highlights: [
      'Custom microservices & enterprise API platforms',
      'Top 1% senior engineering staff augmentation',
      'CTO advisory & digital transformation roadmaps',
    ],
    layoutPosition: 'right', // Section 2 on RIGHT side
    services: [
      {
        id: 'software-dev',
        title: 'Software Development',
        description: 'Custom enterprise software, API ecosystems & scalable platforms.',
        icon: Code2,
        tags: ['Bespoke Full-Stack', 'Microservices', 'CI/CD Pipelines'],
      },
      {
        id: 'it-staffing',
        title: 'IT Resources & Staff Augmentation',
        description: 'Dedicated senior developers, DevOps engineers & agile squads.',
        icon: Users,
        tags: ['Senior Talent', 'Dedicated Pods', '48h Onboarding'],
      },
      {
        id: 'it-consultancy',
        title: 'IT Consultancy Services',
        description: 'Strategic tech roadmaps, digital transformation & enterprise architecture.',
        icon: Briefcase,
        tags: ['CTO Advisory', 'Digital Strategy', 'Tech Audits'],
      },
    ],
  },
  {
    id: 'cloud-ai-section',
    number: '03',
    title: 'Cloud-Native & AI Systems',
    subtitle: 'Autonomous Cloud Intelligence',
    description:
      'Resilient multi-cloud infrastructure, custom enterprise LLM integration, and real-time IoT hardware telemetry streams.',
    accentColor: 'from-indigo-600 via-cyan-500 to-emerald-500',
    badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    icon: Cloud,
    highlights: [
      'AWS, Azure, Kubernetes multi-cloud orchestration',
      'Custom LLMs, RAG pipelines & autonomous AI agents',
      'Connected IoT sensors & edge computing streaming',
    ],
    layoutPosition: 'left', // Section 3 on LEFT side
    services: [
      {
        id: 'cloud-infra',
        title: 'Cloud-Native Architecture',
        description: 'AWS, Azure, Kubernetes, serverless & 99.99% uptime infra.',
        icon: Cloud,
        tags: ['Multi-Cloud', 'Kubernetes', 'Infrastructure as Code'],
      },
      {
        id: 'ai-software',
        title: 'AI-Powered Software',
        description: 'Custom LLM integrations, predictive RAG & intelligent agents.',
        icon: Bot,
        tags: ['Custom LLMs', 'RAG Pipeline', 'Autonomous Agents'],
      },
      {
        id: 'iot-dev',
        title: 'IoT (Internet of Things)',
        description: 'Connected sensors, smart edge devices & real-time analytics.',
        icon: Cpu,
        tags: ['Connected Sensors', 'Edge Computing', 'MQTT / Telemetry'],
      },
    ],
  },
];

/* Single Card Component with Sub-Parallax Offset & Tag Logos */
function ParallaxSingleCard({
  service,
  cardIdx,
  smoothProgress,
  onExploreClick,
  onQuoteClick,
}: {
  service: ServiceItem;
  cardIdx: number;
  smoothProgress: MotionValue<number>;
  onExploreClick?: (title: string) => void;
  onQuoteClick?: () => void;
}) {
  // Micro differential vertical movement for 3D card depth
  const offsets = [
    [25, -25],
    [-15, 15],
    [35, -35],
  ];
  const cardY = useTransform(smoothProgress, [0, 1], offsets[cardIdx % 3]);

  const IconComp = service.icon;

  return (
    <motion.div
      style={{ y: cardY }}
      className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-2xl hover:border-[#EE461F]/40 transition-all duration-300 group hover:-translate-y-1 relative"
    >
      <div>
        {/* Icon Box (Brand Palette: #EEF3FF / #1433D1 -> Hover #EE461F) */}
        <div className="w-11 h-11 rounded-2xl bg-[#EEF3FF] border border-[#1433D1]/20 text-[#1433D1] flex items-center justify-center mb-5 group-hover:bg-[#EE461F] group-hover:text-white group-hover:border-[#EE461F] transition-colors duration-300 shadow-2xs">
          <IconComp className="w-5 h-5" />
        </div>

        {/* Service Title */}
        <h4 className="text-lg font-extrabold text-[#121A50] tracking-tight group-hover:text-[#EE461F] transition-colors mb-2.5 leading-snug">
          {service.title}
        </h4>

        {/* Service Description */}
        <p className="text-xs sm:text-sm text-[#4B5565] leading-relaxed font-normal mb-5">
          {service.description}
        </p>

        {/* Service Tag Pills with Real Tech Brand Logos */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 text-slate-700 text-[11px] font-semibold border border-slate-200/80 shadow-2xs group-hover:bg-[#EEF3FF] group-hover:text-[#1433D1] group-hover:border-[#1433D1]/30 transition-colors"
            >
              {renderTechLogo(tag)}
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Get Started Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => {
            if (onExploreClick) {
              onExploreClick(service.title);
            } else if (onQuoteClick) {
              onQuoteClick();
            }
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1433D1] group-hover:text-[#EE461F] transition-colors cursor-pointer group/btn"
        >
          <span>Get started</span>
          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* Individual Parallax Row Component */
function ParallaxSectionRow({
  section,
  onQuoteClick,
  onExploreClick,
}: {
  section: SectionGroup;
  onQuoteClick?: () => void;
  onExploreClick?: (title: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  const isRightSide = section.layoutPosition === 'right';

  // Parallax offsets for Banner Card
  const bannerY = useTransform(
    smoothProgress,
    [0, 1],
    isRightSide ? [40, -40] : [-40, 40]
  );

  // Parallax offsets for Grid Container
  const cardsY = useTransform(
    smoothProgress,
    [0, 1],
    isRightSide ? [-30, 30] : [30, -30]
  );

  // Background Ambient Orb Parallax
  const orbY = useTransform(smoothProgress, [0, 1], [-80, 80]);
  const orbScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);

  const SectionIcon = section.icon;

  return (
    <div ref={rowRef} className="relative">
      {/* Background Soft Parallax Orb */}
      <motion.div
        style={{ y: orbY, scale: orbScale }}
        className={`absolute -top-10 ${
          isRightSide ? 'right-0' : 'left-0'
        } w-[500px] h-[350px] bg-gradient-to-br ${
          section.accentColor
        } opacity-10 blur-[110px] pointer-events-none rounded-full`}
      />

      <div
        className={`flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 relative z-10 ${
          isRightSide ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* PARALLAX BANNER CARD */}
        <motion.div style={{ y: bannerY }} className="w-full lg:w-[38%] flex flex-col">
          <div className="h-full bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#EE461F]/30 transition-all duration-300">
            <div>
              {/* Section Index & Subtitle */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl sm:text-4xl font-black text-slate-300 group-hover:text-[#EE461F] transition-colors">
                  {section.number}
                </span>
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border ${section.badgeBg}`}
                >
                  <SectionIcon className="w-3.5 h-3.5" />
                  <span>{section.subtitle}</span>
                </div>
              </div>

              {/* Section Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#121A50] tracking-tight mb-4 leading-snug">
                {section.title}
              </h3>
              <p className="text-sm text-[#4B5565] leading-relaxed font-normal mb-8">
                {section.description}
              </p>

              {/* Section Highlights */}
              <div className="flex flex-col gap-3 mb-8 border-t border-slate-100 pt-6">
                {section.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#EE461F] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-[#121A50]">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Bottom Action */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => onQuoteClick?.()}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1433D1] group-hover:text-[#EE461F] transition-colors cursor-pointer group/cta"
              >
                <span>Explore {section.title}</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* PARALLAX SERVICES GRID FOR THIS SECTION */}
        <motion.div style={{ y: cardsY }} className="w-full lg:w-[62%] flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.services.map((service, cardIdx) => (
              <ParallaxSingleCard
                key={service.id}
                service={service}
                cardIdx={cardIdx}
                smoothProgress={smoothProgress}
                onExploreClick={onExploreClick}
                onQuoteClick={onQuoteClick}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function AgencyServicesSection({
  onQuoteClick,
  onExploreClick,
}: AgencyServicesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Background Ambient Parallax Glow
  const mainOrbY = useTransform(smoothScroll, [0, 1], [-120, 120]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/60 to-[#F1F5F9] text-[#0F172A] overflow-hidden"
    >
      {/* Background Soft Parallax Glow Orbs (Brand Palette: Orange #EE461F + Royal Blue #1433D1) */}
      <motion.div
        style={{ y: mainOrbY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gradient-to-tr from-[#1433D1]/12 via-[#EE461F]/10 to-[#1433D1]/12 blur-[160px] pointer-events-none rounded-full"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Top Header Label */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center text-indigo-600 font-bold text-xs sm:text-sm tracking-widest uppercase"
          >
            <span>WHAT WE DO</span>
          </motion.div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.1]"
          >
            End-To-End Services To Ship &amp; Scale.
          </motion.h2>
        </div>

        {/* 3 DISTINCT PARALLAX SECTIONS (SECTION 1: LEFT | SECTION 2: RIGHT | SECTION 3: LEFT) */}
        <div className="flex flex-col gap-28 sm:gap-36">
          {THREE_SECTIONS.map((section) => (
            <ParallaxSectionRow
              key={section.id}
              section={section}
              onQuoteClick={onQuoteClick}
              onExploreClick={onExploreClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgencyServicesSection;
