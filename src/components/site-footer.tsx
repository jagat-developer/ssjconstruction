import Image from "next/image";
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
            <Link href="/blog" className="mt-5 inline-flex text-sm font-black text-[#e9b11f] transition hover:text-white">
              Read renovation insights
            </Link>
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
              <Link href="/blog" className="hover:text-white">
                Renovation blog
              </Link>
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
          <Link
            href="/"
            className="relative block aspect-[601/472] w-full max-w-[360px] overflow-hidden border border-white/10 bg-[#123d68] shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:max-w-[440px]"
            aria-label="SSJ Construction home"
          >
            <Image
              src="/images/ssj-construction-logo.jpg"
              alt="SSJ Construction & Renovations Limited logo"
              fill
              sizes="(max-width: 640px) 88vw, 440px"
              className="object-cover"
            />
          </Link>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/46 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {site.name}. All rights reserved.</p>
            <p>Built for Edmonton renovation inquiries.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
