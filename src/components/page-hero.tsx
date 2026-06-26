import Image from "next/image";
import Link from "next/link";

type Breadcrumb = {
  label: string;
  href: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  breadcrumbs?: Breadcrumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#111315] px-5 py-20 text-white sm:px-8 lg:py-28">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-42" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.96),rgba(8,8,7,0.76)_52%,rgba(8,8,7,0.38))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.18),rgba(8,8,7,0)_36%,rgba(8,8,7,0.64))]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        {breadcrumbs ? (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-white/52">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index > 0 ? <span>/</span> : null}
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}
        <p className="mb-5 inline-flex border border-white/16 bg-white/8 px-4 py-2 text-sm font-semibold text-[#e9b11f] backdrop-blur">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">{description}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center bg-[#e9b11f] px-6 text-sm font-black text-[#111315] transition hover:bg-white"
          >
            Request a free quote
          </Link>
          <a
            href="tel:+17809754641"
            className="inline-flex h-12 items-center justify-center border border-white/22 px-6 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
          >
            Call SSJ
          </a>
        </div>
      </div>
    </section>
  );
}
