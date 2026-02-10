import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools.json';
import tool_field_help from '@site/src/data/tool_field_help.json';

export default function ToolGrid() {
    const [selectedTool, setSelectedTool] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const openModal = (tool) => {
        setSelectedTool(tool); // sets modal content
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
            <div className={styles.toolDescriptionWrapper}>
                <div ref={descRef} className={`${styles.toolDescription}`}>
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
                className={styles.toolDescriptionWrapper}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {children}
                {showTooltip && (
                    <div className={styles.field_tooltip}>{tooltip}</div>
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
                            <div>
                                <div className={styles.topRow}>
                                    <h4 className={styles.toolName}>
                                        {tool.homepage_url ? (
                                            <a
                                                href={tool.homepage_url}
                                                target={
                                                    tool.homepage_url.startsWith(
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

                            <div>
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

                            <div>
                                <ul className={styles.toolMeta}>
                                    {isUsableValue(tool.language) && (
                                        <li>
                                            <FieldLabelHelpCard
                                                label='Base language'
                                                help={tool_field_help.language}
                                            />
                                            {tool.language}
                                        </li>
                                    )}
                                    {isUsableValue(tool.software_license) && (
                                        <li>
                                            <FieldLabelHelpCard
                                                label='Software License'
                                                help={
                                                    tool_field_help.software_license
                                                }
                                            />
                                            {tool.software_license}
                                        </li>
                                    )}
                                    {isUsableValue(tool.standards) && (
                                        <li>
                                            <FieldLabelHelpCard
                                                label='Standards'
                                                help={tool_field_help.standards}
                                            />
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
                                                    <FieldLabelHelpCard
                                                        label='Base Language'
                                                        help={
                                                            tool_field_help.language
                                                        }
                                                    />
                                                    {selectedTool.language}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.software_license,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Software License'
                                                        help={
                                                            tool_field_help.software_license
                                                        }
                                                    />
                                                    {
                                                        selectedTool.software_license
                                                    }
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.data_license,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Data License'
                                                        help={
                                                            tool_field_help.data_license
                                                        }
                                                    />
                                                    {selectedTool.data_license}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.service_license,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Service License'
                                                        help={
                                                            tool_field_help.service_license
                                                        }
                                                    />
                                                    {
                                                        selectedTool.service_license
                                                    }
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.functions,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Functions'
                                                        help={
                                                            tool_field_help.functions
                                                        }
                                                    />
                                                    {selectedTool.functions}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.type,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Type'
                                                        help={
                                                            tool_field_help.type
                                                        }
                                                    />
                                                    {selectedTool.type}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.standards,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Standards'
                                                        help={
                                                            tool_field_help.standards
                                                        }
                                                    />
                                                    {selectedTool.standards}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.platforms,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Platforms'
                                                        help={
                                                            tool_field_help.platforms
                                                        }
                                                    />
                                                    {selectedTool.platforms}
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
                                                    <FieldLabelHelpCard
                                                        label='Publisher'
                                                        help={
                                                            tool_field_help.publisher
                                                        }
                                                    />
                                                    {selectedTool.publisher}
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.homepage_url,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Homepage URL'
                                                        help={
                                                            tool_field_help.homepage_url
                                                        }
                                                    />
                                                    <a
                                                        href={
                                                            selectedTool.homepage_url
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedTool.homepage_url}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.repository_url,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Repository URL'
                                                        help={
                                                            tool_field_help.repository_url
                                                        }
                                                    />
                                                    <a
                                                        href={
                                                            selectedTool.repository_url
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {selectedTool.repository_url}
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.source_download,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Source Download URL'
                                                        help={
                                                            tool_field_help.source_download
                                                        }
                                                    />
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
                                                        {
                                                            selectedTool.source_download
                                                        }
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.package_download,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Package Download URL'
                                                        help={
                                                            tool_field_help.package_download
                                                        }
                                                    />
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
                                                        {
                                                            selectedTool.package_download
                                                        }
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.documentation_url,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Documentation URL'
                                                        help={
                                                            tool_field_help.documentation_url
                                                        }
                                                    />
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
                                                        {
                                                            selectedTool.documentation_url
                                                        }
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.service_url,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Service URL'
                                                        help={
                                                            tool_field_help.service_url
                                                        }
                                                    />
                                                    <a
                                                        href={
                                                            selectedTool.service_url
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={
                                                            styles.modalLinkUrl
                                                        }
                                                    >
                                                        {
                                                            selectedTool.service_url
                                                        }
                                                    </a>
                                                </li>
                                            )}

                                            {isUsableValue(
                                                selectedTool.notes,
                                            ) && (
                                                <li>
                                                    <FieldLabelHelpCard
                                                        label='Notes'
                                                        help={
                                                            tool_field_help.notes
                                                        }
                                                    />
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
                    </div>
                </div>
            )}
            {/* end of modal */}
        </div>
    );
}
