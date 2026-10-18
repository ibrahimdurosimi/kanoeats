import { useState, useEffect } from 'react';
import { Restaurant } from '../types';
import { supabase } from '../lib/supabase';
import { RESTAURANTS as FALLBACK_RESTAURANTS } from '../data';

let cachedRestaurants: Restaurant[] | null = null;

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(cachedRestaurants || FALLBACK_RESTAURANTS);
  const [loading, setLoading] = useState(!cachedRestaurants);

  useEffect(() => {
    if (cachedRestaurants) {
      setLoading(false);
      return;
    }

    async function fetchRestaurants() {
      try {
        const { data: restaurantsData, error: restError } = await supabase.from('restaurants').select('*');
        if (restError || !restaurantsData || restaurantsData.length === 0) {
          console.warn('Supabase fetch failed or empty, using fallback data:', restError);
          setRestaurants(FALLBACK_RESTAURANTS);
          setLoading(false);
          return;
        }

        const { data: dishesData, error: dishError } = await supabase.from('dishes').select('*');
        if (dishError) {
          console.warn('Supabase dishes fetch failed, using fallback data:', dishError);
          setRestaurants(FALLBACK_RESTAURANTS);
          setLoading(false);
          return;
        }

        const formattedData: Restaurant[] = restaurantsData.map(r => ({
          id: r.id,
          name: r.name,
          cuisine: r.cuisine,
          rating: Number(r.rating),
          deliveryTime: r.delivery_time,
          tags: r.tags || [],
          logoText: r.logo_text,
          address: r.address,
          opens: r.opens,
          closes: r.closes,
          image: r.image,
          dishes: dishesData
            .filter(d => d.restaurant_id === r.id)
            .map(d => ({
              id: d.id,
              name: d.name,
              description: d.description,
              price: d.price,
              image: d.image,
              category: d.category as any
            }))
        }));

        cachedRestaurants = formattedData;
        setRestaurants(formattedData);
      } catch (e) {
        console.warn('Error fetching from Supabase, using fallback', e);
        setRestaurants(FALLBACK_RESTAURANTS);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  return { restaurants, loading };
}
