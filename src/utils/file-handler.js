const fs = require('fs').promises;
const path = require('path');

class FileHandler {
  static async ensureDirectoryExists(dirPath) {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  static async writeFile(filePath, content) {
    await this.ensureDirectoryExists(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf8');
  }

  static async readFile(filePath) {
    return await fs.readFile(filePath, 'utf8');
  }

  static getDomainName(domain) {
    // Return the full domain instead of just the first part
    return domain.toLowerCase();
  }
}

module.exports = FileHandler;