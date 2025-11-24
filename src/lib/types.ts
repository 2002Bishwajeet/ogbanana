export interface OGPData {
  url: string;
  meta: {
    standard: {
      title: string;
      description: string;
      keywords: string;
      robots: string;
      canonical: string;
      language: string;
    };
    social: {
      title: string;
      description: string;
      site_name: string;
      twitter_card: string;
      twitter_handle: string;
    };
    assets: {
      theme_color: string;
      image_url_inference: string;
    };
    audit: {
      score: number;
      missing_elements: string[];
    };
  };
  ogpImage: string | null;
  creditsRemaining: number;
}
