'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
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

export function ProjectShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const visible = useRef(false);
  const reducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 32, mass: 0.45 });
  const y = useSpring(0, { stiffness: 260, damping: 32, mass: 0.45 });
  const hidePreview = () => { visible.current = false; setActive(null); };

  useEffect(() => {
    const hide = () => { visible.current = false; setActive(null); };
    window.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('resize', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('scroll', hide);
      window.removeEventListener('resize', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);

  const followCursor = (event: PointerEvent<HTMLAnchorElement>, index: number) => {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 801px)').matches) return;
    const width = Math.min(340, window.innerWidth * 0.35);
    const height = width / 1.6;
    const left = event.clientX + width + 28 < window.innerWidth
      ? event.clientX + 24
      : event.clientX - width - 24;
    const top = Math.max(16, Math.min(window.innerHeight - height - 16, event.clientY - height / 2));
    const nextX = Math.max(16, Math.min(window.innerWidth - width - 16, left));
    if (!visible.current || reducedMotion) { x.jump(nextX); y.jump(top); }
    else { x.set(nextX); y.set(top); }
    visible.current = true;
    setActive(index);
  };
  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <header className={styles.header}>
        <p>Take a look at what we build.</p>
        <h2 id="work-heading">Ideas become<br /><em>reality.</em></h2>
      </header>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <Link key={project.name} href="/case-studies" className={styles.project} onPointerEnter={event => followCursor(event, index)} onPointerMove={event => followCursor(event, index)} onPointerLeave={hidePreview} onBlur={hidePreview} onClick={hidePreview} aria-label={`Explore ${project.name} case studies`}>
            <h3>{project.name}</h3>
            <div className={styles.preview}>
              <Image src={project.image} alt={project.alt} fill sizes="(max-width: 800px) 90vw, 32vw" />
              <span>Explore the work <ArrowUpRight size={17} aria-hidden="true" /></span>
            </div>
            <div className={styles.description}><h4>{project.category}</h4><p>{project.description}</p></div>
            <ArrowUpRight className={styles.arrow} size={24} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <motion.div className={styles.cursorPreview} aria-hidden="true" style={{ x, y }} initial={false} animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.94 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}>
        {projects.map((project, index) => <motion.div key={project.image} className={styles.previewLayer} initial={false} animate={{ opacity: active === index ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}><Image src={project.image} alt="" fill sizes="340px" /></motion.div>)}
        <span>Explore the work <ArrowUpRight size={17} /></span>
      </motion.div>
      <div className={styles.bottom}><p>AI-generated concept previews illustrating our services.</p><Link href="/case-studies">Explore all case studies <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </section>
  );
}
