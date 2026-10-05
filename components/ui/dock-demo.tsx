'use client';

import {
  BookOpen,
  Briefcase,
  FolderGit2,
  HomeIcon,
  Info,
  Mail,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon className='h-full w-full text-current transition-colors' />,
    href: '#home',
  },
  {
    title: 'About',
    icon: <Info className='h-full w-full text-current transition-colors' />,
    href: '#about',
  },
  {
    title: 'Service',
    icon: <Briefcase className='h-full w-full text-current transition-colors' />,
    href: '#services',
  },
  {
    title: 'Contact',
    icon: <Mail className='h-full w-full text-current transition-colors' />,
    href: '#contact',
  },
  {
    title: 'Case Studies',
    icon: <FolderGit2 className='h-full w-full text-current transition-colors' />,
    href: '#case-studies',
  },
  {
    title: 'Blog',
    icon: <BookOpen className='h-full w-full text-current transition-colors' />,
    href: '#blog',
  },
];

export function AppleStyleDock() {
  return (
    <div className='fixed top-4 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock direction='top' className='items-start pt-2 bg-transparent border-0 shadow-none'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
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
