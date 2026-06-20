import React from 'react';
import styles from './styles.module.css';

export default function HomepageHeader() {
  return (
    <div className={styles.fullHero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Package-URL (aka. PURL)
        </h1>
        <p className={styles.heroSubtitle}>
          A simple, consistent, and flexible approach for
          identifying software packages with precision and clarity.
        </p>
      </div>
    </div>
  );
}
