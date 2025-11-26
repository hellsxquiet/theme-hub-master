export function formatWebsiteName(hostname: string): string {
  // Remove www. and common subdomains
  const cleanHostname = hostname.replace(/^www\./, '');
  
  // Capitalize first letter
  return cleanHostname.charAt(0).toUpperCase() + cleanHostname.slice(1);
}

export function getWebsiteDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return 'unknown';
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function validateCSS(css: string): boolean {
  try {
    // Basic CSS validation - check for balanced braces
    const openBraces = (css.match(/\{/g) || []).length;
    const closeBraces = (css.match(/\}/g) || []).length;
    return openBraces === closeBraces;
  } catch {
    return false;
  }
}

export function validateJS(js: string): boolean {
  try {
    // Basic JavaScript validation using Function constructor
    new Function(js);
    return true;
  } catch {
    return false;
  }
}