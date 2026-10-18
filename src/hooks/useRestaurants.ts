import { useEffect, useState } from 'react';
import { RESTAURANTS as LOCAL_RESTAURANTS } from '../data';
import { fetchRestaurants } from '../lib/api';
import { IS_SUPABASE_CONFIGURED } from '../lib/config';
import type { RestaurantWithMenu } from '../types';

type MenuState = { restaurants: RestaurantWithMenu[]; source: 'supabase' | 'local' };

/**
 * Module-level cache. Menus change rarely and this data backs several routes,
 * so refetching on every navigation would be wasteful on a mobile connection.
 *
 * With no Supabase project the local menu is the final answer, so seed the
 * cache synchronously — otherwise every page flashes a skeleton while an
 * effect resolves data that was already in the bundle.
 */
let cache: MenuState | null = IS_SUPABASE_CONFIGURED
  ? null
  : { restaurants: LOCAL_RESTAURANTS, source: 'local' };

export function useRestaurants() {
  const [state, setState] = useState(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;

    let active = true;
    fetchRestaurants()
      .then((result) => {
        cache = result;
        if (active) setState(result);
      })
      .catch((e: unknown) => {
        if (active) setError(e instanceof Error ? e.message : 'Could not load kitchens');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    restaurants: state?.restaurants ?? [],
    source: state?.source ?? 'local',
    loading,
    error,
  };
}

export function useRestaurant(id: string | undefined) {
  const { restaurants, loading, error } = useRestaurants();
  return {
    restaurant: id ? restaurants.find((r) => r.id === id) ?? null : null,
    loading,
    error,
  };
}
