"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './motion-footer.module.css';

interface CinematicFooterProps {
  onQuoteClick?: () => void;
  showProjectCta?: boolean;
}

export function CinematicFooter({ onQuoteClick, showProjectCta = true }: CinematicFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {showProjectCta && <div className={styles.invitation}>
          <div><p>Have something in mind?</p><h2>Let’s make it happen.</h2></div>
          {onQuoteClick
            ? <button type="button" onClick={onQuoteClick} className={styles.action}>Discuss your project <ArrowUpRight size={19} aria-hidden="true" /></button>
            : <Link href="/contact" className={styles.action}>Discuss your project <ArrowUpRight size={19} aria-hidden="true" /></Link>}
        </div>}
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Ayyatech home"><Image src="/images/ayya-logo.png" alt="Ayyatech" width={180} height={69} className={styles.logo} /></Link>
            <p>Thoughtfully designed.<br />Expertly engineered.</p>
            <span>Websites, software, and digital experiences built around your business.</span>
          </div>
          <nav className={styles.navigation} aria-label="Footer navigation">
            <h2>Explore</h2>
            <Link href="/">Home</Link>
            <Link href="/services">Our services</Link>
            <Link href="/case-studies">Case studies</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className={styles.contact}>
            <h2>Let’s talk</h2>
            <a href="mailto:contact@ayyatech.com" className={styles.email}>contact@ayyatech.com <ArrowUpRight size={19} aria-hidden="true" /></a>
            <p>Tell us what you’re building.<br />We’ll help you find the next step.</p>
            <Link href="/contact" className={styles.textLink}>Start a conversation <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Ayyatech. All rights reserved.</p>
          <nav className={styles.legal} aria-label="Legal"><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-of-use">Terms of use</Link></nav>
        </div>
      </div>
    </footer>
  );
}

export default CinematicFooter;
