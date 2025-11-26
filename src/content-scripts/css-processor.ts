export class CSSProcessor {
  private darkModeStyles: string = `
    /* Theme Hub Dark Mode Styles */
    html[data-theme-hub-dark] {
      filter: invert(1) hue-rotate(180deg);
    }
    
    html[data-theme-hub-dark] img,
    html[data-theme-hub-dark] video,
    html[data-theme-hub-dark] iframe,
    html[data-theme-hub-dark] canvas,
    html[data-theme-hub-dark] svg {
      filter: invert(1) hue-rotate(180deg);
    }
    
    html[data-theme-hub-dark] [data-theme-hub-preserve] {
      filter: none !important;
    }
  `;
  
  process(css: string, website: string): string {
    // Add website-specific scoping if needed
    let processedCSS = this.scopeCSS(css, website);
    
    // Add vendor prefixes
    processedCSS = this.addVendorPrefixes(processedCSS);
    
    return processedCSS;
  }
  
  generateDarkModeCSS(website: string): string {
    return `
      /* Theme Hub Dark Mode for ${website} */
      html[data-theme-hub-dark-${website.replace(/\./g, '-')}],
      html[data-theme-hub-dark] {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
      }
      
      html[data-theme-hub-dark-${website.replace(/\./g, '-')}] body,
      html[data-theme-hub-dark] body {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
      }
      
      html[data-theme-hub-dark-${website.replace(/\./g, '-')}] *:not(img):not(video):not(iframe):not(canvas):not(svg),
      html[data-theme-hub-dark] *:not(img):not(video):not(iframe):not(canvas):not(svg) {
        background-color: transparent !important;
        color: inherit !important;
      }
      
      ${this.darkModeStyles}
    `;
  }
  
  private scopeCSS(css: string, website: string): string {
    // For now, return CSS as-is
    // In future, could add website-specific scoping
    return css;
  }
  
  private addVendorPrefixes(css: string): string {
    // Add common vendor prefixes
    const prefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];
    const properties = ['transform', 'transition', 'animation', 'border-radius', 'box-shadow'];
    
    let processedCSS = css;
    
    properties.forEach(prop => {
      const regex = new RegExp(`\\b${prop}\\s*:`, 'g');
      processedCSS = processedCSS.replace(regex, (match) => {
        return prefixes.map(prefix => `${prefix}${match}`).join('') + match;
      });
    });
    
    return processedCSS;
  }
  
  detectExistingDarkMode(): boolean {
    // Check if website already has dark mode
    const darkModeSelectors = [
      '[data-theme="dark"]',
      '[data-mode="dark"]',
      '.dark-mode',
      '.dark',
      '[class*="dark"]'
    ];
    
    return darkModeSelectors.some(selector => {
      return document.querySelector(selector) !== null;
    });
  }
  
  smartInvertColors(): string {
    return `
      /* Smart color inversion that preserves important elements */
      .theme-hub-smart-invert {
        filter: invert(1) hue-rotate(180deg);
      }
      
      .theme-hub-smart-invert img,
      .theme-hub-smart-invert video,
      .theme-hub-smart-invert iframe,
      .theme-hub-smart-invert canvas,
      .theme-hub-smart-invert svg,
      .theme-hub-smart-invert [data-theme-hub-preserve] {
        filter: invert(1) hue-rotate(180deg);
      }
    `;
  }
}