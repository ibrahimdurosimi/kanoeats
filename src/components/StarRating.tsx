import { Star } from 'lucide-react';

/**
 * Stars, either as a static display or as an input.
 *
 * When interactive it renders real radio inputs rather than clickable divs, so
 * it is reachable by keyboard and announced correctly by a screen reader.
 */
export default function StarRating({
  value,
  onChange,
  size = 16,
  name = 'rating',
}: {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  name?: string;
}) {
  if (!onChange) {
    return (
      <span className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= Math.round(value) ? 'fill-[#E9A93A] text-[#E9A93A]' : 'text-[#D8CDB8]'}
            aria-hidden="true"
          />
        ))}
      </span>
    );
  }

  return (
    <fieldset className="flex items-center gap-1">
      <legend className="sr-only">Your rating</legend>
      {[1, 2, 3, 4, 5].map((n) => (
        <label key={n} className="cursor-pointer p-0.5">
          <input
            type="radio"
            name={name}
            value={n}
            checked={value === n}
            onChange={() => onChange(n)}
            className="sr-only peer"
          />
          <Star
            size={size}
            className={`transition peer-focus-visible:ring-2 peer-focus-visible:ring-[#E9A93A] ${
              n <= value ? 'fill-[#E9A93A] text-[#E9A93A]' : 'text-[#D8CDB8] hover:text-[#E9A93A]'
            }`}
          />
          <span className="sr-only">
            {n} star{n === 1 ? '' : 's'}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
