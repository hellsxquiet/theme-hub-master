# Theme Hub - Chrome Extension

A powerful Chrome extension that allows users to inject custom CSS and JavaScript into websites to customize their appearance and functionality. Features dark mode support, multi-language interface, and keyboard shortcuts.

## Features

- **Custom CSS/JS Injection**: Apply custom styles and scripts to any website
- **Dark Mode Engine**: Automatic dark mode with smart color inversion
- **Multi-language Support**: Available in 6 languages (English, Spanish, French, German, Portuguese, Polish)
- **Keyboard Shortcuts**: Quick access with Alt+D (dark mode), Alt+S (styles), Alt+T (sidebar)
- **Theme Manager**: Create, edit, import/export custom themes
- **Live Preview**: Test themes before applying
- **Website Detection**: Automatically detects current website and shows relevant options
- **Persistent Storage**: Themes and settings are saved across browser sessions

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the extension:
   ```bash
   pnpm build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build/chrome-mv3-prod` directory

## Development

### Start development server:
```bash
pnpm dev
```

### Build for production:
```bash
pnpm build
```

### Package for distribution:
```bash
pnpm package
```

## Architecture

### Tech Stack
- **Framework**: Plasmo Framework with TypeScript
- **Frontend**: React 18 + Tailwind CSS
- **Build Tool**: Plasmo CLI (Vite-based)
- **Icons**: Lucide React
- **Internationalization**: i18next

### Project Structure
```
src/
├── background/          # Background service worker
├── content-scripts/   # Content scripts for injection
├── sidebar/           # Sidebar React application
├── themes/            # Theme files and processors
├── i18n/              # Multi-language translations
└── utils/             # Utility functions
```

### Key Components

#### Background Service Worker
- Handles message passing between content scripts and sidebar
- Manages Chrome storage for themes and settings
- Processes keyboard shortcuts

#### Content Scripts
- Injects CSS and JavaScript into web pages
- Applies dark mode transformations
- Manages theme application and removal

#### Sidebar Interface
- React-based UI for theme management
- Code editor for CSS/JS creation
- Settings panel for configuration

## Usage

1. **Open Sidebar**: Click the extension icon or press Alt+T
2. **Toggle Dark Mode**: Use the dark mode toggle or press Alt+D
3. **Create Theme**: Click "New Theme" and write custom CSS/JS
4. **Test Theme**: Use the "Test" button to preview changes
5. **Save Theme**: Click "Save Theme" to apply permanently
6. **Import/Export**: Share themes with other users

## Keyboard Shortcuts

- `Alt + D`: Toggle dark mode
- `Alt + S`: Toggle custom styles
- `Alt + T`: Open sidebar

## Multi-language Support

The extension supports 6 languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Portuguese (pt)
- Polish (pl)

## Theme Format

Themes are stored as JSON objects with the following structure:

```json
{
  "id": "unique-theme-id",
  "website": "example.com",
  "name": "My Custom Theme",
  "css": "/* Your CSS here */",
  "js": "// Your JavaScript here (optional)",
  "darkMode": false,
  "enabled": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Security

- CSS and JavaScript are sanitized before injection
- Potentially dangerous code patterns are removed
- Scripts run in isolated contexts
- No external network requests without user consent

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.