import { useState, useEffect } from 'react';

export function useWebsite() {
  const [currentWebsite, setCurrentWebsite] = useState<string>('');
  const [websiteName, setWebsiteName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadCurrentWebsite();
  }, []);
  
  const loadCurrentWebsite = async () => {
    try {
      // Get the active tab
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tabs[0] && tabs[0].url) {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;
        const domain = hostname.replace('www.', '');
        
        setCurrentWebsite(domain);
        
        // Get website name from hostname or page title
        const websiteTitle = tabs[0].title || domain;
        setWebsiteName(websiteTitle);
      } else {
        setCurrentWebsite('unknown');
        setWebsiteName('Unknown Website');
      }
    } catch (error) {
      console.error("Error loading current website:", error);
      setCurrentWebsite('unknown');
      setWebsiteName('Unknown Website');
    } finally {
      setLoading(false);
    }
  };
  
  return {
    currentWebsite,
    websiteName,
    loading,
    loadCurrentWebsite
  };
}