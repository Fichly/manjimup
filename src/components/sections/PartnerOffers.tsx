import { Check } from "lucide-react";
import { partnerOffers, partnerOffersDisclaimer } from "@/data/partnerOffers";
import { partnerOffersSection } from "@/data/content";
import { events } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const pct = (v: number) => `${Math.round(v * 100)} %`;

export function PartnerOffers() {
  return (
    <Section id="offres" tone="night" padded={false} className="pb-20 sm:pb-24 lg:pb-32">
      <Container>
        <SectionHeading tone="dark" eyebrow={partnerOffersSection.eyebrow} title={partnerOffersSection.title} />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {partnerOffers.map((offer, i) => (
            <Reveal
              key={offer.id}
              delay={i * 120}
              className={cn(
                "flex flex-col rounded-3xl p-7 sm:p-10",
                offer.featured ? "bg-cream text-night" : "border border-cream/20 text-cream",
              )}
            >
              <p className="eyebrow text-turquoise">{offer.eyebrow}</p>
              <h3 className="mt-3 text-3xl font-extrabold sm:text-4xl">{offer.title}</h3>

              <div className="mt-7">
                <p className={cn("text-xs font-bold uppercase tracking-[0.12em]", offer.featured ? "text-ink-soft" : "text-cream/60")}>
                  Investissement partenaire
                </p>
                <p className="mt-1 text-3xl font-extrabold sm:text-4xl">{offer.investment.value}</p>
                {offer.investment.detail && (
                  <p className={cn("mt-1 text-sm", offer.featured ? "text-ink-soft" : "text-cream/60")}>{offer.investment.detail}</p>
                )}
              </div>

              <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-current/10 pt-6">
                <div>
                  <dt className={cn("text-xs font-bold uppercase tracking-[0.12em]", offer.featured ? "text-ink-soft" : "text-cream/60")}>Partenaire</dt>
                  <dd className="mt-1 text-2xl font-extrabold">{pct(offer.partnerShare)}</dd>
                  <dd className={cn("text-xs", offer.featured ? "text-ink-soft" : "text-cream/60")}>des recettes de location</dd>
                </div>
                <div>
                  <dt className={cn("text-xs font-bold uppercase tracking-[0.12em]", offer.featured ? "text-ink-soft" : "text-cream/60")}>MANJIM&rsquo;UP</dt>
                  <dd className="mt-1 text-2xl font-extrabold">{pct(offer.manjimupShare)}</dd>
                  <dd className={cn("text-xs", offer.featured ? "text-ink-soft" : "text-cream/60")}>des recettes de location</dd>
                </div>
              </dl>

              <ul className="mt-7 space-y-2.5">
                {offer.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-turquoise" aria-hidden="true" strokeWidth={3} />
                    <span className={offer.featured ? "text-ink" : "text-cream/90"}>{b}</span>
                  </li>
                ))}
              </ul>

              <Button
                href="#contact-partenaire"
                variant={offer.featured ? "primary" : "sun"}
                size="lg"
                className="mt-9 self-start"
                event={events.clickPartner}
                eventProps={{ location: "offers", offer: offer.id }}
              >
                {offer.cta}
              </Button>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-sm text-cream/60">{partnerOffersDisclaimer}</p>
      </Container>
    </Section>
  );
}
