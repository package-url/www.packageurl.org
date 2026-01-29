import React from 'react';
import styles from './styles.module.css';

export default function GeneralInfoSection() {
    return (
        <div className={styles.generalInfoWrapper}>
            <div className={styles.twoColumn}>
                {/* Column 1 */}
                <div className={styles.column}>
                    <h2>Community call</h2>
                    <div className={styles.card}>
                        <p>
                            Join our next PURL community call on 2026-02-04.
                        </p>
                        <p>
                            The schedules for the PURL community and TC54-TG2
                            calls are available at{' '}
                            <a
                                className='a_page'
                                href='https://calendar.google.com/calendar/u/0/embed?src=c_884decde5a152902bb51a62f89550d0f3748484534f08c63792f2e654f2a7ebc@group.calendar.google.com'
                                target='_blank'
                            >
                                OWASP Software Supply Chain Community Calendar
                            </a>
                            .
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
                            </a>
                            {' '}of the purl-spec project followed on 2025-12-18.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
