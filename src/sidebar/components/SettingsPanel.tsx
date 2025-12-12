import * as Checkbox from "@radix-ui/react-checkbox"
import { Check, Globe, Keyboard, Palette, Save } from "lucide-react"
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
    <div className="space-y-6">
      {/* Language Settings */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">
          <Globe className="w-4 h-4" />
          <span>Language</span>
        </div>
        <div className="card p-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-base w-full text-sm bg-transparent border-0 focus:ring-0 px-0 py-0">
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">
          <Keyboard className="w-4 h-4" />
          <span>Keyboard Shortcuts</span>
        </div>
        <div className="card p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Toggle Dark Mode
            </label>
            <input
              type="text"
              value={shortcuts.toggleDarkMode}
              onChange={(e) =>
                setShortcuts({ ...shortcuts, toggleDarkMode: e.target.value })
              }
              className="input-base text-sm font-mono"
              placeholder="Alt+D"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Toggle Styles
            </label>
            <input
              type="text"
              value={shortcuts.toggleStyles}
              onChange={(e) =>
                setShortcuts({ ...shortcuts, toggleStyles: e.target.value })
              }
              className="input-base text-sm font-mono"
              placeholder="Alt+S"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Open Sidebar
            </label>
            <input
              type="text"
              value={shortcuts.openSidebar}
              onChange={(e) =>
                setShortcuts({ ...shortcuts, openSidebar: e.target.value })
              }
              className="input-base text-sm font-mono"
              placeholder="Alt+T"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">
          <Palette className="w-4 h-4" />
          <span>Theme Settings</span>
        </div>
        <div className="card p-4 space-y-4">
          <label
            className="flex items-center space-x-3 cursor-pointer group"
            htmlFor="auto-apply">
            <Checkbox.Root
              id="auto-apply"
              checked={autoApply}
              onCheckedChange={(checked) => setAutoApply(!!checked)}
              className="h-5 w-5 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 data-[state=checked]:bg-primary data-[state=checked]:border-primary flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200">
              <Checkbox.Indicator>
                <Check className="w-3.5 h-3.5 text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              Auto-apply themes when visiting websites
            </span>
          </label>
          <label
            className="flex items-center space-x-3 cursor-pointer group"
            htmlFor="sync-enabled">
            <Checkbox.Root
              id="sync-enabled"
              checked={syncEnabled}
              onCheckedChange={(checked) => setSyncEnabled(!!checked)}
              className="h-5 w-5 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 data-[state=checked]:bg-primary data-[state=checked]:border-primary flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200">
              <Checkbox.Indicator>
                <Check className="w-3.5 h-3.5 text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
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
