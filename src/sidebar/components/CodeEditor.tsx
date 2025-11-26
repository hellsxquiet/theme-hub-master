import React, { useRef, useEffect } from 'react';

interface CodeEditorProps {
  language: 'css' | 'javascript';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export function CodeEditor({ language, value, onChange, placeholder, height = '200px' }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key handling
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };
  
  const getLanguageLabel = () => (language === 'css' ? 'CSS' : 'JavaScript');
  
  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 border-b border-gray-300 dark:border-gray-600 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {getLanguageLabel()}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            title="Copy code"
          >
            Copy
          </button>
          <button
            onClick={() => {
              onChange('');
            }}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            title="Clear code"
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full p-3 font-mono text-sm code-editor bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none"
        style={{ minHeight: height, maxHeight: '400px' }}
        spellCheck={false}
      />
    </div>
  );
}
