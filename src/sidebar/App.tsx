import React, { useState, useEffect } from "react";
import { Palette, Moon, Sun, Settings, Code, Globe, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./hooks/useTheme";
import { useWebsite } from "./hooks/useWebsite";
import { ThemeManager } from "./components/ThemeManager";
import { SettingsPanel } from "./components/SettingsPanel";
import "./style.css";
import "../i18n";

function Sidebar() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'themes' | 'settings'>('themes');
  const { currentWebsite, websiteName, isSupported } = useWebsite();
  const { themes, darkModeEnabled, toggleDarkMode, toggleTheme } = useTheme(currentWebsite);
  
  return (
    <div className="w-full h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-white flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-semibold">{t('sidebar.title')}</h1>
          </div>
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-32">
              {t('sidebar.website')}: {websiteName}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('themes')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'themes'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Code className="w-4 h-4" />
            <span>{t('sidebar.themeManager')}</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'settings'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>{t('settings.title')}</span>
          </div>
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'themes' ? (
          !isSupported ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <h2 className="text-lg font-medium">Website Not Supported</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Theme Hub cannot run on this page.
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Quick Actions */}
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('sidebar.quickActions')}</h2>
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    {darkModeEnabled ? (
                      <Moon className="w-5 h-5 text-primary" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <div className="font-medium">{t('sidebar.darkMode')}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {darkModeEnabled ? t('sidebar.enabled') : t('sidebar.disabled')}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDarkMode()}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkModeEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkModeEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Theme Toggle */}
                {themes[currentWebsite] && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Palette className="w-5 h-5 text-primary" />
                      <div>
                      <div className="font-medium">{t('sidebar.customTheme')}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {themes[currentWebsite]?.enabled ? t('sidebar.enabled') : t('sidebar.disabled')}
                      </div>
                    </div>
                    </div>
                    <button
                      onClick={() => toggleTheme()}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        themes[currentWebsite]?.enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          themes[currentWebsite]?.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Theme Manager */}
              <ThemeManager currentWebsite={currentWebsite} />
            </div>
          )
        ) : (
          <SettingsPanel />
        )}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {t('sidebar.keyboardShortcuts')}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
