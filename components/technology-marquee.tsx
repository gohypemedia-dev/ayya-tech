'use client';

import Image from 'next/image';
import styles from './technology-marquee.module.css';

const brands = [
  ['Next.js', 'nextdotjs'], ['React', 'react'], ['Flutter', 'flutter'],
  ['Webflow', 'webflow'], ['TypeScript', 'typescript'], ['Docker', 'docker'], ['GitHub Actions', 'githubactions'],
];

export function TechnologyMarquee() {
  return (
    <section className={styles.section} aria-label="Technologies we work with">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map(copy => <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
            {brands.map(([name, logo]) => <li key={name}><Image src={`/images/tech/${logo}.svg`} alt="" width={30} height={30} /><span>{name}</span></li>)}
          </ul>)}
        </div>
      </div>
    </section>
  );
}
