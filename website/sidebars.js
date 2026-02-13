/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    purl: [
        'purl/purl-spec-introduction',
        {
            type: 'category',
            label: 'Specification',
            link: {
                type: 'doc',
                id: 'purl/purl-spec-folder-page', // The doc to display
            },
            collapsed: false,
            items: [
                'purl/specification',
                'purl/common-qualifiers',
                'purl/how-to-build',
                'purl/how-to-parse',
                'purl/tests',
            ],
        },
        'purl/purl-spec-purl-types',
        'purl/purl-spec-schemas',
        'purl/purl-spec-adopters',
    ],
    vers_spec: [
        'vers-spec/vers-spec-introduction',
        'vers-spec/vers-spec-specification',
        'vers-spec/vers-spec-schemas',
        'vers-spec/vers-spec-adopters',
    ],
    participate: [
        'participate/participate-contribute',
        'participate/participate-meetings',
        'participate/participate-events',
    ],
};

export default sidebars;
