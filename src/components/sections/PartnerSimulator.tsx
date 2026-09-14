"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { partnerOffers, simulatorConfig, type PartnerOfferId } from "@/data/partnerOffers";
import { pricing, formatPrice } from "@/data/pricing";
import { simulatorSection } from "@/data/content";
import { events, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const fmt = (n: number) => formatPrice(Math.round(n));

function Segmented<T extends string | number>({ label, options, value, onChange, format }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void; format?: (v: T) => string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div role="group" aria-label={label} className="mt-2 inline-flex rounded-full bg-white p-1 ring-1 ring-line">
        {options.map((opt) => (
          <button
            key={String(opt)}
            type="button"
            aria-pressed={opt === value}
            onClick={() => onChange(opt)}
            className={cn(
              "min-h-10 rounded-full px-4 text-sm font-bold transition-colors",
              opt === value ? "bg-ocean text-cream" : "text-ink-soft hover:text-ocean",
            )}
          >
            {format ? format(opt) : String(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({ id, label, min, max, step, value, onChange, display }: { id: string; label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void; display: string }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <output htmlFor={id} className="text-base font-extrabold text-night tabular-nums">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="slider mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
    </div>
  );
}

export function PartnerSimulator() {
  const uid = useId();
  const cfg = simulatorConfig;
  const [offerId, setOfferId] = useState<PartnerOfferId>(partnerOffers[0].id);
  const [paddles, setPaddles] = useState<number>(cfg.paddleOptions[0]);
  const [rentals, setRentals] = useState(cfg.rentalsPerPaddlePerDay.default);
  const [days, setDays] = useState(cfg.operatingDays.default);
  const [basket, setBasket] = useState<number>(pricing.defaultAverageBasket);
  const used = useRef(false);

  const touch = () => {
    if (!used.current) {
      used.current = true;
      track(events.simulatorUse);
    }
  };

  const offer = partnerOffers.find((o) => o.id === offerId) ?? partnerOffers[0];
  const safeBasket = Number.isFinite(basket) ? Math.min(Math.max(basket, 0), 500) : 0;
  const revenue = paddles * rentals * days * safeBasket;
  const partnerShare = revenue * offer.partnerShare;
  const manjimupShare = revenue * offer.manjimupShare;
  const L = simulatorSection.labels;

  return (
    <Section id="simulateur" tone="cream">
      <Container>
        <SectionHeading eyebrow={simulatorSection.eyebrow} title={simulatorSection.title} subtitle={simulatorSection.subtitle} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="flex flex-col gap-8 lg:col-span-7" as="form">
            <Segmented
              label={L.offer}
              options={partnerOffers.map((o) => o.id)}
              value={offerId}
              onChange={(v) => {
                touch();
                setOfferId(v);
              }}
              format={(id) => partnerOffers.find((o) => o.id === id)?.title ?? String(id)}
            />
            <Segmented
              label={L.paddles}
              options={cfg.paddleOptions}
              value={paddles}
              onChange={(v) => {
                touch();
                setPaddles(v);
              }}
              format={(n) => `${n} paddles`}
            />
            <Slider
              id={`${uid}-rentals`}
              label={L.rentals}
              min={cfg.rentalsPerPaddlePerDay.min}
              max={cfg.rentalsPerPaddlePerDay.max}
              step={cfg.rentalsPerPaddlePerDay.step}
              value={rentals}
              onChange={(v) => {
                touch();
                setRentals(v);
              }}
              display={rentals.toLocaleString("fr-FR")}
            />
            <Slider
              id={`${uid}-days`}
              label={L.days}
              min={cfg.operatingDays.min}
              max={cfg.operatingDays.max}
              step={cfg.operatingDays.step}
              value={days}
              onChange={(v) => {
                touch();
                setDays(v);
              }}
              display={`${days} jours`}
            />
            <div>
              <label htmlFor={`${uid}-basket`} className="text-sm font-semibold text-ink">
                {L.basket}
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id={`${uid}-basket`}
                  type="number"
                  inputMode="decimal"
                  min={cfg.averageBasket.min}
                  max={cfg.averageBasket.max}
                  step={cfg.averageBasket.step}
                  value={Number.isFinite(basket) ? basket : ""}
                  onChange={(e) => {
                    touch();
                    setBasket(e.target.value === "" ? NaN : Number(e.target.value));
                  }}
                  className="w-32 min-h-12 rounded-xl border border-line bg-white px-4 text-base font-bold text-night focus:border-turquoise focus:outline-none focus:ring-4 focus:ring-turquoise/20"
                />
                <span className="text-sm text-ink-soft">€ par location (tarif 1 h par défaut)</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="rounded-3xl bg-night p-7 text-cream sm:p-9" aria-live="polite">
              <p className="eyebrow text-turquoise">{L.revenue}</p>
              <p className="mt-2 text-4xl font-extrabold tabular-nums sm:text-5xl">{fmt(revenue)}</p>
              <p className="mt-1 text-sm text-cream/60">{L.perSeason}</p>

              <div className="mt-8 space-y-5 border-t border-cream/15 pt-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-sun">{L.partnerShare}</p>
                  <p className="mt-1 text-3xl font-extrabold tabular-nums">{fmt(partnerShare)}</p>
                  <p className="text-xs text-cream/60">{Math.round(offer.partnerShare * 100)} % — {offer.title}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-cream/60">{L.manjimupShare}</p>
                  <p className="mt-1 text-2xl font-extrabold tabular-nums text-cream/80">{fmt(manjimupShare)}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-soft">{cfg.disclaimer}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
