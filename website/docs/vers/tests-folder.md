---
id: tests-folder
title: Tests
sidebar_label: Tests
hide_table_of_contents: true
---

# Tests

The VERS (Version Range Specifier) specification includes a comprehensive test
suite to support implementation of VERS. The test suite is organized in 3
dimensions:
- **Test level**: Specification-level tests or tests that are for a specific
  registered VERS **type**.
- **Test group**: Tests in the 'required' **test group** are to demonstrate
  conformance with the VERS standard (which is planned for submission as a new
  Ecma standard for December 2026). The 'recommended' **test group** is for
  test cases that illustrate how to normalize VERS input data to canonical
  form.
- **Test type**: tests for various VERS use cases:
  - 'build: A test case to build a canonical VERS string from decoded
    components.
  - 'comparison': A test case to sort an input version string array using the
    applicable VERS **type** rules.
  - 'containment': A test case to determine if a bare version string is
     contained within the range of a VERS string.
  - 'equality': A test case to check if two input version strings are equal
     using the applicable VERS **type** rules.
  - 'from_native': A test case to construct a canonical VERS string from a
     native ecosystem data source.
  - 'invert': A test case to invert a VERS string into a canonical VERS
    string.
  - 'merge': A test case to merge an array of VERS strings into a canonical
    VERS string.
  - 'parse': A test case to parse a VERS string into a decoded VERS **type**
    and a **constraints** list.
  - 'validate': A test case to validate that an input VERS is in canonical
    form.

See the following for more detailed information:
- **Test overview**: explains VERS test conformance and terminology
- **Test suite**: explains the structure of the test suite, test files, and
  test cases with details about test case properties
- **Test schema changes**: explains the differences between v0.2 and v0.1 of
  the VERS test schema

