import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Cloud, Code2, Compass, Cpu, Database, Gauge, Layers, PanelsTopLeft, Plus, Radio, ShieldCheck, ShoppingBag, Smartphone, Users, Workflow } from 'lucide-react';
import { AppleStyleDock } from '@/components/apple-style-dock';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { services } from '@/lib/services';
import { getCaseStudiesForService } from '@/lib/case-studies';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };
const serviceIcons = [PanelsTopLeft, Smartphone, Workflow, Code2, Compass, Users, Cloud, Cpu, Radio];
const technologyLogos: Record<string, string> = {
  'Next.js': 'nextdotjs',
  React: 'react',
  'React Native': 'react',
  TypeScript: 'typescript',
  Flutter: 'flutter',
  Webflow: 'webflow',
  Docker: 'docker',
};

function TechnologyLogo({ name }: { name: string }) {
  const logo = technologyLogos[name];
  if (logo) return <Image src={`/images/tech/${logo}.svg`} alt="" width={28} height={28} />;
  if (name === 'Headless CMS' || name === 'Databases') return <Database size={26} aria-hidden="true" />;
  return <Layers size={26} aria-hidden="true" />;
}
const caseStudySummary: Record<string, string> = {
  commerce: 'A connected storefront and checkout experience designed around browsing, buying, and changing customer demand.',
  payments: 'Distributed payment services, banking integrations, and a foundation for dependable transaction processing.',
  cloud: 'A coordinated approach to cloud migration, infrastructure automation, and multi-region delivery.',
  ai: 'Connecting event streams and machine learning to make operational signals useful in real time.',
};
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  return { title: `${service.name} | Ayyatech`, description: service.description };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  const related = services.filter(item => item.slug !== slug).slice(service.image < 3 ? 0 : 3, service.image < 3 ? 3 : 6);
  const projects = getCaseStudiesForService(service.id);
  const capabilityIcons = service.id === 'web-dev'
    ? [PanelsTopLeft, ShoppingBag, Gauge]
    : [Layers, Workflow, ShieldCheck];
  return <>
    <AppleStyleDock />
    <main className={styles.page}>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          
          <h1>{service.headline}<em>{service.accent}</em></h1>
          <p className={styles.description}>{service.description}</p>
          <Link href="/contact" className={styles.primary}>Let’s talk about your project <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
        <figure className={styles.heroImage}>
          <Image src={`/images/services/generated/service-${service.image}.png`} alt={`Concept illustration of ${service.name.toLowerCase()}`} fill sizes="(max-width: 800px) 92vw, 48vw" preload />
        </figure>
      </header>
      <div className={styles.stack} aria-label="Tools and capabilities">
        <span className={styles.stackLabel}>Built with purpose</span>
        <div className={styles.stackWindow}>
          <div className={styles.stackTrack}>
            {[0, 1].map(copy => (
              <div key={copy} className={styles.stackGroup} aria-hidden={copy === 1 ? true : undefined}>
                {service.stack.map(item => <span className={styles.stackItem} key={item}><TechnologyLogo name={item} />{item}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <section id="capabilities" className={styles.capabilities} aria-labelledby="capabilities-title">
        <div className={styles.sectionIntro}><h2 id="capabilities-title">{service.intro}</h2><p>{service.context}</p></div>
        <div className={styles.capabilityList}>{service.capabilities.map(([title, description], index) => {
          const Icon = capabilityIcons[index];
          return <article key={title}><span className={styles.featureIcon}><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>;
        })}</div>
      </section>
      {projects.length > 0 && <section className={styles.projects} aria-labelledby="projects-heading">
        <div className={styles.projectHeading}><div><h2 id="projects-heading">{service.name}<br /><em>in practice.</em></h2></div><Link href="/case-studies">Explore all work <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className={styles.projectGrid}>{projects.map(project => <article key={project.slug}>
          <Link href={`/case-studies/${project.slug}`} className={styles.projectImage} aria-label={`Explore ${project.heading}`}><Image src={project.image} alt={`${project.heading} — illustrative interface concept`} fill sizes="(max-width: 640px) 90vw, 44vw" /></Link>
          <h3><Link href={`/case-studies/${project.slug}`}>{project.heading}</Link></h3>
          <p className={styles.projectDescription}>{project.concept ? project.description : caseStudySummary[project.slug]}</p>
          <Link className={styles.projectLink} href={`/case-studies/${project.slug}`}>{project.concept ? 'Explore the concept' : 'Read the case study'} <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </article>)}</div>
      </section>}
      <section className={styles.process}>
        <div><h2>A clear path.<br /><em>From idea to delivery.</em></h2><p>Shared priorities, regular conversations, and a clear view of what happens next.</p><Link href="/contact">Discuss your requirements <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <ol>{service.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><div><h3>{['Understand & define', 'Design & build', 'Validate & hand over'][index]}</h3><p>{step}</p></div></li>)}</ol>
      </section>
      <section className={styles.faq}><h2>A little more clarity.</h2><div>{service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}<details><summary>How do we get started?<Plus size={18} aria-hidden="true" /></summary><p>Tell us about your goals, existing systems, and any timing or budget constraints. We’ll discuss the scope and agree on a practical next step before any work begins.</p></details></div></section>
      <section className={styles.cta}><div><h2>What could we<br /><em>build together?</em></h2></div><Link href="/contact" className={styles.primary}>Tell us about your project <ArrowUpRight size={20} aria-hidden="true" /></Link></section>
      <nav className={styles.related} aria-label="Related services">
        <div className={styles.relatedHeading}>
          <h2>Explore more possibilities.</h2>
          <Link href="/services">All services <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className={styles.relatedGrid}>{related.map(item => {
          const Icon = serviceIcons[item.image] ?? Layers;
          return <Link key={item.slug} href={`/services/${item.slug}`} className={styles.relatedService}>
            <span className={styles.relatedIcon}><Icon size={28} strokeWidth={1.5} aria-hidden="true" /></span>
            <h3>{item.name}</h3>
            <p>{item.intro}</p>
            <span className={styles.relatedAction}>Explore service <ArrowUpRight size={18} aria-hidden="true" /></span>
          </Link>;
        })}</div>
      </nav>
    </main>
    <CinematicFooter showProjectCta={false} />
  </>;
}
