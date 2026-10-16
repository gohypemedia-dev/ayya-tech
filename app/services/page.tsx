import type { Metadata } from 'next';
import { ServicePageContent } from '@/components/service-pages';

export const metadata: Metadata = {
  title: 'Services | Ayyatech',
  description: 'Explore Ayyatech software engineering, cloud, AI, and digital transformation services.',
};

export default function ServicesPage() {
  return <ServicePageContent page="services" />;
}
