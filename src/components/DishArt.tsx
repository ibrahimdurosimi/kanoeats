/**
 * DishArt — self-contained SVG illustrations for Arewa dishes and kitchens.
 *
 * Replaces external photo URLs. Three reasons this matters for KanoEats:
 *  1. An inline SVG cannot 404, so the broken-image states are structurally impossible.
 *  2. Nothing to download — important on Nigerian mobile networks.
 *  3. The imagery is actually Northern Nigerian rather than mismatched stock photography.
 */

export type ArtKey =
  | 'suya'
  | 'masa'
  | 'fura'
  | 'kilishi'
  | 'tuwo'
  | 'kunun'
  | 'balangu'
  | 'dambu'
  | 'kitchen';

/** Maps a dish or restaurant to an illustration using name keywords. */
export function artFor(name: string, fallback: ArtKey = 'kitchen'): ArtKey {
  const n = name.toLowerCase();
  if (n.includes('suya') || n.includes('tsire') || n.includes('tsali')) return 'suya';
  if (n.includes('balangu')) return 'balangu';
  if (n.includes('kilishi')) return 'kilishi';
  if (n.includes('dambu')) return 'dambu';
  if (n.includes('masa') || n.includes('waina')) return 'masa';
  if (n.includes('fura') || n.includes('nono') || n.includes('yoghurt')) return 'fura';
  if (n.includes('tuwo') || n.includes('miyan') || n.includes('taushe') || n.includes('kuka'))
    return 'tuwo';
  if (n.includes('kunun') || n.includes('zobo') || n.includes('drink') || n.includes('juice'))
    return 'kunun';
  return fallback;
}

/** Background wash paired with each illustration, so cards never sit on flat grey. */
export const ART_BG: Record<ArtKey, string> = {
  suya: 'linear-gradient(150deg,#F6E3D8,#EACBB6)',
  masa: 'linear-gradient(150deg,#FBF0DA,#EEDCB4)',
  fura: 'linear-gradient(150deg,#E9F1E6,#D3E4D6)',
  kilishi: 'linear-gradient(150deg,#F3E5D2,#E3CFAE)',
  tuwo: 'linear-gradient(150deg,#FAEBD3,#EFD8A9)',
  kunun: 'linear-gradient(150deg,#E6F0E4,#CFE3D2)',
  balangu: 'linear-gradient(150deg,#F1E0D2,#DFC3A6)',
  dambu: 'linear-gradient(150deg,#F4E6D5,#E2CBAC)',
  kitchen: 'linear-gradient(150deg,#F2E8D7,#E4D5B8)',
};

const PATHS: Record<ArtKey, React.ReactNode> = {
  suya: (
    <>
      <circle cx="60" cy="60" r="52" fill="#3C1108" />
      <circle cx="60" cy="60" r="43" fill="#5A1E0C" />
      <g stroke="#C8A16A" strokeWidth="3.4" strokeLinecap="round">
        <path d="M26 44h70M26 62h70M26 80h70" />
      </g>
      <g fill="#8E3415">
        <rect x="34" y="36" width="18" height="17" rx="5" />
        <rect x="57" y="36" width="18" height="17" rx="5" />
        <rect x="80" y="37" width="14" height="15" rx="5" />
        <rect x="30" y="54" width="18" height="17" rx="5" />
        <rect x="53" y="54" width="18" height="17" rx="5" />
        <rect x="76" y="55" width="17" height="15" rx="5" />
        <rect x="34" y="72" width="18" height="17" rx="5" />
        <rect x="57" y="72" width="18" height="17" rx="5" />
        <rect x="80" y="73" width="14" height="15" rx="5" />
      </g>
      <g fill="#B85425" opacity=".85">
        <rect x="34" y="36" width="18" height="7" rx="3.5" />
        <rect x="57" y="36" width="18" height="7" rx="3.5" />
        <rect x="30" y="54" width="18" height="7" rx="3.5" />
        <rect x="53" y="54" width="18" height="7" rx="3.5" />
        <rect x="34" y="72" width="18" height="7" rx="3.5" />
        <rect x="57" y="72" width="18" height="7" rx="3.5" />
      </g>
      <g fill="#E9A93A">
        <circle cx="42" cy="47" r="1.7" />
        <circle cx="66" cy="45" r="1.7" />
        <circle cx="38" cy="65" r="1.7" />
        <circle cx="62" cy="64" r="1.7" />
        <circle cx="45" cy="83" r="1.7" />
        <circle cx="70" cy="81" r="1.7" />
      </g>
    </>
  ),
  masa: (
    <>
      <circle cx="60" cy="60" r="52" fill="#2A1B08" />
      <circle cx="60" cy="60" r="44" fill="#3D2810" />
      <circle cx="43" cy="43" r="15" fill="#E0B25E" />
      <circle cx="43" cy="43" r="10.5" fill="#F2D294" />
      <circle cx="77" cy="43" r="15" fill="#E0B25E" />
      <circle cx="77" cy="43" r="10.5" fill="#F2D294" />
      <circle cx="43" cy="77" r="15" fill="#E0B25E" />
      <circle cx="43" cy="77" r="10.5" fill="#F2D294" />
      <circle cx="77" cy="77" r="15" fill="#E0B25E" />
      <circle cx="77" cy="77" r="10.5" fill="#F2D294" />
      <circle cx="60" cy="60" r="13" fill="#D9A44E" />
      <circle cx="60" cy="60" r="9" fill="#EFCB88" />
      <g fill="#C08A34" opacity=".6">
        <circle cx="40" cy="40" r="1.6" />
        <circle cx="74" cy="41" r="1.5" />
        <circle cx="41" cy="79" r="1.5" />
        <circle cx="79" cy="75" r="1.4" />
      </g>
    </>
  ),
  fura: (
    <>
      <circle cx="60" cy="60" r="52" fill="#0B3327" />
      <path d="M38 36h44l-5 52a8 8 0 0 1-8 7H51a8 8 0 0 1-8-7z" fill="#F5F0E2" />
      <path d="M38 36h44l-1.6 17H39.6z" fill="#FFFDF8" />
      <path d="M41 58h38l-3.6 30a8 8 0 0 1-8 7H52.6a8 8 0 0 1-8-7z" fill="#EDE4CE" />
      <g fill="#C99A4E">
        <circle cx="52" cy="70" r="6" />
        <circle cx="68" cy="76" r="6.5" />
        <circle cx="58" cy="86" r="5.5" />
        <circle cx="70" cy="62" r="4.5" />
      </g>
      <rect x="34" y="30" width="52" height="8" rx="4" fill="#E9A93A" />
    </>
  ),
  kilishi: (
    <>
      <circle cx="60" cy="60" r="52" fill="#4A2410" />
      <circle cx="60" cy="60" r="43" fill="#F1E7D2" />
      <path
        d="M32 42c12-6 26-6 38-2s18 4 20 10-8 10-20 10-30 4-38-2-6-12 0-16z"
        fill="#8E3B18"
      />
      <path d="M30 68c12-5 26-5 38-1s18 3 20 9-8 9-20 9-30 3-38-2-6-11 0-15z" fill="#A0491F" />
      <g fill="#C96A32" opacity=".7">
        <ellipse cx="46" cy="49" rx="7" ry="3.4" />
        <ellipse cx="68" cy="52" rx="8" ry="3.4" />
        <ellipse cx="44" cy="76" rx="7" ry="3.2" />
        <ellipse cx="70" cy="78" rx="7.5" ry="3.2" />
      </g>
      <g fill="#E9A93A">
        <circle cx="40" cy="45" r="1.6" />
        <circle cx="60" cy="47" r="1.6" />
        <circle cx="50" cy="73" r="1.6" />
        <circle cx="76" cy="74" r="1.5" />
      </g>
    </>
  ),
  tuwo: (
    <>
      <circle cx="60" cy="60" r="52" fill="#12291F" />
      <circle cx="60" cy="60" r="44" fill="#1C3B2C" />
      <ellipse cx="60" cy="66" rx="36" ry="27" fill="#D97B22" />
      <ellipse cx="60" cy="63" rx="32" ry="23" fill="#EF9A34" />
      <ellipse cx="48" cy="55" rx="18" ry="15" fill="#F7F2E4" />
      <ellipse cx="48" cy="52" rx="15" ry="12" fill="#FFFDF6" />
      <g fill="#A85416" opacity=".65">
        <circle cx="74" cy="66" r="4.5" />
        <circle cx="66" cy="78" r="4" />
        <circle cx="82" cy="56" r="3.5" />
      </g>
      <g fill="#2E7D4F">
        <ellipse cx="72" cy="52" rx="6" ry="3" transform="rotate(-24 72 52)" />
        <ellipse cx="55" cy="80" rx="5.5" ry="2.8" transform="rotate(16 55 80)" />
      </g>
    </>
  ),
  kunun: (
    <>
      <circle cx="60" cy="60" r="52" fill="#7A4A12" />
      <circle cx="60" cy="60" r="43" fill="#9A6318" />
      <path d="M40 34h18l-3 54a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#F6EEDC" />
      <path d="M41.4 48h15.2l-2.2 40a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#E6D3A8" />
      <path d="M62 40h18l-3 48a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#FBF5E6" />
      <path d="M63.4 54h15.2l-2.2 34a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#EFE0BC" />
      <g fill="#C79A4C" opacity=".7">
        <circle cx="48" cy="66" r="2.6" />
        <circle cx="70" cy="68" r="2.6" />
      </g>
      <g stroke="#DF5F49" strokeWidth="3.6" strokeLinecap="round">
        <path d="M50 34V22M72 40V27" />
      </g>
    </>
  ),
  balangu: (
    <>
      <circle cx="60" cy="60" r="52" fill="#33200C" />
      <circle cx="60" cy="60" r="43" fill="#4E3316" />
      <g fill="#93411A">
        <ellipse cx="47" cy="50" rx="19" ry="14" transform="rotate(-16 47 50)" />
        <ellipse cx="74" cy="62" rx="17" ry="13" transform="rotate(12 74 62)" />
        <ellipse cx="53" cy="79" rx="18" ry="12" transform="rotate(-8 53 79)" />
      </g>
      <g fill="#BE6330" opacity=".75">
        <ellipse cx="45" cy="46" rx="9" ry="4.5" transform="rotate(-16 45 46)" />
        <ellipse cx="74" cy="58" rx="8" ry="4" transform="rotate(12 74 58)" />
        <ellipse cx="52" cy="75" rx="8" ry="4" />
      </g>
      <g fill="#E9A93A">
        <circle cx="41" cy="55" r="1.8" />
        <circle cx="66" cy="66" r="1.8" />
        <circle cx="58" cy="84" r="1.8" />
      </g>
    </>
  ),
  dambu: (
    <>
      <circle cx="60" cy="60" r="52" fill="#3A2409" />
      <circle cx="60" cy="60" r="43" fill="#F0E4CB" />
      <g stroke="#9C5520" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M32 50c10-5 20 4 30-1s18 3 26-2M30 62c10-5 20 4 30-1s18 3 28-2M33 74c10-5 20 4 30-1s16 3 24-2" />
      </g>
      <g stroke="#C07A33" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M34 56c9-4 18 3 27-1s16 2 24-2M35 68c9-4 18 3 27-1s15 2 23-2" />
      </g>
      <g fill="#DF5F49">
        <circle cx="46" cy="58" r="2" />
        <circle cx="70" cy="66" r="2" />
        <circle cx="58" cy="76" r="1.8" />
      </g>
    </>
  ),
  kitchen: (
    <>
      <rect x="14" y="52" width="92" height="56" rx="6" fill="#0F4132" />
      <path d="M60 16 96 52H24z" fill="#166049" />
      <circle cx="60" cy="34" r="6" fill="#E9A93A" />
      <path d="M48 108V80a12 12 0 0 1 24 0v28z" fill="#0A2E24" />
      <g fill="#E9A93A" opacity=".9">
        <rect x="28" y="66" width="12" height="16" rx="6" />
        <rect x="80" y="66" width="12" height="16" rx="6" />
      </g>
      <g fill="#F6CE7C" opacity=".55">
        <rect x="30" y="90" width="10" height="10" rx="3" />
        <rect x="80" y="90" width="10" height="10" rx="3" />
      </g>
    </>
  ),
};

interface DishArtProps {
  art: ArtKey;
  className?: string;
  /** Decorative by default; pass a label when the image carries meaning on its own. */
  label?: string;
}

export default function DishArt({ art, className = '', label }: DishArtProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {PATHS[art]}
    </svg>
  );
}

/**
 * Drop-in replacement for the photo blocks: a washed panel with the illustration centred.
 */
export function DishArtPanel({
  name,
  fallback = 'kitchen',
  className = '',
  artClassName = 'w-2/3 h-2/3',
}: {
  name: string;
  fallback?: ArtKey;
  className?: string;
  artClassName?: string;
}) {
  const key = artFor(name, fallback);
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: ART_BG[key] }}
    >
      <DishArt art={key} className={artClassName} />
    </div>
  );
}
