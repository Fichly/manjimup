import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

// Polices auto-hébergées (Google Fonts, licence OFL) : aucun appel externe, build reproductible hors ligne.
const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 800",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
});

const caveat = localFont({
  src: "./fonts/caveat-latin.woff2",
  variable: "--font-caveat",
  display: "swap",
  weight: "400 700",
  preload: false,
  fallback: ["Bradley Hand", "Segoe Script", "cursive"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MANJIM'UP — Location de paddle en libre-service",
    template: "%s · MANJIM'UP",
  },
  description: site.description,
  keywords: [
    "location paddle libre-service",
    "paddle libre-service",
    "location paddle Bordeaux",
    "location paddle Gironde",
    "paddle lac",
    "location SUP",
    "paddle camping",
    "station paddle",
  ],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "MANJIM'UP — Un paddle. Un QR code. Et vous êtes sur l'eau.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "MANJIM'UP — Le paddle en libre-service, simplement.",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#075E6B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${caveat.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ocean focus:px-4 focus:py-2 focus:text-cream"
        >
          Aller au contenu
        </a>
        {children}
        {/*
          Analytics — décommentez le script souhaité (voir lib/analytics.ts) :
          <Script defer data-domain="manjimup.fr" src="https://plausible.io/js/script.js" />
        */}
      </body>
    </html>
  );
}
