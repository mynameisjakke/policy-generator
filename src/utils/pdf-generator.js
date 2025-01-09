const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { PDF_OPTIONS, RETRY_OPTIONS } = require('../config/constants');

class PDFGenerator {
  constructor() {
    this.browser = null;
    this.retryAttempts = RETRY_OPTIONS.attempts;
    this.retryDelay = RETRY_OPTIONS.delay;
  }

  async initialize() {
    try {
      if (this.browser) {
        await this.browser.close().catch(() => {});
      }

      // Launch with extended timeout and specific configuration
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ],
        ignoreHTTPSErrors: true,
        timeout: 60000 // Increase timeout to 60 seconds
      });

      // Quick browser health check
      const version = await this.browser.version();
      console.log('Browser version:', version);

      return true;
    } catch (error) {
      console.error('Browser initialization error:', error);
      if (this.browser) {
        await this.browser.close().catch(() => {});
        this.browser = null;
      }
      return false;
    }
  }

  async generatePDF(htmlContent, outputPath, options = {}) {
    // Input validation
    if (!htmlContent || typeof htmlContent !== 'string' || htmlContent.trim() === '') {
      throw new Error('Invalid HTML content provided');
    }
    
    if (!outputPath || typeof outputPath !== 'string') {
      throw new Error('Invalid output path provided');
    }

    let attempt = 0;
    let success = false;

    while (attempt < this.retryAttempts && !success) {
      let page = null;
      
      try {
        // Ensure browser is initialized
        if (!this.browser) {
          const initialized = await this.initialize();
          if (!initialized) {
            throw new Error('Failed to initialize browser');
          }
        }

        // Create and setup page with extended timeout
        page = await this.browser.newPage();
        await page.setDefaultNavigationTimeout(60000);
        
        // Set content and generate PDF
        await page.setContent(htmlContent, { 
          waitUntil: 'networkidle0',
          timeout: 60000 
        });
        
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        await page.pdf({
          ...PDF_OPTIONS,
          ...options,
          path: outputPath,
          timeout: 60000
        });

        success = true;
        console.log(`Successfully generated PDF: ${outputPath}`);

      } catch (error) {
        attempt++;
        console.warn(`Attempt ${attempt} failed:`, error.message);

        if (attempt === this.retryAttempts) {
          throw new Error(`Failed to generate PDF after ${this.retryAttempts} attempts: ${error.message}`);
        }

        // On error, close browser and wait before retrying
        await this.close();
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));

      } finally {
        if (page) {
          await page.close().catch(() => {});
        }
      }
    }
  }

  async close() {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (error) {
        console.warn('Error closing browser:', error);
      } finally {
        this.browser = null;
      }
    }
  }
}

module.exports = new PDFGenerator();