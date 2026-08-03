import type { MetadataRoute } from "next";
import { getPanelsWithBrochures } from "@/lib/brochures";

const SITE_URL = "https://stephensmolecular.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const panelRoutes = getPanelsWithBrochures().map((panel) => ({
    url: `${SITE_URL}/panels/${panel.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    "/privacy",
    "/compatible-instruments",
    "/validation-services",
    "/build-your-molecular-laboratory",
    "/resources",
    "/compare-panels",
    "/faq",
    "/solutions",
    "/request-pricing/confirmation",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...staticRoutes,
    ...panelRoutes,
  ];
}
