import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { areas, getRelatedServices, getService, getServiceAreaPath, getServicePath, services } from "@/lib/site-data";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
  serviceMetadata,
  webpageJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return serviceMetadata(service);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const path = getServicePath(service);
  const areaItems = areas.map((area) => ({
    name: `${service.title} in ${area.name}`,
    path: getServiceAreaPath(area, service),
    description: area.intro,
  }));

  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd(path),
          serviceJsonLd({
            name: `${service.title} in Edmonton`,
            description: service.seoDescription,
            path,
            image: service.heroImage,
          }),
          faqJsonLd(service.faqs),
          webpageJsonLd({
            name: `${service.title} in Edmonton`,
            description: service.seoDescription,
            path,
            image: service.heroImage,
          }),
          itemListJsonLd({
            name: `${service.title} service areas`,
            path,
            items: areaItems,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
        ]}
      />
      <SiteHeader />
      <PageHero
        eyebrow={service.category}
        title={`${service.title} in Edmonton`}
        description={`${service.description} SSJ plans the scope, schedule, materials, and finishing details before construction starts.`}
        image={service.heroImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: path },
        ]}
      />

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">What SSJ focuses on</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              A renovation scope built around clarity before work begins.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#666]">{service.seoDescription}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {service.highlights.map((highlight) => (
              <div key={highlight} className="border border-[#ded9cf] bg-[#f6f5f1] p-5">
                <p className="text-lg font-black">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#ded9cf] bg-[#efeee9] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[540px] overflow-hidden bg-white">
            <Image
              src={service.image}
              alt={`${service.title} renovation work`}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">Included planning</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">What can be included.</h2>
            <div className="mt-8 divide-y divide-[#d7d2c8] border-y border-[#d7d2c8]">
              {service.includes.map((item) => (
                <div key={item} className="flex items-center gap-4 py-5">
                  <span className="size-2 shrink-0 rounded-full bg-[#e9b11f]" />
                  <p className="text-lg font-bold">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {service.outcomes.map((item) => (
                <p key={item} className="border border-[#d7d2c8] bg-white p-4 text-sm leading-6 text-[#666]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0d0f13] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="mb-5 text-sm font-black text-[#e9b11f]">Programmatic local pages</p>
              <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
                {service.title} pages by service area.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={getServiceAreaPath(area, service)}
                  className="flex h-full flex-col border border-white/10 bg-white/5 p-5 transition hover:border-[#e9b11f] hover:bg-white/10"
                >
                  <p className="min-h-[3.25rem] text-xl font-black">{service.title} in {area.name}</p>
                  <p className="mt-2 min-h-[5.25rem] text-sm leading-6 text-white/58">{area.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">Common questions</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              Questions about {service.shortTitle.toLowerCase()}.
            </h2>
          </div>
          <div className="divide-y divide-[#ded9cf] border-y border-[#ded9cf]">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-black">
                  {faq.question}
                  <span className="text-2xl transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[#666]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f5f1] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-sm font-black text-[#9a7a18]">Related services</p>
              <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">More ways SSJ can help.</h2>
            </div>
            <Link href="/services" className="text-sm font-black text-[#111315]">
              View all services
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {getRelatedServices(service).map((item) => (
              <ServiceCard key={item.slug} service={item} href={getServicePath(item)} imagePosition="none" compact />
            ))}
          </div>
        </div>
      </section>

      <ContactSection title={`Start a ${service.title.toLowerCase()} quote with SSJ.`} />
      <SiteFooter />
    </main>
  );
}
