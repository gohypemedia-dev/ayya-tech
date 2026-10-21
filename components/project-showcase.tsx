"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './project-showcase.module.css';

const projects = [
  { name: 'Connected commerce', category: 'Online stores & checkout', description: 'Thoughtful shopping experiences, connected inventory, and a simpler path from discovery to checkout.', image: '/images/case-studies/commerce.png', alt: 'Commerce concept with furniture products and a shopping cart' },
  { name: 'Cloud foundations', category: 'Infrastructure & migration', description: 'Connected cloud systems that help teams scale their applications and manage operations across regions.', image: '/images/case-studies/cloud.png', alt: 'Cloud dashboard concept with regional infrastructure and deployment health' },
  { name: 'Intelligent systems', category: 'AI & real-time insights', description: 'Turning streams of data into useful signals, with intelligent workflows that help teams make better decisions.', image: '/images/case-studies/ai.png', alt: 'Enterprise AI concept with an assistant and connected knowledge graph' },
  { name: 'Payment platforms', category: 'Enterprise software', description: 'Reliable payment infrastructure, designed around the complexity of transactions and the people who depend on them.', image: '/images/case-studies/payments.png', alt: 'Payments dashboard concept with transactions and checkout' },
];


function ProjectRow({ project, index }: { project: typeof projects[number]; index: number }) {
  return (
    <article className={styles.project} style={{ zIndex: index + 1 }} aria-labelledby={`project-${index}-heading`}>
      <div className={styles.card}>
      <div className={styles.visual}>
        <Link href="/case-studies" className={styles.preview} aria-label={`Explore ${project.name} case studies`}>
          <Image src={project.image} alt={project.alt} fill sizes="(max-width: 800px) 90vw, (max-width: 1416px) 52vw, 700px" />
        </Link>
      </div>
      <div className={styles.description}>
        <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <p className={styles.category}>{project.category}</p>
          <h3 id={`project-${index}-heading`}>{project.name}</h3>
          <p className={styles.summary}>{project.description}</p>
          <Link href="/case-studies" className={styles.caseLink} aria-label={`View ${project.name} case study`}>View case study <ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>
      </div>
      </div>
    </article>
  );
}

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const projects = projectsRef.current;
      const lastCard = projects?.lastElementChild as HTMLElement | null;
      if (!section || !projects || !lastCard) return;
      const pinTop = parseFloat(getComputedStyle(lastCard).top) || 0;
      // Release the title at the same boundary as the final sticky card.
      const exit = Math.min(0, projects.getBoundingClientRect().bottom - lastCard.offsetHeight - pinTop);
      section.style.setProperty('--title-exit', `${exit}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    if (projectsRef.current) observer.observe(projectsRef.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className={styles.section} aria-labelledby="work-heading">
      <header className={styles.header}>
        <p>Take a look at what we build.</p>
        <h2 id="work-heading">Ideas become<br /><em>reality.</em></h2>
      </header>
      <div ref={projectsRef} className={styles.projects}>
        {projects.map((project, index) => <ProjectRow key={project.name} project={project} index={index} />)}
      </div>
      <div className={styles.bottom}><Link href="/case-studies">Explore all case studies <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </section>
  );
}
