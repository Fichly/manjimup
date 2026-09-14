import { cn } from "@/lib/utils";

type Props = {
  /** Classe de fond du bloc (couleur de la section précédente) */
  className?: string;
  /** Classe de couleur de la vague (couleur de la section suivante), ex. "text-cream" */
  fill: string;
  flip?: boolean;
};

/** Transition ondulée entre deux sections. */
export function WaveDivider({ className, fill, flip }: Props) {
  return (
    <div className={cn("relative -mb-px h-10 sm:h-14 lg:h-20 w-full overflow-hidden leading-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", fill, flip && "rotate-180")}
      >
        <path d="M0 42 C180 84 360 6 540 40 S900 84 1080 40 S1350 6 1440 34 V80 H0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
