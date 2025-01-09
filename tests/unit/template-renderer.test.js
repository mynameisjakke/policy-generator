const templateRenderer = require('../../src/utils/template-renderer');

describe('TemplateRenderer', () => {
  test('should render template with correct data', async () => {
    const testData = {
      company_name: 'Test Company',
      domain: 'test.com'
    };
    
    const result = await templateRenderer.renderTemplate('cookie-policy', testData);
    expect(result).toContain('Test Company');
    expect(result).toContain('test.com');
  });
});

// tests/integration/pdf-generation.test.js
const path = require('path');
const fs = require('fs').promises;
const pdfGenerator = require('../../src/utils/pdf-generator');

describe('PDF Generation', () => {
  test('should generate PDF file', async () => {
    const testOutputPath = path.join(__dirname, 'test.pdf');
    const htmlContent = '<h1>Test Content</h1>';
    
    await pdfGenerator.initialize();
    await pdfGenerator.generatePDF(htmlContent, testOutputPath);
    
    const fileExists = await fs.access(testOutputPath)
      .then(() => true)
      .catch(() => false);
    
    expect(fileExists).toBe(true);
    
    await pdfGenerator.close();
    await fs.unlink(testOutputPath);
  });
});