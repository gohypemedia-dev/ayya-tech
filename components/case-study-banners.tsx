'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';
import styles from './case-study-banners.module.css';

export function CaseStudyBanners() {
  return (
    <section id="selected-work" className={styles.section} aria-labelledby="selected-work-title">
      <header className={styles.heading}><h2 id="selected-work-title">Selected case studies</h2><p>Complex challenges.<br />Real-world results.</p></header>
      <div className={styles.stack}>
        {caseStudies.map((project) => (
          <article className={styles.banner} key={project.tag} aria-labelledby={`banner-${project.slug}`}>
            <Link href={`/case-studies/${project.slug}`} className={styles.preview} aria-label={`View ${project.heading} case study`}>
              <Image className={styles.artwork} src={project.image} alt="" fill sizes="(max-width: 700px) 94vw, 46vw" />
            </Link>
            <div className={styles.content}>
              <p className={styles.client}>{project.service}</p>
              <h3 id={`banner-${project.slug}`}>{project.heading}</h3>
              <p className={styles.title}>{project.description}</p>
              <Link className={styles.caseLink} href={`/case-studies/${project.slug}`}>Explore case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
