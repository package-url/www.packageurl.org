import { themes as prismThemes } from 'prism-react-renderer';

const getDeploymentTimestamp = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // 2025-09-13
    const time = now.toISOString().split('T')[1].split('.')[0]; // 23:45:32
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    return `${date} ${time} UTC`;
};

// Deployment target: local | gh | dreamhost
/** @type {'local' | 'gh' | 'dreamhost'} */
let deployTarget = 'local';

if (process.env.DEPLOY_TARGET === 'gh') {
    deployTarget = 'gh';
} else if (process.env.DEPLOY_TARGET === 'dreamhost') {
    deployTarget = 'dreamhost';
}

const siteConfig = {
    local: {
        url: 'http://localhost',
        baseUrl: '/',
    },
    gh: {
        url: 'https://package-url.github.io',
        baseUrl: '/www.packageurl.org/',
    },
    dreamhost: {
        url: 'https://www.packageurl.org',
        baseUrl: '/',
    },
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

    url: siteConfig[deployTarget].url,
    baseUrl: siteConfig[deployTarget].baseUrl,
    trailingSlash: false,

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
                            // "PURL" section
                            'purl/common-qualifiers.md': `https://github.com/package-url/purl-spec/blob/main/docs/common-qualifiers.md`,
                            'purl/how-to-build.md': `https://github.com/package-url/purl-spec/blob/main/docs/how-to-build.md`,
                            'purl/how-to-parse.md': `https://github.com/package-url/purl-spec/blob/main/docs/how-to-parse.md`,
                            'purl/introduction.md': `https://github.com/package-url/purl-spec/blob/main/docs/standard/introduction.md`,
                            'purl/purl-types.mdx': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'purl/schemas.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'purl/specification-folder.mdx': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'purl/specification.md': `https://github.com/package-url/purl-spec/blob/main/docs/standard/specification.md`,
                            'purl/tests.md': `https://github.com/package-url/purl-spec/blob/main/docs/tests.md`,

                            // "VERS" section
                            'vers/faq.md': `https://github.com/package-url/vers-spec/blob/main/docs/faq.md`,
                            'vers/how-to-parse.md': `https://github.com/package-url/vers-spec/blob/main/docs/faq.md`,
                            'vers/introduction.md': `https://github.com/package-url/vers-spec/blob/main/docs/standard/introduction.md`,
                            'vers/schemas.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'vers/specification-folder.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'vers/specification.md': `https://github.com/package-url/vers-spec/blob/main/docs/standard/specification.md`,
                            'vers/tests.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'vers/version-schemes.md': `https://github.com/package-url/vers-spec/blob/main/docs/version-schemes.md`,

                            // "Particpate"
                            'participate/contribute.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'participate/events.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'participate/meetings.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,

                            // "Getting Started"
                            'getting-started/introduction.md': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'getting-started/specgrid.mdx': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
                            'getting-started/toolgrid.mdx': `https://github.com/package-url/www.packageurl.org/blob/main/website/docs/${docPath}`,
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
                        label: 'PURL',
                        to: '/docs/purl/introduction',
                        position: 'left',
                        activeBaseRegex: `^${siteConfig[deployTarget].baseUrl}docs/purl/`,
                        items: [
                            {
                                to: '/docs/purl/introduction',
                                label: 'Introduction',
                            },
                            {
                                to: '/docs/purl/specification-folder',
                                label: 'Specification',
                            },
                            {
                                to: '/docs/purl/purl-types',
                                label: 'PURL Types',
                            },
                            {
                                to: '/docs/purl/schemas',
                                label: 'Schemas',
                            },
                        ],
                    },
                    {
                        label: 'VERS',
                        to: '/docs/vers/introduction',
                        position: 'left',
                        activeBaseRegex: `^${siteConfig[deployTarget].baseUrl}docs/vers/`,
                        items: [
                            {
                                to: '/docs/vers/introduction',
                                label: 'Introduction',
                            },
                            {
                                to: '/docs/vers/specification-folder',
                                label: 'Specification',
                            },
                            {
                                to: '/docs/vers/schemas',
                                label: 'Schemas',
                            },
                            {
                                to: '/docs/vers/faq',
                                label: 'FAQ',
                            },
                        ],
                    },
                    {
                        label: 'Getting Started',
                        to: '/docs/getting-started/introduction',
                        position: 'left',
                        activeBaseRegex: `^${siteConfig[deployTarget].baseUrl}docs/getting-started/`,
                        items: [
                            {
                                to: '/docs/getting-started/introduction',
                                label: 'Getting Started',
                            },
                            {
                                to: '/docs/getting-started/toolgrid',
                                label: 'Tools',
                            },
                            {
                                to: '/docs/getting-started/specgrid',
                                label: 'Specifications',
                            },
                        ],
                    },
                    {
                        label: 'Participate',
                        to: '/docs/participate/contribute',
                        position: 'left',
                        activeBaseRegex: `^${siteConfig[deployTarget].baseUrl}docs/participate/`,
                        items: [
                            {
                                to: '/docs/participate/contribute',
                                label: 'Contribute',
                            },
                            {
                                to: '/docs/participate/meetings',
                                label: 'Meetings',
                            },
                            {
                                to: '/docs/participate/events',
                                label: 'Events',
                            },
                        ],
                    },

                    {
                        href: 'https://github.com/package-url/www.packageurl.org',
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
