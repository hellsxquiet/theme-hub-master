import React, { useState } from 'react';
import { Plus, Edit, Trash2, Download, Upload, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CodeEditor } from './CodeEditor';

interface ThemeManagerProps {
  currentWebsite: string;
}

export function ThemeManager({ currentWebsite }: ThemeManagerProps) {
  const { t } = useTranslation();
  const [showEditor, setShowEditor] = useState(false);
  const [cssCode, setCssCode] = useState('/* Enter your custom CSS here */');
  const [jsCode, setJsCode] = useState('// Enter your custom JavaScript here');
  const [themeName, setThemeName] = useState('');
  
  const handleSaveTheme = async () => {
    try {
      await chrome.runtime.sendMessage({
        type: 'THEME_APPLY',
        payload: {
          website: currentWebsite,
          name: themeName || 'Custom Theme',
          css: cssCode,
          js: jsCode
        }
      });
      
      setShowEditor(false);
      setCssCode('/* Enter your custom CSS here */');
      setJsCode('// Enter your custom JavaScript here');
      setThemeName('');
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };
  
  const handleTestTheme = () => {
    // Apply theme temporarily for testing
    chrome.runtime.sendMessage({
      type: 'THEME_APPLY',
      payload: {
        website: currentWebsite,
        name: 'Test Theme',
        css: cssCode,
        js: jsCode
      }
    });
  };
  
  const handleImportTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const theme = JSON.parse(e.target?.result as string);
            setCssCode(theme.css || '');
            setJsCode(theme.js || '');
            setThemeName(theme.name || '');
            setShowEditor(true);
          } catch (error) {
            console.error("Error importing theme:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  
  const handleExportTheme = () => {
    const theme = {
      name: themeName || 'Custom Theme',
      website: currentWebsite,
      css: cssCode,
      js: jsCode,
      createdAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${currentWebsite}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (showEditor) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Create Theme</h3>
          <button
            onClick={() => setShowEditor(false)}
            className="text-sm text-primary hover:text-primary-dark"
          >
            Back
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme Name
          </label>
          <input
            type="text"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            placeholder="My Custom Theme"
            className="input-base"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CSS Styles
          </label>
          <CodeEditor
            language="css"
            value={cssCode}
            onChange={setCssCode}
            placeholder="/* Enter your custom CSS here */"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JavaScript Code (Optional)
          </label>
          <CodeEditor
            language="javascript"
            value={jsCode}
            onChange={setJsCode}
            placeholder="// Enter your custom JavaScript here"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleTestTheme}
            className="flex-1 btn-secondary flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Test</span>
          </button>
          <button
            onClick={handleSaveTheme}
            className="flex-1 btn-primary"
          >
            Save Theme
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleImportTheme}
            className="flex-1 btn-secondary flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button
            onClick={handleExportTheme}
            className="flex-1 btn-secondary flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Manager</h3>
        <button
          onClick={() => setShowEditor(true)}
          className="btn-primary flex items-center space-x-2 text-sm px-3 py-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Theme</span>
        </button>
      </div>
      
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          No custom themes for this website yet.
        </div>
        <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">
          Click "New Theme" to create one
        </div>
      </div>
    </div>
  );
}