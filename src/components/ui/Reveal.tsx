"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Délai en ms (pour décaler des éléments successifs) */
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "p" | "form";
  style?: CSSProperties;
};

/**
 * Fade-in léger à l'entrée dans le viewport (IntersectionObserver + CSS).
 * Sans JS ou avec prefers-reduced-motion, le contenu est simplement visible.
 */
export function Reveal({ children, className, delay = 0, as = "div", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Le tag est libre à l'exécution ; on le type comme "div" pour la ref.
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
