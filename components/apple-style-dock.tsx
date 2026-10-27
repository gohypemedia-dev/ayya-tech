'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
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
  const pathname = usePathname();
  const router = useRouter();
  const activeSection = pathname.startsWith('/contact') ? 'contact' : pathname.startsWith('/services') ? 'services' : pathname.startsWith('/case-studies') ? 'case-studies' : 'home';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoOnly, setLogoOnly] = useState(pathname === '/');
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    const handleScroll = () => {
      const videoSection = document.getElementById('hero-video');
      const overVideo = window.matchMedia('(min-width: 768px)').matches && !!videoSection && videoSection.getBoundingClientRect().bottom > 0;
      setLogoOnly(overVideo);
      if (overVideo) setMobileMenuOpen(false);

    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  const navItems = [
    { id: 'home', title: 'Home', href: '/' },
    { id: 'services', title: 'Services', href: '/services' },
    { id: 'case-studies', title: 'Case Studies', href: '/case-studies' },
    { id: 'contact', title: 'Contact', href: '/contact' },
  ];

  const contact = () => {
    setMobileMenuOpen(false);
    if (onContactClick) onContactClick();
    else router.push('/contact');
  };

  return (
    <header className={`fixed top-3 sm:top-5 left-0 right-0 z-[100] px-3 sm:px-6 pointer-events-none ${className || ''}`}>
      <div className="max-w-6xl mx-auto">
        <nav
          aria-label="Main navigation"
          className={`pointer-events-auto relative isolate flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 ${logoOnly ? 'w-fit justify-start' : 'w-full justify-between'}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-white/95 backdrop-blur-xl border border-[#121A50]/10 shadow-[0_8px_30px_-12px_rgba(18,26,80,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]"
          />
          {/* Brand Logo Image */}
          <button
            onClick={() => router.push('/')}
            aria-label="Back to home"
            className="pointer-events-auto flex items-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F45E4] shrink-0"
          >
            <img
              src="/images/ayya-logo.png"
              alt="AYYA Technology Logo"
              className={`${logoOnly ? 'h-12 sm:h-14 lg:h-16' : 'h-9 sm:h-11 lg:h-[46px]'} w-auto object-contain hover:opacity-90 transition-opacity`}
            />
          </button>

          {/* Desktop navigation */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.18 }}
            className={`hidden ${logoOnly ? '' : 'md:flex'} items-center gap-6 lg:gap-8`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-xs sm:text-sm tracking-[-0.02em] transition-colors duration-200 cursor-pointer relative py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F45E4] ${
                    isActive
                      ? 'text-[#0E33CB] dark:text-white font-semibold'
                      : 'text-[#121D50] dark:text-muted-foreground font-medium hover:text-[#121D50] dark:hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EC4621] rounded-full"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </motion.div>

          {/* Right Action CTA & Mobile Menu Toggle */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.24 }}
            className={`flex items-center gap-2 sm:gap-3 ${logoOnly ? 'md:hidden' : ''}`}
          >
            <button
              onClick={contact}
              className="group relative inline-flex items-center gap-2 whitespace-nowrap px-3 sm:px-5 min-h-11 py-2.5 rounded-xl bg-[#EC4621] text-white text-xs sm:text-sm font-semibold hover:bg-[#0E33CB] dark:bg-foreground dark:text-background dark:hover:bg-foreground/90 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F45E4]"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-0.5 transition-transform motion-reduce:transition-none duration-200" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#EDF0F3] text-[#121D50] hover:bg-[#EDF0F3] dark:bg-muted dark:text-foreground dark:hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F45E4]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
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
              className="pointer-events-auto md:hidden mt-3 p-4 rounded-[22px] bg-[#FFFFFF]/95 dark:bg-background/95 backdrop-blur-2xl border border-[#EDF0F3] dark:border-border shadow-[0_12px_32px_-20px_rgba(18,29,80,0.25)] flex flex-col gap-2"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium flex items-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F45E4] ${
                      isActive
                        ? 'bg-[#EDF0F3] text-[#121D50] dark:bg-muted dark:text-[#EDF0F3]'
                        : 'text-[#121D50] hover:bg-[#EDF0F3] hover:text-[#121D50] dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground'
                    }`}
                  >
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
