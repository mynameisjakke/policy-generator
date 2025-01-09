const Handlebars = require('handlebars');
const { marked } = require('marked');
const fs = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { sv } = require('date-fns/locale');

class TemplateRenderer {
  constructor() {
    // Register Handlebars helpers
    Handlebars.registerHelper('formatDate', date => {
      return format(date || new Date(), 'd MMMM yyyy', { locale: sv });
    });

    Handlebars.registerHelper('currentDate', () => {
      return format(new Date(), 'd MMMM yyyy', { locale: sv });
    });

    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper('formatList', function (items) {
      if (!items || items.length === 0) return 'Inga';
      return items.join(', ');
    });
  }

  async renderTemplate(templateName, data) {
    try {
      const templatePath = path.resolve(__dirname, `../templates/${templateName}.md`);
      const templateContent = await fs.readFile(templatePath, 'utf8');
      const template = Handlebars.compile(templateContent);

      // Add additional data for templates
      const enrichedData = {
        ...data,
        generatedDate: new Date(),
      };

      const renderedMarkdown = template(enrichedData);
      return marked(renderedMarkdown);
    } catch (error) {
      throw new Error(`Error rendering template ${templateName}: ${error.message}`);
    }
  }

  generateHTML(content, title) {
    const cssPath = path.resolve(__dirname, '../styles/document.css');
    return `
      <!DOCTYPE html>
      <html lang="sv">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="file://${cssPath}">
      </head>
      <body>
        ${content}
        <footer>
          <p class="generation-date">Genererad: ${format(new Date(), 'd MMMM yyyy', { locale: sv })}</p>
        </footer>
      </body>
      </html>
    `;
  }
}

module.exports = new TemplateRenderer();
