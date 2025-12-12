import { DarkModeProcessor } from "~themes/dark-mode/processor"
import type { CSSInjector, JSInjector } from "~types"
import logger from "~utils/logger"

import { CSSProcessor } from "./css-processor"
import { JSExecutor } from "./js-executor"

class ThemeInjector implements CSSInjector, JSInjector {
  private cssMap: Map<string, string> = new Map()
  private jsMap: Map<string, string> = new Map()
  private styleElements: Map<string, HTMLStyleElement> = new Map()
  private scriptElements: Map<string, HTMLScriptElement> = new Map()
  private cssProcessor: CSSProcessor
  private jsExecutor: JSExecutor
  private darkModeProcessor: DarkModeProcessor

  private getWebsiteDomain(): string {
    const domain = window.location.hostname.replace("www.", "")
    logger.info(`Theme Hub: Detected domain: ${domain}`)
    return domain
  }

  constructor() {
    this.cssProcessor = new CSSProcessor()
    this.jsExecutor = new JSExecutor()
    this.darkModeProcessor = new DarkModeProcessor(this.getWebsiteDomain())
    this.initialize()
  }

  private initialize() {
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      logger.info("Content script received message:", message)

      switch (message.type) {
        case "THEME_APPLY":
          this.applyTheme(message.payload)
          break
        case "THEME_REMOVE":
          this.removeTheme(message.payload.website)
          break
        case "DARK_MODE_TOGGLE":
          this.toggleDarkMode(message.payload)
          break
        case "THEME_TOGGLE":
          this.toggleTheme(message.payload.website, message.payload.enabled)
          break
      }

      return true
    })

    // Auto-apply themes when page loads
    this.autoApplyThemes()
  }

  private async autoApplyThemes() {
    try {
      const website = this.getWebsiteDomain()

      // Request themes from background script
      const response = await chrome.runtime.sendMessage({
        type: "GET_THEMES"
      })

      if (response?.themes && response.themes[website]) {
        const theme = response.themes[website]
        if (theme.enabled) {
          this.applyTheme({
            website,
            css: theme.css,
            js: theme.js
          })
        }

        // Apply dark mode if enabled
        if (theme.darkMode) {
          this.darkModeProcessor.enable()
        }
      }
    } catch (error) {
      logger.error("Error auto-applying themes:", error)
    }
  }

  inject(css: string, website: string): void {
    this.applyCSS(css, website)
  }

  remove(website: string): void {
    this.removeCSS(website)
    this.removeJS(website)
  }

  update(css: string, website: string): void {
    this.removeCSS(website)
    this.applyCSS(css, website)
  }

  private applyCSS(css: string, website: string): void {
    try {
      // Remove existing CSS for this website
      this.removeCSS(website)

      // Process CSS (add prefixes, scope if needed)
      const processedCSS = this.cssProcessor.process(css, website)

      // Create style element
      const styleElement = document.createElement("style")
      styleElement.id = `theme-hub-css-${website}`
      styleElement.textContent = processedCSS
      styleElement.setAttribute("data-theme-hub", website)

      // Add to head
      document.head.appendChild(styleElement)

      // Store references
      this.cssMap.set(website, css)
      this.styleElements.set(website, styleElement)

      logger.info(`CSS applied for ${website}`)
    } catch (error) {
      logger.error(`Error applying CSS for ${website}:`, error)
    }
  }

  private removeCSS(website: string): void {
    try {
      const styleElement = this.styleElements.get(website)
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }

      this.cssMap.delete(website)
      this.styleElements.delete(website)

      logger.info(`CSS removed for ${website}`)
    } catch (error) {
      logger.error(`Error removing CSS for ${website}:`, error)
    }
  }

  private applyJS(js: string, website: string): void {
    try {
      // Remove existing JS for this website
      this.removeJS(website)

      // Create script element
      const scriptElement = document.createElement("script")
      scriptElement.id = `theme-hub-js-${website}`
      scriptElement.textContent = js
      scriptElement.setAttribute("data-theme-hub", website)

      // Add to head or body
      ;(document.head || document.body).appendChild(scriptElement)

      // Store references
      this.jsMap.set(website, js)
      this.scriptElements.set(website, scriptElement)

      logger.info(`JS applied for ${website}`)
    } catch (error) {
      logger.error(`Error applying JS for ${website}:`, error)
    }
  }

  private removeJS(website: string): void {
    try {
      const scriptElement = this.scriptElements.get(website)
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement)
      }

      this.jsMap.delete(website)
      this.scriptElements.delete(website)

      logger.info(`JS removed for ${website}`)
    } catch (error) {
      logger.error(`Error removing JS for ${website}:`, error)
    }
  }

  private applyTheme(payload: any) {
    const { website, css, js } = payload

    if (css) {
      this.applyCSS(css, website)
    }

    if (js) {
      this.applyJS(js, website)
    }
  }

  private removeTheme(website: string) {
    this.remove(website)
  }

  private toggleDarkMode(payload: { website: string; enabled?: boolean }) {
    logger.info(`Toggling dark mode for ${payload.website}`)
    const ensureThemeConsistency = async () => {
      try {
        const response = await chrome.runtime.sendMessage({ type: "GET_THEMES" })
        const website = this.getWebsiteDomain()
        const theme = response?.themes?.[website]
        if (theme && !theme.enabled) {
          this.removeTheme(website)
        }
      } catch (e) {
        logger.warn("Failed to ensure theme consistency during dark mode toggle", e)
      }
    }

    if (payload.enabled === undefined) {
      this.darkModeProcessor.toggle()
      ensureThemeConsistency()
      return
    }
    if (payload.enabled) {
      this.darkModeProcessor.enable()
      ensureThemeConsistency()
    } else {
      this.darkModeProcessor.disable()
    }
  }

  private toggleTheme(website: string, enabled?: boolean) {
    if (enabled !== undefined) {
      if (enabled) {
        this.autoApplyThemes()
      } else {
        this.removeTheme(website)
      }
      return
    }

    const currentCSS = this.cssMap.get(website)
    if (currentCSS) {
      this.removeTheme(website)
    } else {
      // Re-apply theme from storage
      this.autoApplyThemes()
    }
  }

  execute(js: string): Promise<any> {
    return this.jsExecutor.execute(js)
  }
}

// Initialize the injector
new ThemeInjector()
