// README.md
# Policy Document Generator

A tool to automatically generate cookie and privacy policies for multiple clients.

## Installation

```bash
npm install
```

## Use

```bash
npm start
```

## Struktur

- `src/` - Source code
  - `config/` - Configuration files
  - `templates/` - Markdown-mallar för policies
  - `styles/` - CSS for PDF-rendering
  - `utils/` - Help functions
  - `data/` - Client data
- `dist/` - Generated PDF-files
- `tests/` - Test files

## Features

- Automatic generation of cookie and privacy policies
- Custom templates per customer
- PDF generation with professional formatting
- Multi-client support
- Error handling and logging

## Scripts

- `npm start` - Run the generator
- `npm test` - Run the tests
- `npm run lint` - Run linting