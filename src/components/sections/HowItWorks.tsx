import { QrCode, Timer, KeyRound, Waves, Smartphone, DoorOpen, ArrowRight } from "lucide-react";
import { howItWorks } from "@/data/content";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons = { qr: QrCode, timer: Timer, lock: KeyRound, waves: Waves };

const flow = [
  { icon: QrCode, label: "QR" },
  { icon: Smartphone, label: "Mobile" },
  { icon: KeyRound, label: "Code" },
  { icon: DoorOpen, label: "Cellule" },
  { icon: Waves, label: "Paddle" },
];

export function HowItWorks() {
  return (
    <Section id="concept" tone="cream">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4 text-turquoise">{howItWorks.eyebrow}</p>
            <h2 className="text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-5xl">{howItWorks.title}</h2>
          </Reveal>
          <Reveal delay={120} className="lg:pb-2">
            <p className="font-accent text-3xl text-ocean sm:text-4xl">{howItWorks.subtitle}</p>
          </Reveal>
        </div>

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          <div className="absolute top-8 right-[12%] left-[12%] hidden border-t-2 border-dashed border-ocean/25 lg:block" aria-hidden="true" />
          {howItWorks.steps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <Reveal as="li" key={step.n} delay={i * 90} className="relative flex flex-col items-start lg:items-center lg:text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cream-50 text-ocean ring-1 ring-ocean/15">
                  <Icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.75} />
                  <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-sun text-xs font-extrabold text-night">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-extrabold uppercase tracking-[0.06em] text-night">{step.title}</h3>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-ink-soft">{step.text}</p>
              </Reveal>
            );
          })}
        </ol>

        {/* Parcours illustré : QR → téléphone → code → cellule → paddle */}
        <Reveal delay={200} className="mt-16 rounded-2xl bg-white/60 px-5 py-6 sm:px-8 lg:mt-20">
          <div className="flex items-center justify-between gap-1 sm:gap-4">
            {flow.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={node.label} className="contents">
                  <div className="flex min-w-0 flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-turquoise-100 text-ocean sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" strokeWidth={1.75} />
                    </div>
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.08em] text-ink-soft sm:text-xs sm:tracking-[0.1em]">{node.label}</span>
                  </div>
                  {i < flow.length - 1 && (
                    <ArrowRight className="mb-6 hidden h-4 w-4 shrink-0 text-ocean/40 sm:block sm:h-5 sm:w-5" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-center text-sm text-ink-soft">{howItWorks.after}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
