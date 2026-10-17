'use client';

import { Star } from 'lucide-react';
import { reviews } from './client-reviews-section';
import styles from './reviews-marquee.module.css';

export function ReviewsMarquee() {
  return (
    <section id="reviews" className={styles.section} aria-labelledby="reviews-heading">
      <div className={styles.header}>
        <p>We could tell you a lot.<br />Our clients say it better.</p>
        <h2 id="reviews-heading">What our<br /><em>partners say</em></h2>
      </div>
      <div className={styles.viewport} tabIndex={0} role="region" aria-label="Client reviews, scroll horizontally to explore">
        <div className={styles.track}>
          {[0, 1].map(copy => (
            <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
              {reviews.map((review) => (
                <li className={styles.card} key={review.id}>
                  <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }, (_, index) => <Star key={index} size={14} fill="currentColor" aria-hidden="true" />)}
                  </div>
                  <blockquote>{review.content}</blockquote>
                  <div className={styles.person}>
                    <span className={styles.avatar} aria-hidden="true">{review.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span>
                    <div><strong>{review.name}</strong><span>{review.company}</span></div>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
