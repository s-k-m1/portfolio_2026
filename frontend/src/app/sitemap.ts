import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getProjects, getBlogPosts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projects = await getProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${url}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const posts = await getBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${url}/blog/${post.id}`,
    lastModified: new Date(post.created_at),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}