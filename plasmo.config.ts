const config = {
  manifest: {
    permissions: [
      "storage",
      "activeTab",
      "scripting",
      "sidePanel",
      "tabs"
    ],
    host_permissions: [
      "<all_urls>"
    ],
    action: {
      default_title: "Open Theme Hub",
      default_icon: "icon.png"
    },
    commands: {
      "toggle-dark-mode": {
        suggested_key: {
          default: "Alt+D"
        },
        description: "Toggle dark mode"
      },
      "toggle-styles": {
        suggested_key: {
          default: "Alt+S"
        },
        description: "Toggle custom styles"
      },
      "open-sidebar": {
        suggested_key: {
          default: "Alt+T"
        },
        description: "Open Theme Hub sidebar"
      }
    },
    icons: {
      "16": "icon.png",
      "32": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    }
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content-scripts/injector.ts"],
      run_at: "document_start"
    }
  ],
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  side_panel: {
    default_path: "sidepanel.html"
  }
}

export default config
