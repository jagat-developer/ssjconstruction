import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, site } from "@/lib/site-data";
import { breadcrumbJsonLd, buildMetadata, localBusinessJsonLd, webpageJsonLd } from "@/lib/seo";
import {
  formatBlogDate,
  getBlogDescription,
  getBlogImage,
  getBlogIsoDate,
  getBlogKeywords,
  getBlogPath,
  getBlogBySlug,
  getPublishedBlogs,
  getReadingTime,
  sanitizeBlogHtml,
  type UpliftBlog,
} from "@/lib/uplift-blogs";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();

  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  return buildMetadata({
    title: blog.meta.seoTitle || blog.meta.ogTitle || blog.title,
    description: getBlogDescription(blog),
    path: getBlogPath(blog),
    image: getBlogImage(blog),
    keywords: getBlogKeywords(blog),
  });
}

function blogPostingJsonLd(blog: UpliftBlog) {
  const path = getBlogPath(blog);
  const isoDate = getBlogIsoDate(blog);
  const keywords = getBlogKeywords(blog);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#blogposting`,
    headline: blog.title,
    description: getBlogDescription(blog),
    image: getBlogImage(blog),
    datePublished: isoDate,
    dateModified: blog.updatedAt ?? isoDate,
    author: {
      "@type": "Person",
      name: blog.authorName || site.owner,
      url: blog.authorUrl || site.url,
    },
    publisher: {
      "@id": `${site.url}/#business`,
    },
    mainEntityOfPage: {
      "@id": `${absoluteUrl(path)}#webpage`,
    },
    articleSection: blog.meta.articleSection || blog.categories[0],
    keywords: keywords.length ? keywords.join(", ") : undefined,
  };
}

function RelatedBlogCard({ blog }: { blog: UpliftBlog }) {
  return (
    <Link
      href={getBlogPath(blog)}
      className="border border-[#d7d2c8] bg-white p-6 transition hover:-translate-y-1 hover:border-[#111315] hover:shadow-xl"
    >
      <p className="text-sm font-black text-[#9a7a18]">{formatBlogDate(blog)}</p>
      <h3 className="mt-4 text-2xl font-black leading-[1.12]">{blog.title}</h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#666]">{getBlogDescription(blog)}</p>
    </Link>
  );
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const path = getBlogPath(blog);
  const image = getBlogImage(blog);
  const relatedBlogs = (await getPublishedBlogs()).filter((item) => item.slug !== blog.slug).slice(0, 3);
  const contentHtml = sanitizeBlogHtml(blog.content || blog.excerpt);

  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd(path),
          webpageJsonLd({
            name: blog.title,
            description: getBlogDescription(blog),
            path,
            image,
          }),
          blogPostingJsonLd(blog),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: blog.title, path },
          ]),
        ]}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#111315] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-42"
          style={{
            backgroundImage: `url(${JSON.stringify(image)})`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.96),rgba(8,8,7,0.74)_52%,rgba(8,8,7,0.38))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.18),rgba(8,8,7,0)_36%,rgba(8,8,7,0.72))]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-white/52">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
          </nav>
          <div className="mb-5 flex flex-wrap gap-2">
            {(blog.categories.length ? blog.categories : ["Renovation insights"]).slice(0, 3).map((category) => (
              <span key={category} className="border border-white/16 bg-white/8 px-4 py-2 text-sm font-semibold text-[#e9b11f] backdrop-blur">
                {category}
              </span>
            ))}
          </div>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">{blog.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">{getBlogDescription(blog)}</p>
          <div className="mt-9 flex flex-wrap gap-3 text-sm font-bold text-white/56">
            <span>{formatBlogDate(blog)}</span>
            <span>/</span>
            <span>{getReadingTime(blog)}</span>
            {blog.authorName ? (
              <>
                <span>/</span>
                <span>{blog.authorName}</span>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <article className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.74fr)_0.26fr]">
          <div className="blog-content min-w-0 max-w-3xl" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <aside className="min-w-0 space-y-5">
            <div className="border border-[#d7d2c8] bg-[#f6f5f1] p-6">
              <p className="text-sm font-black text-[#9a7a18]">Article details</p>
              <div className="mt-5 grid gap-4 text-sm leading-6 text-[#666]">
                <p>
                  <span className="font-black text-[#171717]">Published:</span> {formatBlogDate(blog)}
                </p>
                <p>
                  <span className="font-black text-[#171717]">Reading time:</span> {getReadingTime(blog)}
                </p>
                {blog.authorName ? (
                  <p>
                    <span className="font-black text-[#171717]">Author:</span> {blog.authorName}
                  </p>
                ) : null}
              </div>
            </div>
            {blog.tags.length ? (
              <div className="border border-[#d7d2c8] bg-white p-6">
                <p className="text-sm font-black text-[#9a7a18]">Topics</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.slice(0, 10).map((tag) => (
                    <span key={tag} className="border border-[#d7d2c8] bg-[#f6f5f1] px-3 py-2 text-xs font-black">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="border border-[#111315] bg-[#101114] p-6 text-white">
              <p className="text-sm font-black text-[#e9b11f]">Planning a project?</p>
              <p className="mt-4 text-2xl font-black leading-[1.12]">Talk to SSJ about the next step.</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center justify-center bg-[#e9b11f] px-5 text-sm font-black text-[#111315] transition hover:bg-white"
              >
                Request a quote
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {relatedBlogs.length ? (
        <section className="bg-[#f6f5f1] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-4 text-sm font-black text-[#9a7a18]">More insights</p>
                <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">Keep planning with SSJ.</h2>
              </div>
              <Link href="/blog" className="text-sm font-black text-[#111315]">
                View all posts
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedBlogs.map((item) => (
                <RelatedBlogCard key={item.id} blog={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactSection title="Have a renovation question after reading?" kicker="Let’s plan it" />
      <SiteFooter />
    </main>
  );
}
