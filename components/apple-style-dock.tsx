'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  FolderGit2,
  HomeIcon,
  Mail,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface AppleStyleDockProps {
  onContactClick?: () => void;
  className?: string;
}

export function AppleStyleDock({ onContactClick, className }: AppleStyleDockProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoOnly, setLogoOnly] = useState(true);
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    const handleScroll = () => {
      const videoSection = document.getElementById('hero-video');
      const overVideo = !!videoSection && videoSection.getBoundingClientRect().bottom > 0;
      setLogoOnly(overVideo);
      if (overVideo) setMobileMenuOpen(false);

      const sections = ['home', 'services', 'case-studies', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navItems = [
    {
      id: 'home',
      title: 'Home',
      icon: HomeIcon,
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
      },
    },
    {
      id: 'services',
      title: 'Services',
      icon: Briefcase,
      action: () => {
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      },
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: FolderGit2,
      action: () => {
        document.querySelector('#case-studies')?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      },
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: Mail,
      action: () => {
        if (onContactClick) {
          onContactClick();
        } else {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
      },
    },
  ];

  return (
    <header className={`fixed top-3 sm:top-5 left-0 right-0 z-[100] px-3 sm:px-6 pointer-events-none ${className || ''}`}>
      <div className="max-w-6xl mx-auto">
        <nav
          aria-label="Main navigation"
          className={`pointer-events-auto relative isolate flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 ${logoOnly ? 'w-fit justify-start' : 'w-full justify-between'}`}
        >
          <motion.div
            layout
            aria-hidden="true"
            initial={false}
            transition={transition}
            className="absolute inset-0 -z-10 rounded-full bg-white/95 backdrop-blur-xl border border-[#121A50]/10 shadow-[0_8px_30px_-12px_rgba(18,26,80,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]"
          />
          {/* Brand Logo Image */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to home"
            className="pointer-events-auto flex items-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EE461F] shrink-0"
          >
            <img
              src="/images/ayya-logo.png"
              alt="AYYA Technology Logo"
              className={`${logoOnly ? 'h-12 sm:h-14 lg:h-16' : 'h-9 sm:h-11 lg:h-[46px]'} w-auto object-contain hover:opacity-90 transition-opacity`}
            />
          </button>

          {/* Desktop Navigation Links (Clean Text Only - No Boxes) */}
          {!logoOnly && <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.18 }}
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-xs sm:text-sm tracking-wide transition-colors duration-200 cursor-pointer relative py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EE461F] ${
                    isActive
                      ? 'text-[#EE461F] font-extrabold'
                      : 'text-[#121A50] font-bold hover:text-[#EE461F]'
                  }`}
                >
                  <span className="relative z-10">{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE461F] rounded-full"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>}

          {/* Right Action CTA & Mobile Menu Toggle */}
          {!logoOnly && <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.24 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <button
              onClick={() => {
                if (onContactClick) onContactClick();
                else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-2 whitespace-nowrap px-3 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EE461F] to-[#F59E0B] text-white text-xs sm:text-sm font-extrabold shadow-sm shadow-[#EE461F]/20 hover:shadow-md hover:shadow-[#EE461F]/30 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EE461F]"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-gray-100 text-[#121A50] hover:bg-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE461F]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>}
        </nav>

        {/* Mobile Navigation Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && !logoOnly && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="pointer-events-auto md:hidden mt-3 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-xl flex flex-col gap-2"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center transition-all ${
                      isActive
                        ? 'bg-[#EE461F] text-white shadow-md shadow-[#EE461F]/30'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#121A50]'
                    }`}
                  >
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
