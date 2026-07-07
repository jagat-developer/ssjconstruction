import type { MetadataRoute } from "next";
import { absoluteUrl, areas, getServiceAreaPaths, services } from "@/lib/site-data";
import { getBlogImage, getBlogIsoDate, getBlogPath, getPublishedBlogs } from "@/lib/uplift-blogs";

type SitemapRoute = {
  path: string;
  priority: number;
  lastModified?: string;
  images?: string[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogs = await getPublishedBlogs();
  const baseRoutes: SitemapRoute[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/areas", priority: 0.85 },
    { path: "/blog", priority: 0.78 },
    { path: "/contact", priority: 0.8 },
  ];

  const serviceRoutes: SitemapRoute[] = services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.82,
  }));

  const areaRoutes: SitemapRoute[] = areas.map((area) => ({
    path: `/areas/${area.slug}`,
    priority: 0.78,
  }));

  const serviceAreaRoutes: SitemapRoute[] = getServiceAreaPaths().map(({ area, service }) => ({
    path: `/areas/${area}/${service}`,
    priority: 0.72,
  }));

  const blogRoutes: SitemapRoute[] = blogs.map((blog) => ({
    path: getBlogPath(blog),
    priority: 0.7,
    lastModified: getBlogIsoDate(blog),
    images: [getBlogImage(blog)],
  }));

  return [...baseRoutes, ...serviceRoutes, ...areaRoutes, ...serviceAreaRoutes, ...blogRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified ? new Date(route.lastModified) : now,
    changeFrequency: "weekly",
    priority: route.priority,
    images: route.images?.map(absoluteUrl),
  }));
}
