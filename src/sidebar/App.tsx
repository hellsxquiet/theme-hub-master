import {
  AlertCircle,
  Code,
  Globe,
  Layers,
  Palette,
  Settings,
  Sparkles
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useTranslation } from "react-i18next"

import { handleError } from "~utils/error-handler"

import { SettingsPanel } from "./components/SettingsPanel"
import { ThemeManager } from "./components/ThemeManager"
import { ThemeToggleIcon } from "./components/ThemeToggleIcon"
import { Toast } from "./components/Toast"
import { useTheme } from "./hooks/useTheme"
import { useWebsite } from "./hooks/useWebsite"

import "./style.css"
import "../i18n"

function Fallback({ error }: { error: Error }) {
  return (
    <div className="p-6 text-sm bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 m-4">
      <div className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Something went wrong
      </div>
      <div className="mt-2 break-words text-red-500 dark:text-red-300 font-mono text-xs opacity-90">
        {error?.message}
      </div>
    </div>
  )
}

function Sidebar() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<"themes" | "settings">("themes")
  const { currentWebsite, websiteName, isSupported } = useWebsite()
  const { themes, darkModeEnabled, toggleDarkMode, toggleTheme } =
    useTheme(currentWebsite)

  useEffect(() => {
    const onErr = (ev: ErrorEvent) =>
      handleError(ev.error || ev.message, { source: "Sidebar.window.onerror" })
    const onRej = (ev: PromiseRejectionEvent) =>
      handleError(ev.reason, { source: "Sidebar.unhandledrejection" })
    window.addEventListener("error", onErr)
    window.addEventListener("unhandledrejection", onRej as any)
    return () => {
      window.removeEventListener("error", onErr)
      window.removeEventListener("unhandledrejection", onRej as any)
    }
  }, [])

  return (
    <>
      <Toast />
      <ErrorBoundary
        FallbackComponent={Fallback}
        onError={(error) =>
          handleError(error, { source: "Sidebar.ErrorBoundary" })
        }>
        <div className="w-full h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-white flex flex-col overflow-hidden font-sans selection:bg-primary/20 selection:text-primary-dark relative">
          {/* Background Blob */}
          <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 blur-3xl pointer-events-none" />

          {/* Modern Header */}
          <div className="px-6 py-5 glass sticky top-0 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                  {t("sidebar.title")}
                </h1>
              </div>
              <div className="flex items-center px-3 py-1.5 bg-surface dark:bg-surface-dark rounded-full border border-gray-100 dark:border-zinc-800">
                <Globe className="w-3.5 h-3.5 text-gray-400 mr-2" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
                  {websiteName}
                </span>
              </div>
            </div>

            {/* Segmented Control Tabs */}
            <div className="p-1.5 bg-gray-100/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl flex space-x-1 border border-gray-200/50 dark:border-zinc-800/50 shadow-inner">
              <button
                onClick={() => setActiveTab("themes")}
                className={`relative flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ease-out flex items-center justify-center space-x-2.5 ${
                  activeTab === "themes"
                    ? "bg-white dark:bg-zinc-800 text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] shadow-primary/20 ring-1 ring-black/5 dark:ring-white/5"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-zinc-800/50"
                }`}>
                <Layers
                  className={`w-4 h-4 transition-transform duration-300 ${
                    activeTab === "themes" ? "scale-110" : ""
                  }`}
                />
                <span>{t("sidebar.themeManager")}</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`relative flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ease-out flex items-center justify-center space-x-2.5 ${
                  activeTab === "settings"
                    ? "bg-white dark:bg-zinc-800 text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] shadow-primary/20 ring-1 ring-black/5 dark:ring-white/5"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-zinc-800/50"
                }`}>
                <Settings
                  className={`w-4 h-4 transition-transform duration-300 ${
                    activeTab === "settings" ? "rotate-90 scale-110" : ""
                  }`}
                />
                <span>{t("settings.title")}</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto sidebar-scrollbar p-6">
            <div className="max-w-2xl mx-auto animate-fade-in">
              {activeTab === "themes" ? (
                !isSupported ? (
                  <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-surface dark:bg-surface-dark rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-800">
                    <div className="p-4 bg-gray-100 dark:bg-zinc-800 rounded-full mb-6">
                      <AlertCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Website Not Supported
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
                      Theme Hub works best on major websites. Try visiting a
                      supported site to see themes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Quick Actions Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">
                        <Sparkles className="w-4 h-4" />
                        <span>{t("sidebar.quickActions")}</span>
                      </div>

                      {/* Dark Mode Card */}
                      <div className="card p-4 flex items-center justify-between group card-hover">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-xl transition-colors duration-300 ${
                              darkModeEnabled
                                ? "bg-primary/10 text-primary"
                                : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400"
                            }`}>
                            <ThemeToggleIcon
                              isDark={!!darkModeEnabled}
                              className="w-6 h-6"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-base mb-0.5">
                              {t("sidebar.darkMode")}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {darkModeEnabled
                                ? t("sidebar.enabled")
                                : t("sidebar.disabled")}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleDarkMode()}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 ${
                            darkModeEnabled
                              ? "bg-primary"
                              : "bg-gray-200 dark:bg-zinc-700"
                          }`}>
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                              darkModeEnabled
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Theme Manager Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">
                        <Code className="w-4 h-4" />
                        <span>Custom Themes</span>
                      </div>
                      <ThemeManager currentWebsite={currentWebsite} />
                    </div>
                  </div>
                )
              ) : (
                <div className="animate-slide-up">
                  <SettingsPanel />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-t border-gray-100 dark:border-zinc-800">
            <div className="flex justify-center items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
              <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md font-mono">
                ⌘/Ctrl + B
              </span>
              <span>to toggle sidebar</span>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}

export default Sidebar
