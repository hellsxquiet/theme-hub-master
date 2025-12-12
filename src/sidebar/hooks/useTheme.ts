import { useEffect, useState } from "react"

import { handleError, handleSuccess } from "~utils/error-handler"
import logger from "~utils/logger"

export function useTheme(website: string) {
  const [themes, setThemes] = useState<Record<string, any>>({})
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThemes()
  }, [website])

  useEffect(() => {
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
      if (areaName === 'local' && changes.themes) {
        const newThemes = changes.themes.newValue || {}
        setThemes(newThemes)
      }
    }
    chrome.storage.onChanged.addListener(handleStorageChange)
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (themes[website]) {
      setDarkModeEnabled(themes[website].darkMode)
    } else {
      setDarkModeEnabled(false)
    }
  }, [themes, website])

  const loadThemes = async () => {
    try {
      const response = await chrome.runtime.sendMessage({ type: "GET_THEMES" })
      if (response?.themes) {
        setThemes(response.themes)
      }
    } catch (error) {
      handleError(error, {
        source: "useTheme.loadThemes",
        action: "GET_THEMES"
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleDarkMode = async () => {
    try {
      const newState = !darkModeEnabled
      setDarkModeEnabled(newState)

      // Send message to content script
      await chrome.runtime.sendMessage({
        type: "DARK_MODE_TOGGLE",
        payload: { website, enabled: newState }
      })

      // Reload themes to ensure state consistency
      loadThemes()
      handleSuccess(newState ? "Dark mode enabled" : "Dark mode disabled", {
        source: "useTheme.toggleDarkMode"
      })
    } catch (error) {
      handleError(error, {
        source: "useTheme.toggleDarkMode",
        action: "DARK_MODE_TOGGLE"
      })
    }
  }

  const toggleTheme = async () => {
    try {
      const currentTheme = themes[website]
      if (currentTheme) {
        // Send message to content script
        await chrome.runtime.sendMessage({
          type: "THEME_TOGGLE",
          payload: { website }
        })

        // Reload themes
        loadThemes()
        handleSuccess(
          currentTheme?.enabled
            ? "Custom theme disabled"
            : "Custom theme enabled",
          { source: "useTheme.toggleTheme" }
        )
      }
    } catch (error) {
      handleError(error, {
        source: "useTheme.toggleTheme",
        action: "THEME_TOGGLE"
      })
    }
  }

  return {
    themes,
    darkModeEnabled,
    loading,
    toggleDarkMode,
    toggleTheme,
    loadThemes
  }
}
