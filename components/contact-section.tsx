'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Mail, Clock, MapPin, ShieldCheck, Check, Send, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export function ContactSection({ onOpenModal }: ContactSectionProps) {
  const [selectedService, setSelectedService] = useState('Full-Stack Web');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Full-Stack Web',
    'Cloud Infrastructure',
    'AI & Data Systems',
    'Branding & Growth',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full bg-[#0A1033] text-white overflow-hidden border-t border-[#1C2766]">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#EE461F]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-[#1433D1]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28">
        
        {/* Top Header Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-[#1C2766]/80">
          <div className="flex items-center gap-3">
            <span className="w-10 h-0.5 bg-[#EE461F]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#EE461F]">
              Initiate Collaboration
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Now Scheduling Q2 / Q3 2026 Projects</span>
          </div>
        </div>

        {/* Main Grid: Left Narrative + Right Direct Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Value Props */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.92] mb-6 font-sans">
                Ready to build
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE461F] via-[#FF8566] to-white">
                  what comes next?
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl mb-10">
                Whether you need a dedicated senior engineering pod, distributed cloud architecture, or a high-converting digital experience, our team is ready to ship.
              </p>

              {/* Direct Value Cards */}
              <div className="space-y-4 mb-10">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#EE461F]/10 text-[#EE461F] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">Rapid Onboarding & Execution</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      First sprint kickoff within 5 business days. Guaranteed response time under 2 hours.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#1433D1]/20 text-[#60A5FA] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">100% IP Transfer & Transparency</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Full code repository ownership, strict mutual NDA protection, and zero vendor lock-in.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Direct Line */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#1C2766]">
                <a
                  href="mailto:contact@ayyatech.com"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#EE461F] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#EE461F]" />
                  <span>contact@ayyatech.com</span>
                </a>
                <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 text-[#EE461F]" />
                  <span>San Francisco • New Delhi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Project Inquiry Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#101744] border border-[#223078] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Start a Conversation</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Tell us about your timeline and vision</p>
                </div>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-xs font-bold font-mono uppercase tracking-wider text-[#EE461F] hover:text-white transition-colors cursor-pointer"
                >
                  Book a Call ↗
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Inquiry Received</h4>
                  <p className="text-sm text-[#94A3B8] max-w-sm mx-auto mb-6">
                    Thank you, {formState.name || 'Partner'}. A senior technical architect will review your project and get back to you within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="px-6 py-2.5 bg-white/10 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service selector chips */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider mb-2.5">
                      I&apos;m interested in:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((item) => {
                        const isSelected = selectedService === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSelectedService(item)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#EE461F] text-white shadow-sm shadow-[#EE461F]/30 font-semibold'
                                : 'bg-white/5 text-[#94A3B8] border border-white/10 hover:border-white/25 hover:text-white'
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Morgan"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EE461F] focus:ring-1 focus:ring-[#EE461F] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5">
                        Work Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="alex@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EE461F] focus:ring-1 focus:ring-[#EE461F] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Project Details / Goals
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what you're planning to build or optimize..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EE461F] focus:ring-1 focus:ring-[#EE461F] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#EE461F] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#EE461F]/25 hover:bg-[#D63B15] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Send Project Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-center text-[11px] text-[#64748B] mt-3">
                      🔒 Guaranteed response within 2 hours • Strict NDA protected
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Integrated Unified Footer */}
      <footer className="border-t border-[#1C2766] py-12 px-6 sm:px-10 lg:px-14 bg-[#080D2B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo with Clean Branding (No square box) */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-white tracking-tight select-none">
              AYYATECH
            </span>
            <span className="text-xs font-mono text-[#64748B]">
              / Engineering &amp; Systems
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-8 text-xs font-medium text-[#94A3B8]">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors">
              Case Studies
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <button
              type="button"
              onClick={onOpenModal}
              className="text-[#EE461F] font-bold hover:underline cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#64748B] font-mono">
            © {new Date().getFullYear()} Ayyatech Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
}

export default ContactSection;
