import { ArrowUpRight } from 'lucide-react';
import styles from './process-section.module.css';

const steps = [
  { title: ['Understand', 'the project'], description: 'We discuss your goals, your audience, the features you need, and your timeline. Together, we define what success looks like.' },
  { title: ['Direction &', 'project scope'], description: 'We shape the visual direction and agree on a clear scope, timeline, and estimate. You know what we’re building and why.' },
  { title: ['Design &', 'development'], description: 'We turn the plan into your product, sharing working updates along the way. Your feedback helps shape every stage.' },
  { title: ['Launch &', 'ongoing support'], description: 'We test, launch, and hand over with care. Then we help you plan maintenance and improvements as your business grows.' },
];

export function ProcessSection({ onContact }: { onContact: () => void }) {
  return (
    <section className={styles.section} id="process" aria-labelledby="process-heading">
      <div className={styles.intro}>
        <h2 className={styles.heading} id="process-heading">From the first{' '}<br />idea<em>to the next step</em></h2>
        <p className={styles.description}>We stay in touch.<br />Personal, direct, and collaborative.</p>
        <button className={styles.cta} onClick={onContact}>Discuss your project <ArrowUpRight size={18} /></button>
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li className={styles.card} key={step.title[0]}>
            <span className={styles.number}>0{index + 1}</span>
            <div>
              <h3>{step.title[0]}{' '}<br />{step.title[1]}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
