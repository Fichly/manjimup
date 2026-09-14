import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"section"> & {
  tone?: "default" | "cream" | "night" | "white";
  padded?: boolean;
};

const tones = {
  default: "bg-cream-50 text-ink",
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  night: "bg-night text-cream",
};

export function Section({ tone = "default", padded = true, className, children, ...rest }: Props) {
  return (
    <section className={cn("relative", tones[tone], padded && "py-20 sm:py-24 lg:py-32", className)} {...rest}>
      {children}
    </section>
  );
}

export function Container({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("container-x", className)} {...rest}>
      {children}
    </div>
  );
}
