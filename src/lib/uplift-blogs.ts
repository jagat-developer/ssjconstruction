import { cache } from "react";

const UPLIFT_API_BASE = "https://api.upliftai.co/api/public/v1";
const BLOG_REVALIDATE_SECONDS = 3600;
const DEFAULT_BLOG_IMAGE = "/images/ssj-living-room-fireplace.jpg";

type ApiResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      status?: number;
    };

type BlogMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

export type UpliftBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  meta: BlogMeta;
  customFields: Record<string, unknown>;
};

type BlogListResponse = {
  blogs?: unknown[];
};

type BlogDetailResponse = {
  blog?: unknown;
};

function getToken() {
  return process.env.UPLIFTAI_API_TOKEN ?? process.env.UPLIFT_API_TOKEN ?? "";
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function normalizeMeta(value: unknown): BlogMeta {
  const raw = asRecord(value);

  return {
    seoTitle: asString(raw.seoTitle) || undefined,
    seoDescription: asString(raw.seoDescription) || undefined,
    focusKeyword: asString(raw.focusKeyword) || undefined,
    keywords: asStringArray(raw.keywords),
    ogTitle: asString(raw.ogTitle) || undefined,
    ogDescription: asString(raw.ogDescription) || undefined,
    ogType: asString(raw.ogType) || undefined,
    ogUrl: asString(raw.ogUrl) || undefined,
    ogSiteName: asString(raw.ogSiteName) || undefined,
    ogLocale: asString(raw.ogLocale) || undefined,
    articleAuthor: asString(raw.articleAuthor) || undefined,
    articleSection: asString(raw.articleSection) || undefined,
    articleTags: asStringArray(raw.articleTags),
  };
}

function normalizeBlog(value: unknown): UpliftBlog | null {
  const raw = asRecord(value);
  const id = asString(raw.id);
  const title = asString(raw.title);
  const slug = asString(raw.slug);

  if (!id || !title || !slug) {
    return null;
  }

  return {
    id,
    title,
    slug,
    excerpt: asString(raw.excerpt),
    content: asString(raw.content),
    status: asString(raw.status),
    publishDate: asString(raw.publishDate) || undefined,
    publishTime: asString(raw.publishTime) || undefined,
    featuredImage: asString(raw.featuredImage) || undefined,
    categories: asStringArray(raw.categories),
    tags: asStringArray(raw.tags),
    seoScore: asNumber(raw.seoScore),
    createdAt: asString(raw.createdAt) || undefined,
    updatedAt: asString(raw.updatedAt) || undefined,
    authorName: asString(raw.authorName) || undefined,
    authorUrl: asString(raw.authorUrl) || undefined,
    meta: normalizeMeta(raw.meta),
    customFields: asRecord(raw.customFields),
  };
}

async function requestUplift<T>(path: string): Promise<ApiResult<T>> {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      error: "Blog API token is not configured.",
    };
  }

  try {
    const response = await fetch(`${UPLIFT_API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: BLOG_REVALIDATE_SECONDS,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Blog API returned ${response.status}.`,
        status: response.status,
      };
    }

    const json = (await response.json()) as { success?: boolean; data?: T; error?: string };

    if (!json.success || !json.data) {
      return {
        success: false,
        error: json.error ?? "Blog API returned an unexpected response.",
      };
    }

    return {
      success: true,
      data: json.data,
    };
  } catch {
    return {
      success: false,
      error: "Blog API request failed.",
    };
  }
}

export const getPublishedBlogs = cache(async () => {
  const result = await requestUplift<BlogListResponse>("/blogs?page=1&limit=100&status=PUBLISH");

  if (!result.success) {
    return [];
  }

  return (result.data.blogs ?? [])
    .map(normalizeBlog)
    .filter((blog): blog is UpliftBlog => blog !== null && blog.status === "PUBLISH");
});

export const getBlogBySlug = cache(async (slug: string) => {
  const result = await requestUplift<BlogDetailResponse>(`/blog/${encodeURIComponent(slug)}`);

  if (!result.success) {
    return null;
  }

  const blog = normalizeBlog(result.data.blog);

  if (!blog || blog.status !== "PUBLISH") {
    return null;
  }

  return blog;
});

export function getBlogPath(blog: Pick<UpliftBlog, "slug">) {
  return `/blog/${blog.slug}`;
}

function getDateValue(blog: UpliftBlog) {
  const dateCandidate = blog.publishDate
    ? `${blog.publishDate}${blog.publishTime ? `T${blog.publishTime}` : ""}`
    : blog.updatedAt ?? blog.createdAt;
  const date = dateCandidate ? new Date(dateCandidate) : null;

  return date && !Number.isNaN(date.getTime()) ? date : null;
}

export function getBlogIsoDate(blog: UpliftBlog) {
  return getDateValue(blog)?.toISOString();
}

export function formatBlogDate(blog: UpliftBlog) {
  const date = getDateValue(blog);

  if (!date) {
    return "SSJ insights";
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function isSafeImageUrl(value: string | undefined) {
  if (!value) {
    return false;
  }

  return value.startsWith("/") || value.startsWith("https://") || value.startsWith("http://");
}

export function getBlogImage(blog: UpliftBlog) {
  return isSafeImageUrl(blog.featuredImage) ? blog.featuredImage! : DEFAULT_BLOG_IMAGE;
}

export function getBlogDescription(blog: UpliftBlog) {
  return (
    blog.meta.seoDescription ||
    blog.meta.ogDescription ||
    blog.excerpt ||
    toPlainText(blog.content).slice(0, 155) ||
    "Renovation insight from SSJ Construction & Renovations."
  );
}

export function getBlogKeywords(blog: UpliftBlog) {
  return Array.from(new Set([...(blog.meta.keywords ?? []), ...blog.tags, blog.meta.focusKeyword].filter(Boolean) as string[]));
}

export function getReadingTime(blog: UpliftBlog) {
  const readingTime = blog.customFields.readingTime;

  if (typeof readingTime === "string" && readingTime.trim()) {
    return readingTime;
  }

  const words = toPlainText(`${blog.content} ${blog.excerpt}`).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function toPlainText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function textToHtml(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

export function sanitizeBlogHtml(value: string) {
  const source = value.trim();
  const html = source.includes("<") ? source : textToHtml(source);

  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed\b[^>]*>[\s\S]*?<\/embed>/gi, "")
    .replace(/<form\b[^>]*>[\s\S]*?<\/form>/gi, "")
    .replace(/\s(?:on\w+|style|srcdoc)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, ' $1="#"')
    .replace(/\s(href|src)\s*=\s*javascript:[^\s>]*/gi, ' $1="#"');
}
