import type { ContentScriptMessage } from "~types";
import logger from "~utils/logger";
import { StorageService } from "./storage-service";

export class MessageHandler {
  private storageService: StorageService;
  
  constructor() {
    this.storageService = StorageService.getInstance();
  }
  
  async handleMessage(message: ContentScriptMessage, sender: chrome.runtime.MessageSender): Promise<any> {
    logger.info("MessageHandler received message:", message);
    
    switch (message.type) {
      case 'THEME_APPLY':
        return await this.handleThemeApply(message.payload);
      case 'THEME_REMOVE':
        return await this.handleThemeRemove(message.payload);
      case 'DARK_MODE_TOGGLE':
        return await this.handleDarkModeToggle(message.payload);
      case 'GET_THEMES':
        return await this.handleGetThemes();
      case 'GET_SETTINGS':
        return await this.handleGetSettings();
      case 'SAVE_SETTINGS':
        return await this.handleSaveSettings(message.payload);
      default:
        logger.warn("Unknown message type:", message.type);
        return { error: "Unknown message type" };
    }
  }
  
  private async handleThemeApply(payload: any) {
    try {
      const theme = {
        id: payload.themeId || `theme-${Date.now()}`,
        website: payload.website,
        name: payload.name || 'Custom Theme',
        css: payload.css || '',
        js: payload.js || '',
        darkMode: false,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await this.storageService.saveTheme(payload.website, theme);
      
      // Send to content script for immediate application
      await this.sendToActiveTab({
        type: 'THEME_APPLY',
        payload
      });
      
      return { success: true, theme };
    } catch (error) {
      logger.error("Error applying theme:", error);
      return { error: "Failed to apply theme" };
    }
  }
  
  private async handleThemeRemove(payload: any) {
    try {
      await this.storageService.removeTheme(payload.website);
      
      // Send to content script for immediate removal
      await this.sendToActiveTab({
        type: 'THEME_REMOVE',
        payload
      });
      
      return { success: true };
    } catch (error) {
      logger.error("Error removing theme:", error);
      return { error: "Failed to remove theme" };
    }
  }
  
  private async handleDarkModeToggle(payload: any) {
    try {
      await this.sendToActiveTab({
        type: 'DARK_MODE_TOGGLE',
        payload
      });
      
      return { success: true };
    } catch (error) {
      logger.error("Error toggling dark mode:", error);
      return { error: "Failed to toggle dark mode" };
    }
  }
  
  private async handleGetThemes() {
    try {
      const themes = await this.storageService.getThemes();
      return { themes };
    } catch (error) {
      logger.error("Error getting themes:", error);
      return { error: "Failed to get themes" };
    }
  }
  
  private async handleGetSettings() {
    try {
      const settings = await this.storageService.getSettings();
      return { settings };
    } catch (error) {
      logger.error("Error getting settings:", error);
      return { error: "Failed to get settings" };
    }
  }
  
  private async handleSaveSettings(payload: any) {
    try {
      await this.storageService.saveSettings(payload.settings);
      return { success: true };
    } catch (error) {
      logger.error("Error saving settings:", error);
      return { error: "Failed to save settings" };
    }
  }
  
  private async sendToActiveTab(message: any) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      try {
        await chrome.tabs.sendMessage(tabs[0].id!, message);
      } catch (error) {
        logger.warn("Could not send message to tab:", error);
      }
    }
  }
}
