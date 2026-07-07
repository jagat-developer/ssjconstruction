import Link from "next/link";
import { site } from "@/lib/site-data";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const linkClass = overlay ? "text-white/72 hover:text-white" : "text-[#555] hover:text-[#111315]";
  const logoBorder = overlay ? "border-white/18 bg-white text-[#111315]" : "border-[#ded9cf] bg-[#111315] text-white";
  const callClass = overlay
    ? "bg-white text-[#111315] hover:bg-[#e9b11f]"
    : "bg-[#111315] text-white hover:bg-[#e9b11f] hover:text-[#111315]";

  return (
    <header
      className={`${
        overlay ? "relative z-10 text-white" : "border-b border-[#ded9cf] bg-[#f6f5f1] text-[#171717]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="SSJ Construction home">
          <span className={`grid size-10 place-items-center border text-sm font-black ${logoBorder}`}>SSJ</span>
          <span className="hidden text-sm font-semibold sm:block">Construction & Renovations</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          <Link href="/#about" className={`transition ${linkClass}`}>
            About
          </Link>
          <Link href="/services" className={`transition ${linkClass}`}>
            Services
          </Link>
          <Link href="/areas" className={`transition ${linkClass}`}>
            Areas
          </Link>
          <Link href="/#projects" className={`transition ${linkClass}`}>
            Projects
          </Link>
          <Link href="/blog" className={`transition ${linkClass}`}>
            Blog
          </Link>
          <Link href="/contact" className={`transition ${linkClass}`}>
            Contact
          </Link>
        </nav>
        <a
          href={site.phoneHref}
          className={`inline-flex h-11 items-center justify-center px-5 text-sm font-bold transition ${callClass}`}
        >
          Call now
        </a>
      </div>
    </header>
  );
}
