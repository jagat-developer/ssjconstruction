import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/site-data";

type ServiceCardProps = {
  service: Service;
  href: string;
  title?: string;
  description?: string;
  eyebrow?: string;
  cta?: string;
  featured?: boolean;
  imagePosition?: "top" | "bottom" | "none";
  index?: number;
  compact?: boolean;
};

export function ServiceCard({
  service,
  href,
  title = service.title,
  description = service.description,
  eyebrow = service.category,
  cta = "View service",
  featured = false,
  imagePosition = "top",
  index,
  compact = false,
}: ServiceCardProps) {
  const rootClass = featured
    ? "border-[#181818] bg-[#101114] text-white hover:border-[#e9b11f]"
    : "border-[#d7d2c8] bg-white text-[#171717] hover:border-[#111315]";
  const mutedText = featured ? "text-white/66" : "text-[#666]";
  const eyebrowText = featured ? "text-[#e9b11f]" : "text-[#9a7a18]";
  const ctaText = featured ? "text-[#e9b11f]" : "text-[#111315]";

  const image = (
    <div className={`relative shrink-0 overflow-hidden bg-[#ece8df] ${compact ? "h-56" : "h-72"}`}>
      <Image
        src={service.image}
        alt={`${service.title} project photo`}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden border transition hover:-translate-y-1 hover:shadow-xl ${rootClass}`}
    >
      {imagePosition === "top" ? image : null}
      <div className={`flex flex-1 flex-col ${compact ? "p-5" : "p-6"}`}>
        <div className="flex min-h-10 items-start justify-between gap-4">
          <p className={`text-sm font-black ${eyebrowText}`}>{eyebrow}</p>
          {typeof index === "number" ? (
            <span
              className={`grid size-10 shrink-0 place-items-center text-sm font-black ${
                featured ? "bg-[#e9b11f] text-[#111315]" : "bg-[#efeee9] text-[#111315]"
              }`}
            >
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
        </div>
        <h3 className={`mt-3 min-h-[4.4rem] font-black leading-[1.08] ${compact ? "text-2xl" : "text-3xl"}`}>
          {title}
        </h3>
        <p className={`mt-4 min-h-[7rem] text-sm leading-7 ${mutedText}`}>{description}</p>
        <span className={`mt-auto pt-6 text-sm font-black ${ctaText}`}>{cta}</span>
      </div>
      {imagePosition === "bottom" ? image : null}
    </Link>
  );
}
