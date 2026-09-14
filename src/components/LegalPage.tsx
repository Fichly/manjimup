import type { LegalDoc } from "@/data/legal";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/ui/Section";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        <Section padded={false} className="py-14 sm:py-20">
          <Container className="max-w-3xl">
            <h1 className="text-3xl font-extrabold text-night sm:text-4xl">{doc.title}</h1>
            <p className="mt-2 text-sm text-ink-soft">Dernière mise à jour : {doc.updated}</p>
            {doc.intro && <p className="mt-6 text-lg leading-relaxed text-ink-soft">{doc.intro}</p>}
            <div className="mt-10 space-y-10">
              {doc.sections.map((s) => (
                <section key={s.title}>
                  <h2 className="text-xl font-extrabold text-night">{s.title}</h2>
                  <div className="mt-3 space-y-3 leading-relaxed text-ink">
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
