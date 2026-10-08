'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { FaqPro, type FaqProItem } from '@/components/ui/faq-pro';

interface FaqItem extends FaqProItem {
  category: 'General' | 'Services' | 'Process & Security' | 'Engagement';
}

const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What core technology services does Ayya Tech specialize in?',
    answer:
      'We specialize in end-to-end enterprise IT solutions including Strategic IT Consultancy, Bespoke Software Development, Low-Code/No-Code Rapid Builds, Cloud-Native & DevOps Architecture, IoT Engineering, Mobile App Development, AI-Powered Systems, and Senior IT Staff Augmentation.',
  },
  {
    id: 'faq-2',
    category: 'Engagement',
    question: 'How quickly can Ayya Tech onboard dedicated engineering talent?',
    answer:
      'Our pre-vetted senior software engineers, cloud architects, and dedicated pods can be deployed and fully integrated into your agile workflow within 48 hours, aligned with your timezone.',
  },
  {
    id: 'faq-3',
    category: 'Engagement',
    question: 'What project engagement models do you offer?',
    answer:
      'We offer three flexible engagement models: (1) Fixed-Price Milestones for defined project scopes, (2) Dedicated Agile Squads for continuous long-term platform development, and (3) Staff Augmentation to rapidly scale your existing engineering team.',
  },
  {
    id: 'faq-4',
    category: 'Process & Security',
    question: 'How do you ensure data security, privacy, and IP protection?',
    answer:
      'We enforce strict enterprise security standards including SOC 2 type compliance protocols, comprehensive Non-Disclosure Agreements (NDAs), encrypted CI/CD pipelines, ISO 27001 standards, and full client ownership of source code and intellectual property.',
  },
  {
    id: 'faq-5',
    category: 'Services',
    question: 'Can you modernize legacy enterprise systems with zero business downtime?',
    answer:
      'Yes. Using modern microservices patterns, API abstraction layers, and strangler-fig migration strategies, we modernize monolithic legacy architectures into scalable, cloud-native environments without interrupting active operations.',
  },
  {
    id: 'faq-6',
    category: 'Process & Security',
    question: 'Do you provide 24/7 post-launch maintenance and SLA support?',
    answer:
      'Yes, we provide ongoing 24/7 monitoring, 99.99% infrastructure uptime SLAs, automated vulnerability patching, performance optimizations, and dedicated DevOps support post-deployment.',
  },
  {
    id: 'faq-7',
    category: 'Services',
    question: 'How do you integrate custom AI and LLM models into our existing software?',
    answer:
      'We build tailored Retrieval-Augmented Generation (RAG) pipelines, fine-tune open-source & proprietary LLMs, and develop autonomous AI agents that securely connect to your internal databases and APIs.',
  },
  {
    id: 'faq-8',
    category: 'General',
    question: 'What sets Ayya Tech apart from traditional IT outsourcing agencies?',
    answer:
      'We blend deep senior engineering expertise with high-speed execution, transparent communication, modern tech stacks (Next.js 16, React 19, Cloud-Native, AI), and a obsessive commitment to enterprise reliability and measurable business ROI.',
  },
];

const categories = ['All', 'General', 'Services', 'Process & Security', 'Engagement'] as const;

export interface FaqSectionProps {
  onContactClick?: () => void;
}

export function AgencyFaqSection({ onContactClick }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFaqs = faqData.filter((faq) => {
    return activeCategory === 'All' || faq.category === activeCategory;
  });

  return (
    <section id="faq" className="relative w-full bg-[#FCFDFE] text-[#121A50] py-20 lg:py-28 border-t border-[#DFE4EA] overflow-hidden">
      {/* Background Decorative Ambient Aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EE461F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1433D1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#121A50] leading-tight font-sans">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        {/* FaqPro Interactive Search & Animated Spring Accordion Component */}
        <FaqPro
          defaultOpenFirst={false}
          items={faqData}
          searchPlaceholder="Search FAQs by keywords (e.g. security, AI, SLA, onboarding)..."
          className="w-full"
        />

        {/* Bottom Contact CTA Box */}
        <div className="mt-16 max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-[#121A50] via-[#1A2568] to-[#121A50] p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#EE461F] flex items-center justify-center shrink-0 shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Still have questions?</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Can't find the answer you're looking for? Speak directly with our technical consultants.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onContactClick}
            className="px-6 py-3.5 bg-[#EE461F] hover:bg-[#D63B15] text-white text-sm font-bold rounded-full shadow-md shadow-[#EE461F]/30 hover:shadow-[#EE461F]/50 transition-all cursor-pointer shrink-0 flex items-center gap-2 group"
          >
            <span>Ask an Expert</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default AgencyFaqSection;
