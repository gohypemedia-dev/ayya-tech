'use client';

import { useRouter } from 'next/navigation';
import { ServicesDirectory } from '@/components/services-directory';
import { CaseStudiesDirectory } from '@/components/case-studies-directory';

export function ServicePageContent({ page }: { page: 'services' | 'case-studies' }) {
  const router = useRouter();
  const contact = () => router.push('/#contact');
  const services = page === 'services';

  if (services) return <ServicesDirectory onContact={contact} />;

  return <CaseStudiesDirectory onContact={contact} />;
}
