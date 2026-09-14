import Image from "next/image";
import { Sun } from "lucide-react";
import { hero } from "@/data/content";
import { site } from "@/data/site";
import { events } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroScene } from "@/components/graphics/HeroScene";
import { HandArrow } from "@/components/graphics/Squiggle";

function Scene({ priority }: { priority?: boolean }) {
  if (hero.image) {
    return <Image src={hero.image} alt="" fill priority={priority} sizes="100vw" className="object-cover" />;
  }
  return <HeroScene className="h-full w-full" />;
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-cream-50">
      <div className="relative lg:flex lg:min-h-[86vh] lg:items-center">
        {/* Visuel plein écran (desktop) */}
        <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
          <Scene priority />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-50 from-30% via-cream-50/85 via-48% to-transparent to-68%" />
          <div className="absolute right-[6%] bottom-[8%] -rotate-6 text-cream">
            <span className="font-accent text-4xl drop-shadow-[0_2px_6px_rgb(6_57_75/0.45)]">{hero.annotation}</span>
            <HandArrow className="ml-6 -mt-1 h-10 w-14" />
          </div>
        </div>

        <Container className="relative py-14 sm:py-20 lg:py-28">
          <div className="max-w-xl lg:max-w-2xl">
            <p className="eyebrow mb-5 text-ocean">{hero.eyebrow}</p>
            <h1 className="text-[2.75rem] font-extrabold leading-[1.02] text-night sm:text-6xl lg:text-[4.5rem]">
              {hero.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft sm:text-xl">{hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={site.cta.findStation.href}
                size="lg"
                event={events.clickFindStation}
                eventProps={{ location: "hero" }}
              >
                {site.cta.findStation.label}
              </Button>
              <Button
                href={site.cta.becomePartner.href}
                size="lg"
                variant="secondary"
                event={events.clickPartner}
                eventProps={{ location: "hero" }}
              >
                {site.cta.becomePartner.label}
              </Button>
            </div>
            {hero.note && (
              <p className="mt-7 flex items-center gap-2 text-sm font-medium text-ink-soft">
                <Sun className="h-4 w-4 text-sun" aria-hidden="true" />
                {hero.note}
              </p>
            )}
          </div>
        </Container>
      </div>

      {/* Visuel (mobile / tablette) */}
      <div className="relative mx-5 mb-10 aspect-[4/3] overflow-hidden rounded-2xl sm:mx-8 lg:hidden">
        <Scene priority />
        <span className="absolute bottom-4 left-5 -rotate-6 font-accent text-3xl text-cream drop-shadow-[0_2px_6px_rgb(6_57_75/0.45)]">
          {hero.annotation}
        </span>
        <span className="sr-only">{hero.imageAlt}</span>
      </div>
    </section>
  );
}
