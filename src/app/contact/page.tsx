import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-data";
import { breadcrumbJsonLd, buildMetadata, localBusinessJsonLd, webpageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request a Renovation Quote",
  description: `Contact ${site.name} for home renovation, commercial renovation, basement development, kitchen, washroom, and flooring quotes in Edmonton.`,
  path: "/contact",
  keywords: ["renovation quote Edmonton", "contact SSJ Renovations", "Edmonton contractor quote"],
});

export default function ContactPage() {
  return (
    <main className="bg-[#f6f5f1] text-[#171717]">
      <JsonLd
        data={[
          localBusinessJsonLd("/contact"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          webpageJsonLd({
            name: "Request a Renovation Quote",
            description: `Contact ${site.name} for home renovation, commercial renovation, basement development, kitchen, washroom, and flooring quotes in Edmonton.`,
            path: "/contact",
            image: "/images/ssj-commercial-dining-renovation.jpg",
          }),
        ]}
      />
      <SiteHeader />
      <PageHero
        eyebrow="Request a quote"
        title="Start your renovation conversation with SSJ."
        description={`Call ${site.phone} or send a short project note. Share the space, location, timeline, and the type of renovation you have in mind.`}
        image="/images/ssj-commercial-dining-renovation.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <ContactSection title="Send the project details and SSJ will help shape the next step." kicker="Contact SSJ" />
      <SiteFooter />
    </main>
  );
}
