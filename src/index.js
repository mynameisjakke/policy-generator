const path = require('path');
const pdfGenerator = require('./utils/pdf-generator');
const templateRenderer = require('./utils/template-renderer');
const fileHandler = require('./utils/file-handler');
const { OUTPUT_DIR } = require('./config/constants');

async function validateClientData(client) {
  const requiredFields = ['domain', 'company_name', 'org_number', 'contact_email'];
  const missingFields = requiredFields.filter(field => !client[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `Missing required fields for client ${client.company_name || 'Unknown'}: ${missingFields.join(', ')}`
    );
  }
}

async function generatePolicies() {
  console.log('Starting policy generation...');
  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;

  try {
    // Load client data
    const { clients } = require('./data/clients.json');
    await pdfGenerator.initialize();

    for (const client of clients) {
      try {
        // Validate client data
        await validateClientData(client);

        // Use the full domain name for the directory
        const domainName = fileHandler.getDomainName(client.domain);
        
        // Create output directory path
        const outputDir = path.join(OUTPUT_DIR, domainName);
        await fileHandler.ensureDirectoryExists(outputDir);

        // Generate cookie policy
        console.log(`Generating policies for ${client.domain}...`);
        const cookiePolicyHtml = await templateRenderer.renderTemplate('cookie-policy', client);
        await pdfGenerator.generatePDF(
          templateRenderer.generateHTML(cookiePolicyHtml, 'Cookie Policy'),
          path.join(outputDir, 'cookiepolicy.pdf')
        );

        // Generate privacy policy
        const privacyPolicyHtml = await templateRenderer.renderTemplate('privacy-policy', client);
        await pdfGenerator.generatePDF(
          templateRenderer.generateHTML(privacyPolicyHtml, 'Integritetspolicy'),
          path.join(outputDir, 'integritetspolicy.pdf')
        );

        successCount++;
        console.log(`Successfully generated policies for ${client.domain}`);
      } catch (error) {
        errorCount++;
        console.error(`Error generating policies for ${client.domain}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  } finally {
    await pdfGenerator.close();
    const duration = (Date.now() - startTime) / 1000;
    console.log('\nGeneration Summary:');
    console.log(`Total time: ${duration.toFixed(2)} seconds`);
    console.log(`Successful generations: ${successCount}`);
    console.log(`Failed generations: ${errorCount}`);
  }
}

// Run the script
if (require.main === module) {
  generatePolicies().catch(console.error);
}

module.exports = { generatePolicies, validateClientData };