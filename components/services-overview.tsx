'use client';

import { ArrowUpRight } from 'lucide-react';
import type { PointerEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { THREE_SECTIONS } from '@/components/agency-services-section';
import styles from './services-overview.module.css';

const technologyTags: Record<string, { label: string; logo?: string }[]> = {
  'web-dev': [{ label: 'Next.js', logo: 'nextdotjs' }, { label: 'React', logo: 'react' }, { label: 'TypeScript', logo: 'typescript' }],
  'mobile-dev': [{ label: 'React Native', logo: 'react' }, { label: 'Flutter', logo: 'flutter' }, { label: 'Offline sync' }],
  'lowcode-dev': [{ label: 'Webflow', logo: 'webflow' }, { label: 'Rapid MVP' }, { label: 'Automated workflows' }],
  'software-dev': [{ label: 'TypeScript', logo: 'typescript' }, { label: 'Docker', logo: 'docker' }, { label: 'GitHub Actions', logo: 'githubactions' }],
};

const copy: Record<string, [string, string]> = {
  'web-dev': ['Websites', 'A considered first impression. Fast, intuitive websites that build trust and turn visitors into your next customers.'],
  'mobile-dev': ['Mobile apps', 'From the first tap to the everyday essentials. iOS and Android apps that feel natural and keep people coming back.'],
  'lowcode-dev': ['Low-code & automation', 'Bring your idea to market sooner. Practical tools and connected workflows so your team can focus on what matters.'],
  'software-dev': ['Custom software', 'Software built around your business. From internal tools to ambitious digital products, we turn complex needs into simple experiences.'],
  'it-staffing': ['Engineering teams', 'The right people to move your product forward. Experienced engineers who work alongside your team and take ownership of delivery.'],
  'it-consultancy': ['Technology consulting', 'Clarity before the next big decision. Assess your systems, choose your direction, and build a practical technology roadmap.'],
  'cloud-infra': ['Cloud infrastructure', 'A dependable foundation for what comes next. Secure, scalable cloud systems designed to grow with your business.'],
  'ai-software': ['AI & intelligent tools', 'Put your knowledge to work. AI assistants, search, and intelligent workflows that solve real problems for your people.'],
  'iot-dev': ['Connected devices', 'Connect the physical and digital. Smart devices and real-time insights that help you understand and act on what’s happening.'],
};

export function ServicesOverview({ onContact, embedded = false }: { onContact: () => void; embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1';
  const CardHeading = embedded ? 'h3' : 'h2';
  const updateHighlight = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <section id="services" className={`${styles.overview} ${embedded ? styles.embedded : ''}`} aria-labelledby="services-heading">
      <div className={styles.container}>
        <header className={styles.intro}>
          <Heading id="services-heading" className={styles.heading}>High-quality<span>software solutions</span></Heading>
          <p className={styles.introCopy}>Websites, apps, and custom software.<br />Built around your business.</p>
        </header>
        <div id="service-directory" className={styles.grid}>
          {THREE_SECTIONS.flatMap(group => group.services.filter(service => !embedded || ['web-dev', 'mobile-dev', 'lowcode-dev', 'software-dev'].includes(service.id)).map((service, index) => {
            const [title, description] = copy[service.id];
            const Icon = service.icon;
            return (
              <article key={service.id} id={index === 0 ? group.id : service.id} className={styles.card} onPointerMove={updateHighlight}>
                <div className={styles.cardHeading}>
                  <CardHeading>{title}</CardHeading>
                  <button type="button" onClick={onContact} className={styles.cardAction} aria-label={`Discuss ${title}`}><ArrowUpRight size={23} aria-hidden="true" /></button>
                </div>
                <p className={styles.description}>{description}</p>
                <ul className={styles.tags} aria-label={`${title} capabilities`}>
                  {(technologyTags[service.id] ?? service.tags.map(label => ({ label, logo: undefined }))).map(tag => (
                    <li key={tag.label}>
                      {tag.logo
                        ? <Image src={`/images/tech/${tag.logo}.svg`} alt="" width={22} height={22} className={styles.techLogo} />
                        : <span aria-hidden="true"><Icon className={styles.tagIcon} /></span>}
                      <span>{tag.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          }))}
          {!embedded && <div className={styles.invitation}>
            <span className={styles.invitationLabel}>Your next chapter</span>
            <CardHeading>Have something<br /><em>in mind?</em></CardHeading>
            <p>Tell us what you’re building. We’ll find the right way forward, together.</p>
            <button type="button" onClick={onContact} className={styles.cta}>Discuss your project <ArrowUpRight size={19} aria-hidden="true" /></button>
          </div>}
        </div>
        <div className={styles.bottom}>
          {embedded ? <Link href="/services" className={styles.allServices}>Explore all services <ArrowUpRight size={18} aria-hidden="true" /></Link> : <p>Good ideas deserve great execution.</p>}
          <button type="button" onClick={onContact} className={styles.cta}>Let’s build something <ArrowUpRight size={19} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
