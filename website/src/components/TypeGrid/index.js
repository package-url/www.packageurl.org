import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

import getTypes from '@site/src/data/getTypes';

export default function TypeGrid() {
    // Get baseUrl from Docusaurus context
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;
    const types = getTypes(baseUrl);

    // Handle missing logos
    const isUsableValue = (value) =>
        value &&
        value !== 'Not applicable' &&
        value !== 'Not available' &&
        value !== 'n/a';

    return (
        <div>
            <div className={styles.purlGridWrapper}>
                <div className={styles.purlGridContainer}>
                    <div className={styles.purlGrid}>
                        {types.map((pkg, idx) => (
                            <a
                                key={idx}
                                href={pkg.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={styles.packageCell}
                            >
                                <div className={styles.logoSlot}>
                                    {isUsableValue(pkg.logo) && (
                                        <img
                                            src={pkg.logo}
                                            alt={pkg.name}
                                            className={`${styles.packageLogo} ${
                                                styles[pkg.name]
                                            }`}
                                        />
                                    )}
                                </div>

                                <span className={styles.packageName}>
                                    {pkg.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
