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
import { motion, AnimatePresence } from 'framer-motion';

interface AppleStyleDockProps {
  onContactClick?: () => void;
  className?: string;
}

export function AppleStyleDock({ onContactClick, className }: AppleStyleDockProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'case-studies', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={`fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-300 ${className || ''}`}>
      <div className="max-w-6xl mx-auto">
        <nav className={`relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-xl shadow-black/10 ${
          scrolled ? 'shadow-2xl shadow-black/15 border-gray-300/90' : ''
        }`}>
          {/* Brand Logo Image */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group cursor-pointer focus:outline-none shrink-0"
          >
            <img
              src="/images/ayya-logo.png"
              alt="AYYA Technology Logo"
              className="h-9 sm:h-11 lg:h-[46px] w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </button>

          {/* Desktop Navigation Links (Clean Text Only - No Boxes) */}
          <div className="hidden md:flex items-center gap-6 sm:gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-[#EE461F] font-extrabold'
                      : 'text-[#121A50] font-bold hover:text-[#EE461F]'
                  }`}
                >
                  <span>{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EE461F] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                if (onContactClick) onContactClick();
                else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#EE461F] to-[#F59E0B] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#EE461F]/30 hover:shadow-[#EE461F]/50 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-gray-100 text-[#121A50] hover:bg-gray-200 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-2xl flex flex-col gap-2"
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
