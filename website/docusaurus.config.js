import { themes as prismThemes } from 'prism-react-renderer';

// Add flexibility to config and run with different baseUrl values for GH Pages vs. DreamHost.
const isProd = process.env.NODE_ENV === 'production';
// Use BASE_URL environment variable if set; fallback to "/" for dev
const baseUrl = process.env.BASE_URL || '/';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const getDeploymentTimestamp = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // 2025-09-13
    const time = now.toISOString().split('T')[1].split('.')[0]; // 23:45:32
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    return `${date} ${time} UTC`;
};

const config = {
    title: 'www.packageurl.org',
    tagline:
        'A simple, consistent, and flexible approach for identifying software packages with precision and clarity.',
    favicon: 'img/favicon.ico',

    markdown: {
        format: 'detect', // Auto-detects: .md = plain Markdown (CommonMark), .mdx = MDX
    },

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url
    url: 'https://package-url.github.io/',

    // The /<baseUrl>/ pathname under which the site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/www.packageurl.org/',
    // For DreamHost deployment:
    // NOTE: Also required to locally display .html files in the /schemas folder!
    // baseUrl: "/",

    // TODO: Determine whether still needed to address file-not-found when linking to json-schema-for-humans .html files.
    staticDirectories: ['static'], // Ensure static folder is included

    // GitHub pages deployment config.
    organizationName: 'Package-URL',
    projectName: 'www.packageurl.org',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    path: 'docs',
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: ({ docPath }) => {
                        // Explicit mapping of Docusaurus path → actual GitHub source
                        const editUrlMap = {
                            // New "PURL" section
                            'purl/how-to-build.md': `https://github.com/package-url/purl-spec/blob/main/docs/how-to-build.md`,
                            'purl/how-to-parse.md': `https://github.com/package-url/purl-spec/blob/main/docs/how-to-parse.md`,
                            'purl/purl-spec-adopters.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'purl/purl-spec-folder-page.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'purl/purl-spec-introduction.md': `https://github.com/package-url/purl-spec/blob/main/docs/standard/introduction.md`,
                            'purl/purl-spec-purl-types.mdx': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'purl/purl-spec-schemas.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'purl/specification.md': `https://github.com/package-url/purl-spec/blob/main/docs/standard/specification.md`,
                            'purl/tests.md': `https://github.com/package-url/purl-spec/blob/main/docs/tests.md`,

                            // "VERS" section
                            'vers-spec/vers-spec-overview.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'vers-spec/vers-spec-documentation.md': `https://github.com/package-url/vers-spec/blob/main/VERSION-RANGE-SPEC.md`,
                            'vers-spec/vers-spec-schemas.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'vers-spec/vers-spec-adopters.md': `https://github.com/package-url/vers-spec/blob/main/ADOPTERS.md`,

                            // Rename About back to Particpate
                            'participate/participate-contribute.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'participate/participate-meetings.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'participate/participate-events.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                        };

                        // Return the mapped URL if it exists
                        if (editUrlMap[docPath]) {
                            return editUrlMap[docPath];
                        }

                        // For files that live in www.packageurl.org repo (about/, participate/, etc.)
                        // return `https://github.com/package-url/www.packageurl.org/edit/main/docs/${docPath}`;

                        // Otherwise, provide a default (so “Edit this page” still works)
                        return `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`;
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            // image: "img/docusaurus-social-card.jpg",
            navbar: {
                logo: {
                    alt: 'PURL Logo',
                    src: 'img/logo.png',
                },
                style: 'dark',
                items: [
                    { to: '/', label: 'Home', position: 'left', exact: true },

                    {
                        type: 'docSidebar',
                        sidebarId: 'purl',
                        position: 'left',
                        label: 'PURL',
                    },

                    {
                        type: 'docSidebar',
                        sidebarId: 'vers_spec',
                        position: 'left',
                        label: 'VERS',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'participate',
                        position: 'left',
                        label: 'Participate',
                    },
                    {
                        href: 'https://github.com/package-url',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        href: 'https://cyclonedx.slack.com/archives/C06KTE3BWEB',
                        label: 'Slack',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © The Package-URL authors &nbsp; | &nbsp; License: MIT &nbsp; | &nbsp; Built with Docusaurus <br />Last deployed: ${getDeploymentTimestamp()}`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
