import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_start"
}

import "~content-scripts/injector"
