'use client';

import { useRouter } from 'next/navigation';
import { AppleStyleDock } from '@/components/apple-style-dock';
import { ServicesDirectory } from '@/components/services-directory';
import { ScrollingFeatureShowcase } from '@/components/ui/interactive-scrolling-story-component';
import { CinematicFooter } from '@/components/ui/motion-footer';

export function ServicePageContent({ page }: { page: 'services' | 'case-studies' }) {
  const router = useRouter();
  const contact = () => router.push('/#contact');
  const services = page === 'services';

  if (services) return <ServicesDirectory onContact={contact} />;

  return (
    <div className="min-h-screen bg-white text-[#121D50]">
      <AppleStyleDock />
      <main className={services ? '' : 'pt-28 sm:pt-32'}>
        {!services && <header className="w-full px-5 sm:px-8 lg:px-12 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.045em]">
            {services ? 'Services' : 'Case Studies'}
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#121D50]">
            {services
              ? 'Explore our expertise in software engineering, cloud infrastructure, and digital transformation.'
              : 'Explore software, cloud, and AI projects across payments, commerce, and enterprise platforms.'}
          </p>
        </header>}
        {services
          ? <ServicesDirectory onContact={contact} />
          : <ScrollingFeatureShowcase onCtaClick={contact} />}
      </main>
      <CinematicFooter onQuoteClick={contact} />
    </div>
  );
}
