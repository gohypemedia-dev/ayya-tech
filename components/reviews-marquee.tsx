'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews } from './client-reviews-section';
import styles from './reviews-marquee.module.css';

const initials = (name: string) => name.split(' ').map(word => word[0]).slice(0, 2).join('');
const positions = [[10, 18], [25, 60], [47, 28], [67, 65], [83, 20], [88, 66]];

function Portrait({ review }: { review: (typeof reviews)[number] }) {
  const [failed, setFailed] = useState(false);
  return failed ? initials(review.name) : <Image src={review.avatar} alt="" width={56} height={56} unoptimized className={styles.portrait} onError={() => setFailed(true)} />;
}

function TypedQuote({ text }: { text: string }) {
  const [length, setLength] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setLength(count);
      if (count >= text.length) window.clearInterval(timer);
    }, 22);
    return () => window.clearInterval(timer);
  }, [text, reducedMotion]);
  return <p className={styles.typedQuote}><span className={styles.quoteSizer}>{text}</span><span className={styles.typedText} aria-hidden="true">{reducedMotion ? text : text.slice(0, length)}{!reducedMotion && length < text.length && <span className={styles.cursor}>|</span>}</span></p>;
}

function Stars({ rating }: { rating: number }) {
  return <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>{Array.from({ length: rating }, (_, index) => <Star key={index} size={14} fill="currentColor" aria-hidden="true" />)}</div>;
}

export function ReviewsMarquee() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="reviews" className={styles.section} aria-labelledby="reviews-heading">
      <header className={styles.header}>
        <span className={styles.badge}>Our partners</span>
        <h2 id="reviews-heading">Don&apos;t just take our<br /><em>word for it.</em></h2>
        <p>We could tell you a lot. Our clients say it better.</p>
      </header>
      <div className={styles.constellation} onKeyDown={event => { if (event.key === 'Escape') setOpen(null); }}>
        <svg className={styles.waves} viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => <path key={index} d={`M-100 ${20 + index * 35} Q 360 ${-30 + index * 30}, 720 ${20 + index * 35} T 1540 ${20 + index * 35}`} />)}
        </svg>
        {reviews.map((review, index) => (
          <div key={review.id} className={styles.floating} data-open={open === review.id} style={{ '--x': `${positions[index][0]}%`, '--y': `${positions[index][1]}%`, '--delay': `${index * -.8}s` } as CSSProperties} onMouseEnter={() => setOpen(review.id)} onMouseLeave={() => setOpen(null)}>
            <button className={styles.avatar} aria-label={`Read ${review.name}'s review`} aria-expanded={open === review.id} aria-controls={`bubble-${review.id}`} onClick={() => setOpen(open === review.id ? null : review.id)} onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setOpen(review.id); }} onBlur={() => setOpen(null)}><Portrait review={review} /></button>
            {open === review.id && <div id={`bubble-${review.id}`} className={styles.bubble} data-side={positions[index][0] > 60 ? 'right' : 'left'}><Stars rating={review.rating} /><TypedQuote text={review.content} /><strong>{review.name}</strong><span>{review.company}</span></div>}
          </div>
        ))}
      </div>
      <div className={styles.viewport} tabIndex={0} role="region" aria-label="Client reviews, scroll horizontally to explore">
        <div className={styles.track}>
          {[0, 1].map(copy => (
            <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
              {reviews.map(review => (
                <li className={styles.card} key={review.id}>
                  <Stars rating={review.rating} />
                  <blockquote>&ldquo;{review.content}&rdquo;</blockquote>
                  <div className={styles.person}><span className={styles.avatar} aria-hidden="true"><Portrait review={review} /></span><div><strong>{review.name}</strong><span>{review.role}</span><span>{review.company}</span></div></div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className={styles.footer}><div className={styles.avatarStack} aria-hidden="true">{reviews.slice(0, 4).map(review => <span className={styles.avatar} key={review.id}><Portrait review={review} /></span>)}</div><p>Software built together.<br /><strong>Partnerships that last.</strong></p></div>
    </section>
  );
}
