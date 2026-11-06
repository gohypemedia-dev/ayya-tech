'use client';

import { useRef, useState } from 'react';
import { Headset, X, ArrowUpRight } from 'lucide-react';
import styles from './contact-tools.module.css';

const whatsapp = 'https://wa.me/447933437170';

export function ContactChat() {
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  function close() { setOpen(false); launcher.current?.focus(); }
  return <aside className={styles.chat} aria-label="Contact Ayyatech" onKeyDown={event => { if (event.key === 'Escape') close(); }}>
    {open && <section id="contact-chat-panel" className={styles.panel} aria-labelledby="chat-title">
      <header><h2 id="chat-title">Chat with our team</h2><button type="button" aria-label="Close chat options" onClick={close}><X size={20} /></button></header>
      <p>Tell us about your project or ask to speak with an agent Conversations open in WhatsApp</p>
      <a href={`${whatsapp}?text=${encodeURIComponent('Hello Ayyatech, I would like to chat with an agent about my project')}`} target="_blank" rel="noopener noreferrer">Chat with an agent <ArrowUpRight size={18} /></a>
      <a href="mailto:info@ayyatech.co.uk">Prefer email? info@ayyatech.co.uk</a>
    </section>}
    <div className={styles.actions}>
      <a className={styles.whatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)"><span className={styles.whatsappLogo} aria-hidden="true" /><span className={styles.actionLabel}>WhatsApp</span></a>
      <button ref={launcher} type="button" aria-label={open ? 'Close chat' : 'Chat with an agent'} aria-expanded={open} aria-controls="contact-chat-panel" onClick={() => setOpen(!open)}>{open ? <X size={24} aria-hidden="true" /> : <Headset size={24} aria-hidden="true" />}<span className={styles.actionLabel}>{open ? 'Close chat' : 'Chat with an agent'}</span></button>
    </div>
  </aside>;
}
