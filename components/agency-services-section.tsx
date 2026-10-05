'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  Code2,
  Share2,
  Search,
  Palette,
  Zap,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  CreditCard,
  Wallet,
  Percent,
  Award,
  Wifi,
  Check,
  Plus,
  FileText,
  Coins,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Target,
  Radio,
  Globe
} from 'lucide-react';

interface AgencyServicesSectionProps {
  onQuoteClick?: () => void;
  onExploreClick?: (serviceTitle: string) => void;
}

interface ServiceItem {
  id: string;
  stageIndex: number;
  number: string;
  category: string;
  title: string;
  shortDesc: string;
  tagline: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  badge: {
    label: string;
    sublabel: string;
  };
  metricsPill: {
    label: string;
    value: string;
  };
  highlights: string[];
  ctaText: string;
}

const servicesList: ServiceItem[] = [
  {
    id: 'web-development',
    stageIndex: 1,
    number: '01',
    category: 'Engineering & Platforms',
    title: 'Web Design & Development',
    shortDesc: 'Next.js 16, React 19, Headless CMS & sub-second Core Web Vitals.',
    tagline: 'Ultra-fast modern web applications engineered to convert.',
    description:
      'Websites are the gateway to your brand. We engineer pixel-perfect, lightning-fast digital platforms built on modern Next.js and headless stacks, ensuring seamless user journeys, high conversion rates, and enterprise-grade reliability.',
    image: '/images/services/web_dev.jpg',
    icon: <Code2 className="w-5 h-5 text-[#EE461F]" />,
    badge: {
      label: 'Deployment Live',
      sublabel: '100% Uptime SLA',
    },
    metricsPill: {
      label: 'Conversion Boost',
      value: '+340% Lift',
    },
    highlights: [
      'Next.js 16 + React 19 Server Components architecture',
      'Sub-second Core Web Vitals & edge CDN acceleration',
      'Seamless headless CMS, Stripe & CRM API integrations',
    ],
    ctaText: 'Explore Website Design',
  },
  {
    id: 'social-marketing',
    stageIndex: 2,
    number: '02',
    category: 'Omnichannel Growth',
    title: 'Social Media Marketing',
    shortDesc: 'Viral reels, creator partnerships & high-engagement brand equity.',
    tagline: 'Build community, amplify voice and dominate social feeds.',
    description:
      'We offer a full range of organic and creator-led marketing campaigns across Instagram, YouTube, and LinkedIn. Partnering with credible creator voices to drive genuine brand equity, viral community traction, and scalable customer acquisition.',
    image: '/images/services/social_media.jpg',
    icon: <Share2 className="w-5 h-5 text-[#EE461F]" />,
    badge: {
      label: 'Viral Reach Spike',
      sublabel: '2.4M Impressions',
    },
    metricsPill: {
      label: 'Avg Engagement Rate',
      value: '14.8%',
    },
    highlights: [
      'Data-backed creator discovery & contracted ROI agreements',
      'High-velocity short-form video production & editing studio',
      'Active community moderation & brand sentiment tracking',
    ],
    ctaText: 'Explore Social Strategy',
  },
  {
    id: 'seo-services',
    stageIndex: 3,
    number: '03',
    category: 'Organic Dominance',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Rank #1 on Google with technical SEO & authoritative digital PR.',
    tagline: 'Sustainable organic search rankings that compound over time.',
    description:
      'Our comprehensive SEO program increases your brand visibility across search engines, driving sustainable high-intent buyer traffic and top organic rankings without perpetual reliance on paid ads.',
    image: '/images/services/seo_search.jpg',
    icon: <Search className="w-5 h-5 text-[#EE461F]" />,
    badge: {
      label: 'Google Rank #1',
      sublabel: 'Primary Keywords Secured',
    },
    metricsPill: {
      label: 'Organic Traffic Surge',
      value: '+280%',
    },
    highlights: [
      'In-depth technical audits, crawl budget & schema graph tuning',
      'High-intent commercial search cluster content architecture',
      'High-authority tier-1 editorial backlink acquisition',
    ],
    ctaText: 'Explore SEO Programs',
  },
  {
    id: 'branding-identity',
    stageIndex: 4,
    number: '04',
    category: 'Brand Architecture',
    title: 'Branding & Visual Identity',
    shortDesc: 'Brand positioning, design tokens, logo systems & distinctive voice.',
    tagline: 'Distinctive brand positioning that carves an authentic reputation.',
    description:
      'We shape market positioning, visual systems, and brand voice. Tested and proven branding strategies that help your business stand out from commodity competitors with a memorable identity and cohesive design language.',
    image: '/images/services/branding_design.jpg',
    icon: <Palette className="w-5 h-5 text-[#EE461F]" />,
    badge: {
      label: 'Design System Live',
      sublabel: 'Tokens & Guidelines Ready',
    },
    metricsPill: {
      label: 'Brand Equity Index',
      value: '94/100',
    },
    highlights: [
      'Comprehensive brand narrative blueprint & positioning matrix',
      'Production-ready Figma token libraries & component systems',
      'Custom typography scales, 3D asset libraries & stationery',
    ],
    ctaText: 'Explore Branding & Design',
  },
  {
    id: 'ppc-advertising',
    stageIndex: 5,
    number: '05',
    category: 'Performance Media',
    title: 'Pay Per Click Advertising (PPC)',
    shortDesc: 'High ROAS campaigns across Google, Meta, YouTube & LinkedIn.',
    tagline: 'Data-driven ad campaigns scaled with surgical targeting and high ROAS.',
    description:
      'We scale customer acquisition across Google Search, Display, Meta, and YouTube with hyper-targeted audience segments, predictive bidding algorithms, and high-converting landing page optimization.',
    image: '/images/services/ppc_ads.jpg',
    icon: <Zap className="w-5 h-5 text-[#EE461F]" />,
    badge: {
      label: '4.8x Blended ROAS',
      sublabel: 'Conversion Verified',
    },
    metricsPill: {
      label: 'Monthly Ad Revenue',
      value: '₹48.5L+',
    },
    highlights: [
      'First-party server-side tracking (CAPI) & fraud mitigation',
      'Weekly multi-variant creative & copywriting experiment sprints',
      'Transparent real-time ROAS dashboards & pipeline attribution',
    ],
    ctaText: 'Explore Digital Marketing',
  },
];

export function AgencyServicesSection({
  onQuoteClick,
  onExploreClick,
}: AgencyServicesSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use GSAP ScrollTrigger to track scroll progress across the 600vh height smoothly
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Map progress to active stage:
  // 0.00 - 0.22: All Services Connected Staircase
  // 0.22 - 0.38: Service 1 (Web Dev)
  // 0.38 - 0.54: Service 2 (Social Media)
  // 0.54 - 0.70: Service 3 (SEO)
  // 0.70 - 0.86: Service 4 (Branding)
  // 0.86 - 1.00: Service 5 (PPC)
  let activeStage = 0;
  if (scrollProgress >= 0.22 && scrollProgress < 0.38) activeStage = 1;
  else if (scrollProgress >= 0.38 && scrollProgress < 0.54) activeStage = 2;
  else if (scrollProgress >= 0.54 && scrollProgress < 0.70) activeStage = 3;
  else if (scrollProgress >= 0.70 && scrollProgress < 0.86) activeStage = 4;
  else if (scrollProgress >= 0.86) activeStage = 5;

  // GSAP animation triggered when scrolling between stages: card animates down into spotlight
  useEffect(() => {
    if (activeStage > 0) {
      gsap.fromTo(
        '.gsap-spotlight-card',
        { y: 70, scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.gsap-spotlight-details',
        { x: 45, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.08, ease: 'power3.out' }
      );
    }
  }, [activeStage]);

  const jumpToStage = (stage: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targets = [0.10, 0.30, 0.46, 0.62, 0.78, 0.94];
    const targetScroll = container.offsetTop + totalScrollable * targets[stage];
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const isOverview = activeStage === 0;
  const currentService = activeStage > 0 ? servicesList[activeStage - 1] : null;

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full bg-[#FCFDFE] text-[#121A50] border-b border-[#DFE4EA]"
      style={{ height: '600vh' }}
    >
      {/* Sticky Fullscreen Pinned Viewport - spacious margins to ensure zero edge clipping */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-8 sm:pt-12 pb-5 px-6 sm:px-10 lg:px-16 xl:px-20 bg-white">
        {/* Central Stage: Full-Width Responsive Arena */}
        <div className="w-full max-w-[1540px] mx-auto flex-1 flex items-center justify-between overflow-hidden">
          <AnimatePresence mode="wait">
            {isOverview ? (
              /* ========================================================================= */
              /* 1. OVERVIEW: FULL-WIDTH SIDE-BY-SIDE WITH EXPANSIVE STAIRCASE CARDS        */
              /* ========================================================================= */
              <motion.div
                key="theme-overview-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12"
              >
                {/* Left Column: Full Pine Labs Title & Text - zero left clipping! */}
                <div className="w-full lg:w-[420px] xl:w-[460px] flex flex-col items-start text-left shrink-0 z-20">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold text-[#003434] leading-[1.03] tracking-tight mb-5">
                    One complete<br />
                    stack for all things<br />
                    growth.
                  </h1>
                  <p className="text-sm sm:text-base text-[#405650] leading-relaxed mb-7 max-w-[420px]">
                    Explore a diverse, high-impact digital service suite designed to build brands, optimize conversion and accelerate growth.
                  </p>

                  {/* Pine Labs Signature Lime Green Explore Button */}
                  <button
                    type="button"
                    onClick={() => jumpToStage(1)}
                    className="px-8 py-3.5 bg-[#D0F255] hover:bg-[#bce038] text-[#003434] text-sm font-bold rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2 group mb-4"
                  >
                    <span>Explore services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#003434]" />
                  </button>

                  {/* Micro Hint */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#708578]">
                    <span className="w-2 h-2 rounded-full bg-[#00B050]" />
                    <span>Hover on cards for details • Scroll to reveal each service</span>
                  </div>
                </div>

                {/* Right Column: Dramatic 45-Degree Ascending Stair Form matching reference screenshot */}
                <div className="w-full lg:flex-1 flex items-center justify-center lg:justify-end overflow-visible">
                  <div className="relative w-[705px] h-[670px] shrink-0 scale-[0.64] sm:scale-[0.74] lg:scale-[0.84] xl:scale-[0.92] origin-center lg:origin-right">
                    
                    {/* Card 0: Web Design & Development (Lowest & Foremost: z-50) */}
                    <PineLabsCardWrapper
                      left="0px"
                      top="280px"
                      zIndex={hoveredCardIndex === 0 ? 60 : 50}
                      isHovered={hoveredCardIndex === 0}
                      hasAnyHover={hoveredCardIndex !== null}
                      onHover={() => setHoveredCardIndex(0)}
                      onLeave={() => setHoveredCardIndex(null)}
                      onClick={() => jumpToStage(1)}
                    >
                      <CardWebDev />
                    </PineLabsCardWrapper>

                    {/* Card 1: Social Media Marketing (z-40) */}
                    <PineLabsCardWrapper
                      left="115px"
                      top="210px"
                      zIndex={hoveredCardIndex === 1 ? 60 : 40}
                      isHovered={hoveredCardIndex === 1}
                      hasAnyHover={hoveredCardIndex !== null}
                      onHover={() => setHoveredCardIndex(1)}
                      onLeave={() => setHoveredCardIndex(null)}
                      onClick={() => jumpToStage(2)}
                    >
                      <CardSocialMarketing />
                    </PineLabsCardWrapper>

                    {/* Card 2: Search Engine Optimization (z-30) */}
                    <PineLabsCardWrapper
                      left="230px"
                      top="140px"
                      zIndex={hoveredCardIndex === 2 ? 60 : 30}
                      isHovered={hoveredCardIndex === 2}
                      hasAnyHover={hoveredCardIndex !== null}
                      onHover={() => setHoveredCardIndex(2)}
                      onLeave={() => setHoveredCardIndex(null)}
                      onClick={() => jumpToStage(3)}
                    >
                      <CardSeoServices />
                    </PineLabsCardWrapper>

                    {/* Card 3: Branding & Visual Identity (z-20) */}
                    <PineLabsCardWrapper
                      left="345px"
                      top="70px"
                      zIndex={hoveredCardIndex === 3 ? 60 : 20}
                      isHovered={hoveredCardIndex === 3}
                      hasAnyHover={hoveredCardIndex !== null}
                      onHover={() => setHoveredCardIndex(3)}
                      onLeave={() => setHoveredCardIndex(null)}
                      onClick={() => jumpToStage(4)}
                    >
                      <CardBrandingDesign />
                    </PineLabsCardWrapper>

                    {/* Card 4: PPC Advertising (z-10, Top-Right) */}
                    <PineLabsCardWrapper
                      left="460px"
                      top="0px"
                      zIndex={hoveredCardIndex === 4 ? 60 : 10}
                      isHovered={hoveredCardIndex === 4}
                      hasAnyHover={hoveredCardIndex !== null}
                      onHover={() => setHoveredCardIndex(4)}
                      onLeave={() => setHoveredCardIndex(null)}
                      onClick={() => jumpToStage(5)}
                    >
                      <CardPpcAds />
                    </PineLabsCardWrapper>

                  </div>
                </div>
              </motion.div>
            ) : (
              /* ========================================================================= */
              /* 2. SPOTLIGHT STAGE: THE PINNED CARD + DETAILS MATCHING SCREEN RECORDING    */
              /* ========================================================================= */
              currentService && (
                <div
                  key={`spotlight-stage-${currentService.id}`}
                  className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 px-4"
                >
                  {/* Left Column: Big Pine Labs Spotlight Card */}
                  <div className="w-full lg:w-1/2 flex justify-center items-center relative gsap-spotlight-card">
                    <div className="w-full max-w-[430px] sm:max-w-[460px] lg:max-w-[490px] h-[480px] sm:h-[510px] bg-[#EEF3EE] rounded-[36px] border border-[#DFE8DF] shadow-[0_22px_55px_rgba(0,35,38,0.08)] p-6 sm:p-7 relative flex flex-col justify-between items-center overflow-hidden">
                      {activeStage === 1 && <SpotlightCardWebDev />}
                      {activeStage === 2 && <SpotlightCardSocialMarketing />}
                      {activeStage === 3 && <SpotlightCardSeoServices />}
                      {activeStage === 4 && <SpotlightCardBrandingDesign />}
                      {activeStage === 5 && <SpotlightCardPpcAds />}
                    </div>
                  </div>

                  {/* Right Column: Title, Tagline, Description, Explore Now Button */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left gsap-spotlight-details max-w-[540px]">
                    {/* Icon + Category */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#EEF3EE] flex items-center justify-center text-[#003434] border border-[#DFE8DF]">
                        {currentService.icon}
                      </div>
                      <span className="text-base sm:text-lg font-bold text-[#003434]">
                        {currentService.category}
                      </span>
                    </div>

                    {/* Bold Punchy Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#003434] leading-[1.12] tracking-tight mb-5">
                      {currentService.tagline}
                    </h2>

                    {/* Readable Paragraph */}
                    <p className="text-base sm:text-lg text-[#506558] leading-[1.65] mb-6">
                      {currentService.description}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-2.5 mb-8">
                      {currentService.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-[#00B050]/15 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-[#00B050] stroke-[3]" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#003434]">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Pine Labs Signature Lime Button */}
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => onExploreClick?.(currentService.title)}
                        className="px-9 py-4 bg-[#D0F255] hover:bg-[#bce038] text-[#003434] text-base font-bold rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2 group w-fit"
                      >
                        <span>Explore now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#003434]" />
                      </button>

                      <button
                        type="button"
                        onClick={onQuoteClick}
                        className="px-7 py-4 bg-white hover:bg-[#F7F9F7] text-[#003434] text-base font-semibold rounded-full border border-[#DFE8DF] transition-all cursor-pointer"
                      >
                        Get a quote
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Pagination & Scroll Prompt Footer */}
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between pt-3 border-t border-[#DFE8DF] shrink-0 text-xs text-[#506558]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#003434] tracking-wide">
              {isOverview ? 'OVERVIEW STACK' : `SERVICE 0${activeStage} OF 05`}
            </span>
            <span className="text-[#DFE8DF]">•</span>
            <span className="hidden sm:inline text-[#708578]">Scroll down to scrub • Click any card or step</span>
          </div>

          {/* Clickable Stage Indicators */}
          <div className="hidden md:flex items-center gap-1.5">
            {['Overview', 'Web Dev', 'Social', 'SEO', 'Branding', 'PPC Ads'].map((name, sIdx) => {
              const isActive = activeStage === sIdx;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => jumpToStage(sIdx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#003434] text-[#D0F255] shadow-xs'
                      : 'text-[#506558] hover:text-[#003434] hover:bg-[#EEF3EE]'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeStage === 0}
              onClick={() => jumpToStage(Math.max(0, activeStage - 1))}
              className="px-4 py-1.5 rounded-full bg-white border border-[#DFE8DF] hover:bg-[#EEF3EE] disabled:opacity-30 font-bold text-[#003434] cursor-pointer transition-colors"
            >
              ← Prev
            </button>
            <button
              type="button"
              disabled={activeStage === 5}
              onClick={() => jumpToStage(Math.min(5, activeStage + 1))}
              className="px-4 py-1.5 rounded-full bg-white border border-[#DFE8DF] hover:bg-[#EEF3EE] disabled:opacity-30 font-bold text-[#003434] cursor-pointer transition-colors"
            >
              Next →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ========================================================================================= */
/* PINE LABS EXACT STAIRCASE CARDS (Online Payments, In-Store, Prepaid, Congratulations, Card) */
/* ========================================================================================= */

interface PineLabsCardWrapperProps {
  left: string;
  top: string;
  zIndex: number;
  isHovered: boolean;
  hasAnyHover: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  children: React.ReactNode;
}

function PineLabsCardWrapper({
  left,
  top,
  zIndex,
  isHovered,
  hasAnyHover,
  onHover,
  onLeave,
  onClick,
  children,
}: PineLabsCardWrapperProps) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ left, top, zIndex }}
      className={`absolute transition-all duration-300 cursor-pointer ${
        isHovered
          ? '-translate-y-4 scale-[1.04]'
          : hasAnyHover
          ? 'opacity-90'
          : 'opacity-100'
      }`}
    >
      <div
        className={`relative w-[225px] sm:w-[240px] lg:w-[248px] h-[350px] sm:h-[370px] lg:h-[385px] bg-[#EEF3EE] rounded-[32px] border border-[#DFE8DF] shadow-[0_22px_55px_rgba(0,35,38,0.08)] overflow-hidden transition-all duration-300 ${
          isHovered
            ? 'ring-2 ring-[#003434]/20 shadow-[0_28px_65px_rgba(0,35,38,0.18)]'
            : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function CardWebDev() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-start">
      <div className="text-[12px] font-semibold text-[#003434] text-center mb-3">
        Web & App Development
      </div>
      <div className="space-y-2 flex-1 flex flex-col justify-center">
        {/* Next.js & React */}
        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-[#003434] flex items-center justify-center shrink-0">
            <Code2 className="w-3 h-3 text-[#D0F255]" />
          </div>
          <span className="text-[11px] font-semibold text-[#003434]">Next.js 16 & React 19</span>
        </div>

        {/* Sub-Second Web Vitals */}
        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
            <Zap className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="text-[11px] font-semibold text-[#003434]">Sub-Second Web Vitals</span>
        </div>

        {/* Headless E-Commerce */}
        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-semibold text-[#003434]">Headless E-Commerce</span>
        </div>

        {/* Full-Stack Web Apps */}
        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-purple-600 flex items-center justify-center shrink-0">
            <Layers className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-semibold text-[#003434]">Full-Stack Web Apps</span>
        </div>

        {/* Custom APIs & Cloud */}
        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-[#1853DB] flex items-center justify-center shrink-0">
            <Globe className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-semibold text-[#003434]">Custom APIs & Cloud</span>
        </div>
      </div>
    </div>
  );
}

function CardSocialMarketing() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between items-center text-center">
      <div className="text-[12px] font-semibold text-[#003434] mb-1">
        Social Media Marketing
      </div>
      
      {/* Center Creator Campaign Canvas */}
      <div className="w-full max-w-[170px] bg-white rounded-2xl p-3 border border-[#E8ECE8] shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col items-center my-auto">
        <div className="w-20 h-20 relative p-2 bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#4F5BD5] rounded-2xl flex flex-col items-center justify-center text-white mb-2 shadow-sm">
          <Share2 className="w-7 h-7 mb-1" />
          <span className="text-[9px] font-extrabold tracking-wider">2.4M REACH</span>
        </div>

        <div className="flex items-center gap-1 text-[#708578] mb-0.5">
          <Radio className="w-3.5 h-3.5 text-[#00B050]" />
          <span className="text-[9px] font-bold text-[#003434]">14.8% ENGAGEMENT</span>
        </div>
        <div className="text-[8px] font-bold tracking-wider text-[#708578] uppercase">
          Creator Campaigns
        </div>
      </div>

      <div className="text-[9px] font-extrabold tracking-wider uppercase text-[#003434] pb-1">
        Dominate Social Feeds
      </div>
    </div>
  );
}

function CardSeoServices() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-start">
      <div className="text-[12px] font-semibold text-[#003434] text-center mb-3">
        Search Engine Optimization
      </div>
      <div className="space-y-2 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <span className="text-[11px] font-medium text-[#405650]">Google Rank #1</span>
          <span className="text-[11px] font-bold text-[#003434]">84 Keywords</span>
        </div>

        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <span className="text-[11px] font-medium text-[#405650]">Domain Authority</span>
          <span className="text-[11px] font-bold text-[#003434]">DA 76 (+14)</span>
        </div>

        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <span className="text-[11px] font-medium text-[#405650]">Organic Traffic</span>
          <span className="text-[11px] font-bold text-[#00B050]">+280% Surge</span>
        </div>

        <div className="bg-white rounded-2xl py-2 px-3 border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <span className="text-[11px] font-medium text-[#405650]">Search Impressions</span>
          <span className="text-[11px] font-bold text-[#003434]">185,000+</span>
        </div>
      </div>
    </div>
  );
}

function CardBrandingDesign() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center text-center">
      {/* Big Green Badge */}
      <div className="w-16 h-16 rounded-full bg-[#00B050] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,176,80,0.25)] mb-4">
        <Check className="w-9 h-9 stroke-[3.5]" />
      </div>

      <div className="text-base sm:text-lg font-bold text-[#003434] mb-2">
        Brand Approved!
      </div>

      <p className="text-xs text-[#506558] max-w-[160px] leading-relaxed">
        Identity, visual tokens & guidelines successfully deployed!
      </p>
    </div>
  );
}

function CardPpcAds() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between">
      {/* Top Campaign Card */}
      <div className="w-full bg-gradient-to-br from-[#E2EBE5] to-[#D0DFD6] rounded-2xl p-3 border border-[#C5D8CC] shadow-sm text-[#003434]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-medium text-[#506558]">Google & Meta Ads</span>
          <span className="text-[10px] font-black tracking-wider text-[#00B050] bg-white/70 px-1.5 py-0.5 rounded-md">4.8x ROAS</span>
        </div>
        <div className="w-4 h-3 rounded bg-amber-400/80 mb-2 border border-amber-500/30" />
        <div className="font-mono text-[10px] tracking-widest text-[#003434] mb-1">
          HIGH-INTENT PPC FUNNEL
        </div>
        <div className="text-[8px] text-[#607568]">Live Attribution • Active</div>
      </div>

      {/* 4 Circular Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="flex flex-col items-center text-center p-1">
          <div className="w-7 h-7 rounded-full bg-[#FF7A59] text-white flex items-center justify-center mb-1">
            <Target className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] font-medium text-[#405650] leading-tight">Multi-Channel Ads</span>
        </div>

        <div className="flex flex-col items-center text-center p-1">
          <div className="w-7 h-7 rounded-full bg-[#3B82F6] text-white flex items-center justify-center mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] font-medium text-[#405650] leading-tight">Live Attribution</span>
        </div>

        <div className="flex flex-col items-center text-center p-1">
          <div className="w-7 h-7 rounded-full bg-[#8E44AD] text-white flex items-center justify-center mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] font-medium text-[#405650] leading-tight">A/B Testing</span>
        </div>

        <div className="flex flex-col items-center text-center p-1">
          <div className="w-7 h-7 rounded-full bg-[#00B050] text-white flex items-center justify-center mb-1">
            <Coins className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] font-medium text-[#405650] leading-tight">Scale Revenue</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================================= */
/* LARGE PINE LABS SPOTLIGHT CARDS (FRAMES 00:03 - 00:08 IN SCREEN RECORDING)                */
/* ========================================================================================= */

function SpotlightCardWebDev() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative">
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider text-[#003434] uppercase bg-white/90 px-3.5 py-1.5 rounded-full border border-[#DFE8DF] shadow-xs">
          Full-Stack Web & Mobile
        </span>
        <div className="flex items-center gap-1.5 bg-[#00B050]/10 text-[#00B050] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#00B050]/20">
          <span className="w-2 h-2 rounded-full bg-[#00B050] animate-pulse" />
          <span>Live 99.99%</span>
        </div>
      </div>

      {/* Center Phone/Browser Preview Canvas (Like Pine Labs frame 00:03) */}
      <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 border border-[#E2E8E2] shadow-[0_14px_36px_rgba(0,35,38,0.06)] flex flex-col gap-3 my-auto">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F0F4F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#003434] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-[#D0F255]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#003434]">ayyatech.dev</div>
              <div className="text-[10px] text-[#708578]">Production Edge Instance</div>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-[#D0F255] text-[#003434] px-2.5 py-0.5 rounded-full">v16.3</span>
        </div>

        <div className="space-y-2">
          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-semibold text-[#003434]">Sub-second Web Vitals</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#00B050]">100/100</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-semibold text-[#003434]">React 19 & Next.js</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#003434]">TURBOPACK</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-[#003434]">Headless E-Commerce</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#003434]">STRIPE</span>
          </div>
        </div>
      </div>

      {/* Floating Accent Card on the Right (Like Pine Labs' "Payment Successful" floating card in frame 00:03!) */}
      <div className="absolute right-0 top-24 bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_12px_28px_rgba(0,35,38,0.12)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#00B050] flex items-center justify-center text-white shrink-0 shadow-sm">
          <Check className="w-5 h-5 stroke-[3]" />
        </div>
        <div className="pr-1">
          <div className="text-[11px] font-bold text-[#003434]">Deploy Succeeded</div>
          <div className="text-[9px] text-[#708578]">Zero Errors • Edge CDN</div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="w-full bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_6px_20px_rgba(0,35,38,0.04)] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#003434]">Global Edge Performance</span>
        <span className="text-xs font-extrabold text-[#00B050] bg-[#EEF3EE] px-2.5 py-1 rounded-lg">99.99% SLA Uptime</span>
      </div>
    </div>
  );
}

function SpotlightCardSocialMarketing() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative">
      <div className="w-full flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider text-[#003434] uppercase bg-white/90 px-3.5 py-1.5 rounded-full border border-[#DFE8DF] shadow-xs">
          Omnichannel Social Reach
        </span>
        <div className="flex items-center gap-1.5 bg-[#FA7E1E]/10 text-[#FA7E1E] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#FA7E1E]/20">
          <span className="w-2 h-2 rounded-full bg-[#FA7E1E] animate-pulse" />
          <span>Active Campaign</span>
        </div>
      </div>

      {/* Center Creator Analytics Card */}
      <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 border border-[#E2E8E2] shadow-[0_14px_36px_rgba(0,35,38,0.06)] flex flex-col items-center my-auto">
        <div className="w-22 h-22 relative p-3 bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#4F5BD5] rounded-3xl flex flex-col items-center justify-center text-white mb-3 shadow-md">
          <Share2 className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-extrabold tracking-widest">2.4M REACH</span>
        </div>

        <div className="text-sm font-bold text-[#003434] mb-0.5">Viral Creator Campaign</div>
        <div className="text-[11px] text-[#708578] mb-3">Instagram • YouTube • TikTok • LinkedIn</div>

        <div className="w-full grid grid-cols-2 gap-2">
          <div className="bg-[#F8FAF8] rounded-xl p-2.5 text-center border border-[#EAF0EA]">
            <div className="text-sm font-extrabold text-[#003434]">14.8%</div>
            <div className="text-[9px] text-[#708578] uppercase font-semibold">Engagement</div>
          </div>
          <div className="bg-[#F8FAF8] rounded-xl p-2.5 text-center border border-[#EAF0EA]">
            <div className="text-sm font-extrabold text-[#00B050]">+340%</div>
            <div className="text-[9px] text-[#708578] uppercase font-semibold">Follower Growth</div>
          </div>
        </div>
      </div>

      {/* Floating Accent Card on the Right */}
      <div className="absolute right-0 top-24 bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_12px_28px_rgba(0,35,38,0.12)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#FA7E1E] flex items-center justify-center text-white shrink-0 shadow-sm">
          <Radio className="w-5 h-5" />
        </div>
        <div className="pr-1">
          <div className="text-[11px] font-bold text-[#003434]">Viral Surge Live</div>
          <div className="text-[9px] text-[#708578]">85K Organic Shares</div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="w-full bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_6px_20px_rgba(0,35,38,0.04)] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#003434]">Audience Conversion Rate</span>
        <span className="text-xs font-extrabold text-[#00B050] bg-[#EEF3EE] px-2.5 py-1 rounded-lg">4.2% Click-Through</span>
      </div>
    </div>
  );
}

function SpotlightCardSeoServices() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative">
      <div className="w-full flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider text-[#003434] uppercase bg-white/90 px-3.5 py-1.5 rounded-full border border-[#DFE8DF] shadow-xs">
          Organic Search Domination
        </span>
        <div className="flex items-center gap-1.5 bg-[#00B050]/10 text-[#00B050] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#00B050]/20">
          <span className="w-2 h-2 rounded-full bg-[#00B050]" />
          <span>Rank #1 Active</span>
        </div>
      </div>

      {/* Center SERP Preview Card */}
      <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 border border-[#E2E8E2] shadow-[0_14px_36px_rgba(0,35,38,0.06)] flex flex-col gap-3 my-auto">
        <div className="w-full bg-[#F4F6F4] rounded-xl px-3 py-2 flex items-center gap-2 border border-[#E0E7E0]">
          <Search className="w-3.5 h-3.5 text-[#708578]" />
          <span className="text-xs text-[#003434] font-medium truncate">Top High-Growth Tech Agency</span>
        </div>

        <div className="space-y-2 pt-1">
          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <span className="text-xs font-medium text-[#405650]">Google Rank #1</span>
            <span className="text-xs font-bold text-[#003434]">84 Commercial Keywords</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <span className="text-xs font-medium text-[#405650]">Domain Authority</span>
            <span className="text-xs font-bold text-[#003434]">DA 76 (+14 Points)</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <span className="text-xs font-medium text-[#405650]">Organic Traffic</span>
            <span className="text-xs font-extrabold text-[#00B050]">+280% Surge</span>
          </div>
        </div>
      </div>

      {/* Floating Accent Badge */}
      <div className="absolute right-0 top-24 bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_12px_28px_rgba(0,35,38,0.12)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#1853DB] flex items-center justify-center text-white shrink-0 shadow-sm">
          <Globe className="w-5 h-5" />
        </div>
        <div className="pr-1">
          <div className="text-[11px] font-bold text-[#003434]">185,000+</div>
          <div className="text-[9px] text-[#708578]">Monthly Search Impressions</div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="w-full bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_6px_20px_rgba(0,35,38,0.04)] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#003434]">Zero Paid Ad Spend</span>
        <span className="text-xs font-extrabold text-[#00B050] bg-[#EEF3EE] px-2.5 py-1 rounded-lg">100% Inbound</span>
      </div>
    </div>
  );
}

function SpotlightCardBrandingDesign() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative">
      <div className="w-full flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider text-[#003434] uppercase bg-white/90 px-3.5 py-1.5 rounded-full border border-[#DFE8DF] shadow-xs">
          Brand Architecture & Tokens
        </span>
        <div className="flex items-center gap-1.5 bg-[#00B050]/10 text-[#00B050] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#00B050]/20">
          <span className="w-2 h-2 rounded-full bg-[#00B050]" />
          <span>Figma Live</span>
        </div>
      </div>

      {/* Center Approved Card - Identical to Pine Labs frame 00:07 in video! */}
      <div className="w-full max-w-[320px] bg-white rounded-3xl p-6 border border-[#E2E8E2] shadow-[0_14px_36px_rgba(0,35,38,0.06)] flex flex-col items-center text-center my-auto">
        <div className="w-20 h-20 rounded-full bg-[#00B050] flex items-center justify-center text-white shadow-[0_10px_25px_rgba(0,176,80,0.3)] mb-4">
          <Check className="w-11 h-11 stroke-[3.5]" />
        </div>

        <div className="text-xl font-bold text-[#003434] mb-2">
          Brand Approved!
        </div>

        <p className="text-xs text-[#506558] leading-relaxed max-w-[220px]">
          Identity systems, Figma tokens & brand voice guidelines deployed successfully.
        </p>
      </div>

      {/* Floating Accent Badge */}
      <div className="absolute right-0 top-24 bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_12px_28px_rgba(0,35,38,0.12)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#003434] flex items-center justify-center text-[#D0F255] shrink-0 shadow-sm font-bold text-xs">
          94
        </div>
        <div className="pr-1">
          <div className="text-[11px] font-bold text-[#003434]">Brand Equity Index</div>
          <div className="text-[9px] text-[#708578]">Top Tier Category Leader</div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="w-full bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_6px_20px_rgba(0,35,38,0.04)] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#003434]">Tokenized Components</span>
        <span className="text-xs font-extrabold text-[#003434] bg-[#EEF3EE] px-2.5 py-1 rounded-lg">100% Cohesive</span>
      </div>
    </div>
  );
}

function SpotlightCardPpcAds() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative">
      <div className="w-full flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider text-[#003434] uppercase bg-white/90 px-3.5 py-1.5 rounded-full border border-[#DFE8DF] shadow-xs">
          Performance Media Engine
        </span>
        <div className="flex items-center gap-1.5 bg-[#00B050]/10 text-[#00B050] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#00B050]/20">
          <span className="w-2 h-2 rounded-full bg-[#00B050]" />
          <span>CAPI Connected</span>
        </div>
      </div>

      {/* Center Ads Funnel Card */}
      <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 border border-[#E2E8E2] shadow-[0_14px_36px_rgba(0,35,38,0.06)] flex flex-col gap-3 my-auto">
        <div className="bg-gradient-to-br from-[#E2EBE5] to-[#D0DFD6] rounded-2xl p-3 border border-[#C5D8CC] text-[#003434]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-[#506558]">Google & Meta Ads</span>
            <span className="text-[11px] font-black tracking-wider text-[#00B050] bg-white/80 px-2 py-0.5 rounded-md">4.8x ROAS</span>
          </div>
          <div className="font-mono text-xs tracking-wider text-[#003434] font-bold">
            HIGH-INTENT PPC FUNNEL
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <span className="text-xs font-medium text-[#405650]">Monthly Ad Revenue</span>
            <span className="text-xs font-bold text-[#003434]">₹48.5L+</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-xl p-2.5 flex items-center justify-between border border-[#EAF0EA]">
            <span className="text-xs font-medium text-[#405650]">Average CPA</span>
            <span className="text-xs font-bold text-[#00B050]">₹12.40 (-42%)</span>
          </div>
        </div>
      </div>

      {/* Floating Accent Badge */}
      <div className="absolute right-0 top-24 bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_12px_28px_rgba(0,35,38,0.12)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#EE461F] flex items-center justify-center text-white shrink-0 shadow-sm">
          <Zap className="w-5 h-5 fill-white" />
        </div>
        <div className="pr-1">
          <div className="text-[11px] font-bold text-[#003434]">Server CAPI</div>
          <div className="text-[9px] text-[#708578]">Zero Cookie Loss Tracking</div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="w-full bg-white rounded-2xl p-3 border border-[#E2E8E2] shadow-[0_6px_20px_rgba(0,35,38,0.04)] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#003434]">Predictive Bidding</span>
        <span className="text-xs font-extrabold text-[#00B050] bg-[#EEF3EE] px-2.5 py-1 rounded-lg">Algorithmic Scale</span>
      </div>
    </div>
  );
}
