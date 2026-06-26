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
import {
  getArea,
  getLocalLandingPoints,
  getNearbyAreas,
  getRelatedServices,
  getService,
  getServiceAreaDescription,
  getServiceAreaFaqs,
  getServiceAreaIntro,
  getServiceAreaPath,
  getServiceAreaPaths,
} from "@/lib/site-data";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
  localBusinessJsonLd,
  serviceAreaMetadata,
  serviceJsonLd,
  webpageJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return getServiceAreaPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string; service: string }>;
}): Promise<Metadata> {
  const { area: areaSlug, service: serviceSlug } = await params;
  const area = getArea(areaSlug);
  const service = getService(serviceSlug);

  if (!area || !service) {
    return {};
  }

  return serviceAreaMetadata(area, service);
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ area: string; service: string }>;
}) {
  const { area: areaSlug, service: serviceSlug } = await params;
  const area = getArea(areaSlug);
  const service = getService(serviceSlug);

  if (!area || !service) {
    notFound();
  }

  const path = getServiceAreaPath(area, service);
  const localFaqs = getServiceAreaFaqs(area, service);
  const nearbyAreaItems = getNearbyAreas(area).map((nearbyArea) => ({
    name: `${service.title} in ${nearbyArea.name}`,
    path: getServiceAreaPath(nearbyArea, service),
    description: nearbyArea.intro,
  }));

  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd(path),
          serviceJsonLd({
            name: `${service.title} in ${area.name}`,
            description: service.seoDescription,
            path,
            area: `${area.name}, ${area.region}`,
            image: service.heroImage,
          }),
          faqJsonLd(localFaqs),
          webpageJsonLd({
            name: `${service.title} in ${area.name}`,
            description: getServiceAreaDescription(area, service),
            path,
            image: service.heroImage,
          }),
          itemListJsonLd({
            name: `Nearby ${service.shortTitle.toLowerCase()} pages`,
            path,
            items: nearbyAreaItems,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Areas", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
            { name: service.title, path },
          ]),
        ]}
      />
      <SiteHeader />
      <PageHero
        eyebrow={`${service.category} in ${area.name}`}
        title={`${service.title} in ${area.name}`}
        description={getServiceAreaIntro(area, service)}
        image={service.heroImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas", href: "/areas" },
          { label: area.name, href: `/areas/${area.slug}` },
          { label: service.title, href: path },
        ]}
      />

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">Local scope</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              {service.title} planned for {area.descriptor}.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#666]">
              {getServiceAreaDescription(area, service)} The project still starts with a real site
              conversation, practical estimate, and clear next step.
            </p>
          </div>
          <div className="relative min-h-[520px] overflow-hidden bg-[#ece8df]">
            <Image
              src={service.image}
              alt={`${service.title} renovation example in ${area.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#ded9cf] bg-[#efeee9] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">What can be included</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              A cleaner path from estimate to finish.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {getLocalLandingPoints(area, service).map((item) => (
              <div key={item} className="border border-[#d7d2c8] bg-white p-5">
                <p className="text-lg font-black">{item}</p>
                <p className="mt-2 text-sm leading-6 text-[#666]">
                  Scoped with practical sequencing, trade coordination, and finish planning.
                </p>
              </div>
            ))}
            {service.includes.slice(0, 3).map((item) => (
              <div key={item} className="border border-[#d7d2c8] bg-white p-5">
                <p className="text-lg font-black">{item}</p>
                <p className="mt-2 text-sm leading-6 text-[#666]">
                  A typical part of {service.title.toLowerCase()} planning in {area.name}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d0f13] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#e9b11f]">Nearby service pages</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              More {service.shortTitle.toLowerCase()} pages near Edmonton.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {getNearbyAreas(area).map((nearbyArea) => (
                <Link
                  key={nearbyArea.slug}
                  href={getServiceAreaPath(nearbyArea, service)}
                  className="flex h-full flex-col border border-white/10 bg-white/5 p-5 transition hover:border-[#e9b11f] hover:bg-white/10"
                >
                  <p className="min-h-[3.25rem] text-xl font-black">{service.title} in {nearbyArea.name}</p>
                  <p className="mt-2 min-h-[5.25rem] text-sm leading-6 text-white/58">{nearbyArea.intro}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">Questions</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              {service.shortTitle} questions in {area.name}.
            </h2>
          </div>
          <div className="divide-y divide-[#ded9cf] border-y border-[#ded9cf]">
            {localFaqs.map((faq) => (
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
          <div className="mb-10">
            <p className="mb-4 text-sm font-black text-[#9a7a18]">Other services in {area.name}</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">Build a stronger local page network.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {getRelatedServices(service).map((item) => (
              <ServiceCard
                key={item.slug}
                service={item}
                href={getServiceAreaPath(area, item)}
                title={`${item.title} in ${area.name}`}
                imagePosition="none"
                compact
              />
            ))}
          </div>
        </div>
      </section>

      <ContactSection title={`Start a ${service.title.toLowerCase()} quote in ${area.name}.`} />
      <SiteFooter />
    </main>
  );
}
