import { BadgeCheck, Clock, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Restaurant } from '../types';
import DishArt, { ART_BG } from './DishArt';

const TAG_STYLES: Record<string, string> = {
  Halal: 'bg-[#DDEBE3] text-[#0F4132]',
  Spicy: 'bg-[#FBE4DE] text-[#A83E2A]',
  Traditional: 'bg-[#FBEFD6] text-[#8A5F10]',
  Vegan: 'bg-[#E2F0E4] text-[#2C6B3A]',
};

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link
      to={`/kitchens/${restaurant.id}`}
      className="group block overflow-hidden rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] transition duration-300 hover:-translate-y-1.5 hover:border-[#E9A93A] hover:shadow-xl"
    >
      <div
        className="relative grid h-[158px] place-items-center overflow-hidden"
        style={{ background: ART_BG[restaurant.artKey] }}
      >
        <DishArt
          art={restaurant.artKey}
          className="h-[120px] w-[120px] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
          aria-label={saved ? `Unsave ${restaurant.name}` : `Save ${restaurant.name}`}
          aria-pressed={saved}
          className={`absolute right-3 top-3 z-[3] grid h-[34px] w-[34px] place-items-center rounded-full shadow-sm backdrop-blur transition hover:scale-110 ${
            saved ? 'bg-[#DF5F49]' : 'bg-[#FFFDF8]/95'
          }`}
        >
          <Heart
            size={16}
            className={saved ? 'text-white' : 'text-[#DF5F49]'}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>
        <span
          title="Halal verified"
          className="absolute bottom-3 right-3 z-[2] grid h-7 w-7 place-items-center rounded-full bg-[#E9A93A] shadow-sm"
        >
          <BadgeCheck size={15} className="text-[#3A2A08]" />
        </span>
      </div>

      <div className="px-4 pb-4 pt-3.5">
        <div className="flex items-start justify-between gap-2.5">
          <h3 className="font-display text-base font-bold leading-snug text-[#0A2E24]">
            {restaurant.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-[12.5px] font-bold">
            <Star size={13} className="fill-[#E9A93A] text-[#E9A93A]" />
            {restaurant.rating}
          </span>
        </div>
        <p className="mb-2 mt-1 text-[10.5px] font-bold uppercase tracking-[0.09em] text-[#6C7C73]">
          {restaurant.cuisine}
        </p>
        <p className="mb-2.5 flex items-center gap-1.5 text-[12.5px] text-[#6C7C73]">
          <Clock size={14} />
          {restaurant.deliveryTime} min · {restaurant.reviewCount.toLocaleString()} reviews
        </p>
        <div className="flex flex-wrap gap-1.5">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${
                TAG_STYLES[tag] ?? 'bg-[#F2E8D7] text-[#6C7C73]'
              }`}
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
