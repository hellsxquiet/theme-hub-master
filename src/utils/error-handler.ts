import type { ExtensionSettings } from "~types"
import logger from "~utils/logger"
import React from "react"
import { CheckCircle, XCircle } from "lucide-react"

type ErrorContext = {
  source?: string
  action?: string
  info?: Record<string, any>
}

function toMessage(error: unknown): string {
  if (typeof error === "string") return error
  if (error && typeof error === "object" && "message" in error) {
    return String((error as any).message || "Unknown error")
  }
  if (typeof Event !== "undefined" && error instanceof Event) {
    const t = (error as Event).type
    return t ? `Event: ${t}` : "Event"
  }
  try {
    return JSON.stringify(error)
  } catch {
    return "Unknown error"
  }
}

async function persistError(entry: {
  message: string
  stack?: string
  context?: ErrorContext
}) {
  try {
    const now = new Date().toISOString()
    const item = { ...entry, timestamp: now }
    const current = await chrome.storage.local.get(["themeHubErrors"]) // { themeHubErrors?: any[] }
    const list: any[] = (current?.themeHubErrors as any[]) || []
    list.unshift(item)
    if (list.length > 50) list.length = 50
    await chrome.storage.local.set({ themeHubErrors: list })
  } catch (e) {
    // storage errors should not break the UI
    logger.warn("Failed to persist error", e)
  }
}

export async function handleError(error: unknown, context?: ErrorContext) {
  const message = toMessage(error)
  const stack = (error as any)?.stack as string | undefined
  logger.error("Error:", { message, context, stack })

  await persistError({ message, stack, context })

  if (typeof window !== "undefined") {
    try {
      const { toast } = await import("sonner")
      if (!/^Event:?\b/.test(message)) {
        toast.error("Error", {
          description: message,
          dismissible: true,
          duration: 3500,
          icon: React.createElement(XCircle, { size: 18 })
        })
      }
    } catch {
      // ignore toast load errors
    }
  }
}

export async function handleSuccess(message: string, context?: ErrorContext) {
  logger.info(message, context)
}

export async function clearStoredErrors() {
  try {
    await chrome.storage.local.set({ themeHubErrors: [] })
  } catch (e) {
    logger.warn("Failed to clear stored errors", e)
  }
}
