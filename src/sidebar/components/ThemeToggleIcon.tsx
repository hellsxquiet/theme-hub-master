import React, { useId } from "react"

interface ThemeToggleIconProps {
  isDark: boolean
  className?: string
}

export function ThemeToggleIcon({ isDark, className = "" }: ThemeToggleIconProps) {
  const maskId = useId()

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-500 ease-in-out ${
        isDark ? "text-primary" : "text-yellow-500"
      }`}
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="black"
            className="transition-all duration-500 ease-[cubic-bezier(0,0,0.2,1)]"
            style={{
              transform: isDark ? "translate(4px, -4px)" : "translate(9px, -9px)",
            }}
          />
        </mask>
      </defs>

      <circle
        cx="12"
        cy="12"
        r={isDark ? "9" : "5"}
        fill="currentColor"
        mask={`url(#${maskId})`}
        className="transition-all duration-500 ease-[cubic-bezier(0,0,0.2,1)]"
      />

      <g
        className={`transition-all duration-500 ease-[cubic-bezier(0,0,0.2,1)] origin-center ${
          isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 1v2" />
        <path d="M12 21v2" />
        <path d="M4.22 4.22l1.42 1.42" />
        <path d="M18.36 18.36l1.42 1.42" />
        <path d="M1 12h2" />
        <path d="M21 12h2" />
        <path d="M4.22 19.78l1.42-1.42" />
        <path d="M18.36 5.64l1.42-1.42" />
      </g>
    </svg>
  )
}
