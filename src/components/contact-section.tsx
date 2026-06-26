import Image from "next/image";
import { site } from "@/lib/site-data";

export function ContactSection({
  title = "Tell us what you want to change. We’ll help shape the next step.",
  kicker = "Let’s collaborate",
}: {
  title?: string;
  kicker?: string;
}) {
  return (
    <section id="contact" className="grid overflow-hidden bg-[#0d0f13] text-white lg:grid-cols-[0.96fr_1.04fr]">
      <div className="px-5 py-16 sm:px-8 sm:py-20 lg:py-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-14 xl:pr-20">
        <div className="max-w-[600px]">
          <p className="mb-5 text-sm font-black text-[#e9b11f]">{kicker}</p>
          <h2 className="max-w-xl text-4xl font-black leading-[1.04] text-balance sm:text-5xl lg:text-[2.7rem] xl:text-[3rem]">
            {title}
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              href={site.phoneHref}
              className="min-w-0 border border-white/10 bg-white/[0.055] p-4 transition hover:border-[#e9b11f]/70 hover:bg-white/10"
            >
              <p className="text-sm text-white/52">Phone</p>
              <p className="mt-2 text-lg font-black leading-7">{site.phone}</p>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="min-w-0 border border-white/10 bg-white/[0.055] p-4 transition hover:border-[#e9b11f]/70 hover:bg-white/10"
            >
              <p className="text-sm text-white/52">Email</p>
              <p className="mt-2 text-[0.95rem] font-black leading-6 xl:text-base">{site.email}</p>
            </a>
          </div>

          <form className="mt-6 grid gap-3" action={`mailto:${site.email}`} method="post" encType="text/plain">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="h-12 min-w-0 border border-white/12 bg-white/[0.065] px-5 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#e9b11f]"
              />
              <label className="sr-only" htmlFor="phone">
                Your phone
              </label>
              <input
                id="phone"
                name="phone"
                required
                placeholder="Your phone"
                className="h-12 min-w-0 border border-white/12 bg-white/[0.065] px-5 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#e9b11f]"
              />
            </div>
            <label className="sr-only" htmlFor="project">
              Project type
            </label>
            <input
              id="project"
              name="project"
              placeholder="Kitchen, basement, washroom, commercial..."
              className="h-12 min-w-0 border border-white/12 bg-white/[0.065] px-5 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#e9b11f]"
            />
            <label className="sr-only" htmlFor="message">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about the space, timeline, and goals"
              rows={4}
              className="min-h-20 resize-none border border-white/12 bg-white/[0.065] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#e9b11f]"
            />
            <button
              type="submit"
              className="h-11 bg-[#e9b11f] px-6 text-sm font-black text-[#111315] transition hover:bg-white"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
      <div className="relative min-h-[520px] overflow-hidden lg:min-h-[720px]">
        <Image
          src="/images/contact-work.jpg"
          alt="Renovated dining space with modern lighting"
          fill
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="object-cover object-[58%_78%]"
          style={{ transform: "scale(1.12)" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,15,19,0.32),rgba(13,15,19,0.04)_34%),linear-gradient(180deg,rgba(13,15,19,0.02),rgba(13,15,19,0.56))]" />
      </div>
    </section>
  );
}
