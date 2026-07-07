export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  seoDescription: string;
  image: string;
  heroImage: string;
  highlights: string[];
  includes: string[];
  outcomes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export type Area = {
  slug: string;
  name: string;
  region: string;
  descriptor: string;
  intro: string;
  neighborhoods: string[];
};

export const site = {
  name: "SSJ Construction & Renovations",
  shortName: "SSJ Renovations",
  owner: "Sandeep Singh",
  url: "https://ssjrenos.com",
  email: "ssjrenovation@gmail.com",
  phone: "(780) 975-4641",
  phoneHref: "tel:+17809754641",
  city: "Edmonton",
  region: "Alberta",
  country: "CA",
  description:
    "Home renovation, commercial renovation, basement development, kitchen remodels, washroom renovation, and flooring services across Edmonton.",
};

export const services: Service[] = [
  {
    slug: "home-renovation",
    title: "Home Renovation",
    shortTitle: "Home Renovation",
    category: "Residential renovation",
    description:
      "Room upgrades, layout improvements, painting, finishing, and full interior refreshes built around how your family lives.",
    seoDescription:
      "Plan home renovation work with SSJ Construction & Renovations, including interior updates, flooring, painting, layout improvements, and full room remodels.",
    image: "/images/ssj-living-room-fireplace.jpg",
    heroImage: "/images/ssj-green-feature-wall.jpg",
    highlights: ["Interior upgrades", "Room-by-room planning", "Clean daily coordination"],
    includes: ["Layout and finish planning", "Flooring and painting", "Drywall and trim updates", "Fixture and detail upgrades"],
    outcomes: ["A refreshed home that feels intentional", "Improved function for everyday routines", "A clear scope before construction starts"],
    faqs: [
      {
        question: "Can SSJ renovate one room at a time?",
        answer:
          "Yes. SSJ can plan a focused room refresh or a broader home renovation depending on budget, timeline, and site conditions.",
      },
      {
        question: "Do you help with finishes?",
        answer:
          "Yes. The team can help narrow down practical finish options for flooring, paint, fixtures, and final details.",
      },
    ],
  },
  {
    slug: "commercial-renovation",
    title: "Commercial Renovation",
    shortTitle: "Commercial",
    category: "Commercial renovation",
    description:
      "Practical upgrades for offices, retail spaces, investment properties, and tenant improvements across Edmonton.",
    seoDescription:
      "Commercial renovation services for offices, retail units, tenant improvements, and investment properties with practical scheduling and finish coordination.",
    image: "/images/ssj-commercial-dining-renovation.jpg",
    heroImage: "/images/ssj-commercial-dining-renovation.jpg",
    highlights: ["Tenant improvements", "Office and retail updates", "Efficient trade coordination"],
    includes: ["Space refreshes", "Painting and flooring", "Fixture coordination", "Commercial finish upgrades"],
    outcomes: ["A cleaner customer-facing space", "Better function for staff and visitors", "Work planned around operational realities"],
    faqs: [
      {
        question: "Can renovations be phased around business hours?",
        answer:
          "Project timing depends on scope, but SSJ can discuss phasing and scheduling needs during the estimate process.",
      },
      {
        question: "Do you renovate smaller commercial spaces?",
        answer:
          "Yes. SSJ can help with focused commercial upgrades as well as larger tenant-improvement style renovations.",
      },
    ],
  },
  {
    slug: "basement-development",
    title: "Basement Development",
    shortTitle: "Basements",
    category: "Basement finishing",
    description:
      "Turn unused lower-level space into comfortable living areas, rentals, offices, gyms, or entertainment rooms.",
    seoDescription:
      "Basement development and basement finishing services for family rooms, suites, offices, gyms, and practical lower-level living spaces.",
    image: "/images/ssj-basement-feature-wall.jpg",
    heroImage: "/images/ssj-media-wall-built-ins.jpg",
    highlights: ["Basement finishing", "Living suites", "Lower-level remodels"],
    includes: ["Layout planning", "Framing and drywall coordination", "Flooring and paint", "Washroom and utility coordination"],
    outcomes: ["More usable square footage", "A basement that feels connected to the home", "Clear decisions before trades begin"],
    faqs: [
      {
        question: "Can you develop an unfinished basement?",
        answer:
          "Yes. SSJ can help plan and complete basement development work from the first scope conversation through finishing details.",
      },
      {
        question: "Can a basement include a washroom or living suite?",
        answer:
          "Yes, depending on the site, utilities, code requirements, and budget. Those details are reviewed during planning.",
      },
    ],
  },
  {
    slug: "washroom-renovation",
    title: "Washroom Renovation",
    shortTitle: "Washrooms",
    category: "Bathroom renovation",
    description:
      "Refresh bathrooms with better surfaces, fixtures, storage, tile, flooring, lighting, and practical moisture-ready finishes.",
    seoDescription:
      "Washroom renovation services for bathrooms, powder rooms, ensuite upgrades, fixture replacement, tile, flooring, and finishing.",
    image: "/images/ssj-bathroom-shower-renovation.jpg",
    heroImage: "/images/ssj-bathroom-shower-renovation.jpg",
    highlights: ["Bathroom remodels", "Fixture updates", "Tile and finishing"],
    includes: ["Vanity and fixture planning", "Tile and flooring", "Paint and trim", "Plumbing and electrical coordination"],
    outcomes: ["A cleaner, more functional bathroom", "Better storage and everyday usability", "Finishes chosen for moisture and wear"],
    faqs: [
      {
        question: "Do you handle small bathroom upgrades?",
        answer:
          "Yes. SSJ can support focused fixture and finish updates or a more complete bathroom renovation.",
      },
      {
        question: "Can you coordinate plumbing and electrical work?",
        answer:
          "Yes. Plumbing and electrical coordination can be included as part of the renovation scope.",
      },
    ],
  },
  {
    slug: "kitchen-remodel",
    title: "Kitchen Remodel",
    shortTitle: "Kitchens",
    category: "Kitchen renovation",
    description:
      "Improve the heart of the home with practical kitchen updates, surface upgrades, storage improvements, and cleaner finishes.",
    seoDescription:
      "Kitchen remodel and kitchen renovation services for layout improvements, cabinets, counters, flooring, painting, fixtures, and finishing details.",
    image: "/images/ssj-kitchen-cabinet-remodel.jpg",
    heroImage: "/images/ssj-kitchen-cabinet-remodel.jpg",
    highlights: ["Kitchen upgrades", "Storage and surface planning", "Durable everyday finishes"],
    includes: ["Cabinet and counter coordination", "Flooring and paint", "Lighting and fixture planning", "Backsplash and trim details"],
    outcomes: ["A kitchen that works better every day", "Cleaner surfaces and improved flow", "A renovation scope matched to budget"],
    faqs: [
      {
        question: "Can SSJ remodel an existing kitchen without changing the whole layout?",
        answer:
          "Yes. A kitchen remodel can focus on finishes and function, or include layout changes when the project requires it.",
      },
      {
        question: "Can I start with a rough budget?",
        answer:
          "Yes. A rough budget is helpful at the first conversation and can be refined as materials and scope are selected.",
      },
    ],
  },
  {
    slug: "flooring-installation",
    title: "Flooring Installation",
    shortTitle: "Flooring",
    category: "Flooring and finishing",
    description:
      "Update worn floors with durable, clean flooring options that fit the room, use, maintenance needs, and renovation budget.",
    seoDescription:
      "Flooring installation and flooring replacement for renovation projects, including practical material guidance, prep, and finishing coordination.",
    image: "/images/ssj-flooring-installation.jpg",
    heroImage: "/images/ssj-flooring-installation.jpg",
    highlights: ["Flooring replacement", "Material guidance", "Trim and finish details"],
    includes: ["Flooring selection support", "Prep and installation coordination", "Baseboard and trim updates", "Painting tie-ins when needed"],
    outcomes: ["A cleaner foundation for the whole room", "Materials matched to daily use", "A finished look with trim and detail work"],
    faqs: [
      {
        question: "Can flooring be part of a larger renovation?",
        answer:
          "Yes. Flooring is often coordinated with painting, trim, kitchen, basement, and whole-home renovation work.",
      },
      {
        question: "Do you help choose flooring materials?",
        answer:
          "Yes. SSJ can help compare practical options based on the room, budget, durability, and maintenance needs.",
      },
    ],
  },
];

export const areas: Area[] = [
  {
    slug: "edmonton",
    name: "Edmonton",
    region: "Alberta",
    descriptor: "central Edmonton homes, infill properties, townhomes, condos, and commercial spaces",
    intro:
      "Edmonton renovations often need durable finishes, careful scheduling, and practical planning for older homes, busy family spaces, and investment properties.",
    neighborhoods: ["Mill Woods", "Windermere", "Terwillegar", "Summerside", "Downtown Edmonton"],
  },
  {
    slug: "st-albert",
    name: "St. Albert",
    region: "Alberta",
    descriptor: "family homes, mature properties, basement projects, and kitchen updates",
    intro:
      "St. Albert projects often focus on improving long-term comfort, refreshing established homes, and making family spaces easier to use.",
    neighborhoods: ["Erin Ridge", "Lacombe Park", "Grandin", "Oakmont", "Riverside"],
  },
  {
    slug: "sherwood-park",
    name: "Sherwood Park",
    region: "Alberta",
    descriptor: "suburban homes, commercial units, basement builds, and main-floor remodels",
    intro:
      "Sherwood Park renovations benefit from clear material choices and a construction schedule that respects busy homes and operating businesses.",
    neighborhoods: ["Emerald Hills", "Aspen Trails", "Summerwood", "Broadmoor", "Clarkdale Meadows"],
  },
  {
    slug: "spruce-grove",
    name: "Spruce Grove",
    region: "Alberta",
    descriptor: "growing family homes, basement developments, flooring upgrades, and commercial refreshes",
    intro:
      "Spruce Grove homeowners often need practical renovation planning that adds usable space, improves finish quality, and supports long-term value.",
    neighborhoods: ["Harvest Ridge", "Greenbury", "Tonewood", "Legacy Park", "Aspenglen"],
  },
  {
    slug: "leduc",
    name: "Leduc",
    region: "Alberta",
    descriptor: "single-family homes, basement suites, kitchen updates, washroom renovations, and flooring projects",
    intro:
      "Leduc renovation work often centers on useful upgrades, efficient trade coordination, and finishes that hold up to everyday family use.",
    neighborhoods: ["Southfork", "Meadowview", "Deer Valley", "Bridgeport", "West Haven"],
  },
  {
    slug: "beaumont",
    name: "Beaumont",
    region: "Alberta",
    descriptor: "newer homes, basement finishing, main-floor refreshes, and washroom upgrades",
    intro:
      "Beaumont projects often focus on turning unfinished areas into complete rooms and upgrading newer homes with better function and finish detail.",
    neighborhoods: ["Dansereau Meadows", "Four Seasons", "Montrose", "Eaglemont Heights", "Place Chaleureuse"],
  },
];

export const projects = [
  {
    title: "Warm kitchen remodel",
    type: "Kitchen renovation",
    image: "/images/ssj-kitchen-cabinet-remodel.jpg",
  },
  {
    title: "Clean washroom upgrade",
    type: "Bathroom renovation",
    image: "/images/ssj-bathroom-shower-renovation.jpg",
  },
  {
    title: "Durable flooring refresh",
    type: "Flooring and finishing",
    image: "/images/ssj-flooring-installation.jpg",
  },
  {
    title: "Basement living suite",
    type: "Basement development",
    image: "/images/ssj-basement-feature-wall.jpg",
  },
];

export const testimonials = [
  {
    name: "Henry",
    role: "Edmonton homeowner",
    text: "A dependable renovation team with excellent service and strong client feedback across construction and renovation work.",
  },
  {
    name: "Kelly Qian",
    role: "Renovation client",
    text: "Professional, attentive, and quick to resolve details so the renovation process feels clear and manageable.",
  },
  {
    name: "Cheng Qian",
    role: "Local client",
    text: "Responsive communication, smooth coordination, and an efficient experience from Sandeep and the team.",
  },
];

export const processSteps = [
  {
    title: "Discover & define",
    text: "We map your goals, scope, site conditions, budget range, and must-have outcomes before recommending a path.",
  },
  {
    title: "Estimate & schedule",
    text: "You get practical guidance, transparent pricing, material direction, and a build plan that respects your time.",
  },
  {
    title: "Build & finish",
    text: "The team coordinates trades, keeps the site moving, and finishes with the details that make the space feel complete.",
  },
];

export const packages = [
  {
    name: "Refresh",
    label: "Focused updates",
    price: "Custom quote",
    items: ["Painting and flooring", "Fixture updates", "Small room improvements"],
  },
  {
    name: "Remodel",
    label: "Most requested",
    price: "Detailed estimate",
    items: ["Kitchen or washroom", "Material planning", "Trade coordination"],
    featured: true,
  },
  {
    name: "Full build",
    label: "Complete delivery",
    price: "Project plan",
    items: ["Basement development", "Commercial upgrades", "End-to-end management"],
  },
];

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalizedPath}`;
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}

export function getServiceAreaPaths() {
  return areas.flatMap((area) =>
    services.map((service) => ({
      area: area.slug,
      service: service.slug,
    })),
  );
}

export function getServicePath(service: Service) {
  return `/services/${service.slug}`;
}

export function getAreaPath(area: Area) {
  return `/areas/${area.slug}`;
}

export function getServiceAreaPath(area: Area, service: Service) {
  return `/areas/${area.slug}/${service.slug}`;
}

export function getServiceKeywords(service: Service, area?: Area) {
  const location = area?.name ?? site.city;
  return [
    `${service.title} ${location}`,
    `${service.shortTitle} contractor ${location}`,
    `${service.shortTitle} near me`,
    `${service.category} ${location}`,
    `renovation contractor ${location}`,
    site.shortName,
  ];
}

export function getAreaKeywords(area: Area) {
  return [
    `renovation contractor ${area.name}`,
    `home renovation ${area.name}`,
    `basement development ${area.name}`,
    `kitchen remodel ${area.name}`,
    `washroom renovation ${area.name}`,
    `flooring installation ${area.name}`,
  ];
}

export function getServiceAreaDescription(area: Area, service: Service) {
  return `${service.seoDescription} Available in ${area.name}, ${area.region}, for ${area.descriptor}.`;
}

export function getServiceAreaIntro(area: Area, service: Service) {
  return `${area.intro} SSJ helps plan and deliver ${service.title.toLowerCase()} projects with clear scope, practical material choices, and reliable trade coordination.`;
}

export function getServiceAreaFaqs(area: Area, service: Service) {
  return [
    ...service.faqs,
    {
      question: `Does SSJ provide ${service.shortTitle.toLowerCase()} in ${area.name}?`,
      answer: `Yes. SSJ provides ${service.title.toLowerCase()} planning and renovation services in ${area.name} and nearby Edmonton-area communities.`,
    },
    {
      question: `How do I start a ${service.shortTitle.toLowerCase()} quote in ${area.name}?`,
      answer: `Call ${site.phone} or send a message with your project address, rough scope, timeline, and any finish ideas you already have.`,
    },
    {
      question: `What should I prepare for a ${service.shortTitle.toLowerCase()} estimate?`,
      answer: `Helpful details include the project location, current room condition, rough timeline, must-have finishes, and whether the work is part of a larger renovation.`,
    },
  ];
}

export function getLocalLandingPoints(area: Area, service: Service) {
  return [
    `${service.title} planning for ${area.descriptor}.`,
    `Local estimating for ${area.name} projects with finish, budget, and schedule expectations discussed early.`,
    `Nearby coverage around ${area.neighborhoods.slice(0, 3).join(", ")}, and other Edmonton-area communities.`,
  ];
}

export function getRelatedServices(currentService: Service, limit = 3) {
  return services.filter((service) => service.slug !== currentService.slug).slice(0, limit);
}

export function getNearbyAreas(currentArea: Area, limit = 5) {
  return areas.filter((area) => area.slug !== currentArea.slug).slice(0, limit);
}
