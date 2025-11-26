import type { WebsiteTheme } from "~types";

export class ThemeValidator {
  static validateTheme(theme: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check required fields
    if (!theme.id || typeof theme.id !== 'string') {
      errors.push('Theme ID is required and must be a string');
    }
    
    if (!theme.website || typeof theme.website !== 'string') {
      errors.push('Website is required and must be a string');
    }
    
    if (!theme.name || typeof theme.name !== 'string') {
      errors.push('Theme name is required and must be a string');
    }
    
    if (theme.css === undefined || typeof theme.css !== 'string') {
      errors.push('CSS is required and must be a string');
    }
    
    // Validate optional fields
    if (theme.js !== undefined && typeof theme.js !== 'string') {
      errors.push('JavaScript must be a string if provided');
    }
    
    if (theme.darkMode !== undefined && typeof theme.darkMode !== 'boolean') {
      errors.push('Dark mode must be a boolean if provided');
    }
    
    if (theme.enabled !== undefined && typeof theme.enabled !== 'boolean') {
      errors.push('Enabled must be a boolean if provided');
    }
    
    // Validate CSS syntax (basic check)
    if (theme.css && !this.isValidCSS(theme.css)) {
      errors.push('CSS syntax appears to be invalid');
    }
    
    // Validate JavaScript syntax (basic check)
    if (theme.js && !this.isValidJavaScript(theme.js)) {
      errors.push('JavaScript syntax appears to be invalid');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  private static isValidCSS(css: string): boolean {
    try {
      // Basic CSS validation - check for balanced braces
      const openBraces = (css.match(/\{/g) || []).length;
      const closeBraces = (css.match(/\}/g) || []).length;
      
      if (openBraces !== closeBraces) {
        return false;
      }
      
      // Check for basic CSS syntax patterns
      const cssPattern = /([^{}]+)\{([^}]+)\}/g;
      const matches = css.match(cssPattern);
      
      return matches !== null || css.trim() === '';
    } catch {
      return false;
    }
  }
  
  private static isValidJavaScript(js: string): boolean {
    try {
      // Basic JavaScript validation using Function constructor
      if (js.trim() === '') return true;
      
      // Try to parse as JavaScript
      new Function(js);
      return true;
    } catch {
      return false;
    }
  }
  
  static sanitizeCSS(css: string): string {
    // Remove potentially dangerous CSS
    let sanitized = css;
    
    // Remove @import statements
    sanitized = sanitized.replace(/@import\s+[^;]+;/gi, '');
    
    // Remove JavaScript URLs
    sanitized = sanitized.replace(/javascript:/gi, '');
    
    // Remove data URLs that could contain scripts
    sanitized = sanitized.replace(/data:text\/html[^)]*/gi, '');
    
    return sanitized;
  }
  
  static sanitizeJavaScript(js: string): string {
    // Remove potentially dangerous JavaScript
    let sanitized = js;
    
    // Remove eval() calls
    sanitized = sanitized.replace(/eval\s*\(/gi, '// eval removed: ');
    
    // Remove Function constructor calls
    sanitized = sanitized.replace(/new\s+Function\s*\(/gi, '// Function constructor removed: ');
    
    // Remove document.write calls
    sanitized = sanitized.replace(/document\.write\s*\(/gi, '// document.write removed: ');
    
    // Remove window.location assignments that could redirect
    sanitized = sanitized.replace(/window\.location\s*=/gi, '// window.location assignment removed: ');
    
    return sanitized;
  }
  
  static validateThemeName(name: string): { isValid: boolean; error?: string } {
    if (!name || name.trim().length === 0) {
      return { isValid: false, error: 'Theme name cannot be empty' };
    }
    
    if (name.length > 50) {
      return { isValid: false, error: 'Theme name must be 50 characters or less' };
    }
    
    if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
      return { isValid: false, error: 'Theme name can only contain letters, numbers, spaces, hyphens, and underscores' };
    }
    
    return { isValid: true };
  }
}
