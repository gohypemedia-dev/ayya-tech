'use client';

import {
  Briefcase,
  FolderGit2,
  HomeIcon,
  Mail,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

interface AppleStyleDockProps {
  onContactClick?: () => void;
  className?: string;
}

export function AppleStyleDock({ onContactClick, className }: AppleStyleDockProps) {
  const navItems = [
    {
      title: 'Home',
      icon: <HomeIcon className='h-full w-full text-current transition-colors' />,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      title: 'Service',
      icon: <Briefcase className='h-full w-full text-current transition-colors' />,
      action: () => {
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'Contact',
      icon: <Mail className='h-full w-full text-current transition-colors' />,
      action: () => {
        if (onContactClick) {
          onContactClick();
        } else {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      title: 'Case Studies',
      icon: <FolderGit2 className='h-full w-full text-current transition-colors' />,
      action: () => {
        document.querySelector('#case-studies')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <div className='fixed top-4 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock direction='top' className='items-start pt-2 bg-transparent border-0 shadow-none'>
        {navItems.map((item, idx) => (
          <DockItem
            key={idx}
            onClick={item.action}
            className='aspect-square rounded-full bg-gray-200 text-neutral-700 hover:bg-[#EE461F] hover:text-white dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-[#EE461F] dark:hover:text-white shadow-sm hover:shadow-lg hover:shadow-[#EE461F]/30 transition-colors duration-200'
          >
            <DockLabel position='bottom'>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
