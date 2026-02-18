---
name: 'Add a Tool '
about: Add a tool that supports PURL or VERS
title: 'Add a Tool:'
labels: ''
assignees: ''

---

This is an issue template for the data we need to add a Software Tool that supports the PURL or VERS specification (or both) to the Package-URL website Homepage at [PURL-Adoption-Tools](https://www.packageurl.org/#:~:text=PURL%20v1.0-,Software%20Tools). Each Software Tool has a card displayed in the grid on the Homepage and a modal window displaying all fields with data (empty fields will not be displayed). Please provide the data that are relevant for the tool that you want to add.

## Fields displayed on the Homepage card

Name:
*The short name for your tool. If the name is 'purl' or 'vers' please append your repo name for uniqueness.*

Homepage URL: 
*This will usually be the URL for your code repository. We will add a link to this URL to the Name displayed on the card.*

Description: 
*Short description of what your tool does.*

Base Language: 
*The primary language(s) for the source code. Separate multiple languages with a comma.*

Software License: 
*SPDX License Identifier or License Expression. See [ScanCode LicenseDB](https://scancode-licensedb.aboutcode.org/) for a list of 2500 SPDX-compliant License Identifiers.*

Standards: 
*Current values are: 'PURL v1.0' or 'VERS'. Separate with a comma if your tool supports both.*

## Other fields

Publisher: 
*The name of the organization or person who publishes the tool.*

Source Download URL: 
*URL for downloading source releases if different from the Homepage URL.*

Package Download URL: 
*URL for downloading a software package for your tool at Maven, npm, PyPI or other package repository.*

Documentation URL: 
*URL for documentation if different from your Homepage URL.*

Data License: 
*SPDX License Identifier or License Expression if your tool provides data under a different license than the software.*

Service License: 
*SPDX License Identifier or License Expression if your tool provides a public API or other service under a different license than the software.*

Type: 
*Current values are: 'Application', 'CLI Utility', 'Library' or 'Service'*.

Platform: 
*Current values are:'Container', 'Linux', 'MacOS', 'Windows' or other. Separate multiple platforms with a comma.*

Notes: 
*Additional information about your tool - as needed.*

Icon: 
*URL to an icon that you want displayed on the card. This will not be displayed as a field in the modal window.*

## FYI
The data you provide will be added to the file: https://github.com/package-url/www.packageurl.org/blob/main/website/src/data/tools.json.
