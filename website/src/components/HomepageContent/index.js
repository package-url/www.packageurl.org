import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeInfo from './HomeInfo.mdx';
import GeneralInfo from '@site/src/components/GeneralInfo';
import styles from './styles.module.css';

export default function HomepageContent() {
    // Get baseUrl from Docusaurus context
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;

    return (
        <main>
            <section className={styles.sectionContainer}>
                <div className={styles.sectionIntro}>
                    <HomeInfo />
                </div>
            </section>

            <section className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h1>General Information</h1>
                </div>
                <GeneralInfo />
            </section>
        </main>
    );
}
