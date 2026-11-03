import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { AppleStyleDock } from '@/components/apple-style-dock';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { caseStudies, caseStudyNarratives } from '@/lib/case-studies';
import { caseStudyDetails } from '@/lib/case-study-details';
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
  const detail = caseStudyDetails[slug];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <AppleStyleDock />
      <main className={styles.page}>
        <header className={styles.hero}>
          <div><p className={styles.category}>{project.service}</p><h1>{project.heading}</h1></div>
          <p className={styles.intro}>{project.description}</p>
        </header>
        <figure className={styles.figure}>
          <div className={styles.preview}>
            <Image src={project.image} alt={`${project.heading} interface concept`} fill sizes="(max-width: 800px) 92vw, 960px" preload />
          </div>
        </figure>
        <div className={styles.body}>
          <aside className={styles.facts} aria-label="Project information">
            <h2>Project overview</h2>
            <p>{project.title}</p>
            <h3>{project.concept ? 'Project type' : 'Client'}</h3>
            <p>{project.concept ? 'Independent concept study' : project.client}</p>
            <h3>{project.concept ? 'Features explored' : 'Technologies'}</h3>
            <ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
            <nav className={styles.contents} aria-label="In this case study">
              <a href="#context">Project context <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href="#approach">{project.concept ? 'Proposed experience' : 'Our approach'} <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href="#outcome">{project.concept ? 'Design direction' : 'The outcome'} <ArrowUpRight size={14} aria-hidden="true" /></a>
            </nav>
          </aside>
          <div className={styles.story}>
            <section id="context"><h2>{project.concept ? 'The concept brief' : 'Project context'}</h2><p>{detail.context}</p></section>
            <section><h2>The challenge</h2><p>{narrative.challenge}</p></section>
            <section><h2>Key priorities</h2><ul>{detail.priorities.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section id="approach"><h2>{project.concept ? 'The proposed experience' : 'The approach'}</h2>
              {detail.decisions.map(decision => <div className={styles.decision} key={decision.title}><h3>{decision.title}</h3><p>{decision.text}</p></div>)}
            </section>
            <section id="outcome"><h2>{project.concept ? 'Design direction' : 'The outcome'}</h2>
              {project.metricValue && <div className={styles.metric}><strong>{project.metricValue}</strong><span>{project.metricLabel}</span></div>}
              <p>{project.impact}</p>
              {!project.concept && <p className={styles.supporting}>{project.metrics}</p>}
              <p className={styles.takeaway}>{detail.takeaway}</p>
            </section>
          </div>
        </div>
        <section className={styles.cta} aria-labelledby="project-invitation">
          <div><h2 id="project-invitation">Let’s build your<br />next project.</h2><p>Tell us what you want to build. We’ll help you define the next step.</p></div>
          <Link href="/contact">Discuss your project <ArrowUpRight size={20} aria-hidden="true" /></Link>
        </section>
        <nav className={styles.next} aria-label="More case studies">
          <Link href={`/case-studies/${next.slug}`}>
            <span className={styles.nextPreview}><Image src={next.image} alt="" fill sizes="(max-width: 560px) 104px, 200px" /></span>
            <span className={styles.nextCopy}><span className={styles.nextLabel}>Next case study</span><span className={styles.nextTitle}>{next.heading}</span><span className={styles.nextService}>{next.service}</span></span>
            <span className={styles.nextArrow}><ArrowUpRight size={24} aria-hidden="true" /></span>
          </Link>
        </nav>
      </main>
      <CinematicFooter showProjectCta={false} />
    </>
  );
}
