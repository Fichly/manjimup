"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { events } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/**
 * CTA "Trouver une station" toujours accessible sur mobile : apparaît après le
 * hero et se masque quand la section stations, le formulaire ou le footer sont visibles.
 */
export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = ["hero", "stations", "contact-partenaire"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const footer = document.querySelector("footer");
    if (footer) targets.push(footer as HTMLElement);
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const inView = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target);
          else inView.delete(e.target);
        }
        setVisible(inView.size === 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <Button
        href={site.cta.findStation.href}
        size="lg"
        className="w-full shadow-[0_10px_30px_-8px_rgb(6_57_75/0.45)]"
        tabIndex={visible ? 0 : -1}
        event={events.clickFindStation}
        eventProps={{ location: "mobile-sticky" }}
      >
        {site.cta.findStation.label}
      </Button>
    </div>
  );
}
