import type { Metadata } from 'next';
import { ContactPageContent } from '@/components/contact-page';

export const metadata: Metadata = {
  title: 'Contact | Ayyatech',
  description: 'Talk to Ayyatech about websites, mobile apps, custom software, cloud, and AI projects.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
