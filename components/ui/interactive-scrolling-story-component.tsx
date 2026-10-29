"use client";

import type React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { defaultSlidesData, type StorySlide } from '@/lib/story-slides';
export { defaultSlidesData, type StorySlide } from '@/lib/story-slides';

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
