export class JSExecutor {
  private executedScripts: Map<string, boolean> = new Map();
  
  async execute(js: string): Promise<any> {
    try {
      // Create a safe execution context
      const scriptId = `theme-hub-script-${Date.now()}`;
      const wrappedJS = this.wrapInSafeContext(js, scriptId);
      
      // Execute the script
      const result = this.executeInContext(wrappedJS, scriptId);
      
      this.executedScripts.set(scriptId, true);
      
      return result;
    } catch (error) {
      logger.error("Error executing JavaScript:", error);
      throw error;
    }
  }
  
  private wrapInSafeContext(js: string, scriptId: string): string {
    return `
      (function() {
        try {
          const __baseConsole = globalThis.console;
          const console = {
            log: function(...args) { __baseConsole.log('[Theme Hub Script ${scriptId}]:', ...args); },
            error: function(...args) { __baseConsole.error('[Theme Hub Script ${scriptId}]:', ...args); },
            warn: function(...args) { __baseConsole.warn('[Theme Hub Script ${scriptId}]:', ...args); }
          };
          ${js}
          console.log('Script ${scriptId} executed successfully');
        } catch (error) {
          globalThis.console.error('Error in Theme Hub script ${scriptId}:', error);
        }
      })();
    `;
  }
  
  private executeInContext(js: string, scriptId: string): any {
    try {
      // Create a new script element
      const script = document.createElement('script');
      script.id = scriptId;
      script.textContent = js;
      script.setAttribute('data-theme-hub-script', 'true');
      
      // Add to page
      (document.head || document.body).appendChild(script);
      
      // Remove after execution
      setTimeout(() => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      }, 100);
      
      return { success: true, scriptId };
    } catch (error) {
      logger.error("Error executing script:", error);
      throw error;
    }
  }
  
  removeScript(scriptId: string): void {
    const script = document.getElementById(scriptId);
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
    this.executedScripts.delete(scriptId);
  }
  
  removeAllScripts(): void {
    const scripts = document.querySelectorAll('script[data-theme-hub-script="true"]');
    scripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    this.executedScripts.clear();
  }
}
import logger from "~utils/logger";
