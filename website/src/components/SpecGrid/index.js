import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import specs from '@site/src/data/specifications.json';
import field_help from '@site/src/data/field_help.json';

export default function SpecGrid() {
    const [selectedSpec, setSelectedSpec] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const openModal = (spec) => {
        setSelectedSpec(spec); // sets modal content
    };

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

    // Works with FieldLabelHelpCard.
    function HoverTooltipCard({ children, tooltip }) {
        const [showTooltip, setShowTooltip] = React.useState(false);

        return (
            <span
                // className={styles.projectDescriptionWrapper}
                className={styles.specDescriptionWrapper}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {children}
                {showTooltip && (
                    <div className={styles.field_tooltip}>
                        {tooltip}
                    </div>
                )}
            </span>
        );
    }


    // This version uses the field name itself -- no icon -- to trigger the tootip.
    function FieldLabelHelpCard({ label, help }) {
        if (!help) {
            return <strong>{label}:</strong>;
        }

        return (
            <span className={styles.fieldLabelWrapper}>
                <HoverTooltipCard tooltip={help}>
                    <strong className={styles.fieldLabelWithHelp}>
                        {label}
                    </strong>
                </HoverTooltipCard>

                <span className={styles.fieldColon}>:&nbsp;</span>
            </span>
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
                                        {spec.homepage_url ? (
                                            <a
                                                href={spec.homepage_url}
                                                target={
                                                    spec.homepage_url.startsWith(
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
                                    {isUsableValue(spec.license) && (
                                        <li>
                                            <FieldLabelHelpCard
                                                label="License"
                                                help={field_help.license}
                                            />
                                            {spec.license}
                                        </li>
                                    )}
                                    {isUsableValue(spec.standards) && (
                                        <li>
                                            <FieldLabelHelpCard
                                                label="Standards"
                                                help={field_help.standards}
                                            />
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
                                                selectedSpec.publisher,
                                            ) && (
                                                    <li>
                                                        <FieldLabelHelpCard
                                                            label="Publisher"
                                                            help={field_help.publisher}
                                                        />
                                                        {selectedSpec.publisher}
                                                    </li>
                                                )}

                                            {isUsableValue(
                                                selectedSpec.license,
                                            ) && (
                                                    <li>
                                                        <FieldLabelHelpCard
                                                            label="License"
                                                            help={field_help.license}
                                                        />
                                                        {selectedSpec.license}
                                                    </li>
                                                )}


                                            {isUsableValue(
                                                selectedSpec.standards,
                                            ) && (
                                                    <li>
                                                        <FieldLabelHelpCard
                                                            label="Standards"
                                                            help={field_help.standards}
                                                        />
                                                        {selectedSpec.standards}
                                                    </li>
                                                )}
                                        </ul>
                                    </div>

                                    <div className={styles.column}>
                                        <ul className={styles.featureList}>

                                            {isUsableValue(
                                                selectedSpec.homepage_url,
                                            ) && (
                                                    <li>
                                                        <FieldLabelHelpCard
                                                            label="Home URL"
                                                            help={field_help.homepage_url}
                                                        />
                                                        <a
                                                            href={
                                                                selectedSpec.homepage_url
                                                            }
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            className={
                                                                styles.modalLinkUrl
                                                            }
                                                        >
                                                            {selectedSpec.homepage_url}
                                                        </a>
                                                    </li>
                                                )}

                                            {isUsableValue(
                                                selectedSpec.repository_url,
                                            ) && (
                                                    <li>
                                                        <FieldLabelHelpCard
                                                            label="Repository URL"
                                                            help={field_help.repository_url}
                                                        />
                                                        <a
                                                            href={
                                                                selectedSpec.repository_url
                                                            }
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            className={
                                                                styles.modalLinkUrl
                                                            }
                                                        >
                                                            {selectedSpec.repository_url}
                                                        </a>
                                                    </li>
                                                )}

                                            {isUsableValue(
                                                selectedSpec.documentation_url,
                                            ) && (
                                                    <li>
                                                        <FieldLabelHelpCard
                                                            label="Documentation URL"
                                                            help={field_help.documentation_url}
                                                        />
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
                                                        <FieldLabelHelpCard
                                                            label="Notes"
                                                            help={field_help.notes}
                                                        />
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
