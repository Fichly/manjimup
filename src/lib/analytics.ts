/**
 * Couche analytics minimaliste.
 * Se branche automatiquement sur Plausible (`window.plausible`) ou GA4 (`window.gtag`)
 * si le script correspondant est chargé dans le layout. Sinon, no-op silencieux
 * (avec log en développement).
 */

export const events = {
  clickFindStation: "click_find_station",
  clickBookStation: "click_book_station",
  clickPartner: "click_partner",
  partnerFormStart: "partner_form_start",
  partnerFormSubmit: "partner_form_submit",
  pricingView: "pricing_view",
  stationView: "station_view",
  simulatorUse: "simulator_use",
  notifySubmit: "notify_submit",
} as const;

export type EventName = (typeof events)[keyof typeof events];

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, props ? { props } : undefined);
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", event, props ?? {});
    }
    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics]", event, props ?? "");
    }
  } catch {
    // never break the UI because of analytics
  }
}
