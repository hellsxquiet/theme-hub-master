export class WebsiteDetector {
  private static instance: WebsiteDetector

  private constructor() {}

  static getInstance(): WebsiteDetector {
    if (!WebsiteDetector.instance) {
      WebsiteDetector.instance = new WebsiteDetector()
    }
    return WebsiteDetector.instance
  }

  detectCurrentWebsite(): string {
    return window.location.hostname.replace("www.", "")
  }

  getWebsiteName(hostname: string): string {
    // Common website name mappings
    const websiteNames: Record<string, string> = {
      "facebook.com": "Facebook",
      "twitter.com": "Twitter",
      "x.com": "X (Twitter)",
      "youtube.com": "YouTube",
      "instagram.com": "Instagram",
      "linkedin.com": "LinkedIn",
      "reddit.com": "Reddit",
      "amazon.com": "Amazon",
      "netflix.com": "Netflix",
      "spotify.com": "Spotify",
      "github.com": "GitHub",
      "stackoverflow.com": "Stack Overflow",
      "wikipedia.org": "Wikipedia",
      "cbsnews.com": "CBS News",
      "nytimes.com": "The New York Times",
      "cnn.com": "CNN",
      "bbc.com": "BBC",
      "medium.com": "Medium",
      "schoology.com": "Schoology"
    }

    return websiteNames[hostname] || this.capitalizeHostname(hostname)
  }

  private capitalizeHostname(hostname: string): string {
    return hostname
      .split(".")[0]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  getWebsiteCategory(hostname: string): string {
    // Categorize websites based on domain
    const categories: Record<string, string[]> = {
      social: [
        "facebook.com",
        "twitter.com",
        "x.com",
        "instagram.com",
        "linkedin.com",
        "reddit.com"
      ],
      news: ["cbsnews.com", "nytimes.com", "cnn.com", "bbc.com", "medium.com"],
      entertainment: ["netflix.com", "spotify.com", "youtube.com"],
      shopping: ["amazon.com"],
      development: ["github.com", "stackoverflow.com"],
      reference: ["wikipedia.org"],
      education: ["schoology.com"]
    }

    for (const [category, domains] of Object.entries(categories)) {
      if (domains.includes(hostname)) {
        return category
      }
    }

    return "other"
  }

  isSupportedWebsite(hostname: string): boolean {
    // Check if website is in our supported list or has general support
    const supportedWebsites = [
      "cbsnews.com",
      "nytimes.com",
      "cnn.com",
      "bbc.com",
      "medium.com",
      "facebook.com",
      "twitter.com",
      "x.com",
      "youtube.com",
      "instagram.com",
      "linkedin.com",
      "reddit.com",
      "amazon.com",
      "netflix.com",
      "spotify.com",
      "github.com",
      "stackoverflow.com",
      "wikipedia.org",
      "schoology.com"
    ]

    // Check if hostname is exactly in supported list or is a subdomain of a supported site
    return supportedWebsites.some(
      (site) => hostname === site || hostname.endsWith("." + site)
    )
  }
}
