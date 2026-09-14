"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { stations, type StationStatus } from "@/data/stations";
import { stationsSection } from "@/data/content";
import { events, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StationCard, StationDetail } from "./StationCard";
import { LaunchNotifyForm } from "./LaunchNotifyForm";
import { LogoMark } from "@/components/graphics/Logo";

const StationsMap = dynamic(() => import("./StationsMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-turquoise-100" aria-hidden="true" />,
});

type Filter = "all" | StationStatus;

function EmptyState() {
  return (
    <Reveal className="mt-12 grid gap-10 rounded-3xl bg-cream px-6 py-10 sm:px-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-14 lg:py-14">
      <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center lg:col-span-5 lg:max-w-none" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-turquoise/10" />
        <span className="absolute inset-[14%] rounded-full bg-turquoise/15" />
        <span className="absolute inset-[28%] rounded-full bg-turquoise/25" />
        <LogoMark className="relative h-24 w-24 drop-shadow-[0_10px_20px_rgb(6_57_75/0.25)]" />
        <span className="absolute top-[12%] right-[12%] h-5 w-5 rounded-full bg-sun" />
      </div>
      <div className="lg:col-span-7">
        <h3 className="text-2xl font-extrabold leading-tight text-night sm:text-3xl">{stationsSection.empty.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{stationsSection.empty.text}</p>
        <div className="relative mt-6">
          <LaunchNotifyForm />
        </div>
      </div>
    </Reveal>
  );
}

export function StationsSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const visibleList = useMemo(() => stations.filter((s) => filter === "all" || s.status === filter), [filter]);
  const visibleSet = useMemo(() => new Set(visibleList.map((s) => s.slug)), [visibleList]);
  const selectedStation = stations.find((s) => s.slug === selected) ?? null;

  const select = (slug: string) => {
    setSelected(slug);
    track(events.stationView, { station: slug });
  };

  const counts = {
    all: stations.length,
    open: stations.filter((s) => s.status === "open").length,
    coming_soon: stations.filter((s) => s.status === "coming_soon").length,
  };

  return (
    <Section id="stations">
      <Container>
        <SectionHeading eyebrow={stationsSection.eyebrow} title={stationsSection.title} subtitle={stationsSection.subtitle} />

        {stations.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div role="group" aria-label="Filtrer les stations" className="mt-10 flex flex-wrap gap-2">
              {stationsSection.filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-sm font-bold transition-colors",
                    filter === f.id ? "border-ocean bg-ocean text-cream" : "border-line bg-white text-ink hover:border-ocean/40",
                  )}
                >
                  {f.label}
                  <span className={cn("ml-2 text-xs", filter === f.id ? "text-cream/70" : "text-ink-soft")}>{counts[f.id]}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              <div className="relative lg:col-span-7">
                <div className="h-[360px] overflow-hidden rounded-2xl ring-1 ring-line sm:h-[460px] lg:h-[580px]">
                  <StationsMap stations={stations} visible={visibleSet} selected={selected} onSelect={select} />
                </div>
                {selectedStation && (
                  <StationDetail
                    station={selectedStation}
                    onClose={() => setSelected(null)}
                    className="mt-4 lg:absolute lg:bottom-4 lg:left-4 lg:mt-0 lg:w-80"
                  />
                )}
              </div>

              <div className="lg:col-span-5">
                {visibleList.length === 0 ? (
                  <p className="rounded-2xl bg-cream p-6 text-ink-soft">{stationsSection.noResult}</p>
                ) : (
                  <ul className="flex flex-col gap-3 lg:max-h-[580px] lg:overflow-y-auto lg:pr-1">
                    {visibleList.map((s) => (
                      <StationCard key={s.slug} station={s} active={s.slug === selected} onSelect={select} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
