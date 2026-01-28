import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools.json';

export default function ToolGrid() {
    // No longer used?
    // const [message, setMessage] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    // Monitor open modal -- state prevents display of main-page alert
    // No longer used?
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (tool) => {
        setSelectedTool(tool); // sets modal content
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
            <div className={styles.toolDescriptionWrapper}>
                <div
                    ref={descRef}
                    className={`${styles.toolDescription} ${styles.multiline}`}
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
                setSelectedTool(null);
                setActiveTab('overview');
            }
        }
        if (selectedTool) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedTool]);

    const closeModal = () => {
        setSelectedTool(null);
        setActiveTab('overview');
    };

    // Handle empty text values, e.g., "Not applicable", "n/a"
    const isUsableValue = (value) =>
        value &&
        value !== 'Not applicable' &&
        value !== 'Not available' &&
        value !== 'n/a';

    return (
        <div className={styles.toolGridWrapper}>
            <div className={styles.toolGridContainer}>
                <div className={styles.toolGrid}>
                    {tools.map((tool, idx) => (
                        <div
                            key={idx}
                            className={styles.toolCard}
                            onClick={() => openModal(tool)}
                        >
                            <div className={styles.toolCardTopBlock}>
                                <div className={styles.topRow}>
                                    <h4 className={styles.toolName}>
                                        {tool.homepage ? (
                                            <a
                                                href={tool.homepage}
                                                target={
                                                    tool.homepage.startsWith(
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
                                                {tool.name}
                                            </a>
                                        ) : (
                                            tool.name
                                        )}
                                    </h4>

                                    {isUsableValue(tool.logo) && (
                                        <div className={styles.logoWrapper}>
                                            <img
                                                src={tool.logo}
                                                alt={`${tool.name} logo`}
                                                className={styles.logoImg}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.toolCardMidBlock}>
                                {isUsableValue(tool.description) && (
                                    <div
                                        className={
                                            styles.toolDescriptionWrapper
                                        }
                                    >
                                        <DescriptionWithTooltip
                                            text={tool.description}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className={styles.toolCardMidBlock}>
                                <ul className={styles.toolMeta}>
                                    {isUsableValue(tool.language) && (
                                        <li>
                                            <strong>Base language:</strong>{' '}
                                            {tool.language}
                                        </li>
                                    )}
                                    {isUsableValue(tool.software_license) && (
                                        <li>
                                            <strong>Software License:</strong>{' '}
                                            {tool.software_license}
                                        </li>
                                    )}
                                    {isUsableValue(tool.standards) && (
                                        <li>
                                            <strong>Standards:</strong>{' '}
                                            {tool.standards}
                                        </li>
                                    )}
                                </ul>
                            </div>

                        </div>
                    ))}
                </div>
                {/* ^ end of toolGrid */}
            </div>
            {/* ^ end of toolGridContainer */}

            {/* Popup message */}
            {/* Don't display this message if the modal is open. */}
            {/* No longer used? */}
            {/* {!isModalOpen && message && (
                <div className={styles.modalAlertOverlay_main}>{message}</div>
            )} */}

            {/* Modal */}
            {selectedTool && (
                <div className={styles.modalBackdrop} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalBody}>
                            <>
                                {/* Full width section */}
                                <div className={styles.fullWidthSection}>
                                    <h2>{selectedTool.name}</h2>
                                    {isUsableValue(
                                        selectedTool.description,
                                    ) && <p>{selectedTool.description}</p>}
                                </div>

                                {/* Two column section */}
                                <div className={styles.twoColumnSection}>
                                    <div className={styles.column}>
                                        <ul className={styles.featureList}>
                                            {isUsableValue(
                                                selectedTool.language,
                                            ) && (
                                                <li>
                                                    <strong>Base Language:</strong>{' '}
                                                    {selectedTool.language}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.software_license,
                                            ) && (
                                                <li>
                                                    <strong>Software License:</strong>{' '}
                                                    {selectedTool.software_license}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.data_license,
                                            ) && (
                                                <li>
                                                    <strong>Data License:</strong>{' '}
                                                    {selectedTool.data_license}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.service_license,
                                            ) && (
                                                <li>
                                                    <strong>Service License:</strong>{' '}
                                                    {selectedTool.service_license}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.functions,
                                            ) && (
                                                <li>
                                                    <strong>Functions:</strong>{' '}
                                                    {selectedTool.functions}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.type,
                                            ) && (
                                                <li>
                                                    <strong>Type:</strong>{' '}
                                                    {selectedTool.type}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.standards,
                                            ) && (
                                                <li>
                                                    <strong>Standards:</strong>{' '}
                                                    {selectedTool.standards}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.platform,
                                            ) && (
                                                <li>
                                                    <strong>Platform:</strong>{' '}
                                                    {selectedTool.platform}
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className={styles.column}>
                                        <ul className={styles.featureList}>
                                            {isUsableValue(
                                                selectedTool.publisher,
                                            ) && (
                                                <li>
                                                    <strong>Publisher:</strong>{' '}
                                                    {selectedTool.publisher}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.homepage,
                                            ) && (
                                                <li>
                                                    <strong>Home URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedTool.homepage
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedTool.homepage}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.source_download,
                                            ) && (
                                                <li>
                                                    <strong>Source Download URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedTool.source_download
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedTool.source_download}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.package_download,
                                            ) && (
                                                <li>
                                                    <strong>Package Download URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedTool.package_download
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedTool.package_download}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.documentation_url,
                                            ) && (
                                                <li>
                                                    <strong>Documentation URL:</strong>{' '}
                                                    <a
                                                        href={
                                                            selectedTool.documentation_url
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedTool.documentation_url}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.notes,
                                            ) && (
                                                <li>
                                                    <strong>Notes:</strong>{' '}
                                                    {selectedTool.notes}
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
