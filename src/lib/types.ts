export interface OGPData {
  url: string;
  meta: {
    standard: {
      title: string;
      description: string;
      keywords: string;
      author: string;
      robots: string;
      canonical: string;
      language: string;
    };
    og: {
      "og:title": string;
      "og:description": string;
      "og:type": string;
      "og:url": string;
      "og:image": string;
      "og:site_name": string;
      "og:locale": string;
    };
    twitter: {
      "twitter:card": string;
      "twitter:site": string;
      "twitter:creator": string;
      "twitter:title": string;
      "twitter:description": string;
      "twitter:image": string;
    };
    extra: {
      "theme-color": string;
      "application-name": string;
    };
    meta: {
      score: number;
      reasoning: string;
    };
  };
  ogpImage: string | null;
  creditsRemaining: number;
}
