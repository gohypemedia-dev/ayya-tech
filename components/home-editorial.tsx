'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ServicesOverview } from './services-overview';
import { ProjectShowcase } from './project-showcase';
import { ScrollStatement } from './scroll-statement';
import { ProjectInvitation } from './project-invitation';
import { TechnologyMarquee } from './technology-marquee';
import { ProcessSection } from './process-section';
import { ReviewsMarquee } from './reviews-marquee';
import { CinematicFooter } from './ui/motion-footer';
import ContactWithGlobe from './ui/contact-with-globe';
import styles from './home-editorial.module.css';






export function HomeEditorial({ onContact }: { onContact: () => void }) {
  return (
    <div className={styles.home}>
      <TechnologyMarquee />

      <ServicesOverview embedded onContact={onContact} />

      <section className={`${styles.section} ${styles.about}`} id="about" aria-labelledby="about-heading">
        <div className={styles.photo}>
          <Image src="/strategy-meets-craft-vibrant.jpg" alt="Digital product creators collaborating on software architecture and design - Strategy meets craft" fill sizes="(max-width: 760px) 90vw, 45vw" />
          <span>Strategy meets craft.</span>
        </div>
        <div className={styles.aboutCopy}>
          <p className={styles.label}>The people behind your next step</p>
          <h2 id="about-heading">Big on ideas.<br /><em>Close to your business.</em></h2>
          <p>We’re Ayyatech. A technology partner for businesses turning a new idea into a product, or making an existing system work better.</p>
          <p>We bring design and engineering together, with clear communication from the first conversation to the final handover.</p>
          <button className={`${styles.textLink} ${styles.brandLink}`} onClick={onContact}>Let’s get to know your project <ArrowUpRight size={19} /></button>
        </div>
      </section>

      <ProjectShowcase />

      <ScrollStatement />

      <ProcessSection onContact={onContact} />
      <ReviewsMarquee />



      <ProjectInvitation />
      <ContactWithGlobe className="scroll-mt-[112px]" />
      <CinematicFooter showProjectCta={false} />
    </div>
  );
}
