import React from "react"
import { createRoot } from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"

import Sidebar from "./App"

import "./style.css"

import { handleError } from "~utils/error-handler"

function Fallback({
  error,
  resetErrorBoundary
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div style={{ padding: 16 }}>
      <h2>Something went wrong</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error?.message}</pre>
      <button onClick={resetErrorBoundary} style={{ marginTop: 8 }}>
        Retry
      </button>
    </div>
  )
}

function init() {
  const appContainer = document.querySelector("#app-container")
  if (!appContainer) {
    throw new Error("Can not find #app-container")
  }

  const root = createRoot(appContainer)
  // Global error listeners
  window.addEventListener("error", (ev) => {
    handleError(ev.error || ev.message, { source: "window.onerror" })
  })
  window.addEventListener("unhandledrejection", (ev: PromiseRejectionEvent) => {
    handleError(ev.reason, { source: "unhandledrejection" })
  })

  root.render(
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={(error) => handleError(error, { source: "ErrorBoundary" })}>
      <Sidebar />
    </ErrorBoundary>
  )
}

init()
