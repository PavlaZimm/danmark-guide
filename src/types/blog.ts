export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  featuredImage?: string;
  tags: string[];
  readingTime: number; // minutes
  seo: {
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogPostMetadata {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  featuredImage?: string;
  tags: string[];
  readingTime: number;
}
