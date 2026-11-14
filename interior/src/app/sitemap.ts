import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.seo.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.seo.url}/privacy/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
