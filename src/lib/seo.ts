import type { Metadata } from "next";
import {
  absoluteUrl,
  areas,
  getAreaKeywords,
  getAreaPath,
  getServiceAreaDescription,
  getServiceAreaPath,
  getServiceKeywords,
  getServicePath,
  services,
  site,
  type Area,
  type Service,
} from "./site-data";

type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/ssj-living-room-fireplace.jpg",
  keywords = [],
}: SeoConfig): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type: "website",
      locale: "en_CA",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function homeMetadata() {
  return buildMetadata({
    title: "Edmonton Renovation Contractor",
    description:
      "SSJ Construction & Renovations provides home renovation, commercial renovation, basement development, washroom renovation, kitchen remodel, and flooring services across Edmonton.",
    path: "/",
    keywords: ["Edmonton renovation contractor", "home renovation Edmonton", "basement development Edmonton"],
  });
}

export function servicesIndexMetadata() {
  return buildMetadata({
    title: "Renovation Services in Edmonton",
    description:
      "Explore SSJ renovation services including home renovation, commercial renovation, basement development, washroom renovation, kitchen remodels, and flooring installation.",
    path: "/services",
    keywords: ["renovation services Edmonton", "home renovation services", "basement development services"],
  });
}

export function serviceMetadata(service: Service) {
  return buildMetadata({
    title: `${service.title} in Edmonton`,
    description: `${service.seoDescription} Serving Edmonton and surrounding areas. Call ${site.phone} for a renovation quote.`,
    path: getServicePath(service),
    image: service.heroImage,
    keywords: getServiceKeywords(service),
  });
}

export function areasIndexMetadata() {
  return buildMetadata({
    title: "Renovation Service Areas Near Edmonton",
    description:
      "Browse SSJ Construction & Renovations service areas near Edmonton, including St. Albert, Sherwood Park, Spruce Grove, Leduc, Beaumont, and Edmonton.",
    path: "/areas",
    keywords: ["Edmonton renovation areas", "renovation contractor near Edmonton", "SSJ service areas"],
  });
}

export function areaMetadata(area: Area) {
  return buildMetadata({
    title: `Renovation Contractor in ${area.name}`,
    description: `${site.name} provides home renovation, commercial renovation, basement development, kitchen, washroom, and flooring services in ${area.name}, ${area.region}.`,
    path: getAreaPath(area),
    keywords: getAreaKeywords(area),
  });
}

export function serviceAreaMetadata(area: Area, service: Service) {
  return buildMetadata({
    title: `${service.title} in ${area.name}`,
    description: `${getServiceAreaDescription(area, service)} Call ${site.phone} to discuss your renovation scope.`,
    path: getServiceAreaPath(area, service),
    image: service.heroImage,
    keywords: getServiceKeywords(service, area),
  });
}

export function localBusinessJsonLd(path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    founder: {
      "@type": "Person",
      name: site.owner,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: areas.map((area) => ({
      "@type": "City",
      name: area.name,
      addressRegion: area.region,
      addressCountry: site.country,
    })),
    image: absoluteUrl("/images/ssj-living-room-fireplace.jpg"),
    subjectOf: {
      "@id": `${absoluteUrl(path)}#webpage`,
    },
    sameAs: [site.url],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Renovation services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: absoluteUrl(getServicePath(service)),
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: {
      "@id": `${site.url}/#business`,
    },
  };
}

export function webpageJsonLd({
  name,
  description,
  path,
  image = "/images/ssj-living-room-fireplace.jpg",
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: {
      "@id": `${site.url}/#website`,
    },
    about: {
      "@id": `${site.url}/#business`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(image),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  area,
  image,
}: {
  name: string;
  description: string;
  path: string;
  area?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@id": `${site.url}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: area ?? `${site.city}, ${site.region}`,
    },
    image: image ? absoluteUrl(image) : undefined,
    serviceType: name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "CAD",
      },
      url: absoluteUrl(path),
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd({
  name,
  path,
  items,
}: {
  name: string;
  path: string;
  items: { name: string; path: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#itemlist`,
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(item.path),
    })),
  };
}
