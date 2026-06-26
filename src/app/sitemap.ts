import type { MetadataRoute } from "next";
import { absoluteUrl, areas, getServiceAreaPaths, services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseRoutes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/areas", priority: 0.85 },
    { path: "/contact", priority: 0.8 },
  ];

  const serviceRoutes = services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.82,
  }));

  const areaRoutes = areas.map((area) => ({
    path: `/areas/${area.slug}`,
    priority: 0.78,
  }));

  const serviceAreaRoutes = getServiceAreaPaths().map(({ area, service }) => ({
    path: `/areas/${area}/${service}`,
    priority: 0.72,
  }));

  return [...baseRoutes, ...serviceRoutes, ...areaRoutes, ...serviceAreaRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
