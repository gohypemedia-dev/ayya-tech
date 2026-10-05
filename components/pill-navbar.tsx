'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'HOME', href: '#' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'service', label: 'SERVICE', href: '#services' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
  { id: 'case-studies', label: 'CASE STUDIES', href: '#case-studies' },
  { id: 'blog', label: 'BLOG', href: '#blog' },
];

interface PillNavbarProps {
  onContactClick?: () => void;
  className?: string;
}

export function PillNavbar({ onContactClick, className }: PillNavbarProps) {
  const [activeItem, setActiveItem] = useState('home');

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveItem(item.id);

    if (item.id === 'contact' && onContactClick) {
      onContactClick();
      return;
    }

    if (item.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.querySelector(item.href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Pill Navigation"
      className={cn(
        'w-fit mx-auto inline-flex items-center rounded-full bg-[#0E111A]/95 dark:bg-black/95 p-1.5 border border-white/10 shadow-2xl backdrop-blur-xl',
        className
      )}
    >
      {navItems.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => handleNavClick(item, e)}
            className={cn(
              'px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-full select-none',
              isActive
                ? 'bg-[#1C2033] text-[#EE461F] shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
