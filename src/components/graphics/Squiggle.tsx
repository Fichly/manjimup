import { cn } from "@/lib/utils";

/** Petite ligne manuscrite décorative (sous un mot, à côté d'une annotation). */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 14" className={cn("h-3 w-24", className)} aria-hidden="true" fill="none">
      <path
        d="M2 9c12-8 22 6 34-1s22-8 34 0 24 7 36-2 10-4 12-2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Flèche manuscrite courbe. */
export function HandArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={cn("h-10 w-14", className)} aria-hidden="true" fill="none">
      <path
        d="M4 8c20 4 44 14 64 42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M52 44l16 8-2-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Petit soleil décoratif. */
export function SunMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-8 w-8", className)} aria-hidden="true" fill="none">
      <circle cx="24" cy="24" r="9" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2" />
      </g>
    </svg>
  );
}
