import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="16" fill="#075E6B" />
      <circle cx="21.5" cy="10.5" r="3.6" fill="#F39A4A" />
      <path
        d="M5.5 19c2.6-2.6 5.2-2.6 7.8 0s5.2 2.6 7.8 0 5.2-2.6 7.8 0"
        fill="none"
        stroke="#F7F0E3"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M7 24c2.4-2.4 4.8-2.4 7.2 0s4.8 2.4 7.2 0 3.6-1.8 4.8-1.2"
        fill="none"
        stroke="#1FA7A5"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className={cn("text-[1.2rem] font-extrabold tracking-tight", tone === "dark" ? "text-night" : "text-cream")}>
        MANJIM&rsquo;UP
      </span>
    </span>
  );
}
