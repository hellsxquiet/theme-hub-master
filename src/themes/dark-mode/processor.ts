export class DarkModeProcessor {
  private isEnabled: boolean = false;
  private website: string;
  private styleElement: HTMLStyleElement | null = null;
  
  constructor(website: string) {
    this.website = website;
  }
  
  enable(): void {
    if (this.isEnabled) return;
    
    this.isEnabled = true;
    this.applyDarkMode();
  }
  
  disable(): void {
    if (!this.isEnabled) return;
    
    this.isEnabled = false;
    this.removeDarkMode();
  }
  
  toggle(): boolean {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.isEnabled;
  }
  
  private applyDarkMode(): void {
    // Add dark mode attribute to html element
    const htmlElement = document.documentElement;
    htmlElement.setAttribute(`data-theme-hub-dark-${this.website.replace(/\./g, '-')}`, 'true');
    htmlElement.setAttribute('data-theme-hub-dark', 'true');
    
    // Create and inject dark mode styles
    this.styleElement = document.createElement('style');
    this.styleElement.id = `theme-hub-dark-mode-${this.website}`;
    this.styleElement.textContent = this.generateDarkModeCSS();
    
    document.head.appendChild(this.styleElement);
    
    // Apply smart inversion to preserve important elements
    this.applySmartInversion();
  }
  
  private removeDarkMode(): void {
    // Remove dark mode attributes
    const htmlElement = document.documentElement;
    htmlElement.removeAttribute(`data-theme-hub-dark-${this.website.replace(/\./g, '-')}`);
    
    // Check if any other websites have dark mode enabled
    const hasOtherDarkMode = Array.from(htmlElement.attributes).some(attr =>
      attr.name.startsWith('data-theme-hub-dark-')
    );
    
    if (!hasOtherDarkMode) {
      htmlElement.removeAttribute('data-theme-hub-dark');
    }
    
    // Remove style element
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
    
    // Remove smart inversion
    this.removeSmartInversion();
  }
  
  private generateDarkModeCSS(): string {
    return `
      /* Theme Hub Dark Mode for ${this.website} */
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
        filter: none !important;
      }
      
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] body {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
      }
      
      /* Common elements that should be dark */
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] div,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] section,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] article,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] aside,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] main,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] nav,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] header,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] footer {
        background-color: transparent !important;
        color: inherit !important;
      }
      
      /* Text elements */
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] h1,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] h2,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] h3,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] h4,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] h5,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] h6,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] p,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] span,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] a,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] li,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] td,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] th {
        color: #ffffff !important;
      }
      
      /* Links */
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] a {
        color: #60a5fa !important;
      }
      
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] a:hover {
        color: #93c5fd !important;
      }
      
      /* Form elements */
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] input,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] textarea,
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] select {
        background-color: #2d2d2d !important;
        color: #ffffff !important;
        border-color: #404040 !important;
      }
      
      /* Buttons */
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] button {
        background-color: #2d2d2d !important;
        color: #ffffff !important;
        border-color: #404040 !important;
      }
      
      html[data-theme-hub-dark-${this.website.replace(/\./g, '-')}] button:hover {
        background-color: #404040 !important;
      }
    `;
  }
  
  private applySmartInversion(): void {
    // Find images, videos, and other media that should not be inverted
    const mediaElements = document.querySelectorAll('img, video, iframe, canvas, svg');
    mediaElements.forEach(element => {
      if (!element.hasAttribute('data-theme-hub-preserve')) {
        element.setAttribute('data-theme-hub-preserve', 'true');
      }
    });
    
    // Find elements that already have dark backgrounds
    const darkElements = document.querySelectorAll('[style*="background-color"], [class*="dark"]');
    darkElements.forEach(element => {
      const style = window.getComputedStyle(element);
      const bgColor = style.backgroundColor;
      
      if (bgColor && this.isDarkColor(bgColor)) {
        element.setAttribute('data-theme-hub-preserve', 'true');
      }
    });
  }
  
  private removeSmartInversion(): void {
    // Remove preserve attributes added by us
    const elements = document.querySelectorAll('[data-theme-hub-preserve="true"]');
    elements.forEach(element => {
      // Only remove if it wasn't originally there
      if (!element.getAttribute('data-theme-hub-original-preserve')) {
        element.removeAttribute('data-theme-hub-preserve');
      }
    });
  }
  
  private isDarkColor(color: string): boolean {
    // Convert color to RGB and check brightness
    const rgb = this.parseColor(color);
    if (!rgb) return false;
    
    // Calculate perceived brightness
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness < 128;
  }
  
  private parseColor(color: string): { r: number; g: number; b: number } | null {
    // Handle rgb() format
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3])
      };
    }
    
    // Handle rgba() format (ignore alpha)
    const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1]),
        g: parseInt(rgbaMatch[2]),
        b: parseInt(rgbaMatch[3])
      };
    }
    
    return null;
  }
  
  isActive(): boolean {
    return this.isEnabled;
  }
}