'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion';
import styles from './case-studies-directory.module.css';

const GalleryContext = createContext<{ progress: MotionValue<number>; active: number; reduced: boolean } | null>(null);

export function CaseStudyGallery({ ids, children }: { ids: string[]; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const progress = useTransform(scrollYProgress, value => value * ids.length);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  useMotionValueEvent(progress, 'change', value => setActive(Math.min(ids.length - 1, Math.floor(value + .06))));
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return <GalleryContext.Provider value={{ progress, active, reduced }}>
    <div ref={track} className={styles.galleryTrack}>
      {!reduced && ids.map((id, index) => <span key={id} id={id} className={styles.galleryAnchor} style={{ top: `calc(${index * 25}% - ${index * 25}svh + 140px)` }} />)}
      <div className={styles.galleryStage}>
        {children}
        <div className={styles.galleryProgress} aria-hidden="true"><motion.span style={{ scaleX: scrollYProgress }} /></div>
      </div>
    </div>
  </GalleryContext.Provider>;
}

export function CaseStudyScrollScene({ id, index, children }: { id: string; index: number; children: ReactNode }) {
  const context = useContext(GalleryContext)!;
  const { progress, active, reduced } = context;
  const opacity = useTransform(progress, [index - .12, index, index + .88, index + 1], [index === 0 ? 1 : 0, 1, 1, index === 3 ? 1 : 0]);
  const lightOpacity = useTransform(progress, [index, index + .3, index + .8, index + 1], [0, .45, .2, 0]);
  const lightPosition = useTransform(progress, [index, index + 1], ['100%', '35%']);
  return <motion.article id={reduced ? id : undefined} className={styles.project} aria-labelledby={`${id}-title`} aria-hidden={!reduced && active !== index} inert={!reduced && active !== index} style={{ opacity: reduced ? 1 : opacity, zIndex: active === index ? 2 : 1 }}>
    {children}
    <motion.div className={styles.lightSweep} style={{ left: lightPosition, opacity: lightOpacity }} aria-hidden="true"><span className={styles.lightCore} /><span className={styles.lightBeam} /></motion.div>
  </motion.article>;
}
