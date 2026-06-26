import Link from "next/link";
import { areas, services, site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#0d0f13] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
          <div>
            <p className="font-black">{site.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/54">
              Dependable renovation work for homes, commercial spaces, basements, kitchens,
              washrooms, and flooring in Edmonton.
            </p>
          </div>
          <div>
            <p className="text-sm font-black text-white">Services</p>
            <div className="mt-4 grid gap-2 text-sm text-white/54">
              {services.slice(0, 5).map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="hover:text-white">
                  {service.shortTitle}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black text-white">Areas</p>
            <div className="mt-4 grid gap-2 text-sm text-white/54">
              {areas.slice(0, 5).map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="hover:text-white">
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black text-white">Contact</p>
            <div className="mt-4 grid gap-2 text-sm text-white/54">
              <a href={site.phoneHref} className="hover:text-white">
                Edmonton: {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
              <span>Edmonton and surrounding areas</span>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex h-11 items-center justify-center bg-white px-5 text-sm font-black text-[#111315] transition hover:bg-[#e9b11f]"
            >
              Request a quote
            </Link>
          </div>
        </div>
        <div className="pt-10">
          <p className="text-[4.2rem] font-black leading-none text-white sm:text-[7rem] lg:text-[11rem]">SSJ®</p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/46 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {site.name}. All rights reserved.</p>
            <p>Built for Edmonton renovation inquiries.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
