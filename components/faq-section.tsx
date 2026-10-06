'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'General' | 'Services' | 'Process & Security' | 'Engagement';
  question: string;
  answer: string;
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
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative w-full bg-[#FCFDFE] text-[#121A50] py-20 lg:py-28 border-t border-[#DFE4EA] overflow-hidden">
      {/* Background Decorative Ambient Aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EE461F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1433D1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EE461F]/10 border border-[#EE461F]/20 text-[#EE461F] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121A50] leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#4B5565] leading-relaxed max-w-2xl">
            Everything you need to know about our enterprise technology services, engagement processes, security standards, and delivery timelines.
          </p>

          {/* Search Bar Input */}
          <div className="w-full max-w-md mt-6 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#DFE4EA] rounded-full text-sm text-[#121A50] placeholder-gray-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#EE461F]/30 focus:border-[#EE461F] transition-all"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#121A50] text-white shadow-md'
                    : 'bg-white text-[#4B5565] border border-[#DFE4EA] hover:border-[#121A50] hover:text-[#121A50]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                    isOpen
                      ? 'border-[#EE461F] shadow-lg shadow-[#EE461F]/5'
                      : 'border-[#DFE4EA] hover:border-gray-300 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#121A50] leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen ? 'bg-[#EE461F] text-white' : 'bg-gray-100 text-[#121A50] hover:bg-gray-200'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#4B5565] leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#DFE4EA]">
              <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-base font-semibold text-[#121A50]">No matching questions found</p>
              <p className="text-xs text-[#4B5565] mt-1">Try searching with a different term or browse categories above.</p>
            </div>
          )}
        </div>

        {/* Bottom Contact CTA Box */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#121A50] via-[#1A2568] to-[#121A50] p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
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
