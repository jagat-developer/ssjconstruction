import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/lib/site-data";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SSJ Construction & Renovations | Edmonton Renovation Specialists",
    template: "%s | SSJ Construction & Renovations",
  },
  description:
    "Home renovation, commercial renovation, basement development, kitchen remodels, washroom renovation, and flooring services across Edmonton.",
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
