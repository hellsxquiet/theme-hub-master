import { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Toaster } from "sonner"
import { handleError } from "~utils/error-handler"

function Fallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div style={{ padding: 12 }}>
      <h3>Popup crashed</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error?.message}</pre>
      <button onClick={resetErrorBoundary} style={{ marginTop: 8 }}>Retry</button>
    </div>
  )
}

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <ErrorBoundary FallbackComponent={Fallback} onError={(error) => handleError(error, { source: "Popup ErrorBoundary" })}>
        <div
          style={{
            padding: 16
          }}>
          <h2>
            Welcome to your{" "}
            <a href="https://www.plasmo.com" target="_blank">
              Plasmo
            </a>{" "}
            Extension!
          </h2>
          <input onChange={(e) => setData(e.target.value)} value={data} />
          <a href="https://docs.plasmo.com" target="_blank">
            View Docs
          </a>
        </div>
      </ErrorBoundary>
    </>
  )
}

export default IndexPopup
