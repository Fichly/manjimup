"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Clock, X, ArrowUpRight } from "lucide-react";
import { stationStatusLabel, type Station } from "@/data/stations";
import { stationsSection } from "@/data/content";
import { events } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";

export function StatusBadge({ status, className }: { status: Station["status"]; className?: string }) {
  const open = status === "open";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.1em]",
        open ? "bg-turquoise-100 text-ocean" : "bg-sun-100 text-[#8a4a14]",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", open ? "bg-turquoise" : "bg-sun")} aria-hidden="true" />
      {stationStatusLabel[status]}
    </span>
  );
}

export function StationCard({ station, active, onSelect }: { station: Station; active: boolean; onSelect: (slug: string) => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(station.slug)}
        aria-pressed={active}
        className={cn(
          "flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-colors",
          active ? "border-ocean bg-cream" : "border-line bg-white hover:border-ocean/40",
        )}
      >
        <Photo src={station.photo} alt="" tone="water" className="h-20 w-24 shrink-0 rounded-xl" sizes="96px" />
        <div className="min-w-0 flex-1">
          <StatusBadge status={station.status} />
          <h3 className="mt-1.5 truncate font-extrabold text-night">{station.name}</h3>
          <p className="truncate text-sm text-ink-soft">
            {station.partner} · {station.city}
          </p>
          <p className="text-xs text-ink-soft">{station.paddles} paddles</p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden="true" />
      </button>
    </li>
  );
}

export function StationDetail({ station, onClose, className }: { station: Station; onClose: () => void; className?: string }) {
  const canBook = station.status === "open" && !!station.bookingUrl;
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-line", className)} role="dialog" aria-label={station.name}>
      <div className="relative">
        <Photo src={station.photo} alt={`Station ${station.name}`} label="Photo de la station" tone="water" className="aspect-[16/9]" sizes="(min-width: 1024px) 320px, 100vw" />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-night hover:bg-white"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="p-4 sm:p-5">
        <StatusBadge status={station.status} />
        <h3 className="mt-2 text-lg font-extrabold text-night">{station.name}</h3>
        <p className="text-sm text-ink-soft">{station.partner}</p>
        <p className="mt-3 flex items-start gap-2 text-sm text-ink">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden="true" />
          {station.address}
        </p>
        {station.hours && (
          <p className="mt-1.5 flex items-start gap-2 text-sm text-ink">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden="true" />
            {station.hours}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {canBook ? (
            <Button href={station.bookingUrl as string} target="_blank" event={events.clickBookStation} eventProps={{ station: station.slug }}>
              {stationsSection.rentHere}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-full bg-sun-100 px-5 text-sm font-extrabold uppercase tracking-[0.08em] text-[#8a4a14]">
              {stationsSection.comingSoon}
            </span>
          )}
          <Link href={`/stations/${station.slug}`} className="text-sm font-semibold text-ocean underline-offset-4 hover:underline">
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}
