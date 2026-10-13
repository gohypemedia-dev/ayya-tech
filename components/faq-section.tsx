'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What does your agency specialize in?',
    answer:
      'We specialize in helping startups design, build, and scale AI-powered products. Our expertise includes AI strategy, UX/UI design, automation tools, and product development for SaaS, tech, and data-driven businesses.',
  },
  {
    id: 'faq-2',
    question: 'Do you work with early-stage startups?',
    answer:
      'Yes, absolutely! We partner with early-stage founders as well as fast-growing scale-ups. Whether you need rapid MVP development to validate product-market fit or a dedicated engineering squad to scale your platform, we tailor our process to your stage.',
  },
  {
    id: 'faq-3',
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on project complexity and scope. Rapid MVP sprints and custom integrations typically deliver within 3 to 6 weeks, while large-scale enterprise platforms and migrations range from 8 to 14 weeks with continuous bi-weekly deployment milestones.',
  },
  {
    id: 'faq-4',
    question: 'Can you integrate AI into my existing product?',
    answer:
      'Yes. We build custom Retrieval-Augmented Generation (RAG) pipelines, fine-tuned LLM systems, and intelligent automated workflows that integrate seamlessly via secure APIs into your existing tech stack without disrupting ongoing operations.',
  },
  {
    id: 'faq-5',
    question: 'What do you need from me to get started?',
    answer:
      'All we need is a high-level overview of your business goals, target deliverables, and any existing design or technical specs. From there, we schedule a discovery call, define a clear milestone roadmap, and can kick off development within 48 to 72 hours.',
  },
  {
    id: 'faq-6',
    question: 'How do you ensure quality?',
    answer:
      'We enforce rigorous automated testing, comprehensive CI/CD pipelines, strict code reviews, SOC 2 / ISO-aligned security practices, and a guaranteed 99.9% uptime SLA with full client IP and source code ownership.',
  },
  {
    id: 'faq-7',
    question: 'What project engagement models do you offer?',
    answer:
      'We offer three flexible models: Fixed-Price Sprints for well-defined deliverables, Dedicated Agile Pods for continuous product velocity, and Senior Staff Augmentation to rapidly scale your existing engineering team.',
  },
  {
    id: 'faq-8',
    question: 'Do you provide 24/7 post-launch maintenance and SLA support?',
    answer:
      'Yes, we provide round-the-clock monitoring, 24/7 proactive security updates, performance optimizations, and dedicated SLA support post-deployment.',
  },
  {
    id: 'faq-9',
    question: 'How do you handle IP ownership and Non-Disclosure Agreements (NDAs)?',
    answer:
      'We sign strict mutual NDAs prior to any technical discovery. Upon milestone completion and delivery, 100% of all intellectual property, source code, designs, and assets are fully transferred and owned by your organization.',
  },
  {
    id: 'faq-10',
    question: 'Can your team integrate into our existing Git workflows and toolchains?',
    answer:
      'Yes. Our engineers integrate seamlessly into your preferred stack and agile toolchain, including GitHub, GitLab, Jira, Linear, Slack, AWS, GCP, and custom Docker/Kubernetes deployment pipelines.',
  },
];

export interface FaqSectionProps {
  onContactClick?: () => void;
}

export function AgencyFaqSection({ onContactClick }: FaqSectionProps) {
  // First item open by default as shown in the design
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-[#FAFBFD] text-[#121A50] py-20 lg:py-28 overflow-x-clip">
      {/* Subtle warm ambient glow matching design */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EE461F]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#FF7A59]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: FAQs Tag, Heading, and "Book a 15 min call" Card (Sticky as page scrolls) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start flex flex-col pb-4 z-20">
            {/* Tag / Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EE461F] shrink-0" />
              <span className="text-sm font-semibold text-[#121A50] tracking-wide">FAQs</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#121A50] tracking-tight leading-[1.18] mb-8">
              Frequently Asked<br />Questions
            </h2>

            {/* "Book a 15 min call" Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAEEF4] shadow-[0_10px_30px_rgba(18,26,80,0.04)] max-w-sm sm:max-w-md w-full">
              {/* Profile Avatar with subtle warm glow */}
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 rounded-full bg-[#EE461F]/15 blur-md transform scale-110" />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80"
                  alt="Ayya Tech Technical Advisor"
                  className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>

              {/* Card Title */}
              <h3 className="text-xl font-bold text-[#121A50] mb-2 tracking-tight">
                Book a 15 min call
              </h3>

              {/* Card Description */}
              <p className="text-sm text-[#4B5565] leading-relaxed mb-6 font-normal">
                If you have any questions, just book a 15-minute call with us before subscribing
              </p>

              {/* Call-to-action Button */}
              <button
                type="button"
                onClick={onContactClick}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#EE461F] hover:bg-[#D63B15] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#EE461F]/25 hover:shadow-lg hover:shadow-[#EE461F]/35 cursor-pointer text-center"
              >
                Book a Free Call!
              </button>
            </div>
          </div>

          {/* Right Column: Accordion Questions List */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAEEF4] shadow-[0_2px_10px_rgba(18,26,80,0.02)] transition-all duration-200 overflow-hidden hover:border-[#DFE4EA]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                  >
                    <span className="font-semibold text-base sm:text-lg text-[#121A50] leading-snug">
                      {faq.question}
                    </span>
                    <span className="shrink-0 p-1 rounded-full text-[#4B5565] hover:text-[#121A50] transition-colors">
                      {isOpen ? (
                        <X className="w-5 h-5 text-[#121A50]" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#4B5565]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-[#4B5565] leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AgencyFaqSection;
