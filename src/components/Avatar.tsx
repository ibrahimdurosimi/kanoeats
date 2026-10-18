/**
 * Generated avatars.
 *
 * Stock portraits of strangers were standing in for real Kano cooks and
 * customers, which is both misleading and a licensing risk. These are
 * deterministic illustrations: the same name always yields the same avatar.
 */

const PALETTES = [
  { bg: '#166049', skin: '#8A5A32', cloth: '#E9A93A', hair: '#241608' },
  { bg: '#DF5F49', skin: '#7B4E2B', cloth: '#0F4132', hair: '#2A1A0C' },
  { bg: '#E9A93A', skin: '#6E4426', cloth: '#0A2E24', hair: '#1C1006' },
  { bg: '#0F4132', skin: '#8A5A32', cloth: '#F6CE7C', hair: '#2A1A0C' },
  { bg: '#9A6318', skin: '#5F3A1F', cloth: '#DDEBE3', hair: '#1A0F06' },
];

/** Stable hash so a person keeps the same avatar across renders and sessions. */
function hash(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h;
}

export default function Avatar({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  const p = PALETTES[hash(name) % PALETTES.length];
  // Vary the headwrap shape a little so avatars don't all look identical.
  const variant = hash(name) % 3;

  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={name}>
      <rect width="80" height="80" fill={p.bg} />
      <circle cx="40" cy="31" r="15" fill={p.skin} />
      <path d="M40 50c16 0 26 10 26 30H14c0-20 10-30 26-30z" fill={p.cloth} />
      {variant === 0 && (
        <path d="M25 28c0-12 30-12 30 0 0 4-4-6-15-6s-15 10-15 6z" fill={p.hair} />
      )}
      {variant === 1 && (
        <path d="M22 32c0-16 36-16 36 0 0 6-3 8-4 4-3-11-25-11-28 0-1 4-4 2-4-4z" fill={p.hair} />
      )}
      {variant === 2 && (
        <path d="M23 34c-2-18 36-18 34 0-1 8-6-2-17-2s-16 10-17 2z" fill={p.hair} />
      )}
    </svg>
  );
}
