import { Check } from "lucide-react";
import { partnerSection } from "@/data/content";
import { partnerAudience, partnerPitch } from "@/data/partnerOffers";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SunMark } from "@/components/graphics/Squiggle";

function CheckList({ title, items, accent }: { title: string; items: readonly string[]; accent: "turquoise" | "sun" }) {
  return (
    <div>
      <h3 className={accent === "sun" ? "eyebrow text-sun" : "eyebrow text-turquoise"}>{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-cream/90">
            <Check className={accent === "sun" ? "mt-1 h-4 w-4 shrink-0 text-sun" : "mt-1 h-4 w-4 shrink-0 text-turquoise"} aria-hidden="true" strokeWidth={3} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PartnerSection() {
  return (
    <Section id="partenaire" tone="night" className="overflow-hidden">
      <SunMark className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 text-sun/10 lg:h-96 lg:w-96" />
      <Container className="relative">
        <SectionHeading tone="dark" eyebrow={partnerSection.eyebrow} title={partnerSection.title} subtitle={partnerSection.subtitle} className="max-w-3xl" />

        <Reveal delay={100} className="mt-8 flex flex-wrap gap-2">
          {partnerAudience.map((a) => (
            <span key={a} className="rounded-full border border-cream/20 px-3.5 py-1.5 text-sm font-semibold text-cream/80">
              {a}
            </span>
          ))}
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Photo alt={partnerSection.photoLabel} label={partnerSection.photoLabel} tone="sunset" className="aspect-[4/3] rounded-2xl" sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={120} className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            <CheckList title={partnerSection.weHandleTitle} items={partnerSection.weHandle} accent="turquoise" />
            <CheckList title={partnerSection.youBringTitle} items={partnerSection.youBring} accent="sun" />
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-16 max-w-2xl border-l-2 border-sun pl-6">
          <p className="text-xl leading-relaxed text-cream/90 sm:text-2xl">{partnerPitch}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
