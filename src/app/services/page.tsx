import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { areas, getAreaPath, getServicePath, services } from "@/lib/site-data";
import { breadcrumbJsonLd, itemListJsonLd, localBusinessJsonLd, servicesIndexMetadata, webpageJsonLd } from "@/lib/seo";

export const metadata: Metadata = servicesIndexMetadata();

export default function ServicesPage() {
  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd("/services"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          webpageJsonLd({
            name: "Renovation Services in Edmonton",
            description:
              "Explore SSJ renovation services including home renovation, commercial renovation, basement development, washroom renovation, kitchen remodels, and flooring installation.",
            path: "/services",
            image: "/images/service-home.jpg",
          }),
          itemListJsonLd({
            name: "Renovation services",
            path: "/services",
            items: services.map((service) => ({
              name: service.title,
              path: getServicePath(service),
              description: service.description,
            })),
          }),
        ]}
      />
      <SiteHeader />
      <PageHero
        eyebrow="Renovation services"
        title="Practical renovation scopes for homes, businesses, and investment spaces."
        description="Choose the service that matches your project. Every page includes local service-area links, common questions, and a clear path to request a quote."
        image="/images/service-home.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              href={getServicePath(service)}
            />
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.68fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">Local coverage</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">Service pages by area.</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#666]">
              Each city page connects to dedicated service pages for search visibility and better
              visitor intent matching.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={getAreaPath(area)}
                className="border border-[#ded9cf] bg-[#f6f5f1] p-5 transition hover:border-[#111315] hover:bg-white"
              >
                <p className="text-xl font-black">{area.name}</p>
                <p className="mt-2 text-sm leading-6 text-[#666]">{area.descriptor}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection title="Ready to compare renovation options? Start with the service that fits your project." />
      <SiteFooter />
    </main>
  );
}
