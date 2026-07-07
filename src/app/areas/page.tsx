import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { areas, getAreaPath, getServicePath, services } from "@/lib/site-data";
import { areasIndexMetadata, breadcrumbJsonLd, itemListJsonLd, localBusinessJsonLd, webpageJsonLd } from "@/lib/seo";

export const metadata: Metadata = areasIndexMetadata();

export default function AreasPage() {
  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd("/areas"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Areas", path: "/areas" },
          ]),
          webpageJsonLd({
            name: "Renovation Service Areas Near Edmonton",
            description:
              "Browse SSJ Construction & Renovations service areas near Edmonton, including St. Albert, Sherwood Park, Spruce Grove, Leduc, Beaumont, and Edmonton.",
            path: "/areas",
          }),
          itemListJsonLd({
            name: "Renovation service areas",
            path: "/areas",
            items: areas.map((area) => ({
              name: area.name,
              path: getAreaPath(area),
              description: area.intro,
            })),
          }),
        ]}
      />
      <SiteHeader />
      <PageHero
        eyebrow="Service areas"
        title="Renovation services across Edmonton and nearby communities."
        description="Each service-area page is generated from structured local data so searchers can find the renovation scope and city that matches their project."
        image="/images/ssj-living-room-fireplace.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas", href: "/areas" },
        ]}
      />

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={getAreaPath(area)}
              className="flex h-full flex-col border border-[#d7d2c8] bg-white p-7 transition hover:-translate-y-1 hover:border-[#111315] hover:shadow-xl"
            >
              <p className="text-sm font-black text-[#9a7a18]">{area.region}</p>
              <h2 className="mt-3 min-h-[2.2rem] text-3xl font-black">{area.name}</h2>
              <p className="mt-4 min-h-[7rem] text-sm leading-7 text-[#666]">{area.intro}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {area.neighborhoods.slice(0, 3).map((neighborhood) => (
                  <span key={neighborhood} className="bg-[#efeee9] px-3 py-2 text-xs font-bold text-[#555]">
                    {neighborhood}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.68fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">Service combinations</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              Every area connects to every core renovation service.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                href={getServicePath(service)}
                imagePosition="none"
                compact
              />
            ))}
          </div>
        </div>
      </section>

      <ContactSection title="Need renovation help in or around Edmonton? Tell SSJ where the project is." />
      <SiteFooter />
    </main>
  );
}
