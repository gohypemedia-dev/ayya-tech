'use client';

import { useState, useId, useSyncExternalStore } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import styles from './project-invitation.module.css';

const inclusions = [
  ['Custom concept', 'Together, we turn your idea into a concrete plan: what your software should do, who will use it, and which workflows it should simplify. A clear foundation for everything we build.'],
  ['Thoughtful UI & UX design', 'Clear journeys, considered layouts, and an interface that feels natural. We shape the experience around the people who will use it every day.'],
  ['Fast, responsive frontend', 'A smooth experience on phones, tablets, and desktops. We build with performance, accessibility, and everyday usability in mind.'],
  ['Secure, scalable backend', 'A reliable foundation for your data, integrations, and business logic, with access controls and an architecture designed for your needs.'],
  ['Quality assurance before launch', 'We check the important user journeys, responsive layouts, and integrations before release, and resolve issues ahead of handover.'],
  ['Personal handover & guidance', 'Understand how your product works, how to manage it, and what comes next. We walk you through the essentials and discuss ongoing support.'],
];

function subscribeToMobile(onChange: () => void) {
  const query = window.matchMedia('(max-width: 640px)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const getMobileSnapshot = () => window.matchMedia('(max-width: 640px)').matches;
const getServerSnapshot = () => true;

export function ProjectInvitation() {
  const isMobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getServerSnapshot);
  const [selected, setActive] = useState<number | null | undefined>(undefined);
  const active = selected === undefined ? (isMobile ? null : 0) : selected;
  const id = useId();
  return (
    <section id="project-invitation" className={styles.panel} aria-labelledby={`${id}-heading`}>
      <div className={styles.accordion}>
        {inclusions.map(([title, description], index) => (
          <div key={title} className={styles.item} data-open={active === index}>
            <h3><button type="button" id={`${id}-trigger-${index}`} aria-expanded={active === index} aria-controls={`${id}-panel-${index}`} onClick={() => setActive(active === index ? null : index)}><span>{title}</span><Plus size={18} aria-hidden="true" /></button></h3>
            <div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-trigger-${index}`} className={styles.reveal} inert={active !== index} aria-hidden={active !== index}>
              <div><p>{description}</p></div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.invitation}>
        <h2 id={`${id}-heading`}>Big plans.<em>Built around you.</em></h2>
        <p>Custom software, shaped around your goals and the way you work.</p>
        <a className={styles.button} href="mailto:contact@ayyatech.com">Discuss your project <ArrowUpRight size={19} aria-hidden="true" /></a>
        <span className={styles.note}>Tell us your idea. We’ll help define the scope and next steps.</span>
      </div>
    </section>
  );
}
