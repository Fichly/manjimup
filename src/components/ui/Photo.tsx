import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Chemin dans /public ou URL. Si absent, un emplacement propre est affiché. */
  src?: string | null;
  alt: string;
  /** Libellé de l'emplacement (visible uniquement sans image) */
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "sand" | "water" | "sunset";
};

const tones = {
  sand: "from-sand-200 via-cream to-sand",
  water: "from-turquoise-100 via-cream to-turquoise/40",
  sunset: "from-sun-100 via-cream to-sand",
};

/**
 * Emplacement photo : rend une vraie image (next/image) quand elle existe,
 * sinon un placeholder élégant aux couleurs de la marque.
 */
export function Photo({ src, alt, label, className, sizes = "100vw", priority, tone = "sand" }: Props) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative overflow-hidden bg-gradient-to-br", tones[tone], className)}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ocean/10" preserveAspectRatio="none" viewBox="0 0 400 200">
        <path d="M0 150 C60 130 100 170 160 150 S260 130 320 150 S380 170 400 150" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0 170 C60 150 100 190 160 170 S260 150 320 170 S380 190 400 170" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0 130 C60 110 100 150 160 130 S260 110 320 130 S380 150 400 130" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-ocean/60">
        <Camera className="h-6 w-6" aria-hidden="true" />
        {label && <span className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</span>}
      </div>
    </div>
  );
}
