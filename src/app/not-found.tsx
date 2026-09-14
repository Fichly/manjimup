import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        <Section>
          <Container className="max-w-xl text-center">
            <p className="font-accent text-4xl text-ocean">Oups, tu as dérivé…</p>
            <h1 className="mt-4 text-3xl font-extrabold text-night sm:text-4xl">Cette page n&rsquo;existe pas.</h1>
            <p className="mt-4 text-ink-soft">Retourne à l&rsquo;accueil pour trouver une station ou découvrir le concept.</p>
            <div className="mt-8 flex justify-center">
              <Button href="/" size="lg">
                Retour à l&rsquo;accueil
              </Button>
            </div>
            <p className="mt-6 text-sm">
              <Link href="/#stations" className="font-semibold text-ocean underline-offset-4 hover:underline">
                Voir les stations
              </Link>
            </p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
