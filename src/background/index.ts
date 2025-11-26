import { MessageHandler } from "./message-handler";
import { StorageService } from "./storage-service";
import logger from "~utils/logger";

const messageHandler = new MessageHandler();
const storageService = StorageService.getInstance();

chrome.runtime.onInstalled.addListener(async () => {
  logger.info("Theme Hub extension installed");
  
  // Set default settings
  const settings = {
    language: 'en' as const,
    keyboardShortcuts: {
      toggleDarkMode: 'Alt+D',
      toggleStyles: 'Alt+S',
      openSidebar: 'Alt+T'
    },
    autoApply: true,
    syncEnabled: false
  };
  
  await storageService.saveSettings(settings);
  
  // Initialize empty storage
  await chrome.storage.local.set({
    themes: {},
    websiteMappings: {}
  });
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.info("Background received message:", message);
  
  messageHandler.handleMessage(message, sender)
    .then(response => {
      if (sendResponse) {
        sendResponse(response);
      }
    })
    .catch(error => {
      logger.error("Error handling message:", error);
      if (sendResponse) {
        sendResponse({ error: error.message });
      }
    });
  
  return true; // Keep the message channel open for async response
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  logger.info("Command received:", command);
  
  switch (command) {
    case 'toggle-dark-mode':
      await messageHandler.handleMessage({
        type: 'DARK_MODE_TOGGLE',
        payload: { website: await getCurrentWebsite() }
      }, {});
      break;
    case 'toggle-styles':
      await messageHandler.handleMessage({
        type: 'THEME_TOGGLE',
        payload: { website: await getCurrentWebsite() }
      }, {});
      break;
    case 'open-sidebar':
      chrome.sidePanel.open({ windowId: chrome.windows.WINDOW_ID_CURRENT });
      break;
  }
});

async function getCurrentWebsite(): Promise<string> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0] && tabs[0].url) {
    return new URL(tabs[0].url).hostname;
  }
  return '';
}
