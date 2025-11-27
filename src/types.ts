export interface ContentScriptMessage {
  type:
    | "THEME_APPLY"
    | "THEME_REMOVE"
    | "DARK_MODE_TOGGLE"
    | "THEME_TOGGLE"
    | "GET_THEMES"
    | "GET_SETTINGS"
    | "SAVE_SETTINGS"
  payload?: {
    website?: string
    themeId?: string
    css?: string
    js?: string
    enabled?: boolean
    settings?: ExtensionSettings
    temporary?: boolean
  }
}

export interface ThemeStorage {
  themes: Record<string, WebsiteTheme>
  settings: ExtensionSettings
}

export interface WebsiteTheme {
  id: string
  website: string
  name: string
  css: string
  js?: string
  darkMode: boolean
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface ExtensionSettings {
  language: "en" | "es" | "fr" | "de" | "pt" | "pl"
  keyboardShortcuts: Record<string, string>
  autoApply: boolean
  syncEnabled: boolean
}

export interface CSSInjector {
  inject(css: string, website: string): void
  remove(website: string): void
  update(css: string, website: string): void
}

export interface JSInjector {
  inject(js: string, website: string): void
  remove(website: string): void
  execute(js: string): Promise<any>
}
