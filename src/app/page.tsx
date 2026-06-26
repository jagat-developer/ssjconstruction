import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { areas, getAreaPath, getServicePath, packages, processSteps, projects, services, site, testimonials } from "@/lib/site-data";
import { homeMetadata, itemListJsonLd, localBusinessJsonLd, webpageJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = homeMetadata();

export default function Home() {
  const featuredServices = [services[0], services[2], services[1]];
  const serviceLabels = services.map((service) => service.shortTitle);
  const insights = [
    {
      title: "Planning a basement that feels like part of the home",
      image: "/images/service-basement.jpg",
      href: "/services/basement-development",
    },
    {
      title: "Kitchen upgrades that improve daily flow",
      image: "/images/project-kitchen.jpg",
      href: "/services/kitchen-remodel",
    },
    {
      title: "Flooring choices for busy Edmonton homes",
      image: "/images/project-flooring.jpg",
      href: "/services/flooring-installation",
    },
  ];

  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd("/"),
          websiteJsonLd(),
          webpageJsonLd({
            name: "Edmonton Renovation Contractor",
            description: site.description,
            path: "/",
          }),
          itemListJsonLd({
            name: "SSJ renovation services",
            path: "/",
            items: services.map((service) => ({
              name: service.title,
              path: getServicePath(service),
              description: service.description,
            })),
          }),
        ]}
      />
      <section id="home" className="relative min-h-[760px] overflow-hidden bg-[#111315] text-white">
        <Image
          src="/images/hero-renovation.jpg"
          alt="Modern renovated home exterior at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.94),rgba(8,8,7,0.7)_46%,rgba(8,8,7,0.34))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.18),rgba(8,8,7,0)_34%,rgba(8,8,7,0.72))]" />

        <SiteHeader overlay />

        <div className="relative z-10 mx-auto flex min-h-[650px] w-full max-w-7xl items-center px-5 pb-20 pt-12 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex border border-white/16 bg-white/8 px-4 py-2 text-sm font-semibold text-[#e9b11f] backdrop-blur">
              Edmonton renovation specialists
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Renovations shaped around the way you live and work.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/74">
              Led by {site.owner}, {site.name} delivers dependable home, commercial, basement,
              kitchen, washroom, and flooring projects across Edmonton and nearby communities.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center bg-[#e9b11f] px-6 text-sm font-black text-[#111315] transition hover:bg-white"
              >
                Request a free quote
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center border border-white/22 px-6 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 border-t border-white/12 bg-[#0d0f11]/82 px-5 backdrop-blur sm:grid-cols-3 sm:px-8">
          {[
            ["Licensed", "Insured and reliable team"],
            ["Transparent", "Clear estimates and scheduling"],
            ["Local", "Edmonton and surrounding areas"],
          ].map(([title, text]) => (
            <div key={title} className="border-white/12 py-5 sm:border-r sm:px-6 last:sm:border-r-0">
              <p className="text-sm font-black text-white">{title}</p>
              <p className="mt-1 text-sm text-white/58">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#dcd8cf] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-6 text-center text-xs font-black uppercase text-[#565656] sm:grid-cols-3 sm:px-8 lg:grid-cols-6">
          {serviceLabels.map((item) => (
            <span key={item} className="py-3">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.82fr_1fr]">
          <div className="relative min-h-[520px] overflow-hidden bg-[#ece8df]">
            <Image
              src="/images/about-interior.jpg"
              alt="Bright renovated living room with warm wood flooring"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">About SSJ Construction</p>
            <h2 className="max-w-2xl text-4xl font-black leading-[1.06] sm:text-5xl">
              Quality renovations tailored to real homes, real businesses, and real timelines.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#616161]">
              SSJ brings careful planning, clean craftsmanship, and reliable communication to every
              project. From flooring and painting to full basement builds, the work is planned to be
              practical, durable, and built to last.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                ["Edmonton", "Primary service area"],
                ["Home + Commercial", "Flexible renovation scopes"],
                ["Quote first", "Clear project expectations"],
              ].map(([number, label]) => (
                <div key={number} className="border-t border-[#d9d4c8] pt-5">
                  <p className="text-2xl font-black">{number}</p>
                  <p className="mt-2 text-sm leading-6 text-[#777]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-[#dcd8cf] bg-[#efeee9] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr]">
            <h2 className="max-w-xl text-4xl font-black leading-[1.08] sm:text-5xl">
              Renovation services crafted with intent.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[#666] lg:pt-4">
              Every scope is handled with the same practical discipline: define the space, estimate
              clearly, coordinate the work, and finish with details that look clean in daily use.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                href={getServicePath(service)}
                featured={index === 1}
                imagePosition="bottom"
                index={index + 1}
              />
            ))}
          </div>
          <Link
            href="/services"
            className="mt-8 inline-flex h-12 items-center justify-center bg-[#111315] px-6 text-sm font-black text-white transition hover:bg-[#e9b11f] hover:text-[#111315]"
          >
            See all services
          </Link>
        </div>
      </section>

      <section className="bg-[#0d0f13] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1fr]">
            <div>
              <p className="mb-5 text-sm font-black text-[#e9b11f]">Featured approach</p>
              <h2 className="max-w-2xl text-4xl font-black leading-[1.08] sm:text-5xl">
                Create considered spaces through clarity, restraint, and reliable coordination.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-white/58 lg:pt-10">
              Renovation is easier when every decision has a purpose. SSJ keeps the process grounded
              in scope, schedule, materials, and site communication so the finished space feels
              intentional instead of improvised.
            </p>
          </div>

          <div className="relative mt-12 min-h-[580px] overflow-hidden bg-[#17191d]">
            <Image
              src="/images/featured-suite.jpg"
              alt="Modern completed renovation with clean exterior finishes"
              fill
              sizes="100vw"
              className="object-cover opacity-82"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,19,0.05),rgba(13,15,19,0.56))]" />
            <div className="absolute bottom-0 left-0 grid w-full gap-px bg-white/10 sm:grid-cols-3">
              {[
                ["Material honesty", "Finishes selected for durability, budget, and everyday maintenance."],
                ["Site clarity", "Clean coordination keeps trades, scope, and timelines aligned."],
                ["Lasting design", "Rooms are finished to feel current without chasing short-term trends."],
              ].map(([title, text]) => (
                <div key={title} className="bg-[#0d0f13]/88 p-6 backdrop-blur">
                  <p className="font-black text-white">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr_0.65fr]">
            <p className="text-sm font-black text-[#8a8a8a]">Project gallery</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">Recent renovation directions</h2>
            <p className="text-base leading-8 text-[#666]">
              Dummy imagery is used here, matched to the SSJ renovation categories until final
              project photography is supplied.
            </p>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project.title} className={index % 2 === 1 ? "md:mt-16" : ""}>
                <div className="relative aspect-[1.32] overflow-hidden bg-[#efeee9]">
                  <Image
                    src={project.image}
                    alt={`${project.title} image`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#ded9cf] pt-4">
                  <div>
                    <h3 className="text-xl font-black">{project.title}</h3>
                    <p className="mt-1 text-sm text-[#777]">{project.type}</p>
                  </div>
                  <span aria-hidden="true" className="text-xl">
                    -&gt;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0d0f13] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-black text-[#e9b11f]">Trusted by local clients</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">
              Renovation work that feels clear from start to finish.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="border border-white/10 bg-white p-6 text-[#171717]">
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-full bg-[#efeee9] text-sm font-black">
                    {item.name.slice(0, 1)}
                  </div>
                  <span className="text-sm font-black text-[#9a7a18]">★★★★★</span>
                </div>
                <p className="min-h-32 text-lg font-semibold leading-8">{item.text}</p>
                <div className="mt-8 border-t border-[#e4ded3] pt-4">
                  <p className="font-black">{item.name}</p>
                  <p className="mt-1 text-sm text-[#777]">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1fr]">
          <div>
            <p className="mb-5 text-sm font-black text-[#9a7a18]">A simpler process</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">From first call to finished space.</h2>
          </div>
          <div className="space-y-0 border-l border-[#ddd8cc]">
            {processSteps.map((step, index) => (
              <article key={step.title} className="relative border-b border-[#ddd8cc] pb-10 pl-10 pt-1">
                <span className="absolute -left-4 top-0 grid size-8 place-items-center rounded-full bg-[#e9b11f] text-xs font-black text-[#111315]">
                  {index + 1}
                </span>
                <h3 className="text-2xl font-black">{step.title}</h3>
                <p className="mt-3 max-w-2xl text-base leading-8 text-[#666]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d0f13] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 inline-flex bg-[#e9b11f] px-3 py-1 text-xs font-black text-[#111315]">
              Project paths
            </p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">Clear scopes before construction starts.</h2>
            <p className="mt-5 text-base leading-8 text-white/58">
              Renovation pricing depends on site conditions, materials, and scope. These paths help
              structure the conversation before the formal quote.
            </p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`border p-7 ${
                  item.featured ? "border-[#e9b11f] bg-white text-[#171717]" : "border-white/10 bg-[#15171c] text-white"
                }`}
              >
                <p className={`text-sm font-black ${item.featured ? "text-[#9a7a18]" : "text-[#e9b11f]"}`}>{item.label}</p>
                <h3 className="mt-5 text-3xl font-black">{item.name}</h3>
                <p className="mt-4 text-xl font-black">{item.price}</p>
                <ul className={`mt-7 space-y-3 text-sm leading-6 ${item.featured ? "text-[#555]" : "text-white/62"}`}>
                  {item.items.map((packageItem) => (
                    <li key={packageItem} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#e9b11f]" />
                      <span>{packageItem}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex h-11 w-full items-center justify-center text-sm font-black transition ${
                    item.featured
                      ? "bg-[#111315] text-white hover:bg-[#e9b11f] hover:text-[#111315]"
                      : "bg-white text-[#111315] hover:bg-[#e9b11f]"
                  }`}
                >
                  Start a quote
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="mb-5 text-sm font-black text-[#9a7a18]">Service areas</p>
              <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">Renovation help around Edmonton.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={getAreaPath(area)}
                  className="border border-[#ded9cf] p-5 transition hover:border-[#111315] hover:bg-[#f6f5f1]"
                >
                  <p className="text-xl font-black">{area.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[#666]">{area.descriptor}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <section className="bg-[#f6f5f1] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="mb-4 text-sm font-black text-[#9a7a18]">Latest insights</p>
            <h2 className="text-4xl font-black leading-[1.08] sm:text-5xl">Smart renovation notes</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {insights.map((item) => (
              <Link key={item.title} href={item.href} className="bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[1.4] overflow-hidden bg-[#efeee9]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-black text-[#9a7a18]">Guide</p>
                  <h3 className="mt-3 text-xl font-black leading-7">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
