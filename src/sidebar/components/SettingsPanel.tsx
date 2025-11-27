import { Globe, Keyboard, Palette, Save } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import logger from "~utils/logger"

export function SettingsPanel() {
  const { t } = useTranslation()
  const [language, setLanguage] = useState("en")
  const [shortcuts, setShortcuts] = useState({
    toggleDarkMode: "Alt+D",
    toggleStyles: "Alt+S",
    openSidebar: "Alt+T"
  })
  const [autoApply, setAutoApply] = useState(true)
  const [syncEnabled, setSyncEnabled] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: "GET_SETTINGS"
      })
      if (response?.settings) {
        setLanguage(response.settings.language)
        setShortcuts(response.settings.keyboardShortcuts)
        setAutoApply(response.settings.autoApply)
        setSyncEnabled(response.settings.syncEnabled)
      }
    } catch (error) {
      logger.error("Error loading settings:", error)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      await chrome.runtime.sendMessage({
        type: "SAVE_SETTINGS",
        payload: {
          settings: {
            language,
            keyboardShortcuts: shortcuts,
            autoApply,
            syncEnabled
          }
        }
      })
    } catch (error) {
      logger.error("Error saving settings:", error)
    } finally {
      setSaving(false)
    }
  }

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "pt", name: "Português" },
    { code: "pl", name: "Polski" }
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Language Settings */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Language
          </h3>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="input-base">
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Keyboard className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Keyboard Shortcuts
          </h3>
        </div>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Toggle Dark Mode
            </label>
            <input
              type="text"
              value={shortcuts.toggleDarkMode}
              onChange={(e) =>
                setShortcuts({ ...shortcuts, toggleDarkMode: e.target.value })
              }
              className="input-base text-sm"
              placeholder="Alt+D"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Toggle Styles
            </label>
            <input
              type="text"
              value={shortcuts.toggleStyles}
              onChange={(e) =>
                setShortcuts({ ...shortcuts, toggleStyles: e.target.value })
              }
              className="input-base text-sm"
              placeholder="Alt+S"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Open Sidebar
            </label>
            <input
              type="text"
              value={shortcuts.openSidebar}
              onChange={(e) =>
                setShortcuts({ ...shortcuts, openSidebar: e.target.value })
              }
              className="input-base text-sm"
              placeholder="Alt+T"
            />
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme Settings
          </h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={autoApply}
              onChange={(e) => setAutoApply(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Auto-apply themes when visiting websites
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={syncEnabled}
              onChange={(e) => setSyncEnabled(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Sync themes across devices
            </span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        disabled={saving}
        className="w-full btn-primary flex items-center justify-center space-x-2">
        {saving ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </>
        )}
      </button>
    </div>
  )
}
