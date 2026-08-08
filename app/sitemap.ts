import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { caseStudies } from "@/lib/data/case-studies";
import { blogPosts } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/case-studies",
    "/pricing",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
  ];

  const dynamicRoutes = [
    ...services.map((s) => `/services/${s.slug}`),
    ...caseStudies.map((c) => `/case-studies/${c.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
