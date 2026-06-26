import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { areas, getArea, getAreaPath, getServiceAreaPath, services } from "@/lib/site-data";
import { areaMetadata, breadcrumbJsonLd, itemListJsonLd, localBusinessJsonLd, webpageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return areas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = getArea(areaSlug);

  if (!area) {
    return {};
  }

  return areaMetadata(area);
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = getArea(areaSlug);

  if (!area) {
    notFound();
  }

  const path = getAreaPath(area);
  const localServiceItems = services.map((service) => ({
    name: `${service.title} in ${area.name}`,
    path: getServiceAreaPath(area, service),
    description: service.description,
  }));

  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd(path),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Areas", path: "/areas" },
            { name: area.name, path },
          ]),
          webpageJsonLd({
            name: `Renovation Contractor in ${area.name}`,
            description: `SSJ provides renovation services for ${area.descriptor}.`,
            path,
          }),
          itemListJsonLd({
            name: `Renovation services in ${area.name}`,
            path,
            items: localServiceItems,
          }),
        ]}
      />
      <SiteHeader />
      <PageHero
        eyebrow={`${area.region} renovation services`}
        title={`Renovation contractor in ${area.name}`}
        description={`${area.intro} SSJ plans home, commercial, basement, kitchen, washroom, and flooring scopes around local project needs.`}
        image="/images/hero-renovation.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas", href: "/areas" },
          { label: area.name, href: path },
        ]}
      />

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">Local renovation planning</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              Built for {area.descriptor}.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#666]">
              SSJ uses the same clear process across {area.name}: define the scope, match finishes
              to the space, coordinate trades, and keep the work moving toward a clean finish.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {area.neighborhoods.map((neighborhood) => (
              <div key={neighborhood} className="flex h-full flex-col border border-[#ded9cf] bg-[#f6f5f1] p-5">
                <p className="text-lg font-black">{neighborhood}</p>
                <p className="mt-auto pt-2 text-sm leading-6 text-[#666]">Nearby project planning</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#ded9cf] bg-[#efeee9] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="mb-5 text-sm font-black text-[#9a7a18]">Choose a service</p>
              <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
                Renovation services in {area.name}.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#666]">
              These service-area pages are generated from structured data and built for local
              searches such as {area.name} basement development and {area.name} kitchen remodel.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                href={getServiceAreaPath(area, service)}
                title={`${service.title} in ${area.name}`}
                imagePosition="none"
                compact
              />
            ))}
          </div>
        </div>
      </section>

      <ContactSection title={`Start a renovation quote in ${area.name}.`} />
      <SiteFooter />
    </main>
  );
}
