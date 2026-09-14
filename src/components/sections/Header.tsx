"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { events } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/graphics/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-cream-50 transition-shadow duration-300",
        (scrolled || open) && "shadow-[0_1px_0_0_var(--color-line),0_8px_24px_-16px_rgb(6_57_75/0.25)]",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link href="/" aria-label="MANJIM'UP — retour à l'accueil" className="shrink-0 rounded-md" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] font-semibold text-ink-soft transition-colors hover:text-ocean"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={site.cta.findStation.href} event={events.clickFindStation} eventProps={{ location: "header" }}>
              {site.cta.findStation.label}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-night transition-colors hover:bg-ocean/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          </button>
        </div>
      </Container>

      <div
        id="menu-mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-cream-50 lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-x flex flex-col py-4">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="border-b border-line py-4 text-lg font-semibold text-night"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button
              href={site.cta.findStation.href}
              size="lg"
              onClick={close}
              event={events.clickFindStation}
              eventProps={{ location: "menu-mobile" }}
            >
              {site.cta.findStation.label}
            </Button>
            <Button
              href={site.cta.becomePartner.href}
              size="lg"
              variant="secondary"
              onClick={close}
              event={events.clickPartner}
              eventProps={{ location: "menu-mobile" }}
            >
              {site.cta.becomePartner.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
