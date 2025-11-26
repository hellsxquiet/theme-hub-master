import { useState, useEffect } from 'react';

export function useTheme(website: string) {
  const [themes, setThemes] = useState<Record<string, any>>({});
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadThemes();
    loadDarkModeState();
  }, [website]);
  
  const loadThemes = async () => {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_THEMES' });
      if (response?.themes) {
        setThemes(response.themes);
      }
    } catch (error) {
      console.error("Error loading themes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadDarkModeState = async () => {
    try {
      // Check if dark mode is enabled for current website
      const darkModeKey = `theme-hub-dark-${website}`;
      const isDark = document.documentElement.getAttribute(`data-theme-hub-dark-${website}`) === 'true' ||
                     document.documentElement.getAttribute('data-theme-hub-dark') === 'true';
      setDarkModeEnabled(isDark);
    } catch (error) {
      console.error("Error loading dark mode state:", error);
    }
  };
  
  const toggleDarkMode = async () => {
    try {
      const newState = !darkModeEnabled;
      setDarkModeEnabled(newState);
      
      // Send message to content script
      await chrome.runtime.sendMessage({
        type: 'DARK_MODE_TOGGLE',
        payload: { website, enabled: newState }
      });
      
      // Update local state
      loadDarkModeState();
    } catch (error) {
      console.error("Error toggling dark mode:", error);
    }
  };
  
  const toggleTheme = async () => {
    try {
      const currentTheme = themes[website];
      if (currentTheme) {
        // Send message to content script
        await chrome.runtime.sendMessage({
          type: 'THEME_TOGGLE',
          payload: { website }
        });
        
        // Reload themes
        loadThemes();
      }
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };
  
  return {
    themes,
    darkModeEnabled,
    loading,
    toggleDarkMode,
    toggleTheme,
    loadThemes
  };
}