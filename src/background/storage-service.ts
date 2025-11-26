import type { WebsiteTheme, ExtensionSettings } from "~types";

export class StorageService {
  private static instance: StorageService;
  
  private constructor() {}
  
  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
  
  async getThemes(): Promise<Record<string, WebsiteTheme>> {
    const result = await chrome.storage.local.get(['themes']);
    return result.themes || {};
  }
  
  async saveTheme(website: string, theme: WebsiteTheme): Promise<void> {
    const themes = await this.getThemes();
    themes[website] = theme;
    await chrome.storage.local.set({ themes });
  }
  
  async removeTheme(website: string): Promise<void> {
    const themes = await this.getThemes();
    delete themes[website];
    await chrome.storage.local.set({ themes });
  }
  
  async getTheme(website: string): Promise<WebsiteTheme | null> {
    const themes = await this.getThemes();
    return themes[website] || null;
  }
  
  async getSettings(): Promise<ExtensionSettings> {
    const result = await chrome.storage.local.get(['settings']);
    return result.settings || this.getDefaultSettings();
  }
  
  async saveSettings(settings: ExtensionSettings): Promise<void> {
    await chrome.storage.local.set({ settings });
  }
  
  private getDefaultSettings(): ExtensionSettings {
    return {
      language: 'en',
      keyboardShortcuts: {
        toggleDarkMode: 'Alt+D',
        toggleStyles: 'Alt+S',
        openSidebar: 'Alt+T'
      },
      autoApply: true,
      syncEnabled: false
    };
  }
  
  async getWebsiteMappings(): Promise<Record<string, any>> {
    const result = await chrome.storage.local.get(['websiteMappings']);
    return result.websiteMappings || {};
  }
  
  async saveWebsiteMapping(domain: string, mapping: any): Promise<void> {
    const mappings = await this.getWebsiteMappings();
    mappings[domain] = mapping;
    await chrome.storage.local.set({ websiteMappings: mappings });
  }
}
