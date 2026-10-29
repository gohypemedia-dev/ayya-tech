'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AppleStyleDock } from '@/components/apple-style-dock';
import { CinematicFooter } from '@/components/ui/motion-footer';
import styles from './case-studies-directory.module.css';
import { EngineeringJourney } from '@/components/engineering-journey';
import { CaseStudyBanners } from '@/components/case-study-banners';

export function CaseStudiesDirectory({ onContact }: { onContact: () => void }) {
  return (
    <div className={styles.page}>
      <AppleStyleDock />
      <main className={styles.main}>
        <EngineeringJourney />

        <CaseStudyBanners />

        <section id="next-project" className={styles.cta} aria-labelledby="next-project-title">
          <p>Your next chapter</p>
          <div>
            <h2 id="next-project-title">A challenge in mind?<br />Let’s build what’s next.</h2>
            <Link href="/contact">Start a project <span><ArrowUpRight size={24} aria-hidden="true" /></span></Link>
          </div>
        </section>
      </main>
      <CinematicFooter onQuoteClick={onContact} />
    </div>
  );
}
