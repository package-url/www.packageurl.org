import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./styles.module.css";

// 2025-10-15 Wednesday 17:28:05.  The new .js data file
// import getPackages from "@site/src/data/getPackages";
import getTypes from "@site/src/data/getTypes";

// export default function HomepageContent() {
export default function TypeGrid() {
    // Get baseUrl from Docusaurus context
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;
    const types = getTypes(baseUrl);

    return (
        <div>
            <div className={styles.purlGridWrapper}>
                <div className={styles.purlGridContainer}>
                    <div className={styles.purlGrid}>
                        {types.map((pkg, idx) => (
                            <a
                                key={idx}
                                href={pkg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.packageCell}
                            >
                                <img
                                    src={pkg.logo}
                                    alt={pkg.name}
                                    className={`${styles.packageLogo} ${
                                        styles[pkg.name]
                                    }`}
                                />

                                <span>{pkg.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
