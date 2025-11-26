import type { ExtensionSettings } from "~types";
import logger from "~utils/logger";

export class KeyboardShortcuts {
  private shortcuts: Record<string, string>;
  
  constructor(settings: ExtensionSettings) {
    this.shortcuts = settings.keyboardShortcuts;
  }
  
  registerShortcuts(): void {
    // Register keyboard shortcuts with Chrome
    const commands = {
      'toggle-dark-mode': {
        suggested_key: {
          default: this.shortcuts.toggleDarkMode
        },
        description: 'Toggle dark mode'
      },
      'toggle-styles': {
        suggested_key: {
          default: this.shortcuts.toggleStyles
        },
        description: 'Toggle custom styles'
      },
      'open-sidebar': {
        suggested_key: {
          default: this.shortcuts.openSidebar
        },
        description: 'Open Theme Hub sidebar'
      }
    };
    
    // Update manifest commands (this would need to be done during build)
    logger.info('Keyboard shortcuts registered:', commands);
  }
  
  validateShortcut(shortcut: string): boolean {
    // Validate keyboard shortcut format
    const validFormat = /^(Alt|Ctrl|Cmd|Shift)\+(\w|[A-Z]|F[1-9]|F1[0-2])$/;
    return validFormat.test(shortcut);
  }
  
  parseShortcut(shortcut: string): { modifier: string; key: string } {
    const parts = shortcut.split('+');
    return {
      modifier: parts[0],
      key: parts[1]
    };
  }
  
  getDefaultShortcuts(): Record<string, string> {
    return {
      toggleDarkMode: 'Alt+D',
      toggleStyles: 'Alt+S',
      openSidebar: 'Alt+T'
    };
  }
  
  updateShortcuts(newShortcuts: Record<string, string>): void {
    this.shortcuts = { ...this.shortcuts, ...newShortcuts };
    this.registerShortcuts();
  }
}
