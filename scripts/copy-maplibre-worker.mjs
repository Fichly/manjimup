/**
 * Copie le worker MapLibre (et son module partagé) dans /public/maplibre.
 *
 * Pourquoi : la build ESM de maplibre-gl instancie son Web Worker via
 * `new URL("maplibre-gl-worker.mjs", import.meta.url)`, que les bundlers
 * (Turbopack/webpack) ne savent pas résoudre → carte sans tuiles.
 * On sert donc le worker depuis /public et on le déclare via `setWorkerUrl()`
 * (voir components/sections/StationsMap.tsx). Lancé en postinstall et prebuild.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const dist = dirname(require.resolve("maplibre-gl/package.json")) + "/dist";
const target = join(process.cwd(), "public", "maplibre");
mkdirSync(target, { recursive: true });
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(join(dist, file), join(target, file));
}
console.log("maplibre worker copié dans public/maplibre/");
