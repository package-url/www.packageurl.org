---
name: Add a Specification
about: Add a specification that supports PURL or VERS.
title: 'Add a Specification: '
labels: specification
assignees: ''

---

This is an issue template for the data we need to add a Specification that supports the PURL or VERS specification (or both) to the Package-URL website Homepage at [PURL-Adoption-Specifications](https://www.packageurl.org/#:~:text=PURL%20Adoption%20%2D%20Specifications). Each Specification has a card displayed in the grid on the Homepage and a modal window displaying all fields with data (empty fields will not be displayed). Please provide the data that are relevant for the tool that you want to add.

## Fields displayed on the Homepage card

Name:
*The name (and abbreviation if used) for the specification.*

Homepage URL: 
*This will usually be the URL for the specification. We will add a link to this URL to the Name displayed on the card.*

Description: 
*Short description of the specification.*

License: 
*SPDX License Identifier or License Expression. See [ScanCode LicenseDB](https://scancode-licensedb.aboutcode.org/) for a list of 2500 SPDX-compliant License Identifiers.*

Standards: 
*Current values are: 'PURL v1.0' or 'VERS'. Separate with a comma if your tool supports both.*

## Other fields

Publisher: 
*The name of the organization that publishes and maintains the specification.*

Repository URL: 
*URL for the specification repository if different from the Homepage URL.*

Documentation URL: 
*URL for documentation if different from your Homepage URL.*

Notes: 
*Additional information about your tool - as needed.*

Logo: 
*URL to a logo or icon that you want displayed on the card. This will not be displayed as a field in the modal window.*

## FYI
The data you provide will be added to the file: https://github.com/package-url/www.packageurl.org/blob/main/website/src/data/specifications.json.
