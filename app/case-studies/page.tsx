import type { Metadata } from 'next';
import { ServicePageContent } from '@/components/service-pages';

export const metadata: Metadata = {
  title: 'Case Studies | Ayyatech',
  description: 'Explore Ayyatech software, cloud infrastructure, and AI project case studies.',
};

export default function CaseStudiesPage() {
  return <ServicePageContent page="case-studies" />;
}
