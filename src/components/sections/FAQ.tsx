import { ChevronDown } from "lucide-react";
import { faq, type FaqItem } from "@/data/faq";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function FaqList({ title, items, name }: { title: string; items: FaqItem[]; name: string }) {
  return (
    <div>
      <h3 className="eyebrow text-turquoise">{title}</h3>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} name={name} className="group py-1">
            <summary className="flex min-h-14 items-center justify-between gap-4 py-3 text-left text-base font-bold text-night sm:text-lg">
              {item.q}
              <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-ocean transition-transform duration-300" aria-hidden="true" />
            </summary>
            <p className="pb-5 leading-relaxed text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <Section id="faq">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Les questions qu'on nous pose." />
        <Reveal delay={100} className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FaqList title="Pour les vacanciers" items={faq.users} name="faq-users" />
          <FaqList title="Pour les partenaires" items={faq.partners} name="faq-partners" />
        </Reveal>
      </Container>
    </Section>
  );
}
