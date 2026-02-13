import React from 'react';
import styles from './styles.module.css';

export default function GeneralInfoSection() {
    return (
        <div className={styles.generalInfoWrapper}>
            <div className={styles.twoColumn}>
                {/* Column 1 */}
                <div className={styles.column}>
                    <h2>Community meetings</h2>
                    <div className={styles.card}>
                        <p>
                            The PURL community has two recurring meetings where
                            we discuss PURL and VERS:
                        </p>

                        <ul>
                            <li>Community meetings biweekly on Wednesdays.</li>
                            <li>TC54/TG2 meetings biweekly on Fridays.</li>
                        </ul>

                        <p>
                            See Upcoming Meetings at{' '}
                            <a href='https://tc54.org/purl/' target='_blank'>
                                Package-URL | TC54
                            </a>{' '}
                            for details about the dates and times.
                        </p>
                    </div>
                </div>

                {/* Column 2 */}
                <div className={styles.column}>
                    <h2>Releases</h2>
                    <div className={styles.card}>
                        <h3>Release v1.0.0</h3>
                        <p>
                            The 1st edition of the PURL specification was
                            approved by the Ecma General Assembly on 2025-12-10
                            and has been designated{' '}
                            <a
                                className='a_page'
                                href='https://ecma-international.org/publications-and-standards/standards/ecma-427/'
                                target='_blank'
                            >
                                ECMA-427
                            </a>
                            .
                        </p>
                        <p>
                            The{' '}
                            <a
                                className='a_page'
                                href='https://github.com/package-url/purl-spec/releases/tag/v1.0.0'
                                target='_blank'
                            >
                                first release (v1.0.0)
                            </a>{' '}
                            of the purl-spec project followed on 2025-12-18.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
