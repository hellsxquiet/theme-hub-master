import { useEffect, useState } from "react"

import logger from "~utils/logger"

export function useTheme(website: string) {
  const [themes, setThemes] = useState<Record<string, any>>({})
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThemes()
  }, [website])

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
      logger.error("Error loading themes:", error)
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
    } catch (error) {
      console.error("Error toggling dark mode:", error)
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
      }
    } catch (error) {
      console.error("Error toggling theme:", error)
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
