import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left", tone = "light", as: Tag = "h2", className }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", dark ? "text-turquoise" : "text-turquoise")}>{eyebrow}</p>
      )}
      <Tag className={cn("text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08]", dark ? "text-cream" : "text-ink")}>
        {title}
      </Tag>
      {subtitle && (
        <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-cream/75" : "text-ink-soft")}>{subtitle}</p>
      )}
    </Reveal>
  );
}
