import { AppleStyleDock } from '@/components/apple-style-dock';
import { CinematicFooter } from '@/components/ui/motion-footer';
import styles from './legal-page.module.css';

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: { title: string; text: string }[] }) {
  return <><AppleStyleDock /><main className={styles.page}>
    <header className={styles.header}><h1>{title}</h1><p className={styles.intro}>{intro}</p><p className={styles.updated}>Last updated <time dateTime="2026-10-29">October 29, 2026</time></p></header>
    {sections.map((section, i) => <section id={`section-${i}`} key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    <section className={styles.contact}><h2>Questions?</h2><p>Contact us at <a href="mailto:contact@ayyatech.com">contact@ayyatech.com</a>.</p></section>
  </main><CinematicFooter showProjectCta={false} /></>;
}
