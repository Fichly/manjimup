import { cn } from "@/lib/utils";

function Pine({ x, h, fill }: { x: number; h: number; fill: string }) {
  const base = 604;
  return (
    <g fill={fill}>
      <path d={`M${x} ${base - h} L${x - h * 0.26} ${base - h * 0.58} L${x + h * 0.26} ${base - h * 0.58} Z`} />
      <path d={`M${x} ${base - h * 0.8} L${x - h * 0.36} ${base - h * 0.3} L${x + h * 0.36} ${base - h * 0.3} Z`} />
      <path d={`M${x} ${base - h * 0.55} L${x - h * 0.45} ${base} L${x + h * 0.45} ${base} Z`} />
    </g>
  );
}

/**
 * Scène illustrée du hero (lac, soleil, pins, paddle) — utilisée tant que la
 * photo/vidéo définitive n'est pas disponible. Remplaçable via `hero.image`.
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="mj-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBF7EF" />
          <stop offset="0.5" stopColor="#F8E6CB" />
          <stop offset="1" stopColor="#F4CC9B" />
        </linearGradient>
        <linearGradient id="mj-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#45C2BC" />
          <stop offset="0.4" stopColor="#1A8F93" />
          <stop offset="1" stopColor="#06394B" />
        </linearGradient>
        <radialGradient id="mj-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F39A4A" stopOpacity="0.5" />
          <stop offset="1" stopColor="#F39A4A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#mj-sky)" />

      <circle cx="1190" cy="330" r="280" fill="url(#mj-glow)" />
      <circle cx="1190" cy="330" r="98" fill="#F39A4A" />

      <path d="M0 565 C220 505 400 525 600 545 S930 485 1130 525 S1420 565 1600 525 V610 H0 Z" fill="#A9C6BE" />
      <path d="M0 592 C260 545 460 585 720 565 S1120 528 1360 575 S1520 595 1600 578 V620 H0 Z" fill="#79A7A1" />

      <Pine x={70} h={210} fill="#2E6260" />
      <Pine x={150} h={260} fill="#254F4E" />
      <Pine x={235} h={190} fill="#2E6260" />
      <Pine x={300} h={150} fill="#3A716E" />
      <Pine x={1440} h={170} fill="#3A716E" />
      <Pine x={1510} h={230} fill="#254F4E" />
      <Pine x={1575} h={180} fill="#2E6260" />

      <rect x="0" y="604" width="1600" height="396" fill="url(#mj-water)" />

      <g fill="#FAD9A9" opacity="0.75">
        <ellipse cx="1190" cy="636" rx="52" ry="3" />
        <ellipse cx="1180" cy="660" rx="84" ry="3.5" />
        <ellipse cx="1200" cy="688" rx="64" ry="3.5" />
        <ellipse cx="1176" cy="722" rx="110" ry="4" />
        <ellipse cx="1210" cy="764" rx="70" ry="4" />
        <ellipse cx="1170" cy="812" rx="130" ry="4.5" />
        <ellipse cx="1220" cy="872" rx="90" ry="5" />
      </g>

      <g fill="none" stroke="#F7F0E3" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round">
        <path d="M90 690c40-18 80-18 120 0s80 18 120 0" />
        <path d="M330 760c40-18 80-18 120 0s80 18 120 0" />
        <path d="M60 850c40-18 80-18 120 0s80 18 120 0s80-18 120 0" />
        <path d="M760 700c40-18 80-18 120 0s80 18 120 0" />
        <path d="M900 900c40-18 80-18 120 0s80 18 120 0s80-18 120 0" />
        <path d="M1320 780c40-18 80-18 120 0s80 18 120 0" />
        <path d="M520 940c40-18 80-18 120 0s80 18 120 0" />
      </g>

      {/* Paddleboarder */}
      <g transform="translate(940 780)">
        <ellipse cx="10" cy="46" rx="190" ry="14" fill="#06394B" opacity="0.22" />
        <path
          d="M-170 26 q30 -16 170 -20 q120 -3 180 10 q12 4 -8 12 q-90 18 -210 14 q-100 -4 -132 -16 Z"
          fill="#F7F0E3"
        />
        <path d="M-150 22 q80 -10 300 -6" stroke="#E8D5B5" strokeWidth="4" fill="none" strokeLinecap="round" />
        <g fill="#06394B" stroke="#06394B" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="4" cy="-128" r="15" stroke="none" />
          <path d="M-8 -108 h24 l6 62 h-36 Z" strokeWidth="6" />
          <path d="M-10 -48 L-22 12" strokeWidth="13" fill="none" />
          <path d="M14 -48 L26 12" strokeWidth="13" fill="none" />
          <path d="M-6 -100 L-46 -112" strokeWidth="11" fill="none" />
          <path d="M6 -92 L-34 -62" strokeWidth="11" fill="none" />
          <path d="M-60 -150 L-14 50" strokeWidth="6" fill="none" />
          <ellipse cx="-12" cy="58" rx="9" ry="20" transform="rotate(-13 -12 58)" stroke="none" />
        </g>
      </g>
    </svg>
  );
}
