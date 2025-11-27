import { highlight, languages } from "prismjs"
import React from "react"
import Editor from "react-simple-code-editor"

import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-css"
import "prismjs/themes/prism-tomorrow.css"

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLTextAreaElement
    const start = target.selectionStart
    const end = target.selectionEnd

    if (e.key === "Tab") {
      e.preventDefault()
      const newValue = value.substring(0, start) + "  " + value.substring(end)
      onChange(newValue)

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
      }, 0)
    } else if (e.key === "{") {
      e.preventDefault()
      const newValue = value.substring(0, start) + "{}" + value.substring(end)
      onChange(newValue)

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1
      }, 0)
    } else if (e.key === "Enter") {
      const charBefore = value.substring(start - 1, start)
      const charAfter = value.substring(end, end + 1)

      if (charBefore === "{" && charAfter === "}") {
        e.preventDefault()
        const newValue =
          value.substring(0, start) + "\n  \n" + value.substring(end)
        onChange(newValue)

        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 3
        }, 0)
      }
    }
  }

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden flex flex-col">
      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 border-b border-gray-300 dark:border-gray-600 flex items-center justify-between shrink-0">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {getLanguageLabel()}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(value)
            }}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            title="Copy code">
            Copy
          </button>
          <button
            onClick={() => {
              onChange("")
            }}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            title="Clear code">
            Clear
          </button>
        </div>
      </div>
      <div
        className="relative bg-[#2d2d2d] text-[#ccc] caret-white overflow-auto"
        style={{ height, minHeight: height, maxHeight: "400px" }}>
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={(code) =>
            highlight(
              code,
              language === "css" ? languages.css : languages.javascript,
              language
            )
          }
          padding={12}
          placeholder={placeholder}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight: "100%"
          }}
          className="min-h-full"
          textareaClassName="focus:outline-none"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
