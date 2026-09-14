"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track, type EventName } from "@/lib/analytics";

/** Déclenche un événement analytics une seule fois quand le bloc devient visible. */
export function TrackView({ event, props, children, className }: { event: EventName; props?: Record<string, string | number>; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track(event, props);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
