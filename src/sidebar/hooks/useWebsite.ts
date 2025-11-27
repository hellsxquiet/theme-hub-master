import { useEffect, useState } from "react"

import logger from "~utils/logger"
import { WebsiteDetector } from "~utils/website-detector"

const CHROME_INTERNAL_NAME_MAP: Record<
  string,
  string | { name: string; category: string }
> = {
  accessibility: "Chrome Accessibility",
  "actor-overlay": "Chrome Actor",
  "app-service-internals": "Chrome Internals",
  "app-settings": "App Settings",
  "attribution-internals": "Attribution Internals",
  "autofill-internals": "Autofill Internals",
  "batch-upload": "Chrome Batch Uploader",
  "blob-internals": "Blob Internals",
  "bluetooth-internals": "Bluetooth Internals",
  bookmarks: "Chrome Bookmarks",
  "bookmarks-side-panel.top-chrome": "Bookmarks Side Panel",
  "browser-switch": "Browser Switch",
  "cast-feedback": "Cast Feedback",
  "certificate-manager": "Certificate Manager",
  chrome: "About Chrome",
  "chrome-signin": "Chrome Sign-in",
  "chrome-urls": "Chrome URLs",
  components: "Chrome Components",
  conflicts: "Chrome Conflicts",
  "connection-help": "Connection Help",
  "connection-monitoring-detected": "Connection Monitoring Detected",
  "connectors-internals": "Connectors Internals",
  "contextual-tasks": "Contextual Tasks",
  crashes: "Chrome Crashes",
  credits: "Chrome Credits",
  "customize-chrome-side-panel.top-chrome": "Customize Chrome Side Panel",
  "debug-webuis-disabled": "Debug WebUIs Disabled",
  "device-log": "Device Log",
  dino: "Chrome Dino Game",
  downloads: "Chrome Downloads",
  extensions: "Chrome Extensions",
  "extensions-internals": "Extensions Internals",
  "extensions-zero-state": "Extensions Zero State",
  feedback: "Chrome Feedback",
  flags: "Chrome Flags",
  "gcm-internals": "GCM Internals",
  glic: "Chrome GLIC",
  "glic-fre": "Chrome GLIC Free",
  gpu: "GPU Internals",
  histograms: "Chrome Histograms",
  history: "Chrome History",
  "history-clusters-side-panel.top-chrome": "History Clusters Side Panel",
  "history-side-panel.top-chrome": "History Side Panel",
  "history-sync-optin": "History Sync Opt-in",
  "indexeddb-internals": "IndexedDB Internals",
  inspect: "Inspect",
  internals: "Chrome Internals",
  intro: "Chrome Intro",
  "managed-user-profile-notice": "Managed Profile Notice",
  management: "Management",
  "media-engagement": "Media Engagement",
  "media-internals": "Media Internals",
  "metrics-internals": "Metrics Internals",
  "net-export": "Network Export",
  "net-internals": "Network Internals",
  "new-tab-page": "New Tab Page",
  "new-tab-page-third-party": "Third-Party New Tab Page",
  newtab: "New Tab Page",
  "newtab-footer": "New Tab Footer",
  "ntp-tiles-internals": "NTP Tiles Internals",
  "omnibox-popup.top-chrome": "Omnibox Popup",
  "on-device-translation-internals": "On-Device Translation Internals",
  "password-manager": "Password Manager",
  "password-manager-internals": "Password Manager Internals",
  policy: "Policy",
  predictors: "Predictors",
  print: "Print",
  "privacy-sandbox-base-dialog": "Privacy Sandbox Base Dialog",
  "privacy-sandbox-dialog": "Privacy Sandbox Dialog",
  "privacy-sandbox-internals": "Privacy Sandbox Internals",
  "private-aggregation-internals": "Private Aggregation Internals",
  "process-internals": "Process Internals",
  "profile-customization": "Profile Customization",
  "profile-internals": "Profile Internals",
  "profile-picker": "Profile Picker",
  "quota-internals": "Quota Internals",
  "read-later.top-chrome": "Read Later",
  "reset-password": "Reset Password",
  sandbox: "Privacy Sandbox",
  "saved-tab-groups-unsupported": "Saved Tab Groups Unsupported",
  "search-engine-choice": "Search Engine Choice",
  "segmentation-internals": "Segmentation Internals",
  "serviceworker-internals": "Service Worker Internals",
  settings: "Settings",
  "shopping-insights-side-panel.top-chrome": "Shopping Insights Side Panel",
  "signin-dice-web-intercept.top-chrome": "Sign-in DICE Web Intercept",
  "signin-email-confirmation": "Sign-in Email Confirmation",
  "signin-error": "Sign-in Error",
  "signin-internals": "Sign-in Internals",
  "signout-confirmation": "Sign-out Confirmation",
  "site-engagement": "Site Engagement",
  "suggest-internals": "Suggest Internals",
  "support-tool": "Support Tool",
  "sync-confirmation": "Sync Confirmation",
  "sync-internals": "Sync Internals",
  system: "System",
  "tab-group-home": "Tab Group Home",
  "tab-search.top-chrome": "Tab Search",
  "tab-strip.top-chrome": "Tab Strip",
  terms: "Terms of Service",
  "topics-internals": "Topics Internals",
  "translate-internals": "Translate Internals",
  "usb-internals": "USB Internals",
  version: "Chrome Version",
  "view-cert": "View Certificate",
  watermark: "Watermark",
  "web-app-internals": "Web App Internals",
  "webrtc-internals": "WebRTC Internals",
  "webui-browser": "WebUI Browser",
  "whats-new": "What’s New"
}

function getInternalDisplay(hostname: string): {
  name: string
  category: string
} {
  const entry = CHROME_INTERNAL_NAME_MAP[hostname]
  if (!entry) return { name: hostname, category: "Chrome Internal" }
  if (typeof entry === "string")
    return { name: entry, category: "Chrome Internal" }
  return entry
}

export function useWebsite() {
  const [currentWebsite, setCurrentWebsite] = useState<string>("")
  const [websiteName, setWebsiteName] = useState<string>("")
  const [websiteCategory, setWebsiteCategory] = useState<string>("Website")
  const [isSupported, setIsSupported] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCurrentWebsite()

    const handleTabActivated = () => {
      loadCurrentWebsite()
    }

    const handleTabUpdated = (
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) => {
      if (tab.active && (changeInfo.status === "complete" || changeInfo.url)) {
        loadCurrentWebsite()
      }
    }

    const handleWindowFocusChanged = () => {
      loadCurrentWebsite()
    }

    chrome.tabs.onActivated.addListener(handleTabActivated)
    chrome.tabs.onUpdated.addListener(handleTabUpdated)
    chrome.windows.onFocusChanged.addListener(handleWindowFocusChanged)

    return () => {
      chrome.tabs.onActivated.removeListener(handleTabActivated)
      chrome.tabs.onUpdated.removeListener(handleTabUpdated)
      chrome.windows.onFocusChanged.removeListener(handleWindowFocusChanged)
    }
  }, [])

  const loadCurrentWebsite = async () => {
    try {
      // Get the active tab
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })

      if (tabs[0] && tabs[0].url) {
        const url = new URL(tabs[0].url)
        const hostname = url.hostname
        const domain = hostname.replace("www.", "")
        const isChromeInternal = url.protocol === "chrome:"

        // Check if website is supported
        const detector = WebsiteDetector.getInstance()
        const isSupportedSite = detector.isSupportedWebsite(hostname)
        setIsSupported(isSupportedSite)

        setCurrentWebsite(domain)
        if (isChromeInternal) {
          const { name, category } = getInternalDisplay(hostname)
          setWebsiteName(name)
          setWebsiteCategory(category)
        } else {
          const websiteTitle = tabs[0].title || domain
          setWebsiteName(websiteTitle)
          setWebsiteCategory("Website")
        }
      } else {
        setCurrentWebsite("unknown")
        setWebsiteName("Unknown Website")
        setWebsiteCategory("Website")
        setIsSupported(false)
      }
    } catch (error) {
      logger.error("Error loading current website:", error)
      setCurrentWebsite("unknown")
      setWebsiteName("Unknown Website")
      setWebsiteCategory("Website")
      setIsSupported(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    currentWebsite,
    websiteName,
    websiteCategory,
    isSupported,
    loading,
    loadCurrentWebsite
  }
}
