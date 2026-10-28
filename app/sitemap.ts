import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

// Regenerated hourly so scheduled blog posts are listed on their publish date.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const latestPost = posts[0]?.date;

  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.8 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts
      // Reposts point search engines at the original instead
      .filter((post) => !post.canonical)
      .map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
