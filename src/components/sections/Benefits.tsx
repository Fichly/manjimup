import { MapPin, Smartphone, CheckCircle2, Sun, ArrowRight } from "lucide-react";
import { benefits } from "@/data/content";
import { site } from "@/data/site";
import { events } from "@/lib/analytics";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { HandArrow } from "@/components/graphics/Squiggle";

const icons = { pin: MapPin, phone: Smartphone, check: CheckCircle2, sun: Sun };

export function Benefits() {
  return (
    <Section id="pourquoi">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="relative lg:col-span-6">
          <Photo
            alt={benefits.photoLabel}
            label={benefits.photoLabel}
            tone="water"
            className="aspect-[4/5] rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute -right-2 -bottom-6 flex items-end gap-1 text-ocean sm:right-6">
            <HandArrow className="h-9 w-12 -scale-x-100 rotate-12" />
            <span className="font-accent text-2xl sm:text-3xl">tout est dans la cellule</span>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHeading eyebrow={benefits.eyebrow} title={benefits.title} />
          <ul className="mt-10 divide-y divide-line">
            {benefits.items.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <Reveal as="li" key={item.title} delay={i * 80} className="flex gap-5 py-6 first:pt-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sun-100 text-sun">
                    <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.9} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold uppercase tracking-[0.05em] text-night">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-soft">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <Reveal delay={320} className="mt-8">
            <Button href={site.cta.findStation.href} variant="ghost" className="-ml-5" event={events.clickFindStation} eventProps={{ location: "benefits" }}>
              {site.cta.findStation.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
