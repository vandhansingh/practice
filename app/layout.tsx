import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { MotionController } from "@/components/motion/MotionController";
import { site } from "@/lib/data/site";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Operations Consulting`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Operations Consulting`,
    description: site.description,
    url: `https://${site.domain}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Operations Consulting`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: site.legalName,
  url: `https://${site.domain}`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  areaServed: "Global",
  sameAs: [site.social.linkedin, site.social.x],
};

/**
 * Adds .js-motion before first paint so animated elements can start hidden
 * without a flash of visible content. Crucially it is skipped entirely when
 * the visitor prefers reduced motion, and never runs at all with JS disabled —
 * in both cases the CSS leaves everything visible.
 */
const motionBootstrap = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("js-motion")}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-32 rounded-card bg-accent px-5 py-3 text-sm font-medium text-charcoal transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionController />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
