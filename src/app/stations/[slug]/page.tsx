import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, MapPin, Waves } from "lucide-react";
import { stations, getStation } from "@/data/stations";
import { site } from "@/data/site";
import { pricing, formatPrice } from "@/data/pricing";
import { howItWorks, stationsSection } from "@/data/content";
import { events } from "@/lib/analytics";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { LaunchNotifyForm } from "@/components/sections/LaunchNotifyForm";
import { StatusBadge } from "@/components/sections/StationCard";
import { Container, Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";

/**
 * Pages SEO locales : /stations/[slug]
 * Générées uniquement pour les stations réelles présentes dans data/stations.ts.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return stations.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const station = getStation(slug);
  if (!station) return {};
  const title = `Location de paddle à ${station.city} — ${station.name}`;
  const description = `Louez un paddle en libre-service à ${station.city} (${station.partner}). Scannez, réservez, pagayez : planche, pagaie et gilet inclus.`;
  return {
    title,
    description,
    alternates: { canonical: `/stations/${station.slug}` },
    openGraph: { title, description, url: `${site.url}/stations/${station.slug}` },
  };
}

export default async function StationPage({ params }: Params) {
  const { slug } = await params;
  const station = getStation(slug);
  if (!station) notFound();

  const canBook = station.status === "open" && !!station.bookingUrl;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: station.name,
    address: { "@type": "PostalAddress", streetAddress: station.address, addressLocality: station.city, postalCode: station.postalCode, addressCountry: "FR" },
    geo: { "@type": "GeoCoordinates", latitude: station.latitude, longitude: station.longitude },
    url: `${site.url}/stations/${station.slug}`,
    image: station.photo ? `${site.url}${station.photo}` : undefined,
    openingHours: station.hours,
    parentOrganization: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        <Section padded={false} className="pt-8 pb-16 sm:pt-12 sm:pb-24">
          <Container>
            <Link href="/#stations" className="inline-flex items-center gap-2 text-sm font-semibold text-ocean underline-offset-4 hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Toutes les stations
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Photo src={station.photo} alt={`Station MANJIM'UP ${station.name}`} label="Photo de la station" tone="water" className="aspect-[4/3] rounded-3xl" sizes="(min-width: 1024px) 60vw, 100vw" priority />
              </div>
              <div className="lg:col-span-5">
                <StatusBadge status={station.status} />
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-night sm:text-4xl lg:text-5xl">
                  Location de paddle à {station.city}
                </h1>
                <p className="mt-3 text-lg text-ink-soft">
                  {station.name} · {station.partner}
                </p>
                {station.description && <p className="mt-4 leading-relaxed text-ink">{station.description}</p>}

                <ul className="mt-6 space-y-2.5 text-ink">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" aria-hidden="true" />
                    {station.address}
                  </li>
                  {station.hours && (
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" aria-hidden="true" />
                      {station.hours}
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <Waves className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" aria-hidden="true" />
                    {station.paddles} paddles · planche, pagaie et gilet inclus
                  </li>
                </ul>

                <div className="mt-8">
                  {canBook ? (
                    <Button href={station.bookingUrl as string} target="_blank" size="lg" event={events.clickBookStation} eventProps={{ station: station.slug, location: "station-page" }}>
                      {stationsSection.rentHere}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  ) : (
                    <div className="rounded-2xl bg-cream p-5">
                      <p className="font-extrabold text-night">Cette station ouvre bientôt.</p>
                      <p className="mt-1 text-sm text-ink-soft">Laisse ton email, on te prévient dès l&rsquo;ouverture.</p>
                      <div className="relative mt-4">
                        <LaunchNotifyForm source={`station-${station.slug}`} />
                      </div>
                    </div>
                  )}
                </div>

                <dl className="mt-8 grid grid-cols-3 gap-3">
                  {pricing.sessions
                    .filter((s) => s.price !== null)
                    .map((s) => (
                      <div key={s.id} className="rounded-2xl border border-line bg-white p-4 text-center">
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">{s.label}</dt>
                        <dd className="mt-1 text-2xl font-extrabold text-night">{formatPrice(s.price as number)}</dd>
                      </div>
                    ))}
                </dl>
                <p className="mt-2 text-xs text-ink-soft">{pricing.disclaimer}</p>
              </div>
            </div>

            <div className="mt-16 rounded-3xl bg-cream p-8 sm:p-10">
              <h2 className="text-2xl font-extrabold text-night">{howItWorks.title}</h2>
              <ol className="mt-6 grid gap-6 sm:grid-cols-4">
                {howItWorks.steps.map((step, i) => (
                  <li key={step.n}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sun text-sm font-extrabold text-night">{i + 1}</span>
                    <h3 className="mt-3 font-extrabold uppercase tracking-[0.06em] text-night">{step.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
