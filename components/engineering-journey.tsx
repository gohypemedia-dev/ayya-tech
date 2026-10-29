'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './engineering-journey.module.css';

const steps = [
  { first: 'Think', last: 'it through', icon: 'target', text: 'Understand the challenge. Map the requirements. Find the right way forward.' },
  { first: 'Design', last: 'the system', icon: 'blocks', text: 'Shape an architecture that connects every part and leaves room to grow.' },
  { first: 'Build', last: 'with care', icon: 'code', text: 'Turn the plan into working software. Test, refine, and make every detail count.' },
  { first: 'Launch', last: '& scale', icon: 'rocket', text: 'Ship with confidence. Monitor the real world. Keep making the system better.' },
];

function Sketch({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={styles.sketch} aria-hidden="true">
      <g stroke="#121D50" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'target' && <>
          <circle cx="55" cy="64" r="43" fill="#fff" stroke="#d9e0f5" strokeWidth="12" />
          <circle cx="55" cy="64" r="37" fill="#EC4621" />
          <circle cx="55" cy="64" r="26" stroke="#fff" />
          <circle cx="55" cy="64" r="15" stroke="#fff" />
          <path d="M55 64 97 21m-7-8 18-4-3 20-9-4-6-12Z" fill="#fff" />
          <path d="m13 20 4 9m-11 3 8 3m76 61 8 4m-15 4 2 7" />
        </>}
        {kind === 'blocks' && <>
          <path d="m17 27 53-12 37 28-8 61-54 8L9 84Z" fill="#d9e0f5" stroke="#d9e0f5" strokeWidth="12" />
          <path d="m17 27 53-12 37 28-53 12Z" fill="#fff" />
          <path d="m17 27 37 28-9 57L9 84Z" fill="#EC4621" />
          <path d="m54 55 53-12-8 61-54 8Z" fill="#fff" />
          <path d="m64 71 28-6m-29 17 27-6M28 48l-3 26 12 9 3-25Z" />
        </>}
        {kind === 'code' && <>
          <rect x="9" y="20" width="102" height="82" rx="8" fill="#d9e0f5" stroke="#d9e0f5" strokeWidth="12" />
          <rect x="9" y="20" width="102" height="82" rx="5" fill="#fff" />
          <path d="M9 39h102V25a5 5 0 0 0-5-5H14a5 5 0 0 0-5 5Z" fill="#121D50" />
          <path d="M20 29h1m10 0h1m10 0h1" stroke="#fff" />
          <path d="m41 56-15 14 15 13m38-27 15 14-15 13M67 52 53 88" stroke="#EC4621" strokeWidth="5" />
        </>}
        {kind === 'rocket' && <>
          <path d="M31 68C39 39 67 16 100 13c-1 34-21 63-51 75Z" fill="#d9e0f5" stroke="#d9e0f5" strokeWidth="13" />
          <path d="m34 61-18 1-9 28 30-12m24 4-1 19-29 10 12-30" fill="#EC4621" />
          <path d="M31 68C39 39 67 16 100 13c-1 34-21 63-51 75Z" fill="#fff" />
          <path d="M70 20c2 14 12 24 25 27 4-12 5-23 5-34Z" fill="#EC4621" />
          <circle cx="66" cy="49" r="10" fill="#0E33CB" />
          <path d="m28 85-10 15m22-10-6 13m-12-28L9 80" stroke="#EC4621" strokeWidth="5" />
        </>}
      </g>
    </svg>
  );
}

export function EngineeringJourney() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const [clearance, setClearance] = useState<{ x: number; y: number; width: number; height: number }[]>([]);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const measure = () => {
      const bounds = section.getBoundingClientRect();
      const svgBounds = trailRef.current?.getBoundingClientRect();
      if (!svgBounds || !bounds.width || !svgBounds.width || !svgBounds.height) return;
      setClearance(Array.from(section.querySelectorAll('li h2, li > p, li > span')).map(element => {
        const box = element.getBoundingClientRect();
        return { x: (box.left - svgBounds.left - 14) / svgBounds.width * 1400,
          y: (box.top - svgBounds.top - 12) / svgBounds.height * 1540,
          width: (box.width + 28) / svgBounds.width * 1400,
          height: (box.height + 24) / svgBounds.height * 1540 };
      }));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    section.querySelectorAll('li h2, li > p, li > span').forEach(element => observer.observe(element));
    measure();
    return () => observer.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start 65%', 'end 65%'] });
  const progress = useTransform(scrollYProgress, [0.05, 1], [0, 1]);
  const smoothProgress = useSpring(progress, { stiffness: 180, damping: 35, restDelta: 0.001 });
  const path = 'M 700 20 C 700 150 1080 100 1080 270 C 1080 430 340 350 340 570 C 340 780 1090 700 1090 920 C 1090 1140 510 1040 510 1300 C 510 1420 640 1450 690 1500';

  return (
    <section id="engineering-journey" ref={ref} className={styles.journey} aria-labelledby="engineering-journey-title">
      <header className={styles.heading}>
        <p>Behind every case study</p>
        <h1 id="engineering-journey-title">Great systems.<br />Built step by step.</h1>
        <div className={styles.leadIn}>
          <p>From the first question to a system ready for the real world. Here’s how we bring it all together.</p>
        </div>
      </header>
      <div ref={stageRef} className={styles.stage}>
      <svg ref={trailRef} className={styles.trail} viewBox="0 0 1400 1540" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="1540">
          <rect width="1400" height="1540" fill="white" />
          {clearance.map((box, index) => <rect key={index} {...box} rx="10" fill="black" />)}
        </mask></defs>
        <circle cx="700" cy="20" r="7" fill="#EC4621" />
        <g mask={`url(#${maskId})`}>
        <path d={path} stroke="#EC4621" strokeOpacity=".13" strokeWidth="3" strokeLinecap="round" />
        <motion.path className={styles.progress} d={path} stroke="#EC4621" strokeWidth="3" strokeLinecap="round" style={{ pathLength: smoothProgress }} />
        </g>
      </svg>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <motion.li key={step.icon} id={index === 0 ? 'journey-start' : undefined} className={styles.step}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.stepNumber}>0{index + 1}</span>
            <h2><Sketch kind={step.icon} /><span>{step.first} {step.last}</span></h2>
            <p>{step.text}</p>
          </motion.li>
        ))}
      </ol>
      </div>
    </section>
  );
}

