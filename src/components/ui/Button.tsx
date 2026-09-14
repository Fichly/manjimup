"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { track, type EventName } from "@/lib/analytics";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "sun" | "ghost" | "cream";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ocean text-cream hover:bg-ocean-600 active:bg-night",
  secondary:
    "border-2 border-ocean/25 bg-transparent text-ocean hover:border-ocean hover:bg-ocean/5",
  sun: "bg-sun text-night hover:bg-[#ef8c35] active:bg-[#e3812c]",
  cream: "bg-cream text-night hover:bg-white",
  ghost: "bg-transparent text-ocean hover:bg-ocean/5",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Événement analytics déclenché au clic (voir lib/analytics.ts) */
  event?: EventName;
  eventProps?: Record<string, string | number | boolean | undefined>;
};

type AnchorProps = BaseProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type ButtonProps = BaseProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, event, eventProps, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200 select-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, onClick, ...anchorRest } = rest as AnchorProps;
    const isExternal = /^https?:\/\//.test(href);
    const handleClick: ComponentProps<"a">["onClick"] = (e) => {
      if (event) track(event, eventProps);
      onClick?.(e);
    };
    if (isExternal) {
      return (
        <a href={href} className={classes} onClick={handleClick} rel="noreferrer" {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={handleClick} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button", ...buttonRest } = rest as ButtonProps;
  return (
    <button
      type={type}
      className={classes}
      onClick={(e) => {
        if (event) track(event, eventProps);
        onClick?.(e);
      }}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
