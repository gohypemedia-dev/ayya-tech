'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, Headphones, MessagesSquare } from 'lucide-react';
import { AppleStyleDock } from './apple-style-dock';
import { CinematicFooter } from './ui/motion-footer';
import styles from './contact-page.module.css';

export function ContactPageContent() {
  const [prepared, setPrepared] = useState(false);
  const jumpToForm = () => document.getElementById('contact-form')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get('firstName')} ${data.get('lastName')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nService: ${data.get('service')}\n\n${data.get('message')}`;
    window.location.href = `mailto:contact@ayyatech.com?subject=${encodeURIComponent('Project inquiry: ' + data.get('service'))}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return (
    <>
      <AppleStyleDock onContactClick={jumpToForm} />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="contact-heading">
          <div className={styles.heroTitle}><div className={styles.phone} aria-hidden="true"><Image src="/retro-phone.png" alt="" fill sizes="(max-width: 640px) 76px, 110px" /></div><div><span className={styles.eyebrow}>Let&apos;s start a conversation</span><h1 id="contact-heading">We&apos;d love to hear <em>from you.</em></h1></div></div>
          <div className={styles.heroCopy}><p>Have an idea, a question, or a challenge to solve? Tell us what you have in mind. We&apos;ll help you find the next step.</p><a href="mailto:contact@ayyatech.com">contact@ayyatech.com <ArrowUpRight size={20} /></a></div>
        </section>
        <div className={styles.contactCards}>
          <a href="mailto:contact@ayyatech.com"><Mail /><span>Project inquiries<strong>contact@ayyatech.com</strong></span><ArrowUpRight size={18} /></a>
          <a href="mailto:support@ayyatech.com"><Headphones /><span>Need a hand?<strong>support@ayyatech.com</strong></span><ArrowUpRight size={18} /></a>
          <button type="button" onClick={jumpToForm}><MessagesSquare /><span>Start with your idea<strong>Tell us about your project</strong></span><ArrowUpRight size={18} /></button>
        </div>
        <section id="contact-form" className={styles.formSection} aria-labelledby="form-heading">
          <div className={styles.formIntro}><span className={styles.eyebrow}>A good project starts here</span><h2 id="form-heading">Get in <em>touch.</em></h2><p>Share a little about your business and what you want to build. A rough idea is a great place to start.</p><div className={styles.next}><strong>What happens next?</strong><p>We discuss your goals, explore the right approach, and agree on a clear scope together.</p></div></div>
          <form onSubmit={submit} className={styles.form}>
            <div className={styles.row}><label>First name<input name="firstName" autoComplete="given-name" placeholder="First name" required maxLength={80} /></label><label>Last name<input name="lastName" autoComplete="family-name" placeholder="Last name" required maxLength={80} /></label></div>
            <div className={styles.row}><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label><label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={40} /></label></div>
            <label>What can we help with?<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{['Website development', 'Mobile apps', 'Custom software', 'Cloud & infrastructure', 'AI & automation', 'Something else'].map(service => <option key={service}>{service}</option>)}</select></label>
            <label>Your project<textarea name="message" placeholder="Tell us about your idea, goals, and timeline..." required rows={5} maxLength={5000} /></label>
            <div className={styles.formBottom}><p>This opens your email app with your message ready to send.</p><button type="submit">Prepare your message <ArrowUpRight size={18} /></button></div>
            {prepared && <p role="status" className={styles.status}>Your email draft is ready. Send it from your email app, or email us directly at <a href="mailto:contact@ayyatech.com">contact@ayyatech.com</a>.</p>}
          </form>
        </section>
        <section className={styles.collaboration}><div><span className={styles.eyebrow}>Built around your team</span><h2>Good collaboration.<br /><em>Wherever you work.</em></h2><p>From the first conversation to the final handover, we keep communication clear. Share your time zone and preferred way to connect when you get in touch.</p><a href="#contact-form">Let&apos;s discuss your project <ArrowUpRight size={18} /></a></div><div className={styles.indiaMap}><Image src="/india-contact-map.svg" alt="India map with city markers for Delhi, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai, Ahmedabad, and Pune" width={612} height={696} /></div></section>
        <section className={styles.infoCards} aria-label="Explore Ayyatech">
          <Link href="/services" className={styles.exploreCard}>
            <span className={styles.cardCategory}>Our services <ArrowUpRight size={22} aria-hidden="true" /></span>
            <h3>Start with an idea.<br />Build something useful.</h3>
            <p>Websites, apps, and custom software shaped around your business.</p>
            <span className={styles.cardAction}>Explore our services <ArrowUpRight size={17} aria-hidden="true" /></span>
          </Link>
          <Link href="/case-studies" className={styles.exploreCard}>
            <span className={styles.cardCategory}>Case studies <ArrowUpRight size={22} aria-hidden="true" /></span>
            <h3>See what&apos;s possible.<br />Find your next step.</h3>
            <p>Explore the platforms and digital experiences we help bring to life.</p>
            <span className={styles.cardAction}>View case studies <ArrowUpRight size={17} aria-hidden="true" /></span>
          </Link>
        </section>
      </main>
      <CinematicFooter showProjectCta={false} />
    </>
  );
}
