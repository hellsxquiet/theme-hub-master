import React from "react"
import { Toaster as SonnerToaster } from "sonner"

export function Toast() {
  return (
    <SonnerToaster
      position="bottom-center"
      theme="system"
      richColors
      closeButton
      duration={3000}
      offset={24}
      className="toaster-custom"
      toastOptions={{
        className: "th-toast",
        unstyled: true,
      }}
    />
  )
}
