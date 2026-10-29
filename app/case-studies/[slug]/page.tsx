import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AppleStyleDock } from '@/components/apple-style-dock';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { caseStudies, caseStudyNarratives } from '@/lib/case-studies';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find(study => study.slug === slug);
  if (!project) notFound();
  return { title: `${project.heading} | Ayyatech Case Studies`, description: project.description };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = caseStudies.findIndex(study => study.slug === slug);
  if (index < 0) notFound();
  const project = caseStudies[index];
  const narrative = caseStudyNarratives[slug];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <AppleStyleDock />
      <main className={styles.page}>
        <Link className={styles.back} href="/case-studies#selected-work"><ArrowLeft size={16} aria-hidden="true" />All case studies</Link>
        <header className={styles.hero}>
          <p className={styles.category}>{project.service}</p>
          <h1>{project.heading}</h1>
          <p className={styles.intro}>{project.description}</p>
        </header>
        <figure className={styles.figure}>
          <div className={styles.preview}><Image src={project.image} alt={`${project.heading} interface concept`} fill sizes="(max-width: 800px) 92vw, 1200px" preload /></div>
          <figcaption>Illustrative interface concept{project.concept ? ' · Design exploration' : ''}</figcaption>
        </figure>
        <div className={styles.body}>
          <aside className={styles.facts} aria-label="Project information">
            <h2>Project overview</h2>
            <p>{project.title}</p>
            <h3>{project.concept ? 'Project type' : 'Client'}</h3>
            <p>{project.concept ? 'Independent concept study' : project.client}</p>
            <h3>{project.concept ? 'Features explored' : 'Technologies'}</h3>
            <ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
          </aside>
          <div className={styles.story}>
            <section><h2>The challenge</h2><p>{narrative.challenge}</p></section>
            <section><h2>{project.concept ? 'The proposed experience' : 'The approach'}</h2><ul>{narrative.approach.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section><h2>{project.concept ? 'Design direction' : 'The outcome'}</h2>
              {project.metricValue && <div className={styles.metric}><strong>{project.metricValue}</strong><span>{project.metricLabel}</span></div>}
              <p>{project.impact}</p>
              {!project.concept && <p className={styles.supporting}>{project.metrics}</p>}
            </section>
          </div>
        </div>
        <section className={styles.cta}><div><p>Have a similar challenge?</p><h2>Let’s build your next project.</h2></div><Link href="/contact">Discuss your project <ArrowUpRight size={20} aria-hidden="true" /></Link></section>
        <nav className={styles.next} aria-label="More case studies"><span>Next case study</span><Link href={`/case-studies/${next.slug}`}>{next.heading}<ArrowUpRight size={24} aria-hidden="true" /></Link></nav>
      </main>
      <CinematicFooter showProjectCta={false} />
    </>
  );
}
