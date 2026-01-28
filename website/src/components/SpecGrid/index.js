import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import specs from '@site/src/data/specifications.json';

export default function SpecGrid() {
    // No longer used?
    // const [message, setMessage] = useState(null);
    const [selectedSpec, setSelectedSpec] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    // Monitor open modal -- state prevents display of main-page alert
    // No longer used?
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (spec) => {
        setSelectedSpec(spec); // sets modal content
    };
    // Use a separate state for the modal alert
    // No longer used?
    // const [modalMessage, setModalMessage] = useState(null);

    // Limit when the tooltip appears
    function DescriptionWithTooltip({ text }) {
        const descRef = React.useRef(null);
        const [showTooltip, setShowTooltip] = React.useState(false);

        React.useEffect(() => {
            const el = descRef.current;
            if (el) {
                // check if content is overflowing its container
                setShowTooltip(
                    el.scrollHeight > el.clientHeight ||
                        el.scrollWidth > el.clientWidth,
                );
            }
        }, [text]);

        return (
            <div className={styles.specDescriptionWrapper}>
                <div
                    ref={descRef}
                    className={`${styles.specDescription} ${styles.multiline}`}
                >
                    {text}
                </div>
                {showTooltip && <div className={styles.tooltip}>{text}</div>}
            </div>
        );
    }

    // Close modal on Escape key
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setSelectedSpec(null);
                setActiveTab('overview');
            }
        }
        if (selectedSpec) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedSpec]);

    const closeModal = () => {
        setSelectedSpec(null);
        setActiveTab('overview');
    };

    // Handle empty text values, e.g., "Not applicable", "n/a"
    const isUsableValue = (value) =>
        value &&
        value !== 'Not applicable' &&
        value !== 'Not available' &&
        value !== 'n/a';

    return (
        <div className={styles.specGridWrapper}>
            <div className={styles.specGridContainer}>
                <div className={styles.specGrid}>
                    {specs.map((spec, idx) => (
                        <div
                            key={idx}
                            className={styles.specCard}
                            onClick={() => openModal(spec)}
                        >
                            <div className={styles.specCardTopBlock}>
                                <div className={styles.topRow}>
                                    <h4 className={styles.specName}>
                                        {spec.homepage ? (
                                            <a
                                                href={spec.homepage}
                                                target={
                                                    spec.homepage.startsWith(
                                                        'http',
                                                    )
                                                        ? '_blank'
                                                        : '_self'
                                                }
                                                rel='noopener noreferrer'
                                                className={
                                                    styles.modalLinkUrl_break_word
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                {spec.name}
                                            </a>
                                        ) : (
                                            spec.name
                                        )}
                                    </h4>

                                    {isUsableValue(spec.logo) && (
                                        <div className={styles.logoWrapper}>
                                            <img
                                                src={spec.logo}
                                                alt={`${spec.name} logo`}
                                                className={styles.logoImg}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.specCardMidBlock}>
                                {isUsableValue(spec.description) && (
                                    <div
                                        className={
                                            styles.specDescriptionWrapper
                                        }
                                    >
                                        <DescriptionWithTooltip
                                            text={spec.description}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className={styles.specCardMidBlock}>
                                <ul className={styles.specMeta}>
                                    {isUsableValue(spec.language) && (
                                        <li>
                                            <strong>Base language:</strong>{' '}
                                            {spec.language}
                                        </li>
                                    )}
                                    {isUsableValue(spec.license) && (
                                        <li>
                                            <strong>License:</strong>{' '}
                                            {spec.license}
                                        </li>
                                    )}
                                    {isUsableValue(spec.standards) && (
                                        <li>
                                            <strong>Standards:</strong>{' '}
                                            {spec.standards}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                {/* ^ end of specGrid */}
            </div>
            {/* ^ end of specGridContainer */}

            {/* Popup message */}
            {/* Don't display this message if the modal is open. */}
            {/* No longer used? */}
            {/* {!isModalOpen && message && (
                <div className={styles.modalAlertOverlay_main}>{message}</div>
            )} */}

            {/* Modal */}
            {selectedSpec && (
                <div className={styles.modalBackdrop} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalBody}>
                            <>
                                {/* Full width section */}
                                <div className={styles.fullWidthSection}>
                                    <h2>{selectedSpec.name}</h2>
                                    {isUsableValue(
                                        selectedSpec.description,
                                    ) && <p>{selectedSpec.description}</p>}
                                </div>

                                {/* Two column section */}
                                <div className={styles.twoColumnSection}>
                                    <div className={styles.column}>
                                        <ul className={styles.featureList}>
                                            {isUsableValue(
                                                selectedSpec.language,
                                            ) && (
                                                <li>
                                                    <strong>
                                                        Base Language:
                                                    </strong>{' '}
                                                    {selectedSpec.language}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.license,
                                            ) && (
                                                <li>
                                                    <strong>License:</strong>{' '}
                                                    {selectedSpec.license}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.functions,
                                            ) && (
                                                <li>
                                                    <strong>Functions:</strong>{' '}
                                                    {selectedSpec.functions}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.type,
                                            ) && (
                                                <li>
                                                    <strong>Type:</strong>{' '}
                                                    {selectedSpec.type}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.standards,
                                            ) && (
                                                <li>
                                                    <strong>Standards:</strong>{' '}
                                                    {selectedSpec.standards}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.platform,
                                            ) && (
                                                <li>
                                                    <strong>Platform:</strong>{' '}
                                                    {selectedSpec.platform}
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className={styles.column}>
                                        <ul className={styles.featureList}>
                                            {isUsableValue(
                                                selectedSpec.publisher,
                                            ) && (
                                                <li>
                                                    <strong>Publisher:</strong>{' '}
                                                    {selectedSpec.publisher}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.homepage,
                                            ) && (
                                                <li>
                                                    <strong>Home URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedSpec.homepage
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedSpec.homepage}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.source_download,
                                            ) && (
                                                <li>
                                                    <strong>Source Download URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedSpec.source_download
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedSpec.source_download}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.package_download,
                                            ) && (
                                                <li>
                                                    <strong>Package Download URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedSpec.package_download
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedSpec.package_download}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.documentation_url,
                                            ) && (
                                                <li>
                                                    <strong>Documentation URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedSpec.documentation_url
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedSpec.documentation_url}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedSpec.notes,
                                            ) && (
                                                <li>
                                                    <strong>Notes:</strong>{' '}
                                                    {selectedSpec.notes}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        </div>

                        {/* Close button */}
                        <div className={styles.modalFooter}>
                            <button
                                className={styles.closeButton}
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                        {/* Display alert inside open modal. */}
                        {/* No longer used? */}
                        {/* {modalMessage && (
                            <div className={styles.modalAlertOverlay}>
                                {modalMessage}
                            </div>
                        )} */}
                    </div>
                </div>
            )}
            {/* end of modal */}
        </div>
    );
}
