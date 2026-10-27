"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ProcessSection } from '@/components/process-section';
import { AppleStyleDock } from '@/components/apple-style-dock';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import styles from './services-directory.module.css';

const groups = [
  {
    id: 'digital-products', title: 'Digital products', description: 'From the first idea to the everyday experience.',
    image: '/images/services/web_dev.jpg', alt: 'Website development and digital product design',
    services: [
      { title: 'Website development', description: 'Fast, accessible websites that introduce your business and make the next step simple.', includes: ['Business websites & storefronts', 'Content management', 'Performance & accessibility'] },
      { title: 'Mobile app development', description: 'Useful, intuitive apps built around your customers and the way they work.', includes: ['iOS & Android applications', 'API integration', 'Offline experiences'] },
      { title: 'Low-code & automation', description: 'Launch an idea quickly or connect the tools your team already uses.', includes: ['MVP development', 'Webflow & low-code tools', 'Workflow automation'] },
    ],
  },
  {
    id: 'engineering', title: 'Engineering & expertise', description: 'The systems, people, and direction to move forward.',
    image: '/strategy-meets-craft-vibrant.jpg', alt: 'Digital product creators collaborating on software architecture and design',
    services: [
      { title: 'Custom software development', description: 'Purpose-built software for your operations, customers, and next stage of growth.', includes: ['Business platforms', 'APIs & integrations', 'Testing & maintenance'] },
      { title: 'IT consulting', description: 'Make informed technology decisions with a clear assessment and practical roadmap.', includes: ['Architecture reviews', 'Technology roadmaps', 'Modernization planning'] },
      { title: 'Engineering teams', description: 'Extend your team with engineers who fit your workflow and delivery goals.', includes: ['Dedicated developers', 'Flexible team support', 'Delivery collaboration'] },
    ],
  },
  {
    id: 'connected-systems', title: 'Cloud, AI & connected systems', description: 'Turn infrastructure and data into useful capabilities.',
    image: '/images/case-studies/cloud.png', alt: 'Illustrative cloud infrastructure dashboard',
    services: [
      { title: 'Cloud infrastructure', description: 'Build a reliable foundation for your applications and simplify day-to-day operations.', includes: ['Cloud migration', 'Infrastructure automation', 'Monitoring & DevOps'] },
      { title: 'AI-powered software', description: 'Bring useful intelligence into your products and internal workflows.', includes: ['AI assistants', 'Knowledge search', 'Data-driven workflows'] },
      { title: 'IoT & connected devices', description: 'Connect devices, collect operational data, and make it easier to act on what matters.', includes: ['Device integration', 'Real-time dashboards', 'Data pipelines'] },
    ],
  },
];

const allServices = groups.flatMap(group => group.services.map((service, index) => ({ ...service, category: group.title, anchor: index === 0 ? group.id : undefined })));
const serviceImages = allServices.map((_, index) => `/images/services/generated/service-${index}.png`);



export function ServicesDirectory({ onContact }: { onContact: () => void }) {
  const introRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = processRef.current;
    if (!list || !('IntersectionObserver' in window)) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>('ol > li'));
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = 'visible';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    steps.forEach(step => { step.dataset.reveal = 'pending'; observer.observe(step); });
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = list.getBoundingClientRect();
      const wide = window.innerWidth > 800;
      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const progress = wide
          ? ((window.innerHeight * 0.85 - bounds.top) / (window.innerHeight * 0.55)) * steps.length - index
          : (window.innerHeight * 0.85 - rect.top) / Math.max(rect.height, 1);
        step.style.setProperty('--step-progress', String(preference.matches ? 1 : Math.max(0, Math.min(1, progress))));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
      steps.forEach(step => { delete step.dataset.reveal; step.style.removeProperty('--step-progress'); });
    };
  }, []);
  useEffect(() => {
    const cards = Array.from(servicesRef.current?.querySelectorAll<HTMLElement>('[data-service-card]') ?? []);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        const progress = preference.matches || !next ? 0 : Math.max(0, Math.min(1, (window.innerHeight - next.getBoundingClientRect().top) / window.innerHeight));
        card.style.setProperty('--card-scale', String(1 - progress * 0.09));
        card.style.setProperty('--card-dim', String(progress * 0.65));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, []);
  useEffect(() => {
    const section = introRef.current;
    if (!section || !('IntersectionObserver' in window)) return;
    section.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.dataset.reveal = 'visible';
        observer.disconnect();
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -12% 0px' });
    observer.observe(section);
    return () => {
      observer.disconnect();
      delete section.dataset.reveal;
    };
  }, []);

  return (
    <div className={styles.page}>
      <a href="#services-content" className={styles.skip}>Skip to services</a>
      <AppleStyleDock className={styles.restoredNav} />
      <header className={styles.hero}>
        <Image src="/full_screen_it_team_bg.jpg" alt="Engineers collaborating in a technology studio" fill sizes="100vw" className={styles.heroImage} loading="eager" fetchPriority="high" />
        <div className={styles.heroCopy}>
          <h1>Our services.</h1>
          <p>Ideas into software.<br />Ambition into impact.</p>
        </div>
      </header>

      <main id="services-content" className={styles.content}>
        <section ref={introRef} className={`${styles.intro} ${styles.cinemaIntro}`} aria-labelledby="intro-title">
          <h2 id="intro-title" className={styles.cinemaTitle}>
            <span className={styles.revealLine}><span>BUILD</span></span>
            <span className={styles.cinemaTitleAside}><span className={styles.revealLine}><span>WHAT</span></span><span className={styles.revealLine}><span>COMES</span></span><span className={styles.revealLine}><span>NEXT.</span></span></span>
          </h2>
          <p className={styles.cinemaIntroCaption}>Nine services. From the first idea to the next possibility.</p>
          <a href="#digital-products" className={styles.cinemaExplore}>Explore our expertise <ArrowDown size={20} aria-hidden="true" /></a>
        </section>
        <div ref={servicesRef} className={styles.cinemaStack}>
          {allServices.map((service, index) => (
            <article key={service.title} id={service.anchor} data-service-card className={styles.cinemaCard} aria-labelledby={`service-title-${index}`}>
              <div className={styles.cinemaSurface}>
                <Image src={serviceImages[index]} alt="" fill sizes="100vw" className={styles.cinemaImage} />
                <div className={styles.cinemaShade} />
                <div className={styles.cinemaCopy}>
                  <h2 id={`service-title-${index}`}>{service.title}</h2>
                  <button onClick={onContact} className={styles.cinemaButton} aria-label={`Discuss ${service.title}`}>Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></button>
                </div>
                <div className={styles.cinemaDim} />
              </div>
            </article>
          ))}
        </div>
        <div ref={processRef} className={styles.processReuse}>
          <ProcessSection onContact={onContact} />
        </div>

        <section className={styles.engagement} aria-labelledby="engagement-title">
          <p className={styles.sectionLabel}>A way of working that fits</p>
          <h2 id="engagement-title">Your project.<br />Your pace.</h2>
          <div className={styles.engagementGrid}>
            {[
              ['A focused project', 'A clear goal, an agreed scope, and a dedicated build. For your next website, application, or business platform.'],
              ['Part of your team', 'Engineers who work alongside your people, fit your workflow, and bring the expertise you need to move forward.'],
              ['In it for the long run', 'Ongoing improvements, maintenance, and support to keep your product moving after launch.'],
            ].map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p><button onClick={onContact} className={styles.textLink} aria-label={`Discuss ${title.toLowerCase()}`}>Talk it through <ArrowUpRight size={18} aria-hidden="true" /></button></article>)}
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <h2 id="faq-title">Good questions.<br />Clear answers.</h2>
          <div>
            {[
              ['Where should we start?', 'Tell us what you want to achieve and where you are today. We’ll help you choose the right starting point, whether that’s discovery, a focused build, or support for your team.'],
              ['Can you work with our existing software?', 'Yes. We review your code, architecture, and integrations to understand what can be retained and what needs attention before proposing changes.'],
              ['How do you estimate cost and timelines?', 'We discuss scope, complexity, integrations, and your priorities first. Then we agree on an estimate and delivery milestones before the build begins.'],
              ['What happens after launch?', 'We plan handover, documentation, and any maintenance or support with you. The responsibilities and support scope are agreed as part of the engagement.'],
            ].map(([question, answer]) => <details key={question} className={styles.serviceDetail}><summary>{question}<Plus size={20} aria-hidden="true" /></summary><p className={styles.faqAnswer}>{answer}</p></details>)}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInvitation}>
          <div>
            <p className={styles.sectionLabel}><span /> Have something in mind?</p>
            <h2>Let’s make<br />it happen.</h2>
          </div>
          <div className={styles.footerAction}>
            <p>Tell us what you’re working on.<br />We’ll help you find the next step.</p>
            <button onClick={onContact} className={styles.cinemaButton}>Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <div className={styles.footerBottom}><Link href="/" className={styles.brand} aria-label="Ayyatech home"><Image src="/images/ayya-logo.png" alt="Ayya Technology" width={591} height={197} className={styles.logo} /></Link><p>Technology with purpose.</p><Link href="/case-studies">Explore our work <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </footer>
    </div>
  );
}
