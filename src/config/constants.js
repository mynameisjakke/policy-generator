const path = require('path');

module.exports = {
  OUTPUT_DIR: path.resolve(__dirname, '../../dist/generated'),
  TEMPLATES: {
    COOKIE_POLICY: 'cookie-policy',
    PRIVACY_POLICY: 'privacy-policy',
  },
  PDF_OPTIONS: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm',
    },
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  },
  RETRY_OPTIONS: {
    attempts: 3,
    delay: 1000, // milliseconds
  },
};
