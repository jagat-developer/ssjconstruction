import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, site } from "@/lib/site-data";
import { buildMetadata, itemListJsonLd, localBusinessJsonLd, webpageJsonLd } from "@/lib/seo";
import {
  formatBlogDate,
  getBlogDescription,
  getBlogImage,
  getBlogPath,
  getPublishedBlogs,
  getReadingTime,
  type UpliftBlog,
} from "@/lib/uplift-blogs";

export const metadata: Metadata = buildMetadata({
  title: "Renovation Blog",
  description:
    "Read SSJ Construction & Renovations blog posts about home renovation, basement development, kitchen remodels, washrooms, flooring, and commercial renovation in Edmonton.",
  path: "/blog",
  image: "/images/ssj-green-feature-wall.jpg",
  keywords: ["Edmonton renovation blog", "renovation tips Edmonton", "home renovation ideas"],
});

function BlogCard({ blog, featured = false }: { blog: UpliftBlog; featured?: boolean }) {
  const image = getBlogImage(blog);

  return (
    <Link
      href={getBlogPath(blog)}
      className={`group flex h-full flex-col overflow-hidden border transition hover:-translate-y-1 hover:shadow-xl ${
        featured ? "border-[#111315] bg-[#101114] text-white" : "border-[#d7d2c8] bg-white text-[#171717]"
      }`}
    >
      <div
        className="min-h-72 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(13, 15, 19, 0.02), rgba(13, 15, 19, 0.2)), url(${JSON.stringify(
            image,
          )})`,
        }}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 text-xs font-black uppercase text-[#9a7a18]">
          {(blog.categories.length ? blog.categories : ["Renovation guide"]).slice(0, 2).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <h2 className={`mt-4 font-black leading-[1.08] ${featured ? "text-4xl" : "text-3xl"}`}>{blog.title}</h2>
        <p className={`mt-5 line-clamp-3 text-sm leading-7 ${featured ? "text-white/62" : "text-[#666]"}`}>
          {getBlogDescription(blog)}
        </p>
        <div className={`mt-auto flex flex-wrap gap-3 pt-8 text-sm ${featured ? "text-white/54" : "text-[#777]"}`}>
          <span>{formatBlogDate(blog)}</span>
          <span>/</span>
          <span>{getReadingTime(blog)}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const [featuredBlog, ...remainingBlogs] = blogs;

  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd("/blog"),
          webpageJsonLd({
            name: "Renovation Blog",
            description:
              "Renovation insights from SSJ Construction & Renovations for Edmonton homeowners and commercial spaces.",
            path: "/blog",
            image: "/images/ssj-green-feature-wall.jpg",
          }),
          itemListJsonLd({
            name: "SSJ renovation blog posts",
            path: "/blog",
            items: blogs.map((blog) => ({
              name: blog.title,
              path: getBlogPath(blog),
              description: getBlogDescription(blog),
            })),
          }),
        ]}
      />
      <SiteHeader />
      <PageHero
        eyebrow="Renovation insights"
        title="Practical notes for planning better renovation projects."
        description={`Read updates from ${site.name} on renovation planning, finishes, project scope, and local Edmonton construction decisions.`}
        image="/images/ssj-green-feature-wall.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <p className="mb-5 text-sm font-black text-[#9a7a18]">Latest from SSJ</p>
              <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl">Renovation articles and project guidance.</h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#666] lg:pt-4">
              Browse renovation ideas, scope planning notes, and practical guidance for homes,
              basements, commercial spaces, kitchens, washrooms, and flooring projects around Edmonton.
            </p>
          </div>

          {featuredBlog ? (
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <BlogCard blog={featuredBlog} featured />
              <div className="grid gap-5">
                {remainingBlogs.slice(0, 2).map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-12 border border-[#d7d2c8] bg-[#f6f5f1] p-8">
              <p className="text-sm font-black text-[#9a7a18]">Blog feed</p>
              <h2 className="mt-4 text-3xl font-black">Blog posts will appear here soon.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#666]">
                Once published posts are available from UpliftAI, this page will automatically show
                the latest renovation articles.
              </p>
            </div>
          )}

          {remainingBlogs.length > 2 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {remainingBlogs.slice(2).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[#0d0f13] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.74fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#e9b11f]">Programmatic SEO</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              Blog content connected to service and local search pages.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Service context", "Articles can support renovation topics already covered by SSJ service pages."],
              ["Local relevance", "Posts can naturally reference Edmonton-area project questions and search intent."],
              ["Freshness", "Published updates help keep the site active around real renovation decisions."],
              ["Structured paths", `Every post lives under ${absoluteUrl("/blog")} with its own metadata.`],
            ].map(([title, text]) => (
              <div key={title} className="border border-white/10 bg-white/5 p-5">
                <p className="text-lg font-black">{title}</p>
                <p className="mt-3 text-sm leading-6 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection title="Have a renovation question for SSJ?" kicker="Need local advice?" />
      <SiteFooter />
    </main>
  );
}
