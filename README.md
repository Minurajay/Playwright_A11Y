# Playwright_A11y

## Overview
This project automates an end-to-end user flow while conducting accessibility checks at various stages using [Playwright](https://playwright.dev/). The test suite ensures that key functionalities, from login to order placement, work as expected while maintaining accessibility standards.



## Features
- **Automated End-to-End Flow**: Covers login, product search, cart operations, checkout, and order confirmation.
- **Accessibility Checks**: Uses `checkAccessibility()` at multiple stages to ensure WCAG compliance.
- **Parameterized Tests**: Runs tests for multiple user scenarios using `testData.json`.
- **Modular Page Objects**: Uses structured page object models for better maintainability.

## Setup & Installation
### Prerequisites
- Node.js installed
- Playwright installed

### Install Dependencies
```sh
npm install
```

### Run Tests
```sh
npx playwright test
```

### Generate Accessibility Reports
```sh
npx playwright test --reporter=html
```

## Conclusion
This project ensures that both functionality and accessibility standards are maintained in an automated testing workflow using Playwright. By incorporating accessibility checks throughout the flow, it enhances usability and compliance with accessibility guidelines.

