'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionValueEvent, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Workflow, Check, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import styles from './scroll-statement.module.css';

export function ScrollStatement() {
  const statement = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [closingLine, setClosingLine] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: statement, offset: ['start 75%', 'start 25%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 26, mass: 0.55, restDelta: 0.001 });
  useMotionValueEvent(progress, 'change', (value) => {
    setExpanded(current => value > 0.52 ? true : value < 0.46 ? false : current);
    setClosingLine(current => value > 0.8 ? true : value < 0.73 ? false : current);
  });
  const layoutTransition = { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const };
  const words = (text: string) => text.split(' ').map((word, index) => (
    <motion.span key={word + index} layout={reducedMotion ? false : 'position'} transition={{ layout: layoutTransition }} className={styles.flowWord}>{word}</motion.span>
  ));
  const wordOpacity = useTransform(progress, [0.14, 0.42], [1, 0]);
  const wordBlur = useTransform(progress, [0.14, 0.42], ['blur(0px)', 'blur(4px)']);
  const previewOpacity = useTransform(progress, [0.22, 0.46], [0, 1]);
  const previewScale = useTransform(progress, [0.22, 0.46], [0.94, 1]);
  const previewBlur = useTransform(progress, [0.22, 0.46], ['blur(3px)', 'blur(0px)']);
  const timeHighlight = useTransform(progress, [0.58, 0.78], [0, 1]);
  const closingHighlight = useTransform(progress, [0.82, 1], [0, 1]);

  return (
    <section className={styles.section} aria-label="Our approach to digital products">
      <div className={styles.stage}>
      <LayoutGroup><p ref={statement} className={styles.statement}>
        <span className={styles.srOnly}>A better website. Smarter automation. Less busywork for your team, and more time for the things that move your business forward.</span>
        <span aria-hidden="true" className={styles.flow}>
          {words('A better')}
          <motion.span layout={reducedMotion ? false : "position"} transition={{ layout: layoutTransition }} className={styles.swap}>
            <motion.span className={styles.word} style={reducedMotion ? undefined : { opacity: wordOpacity, filter: wordBlur }}>website.</motion.span>
            {!reducedMotion && <motion.span className={styles.website} style={{ opacity: previewOpacity, scale: previewScale, filter: previewBlur }}>
              <Image src="/images/ayyatech-platform-preview-orange.png" alt="Ayyatech software platform preview" fill loading="eager" sizes="(max-width: 640px) 150px, 280px" className={styles.previewImage} />
            </motion.span>}
          </motion.span>
          {words('Smarter automation.')}
          <AnimatePresence initial={false} mode="popLayout">
            {!reducedMotion && expanded && <motion.span key="automation" layout="position" initial={{ opacity: 0, scale: 0.7, y: 8, rotate: -8 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, scale: 0.8, y: 4 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], layout: layoutTransition }} className={styles.automation}><Workflow aria-hidden="true" /></motion.span>}
          </AnimatePresence>
          {words('Less busywork for your team, and')}
          <motion.span layout={reducedMotion ? false : 'position'} transition={{ layout: layoutTransition }} className={styles.highlightedText}>
            <motion.span className={styles.highlightWash} style={{ scaleX: reducedMotion ? 1 : timeHighlight, opacity: reducedMotion ? 1 : timeHighlight }} />
            <span className={styles.highlightLabel}>more time</span>
          </motion.span>
          {words('for the things that move')}
          <AnimatePresence initial={false} mode="popLayout">
            {!reducedMotion && closingLine && (
              <motion.span
                key="workflow-detail"
                layout="position"
                className={styles.workflowDetail}
                initial={{ opacity: 0, y: 12, scale: 0.92, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], layout: layoutTransition }}
              >
                <span className={styles.detailIcon}><Check size={18} strokeWidth={2} /></span>
                <span className={styles.detailCopy}><strong>Less manual work</strong><span>More room to grow</span></span>
                <ArrowUpRight size={20} className={styles.detailArrow} />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span
            layout={reducedMotion ? false : 'position'}
            transition={{ layout: { ...layoutTransition, duration: reducedMotion ? 0 : 0.75 } }}
            className={`${styles.closingPhrase} ${!reducedMotion && closingLine ? styles.closingPhraseExpanded : ''}`}
          >
            <motion.span layout={reducedMotion ? false : 'position'} transition={{ layout: { ...layoutTransition, duration: reducedMotion ? 0 : 0.75 } }} className={styles.highlightedText}>
              <motion.span className={styles.highlightWash} style={{ scaleX: reducedMotion ? 1 : closingHighlight, opacity: reducedMotion ? 1 : closingHighlight }} />
              <span className={styles.highlightLabel}>your business forward.</span>
            </motion.span>
          </motion.span>
        </span>
      </p>
      </LayoutGroup>
      </div>
    </section>
  );
}
