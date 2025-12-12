import Editor, { loader, useMonaco } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import React from "react"
// @ts-ignore
import editorWorkerUrl from "url:monaco-editor/esm/vs/editor/editor.worker.js"
// @ts-ignore
import cssWorkerUrl from "url:monaco-editor/esm/vs/language/css/css.worker.js"
// @ts-ignore
import tsWorkerUrl from "url:monaco-editor/esm/vs/language/typescript/ts.worker.js"

loader.config({ monaco })

interface CodeEditorProps {
  language: "css" | "javascript"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
}

export function CodeEditor({
  language,
  value,
  onChange,
  placeholder,
  height = "200px"
}: CodeEditorProps) {
  const getLanguageLabel = () => (language === "css" ? "CSS" : "JavaScript")
  const monacoInstance = useMonaco()

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden flex flex-col shadow-sm">
      <div className="bg-gray-50 dark:bg-zinc-800/50 px-3 py-2 border-b border-gray-200 dark:border-zinc-700 flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {getLanguageLabel()}
        </span>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(value)
            }}
            className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            title="Copy code">
            Copy
          </button>
          <button
            onClick={() => {
              onChange("")
            }}
            className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Clear code">
            Clear
          </button>
        </div>
      </div>
      <div
        className="relative bg-[#1e1e1e] overflow-hidden"
        style={{ height, minHeight: height, maxHeight: "400px" }}>
        {!value && placeholder ? (
          <div className="absolute inset-0 p-3 text-xs text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        ) : null}
        <Editor
          value={value}
          onChange={(v) => onChange(v || "")}
          language={language}
          theme="vs-dark"
          height="100%"
          options={{
            minimap: { enabled: false },
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            wordBasedSuggestions: "off",
            inlineSuggest: { enabled: false },
            parameterHints: { enabled: false },
            suggest: {
              showStatusBar: false,
              preview: false,
              snippetsPreventQuickSuggestions: true
            }
          }}
          beforeMount={(monaco) => {
            self.MonacoEnvironment = {
              getWorker: (_: any, label: string) => {
                if (label === "css" || label === "scss" || label === "less") {
                  return new Worker(cssWorkerUrl, { type: "module" })
                }
                if (label === "typescript" || label === "javascript") {
                  return new Worker(tsWorkerUrl, { type: "module" })
                }
                return new Worker(editorWorkerUrl, { type: "module" })
              }
            }
            monaco.languages.css.cssDefaults.setOptions({ validate: true })
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
              {
                noSemanticValidation: false,
                noSyntaxValidation: false
              }
            )
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
              checkJs: true,
              allowNonTsExtensions: true,
              target: monaco.languages.typescript.ScriptTarget.ES2020
            })
          }}
        />
      </div>
    </div>
  )
}
