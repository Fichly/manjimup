"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { site } from "@/data/site";
import { stationStatusLabel, type Station } from "@/data/stations";

type Props = {
  stations: Station[];
  /** Slugs actuellement affichés (filtre) */
  visible: Set<string>;
  selected: string | null;
  onSelect: (slug: string) => void;
};

/**
 * Le worker MapLibre est servi depuis /public/maplibre (copié par
 * scripts/copy-maplibre-worker.mjs) : la résolution automatique via
 * `import.meta.url` ne fonctionne pas une fois bundlé par Next.
 */
const WORKER_URL = "/maplibre/maplibre-gl-worker.mjs";

const markerSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>';

/**
 * Carte MapLibre + OpenStreetMap (fond OpenFreeMap, sans clé API).
 * Chargée dynamiquement, uniquement quand des stations existent.
 */
export default function StationsMap({ stations, visible, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, HTMLElement>>(new Map());
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    const markers = markersRef.current;
    if (!container || mapRef.current) return;

    if (maplibregl.getWorkerUrl() !== WORKER_URL) maplibregl.setWorkerUrl(WORKER_URL);

    const map = new maplibregl.Map({
      container,
      style: site.map.styleUrl,
      center: [site.map.center.lng, site.map.center.lat],
      zoom: site.map.zoom,
      attributionControl: false,
      cooperativeGestures: true,
      locale: {
        "CooperativeGesturesHandler.WindowsHelpText": "Utilisez Ctrl + molette pour zoomer",
        "CooperativeGesturesHandler.MacHelpText": "Utilisez ⌘ + molette pour zoomer",
        "CooperativeGesturesHandler.MobileHelpText": "Utilisez deux doigts pour déplacer la carte",
        "NavigationControl.ZoomIn": "Zoomer",
        "NavigationControl.ZoomOut": "Dézoomer",
      },
    });
    map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: site.map.attribution }), "bottom-right");
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    for (const s of stations) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = `mj-marker${s.status === "coming_soon" ? " is-coming" : ""}`;
      el.setAttribute("aria-label", `${s.name} — ${stationStatusLabel[s.status]}`);
      el.innerHTML = markerSvg;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(s.slug);
      });
      new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat([s.longitude, s.latitude]).addTo(map);
      markers.set(s.slug, el);
    }

    if (stations.length === 1) {
      map.jumpTo({ center: [stations[0].longitude, stations[0].latitude], zoom: 11 });
    } else if (stations.length > 1) {
      const bounds = new maplibregl.LngLatBounds();
      for (const s of stations) bounds.extend([s.longitude, s.latitude]);
      map.fitBounds(bounds, { padding: 64, maxZoom: 11, duration: 0 });
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
    // Les stations sont statiques (données du build) : initialisation unique.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    markersRef.current.forEach((el, slug) => {
      el.style.display = visible.has(slug) ? "" : "none";
      el.classList.toggle("is-active", slug === selected);
    });
  }, [visible, selected]);

  useEffect(() => {
    const map = mapRef.current;
    const s = stations.find((x) => x.slug === selected);
    if (!map || !s) return;
    map.flyTo({ center: [s.longitude, s.latitude], zoom: Math.max(map.getZoom(), 10), duration: 700, essential: true });
  }, [selected, stations]);

  return <div ref={containerRef} className="h-full w-full" role="region" aria-label="Carte des stations MANJIM'UP" />;
}
