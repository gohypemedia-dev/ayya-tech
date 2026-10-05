"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Mail, Phone, MapPin, X } from "lucide-react";
import { AppleStyleDock } from "@/components/apple-style-dock";
import HeroSection from "@/components/ui/dynamic-animated-hero-section-with-gradient";
import { AgencyServicesSection } from "@/components/agency-services-section";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import { FlowArtDefaultDemo } from "@/components/ui/story-scroll-demo";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="home" className="min-h-screen bg-white text-[#121A50] font-sans flex flex-col scroll-smooth">
      {/* Brand Logo on the Left */}
      <div className="fixed top-5 left-4 sm:left-8 md:left-10 z-50 flex items-center">
        <a href="#" className="group cursor-pointer">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#121A50] dark:text-white select-none hover:text-[#EE461F] transition-colors">
            AYYATECH
          </span>
        </a>
      </div>

      {/* Dynamic Animated Hero Section with Gradient */}
      <HeroSection onCtaClick={() => setModalOpen(true)} />

      {/* 3. Editorial Agency Services Section */}
      <AgencyServicesSection
        onQuoteClick={() => setModalOpen(true)}
        onExploreClick={() => setModalOpen(true)}
      />



      {/* Interactive Scrolling Case Studies / Story Showcase */}
      <ScrollingFeatureShowcase onCtaClick={() => setModalOpen(true)} />

      {/* Story Scroll Section */}
      <FlowArtDefaultDemo />



      {/* Interactive Contact With Globe Section */}
      <ContactWithGlobe />

      {/* Cinematic Motion Footer */}
      <CinematicFooter onQuoteClick={() => setModalOpen(true)} />

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#DFE4EA] w-full max-w-lg p-6 sm:p-8 z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#DFE4EA] mb-6">
              <h3 className="text-xl font-bold text-[#121A50]">Get in Touch</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#4B5565] hover:text-[#121A50] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-[#EEF3FF] text-[#1433D1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#121A50] mb-2">Message Sent</h4>
                <p className="text-sm text-[#4B5565] mb-6">
                  Thank you, {form.name || "Partner"}. We will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setModalOpen(false);
                  }}
                  className="px-6 py-2.5 bg-[#121A50] text-white rounded-lg text-sm font-semibold hover:bg-[#182368] cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#121A50] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DFE4EA] text-sm text-[#121A50] focus:outline-none focus:ring-2 focus:ring-[#1433D1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121A50] uppercase mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DFE4EA] text-sm text-[#121A50] focus:outline-none focus:ring-2 focus:ring-[#1433D1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121A50] uppercase mb-1">
                    Message / Project Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe what you're looking to build or solve..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DFE4EA] text-sm text-[#121A50] focus:outline-none focus:ring-2 focus:ring-[#1433D1]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 text-sm font-medium text-[#4B5565] hover:text-[#121A50] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#EE461F] text-white text-sm font-semibold hover:bg-[#D63B15] transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Apple Style Dock */}
      <AppleStyleDock onContactClick={() => setModalOpen(true)} />
    </div>
  );
}
