# www.packageurl.org

## Overview
This is the repository for the Package-URL public website. It is based on [Docusaurus](https://docusaurus.io/docs).
This website is currently in an Alpha phase with the primary focus on content over format.

We value contributions from members of the community.  You can always suggest a new feature or a change to some existing element of the website by opening an issue and, if you're ready, a PR.
- The normal process for suggesting changes is to create an issue to explain the change before creating a pull request.
- If you do submit a pull request (PR):
   - Do not use CoPilot or other AI tools to create the PR or its content. We do not accept AI-generated PRs and dealing with them takes away valuable time from our core work. The use
  of AI tools for research is fine, but a PR must be created and submitted by a person.
   - Do not include changes to the current project configuration - e.g., do not include an updated `package-lock.json` or `yarn.lock` with a PR.
   - Do not add new dependencies with your PR.
- It is OK to submit a PR without an issue to fix typos and other minor corrections. Please explain the changes in the PR.

The current "production" version of the website is at: https://www.packageurl.org/ .

The "staging" version of the website is at: https://package-url.github.io/www.packageurl.org/ .

## Simplified website structure
The website structure necessarily follows a Docusaurus template and configuration. There are two primary ways to update the website:
- Many elements of the website -- including the navbar, the footer, the sidebars, the home/anding page -- are complex to update.
   - For these website elements you should create an issue and the core team will create the PR or help you create one.
- Most of the primary website content is composed of markdown files which are much easier to update. For these pages you will see an "Edit this
page" link at the bottom of the text. You can use this link to go directly to the corresponding markdown file.
   - If the markdown page is part of the PURL or VERS specification the markdown file will be located in the corresponding
  specification repository - `package-url/purl-spec/docs` or `package-url/vers-spec/docs`
   - Otherwise the markdown page will be located at `package-url/www.packageurl.org/website/docs`
   - You can use the GitHub UI to create a new branch and PR or you can create a branch and PR locally in your preferred GitHub tools.

![www.packageurl.org navbar](./website/static/img/www-packageurl-org-navbar-2026-02-23.png)

Looking at the links in the website's navbar (defined in `../website/docusaurus.config.js`) ^:

- **www.packageurl.org logo**
    - **link**: website Home (landing page)

- **Home**
    - **link**: website landing page
    - **edit**: submit an issue
    - **structure**: website landing page is defined with a series of nested index.js, .css and other files, e.g.:
        - *primary index.js*: `../website/src/pages/index.js`
            - *HomepageHeader*: `../website/src/components/HomepageHeader/index.js`
            - *HomepageContent*: `../website/src/components/HomepageContent/index.js`
                - *HomeInfo*: `../website/src/components/HomepageContent/HomeInfo.mdx`
                - *GeneralInfo*: `../website/src/components/GeneralInfo`

- **PURL**
    - **link**: a group of .md pages organized around a sidebar nav
    - **edit**: each .md has an `Edit this page` link in the lower-left corner of the page
    - **structure**:
        - *Introduction*: `..website/docs/purl/introduction.md`
        - *Specification*: `..website/docs/purl/specification-folder.md`
            - *Core Specification*: `..website/docs/purl/specification.md`
            - *PURL qualifiers guidance*: `..website/docs/purl/common-qualifiers.md`
            - *How to build a PURL*: `..website/docs/purl/how-to-build.md`
            - *How to parse a PURL*: `..website/docs/purl/how-to-parse.md`
            - *PURL test overview*: `..website/docs/purl/tests.md`
        - *PURL Types*: `..website/docs/purl/purl-types.mdx`
        - *Schemas*: `..website/docs/purl/schemas.md`

- **VERS**
    - **link**: a group of .md pages organized around a sidebar nav
    - **edit**: each .md has an `Edit this page` link in the lower-left corner of the page
    - **structure**:
        - *Introduction*: `..website/docs/vers/introduction.md`
        - *Specification*: `..website/docs/vers/specification-folder.md`
            - *Core Specification*: `..website/docs/vers/specification.md`
            - *How to parse and validate VERS*: `..website/docs/vers/how-to-parse.md`
            - *VERS test overview*: `..website/docs/vers/tests.md`
        - *Version schemes*: `..website/docs/vers/version-schemes.md`
        - *Schemas*: `..website/docs/vers/schemas.md`
        - *FAQ*: `..website/docs/vers/faq.md`

- **Getting Started**
    - **link**: a group of .md pages organized around a sidebar nav
    - **edit**: each .md has an `Edit this page` link in the lower-left corner of the page
    - **structure**:
        - *Getting Started*: `..website/docs/getting-started/introduction.mdx`
            - *Tools*: `..website/docs/getting-started/toolgrid.mdx`
            - *Specifications*: `..website/docs/getting-started/specgrid.mdx`

- **Participate**
  - **link**: a group of .md pages organized around a sidebar nav
  - **edit**: each .md has an `Edit this page` link in the lower-left corner of the page
  - **structure**:
      - *Contribute*: `..website/docs/participate/contribute.md`
      - *Meetings*: `..website/docs/participate/meetings.md`
      - *Events*: `..website/docs/participate/events.md`

- **GitHub**
  - **link**: https://github.com/package-url/www.packageurl.org
  - **edit**: submit an issue
  - **structure**: a link in `../website/docusaurus.config.js`

- **Slack**
  - **link**: https://cyclonedx.slack.com/
  - **edit**: submit an issue
  - **structure**: a link in `../website/docusaurus.config.js`

- **light/dark toggle**
  - provided by default in `classic` theme
