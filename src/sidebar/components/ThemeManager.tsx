import {
  Download,
  Edit,
  Palette,
  Play,
  Plus,
  Trash2,
  Upload
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { handleError } from "~utils/error-handler"
import logger from "~utils/logger"

import { useTheme } from "../hooks/useTheme"
import { CodeEditor } from "./CodeEditor"

interface ThemeManagerProps {
  currentWebsite: string
}

export function ThemeManager({ currentWebsite }: ThemeManagerProps) {
  const { t } = useTranslation()
  const { themes, toggleTheme, loadThemes } = useTheme(currentWebsite)
  const [showEditor, setShowEditor] = useState(false)
  const [cssCode, setCssCode] = useState("/* Enter your custom CSS here */")
  const [jsCode, setJsCode] = useState("// Enter your custom JavaScript here")
  const [themeName, setThemeName] = useState("")

  const DEFAULT_CSS = "/* Enter your custom CSS here */"
  const DEFAULT_JS = "// Enter your custom JavaScript here"
  const canSave = (() => {
    const css = (cssCode || "").trim()
    const js = (jsCode || "").trim()
    const hasCSS = css.length > 0 && css !== DEFAULT_CSS
    const hasJS = js.length > 0 && js !== DEFAULT_JS
    return hasCSS || hasJS
  })()

  useEffect(() => {
    const loadDraft = async () => {
      try {
        const result = await chrome.storage.local.get(["themeDrafts"])
        const drafts = result.themeDrafts || {}
        const draft = drafts[currentWebsite]
        if (draft) {
          setShowEditor(!!draft.showEditor)
          setCssCode(draft.css ?? "/* Enter your custom CSS here */")
          setJsCode(draft.js ?? "// Enter your custom JavaScript here")
          setThemeName(draft.name ?? "")
        }
      } catch (error) {
        logger.error("Error loading draft:", error)
      }
    }
    if (currentWebsite) {
      loadDraft()
    }
  }, [currentWebsite])

  useEffect(() => {
    const saveDraft = async () => {
      try {
        const result = await chrome.storage.local.get(["themeDrafts"])
        const drafts = result.themeDrafts || {}
        drafts[currentWebsite] = {
          showEditor,
          css: cssCode,
          js: jsCode,
          name: themeName
        }
        await chrome.storage.local.set({ themeDrafts: drafts })
      } catch (error) {
        logger.error("Error saving draft:", error)
      }
    }
    if (currentWebsite) {
      saveDraft()
    }
  }, [currentWebsite, showEditor, cssCode, jsCode, themeName])

  const handleSaveTheme = async () => {
    try {
      if (!canSave) {
        await handleError("Please add CSS or JavaScript before saving")
        return
      }
      await chrome.runtime.sendMessage({
        type: "THEME_APPLY",
        payload: {
          website: currentWebsite,
          name: themeName || "Custom Theme",
          css: cssCode,
          js: jsCode
        }
      })

      setShowEditor(false)
      setCssCode("/* Enter your custom CSS here */")
      setJsCode("// Enter your custom JavaScript here")
      setThemeName("")

      const result = await chrome.storage.local.get(["themeDrafts"])
      const drafts = result.themeDrafts || {}
      delete drafts[currentWebsite]
      await chrome.storage.local.set({ themeDrafts: drafts })
    } catch (error) {
      logger.error("Error saving theme:", error)
    }
  }

  const handleTestTheme = () => {
    chrome.runtime.sendMessage({
      type: "THEME_APPLY",
      payload: {
        website: currentWebsite,
        name: "Test Theme",
        css: cssCode,
        js: jsCode,
        temporary: true
      }
    })
  }

  const handleImportTheme = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const theme = JSON.parse(e.target?.result as string)
            setCssCode(theme.css || "")
            setJsCode(theme.js || "")
            setThemeName(theme.name || "")
            setShowEditor(true)
          } catch (error) {
            logger.error("Error importing theme:", error)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleExportTheme = () => {
    const theme = {
      name: themeName || "Custom Theme",
      website: currentWebsite,
      css: cssCode,
      js: jsCode,
      createdAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(theme, null, 2)], {
      type: "application/json"
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `theme-${currentWebsite}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (showEditor) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Create Theme
          </h3>
          <button
            onClick={() => setShowEditor(false)}
            className="text-sm text-primary hover:text-primary-dark">
            Back
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme Name
          </label>
          <input
            type="text"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            placeholder="My Custom Theme"
            className="input-base"
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CSS Styles
          </label>
          <CodeEditor
            language="css"
            value={cssCode}
            onChange={setCssCode}
            placeholder="/* Enter your custom CSS here */"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JavaScript Code (Optional)
          </label>
          <CodeEditor
            language="javascript"
            value={jsCode}
            onChange={setJsCode}
            placeholder="// Enter your custom JavaScript here"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleTestTheme}
            className="flex-1 btn-secondary flex items-center justify-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Test</span>
          </button>
          <button
            onClick={handleSaveTheme}
            disabled={!canSave}
            className="flex-1 btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
            Save Theme
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleImportTheme}
            className="flex-1 btn-secondary flex items-center justify-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button
            onClick={handleExportTheme}
            className="flex-1 btn-secondary flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Create New Theme Button */}
      <button
        onClick={() => setShowEditor(true)}
        className="btn-dashed group">
        <div className="p-1 rounded-full bg-gray-100 dark:bg-zinc-800 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
          <Plus className="w-4 h-4" />
        </div>
        <span>Create New Theme</span>
      </button>

      {themes[currentWebsite] &&
      (themes[currentWebsite].css || themes[currentWebsite].js) ? (
        <div className="space-y-3">
          <div className="card p-4 card-hover group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-base text-gray-900 dark:text-white">
                    {themes[currentWebsite].name || "Custom Theme"}
                  </div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${themes[currentWebsite].enabled ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-gray-300 dark:bg-gray-600"}`} />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {themes[currentWebsite].enabled
                        ? t("sidebar.enabled")
                        : t("sidebar.disabled")}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => toggleTheme()}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 mr-2 ${
                    themes[currentWebsite].enabled ? "bg-green-500" : "bg-gray-200 dark:bg-zinc-700"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                      themes[currentWebsite].enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                
                <div className="h-8 w-px bg-gray-200 dark:bg-zinc-700 mx-2" />

                <button
                  onClick={() => {
                    setThemeName(themes[currentWebsite].name || "")
                    setCssCode(themes[currentWebsite].css || "")
                    setJsCode(themes[currentWebsite].js || "")
                    setShowEditor(true)
                  }}
                  className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  title="Edit">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this theme?")) {
                      await chrome.runtime.sendMessage({
                        type: "THEME_REMOVE",
                        payload: { website: currentWebsite }
                      })
                      loadThemes()
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
