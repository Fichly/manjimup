import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { stations } from "@/data/stations";
import { legal } from "@/data/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...stations.map((s) => ({
      url: `${site.url}/stations/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
  if (legal.published) {
    entries.push(
      ...["/mentions-legales", "/cgv", "/confidentialite"].map((path) => ({
        url: `${site.url}${path}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.2,
      })),
    );
  }
  return entries;
}
