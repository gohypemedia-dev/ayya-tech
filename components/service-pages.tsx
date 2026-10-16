'use client';

import { useRouter } from 'next/navigation';
import { AppleStyleDock } from '@/components/apple-style-dock';
import { ServicesOverview } from '@/components/services-overview';
import { ScrollingFeatureShowcase } from '@/components/ui/interactive-scrolling-story-component';
import { CinematicFooter } from '@/components/ui/motion-footer';

export function ServicePageContent({ page }: { page: 'services' | 'case-studies' }) {
  const router = useRouter();
  const contact = () => router.push('/#contact');
  const services = page === 'services';

  return (
    <div className="min-h-screen bg-white text-[#121A50]">
      <AppleStyleDock />
      <main className={services ? '' : 'pt-32 sm:pt-40'}>
        {!services && <header className="mx-auto max-w-6xl px-6 pb-12 sm:pb-16">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl font-bold tracking-tight">
            {services ? 'Services' : 'Case Studies'}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {services
              ? 'Explore our expertise in software engineering, cloud infrastructure, and digital transformation.'
              : 'Explore software, cloud, and AI projects across payments, commerce, and enterprise platforms.'}
          </p>
        </header>}
        {services
          ? <ServicesOverview onContact={contact} />
          : <ScrollingFeatureShowcase onCtaClick={contact} />}
      </main>
      <CinematicFooter onQuoteClick={contact} />
    </div>
  );
}
