import { Check } from "lucide-react";
import { pricing, formatPrice } from "@/data/pricing";
import { pricingSection } from "@/data/content";
import { site } from "@/data/site";
import { events } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TrackView } from "@/components/ui/TrackView";

export function Pricing() {
  const sessions = pricing.sessions.filter((s) => s.price !== null);
  const pricedPasses = pricing.passes.filter((p) => p.price !== null);
  const upcomingPasses = pricing.passes.filter((p) => p.price === null);

  return (
    <Section id="tarifs" tone="white">
      <Container>
        <SectionHeading eyebrow={pricingSection.eyebrow} title={pricingSection.title} subtitle={pricingSection.subtitle} align="center" />

        <TrackView event={events.pricingView} className="mx-auto mt-12 max-w-3xl">
          <ul className="grid gap-4 sm:grid-cols-3">
            {[...sessions, ...pricedPasses].map((option, i) => (
              <Reveal
                as="li"
                key={option.id}
                delay={i * 80}
                className={cn(
                  "relative flex flex-col items-center rounded-2xl border px-6 py-8 text-center",
                  option.highlight ? "border-ocean bg-cream-50" : "border-line bg-white",
                )}
              >
                {option.note && (
                  <span className="absolute -top-3 rounded-full bg-sun px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-night">
                    {option.note}
                  </span>
                )}
                <span className="text-sm font-bold uppercase tracking-[0.12em] text-ink-soft">{option.label}</span>
                <span className="mt-3 text-5xl font-extrabold tracking-tight text-night">{formatPrice(option.price as number)}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={260} className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-semibold text-ink">
              {pricing.included.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-turquoise" aria-hidden="true" />
                  {item}
                </span>
              ))}
              <span className="text-ink-soft">inclus</span>
            </p>
            {upcomingPasses.length > 0 && (
              <p className="text-sm text-ink-soft">
                {upcomingPasses.map((p) => p.label).join(" et ")} : {pricingSection.comingSoonLabel.toLowerCase()}.
              </p>
            )}
            <p className="text-sm text-ink-soft">{pricing.disclaimer}</p>
            <Button href={site.cta.findStation.href} size="lg" className="mt-4" event={events.clickFindStation} eventProps={{ location: "pricing" }}>
              {site.cta.findStation.label}
            </Button>
          </Reveal>
        </TrackView>
      </Container>
    </Section>
  );
}
