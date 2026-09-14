import { manifesto } from "@/data/content";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SunMark, Squiggle } from "@/components/graphics/Squiggle";

export function Manifesto() {
  return (
    <Section id="manifeste" tone="cream">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <SunMark className="mx-auto h-10 w-10 text-sun" />
          <h2 className="mt-6 font-accent text-5xl leading-none text-ocean sm:text-6xl lg:text-7xl">{manifesto.title}</h2>
          <Squiggle className="mx-auto mt-4 h-3 w-28 text-turquoise" />
        </Reveal>
        <Reveal delay={120} className="mt-10 space-y-5 text-lg leading-relaxed text-ink sm:text-xl">
          {manifesto.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={220} className="mt-10">
          <p className="text-2xl font-extrabold leading-snug text-night sm:text-3xl">
            {manifesto.closing.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
