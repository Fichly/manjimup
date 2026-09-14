import { Sparkles, Coins, Wrench } from "lucide-react";
import { partnerBenefits } from "@/data/content";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";

const icons = { sparkles: Sparkles, coins: Coins, wrench: Wrench };

export function PartnerBenefits() {
  return (
    <Section id="pourquoi-partenaire">
      <Container>
        <SectionHeading eyebrow={partnerBenefits.eyebrow} title={partnerBenefits.title} className="max-w-3xl" />
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {partnerBenefits.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={i * 90}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-turquoise-100 text-ocean">
                  <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.9} />
                </div>
                <h3 className="mt-5 text-lg font-extrabold uppercase tracking-[0.05em] text-night">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
        <Reveal delay={200} className="mt-14">
          <Photo alt={partnerBenefits.photoLabel} label={partnerBenefits.photoLabel} tone="sunset" className="aspect-[16/10] rounded-3xl sm:aspect-[21/9]" sizes="(min-width: 1280px) 1216px, 100vw" />
        </Reveal>
      </Container>
    </Section>
  );
}
