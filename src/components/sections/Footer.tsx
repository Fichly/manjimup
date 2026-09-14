import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { footer } from "@/data/content";
import { Logo } from "@/components/graphics/Logo";
import { Container } from "@/components/ui/Section";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-night text-cream">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Logo tone="light" />
          <p className="mt-4 font-accent text-3xl text-turquoise">{footer.slogan}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
            Location de paddle en libre-service dans les campings, bases de loisirs et plages du Sud-Ouest.
          </p>
        </div>

        <nav aria-label="Navigation pied de page" className="lg:col-span-3">
          <h2 className="eyebrow text-cream/60">Navigation</h2>
          <ul className="mt-4 space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={`/${item.href}`} className="text-cream/90 underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="eyebrow text-cream/60">Contact</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 text-cream/90 underline-offset-4 hover:underline">
                <Mail className="h-4 w-4 text-turquoise" aria-hidden="true" />
                {site.contact.email}
              </a>
            </li>
            {site.social.instagram && (
              <li>
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cream/90 underline-offset-4 hover:underline">
                  <InstagramIcon className="h-4 w-4 text-turquoise" />
                  Instagram
                </a>
              </li>
            )}
            {site.social.linkedin && (
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cream/90 underline-offset-4 hover:underline">
                  <LinkedinIcon className="h-4 w-4 text-turquoise" />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col gap-4 py-6 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:text-cream hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <span className="font-accent text-xl text-cream/80">{footer.closing}</span>
            <span className="ml-3">© {year} {site.name}</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
